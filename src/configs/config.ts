export const API_URL =
  import.meta.env.VITE_APP_ENV === "production"
    ? import.meta.env.VITE_PROD_BASE_URL
    : import.meta.env.VITE_DEV_BASE_URL;
