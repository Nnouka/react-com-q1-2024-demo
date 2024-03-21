/// <reference types="vite/client" />

interface ImportMetaEnv {
  
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_GOOGLE_CLIENT_SECRET: string;
    readonly VITE_GOOGLE_CLIENT_LIB_URL: string;
    // more variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  