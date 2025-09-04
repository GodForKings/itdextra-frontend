export interface HeroAboutRefs {
	section: React.RefObject<HTMLDivElement | null>
	title: React.RefObject<HTMLSpanElement | null>
	slogan: React.RefObject<HTMLParagraphElement | null>
	button: React.RefObject<HTMLDivElement | null>
}

export interface MissionAboutRefs {
	section: React.RefObject<HTMLDivElement | null>
	title: React.RefObject<HTMLHeadingElement | null>
	description: React.RefObject<(HTMLParagraphElement | null)[]>
	horizontalGlare: React.RefObject<HTMLDivElement | null>
	verticalGlare: React.RefObject<HTMLDivElement | null>
}

export interface TeamAboutRefs {
	section: React.RefObject<HTMLDivElement | null>
	title: React.RefObject<HTMLHeadingElement | null>
	personsRef: React.RefObject<(HTMLElement | null)[]>
}
