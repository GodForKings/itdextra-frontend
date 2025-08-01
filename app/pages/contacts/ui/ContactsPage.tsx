import type { FC } from 'react'

import { GRID_LINES, cn } from '~/shared'

export const ContactsPage: FC = () => {
	return (
		<main
			className={cn(
				'pt-16 px-[2dvw] min-h-[100dvh] bg-white dark:bg-gray-950',
				GRID_LINES
			)}
		>
			Контакты Свяжитесь с нами Мы всегда готовы ответить на ваши вопросы и
			помочь вам с проектами. Email info@itdextra.com Телефон +7 (123) 456-78-90
			Офис г. Москва, ул. Примерная, д. 10
		</main>
	)
}
