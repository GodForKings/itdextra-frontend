// Типы для рефов
export interface SectionAnimationRefs {
	sectionRef: React.RefObject<HTMLDivElement | null>
	titleRef: React.RefObject<HTMLHeadingElement | null>
	cardsRef: React.RefObject<(HTMLDivElement | null)[]>
}

export interface AnimateModalRefs {
	modal: React.RefObject<HTMLDivElement | null>
	title: React.RefObject<HTMLHeadingElement | null>
	description: React.RefObject<HTMLParagraphElement | null>
	category: React.RefObject<HTMLParagraphElement | null>
	priceRange: React.RefObject<HTMLParagraphElement | null>
	deliveryTime: React.RefObject<HTMLParagraphElement | null>
	tags: React.RefObject<(HTMLSpanElement | null)[]>
	caseStudies: React.RefObject<(HTMLLIElement | null)[]>
}
