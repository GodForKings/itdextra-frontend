import type { FC } from 'react'
import { cn } from '~/shared'
import { Mail, Phone, Twitter, Linkedin } from 'lucide-react'

interface ContactsInfoSectionProps {
	onButtonClick: () => void
}

export const ContactsInfoSection: FC<ContactsInfoSectionProps> = ({
	onButtonClick,
}) => {
	return (
		<section
			className={cn(
				'w-full max-w-7xl py-16 px-6 rounded-xl',
				'bg-gray-800/50 backdrop-blur-md border border-sky-500/20',
				'dark:bg-gray-800/50 dark:border-sky-500/20',
				'bg-white/90 border-gray-300/20'
			)}
		>
			<h2 className='text-3xl md:text-4xl font-thin text-white dark:text-white text-black mb-8 text-center'>
				Контакты
			</h2>
			<div className='flex flex-col md:flex-row justify-between gap-8'>
				<ul className='flex flex-col gap-4 text-base md:text-lg font-thin text-sky-400 dark:text-sky-400 text-sky-500'>
					<li className='flex items-center gap-2'>
						<Mail className='w-5 h-5' />
						Почта: info@itdextra.com
					</li>
					<li className='flex items-center gap-2'>
						<Phone className='w-5 h-5' />
						Номер: +7 (999) 443-42-63
					</li>
					<li className='flex items-center gap-2'>
						<Twitter className='w-5 h-5' />
						Twitter: @ITDextra
					</li>
					<li className='flex items-center gap-2'>
						<Linkedin className='w-5 h-5' />
						LinkedIn: linkedin.com/company/itdextra
					</li>
				</ul>
				<button
					onClick={onButtonClick}
					className={cn(
						'py-3 px-8 bg-sky-500 text-black font-thin rounded-full',
						'hover:bg-sky-400 transition-all duration-300 shadow-md hover:shadow-sky-400/50',
						'dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400 dark:hover:shadow-sky-400/50',
						'bg-white text-sky-500 hover:bg-gray-100 hover:text-sky-400 hover:shadow-gray-300/50'
					)}
				>
					Отправить заявку
				</button>
			</div>
		</section>
	)
}
