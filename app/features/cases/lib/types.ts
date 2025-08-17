// Типы для рефов
export interface SectionAnimationRefs {
	sectionRef: React.RefObject<HTMLDivElement | null>
	titleRef: React.RefObject<HTMLHeadingElement | null>
	subtitleRef: React.RefObject<HTMLParagraphElement | null>
	casesRef: React.RefObject<(HTMLDivElement | null)[]>
	buttonRef: React.RefObject<HTMLDivElement | null>
}

export interface CasesAnimationRefs {
	section: React.RefObject<HTMLElement | null>
	title: React.RefObject<HTMLHeadingElement | null>
	tagBlock: React.RefObject<HTMLDivElement | null>
	tags: React.RefObject<(HTMLButtonElement | null)[]>
	cards: React.RefObject<(HTMLDivElement | null)[]>
}
