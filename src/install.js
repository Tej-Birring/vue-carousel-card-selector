import TopLevel from "@/components/TopLevel.vue"

const Plugin = {
    install(Vue, /* options */) {
        Vue.component("card-selector", TopLevel);
    }
}

/* Automatic installation, if Vue is added to the global scope */
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin);
}

/* Export for manual installation */
export default Plugin;
