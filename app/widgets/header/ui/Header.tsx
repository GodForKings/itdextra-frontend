import type { FC } from 'react'

import { MobileNav } from '../mobile/MobileNav'
import { DesktopNav } from '../desktop/DesktopNav'
import { Logo, ThemeToggle, CustomLink, CONTACTS } from '~/shared'

export const Header: FC = () => {
	const { Phone, NumberPhoneLink } = CONTACTS

	return (
		<nav className='fixed inset-x-0 top-0 z-15 border-b border-black/5 dark:border-white/10 bg-white dark:bg-gray-950 flex h-14 items-center justify-between gap-8 px-4 sm:px-6'>
			<div className='flex items-center justify-between relative w-28'>
				<Logo />

				<ThemeToggle />
			</div>

			<MobileNav />

			<DesktopNav />

			<CustomLink currentLink={NumberPhoneLink}>{Phone}</CustomLink>
		</nav>
	)
}
