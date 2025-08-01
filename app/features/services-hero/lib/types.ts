export interface AnimateHeroRefs {
	sectionRef: React.RefObject<HTMLDivElement | null>
	nameBlock: React.RefObject<HTMLDivElement | null>
	sloganBlock: React.RefObject<HTMLDivElement | null>
	techBlock: React.RefObject<HTMLDivElement | null>
}

export interface AnimateCategoryRefs {
	section: React.RefObject<HTMLDivElement | null>
	title: React.RefObject<HTMLHeadingElement | null>
	card: React.RefObject<(HTMLButtonElement | null)[]>
	paragraphs: React.RefObject<(HTMLParagraphElement | null)[]>
}
