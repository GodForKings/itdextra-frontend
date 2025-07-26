const NUMBER_PHONE_LINK: string = 'tel:+79059750555' as const
const PHONE: string = '8 (905) 975-05-55' as const
const MAIL: string = 'example@hello.ru' as const
const ADDRESS: string = 'Заун, ул. Заунская, д. Нижний'

export const CONTACTS = {
	Phone: PHONE,
	NumberPhoneLink: NUMBER_PHONE_LINK,
	Mail: MAIL,
	Address: ADDRESS,
} as const
export type Contacts = (typeof CONTACTS)[keyof typeof CONTACTS]
