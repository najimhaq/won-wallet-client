import { SummaryCard } from '@/components/dashboard/summary-card';

export default function DashboardPage() {
  return (
    <section>
      <div>
        <h1 className='page-title'>Overview</h1>
        <p className='page-subtitle'>Your money activity for this month.</p>
      </div>

      <div className='mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <SummaryCard
          label='Total balance'
          value='৳48,500'
          trend='+৳3,250 this month'
          tone='balance'
        />

        <SummaryCard
          label='Monthly income'
          value='৳65,000'
          trend='+12.5% from last month'
          tone='income'
        />

        <SummaryCard
          label='Monthly expense'
          value='৳16,500'
          trend="25% of this month's income"
          tone='expense'
        />

        <SummaryCard
          label='Budget remaining'
          value='৳8,500'
          trend='72% budget used'
          tone='warning'
        />
      </div>
    </section>
  );
}
