/**
 * Demo mode utilities.
 * When DEMO=1 is set, the app bypasses all DB/external dependencies
 * and renders mock UI data instead.
 */

export const isDemoMode = process.env.DEMO === "1";
