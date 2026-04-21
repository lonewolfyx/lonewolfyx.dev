import { createSharedComposable } from '@vueuse/core'

const COOKIE_NAME = 'user_config'

export type Layout = 'fixed' | 'full'
export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'
export type InstallationType = 'cli' | 'manual'

export interface IUserConfig {
    layout: Layout
    packageManager: PackageManager
    installationType: InstallationType
}

export const useConfig = createSharedComposable(() => {
    const config = useCookie<IUserConfig>(COOKIE_NAME, {
        default: () => ({
            layout: 'full',
            packageManager: 'pnpm',
            installationType: 'cli',
        }),
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
    })

    return {
        config,
    }
})
