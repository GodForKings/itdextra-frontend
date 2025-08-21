/* Интерфейс для анимаций у первой секции */
export interface AnimateHeroRefs {
	sectionRef: React.RefObject<HTMLDivElement | null>
	nameBlock: React.RefObject<HTMLDivElement | null>
	sloganBlock: React.RefObject<(HTMLParagraphElement | null)[]>
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
	serviceWell: React.RefObject<HTMLDivElement | null>
}
/* Интерфейс для анимаций карточек в Услугах */
export interface AnimateCardRefs {
	cards: React.RefObject<(HTMLElement | null)[]>
}
/* Интерфейс для анимаций у секции CTA */
export interface AnimateCTARefs {
	section: React.RefObject<HTMLDivElement | null>
	contentRef: React.RefObject<HTMLDivElement | null>
	titleRef: React.RefObject<HTMLHeadingElement | null>
	textRef: React.RefObject<HTMLParagraphElement | null>
}
/* Интерфейс для анимаций у Модального окна */
export interface AnimateModalRefs {
	modal: React.RefObject<HTMLDivElement | null>
	title: React.RefObject<HTMLHeadingElement | null>
	icon: React.RefObject<SVGSVGElement | null>
	description: React.RefObject<HTMLParagraphElement | null>
	benefits: React.RefObject<(HTMLLIElement | null)[]>
	form: React.RefObject<HTMLFormElement | null>
}
/* Интерфейс для анимаций Одной Услуги в модальном окне */
export interface AnimateServiceModalRef {
	modal: React.RefObject<HTMLDivElement | null>
	title: React.RefObject<HTMLHeadingElement | null>
	icon: React.RefObject<SVGSVGElement | null>
	description: React.RefObject<HTMLParagraphElement | null>
	category: React.RefObject<HTMLParagraphElement | null>
	priceRange: React.RefObject<HTMLParagraphElement | null>
	deliveryTime: React.RefObject<HTMLParagraphElement | null>
	tags: React.RefObject<(HTMLSpanElement | null)[]>
	caseStudies: React.RefObject<(HTMLLIElement | null)[]>
	form: React.RefObject<HTMLFormElement | null>
}
