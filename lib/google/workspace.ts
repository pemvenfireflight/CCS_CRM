import { google } from "googleapis";

export interface GoogleIntegrationSnapshot {
  gmail: { connected: boolean; health: "ok" | "warning" | "down"; note: string };
  calendar: { connected: boolean; health: "ok" | "warning" | "down"; note: string };
  contacts: { connected: boolean; health: "ok" | "warning" | "down"; note: string };
  drive: { connected: boolean; health: "ok" | "warning" | "down"; note: string };
}

function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

export function getGoogleConfig() {
  return {
    clientId: env("GOOGLE_CLIENT_ID"),
    clientSecret: env("GOOGLE_CLIENT_SECRET"),
    redirectUri: env("GOOGLE_REDIRECT_URI"),
    refreshToken: env("GOOGLE_REFRESH_TOKEN"),
    accessToken: env("GOOGLE_ACCESS_TOKEN"),
  };
}

export function hasGoogleOAuthBaseConfig() {
  const cfg = getGoogleConfig();
  return Boolean(cfg.clientId && cfg.clientSecret && cfg.redirectUri);
}

export function hasGoogleRuntimeCredentials() {
  const cfg = getGoogleConfig();
  return Boolean(cfg.clientId && cfg.clientSecret && (cfg.refreshToken || cfg.accessToken));
}

function createOAuthClient() {
  const cfg = getGoogleConfig();
  if (!cfg.clientId || !cfg.clientSecret || !cfg.redirectUri) {
    throw new Error("Missing Google OAuth config. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REDIRECT_URI.");
  }

  return new google.auth.OAuth2(cfg.clientId, cfg.clientSecret, cfg.redirectUri);
}

export function getGoogleAuthClient() {
  const cfg = getGoogleConfig();
  const oauth2 = createOAuthClient();

  if (!cfg.refreshToken && !cfg.accessToken) {
    throw new Error("Missing Google credential token. Set GOOGLE_REFRESH_TOKEN (recommended) or GOOGLE_ACCESS_TOKEN.");
  }

  oauth2.setCredentials({
    refresh_token: cfg.refreshToken,
    access_token: cfg.accessToken,
  });

  return oauth2;
}

export function buildGoogleAuthUrl() {
  const oauth2 = createOAuthClient();
  return oauth2.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/contacts.readonly",
      "openid",
      "email",
      "profile",
    ],
  });
}

export async function exchangeGoogleCode(code: string) {
  const oauth2 = createOAuthClient();
  const { tokens } = await oauth2.getToken(code);
  return tokens;
}

export async function listGmailMessages(query: string, maxResults = 10) {
  const auth = getGoogleAuthClient();
  const gmail = google.gmail({ version: "v1", auth });
  const list = await gmail.users.messages.list({
    userId: "me",
    maxResults,
    q: query,
  });

  const messages = list.data.messages ?? [];
  if (messages.length === 0) {
    return [];
  }

  const details = await Promise.all(
    messages.map(async (m) => {
      const msg = await gmail.users.messages.get({
        userId: "me",
        id: m.id ?? "",
        format: "metadata",
        metadataHeaders: ["From", "Subject", "Date"],
      });
      const headers = msg.data.payload?.headers ?? [];
      const getHeader = (name: string) => headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value ?? "";
      return {
        id: msg.data.id,
        threadId: msg.data.threadId,
        from: getHeader("From"),
        subject: getHeader("Subject"),
        date: getHeader("Date"),
        snippet: msg.data.snippet ?? "",
      };
    })
  );

  return details;
}

export async function listCalendarEvents(maxResults = 20) {
  const auth = getGoogleAuthClient();
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.list({
    calendarId: "primary",
    maxResults,
    singleEvents: true,
    orderBy: "startTime",
    timeMin: new Date().toISOString(),
  });

  return (res.data.items ?? []).map((event) => ({
    id: event.id,
    summary: event.summary,
    start: event.start?.dateTime ?? event.start?.date,
    end: event.end?.dateTime ?? event.end?.date,
    location: event.location ?? null,
    htmlLink: event.htmlLink ?? null,
  }));
}

export async function listGoogleContacts(maxResults = 50) {
  const auth = getGoogleAuthClient();
  const people = google.people({ version: "v1", auth });

  const res = await people.people.connections.list({
    resourceName: "people/me",
    pageSize: maxResults,
    personFields: "names,emailAddresses,phoneNumbers",
    sortOrder: "LAST_MODIFIED_DESCENDING",
  });

  return (res.data.connections ?? []).map((person) => {
    const name = person.names?.[0]?.displayName ?? "Unnamed contact";
    const email = person.emailAddresses?.[0]?.value ?? null;
    const phone = person.phoneNumbers?.[0]?.value ?? null;

    return {
      resourceName: person.resourceName,
      name,
      email,
      phone,
    };
  });
}

export async function listDriveFiles(
  query?: string,
  maxResults = 20,
  options?: { includeAllDrives?: boolean; driveId?: string }
) {
  const auth = getGoogleAuthClient();
  const drive = google.drive({ version: "v3", auth });

  const includeAllDrives = options?.includeAllDrives ?? true;
  const driveId = options?.driveId;
  const corpora = driveId ? "drive" : includeAllDrives ? "allDrives" : "user";

  const res = await drive.files.list({
    pageSize: maxResults,
    q: query,
    fields: "files(id,name,mimeType,modifiedTime,webViewLink,driveId)",
    orderBy: "modifiedTime desc",
    includeItemsFromAllDrives: includeAllDrives,
    supportsAllDrives: includeAllDrives,
    corpora,
    driveId,
  });

  return (res.data.files ?? []).map((f) => ({
    id: f.id,
    name: f.name,
    mimeType: f.mimeType,
    modifiedTime: f.modifiedTime,
    webViewLink: f.webViewLink,
    driveId: f.driveId ?? null,
  }));
}

export function getGoogleWorkspaceSnapshot(): GoogleIntegrationSnapshot {
  const connected = hasGoogleRuntimeCredentials();
  if (!connected) {
    return {
      gmail: { connected: false, health: "warning", note: "Google OAuth not configured" },
      calendar: { connected: false, health: "warning", note: "Google OAuth not configured" },
      contacts: { connected: false, health: "warning", note: "Google OAuth not configured" },
      drive: { connected: false, health: "warning", note: "Google OAuth not configured" },
    };
  }

  return {
    gmail: { connected: true, health: "ok", note: "Ready (Gmail readonly)" },
    calendar: { connected: true, health: "ok", note: "Ready (Calendar readonly)" },
    contacts: { connected: true, health: "ok", note: "Ready (Contacts readonly)" },
    drive: { connected: true, health: "ok", note: "Ready (Drive readonly, all drives)" },
  };
}
