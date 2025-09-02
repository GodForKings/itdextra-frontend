export interface AnimateFAQSectionRefs {
	section: React.RefObject<HTMLDivElement | null>
	title: React.RefObject<HTMLSpanElement | null>
	cardsAnswerRefs: React.RefObject<(HTMLElement | null)[]>
}

export interface AnimateFAQBlockRefs {
	contentRef: React.RefObject<HTMLDivElement | null>
	iconRef: React.RefObject<SVGSVGElement | null>
}
