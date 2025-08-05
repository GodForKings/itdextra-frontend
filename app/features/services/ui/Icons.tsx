import { Code, BrainCircuit, ShoppingCart } from 'lucide-react'
import { cn } from '~/shared'

const iconStyle: string = cn(
	'w-14 h-14 text-neutral-950 dark:text-white transition-all duration-500 drop-shadow-[0_0_15px_rgba(60,140,246,0.6)]',
	'group-hover:scale-110 group-hover:text-sky-500 active:text-sky-500'
)

const bgIconStyle: string = cn(
	'absolute inset-0 rounded-full bg-sky-400/40 blur-xl transition-transform duration-300 animate-pulse'
)

export const icons = {
	ecommerce: (
		<div className='group relative'>
			<ShoppingCart className={iconStyle} strokeWidth={1.25} />
			{/* Анимированное свечение */}
			<div className={bgIconStyle} />
		</div>
	),
	web: (
		<div className='group relative'>
			<Code className={iconStyle} strokeWidth={1.25} />
			{/* Анимированное свечение */}
			<div className={bgIconStyle} />
		</div>
	),
	ai: (
		<div className='group relative'>
			<BrainCircuit className={iconStyle} strokeWidth={1.25} />
			{/* Анимированное свечение */}
			<div className={bgIconStyle} />
		</div>
	),
} as const
