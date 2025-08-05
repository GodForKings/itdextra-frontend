import { type FC, useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { cn } from '~/shared'
import { $isModalOpen, $modalContent, closeModal } from '../model/modal'

export const Modal: FC = () => {
	const isOpen = useUnit($isModalOpen)
	const content = useUnit($modalContent)

	const modalRef = useRef<HTMLDivElement | null>(null)
	const modalContentRef = useRef<HTMLDivElement | null>(null)
	const firstFocusableRef = useRef<HTMLElement | null>(null)

	// GSAP-анимации
	useEffect(() => {
		if (!isOpen || !modalRef.current || !modalContentRef.current) return

		const ctx = gsap.context(() => {
			gsap.fromTo(
				modalRef.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.3, ease: 'power2.out' }
			)

			gsap.fromTo(
				modalContentRef.current,
				{ opacity: 0, scale: 0.95, boxShadow: '0 0 0px rgba(45, 212, 191, 0)' },
				{
					opacity: 1,
					scale: 1,
					boxShadow: '0 0 20px rgba(45, 212, 191, 0.5)',
					duration: 0.4,
					ease: 'power3.out',
					delay: 0.1,
				}
			)
		})

		// Находим первый фокусируемый элемент
		const focusable = modalContentRef.current.querySelectorAll(
			'input, textarea, button, [tabindex]:not([tabindex="-1"])'
		)[0] as HTMLElement
		if (focusable) {
			firstFocusableRef.current = focusable
			focusable.focus()
		}

		return () => ctx.revert()
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div
			ref={modalRef}
			className='fixed inset-0 bg-gray-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4'
			aria-modal='true'
			role='dialog'
			aria-labelledby='modal-title'
		>
			<div
				ref={modalContentRef}
				className='w-full max-w-md bg-gray-950/90 backdrop-blur-xl p-8 rounded-xl shadow-2xl shadow-teal-400/30 border border-teal-400/50'
			>
				<button
					onClick={() => closeModal()}
					className='absolute top-4 right-4 text-teal-400 hover:text-teal-300'
					aria-label='Закрыть модальное окно'
					tabIndex={0}
				>
					<X size={24} />
				</button>
				{content}
			</div>
		</div>
	)
}
