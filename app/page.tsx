import {
  courses,
  dashboardSummary,
  deals,
  emailThreads,
  leads,
  tasks,
} from "@/lib/mock-data";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const navTabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "email", label: "Email" },
  { id: "contacts", label: "Contacts" },
  { id: "drive", label: "Drive" },
  { id: "courses", label: "Courses" },
  { id: "forms", label: "Forms" },
  { id: "automations", label: "Automations" },
] as const;

const driveFiles = [
  { name: "Onboarding Packet - Wallace Family Office.pdf", type: "PDF", updated: "2h ago" },
  { name: "Q2 Client Pipeline Review.gsheet", type: "Sheet", updated: "5h ago" },
  { name: "Fundamental Friday Script.gdoc", type: "Doc", updated: "1d ago" },
  { name: "Team SOP - FAF Intake.gdoc", type: "Doc", updated: "1d ago" },
];

const formQueue = [
  { name: "FAF Intake Form", status: "New submissions: 3", owner: "Nina Park" },
  { name: "OCQ Projection Questionnaire", status: "Ready to process: 2", owner: "Donald Pemberton" },
  { name: "Client Onboarding Form", status: "Pending review: 4", owner: "Avery Chan" },
];

const automations = [
  { name: "Zoho Form -> Secureform OCQ", health: "Healthy", detail: "Last run 14m ago" },
  { name: "Morning Briefing Email + Telegram", health: "Healthy", detail: "Next run weekdays 8:30am MT" },
  { name: "Google Drive -> CRM Document Index", health: "Warning", detail: "1 retry in last 24h" },
];

const statCards = [
  { label: "Open Leads", value: dashboardSummary.leadsOpen, accent: "from-cyan-400 to-blue-500" },
  { label: "Active Pipeline", value: currency(dashboardSummary.pipelineValue), accent: "from-violet-500 to-fuchsia-500" },
  { label: "Unread Emails", value: dashboardSummary.unreadEmails, accent: "from-rose-400 to-pink-500" },
  { label: "Tasks Due Today", value: dashboardSummary.todaysTasks, accent: "from-indigo-500 to-cyan-500" },
];

function SectionCard({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/20">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
      <aside className="lg:sticky lg:top-6 lg:h-fit">
        <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">CCS CRM</p>
          <h1 className="mt-2 text-xl font-bold text-white">Operations Hub</h1>
          <nav className="mt-4 flex flex-col gap-2">
            {navTabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-200"
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <div className="space-y-6">
        <SectionCard id="dashboard" title="Dashboard">
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
                <p className="text-xs text-slate-400">{deal.accountName} • {deal.stage.toUpperCase()}</p>
                <p className="mt-1 text-sm text-cyan-200">{currency(deal.value)} @ {deal.probability}%</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="email" title="Email">
          <div className="space-y-3">
            {emailThreads.map((thread) => (
              <article key={thread.id} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <p className="font-medium text-white">{thread.subject}</p>
                <p className="text-xs text-slate-400">Mailbox: {thread.mailbox} • Owner: {thread.owner}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-rose-300">Unread {thread.unreadCount} • {thread.sentiment}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="contacts" title="Contacts">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {leads.map((lead) => (
              <article key={lead.id} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <p className="font-medium text-white">{lead.fullName}</p>
                <p className="text-xs text-slate-400">{lead.company}</p>
                <p className="mt-1 text-xs text-slate-300">{lead.email}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-cyan-300">{lead.source} • score {lead.score}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="drive" title="Drive">
          <div className="space-y-3">
            {driveFiles.map((file) => (
              <article key={file.name} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <p className="font-medium text-white">{file.name}</p>
                <p className="text-xs text-slate-400">{file.type} • Updated {file.updated}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="courses" title="Courses">
          <div className="grid gap-3 xl:grid-cols-3">
            {courses.map((course) => (
              <article key={course.id} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <p className="font-medium text-white">{course.title}</p>
                <p className="text-xs text-slate-400">{course.level} • {course.published ? "published" : "draft"}</p>
                <p className="mt-1 text-sm text-violet-200">{course.students} students • {course.completionRate}% completion</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="forms" title="Forms">
          <div className="space-y-3">
            {formQueue.map((form) => (
              <article key={form.name} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <p className="font-medium text-white">{form.name}</p>
                <p className="text-xs text-slate-400">{form.status}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-amber-300">Owner: {form.owner}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="automations" title="Automations">
          <div className="space-y-3">
            {automations.map((item) => (
              <article key={item.name} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-xs text-slate-400">{item.detail}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-emerald-300">{item.health}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Today’s execution queue</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-200">
              {tasks.map((task) => (
                <li key={task.id} className="rounded-lg border border-white/10 bg-slate-900/50 p-2">
                  {task.title}
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
