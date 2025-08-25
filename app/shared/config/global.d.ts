/// <reference types="vite/client" />
/// <reference types="@tailwindcss/vite" />

//Для поддержки переменных окружения
interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string
}
interface ImportMeta {
	readonly env: ImportMetaEnv
}

/* Для работы css.module in TS */
declare module '*.module.css' {
	const classes: { readonly [key: string]: string }
	export default classes
}

/* Для изображений */
declare module '*.jpg' {
	const src: string
	export default src
}
declare module '*.jpeg' {
	const src: string
	export default src
}
declare module '*.png' {
	const src: string
	export default src
}
declare module '*.gif' {
	const src: string
	export default src
}
declare module '*.svg' {
	const src: string
	export default src
}

/* JSON (типизировать напрямую) */
declare module '*.json' {
	const value: Record<string, unknown> | unknown[]
	export default value
}

/* Для видео и аудио */
declare module '*.mp4' {
	const src: string
	export default src
}
declare module '*.webm' {
	const src: string
	export default src
}
declare module '*.mov' {
	const src: string
	export default src
}
declare module '*.avi' {
	const src: string
	export default src
}
