import { useCallback, type FC } from 'react'

import { useLocation } from 'react-router'

import { MobileNav } from '../mobile/MobileNav'
import { DesktopNav } from '../desktop/DesktopNav'
import {
	Logo,
	ThemeToggle,
	CustomLink,
	CONTACTS,
	ROUTES_DATA,
	cn,
} from '~/shared'

export const Header: FC = () => {
	const { Phone, NumberPhoneLink } = CONTACTS

	const { pathname } = useLocation()

	const bgVideo =
		pathname === ROUTES_DATA.services.path ||
		pathname === ROUTES_DATA.cases.path

	return (
		<nav
			className={cn(
				'fixed inset-0 z-30 flex h-11 md:h-14 items-center justify-between gap-4 px-4 sm:px-6 backdrop-blur-lg tracking-wider',
				!bgVideo && 'border-b border-black/10 dark:border-white/10'
			)}
		>
			<div className='relative flex items-center justify-between w-28'>
				<Logo />

				<ThemeToggle />
			</div>

			<MobileNav />

			<DesktopNav />

			<CustomLink currentLink={NumberPhoneLink}>{Phone}</CustomLink>
		</nav>
	)
}
