import type { FC } from 'react'

import { useMobile } from '~/shared/lib'
import { MobileNav } from '../mobile/MobileNav'
import { DesktopNav } from '../desktop/DesktopNav'
import { Logo, PhoneNumber } from '~/shared'

export const Header: FC = () => {
	const isMobile = useMobile()

	return (
		<nav className='fixed inset-x-0 top-0 z-10 border-b border-black/5 dark:border-white/10 bg-white dark:bg-gray-950 flex h-14 items-center justify-between gap-8 px-4 sm:px-6'>
			<Logo />

			{isMobile ? <MobileNav /> : <DesktopNav />}

			<PhoneNumber />
		</nav>
	)
}
