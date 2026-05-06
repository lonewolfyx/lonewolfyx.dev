import type { SetupContext, SlotsType, VNodeChild } from 'vue'

export function createReusableTemplate<T extends Record<string, any> = Record<string, any>>() {
    let render: ((props: T) => VNodeChild) | null

    const DefineTemplate = {
        setup(_: Record<string, any>, context: SetupContext<object, SlotsType<{ default: (props: T) => VNodeChild }>>) {
            return () => {
                render = context.slots.default
            }
        },
    }

    const UseTemplate = (props: T): VNodeChild => render?.(props)

    return [DefineTemplate, UseTemplate]
}
