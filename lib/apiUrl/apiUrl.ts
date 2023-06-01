import { isProduction } from "../isProduction/isProduction";

export const apiUrl = isProduction ? process.env.PROD_API_URL : process.env.DEV_API_URL;