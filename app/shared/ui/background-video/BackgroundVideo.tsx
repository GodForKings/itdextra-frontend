import type { FC } from 'react'

import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router'

import { ROUTES_DATA } from '~/shared'
import { VIDEO_SOURCE, type Video_Source } from './videos'
import { surfacingVideo } from './lib/surfacing'

export const BackgroundVideo: FC = () => {
	const PAGE_TO_VIDEO_MAP: Record<string, Video_Source> = {
		[ROUTES_DATA.services.path]: VIDEO_SOURCE.neonTunnel,
		[ROUTES_DATA.cases.path]: VIDEO_SOURCE.abstractCubes,
	}

	const { pathname } = useLocation()

	const overlayRef = useRef<HTMLDivElement>(null)

	const videoData = PAGE_TO_VIDEO_MAP[pathname] || VIDEO_SOURCE.neonTunnel

	useEffect(() => {
		if (typeof window === 'undefined') return

		surfacingVideo(overlayRef)
	}, [])

	return (
		<div className='fixed inset-0 -z-10 overflow-hidden'>
			<div
				ref={overlayRef}
				className='fixed inset-0 pointer-events-none z-2 backdrop-blur-2xl bg-gray-900/20 transition-all duration-1500'
				style={{
					clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
				}}
			></div>

			<video
				autoPlay
				loop
				muted
				playsInline
				preload='auto'
				className='w-full h-full object-cover brightness-50'
				poster={videoData.poster}
				src={videoData.mp4}
			>
				<img
					src={videoData.poster}
					alt={videoData.altText}
					className='w-full h-full object-cover'
				/>
			</video>
		</div>
	)
}
