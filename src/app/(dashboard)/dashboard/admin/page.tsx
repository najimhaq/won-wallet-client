import { RoleGuard } from '@/components/auth/role-guard';

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRole='ADMIN'>
      <section>
        <h1 className='page-title'>Platform overview</h1>
      </section>
    </RoleGuard>
  );
}
