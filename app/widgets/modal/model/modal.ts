import { createStore, createEvent } from 'effector'

import type { Modal } from './types'

export const openModal = createEvent<{ content: React.ReactNode }>()
export const closeModal = createEvent()

const CLEAR_CONTENT: Modal = {
	isOpen: false,
	content: null,
}

export const $modalState = createStore<Modal>(CLEAR_CONTENT)
	.on(openModal, (_, { content }) => ({ isOpen: true, content }))
	.on(closeModal, () => CLEAR_CONTENT)

export const $isModalOpen = $modalState.map(state => state.isOpen)
export const $modalContent = $modalState.map(state => state.content)
