import type { FC } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUnit } from 'effector-react'

import { contactSchema, type ContactSchema } from '../model/types'
import { cn } from '~/shared'
import { effects, stores } from '../model/contactFormModel'
import { closeModal } from '~/widgets'

interface ContactFormProps {
	formRef: React.RefObject<HTMLFormElement | null>
	subjectOfRequest: string // Тема для обращения
}

export const ContactForm: FC<ContactFormProps> = props => {
	const { formRef, subjectOfRequest } = props

	const sendData = useUnit(effects.sendDataFx)

	const isSendDataLoading = useUnit(stores.$sendIsLoading)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ContactSchema>({ resolver: zodResolver(contactSchema) })

	const onSubmit = async (data: ContactSchema) => {
		await sendData(data).then(response => {
			reset()
			alert(response?.data?.message)
			closeModal()
		})
	}

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-4'
		>
			<div className='flex flex-col gap-1'>
				<label
					htmlFor='name'
					className='text-sm text-sky-400 font-thin tracking-wider'
				>
					Ваше имя
				</label>

				<input
					{...register('name')}
					id='name'
					type='text'
					className={cn(
						'w-full p-3 bg-gray-800/25 text-white rounded-lg border border-gray-100/10',
						'focus:outline-none focus:ring focus:ring-white transition-all duration-300'
					)}
					placeholder='Как к вам обращаться?'
				/>

				{errors.name && (
					<p className='text-red-500 text-sm'>{`${errors.name?.message}`}</p>
				)}
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
						{...register('email')}
						id='email'
						type='email'
						className={cn(
							'w-full p-3 bg-gray-800/25 text-white rounded-lg border border-gray-100/10',
							'focus:outline-none focus:ring focus:ring-white transition-all duration-300'
						)}
						placeholder='Введите email'
					/>

					{errors.email && (
						<p className='text-red-500 text-sm'>{`${errors.email?.message}`}</p>
					)}
				</div>

				<div className='flex flex-col gap-1 flex-1/2'>
					<label
						htmlFor='phone'
						className='text-sm text-sky-400 font-thin tracking-wider'
					>
						Телефон для связи (опционально)
					</label>

					<input
						{...register('phone')}
						id='phone'
						className={cn(
							'w-full p-3 bg-gray-800/25 text-white rounded-lg border border-gray-100/10',
							'focus:outline-none focus:ring focus:ring-white transition-all duration-300'
						)}
						placeholder='Введите ваш телефон'
					/>

					{errors.phone && (
						<p className='text-red-500 text-sm'>{`${errors.phone?.message}`}</p>
					)}
				</div>
			</div>

			<div className='flex flex-col gap-1'>
				<label
					htmlFor='textMessage'
					className='text-sm text-sky-400 font-thin tracking-wider'
				>
					Расскажите о вашем проекте
				</label>

				{errors.textMessage && (
					<p className='text-red-500 text-sm'>{`${errors.textMessage?.message}`}</p>
				)}

				<textarea
					{...register('textMessage')}
					id='textMessage'
					className={cn(
						'w-full min-h-25 p-3 bg-gray-800/25 text-white rounded-lg border border-gray-100/10',
						'focus:outline-none focus:ring focus:ring-white transition-all duration-300'
					)}
					rows={5}
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
					disabled={
						!!(
							isSubmitting ||
							errors.email?.message ||
							errors.name?.message ||
							errors.textMessage?.message ||
							errors.phone?.message ||
							isSendDataLoading
						)
					}
					type='submit'
					className={cn(
						'p-2 bg-white text-black rounded-full',
						'transition-all duration-250 ease-in',
						'hover:scale-95 hover:translate-y-0.5',
						'active:scale-95 active:translate-y-0.5',
						'disabled:bg-gray-600'
					)}
					aria-label='Отправить заявку'
				>
					Отправить
				</button>
			</div>
		</form>
	)
}
