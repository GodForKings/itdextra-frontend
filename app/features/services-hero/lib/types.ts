/* Интерфейс для анимаций у первой секции */
export interface AnimateHeroRefs {
	sectionRef: React.RefObject<HTMLDivElement | null>
	nameBlock: React.RefObject<HTMLDivElement | null>
	sloganBlock: React.RefObject<HTMLDivElement | null>
	techBlock: React.RefObject<HTMLDivElement | null>
}
/* Интерфейс для анимаций у секции категорий */
export interface AnimateCategoryRefs {
	section: React.RefObject<HTMLDivElement | null>
	title: React.RefObject<HTMLHeadingElement | null>
	card: React.RefObject<(HTMLButtonElement | null)[]>
	paragraphs: React.RefObject<(HTMLParagraphElement | null)[]>
}
/* Интерфейс для анимаций у секции сервисов */
export interface AnimateServicesRefs {
	section: React.RefObject<HTMLDivElement | null>
	title: React.RefObject<HTMLHeadingElement | null>
	tagBlock: React.RefObject<HTMLDivElement | null>
	tags: React.RefObject<(HTMLButtonElement | null)[]>
	cards: React.RefObject<(HTMLElement | null)[]>
}
