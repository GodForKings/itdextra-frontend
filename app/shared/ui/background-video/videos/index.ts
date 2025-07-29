import neonTunnelMp4 from './neonTunnel.mp4'
import abstractCubes from './abstractCubes.mp4'

import neonTunImg from '../images/neoTunnel.png'
import cubesTunnel from '../images/cubesTunnel.png'

export const VIDEO_SOURCE = {
	neonTunnel: {
		mp4: neonTunnelMp4,
		poster: neonTunImg,
		altText: 'Neon tunnel background',
	},
	abstractCubes: {
		mp4: abstractCubes,
		poster: cubesTunnel,
		altText: 'Abstract cubes background',
	},
}
export type Video_Source = (typeof VIDEO_SOURCE)[keyof typeof VIDEO_SOURCE]
