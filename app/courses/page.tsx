import { CrmShell } from "@/app/_components/crm-shell";
import { courses } from "@/lib/mock-data";

export default function CoursesPage() {
  return (
    <CrmShell currentPath="/courses" title="Courses" subtitle="Learning products and progress health.">
      <div className="grid gap-3 xl:grid-cols-3">
        {courses.map((course) => (
          <article key={course.id} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <p className="font-medium text-white">{course.title}</p>
            <p className="text-xs text-slate-400">
              {course.level} • {course.published ? "published" : "draft"}
            </p>
            <p className="mt-1 text-sm text-violet-200">
              {course.students} students • {course.completionRate}% completion
            </p>
          </article>
        ))}
      </div>
    </CrmShell>
  );
}
