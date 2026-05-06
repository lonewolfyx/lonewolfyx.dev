export default defineComponent({
    name: 'TerminalBio',
    props: {
        command: {
            type: String,
        },
    },
    setup(props) {
        return () => h('div', {
            class: 'mb-3 text-xs text-stone-500 tracking-wide font-mono dark:text-stone-400',
        }, `$ ${props.command}`)
    },
})
