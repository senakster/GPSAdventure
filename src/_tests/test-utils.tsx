import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { StateProvider, initialState } from '_state'

const AllTheProviders: React.FC = ({ children }) => {
    return (
        <StateProvider value={initialState}>
                {children}
        </StateProvider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }