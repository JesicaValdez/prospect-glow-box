create policy "Authenticated users can read leads"
on public.leads for select to authenticated
using (true);