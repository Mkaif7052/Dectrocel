-- Add CHECK constraint for allowed status values
ALTER TABLE public.inquiries
  ADD CONSTRAINT inquiries_status_check
  CHECK (status IN ('new', 'in_progress', 'closed', 'spam'));

-- Replace the public insert policy to also force status = 'new'
DROP POLICY IF EXISTS "Anyone can submit valid inquiry" ON public.inquiries;

CREATE POLICY "Anyone can submit valid inquiry"
ON public.inquiries
FOR INSERT
TO public
WITH CHECK (
  length(trim(name)) >= 1 AND length(trim(name)) <= 200
  AND length(trim(email)) >= 3 AND length(trim(email)) <= 320
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(trim(message)) >= 1 AND length(trim(message)) <= 5000
  AND (phone IS NULL OR length(phone) <= 50)
  AND status = 'new'
);