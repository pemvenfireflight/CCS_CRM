import { CrmShell } from "@/app/_components/crm-shell";
import { tasks } from "@/lib/mock-data";

const automations = [
  { name: "Zoho Form -> Secureform OCQ", health: "Healthy", detail: "Last run 14m ago" },
  { name: "Morning Briefing Email + Telegram", health: "Healthy", detail: "Next run weekdays 8:30am MT" },
  { name: "Google Drive -> CRM Document Index", health: "Warning", detail: "1 retry in last 24h" },
];

export default function AutomationsPage() {
  return (
    <CrmShell currentPath="/automations" title="Automations" subtitle="Workflow health and task queue.">
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
    </CrmShell>
  );
}
