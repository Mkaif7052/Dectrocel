
-- Wipe existing demo content and reseed with Dectrocel real data
DELETE FROM public.inquiries;
DELETE FROM public.products;
DELETE FROM public.categories;

-- Categories: Existing vs Upcoming product lines
INSERT INTO public.categories (slug, name, description, icon, display_order) VALUES
  ('existing', 'Existing Products', 'Production-ready Dectrocel AI tools available today.', 'check', 1),
  ('upcoming', 'Upcoming Products', 'Next-generation Dectrocel AI modalities coming soon.', 'sparkles', 2);

-- Existing Products
INSERT INTO public.products (slug, name, tagline, short_description, full_description, category_id, cover_image_url, gallery_urls, features, specifications, is_featured, is_published, display_order)
SELECT 'decxpert-sx', 'DecXpert SX', 'AI-Powered X-Ray Suite with Skeletal Analysis',
  'Detects 56+ chest conditions and 262 total pathologies head-to-toe with real-time triage and explainable heatmaps.',
  'DecXpert SX is our flagship AI-powered X-Ray suite delivering comprehensive analysis of 56+ chest conditions and 262 total pathologies head-to-toe. Built for high-throughput radiology workflows, it provides real-time triage, explainable heatmap visualizations, batch processing, and structured reporting — all powered by clinically validated deep learning models.',
  id, 'product-lungs', ARRAY['product-lungs','hero-heart']::text[],
  ARRAY['Detects 56+ chest conditions','262 total pathologies head-to-toe','Real-time triage','Heatmap explainable results','Batch processing','Structured reporting']::text[],
  '{"Modality":"Digital X-Ray","Conditions":"56+ chest, 262 total","Output":"Heatmap + structured report"}'::jsonb,
  true, true, 1
FROM public.categories WHERE slug = 'existing';

INSERT INTO public.products (slug, name, tagline, short_description, full_description, category_id, cover_image_url, gallery_urls, features, specifications, is_featured, is_published, display_order)
SELECT 'decxpert-mx', 'DecXpert MX', 'AI-Powered Manual X-Ray Analysis',
  'Drag-and-drop chest X-ray analysis with instant AI insights and full manual editing of reports.',
  'DecXpert MX brings AI-assisted manual X-ray analysis to radiologists. Upload via drag and drop, receive instant AI predictions, review interactive overlays, edit findings manually, and export polished reports — perfect for clinics that want clinician-in-the-loop workflows.',
  id, 'product-lungs', ARRAY['product-lungs']::text[],
  ARRAY['Drag and drop upload','Instant AI analysis','Interactive reporting','Manual review/editing','Export reports']::text[],
  '{"Modality":"Digital X-Ray","Workflow":"Manual / clinician-led","Output":"Editable PDF report"}'::jsonb,
  true, true, 2
FROM public.categories WHERE slug = 'existing';

INSERT INTO public.products (slug, name, tagline, short_description, full_description, category_id, cover_image_url, gallery_urls, features, specifications, is_featured, is_published, display_order)
SELECT 'decxpert-ax', 'DecXpert AX', 'Automated X-Ray Workflow',
  'Folder auto-scan and zero-touch AI processing for fully automated radiology pipelines.',
  'DecXpert AX automates the entire X-ray reporting pipeline. Drop scans into a watched folder and let AI process, analyze, and generate reports in real time — no manual intervention required. Ideal for high-volume hospitals and screening programs.',
  id, 'product-lungs', ARRAY['product-lungs']::text[],
  ARRAY['Folder auto scan','Real-time AI processing','Batch analysis','Automated reporting','Zero manual intervention']::text[],
  '{"Modality":"Digital X-Ray","Workflow":"Fully automated","Throughput":"High volume"}'::jsonb,
  true, true, 3
FROM public.categories WHERE slug = 'existing';

INSERT INTO public.products (slug, name, tagline, short_description, full_description, category_id, cover_image_url, gallery_urls, features, specifications, is_featured, is_published, display_order)
SELECT 'decxpert-ct', 'DecXpert CT', 'Advanced CT Scan Analysis',
  'Multi-slice CT Thorax analysis with 3D visualization and ML-driven predictions.',
  'DecXpert CT delivers advanced multi-slice CT Thorax analysis powered by deep learning. From AI-assisted lesion detection to immersive 3D visualization and predictive ML models, it equips radiologists with the tools to detect ILD sub-types, lung cancer with TNM staging, and more with confidence.',
  id, 'product-lungs', ARRAY['product-lungs']::text[],
  ARRAY['Multi-slice CT analysis','AI detection','3D visualization','ML predictions']::text[],
  '{"Modality":"CT Thorax","Output":"3D + structured report","Use cases":"ILD, lung cancer TNM, more"}'::jsonb,
  true, true, 4
FROM public.categories WHERE slug = 'existing';

INSERT INTO public.products (slug, name, tagline, short_description, full_description, category_id, cover_image_url, gallery_urls, features, specifications, is_featured, is_published, display_order)
SELECT 'my-lgp-health', 'My LGP Health', 'Chronic Liver Disease Assessment',
  'Mobile-first chronic liver disease assessment using LDA/QDA, neural networks, and SVM models.',
  'My LGP Health is a clinically validated mobile app for chronic liver disease assessment. Patients enter a symptom index and the app runs LDA/QDA classification, neural network analysis, and SVM predictions to deliver a personalized risk profile — bringing hepatology screening to the point of care.',
  id, 'product-stomach', ARRAY['product-stomach']::text[],
  ARRAY['Mobile app','Symptom index','LDA / QDA classification','Neural network analysis','SVM predictions','Clinically validated']::text[],
  '{"Platform":"Mobile (iOS / Android)","Domain":"Hepatology","Models":"LDA, QDA, NN, SVM"}'::jsonb,
  false, true, 5
FROM public.categories WHERE slug = 'existing';

-- Upcoming Products
INSERT INTO public.products (slug, name, tagline, short_description, full_description, category_id, cover_image_url, gallery_urls, features, specifications, is_featured, is_published, display_order)
SELECT 'decxpert-ai-mri', 'DecXpert AI MRI', 'Multi-Sequence MRI Analysis',
  'Multi-sequence MRI analysis with tissue characterization, automated lesion detection, and 3D visualization.',
  'DecXpert AI MRI extends the Dectrocel platform to magnetic resonance imaging. Designed for multi-sequence analysis, it characterizes tissue, detects lesions automatically, surfaces quantitative biomarkers, and renders diagnostic-grade 3D visualizations — coming soon to Dectrocel.',
  id, 'product-brain', ARRAY['product-brain']::text[],
  ARRAY['Multi-sequence MRI analysis','Tissue characterization','Automated lesion detection','Biomarkers','3D visualization']::text[],
  '{"Modality":"MRI","Status":"Upcoming"}'::jsonb,
  false, true, 6
FROM public.categories WHERE slug = 'upcoming';

INSERT INTO public.products (slug, name, tagline, short_description, full_description, category_id, cover_image_url, gallery_urls, features, specifications, is_featured, is_published, display_order)
SELECT 'decxpert-ai-ultrasound', 'DecXpert AI Ultrasound', 'Real-Time Ultrasound Intelligence',
  'Real-time enhancement, organ segmentation, measurement assistance, Doppler support and portable integration.',
  'DecXpert AI Ultrasound brings intelligent assistance to point-of-care sonography. Real-time image enhancement, automated organ segmentation, measurement assistance, Doppler support, and portable device integration — designed for clinics, ICUs, and bedside diagnostics.',
  id, 'product-stomach', ARRAY['product-stomach']::text[],
  ARRAY['Real-time enhancement','Organ segmentation','Measurement assistance','Doppler support','Portable integration']::text[],
  '{"Modality":"Ultrasound","Status":"Upcoming"}'::jsonb,
  false, true, 7
FROM public.categories WHERE slug = 'upcoming';

INSERT INTO public.products (slug, name, tagline, short_description, full_description, category_id, cover_image_url, gallery_urls, features, specifications, is_featured, is_published, display_order)
SELECT 'decxpert-ai-ct-abdomen', 'DecXpert AI CT Abdomen', 'Multi-Organ CT Abdomen Analysis',
  'Multi-organ segmentation, pathology detection, volumetric analysis, vascular mapping and structured reporting.',
  'DecXpert AI CT Abdomen delivers comprehensive abdominal CT intelligence. Multi-organ segmentation, pathology detection across the GI and genitourinary systems, volumetric analysis, vascular mapping, and structured reporting — engineered for radiology departments handling complex abdominal cases.',
  id, 'product-stomach', ARRAY['product-stomach']::text[],
  ARRAY['Multi-organ segmentation','Pathology detection','Volumetric analysis','Vascular mapping','Reporting']::text[],
  '{"Modality":"CT Abdomen","Status":"Upcoming"}'::jsonb,
  false, true, 8
FROM public.categories WHERE slug = 'upcoming';

INSERT INTO public.products (slug, name, tagline, short_description, full_description, category_id, cover_image_url, gallery_urls, features, specifications, is_featured, is_published, display_order)
SELECT 'decxpert-ai-pet-ct', 'DecXpert AI PET CT', 'Oncology PET-CT Intelligence',
  'SUV calculation, lesion tracking, metabolic mapping, multi-timepoint comparison and oncology reporting.',
  'DecXpert AI PET CT is engineered for oncology workflows. Automated SUV calculation, lesion tracking across timepoints, metabolic mapping, and structured oncology reporting empower hematologists and oncologists to monitor treatment response and progression with confidence.',
  id, 'product-dna', ARRAY['product-dna']::text[],
  ARRAY['SUV calculation','Lesion tracking','Metabolic mapping','Multi-timepoint comparison','Oncology reporting']::text[],
  '{"Modality":"PET-CT","Status":"Upcoming"}'::jsonb,
  false, true, 9
FROM public.categories WHERE slug = 'upcoming';
