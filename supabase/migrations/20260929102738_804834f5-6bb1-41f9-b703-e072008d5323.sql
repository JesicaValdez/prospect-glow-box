CREATE POLICY "No direct public access to leads"
ON public.leads
FOR ALL
TO public
USING (false)
WITH CHECK (false);