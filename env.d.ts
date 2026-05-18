declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_API_BASE_URL: string;  // server+client
            // API_BASE_URL: string; only server 
        }
    }
}

export { };
