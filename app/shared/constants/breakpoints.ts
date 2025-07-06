export const BREAKPOINTS = {
	MOBILE: 768,
} as const
export type BreakPoints = (typeof BREAKPOINTS)[keyof typeof BREAKPOINTS]
