/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_AUTH_URL?: string
  readonly VITE_USER_URL?: string
  readonly VITE_AUTH_SERVICE_URL?: string
  readonly VITE_USER_SERVICE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
