import type { FC } from 'react'

import { cn, CONTACTS, CustomLink } from '~/shared'

export const Contacts: FC = () => {
	const { Phone, NumberPhoneLink, Address, Mail } = CONTACTS

	return (
		/* Контактная информация */
		<div className='z-5 flex flex-col justify-center items-end py-4 px-15 gap-4'>
			<h3 className={cn('text-xl text-sky-500 underline underline-offset-4')}>
				Свяжитесь с Нами
			</h3>

			<ul className='flex flex-col gap-4 justify-center text-neutral-950 dark:text-slate-50'>
				<li className='flex flex-wrap justify-end items-center'>
					EMAIL:
					<CustomLink currentLink={`mailto:${Mail}`}>{Mail}</CustomLink>
				</li>

				<li className='flex flex-wrap justify-end items-center'>
					ТЕЛЕФОН:
					<CustomLink currentLink={NumberPhoneLink}>{Phone}</CustomLink>
				</li>

				<li className='flex flex-wrap justify-end items-center'>
					АДРЕС:<CustomLink currentLink='#'>{Address}</CustomLink>
				</li>
			</ul>
		</div>
	)
}
