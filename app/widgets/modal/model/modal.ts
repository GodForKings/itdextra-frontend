import { createStore, createEvent } from 'effector'

export const openModal = createEvent<{ content: React.ReactNode }>()
export const closeModal = createEvent()

export const $modalState = createStore<{
	isOpen: boolean
	content: React.ReactNode | null
}>({ isOpen: false, content: null })
	.on(openModal, (_, { content }) => ({ isOpen: true, content }))
	.on(closeModal, () => ({ isOpen: false, content: null }))

export const $isModalOpen = $modalState.map(state => state.isOpen)
export const $modalContent = $modalState.map(state => state.content)
