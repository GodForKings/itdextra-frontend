/// <reference types="vite/client" />
/// <reference types="@tailwindcss/vite" />

//Для поддержки переменных окружения
interface ImportMetaEnv {
	readonly VITE_API_URL: string
	// Добавьте другие переменные здесь
}
interface ImportMeta {
	readonly env: ImportMetaEnv
}

//Для работы css.module in TS
declare module '*.module.css' {
	const classes: { [key: string]: string }
	export default classes
}
//Для изображений
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.gif'
declare module '*.svg'
//Для Джейсонов
declare module '*.json' {
	const value: any
	export default value
}
//для видео
declare module '*.mp4'
declare module '*.webm'
