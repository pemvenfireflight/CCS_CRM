import { CrmShell } from "@/app/_components/crm-shell";
import { hasGoogleRuntimeCredentials, listDriveFiles } from "@/lib/google/workspace";

const fallbackFiles = [
  { name: "Onboarding Packet - Wallace Family Office.pdf", type: "PDF", updated: "2h ago" },
  { name: "Q2 Client Pipeline Review.gsheet", type: "Sheet", updated: "5h ago" },
  { name: "Fundamental Friday Script.gdoc", type: "Doc", updated: "1d ago" },
  { name: "Team SOP - FAF Intake.gdoc", type: "Doc", updated: "1d ago" },
];

export const dynamic = "force-dynamic";

export default async function DrivePage() {
  let source: "google" | "mock" = "mock";
  let warning: string | null = null;
  let files: Array<{ id?: string | null; name?: string | null; mimeType?: string | null; modifiedTime?: string | null; webViewLink?: string | null }> = [];

  if (hasGoogleRuntimeCredentials()) {
    try {
      files = await listDriveFiles(undefined, 30, { includeAllDrives: true });
      source = "google";
    } catch (error) {
      warning = error instanceof Error ? error.message : "Unknown Drive error";
    }
  }

  return (
    <CrmShell
      currentPath="/drive"
      title="Drive"
      subtitle={source === "google" ? "Live Drive index (includes Shared Drives)." : "Mock Drive fallback."}
    >
      {warning ? <p className="mb-3 rounded-lg border border-amber-300/30 bg-amber-400/10 p-2 text-xs text-amber-100">Google warning: {warning}</p> : null}

      {source === "google" ? (
        <div className="space-y-3">
          {files.map((file, idx) => (
            <article key={file.id ?? `${file.name}-${idx}`} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
              <p className="font-medium text-white">{file.name ?? "Untitled"}</p>
              <p className="text-xs text-slate-400">{file.mimeType ?? "Unknown type"}</p>
              <p className="mt-1 text-xs text-slate-300">Updated {file.modifiedTime ?? "unknown"}</p>
              {file.webViewLink ? (
                <a className="mt-2 inline-block text-xs text-cyan-300 hover:text-cyan-200" href={file.webViewLink} target="_blank" rel="noreferrer">
                  Open in Google Drive
                </a>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {fallbackFiles.map((file) => (
            <article key={file.name} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
              <p className="font-medium text-white">{file.name}</p>
              <p className="text-xs text-slate-400">
                {file.type} • Updated {file.updated}
              </p>
            </article>
          ))}
        </div>
      )}
    </CrmShell>
  );
}
