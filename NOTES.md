src/app/
  (dashboard)/
    dashboard/
      layout.tsx                 ← Auth guard + shared shell
      page.tsx                   ← RoleRedirect component

      user/
        page.tsx                 ← User dashboard overview
        transactions/
          page.tsx
        budgets/
          page.tsx
        analytics/
          page.tsx
        profile/
          page.tsx
        settings/
          page.tsx

      admin/
        page.tsx                 ← Admin overview
        users/
          page.tsx
        transactions/
          page.tsx
        analytics/
          page.tsx
        audit-logs/
          page.tsx
        settings/
          page.tsx
