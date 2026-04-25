import { dashboardSummary, deals } from "@/lib/mock-data";
import { CrmShell, currency } from "./_components/crm-shell";

const statCards = [
  { label: "Open Leads", value: dashboardSummary.leadsOpen, accent: "from-cyan-400 to-blue-500" },
  { label: "Active Pipeline", value: currency(dashboardSummary.pipelineValue), accent: "from-violet-500 to-fuchsia-500" },
  { label: "Unread Emails", value: dashboardSummary.unreadEmails, accent: "from-rose-400 to-pink-500" },
  { label: "Tasks Due Today", value: dashboardSummary.todaysTasks, accent: "from-indigo-500 to-cyan-500" },
];

export default function DashboardPage() {
  return (
    <CrmShell currentPath="/" title="Dashboard" subtitle="Pipeline, inbox pressure, and today’s execution priorities.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <article key={card.label} className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/50">
            <div className={`h-1 w-full bg-gradient-to-r ${card.accent}`} />
            <div className="p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">{card.label}</p>
              <p className="mt-1 text-2xl font-semibold text-white">{card.value}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-3 xl:grid-cols-3">
        {deals.map((deal) => (
          <article key={deal.id} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <p className="font-medium text-white">{deal.name}</p>
            <p className="text-xs text-slate-400">
              {deal.accountName} • {deal.stage.toUpperCase()}
            </p>
            <p className="mt-1 text-sm text-cyan-200">
              {currency(deal.value)} @ {deal.probability}%
            </p>
          </article>
        ))}
      </div>
    </CrmShell>
  );
}
