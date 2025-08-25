import { z } from 'zod'

export const contactSchema = z.object({
	name: z
		.string()
		.min(2, 'Вы не указали имя 👽')
		.max(50, 'Слишком длинное имя'),
	email: z.string().min(6, 'Некорректная почта 🤖'),
	phone: z
		.string()
		.optional()
		.refine(
			val => !val || /^\+?[1-9]\d{1,14}$/.test(val),
			'Некорректный телефон'
		),
	textMessage: z.string().min(10, 'Всё же опишите немного свой проект 😁'),
})

export type ContactSchema = z.infer<typeof contactSchema>

export type ResponseContact = {
	message: string
}
