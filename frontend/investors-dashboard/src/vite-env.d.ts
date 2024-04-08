/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_INVESTOR_API: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
