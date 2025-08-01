// Типы для рефов
export interface SectionAnimationRefs {
	sectionRef: React.RefObject<HTMLDivElement | null>
	sloganRef: React.RefObject<HTMLSpanElement | null>
	thesisRef: React.RefObject<HTMLHeadingElement | null>
	plusesRef: React.RefObject<(HTMLButtonElement | null)[]>
}
