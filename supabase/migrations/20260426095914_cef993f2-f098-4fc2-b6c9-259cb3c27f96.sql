
-- Fix set_updated_at search_path
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Replace permissive inquiry insert with validated one
DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit valid inquiry"
  ON public.inquiries FOR INSERT
  WITH CHECK (
    length(trim(name)) BETWEEN 1 AND 200
    AND length(trim(email)) BETWEEN 3 AND 320
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(trim(message)) BETWEEN 1 AND 5000
    AND (phone IS NULL OR length(phone) <= 50)
  );

-- Restrict listing on public buckets — only allow access to specific paths via signed-style URL
-- Replace broad SELECT with one that allows file fetches but not listing
-- (Public read of individual objects still works because of the public bucket flag and per-object access)
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view brochures" ON storage.objects;

-- Authenticated admins can list everything
CREATE POLICY "Admins can list product images"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can list brochures"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'brochures' AND public.has_role(auth.uid(), 'admin'));
-- Note: The buckets remain public=true, so direct file URLs still work for viewers.
