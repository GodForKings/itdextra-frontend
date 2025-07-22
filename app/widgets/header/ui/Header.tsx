import type { FC } from 'react'

import { MobileNav } from '../mobile/MobileNav'
import { DesktopNav } from '../desktop/DesktopNav'
import { Logo, PhoneNumber, ThemeToggle } from '~/shared'

export const Header: FC = () => {
	return (
		<nav className='fixed inset-x-0 top-0 z-15 border-b border-black/5 dark:border-white/10 bg-white dark:bg-gray-950 flex h-14 items-center justify-between gap-8 px-4 sm:px-6'>
			<div className='flex items-center justify-between relative w-28'>
				<Logo />

				<ThemeToggle />
			</div>

			<MobileNav />

			<DesktopNav />

			<PhoneNumber />
		</nav>
	)
}
