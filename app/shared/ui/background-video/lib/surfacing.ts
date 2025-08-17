/**
 * Анимация для верхнего дива у секции
 * @param overlayRef принимает div для анимации
 * @returns
 */
export const surfacingVideo = async (
	overlayRef: React.RefObject<HTMLDivElement | null>
): Promise<(() => gsap.core.Timeline) | undefined> => {
	const { gsap } = await import('gsap')

	const overlay = overlayRef.current
	if (!overlay) return

	const videoTl = gsap.timeline({ defaults: { ease: 'power2.out' } })

	videoTl.fromTo(
		overlay,
		{ opacity: 1 },
		{
			opacity: 0,
			duration: 1.2,
		}
	)

	videoTl.to(
		overlay,
		{
			clipPath: 'polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%)',
			duration: 0.6,
		},
		0.2
	)

	return () => videoTl.kill()
}
