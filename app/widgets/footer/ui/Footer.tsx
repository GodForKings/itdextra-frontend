import type { FC } from 'react'

import { Link } from 'react-router'

import { Navigation, Contacts, MainDirections, SocialLink } from './index'
import { ICONS, ROUTES_DATA, cn, socialIcons } from '~/shared'

export const Footer: FC = () => {
	return (
		<footer className='relative z-10 bg-white dark:bg-gray-950 border-t border-black/10 dark:border-white/20'>
			<div
				className={cn(
					'relative mx-[5vw] border-x border-black/5 dark:border-white/20 font-mono'
				)}
			>
				{/* Верхняя часть: лого, ссылки, контакты */}
				<div className={cn('relative grid grid-cols-1 lg:grid-cols-4')}>
					<div className='absolute inset-0 -z-1 bg-[repeating-linear-gradient(45deg,transparent_6px,transparent_12px,currentColor_12px,currentColor_13px)] opacity-20 dark:opacity-[0.05] dark:bg-[repeating-linear-gradient(45deg,transparent_6px,transparent_12px,currentColor_12px,currentColor_13px)]' />

					{/* Блок с лого и описанием */}
					<Link
						to={ROUTES_DATA.index.path}
						className={cn(
							'flex justify-center items-center p-10',
							'max-lg:border-b border-black/10 dark:border-white/20'
						)}
					>
						<img
							src={ICONS.ITDextraFullLogo}
							alt='ITDextra full logo'
							className='h-24 z-5'
						/>
					</Link>

					<Navigation />

					<MainDirections />

					<Contacts />
				</div>

				{/* Соцсети */}
				<div
					className={cn(
						'relative flex justify-center items-center gap-15 border-y border-black/10 dark:border-white/20 py-10'
					)}
				>
					<SocialLink labelName='VK' socialLink='#'>
						{socialIcons.vk}
					</SocialLink>

					<SocialLink labelName='Telegram' socialLink='#'>
						{socialIcons.telegram}
					</SocialLink>

					<SocialLink labelName='WhatsApp' socialLink='#'>
						{socialIcons.whatsApp}
					</SocialLink>
				</div>

				{/* Копирайт */}
				<div
					className={cn(
						'relative flex justify-center items-center flex-col gap-4 font-sans font-semibold text-transparent bg-clip-text bg-gradient-to-bl from-sky-600 to-neutral-950 dark:from-slate-50 dark:to-sky-400'
					)}
				>
					<Link to={ROUTES_DATA.index.path}>Политика конфиденциальности</Link>
					Copyright © 2020 - {new Date().getFullYear()} ITDextra.
				</div>
			</div>
		</footer>
	)
}
