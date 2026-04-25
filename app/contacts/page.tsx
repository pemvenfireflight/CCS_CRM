import { CrmShell } from "@/app/_components/crm-shell";
import { leads } from "@/lib/mock-data";
import { hasGoogleRuntimeCredentials, listGoogleContacts } from "@/lib/google/workspace";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  let source: "google" | "mock" = "mock";
  let warning: string | null = null;
  let contacts: Array<{ resourceName?: string | null; name: string; email: string | null; phone: string | null }> = [];

  if (hasGoogleRuntimeCredentials()) {
    try {
      contacts = await listGoogleContacts(30);
      source = "google";
    } catch (error) {
      warning = error instanceof Error ? error.message : "Unknown contacts error";
    }
  }

  return (
    <CrmShell
      currentPath="/contacts"
      title="Contacts"
      subtitle={source === "google" ? "Live Google Contacts (People API)." : "Mock contacts fallback."}
    >
      {warning ? <p className="mb-3 rounded-lg border border-amber-300/30 bg-amber-400/10 p-2 text-xs text-amber-100">Google warning: {warning}</p> : null}

      {source === "google" ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {contacts.map((contact, idx) => (
            <article key={contact.resourceName ?? `${contact.name}-${idx}`} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
              <p className="font-medium text-white">{contact.name}</p>
              <p className="mt-1 text-xs text-slate-300">{contact.email ?? "No email"}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-cyan-300">{contact.phone ?? "No phone"}</p>
            </article>
          ))}
        </div>
      ) : (
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
      )}
    </CrmShell>
  );
}
