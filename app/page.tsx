import {
  courses,
  dashboardSummary,
  deals,
  emailThreads,
  integrations,
  leads,
  portalTickets,
  tasks,
} from "@/lib/mock-data";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const statCards = [
  { label: "Open Leads", value: dashboardSummary.leadsOpen, accent: "from-cyan-400 to-blue-500" },
  { label: "Active Pipeline", value: currency(dashboardSummary.pipelineValue), accent: "from-violet-500 to-fuchsia-500" },
  { label: "Active Students", value: dashboardSummary.activeStudents, accent: "from-emerald-400 to-teal-500" },
  { label: "Unresolved Tickets", value: dashboardSummary.unresolvedTickets, accent: "from-amber-400 to-orange-500" },
  { label: "Unread Emails", value: dashboardSummary.unreadEmails, accent: "from-rose-400 to-pink-500" },
  { label: "Tasks Due Today", value: dashboardSummary.todaysTasks, accent: "from-indigo-500 to-cyan-500" },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-cyan-500/10 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">CCS_CRM Platform</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Command Center: CRM + LMS + Client Portal + Email Ops</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-300">
          Hybrid architecture inspired by Zoho/Odoo workflows with modular APIs, role-ready boundaries, and a single operations dashboard.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <article key={card.label} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
            <div className={`h-1 w-full bg-gradient-to-r ${card.accent}`} />
            <div className="p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">{card.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-cyan-300/20 bg-slate-900/60 p-5">
          <h2 className="text-lg font-semibold text-cyan-200">CRM Pipeline</h2>
          <div className="mt-3 space-y-3">
            {deals.map((deal) => (
              <div key={deal.id} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <p className="font-medium text-white">{deal.name}</p>
                <p className="text-xs text-slate-400">{deal.accountName} • {deal.stage.toUpperCase()} • close {deal.closeDate}</p>
                <p className="mt-1 text-sm text-cyan-200">{currency(deal.value)} @ {deal.probability}% probability</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-violet-300/20 bg-slate-900/60 p-5">
          <h2 className="text-lg font-semibold text-violet-200">LMS Courses</h2>
          <div className="mt-3 space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <p className="font-medium text-white">{course.title}</p>
                <p className="text-xs text-slate-400">{course.level} • {course.published ? "published" : "draft"} • owner {course.owner}</p>
                <p className="mt-1 text-sm text-violet-200">{course.students} students • {course.completionRate}% completion • {currency(course.price)}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <article className="rounded-2xl border border-amber-300/20 bg-slate-900/60 p-5 xl:col-span-1">
          <h2 className="text-lg font-semibold text-amber-200">Client Portal Tickets</h2>
          <div className="mt-3 space-y-2 text-sm">
            {portalTickets.map((ticket) => (
              <div key={ticket.id} className="rounded-lg border border-white/10 bg-slate-950/50 p-3 text-slate-200">
                <p className="font-medium">{ticket.id} • {ticket.client}</p>
                <p className="text-xs text-slate-400">{ticket.subject}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-amber-300">{ticket.status} • {ticket.priority}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-rose-300/20 bg-slate-900/60 p-5 xl:col-span-1">
          <h2 className="text-lg font-semibold text-rose-200">Email Management</h2>
          <div className="mt-3 space-y-2 text-sm">
            {emailThreads.map((thread) => (
              <div key={thread.id} className="rounded-lg border border-white/10 bg-slate-950/50 p-3 text-slate-200">
                <p className="font-medium">{thread.subject}</p>
                <p className="text-xs text-slate-400">Mailbox: {thread.mailbox} • Owner: {thread.owner}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-rose-300">Unread {thread.unreadCount} • {thread.sentiment}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-emerald-300/20 bg-slate-900/60 p-5 xl:col-span-1">
          <h2 className="text-lg font-semibold text-emerald-200">Integrations & Work Queue</h2>
          <div className="mt-3 space-y-2 text-sm">
            {integrations.map((integration) => (
              <div key={integration.provider} className="rounded-lg border border-white/10 bg-slate-950/50 p-3 text-slate-200">
                <p className="font-medium">{integration.provider.toUpperCase()} • {integration.connected ? "connected" : "disconnected"}</p>
                <p className="text-xs text-slate-400">{integration.note}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-emerald-300">{integration.health} • {integration.lastSyncAt}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h2 className="text-lg font-semibold text-white">Lead Intake Snapshot</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {leads.map((lead) => (
              <li key={lead.id} className="rounded-lg border border-white/10 bg-slate-950/40 p-3">
                <p className="font-medium text-white">{lead.fullName} • {lead.company}</p>
                <p className="text-xs text-slate-400">{lead.email} • {lead.source} • owner {lead.owner}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h2 className="text-lg font-semibold text-white">Today’s Execution Queue</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {tasks.map((task) => (
              <li key={task.id} className="rounded-lg border border-white/10 bg-slate-950/40 p-3">
                <p className="font-medium text-white">{task.title}</p>
                <p className="text-xs text-slate-400">module {task.module} • due {task.dueDate} • owner {task.owner}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
