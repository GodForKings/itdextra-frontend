import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'react-router'
import type { Route } from './+types/root'

import './app.css'

import { Footer, Header } from '~/widgets'
import { MainLayout } from '~/shared'

export const links: Route.LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
	},
]

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='dark'>
			<head>
				<meta charSet='utf-8' />

				<meta name='viewport' content='width=device-width, initial-scale=1' />

				<Meta />

				<Links />
			</head>

			<body>
				{children}

				<ScrollRestoration />

				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return (
		<>
			<Header />

			<MainLayout>
				<Outlet />
			</MainLayout>

			<Footer />
		</>
	)
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = 'Упс! Произошла ошибка'
	let details = 'An unexpected error occurred.'
	let stack: string | undefined

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error'
		details =
			error.status === 404 ? 'Страница не найдена' : error.statusText || details
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message
		stack = error.stack
	}

	return (
		<>
			<Header />

			<MainLayout>
				<div className='rounded-xl bg-white p-5 dark:bg-gray-950 text-neutral-950 dark:text-slate-200 flex flex-col items-center justify-center text-4xl md:text-2xl font-bold'>
					<h1>{message}</h1>

					<p className='text-xl md:text-2xl'>{details}</p>

					{stack && (
						<pre className='w-full p-4 overflow-x-auto'>
							<code>{stack}</code>
						</pre>
					)}
				</div>
			</MainLayout>

			<Footer />
		</>
	)
}
