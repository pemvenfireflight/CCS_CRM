import Link from "next/link";

const navTabs = [
  { href: "/", label: "Dashboard" },
  { href: "/email", label: "Email" },
  { href: "/contacts", label: "Contacts" },
  { href: "/drive", label: "Drive" },
  { href: "/courses", label: "Courses" },
  { href: "/forms", label: "Forms" },
  { href: "/automations", label: "Automations" },
] as const;

export function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CrmShell({
  currentPath,
  title,
  subtitle,
  children,
}: {
  currentPath: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
      <aside className="lg:sticky lg:top-6 lg:h-fit">
        <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">CCS CRM</p>
          <h1 className="mt-2 text-xl font-bold text-white">Operations Hub</h1>
          <nav className="mt-4 flex flex-col gap-2">
            {navTabs.map((tab) => {
              const active = currentPath === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "border-cyan-300/60 bg-cyan-400/15 text-cyan-100"
                      : "border-white/10 bg-slate-950/40 text-slate-200 hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-200"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/20">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-slate-300">{subtitle}</p> : null}
        <div className="mt-4">{children}</div>
      </section>
    </main>
  );
}
