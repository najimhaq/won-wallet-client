type SummaryCardProps = {
  label: string;
  value: string;
  trend: string;
  tone: 'balance' | 'income' | 'expense' | 'warning';
};

export function SummaryCard({ label, value, trend, tone }: SummaryCardProps) {
  const toneClasses = {
    balance: 'text-balance',
    income: 'text-income',
    expense: 'text-expense',
    warning: 'text-warning',
  };

  return (
    <article className='dashboard-card dashboard-card-hover p-5'>
      <p className='text-sm text-text-secondary'>{label}</p>

      <p className='mt-2 text-2xl font-bold tracking-tight text-text-primary'>
        {value}
      </p>

      <p className={`mt-2 text-sm font-medium ${toneClasses[tone]}`}>{trend}</p>
    </article>
  );
}
