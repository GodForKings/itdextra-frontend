import { useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'

import { BREAKPOINTS } from '~/shared'

export const useMobile = (): boolean => {
	const query = useMemo(() => `(max-width: ${BREAKPOINTS.MOBILE}px)`, [])

	return useMediaQuery({ query })
}
