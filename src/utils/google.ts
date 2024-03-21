import { decodeJwt } from 'jose';
/* eslint-disable @typescript-eslint/no-explicit-any */
export type GoogleAuthCallback = (auth: {
  credential: string;
  [key: string]: unknown;
}) => void;

export type TokenClientType = {
  client_id: string;
  callback?:
    | ((resp: { error: unknown; access_token: string }) => unknown)
    | string;
  scope: string;
  requestAccessToken?: (prop: { prompt: string }) => void;
};

export  type TokenPayload = {
  "iss": string, // The JWT's issuer
  "nbf":  number,
  "aud": string, // Your server's client ID
  "sub": string, // The unique ID of the user's Google Account
  "hd": string, // If present, the host domain of the user's GSuite email address
  "email": string, // The user's email address
  "email_verified": boolean, // true, if Google has verified the email address
  "azp": string,
  "name": string,
                            // If present, a URL to user's profile picture
  "picture": string,
  "given_name": string,
  "family_name": string,
  "iat": number, // Unix timestamp of the assertion's creation time
  "exp": number, // Unix timestamp of the assertion's expiration time
  "jti": string
}


declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (props: {
            client_id: string;
            callback: GoogleAuthCallback;
          }) => void;
          renderButton: (el: HTMLElement | null, config: unknown) => void;
          prompt: () => void;
        };
        oauth2: {
          initTokenClient: (props: TokenClientType) => Promise<TokenClientType>;
        };
      };
      picker: {
        PickerBuilder: any;
        Response: any;
        Action: any;
        Document: any;
        ViewId: any;
      };
    };
    noopFunc: () => void;
  }
}

export type GoogleConfig = {
  config?: { width: number | string };
  onGoogleAuth: GoogleAuthCallback;
  googleBtnId: string;
};

export const initGoogle = ({
  config,
  onGoogleAuth,
  googleBtnId,
}: GoogleConfig) => {
  window?.google.accounts.id.initialize({
    client_id: String(import.meta.env.VITE_GOOGLE_CLIENT_ID),
    callback: onGoogleAuth,
  });
  window?.google.accounts.id.renderButton(
    document.getElementById(googleBtnId),
    {
      theme: 'filled_blue',
      logo_alignment: 'left',
      size: 'large',
      shape: 'rectangular',
      width: config?.width ?? 240,
      type: 'standard',
      text: 'continue_with',
    },
  );
  window?.google.accounts.id.prompt();
};

export async function verifyCredential(idToken: string): Promise<TokenPayload | Error | undefined> {
  try {
    const payload: TokenPayload = decodeJwt(idToken);
    if (payload) return payload;
  } catch (e) {
    return new Error('invalid token');
  }
}
window.noopFunc = () => null;

export const googleAuthScriptId = 'med-sync-ai-google-gsi-btn-script-24';
export const googleApiScriptId = 'med-sync-ai-google-api-script-24';

export const googleAuthScriptSrc = String(
  import.meta.env.VITE_GOOGLE_CLIENT_LIB_URL,
);
export const googleApiScriptSrc = String(import.meta.env.VITE_GOOGLE_APIS_URL);

export const googleBtnId = 'consul_google_btn_id_001';
