import { type FC, useRef, useEffect } from 'react'
import { Button, cn } from '~/shared' // Предполагаемые пути
import { openModal } from '~/widgets' // Предполагаемый путь

// Типы для данных (вынеси в отдельный файл при необходимости)
interface TeamMember {
	name: string
	position: string
	bio: string
	imageUrl: string
	socialLinks?: { name: string; url: string }[]
}

interface ContactInfo {
	email: string
	phone: string
	socials: { name: string; url: string; icon?: string }[]
}

// Пропсы для страницы (данные будем передавать извне)
interface ContactsPageProps {
	contactData: ContactInfo
	onCtaClick: () => void // Колбэк для кнопки
}

export const ContactsPage: FC<ContactsPageProps> = ({
	contactData,
	onCtaClick,
}) => {
	const sectionRef = useRef<HTMLElement>(null)
	const cardsRef = useRef<HTMLDivElement>(null)
	const infoRef = useRef<HTMLDivElement>(null)

	const teamData: TeamMember[] = [
		{ name: '43434', position: 'admin', bio: 'male', imageUrl: '232' },
		{ name: '43434', position: 'admin', bio: 'male', imageUrl: '232' },
		{ name: '43434', position: 'admin', bio: 'male', imageUrl: '232' },
	]
	useEffect(() => {
		if (typeof window === 'undefined') return
		let cleanup: (() => void) | undefined

		return () => cleanup?.()
	}, [])

	return (
		<section
			ref={sectionRef}
			className={cn(
				'min-h-screen w-full overflow-hidden',
				'flex flex-col gap-20 lg:gap-32 py-20 px-4 md:px-8',
				'bg-white dark:bg-zinc-900'
			)}
		>
			{/* Секция 1: Команда */}
			<div>
				<h2
					className={cn(
						'text-3xl md:text-5xl font-light mb-16 text-left',
						'text-black dark:text-white'
					)}
				>
					Контакты
				</h2>
				<div
					ref={cardsRef}
					className={cn(
						'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto'
					)}
				>
					{teamData?.map((member, index) => (
						<TeamMemberCard key={member.name} member={member} index={index} />
					))}
				</div>
			</div>

			{/* Секция 2: Контакты */}
			<div
				ref={infoRef}
				className={cn(
					'flex flex-col lg:flex-row items-start justify-between gap-12',
					'max-w-6xl mx-auto w-full'
				)}
			>
				<div className='flex-1'>
					<h2
						className={cn(
							'text-3xl md:text-5xl font-light mb-8',
							'text-black dark:text-white'
						)}
					>
						Свяжитесь с нами
					</h2>
				</div>

				{/* Decorative Element / Image Placeholder */}
				<div
					className={cn(
						'flex-1 w-full h-80 lg:h-[480px] relative',
						'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
						'dark:from-blue-400/5 dark:to-cyan-400/5',
						'rounded-2xl overflow-hidden',
						'flex items-center justify-center'
					)}
				>
					<div
						className={cn(
							'absolute inset-0',
							'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]',
							'from-transparent via-blue-100/5 to-transparent',
							'dark:via-blue-900/5'
						)}
					/>
					<svg
						className='w-1/3 h-1/3 text-blue-500/30 dark:text-blue-400/20'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth={0.5}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
						/>
					</svg>
				</div>
			</div>
		</section>
	)
}

// Компонент карточки участника команды
const TeamMemberCard: FC<{ member: TeamMember; index: number }> = ({
	member,
	index,
}) => {
	return (
		<div
			className={cn(
				'group relative p-8 rounded-3xl',
				'bg-gradient-to-br from-white to-gray-50',
				'dark:from-zinc-800 dark:to-zinc-700',
				'shadow-lg shadow-gray-500/10 dark:shadow-black/20',
				'hover:shadow-xl hover:shadow-blue-500/10',
				'transition-all duration-500 ease-out',
				'overflow-hidden',
				index % 2 === 0 ? 'lg:-rotate-2' : 'lg:rotate-2', // Асимметрия
				'hover:rotate-0' // Выравниваем при ховере
			)}
		>
			{/* Декоративный фон */}
			<div
				className={cn(
					'absolute -right-4 -top-4 w-32 h-32 rounded-full',
					'bg-blue-500/5 group-hover:bg-blue-500/10',
					'transition-all duration-700 ease-out'
				)}
			/>
			<div
				className={cn(
					'absolute -left-4 -bottom-4 w-24 h-24 rounded-full',
					'bg-cyan-500/5 group-hover:bg-cyan-500/10',
					'transition-all duration-700 ease-out delay-75'
				)}
			/>

			<div className='relative z-10'>
				{/* Изображение - большое и с интересным позиционированием */}
				<div
					className={cn(
						'relative w-32 h-32 mb-6',
						'rounded-2xl overflow-hidden',
						'shadow-lg shadow-black/20',
						index % 2 === 0
							? 'rotate-6 translate-x-4'
							: '-rotate-6 -translate-x-4'
					)}
				>
					<img
						src={member.imageUrl}
						alt={member.name}
						className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
					/>
					<div
						className={cn(
							'absolute inset-0',
							'bg-gradient-to-t from-black/20 to-transparent'
						)}
					/>
				</div>

				<h3
					className={cn(
						'text-2xl font-semibold mb-2',
						'text-black dark:text-white'
					)}
				>
					{member.name}
				</h3>
				<p
					className={cn(
						'text-lg mb-4',
						'text-blue-600 dark:text-blue-400',
						'font-medium'
					)}
				>
					{member.position}
				</p>
				<p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
					{member.bio}
				</p>
			</div>
		</div>
	)
}

// Компонент списка контактной информации
const ContactInfoList: FC<{
	contactData: ContactInfo
	onCtaClick: () => void
}> = ({ contactData, onCtaClick }) => {
	return (
		<div className='space-y-6'>
			<div className='space-y-4'>
				<ContactItem
					icon={
						<svg
							className='w-6 h-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={1.5}
								d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
							/>
						</svg>
					}
					label='Email'
					value={contactData.email}
					href={`mailto:${contactData.email}`}
				/>

				<ContactItem
					icon={
						<svg
							className='w-6 h-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={1.5}
								d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
							/>
						</svg>
					}
					label='Телефон'
					value={contactData.phone}
					href={`tel:${contactData.phone}`}
				/>
			</div>

			<div className='pt-4'>
				<h4 className='text-lg font-semibold mb-4 text-black dark:text-white'>
					Социальные сети
				</h4>
				<div className='flex gap-4 flex-wrap'>
					{contactData.socials.map(social => (
						<a
							key={social.name}
							href={social.url}
							target='_blank'
							rel='noopener noreferrer'
							className={cn(
								'p-3 rounded-xl',
								'bg-gray-100 dark:bg-zinc-700',
								'hover:bg-blue-100 dark:hover:bg-blue-900/30',
								'transition-colors duration-200',
								'group'
							)}
						>
							<span className='text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'>
								{social.name}
							</span>
						</a>
					))}
				</div>
			</div>

			<div className='pt-6'>
				<Button
					square={true}
					onClick={onCtaClick}
					styles='w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors duration-200'
				>
					Начать проект
				</Button>
			</div>
		</div>
	)
}

// Базовый компонент элемента контакта
const ContactItem: FC<{
	icon: React.ReactNode
	label: string
	value: string
	href: string
}> = ({ icon, label, value, href }) => {
	return (
		<a
			href={href}
			className={cn(
				'flex items-center gap-4 p-4 rounded-xl',
				'bg-gray-50 dark:bg-zinc-800',
				'hover:bg-blue-50 dark:hover:bg-blue-900/20',
				'transition-colors duration-200',
				'group'
			)}
		>
			<div
				className={cn(
					'p-2 rounded-lg',
					'bg-blue-100 dark:bg-blue-900/30',
					'group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40',
					'transition-colors duration-200'
				)}
			>
				{icon}
			</div>
			<div>
				<p className='text-sm text-gray-500 dark:text-gray-400'>{label}</p>
				<p className='text-lg font-medium text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'>
					{value}
				</p>
			</div>
		</a>
	)
}
