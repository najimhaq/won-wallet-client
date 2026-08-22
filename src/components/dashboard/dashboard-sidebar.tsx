export function DashboardSidebar() {
  return (
    <aside className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-border lg:bg-surface'>
      <div className='p-6'>
        <h2 className='text-xl font-bold text-primary'>WonWallet</h2>
      </div>

      <nav className='flex-1 px-4'>
        <a href='/dashboard' className='nav-item nav-item-active'>
          Overview
        </a>
      </nav>
    </aside>
  );
}
