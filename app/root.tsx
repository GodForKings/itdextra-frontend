import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useNavigate,
} from 'react-router'
import type { Route } from './+types/root'

import './app.css'

import { SpeedInsights } from '@vercel/speed-insights/react'

import { Footer, Header } from '~/widgets'
import { MainLayout, cn } from '~/shared'
import { Modal } from './widgets/modal'

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

				{/* Vercel метрики*/}
				<SpeedInsights />

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
			<Modal />
		</>
	)
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const navigate = useNavigate()
	const handleToMain = () => {
		navigate('/')
	}

	let message = 'Упс! Произошла ошибка'
	let details = 'Произошла непредвиденная ошибка.'
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
				<div
					className='relative min-h-[80dvh] mx-[2vw] mb-[4vh] rounded-lg bg-gradient-to-tr from-slate-200 to-sky-400/15 dark:from-gray-900 dark:to-sky-800/40 p-8 flex flex-col items-center justify-center gap-8 border border-gray-950/15 overflow-hidden'
					role='alert'
					aria-label='Страница ошибки'
				>
					<h1 className='text-transparent bg-clip-text bg-gradient-to-tr from-neutral-950/70 to-sky-500 dark:from-slate-200 dark:to-sky-500 text-3xl md:text-5xl'>
						{message}
					</h1>

					<p className='text-xl md:text-4xl'>{details}</p>

					{stack && import.meta.env.DEV && (
						<pre className='w-full p-4 overflow-x-auto text-base text-mono'>
							<code>{stack}</code>
						</pre>
					)}

					<button
						onClick={handleToMain}
						className={cn(
							'py-3 px-6 bg-sky-500/70 text-gray-950 rounded-full transition-all duration-200 shadow-lg hover:shadow-sky-400/60 active:shadow-sky-400/60',
							'hover:translate-y-1 active:translate-y-1'
						)}
						aria-label='Вернуться на главную'
					>
						На главную
					</button>
				</div>
			</MainLayout>

			<Footer />
		</>
	)
}
