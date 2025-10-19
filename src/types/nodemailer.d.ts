// Minimal type defs so Next/Vercel typecheck passes without @types/nodemailer
declare module "nodemailer" {
  export interface SendMailOptions {
    from?: string;
    to?: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject?: string;
    text?: string;
    html?: string;
    replyTo?: string;
  }

  export interface Transporter {
    sendMail(mail: SendMailOptions): Promise<any>;
  }

  // We accept any transport options (SMTP URL or object).
  export function createTransport(options: any): Transporter;
}
