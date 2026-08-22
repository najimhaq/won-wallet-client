import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

type SummaryTone = 'balance' | 'income' | 'expense' | 'warning';

type SummaryCardProps = {
  label: string;
  value: string;
  description: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
  tone: SummaryTone;
  icon: LucideIcon;
};

const toneStyles: Record<
  SummaryTone,
  {
    icon: string;
    trend: string;
  }
> = {
  balance: {
    icon: 'bg-balance-soft text-balance',
    trend: 'text-balance',
  },
  income: {
    icon: 'bg-income-soft text-income',
    trend: 'text-income',
  },
  expense: {
    icon: 'bg-expense-soft text-expense',
    trend: 'text-expense',
  },
  warning: {
    icon: 'bg-warning-soft text-warning',
    trend: 'text-warning',
  },
};

export function SummaryCard({
  label,
  value,
  description,
  trend,
  trendDirection,
  tone,
  icon: Icon,
}: SummaryCardProps) {
  const styles = toneStyles[tone];

  return (
    <article className='dashboard-card dashboard-card-hover p-5'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-sm font-medium text-text-secondary'>{label}</p>

          <p className='mt-2 text-2xl font-bold tracking-tight text-text-primary'>
            {value}
          </p>
        </div>

        <span
          className={`grid size-10 shrink-0 place-items-center rounded-xl ${styles.icon}`}
        >
          <Icon className='size-5' />
        </span>
      </div>

      <div className='mt-5 flex items-center gap-2 text-xs'>
        {trend && trendDirection && (
          <span
            className={`inline-flex items-center gap-0.5 font-semibold ${styles.trend}`}
          >
            {trendDirection === 'up' ? (
              <ArrowUpRight className='size-3.5' />
            ) : (
              <ArrowDownRight className='size-3.5' />
            )}
            {trend}
          </span>
        )}

        <span className='text-text-muted'>{description}</span>
      </div>
    </article>
  );
}
