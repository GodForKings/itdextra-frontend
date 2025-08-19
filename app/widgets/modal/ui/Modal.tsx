import type { FC } from 'react'

import { useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { gsap } from 'gsap'
import { CircleX, X } from 'lucide-react'

import { cn } from '~/shared'
import { $isModalOpen, $modalContent, closeModal } from '../model/modal'

export const Modal: FC = () => {
	const isOpen = useUnit($isModalOpen)
	const content = useUnit($modalContent)

	const modalRef = useRef<HTMLDivElement | null>(null)
	const modalContentRef = useRef<HTMLDivElement | null>(null)
	const firstFocusableRef = useRef<HTMLElement | null>(null)

	useEffect(() => {
		if (!isOpen || !modalRef.current || !modalContentRef.current) return

		const modalTl = gsap
			.timeline({
				defaults: { ease: 'power4.out', duration: 0.5, opacity: 0 },
			})
			.fromTo(modalRef.current, {}, { opacity: 1 })
			.fromTo(
				modalContentRef.current,
				{ scale: 0.95 },
				{
					opacity: 1,
					scale: 1,
				}
			)

		// Находим первый фокусируемый элемент
		// const focusable = modalContentRef.current.querySelectorAll(
		// 	'input, textarea, button, [tabindex]:not([tabindex="-1"])'
		// )[0] as HTMLElement
		// if (focusable) {
		// 	firstFocusableRef.current = focusable
		// 	focusable.focus()
		// }

		return () => {
			modalTl.kill()
		}
	}, [isOpen])

	return (
		<>
			{isOpen && (
				<div
					ref={modalRef}
					className={cn(
						'fixed inset-0 z-50',
						'flex items-center justify-center',
						'bg-gradient-to-b from-black/95 via-gray-900/90 to-black/95 backdrop-blur-2xl'
					)}
					aria-modal='true'
					role='dialog'
					aria-labelledby='modal-title'
				>
					<div
						ref={modalContentRef}
						className={cn(
							'w-full container p-4 lg:p-8 rounded-lg max-h-[100dvh] overflow-auto',
							'bg-gradient-to-tr from-black/90 to-gray-950/90 backdrop-blur-2xl',
							'modal-scrollbar'
						)}
					>
						{content}
					</div>
					{/* Кнопка для закрытия модального окна */}
					<button
						onClick={() => closeModal()}
						className={cn(
							'absolute z-5 backdrop-blur-3xl rounded-lg',
							'bg-black opacity-65',
							'md:top-[5dvh] md:right-[6dvw] top-1 right-1'
						)}
						aria-label='Закрыть модальное окно'
						tabIndex={0}
					>
						<X
							strokeWidth={1}
							className={cn(
								'hover:text-white/40 active:text-white/40',
								'text-red-500 h-10 w-10 lg:h-14 lg:w-14'
							)}
						/>
					</button>
				</div>
			)}
		</>
	)
}
