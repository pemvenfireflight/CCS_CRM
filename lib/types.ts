export type Priority = "low" | "medium" | "high" | "urgent";
export type DealStage =
  | "new"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";
export type TicketStatus = "open" | "waiting" | "resolved";
export type LMSCourseLevel = "beginner" | "intermediate" | "advanced";

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "advisor" | "client" | "student";
}

export interface Lead {
  id: string;
  fullName: string;
  company: string;
  email: string;
  source: "website" | "webinar" | "referral" | "import";
  score: number;
  owner: string;
  createdAt: string;
  stage: DealStage;
}

export interface Deal {
  id: string;
  name: string;
  accountName: string;
  value: number;
  stage: DealStage;
  probability: number;
  closeDate: string;
  owner: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  owner: string;
  priority: Priority;
  module: "crm" | "lms" | "portal" | "email";
  done: boolean;
}

export interface Course {
  id: string;
  title: string;
  level: LMSCourseLevel;
  published: boolean;
  students: number;
  completionRate: number;
  price: number;
  owner: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  status: "active" | "completed" | "paused";
}

export interface PortalTicket {
  id: string;
  client: string;
  subject: string;
  status: TicketStatus;
  priority: Priority;
  openedAt: string;
  owner: string;
}

export interface EmailThread {
  id: string;
  subject: string;
  mailbox: "inbox" | "support" | "sales" | "vip";
  unreadCount: number;
  sentiment: "positive" | "neutral" | "negative";
  lastActivityAt: string;
  owner: string;
}

export interface IntegrationStatus {
  provider: "zoho" | "highlevel" | "odoo" | "gmail" | "calendar" | "stripe";
  connected: boolean;
  health: "ok" | "warning" | "down";
  lastSyncAt: string;
  note: string;
}

export interface DashboardSummary {
  leadsOpen: number;
  pipelineValue: number;
  activeStudents: number;
  unresolvedTickets: number;
  unreadEmails: number;
  todaysTasks: number;
}
