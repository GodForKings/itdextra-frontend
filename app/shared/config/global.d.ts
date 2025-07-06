/// <reference types="vite/client" />
/// <reference types="@tailwindcss/vite" />

//Для работы css.module in TS
declare module '*.module.css' {
	const classes: { [key: string]: string }
	export default classes
}
//Для поддержки переменных окружения
declare namespace NodeJS {
	interface ProcessEnv {
		VITE_TG_ID: string
	}
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
