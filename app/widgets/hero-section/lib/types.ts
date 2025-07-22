// Типы для рефов hero секции
export interface animateHeroRefs {
	heroRef: React.RefObject<HTMLDivElement | null>
	nameRef: React.RefObject<(HTMLSpanElement | null)[]>
	titleRef: React.RefObject<HTMLHeadingElement | null>
	subtitleRef: React.RefObject<HTMLParagraphElement | null>
	ctaRef: React.RefObject<HTMLDivElement | null>
	trustRef: React.RefObject<HTMLDivElement | null>
}
