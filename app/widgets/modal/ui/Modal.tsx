import type { FC } from 'react'

import { useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { gsap } from 'gsap'
import { CircleX } from 'lucide-react'

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
				defaults: { ease: 'power4.out', duration: 0.2, opacity: 0 },
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
		const focusable = modalContentRef.current.querySelectorAll(
			'input, textarea, button, [tabindex]:not([tabindex="-1"])'
		)[0] as HTMLElement
		if (focusable) {
			firstFocusableRef.current = focusable
			focusable.focus()
		}

		return () => {
			modalTl.kill()
		}
	}, [isOpen])

	return (
		<>
			{isOpen && (
				<div
					ref={modalRef}
					className='fixed inset-0 bg-gray-950/90 backdrop-blur-3xl z-50 flex items-center justify-center p-4'
					aria-modal='true'
					role='dialog'
					aria-labelledby='modal-title'
				>
					<div
						ref={modalContentRef}
						className={cn(
							'w-full container bg-gray-950/90 backdrop-blur-2xl p-8 rounded-lg',
							''
						)}
					>
						<button
							onClick={() => closeModal()}
							className={cn(
								'absolute top-4 right-4 text-white',
								'hover:text-blue-400/90 active:text-blue-400/90'
							)}
							aria-label='Закрыть модальное окно'
							tabIndex={0}
						>
							<CircleX size={44} strokeWidth={0.8} />
						</button>

						{content}
					</div>
				</div>
			)}
		</>
	)
}
