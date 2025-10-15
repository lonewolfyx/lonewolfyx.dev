export { default as GithubContributionGraph } from './GithubContributionGraph.vue'

export const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '')
    const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16)
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
}

export const rgbToHex = (r: string, g: string, b: string) => {
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
}

export const generateGradient = (base: string, n: number) => {
    const [r, g, b] = hexToRgb(base)
    const colors = []
    for (let i = 0; i < n; i++) {
        const t = i / (n - 1)
        const rr = Math.round(235 + (r - 235) * t)
        const gg = Math.round(237 + (g - 237) * t)
        const bb = Math.round(240 + (b - 240) * t)
        colors.push(rgbToHex(rr, gg, bb))
    }
    return colors
}

export const parseDate = (data: string) => {
    const p = data.split('-').map(Number)
    return new Date(p[0], p[1] - 1, p[2])
}

export const diffDays = (a: number, b: number) => {
    return Math.round((a - b) / (1000 * 60 * 60 * 24))
}

export const addDays = (d: string, n: number) => {
    const r = new Date(d)
    r.setDate(r.getDate() + n)
    return r
}
