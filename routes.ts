/**
 * An array of routes accesible to the public
 * do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes used for authentication
 * redirect users to /settings
 * @type {string[]}
 */

export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * prefix for api authentication routes
 * start with this prefix are use for api authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * default path after loging in
 * @type{string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
