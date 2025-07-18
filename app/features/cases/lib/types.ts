// Типы для рефов
export interface SectionAnimationRefs {
	sectionRef: React.RefObject<HTMLDivElement | null>
	titleRef: React.RefObject<HTMLHeadingElement | null>
	subtitleRef: React.RefObject<HTMLParagraphElement | null>
	casesRef: React.RefObject<(HTMLDivElement | null)[]>
	buttonRef: React.RefObject<HTMLDivElement | null>
}
