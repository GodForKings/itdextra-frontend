// Типы для рефов
export interface SectionAnimationRefs {
	sectionRef: React.RefObject<HTMLDivElement | null>
	titleRef: React.RefObject<HTMLHeadingElement | null>
	cardsRef: React.RefObject<(HTMLDivElement | null)[]>
	glowsRef: React.RefObject<(HTMLDivElement | null)[]>
}
