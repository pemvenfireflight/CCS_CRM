import {
  Course,
  DashboardSummary,
  Deal,
  EmailThread,
  Enrollment,
  IntegrationStatus,
  Lead,
  PortalTicket,
  Task,
  UserSummary,
} from "./types";

export const users: UserSummary[] = [
  { id: "u1", name: "Donald Pemberton", email: "donald@creativecapitalstrategies.com", role: "owner" },
  { id: "u2", name: "Avery Chan", email: "avery@creativecapitalstrategies.com", role: "advisor" },
  { id: "u3", name: "Nina Park", email: "nina@creativecapitalstrategies.com", role: "admin" },
  { id: "u4", name: "Jordan Lee", email: "jordan.client@email.com", role: "client" },
];

export const leads: Lead[] = [
  { id: "l1", fullName: "Micah Flores", company: "Pinecrest Dental", email: "micah@pinecrestdental.com", source: "referral", score: 88, owner: "Avery Chan", createdAt: "2026-04-22", stage: "proposal" },
  { id: "l2", fullName: "Stella Brooks", company: "North Harbor Realty", email: "stella@northharbor.com", source: "website", score: 74, owner: "Nina Park", createdAt: "2026-04-23", stage: "qualified" },
  { id: "l3", fullName: "Grant Wallace", company: "Wallace Family Office", email: "grant@wfo.com", source: "webinar", score: 92, owner: "Donald Pemberton", createdAt: "2026-04-24", stage: "negotiation" },
];

export const deals: Deal[] = [
  { id: "d1", name: "Dental Retirement Plan", accountName: "Pinecrest Dental", value: 85000, stage: "proposal", probability: 65, closeDate: "2026-05-05", owner: "Avery Chan" },
  { id: "d2", name: "Realty Tax Strategy", accountName: "North Harbor Realty", value: 120000, stage: "qualified", probability: 40, closeDate: "2026-05-18", owner: "Nina Park" },
  { id: "d3", name: "Family Office Exit Plan", accountName: "Wallace Family Office", value: 240000, stage: "negotiation", probability: 78, closeDate: "2026-05-01", owner: "Donald Pemberton" },
];

export const tasks: Task[] = [
  { id: "t1", title: "Send revised proposal to Pinecrest", dueDate: "2026-04-24", owner: "Avery Chan", priority: "high", module: "crm", done: false },
  { id: "t2", title: "Review LMS lesson completion drop-off", dueDate: "2026-04-24", owner: "Nina Park", priority: "medium", module: "lms", done: false },
  { id: "t3", title: "Close unresolved VIP inbox thread", dueDate: "2026-04-24", owner: "Donald Pemberton", priority: "urgent", module: "email", done: false },
  { id: "t4", title: "Resolve client ticket #PT-402", dueDate: "2026-04-25", owner: "Avery Chan", priority: "high", module: "portal", done: false },
];

export const courses: Course[] = [
  { id: "c1", title: "Tax-Advantaged Exit Planning", level: "advanced", published: true, students: 84, completionRate: 62, price: 499, owner: "Donald Pemberton" },
  { id: "c2", title: "Financial Foundations for Founders", level: "beginner", published: true, students: 142, completionRate: 71, price: 199, owner: "Nina Park" },
  { id: "c3", title: "Client Onboarding Masterclass", level: "intermediate", published: false, students: 0, completionRate: 0, price: 299, owner: "Avery Chan" },
];

export const enrollments: Enrollment[] = [
  { id: "e1", userId: "u4", courseId: "c1", progress: 38, status: "active" },
  { id: "e2", userId: "u4", courseId: "c2", progress: 100, status: "completed" },
  { id: "e3", userId: "u1", courseId: "c2", progress: 77, status: "active" },
];

export const portalTickets: PortalTicket[] = [
  { id: "PT-402", client: "Wallace Family Office", subject: "Vault access issue", status: "open", priority: "urgent", openedAt: "2026-04-24T09:15:00Z", owner: "Nina Park" },
  { id: "PT-398", client: "North Harbor Realty", subject: "Document e-sign reminder", status: "waiting", priority: "medium", openedAt: "2026-04-23T18:05:00Z", owner: "Avery Chan" },
  { id: "PT-390", client: "Pinecrest Dental", subject: "Dashboard metric discrepancy", status: "resolved", priority: "low", openedAt: "2026-04-22T12:00:00Z", owner: "Donald Pemberton" },
];

export const emailThreads: EmailThread[] = [
  { id: "m1", subject: "Urgent: signature packet correction", mailbox: "vip", unreadCount: 2, sentiment: "negative", lastActivityAt: "2026-04-24T17:30:00Z", owner: "Donald Pemberton" },
  { id: "m2", subject: "New webinar registrants list", mailbox: "sales", unreadCount: 8, sentiment: "positive", lastActivityAt: "2026-04-24T15:20:00Z", owner: "Nina Park" },
  { id: "m3", subject: "Portal MFA reset requests", mailbox: "support", unreadCount: 3, sentiment: "neutral", lastActivityAt: "2026-04-24T14:55:00Z", owner: "Avery Chan" },
];

export const integrations: IntegrationStatus[] = [
  { provider: "zoho", connected: true, health: "ok", lastSyncAt: "2026-04-24T18:20:00Z", note: "Leads + deals sync stable" },
  { provider: "highlevel", connected: true, health: "warning", lastSyncAt: "2026-04-24T17:50:00Z", note: "Webhook retries > baseline" },
  { provider: "odoo", connected: false, health: "down", lastSyncAt: "2026-04-22T10:04:00Z", note: "Auth refresh required" },
  { provider: "gmail", connected: true, health: "ok", lastSyncAt: "2026-04-24T18:19:00Z", note: "Inbox mirror healthy" },
  { provider: "calendar", connected: true, health: "ok", lastSyncAt: "2026-04-24T18:19:00Z", note: "Meetings + reminders synced" },
  { provider: "drive", connected: true, health: "ok", lastSyncAt: "2026-04-24T18:19:00Z", note: "Files index synced" },
  { provider: "stripe", connected: true, health: "ok", lastSyncAt: "2026-04-24T18:16:00Z", note: "Payments + payouts healthy" },
];

export const dashboardSummary: DashboardSummary = {
  leadsOpen: leads.filter((lead) => lead.stage !== "won" && lead.stage !== "lost").length,
  pipelineValue: deals
    .filter((deal) => deal.stage !== "won" && deal.stage !== "lost")
    .reduce((sum, deal) => sum + deal.value, 0),
  activeStudents: enrollments.filter((enrollment) => enrollment.status === "active").length,
  unresolvedTickets: portalTickets.filter((ticket) => ticket.status !== "resolved").length,
  unreadEmails: emailThreads.reduce((sum, thread) => sum + thread.unreadCount, 0),
  todaysTasks: tasks.filter((task) => !task.done && task.dueDate === "2026-04-24").length,
};
