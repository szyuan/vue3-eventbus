import mitt from 'mitt'

const eventBus = mitt()

const defaultOptions = {
    global: true,
    inject: true
}

eventBus.install = install
export default eventBus
export const bus = eventBus

function install(app, options) {
    let opt = {
        ...defaultOptions,
        ...options
    }
    if(opt.global) {
        app.config.globalProperties.$eventBus = eventBus;
    }
    if(opt.inject) {
        app.provide('$eventBus', eventBus)
    }
    return eventBus
}