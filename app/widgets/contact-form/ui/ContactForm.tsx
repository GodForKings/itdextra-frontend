import type { FC } from 'react'

import { useNavigate } from 'react-router'

import { cn } from '~/shared'
import { closeModal } from '~/widgets'

interface ContactFormProps {
	formRef: React.RefObject<HTMLFormElement | null>
	subjectOfRequest: string /* Тема для обращения */
}

export const ContactForm: FC<ContactFormProps> = props => {
	const { formRef, subjectOfRequest } = props

	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		closeModal()
		navigate('/')
	}
	return (
		<form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-4'>
			<div className='flex flex-col gap-1'>
				<label
					htmlFor='name'
					className='text-sm text-sky-400 font-thin tracking-wider'
				>
					Ваше имя
				</label>

				<input
					id='name'
					type='text'
					required
					className={cn(
						'w-full p-3 bg-gray-800/25 text-white rounded-lg border border-gray-100/10',
						'focus:outline-none focus:ring focus:ring-white transition-all duration-300'
					)}
					placeholder='Как к вам обращаться?'
				/>
			</div>

			<div className='flex gap-4 max-md:flex-col'>
				<div className='flex flex-col gap-1 flex-1/2'>
					<label
						htmlFor='email'
						className='text-sm text-sky-400 font-thin tracking-wider'
					>
						Email для контакта
					</label>

					<input
						id='email'
						type='email'
						required
						className={cn(
							'w-full p-3 bg-gray-800/25 text-white rounded-lg border border-gray-100/10',
							'focus:outline-none focus:ring focus:ring-white transition-all duration-300'
						)}
						placeholder='Введите email'
					/>
				</div>

				<div className='flex flex-col gap-1 flex-1/2'>
					<label
						htmlFor='tel'
						className='text-sm text-sky-400 font-thin tracking-wider'
					>
						Телефон для связи (опционально)
					</label>

					<input
						id='tel'
						type='tel'
						className={cn(
							'w-full p-3 bg-gray-800/25 text-white rounded-lg border border-gray-100/10',
							'focus:outline-none focus:ring focus:ring-white transition-all duration-300'
						)}
						placeholder='Введите ваш телефон'
					/>
				</div>
			</div>

			<div className='flex flex-col gap-1'>
				<label
					htmlFor='message'
					className='text-sm text-sky-400 font-thin tracking-wider'
				>
					Расскажите о вашем проекте
				</label>

				<textarea
					id='message'
					required
					className={cn(
						'w-full min-h-25 p-3 bg-gray-800/25 text-white rounded-lg border border-gray-100/10',
						'focus:outline-none focus:ring focus:ring-white transition-all duration-300'
					)}
					rows={4}
					defaultValue={
						subjectOfRequest
							? `Здравствуйте. Интересует/Хочу обсудить: ${subjectOfRequest}.`
							: `Здравствуйте! У меня цифровой кейс...`
					}
				/>
			</div>

			<div className='flex justify-between gap-4 max-md:flex-col tracking-wider text-sm lg:font-thin'>
				<div className='flex justify-center items-center gap-4'>
					<a
						aria-label='Перейти в чат telegram'
						target='_blank'
						href='https://t.me/GodForKings'
						className={cn(
							'p-2 bg-white text-black rounded-full',
							'transition-all duration-250 ease-in',
							'hover:scale-95 hover:translate-y-0.5',
							'active:scale-95 active:translate-y-0.5'
						)}
					>
						Telegram
					</a>

					<a
						aria-label='Перейти в чат whatsapp'
						target='_blank'
						href='https://wa.me/79994434263'
						className={cn(
							'p-2 bg-white text-black rounded-full',
							'transition-all duration-250 ease-in',
							'hover:scale-95 hover:translate-y-0.5',
							'active:scale-95 active:translate-y-0.5'
						)}
					>
						WhatsApp
					</a>
				</div>

				<button
					type='submit'
					className={cn(
						'p-2 bg-white text-black rounded-full',
						'transition-all duration-250 ease-in',
						'hover:scale-95 hover:translate-y-0.5',
						'active:scale-95 active:translate-y-0.5'
					)}
					aria-label='Отправить заявку'
				>
					Отправить
				</button>
			</div>
		</form>
	)
}
