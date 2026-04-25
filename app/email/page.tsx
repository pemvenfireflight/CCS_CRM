import { CrmShell } from "@/app/_components/crm-shell";
import { emailThreads } from "@/lib/mock-data";
import { hasGoogleRuntimeCredentials, listGmailMessages } from "@/lib/google/workspace";

export const dynamic = "force-dynamic";

export default async function EmailPage() {
  let source: "google" | "mock" = "mock";
  let warning: string | null = null;
  let items: Array<{ id?: string | null; subject?: string | null; from?: string | null; date?: string | null; snippet?: string | null }> = [];

  if (hasGoogleRuntimeCredentials()) {
    try {
      items = await listGmailMessages("in:inbox", 20);
      source = "google";
    } catch (error) {
      warning = error instanceof Error ? error.message : "Unknown Gmail error";
    }
  }

  return (
    <CrmShell
      currentPath="/email"
      title="Email"
      subtitle={source === "google" ? "Live Gmail inbox data." : "Mock inbox fallback (Google credentials unavailable or errored)."}
    >
      {warning ? <p className="mb-3 rounded-lg border border-amber-300/30 bg-amber-400/10 p-2 text-xs text-amber-100">Google warning: {warning}</p> : null}

      {source === "google" ? (
        <div className="space-y-3">
          {items.map((thread, idx) => (
            <article key={thread.id ?? `${thread.subject}-${idx}`} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
              <p className="font-medium text-white">{thread.subject || "(no subject)"}</p>
              <p className="text-xs text-slate-400">{thread.from || "Unknown sender"}</p>
              <p className="mt-1 text-xs text-slate-300">{thread.snippet || ""}</p>
              <p className="mt-1 text-[11px] text-cyan-200">{thread.date || "No date"}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {emailThreads.map((thread) => (
            <article key={thread.id} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
              <p className="font-medium text-white">{thread.subject}</p>
              <p className="text-xs text-slate-400">Mailbox: {thread.mailbox} • Owner: {thread.owner}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-rose-300">
                Unread {thread.unreadCount} • {thread.sentiment}
              </p>
            </article>
          ))}
        </div>
      )}
    </CrmShell>
  );
}
