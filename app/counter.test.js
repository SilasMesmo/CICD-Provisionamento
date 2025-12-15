import { describe, it, expect, vi } from 'vitest'
import { deploySimulation, shutdownSimulation } from './main'

describe('Faça Deploy', () => {
    it('should update button text on click', () => {
        const btn = document.createElement('button')
        const statusText = document.createElement('span')
        const statusIndicator = document.createElement('div')

        deploySimulation(btn, statusText, statusIndicator)

        btn.click()

        expect(btn.innerHTML).toBe('Fazendo Deploy...')
        expect(btn.disabled).toBe(true)
    })

    it('should update status after delay', async () => {
        vi.useFakeTimers()
        const btn = document.createElement('button')
        const statusText = document.createElement('span')
        const statusIndicator = document.createElement('div')

        deploySimulation(btn, statusText, statusIndicator)

        btn.click()

        vi.advanceTimersByTime(1500)

        expect(btn.innerHTML).toBe('Deployado!')
        expect(statusText.innerHTML).toBe('Sistema Ativo')
        expect(statusIndicator.classList.contains('ativo')).toBe(true)

        vi.useRealTimers()
    })
})

describe('Shutdown Simulation', () => {
    it('should update button text on click', () => {
        const btn = document.createElement('button')
        const statusText = document.createElement('span')
        const statusIndicator = document.createElement('div')

        shutdownSimulation(btn, statusText, statusIndicator)

        btn.click()

        expect(btn.innerHTML).toBe('Desligando...')
        expect(btn.disabled).toBe(true)
    })

    it('should update status after delay', async () => {
        vi.useFakeTimers()
        const btn = document.createElement('button')
        const statusText = document.createElement('span')
        const statusIndicator = document.createElement('div')

        shutdownSimulation(btn, statusText, statusIndicator)

        btn.click()

        vi.advanceTimersByTime(2000)

        expect(btn.innerHTML).toBe('Desligado')
        expect(statusText.innerHTML).toBe('Sistema Offline')

        vi.useRealTimers()
    })
})