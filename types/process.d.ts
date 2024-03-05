declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_AUTH_AWS_ACCESS_KEY: string;
    NEXT_AUTH_AWS_SECRET_KEY: string;
    NEXT_AUTH_AWS_REGION: string;
    NEXT_AUTH_AWS_USERS_TABLE: string;
    NEXT_AUTH_AWS_NEXTAUTH_TABLE: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    STRIPE_PRICE_ID: string;
    STRIPE_PRODUCT_ID: string;
    STRIPE_CHECKOUT_SUCCESS_URL: string;
    STRIPE_CHECKOUT_CANCEL_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_GA_TRACKING_ID: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    LINKEDIN_ID: string;
    LINKEDIN_SECRET: string;
    MS_GRAPH_TENANT_ID: string;
    MS_GRAPH_CLIENT_ID: string;
    MS_GRAPH_CLIENT_SECRET: string;
    MS_GRAPH_USER_ID: string;
  }
}