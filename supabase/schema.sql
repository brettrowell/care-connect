-- Bootstrap group ownership: when a group is created, add creator as owner.
create or replace function public.handle_new_group_owner()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return new;
  end if;

  insert into public.group_members (group_id, user_id, role)
  values (new.id, auth.uid(), 'owner')
  on conflict do nothing;

  return new;
end;
$$;

drop trigger if exists on_group_created_add_owner on public.groups;

create trigger on_group_created_add_owner
after insert on public.groups
for each row
execute function public.handle_new_group_owner();
