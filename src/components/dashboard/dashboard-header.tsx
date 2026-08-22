export function DashboardHeader() {
  return (
    <header className='flex h-16 items-center justify-between border-b border-border bg-surface px-4 sm:px-6 lg:px-8'>
      <div>
        <p className='text-sm text-text-secondary'>Welcome back</p>
      </div>

      <button
        type='button'
        className='flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary'
      >
        U
      </button>
    </header>
  );
}
