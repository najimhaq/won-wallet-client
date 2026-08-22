import { Landmark, PiggyBank, TrendingDown, TrendingUp } from 'lucide-react';

import { SummaryCard } from '@/components/dashboard/summary-card';

export default function DashboardPage() {
  return (
    <section>
      <div>
        <h1 className='page-title'>Overview</h1>

        <p className='page-subtitle'>
          Track your money activity and monthly progress in one place.
        </p>
      </div>

      <div className='mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <SummaryCard
          label='Total balance'
          value='৳48,500'
          trend='+6.8%'
          trendDirection='up'
          description='from last month'
          tone='balance'
          icon={Landmark}
        />

        <SummaryCard
          label='Monthly income'
          value='৳65,000'
          trend='+12.5%'
          trendDirection='up'
          description='from last month'
          tone='income'
          icon={TrendingUp}
        />

        <SummaryCard
          label='Monthly expense'
          value='৳16,500'
          trend='+8.2%'
          trendDirection='up'
          description='from last month'
          tone='expense'
          icon={TrendingDown}
        />

        <SummaryCard
          label='Budget remaining'
          value='৳8,500'
          description='72% of your budget used'
          tone='warning'
          icon={PiggyBank}
        />
      </div>
    </section>
  );
}
