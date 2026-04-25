import { CrmShell } from "@/app/_components/crm-shell";

const formQueue = [
  { name: "FAF Intake Form", status: "New submissions: 3", owner: "Nina Park" },
  { name: "OCQ Projection Questionnaire", status: "Ready to process: 2", owner: "Donald Pemberton" },
  { name: "Client Onboarding Form", status: "Pending review: 4", owner: "Avery Chan" },
];

export default function FormsPage() {
  return (
    <CrmShell currentPath="/forms" title="Forms" subtitle="Submission queues and owner routing.">
      <div className="space-y-3">
        {formQueue.map((form) => (
          <article key={form.name} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <p className="font-medium text-white">{form.name}</p>
            <p className="text-xs text-slate-400">{form.status}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-amber-300">Owner: {form.owner}</p>
          </article>
        ))}
      </div>
    </CrmShell>
  );
}
