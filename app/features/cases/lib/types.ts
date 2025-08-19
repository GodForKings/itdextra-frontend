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
}

export interface CardCases3dRefs {
	cards: React.RefObject<(HTMLDivElement | null)[]>
}

export interface ModalDescCaseRefs {
	modal: React.RefObject<HTMLDivElement | null>
	title: React.RefObject<HTMLHeadingElement | null>
	image: React.RefObject<HTMLImageElement | null>
	client: React.RefObject<HTMLParagraphElement | null>
	problem: React.RefObject<HTMLParagraphElement | null>
	solution: React.RefObject<HTMLParagraphElement | null>
	result: React.RefObject<HTMLParagraphElement | null>
	metrics: React.RefObject<(HTMLLIElement | null)[]>
	form: React.RefObject<HTMLFormElement | null>
}
