declare global {
  interface Window {
    __RED_BUS_CONFIG__?: {
      apiBaseUrl?: string;
      googleClientId?: string;
      vapidPublicKey?: string;
    };
  }
}

const runtime = typeof window !== 'undefined' ? window.__RED_BUS_CONFIG__ : undefined;

export const url: string =
  runtime?.apiBaseUrl?.replace(/\/$/, '') || 'http://localhost:5000';

export const googleClientId: string = runtime?.googleClientId || '';
export const vapidPublicKey: string = runtime?.vapidPublicKey || '';
