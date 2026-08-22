'use client';


import { useSession } from '@/lib/auth-client';
import { AdminSidebar } from '../admin/admin-sidebar';
import { UserSidebar } from '../user/user-sidebar';

export function DashboardSidebar() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <aside className='fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-border bg-surface lg:block' />
    );
  }

  if (session?.user.role === 'ADMIN') {
    return <AdminSidebar />;
  }

  return <UserSidebar />;
}
