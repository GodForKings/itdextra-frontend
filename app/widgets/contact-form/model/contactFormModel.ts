import { createEffect } from 'effector'
import axios from 'axios'

import type { ContactSchema, ResponseContact } from './types'

export const sendDataFx = createEffect(async (data: ContactSchema) => {
	try {
		return await axios.post<ResponseContact>(
			`${import.meta.env.VITE_API_BASE_URL}/api/submit-request`,
			data
		)
	} catch (error) {
		console.log(`${error}`)
	}
})

const $sendIsLoading = sendDataFx.pending

export const stores = {
	$sendIsLoading,
}

export const effects = {
	sendDataFx,
}
