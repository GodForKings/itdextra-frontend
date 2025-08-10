import { useCallback } from 'react'
import { DefaultCallToAction, openModal } from '~/widgets'

export const useCTAModal = () => {
	const handleCTAClick = useCallback(() => {
		openModal({ content: <DefaultCallToAction /> })
	}, [])

	return handleCTAClick
}
