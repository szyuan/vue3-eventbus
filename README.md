<p align="center">
  <img src="https://i.imgur.com/FDytx8i.png" width="200" height="200" alt="vue3-eventbus"
    style="border-radius:40px; opacity:0.8"
  >
  <br>
  <a href="https://www.npmjs.org/package/vue3-eventbus"><img src="https://img.shields.io/npm/v/vue3-eventbus.svg" alt="npm"></a>
</p>

# Vue3-Eventbus

Tiny event bus plugin for Vue3.

## Why 使用原因
Vue3实例不再提供`$on`与`emit`函数，官方推荐引入外部工具实现，使用本插件可以让你更轻松的在Vue3中使用轻量且功能完善eventBus
[不引入插件的用法](#native-usage-without-vue3\-bus)

App instance dont't have `$on` and `$emit` methods anymore in Vue3.
> Remove \$on, \$off and \$once instance methods. Vue instances no longer implement the event emitter interface. 
> -- [active-rfcs/0020-events-api-change.md](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0020-events-api-change.md)

So the RFC suggests using a third-party library instead. But you have to do some repetitive work for it. This tiny tool can solve this problem for you.

## Install 安装


```sh
$ npm install --save vue3-eventbus
```

## Usage 用法
**use**

```js
// import {createApp} from 'vue
import eventBus from 'vue3-eventbus'
// const app = createApp(App)
app.use(eventBus)

```
**emit**
```js
// Button.vue
import bus from 'vue3-eventbus'
// or: import { bus } from 'vue3-eventbus'
export default {
    setup() {
        // fire an event
        bus.emit('foo', { a: 'b' })
    }
}
```
**listen/unlisten**
```js
// Panel.vue
import bus from 'vue3-eventbus'
export default {
    setup() {
       // listen to an event
        bus.on('foo', e => console.log('foo', e) )

        // listen to all events
        bus.on('*', (type, e) => console.log(type, e) )

        // working with handler references:
        function onFoo() {}
        bus.on('foo', onFoo)   // listen
        bus.off('foo', onFoo)  // unlisten
    }
}
```

### Advanced Usage 更多用法

**Access by instance 通过实例访问**

Don't need to import `vue3-eventbus`
不需要import `vue3-eventbus`

```js
export default {
    created() {
        this.$eventBus.emit('foo')
    }
}
```

**Access by inject method 通过inject访问**

Have to import `inject` api from `vue`

```js
import `inject` from 'vue'
export default {
    setup() {
        const bus = inject('$eventBus')
        bus.emit('foo')
    }
}
```

## Options 配置
app.use(bus, options)
```js
defaultOptions = {
    // Access by instance 是否挂载在全局
    global: true,
    // Access by inject 是否provide
    inject: true,
    // 实例上挂载的名称
    globalPropertyName: '$eventBus',
    // 通过inject引入的名称
    injectName: '$eventBus'
}
```
**example**
修改挂载在应用上的名称
```js
// main.js
app.use(bus, {
    globalPropertyName: '$ev'
})

// Button.vue
created() {
    this.$ev.emit('click', {time: Date.now()})
}
```
|
|
|
|
|
|
|

## Native usage without vue3-eventbus
不使用vue3-eventbus插件的原生用法
```js
// bus.js
// + + +
export default {
    on(){
        // ...
    }
    off(){
        // ...
    }
    emit(){
        // ...
    }
}

// main.js
// +
import $bus from './lib/helpers/bus.js'
// +
app.provide('$bus', $bus)
// +
app.config.globalProperties.$bus = $bus

// Button.vue
// +
import { inject } from 'vue'
setup() {
    // import and inject in every component
    // +
    const $bus = inject('$bus')
    $bus.emit('click')
}

// Panel.vue
// +
import { inject } from 'vue'
setup() {
    // +
    const $bus = inject('$bus')
    $bus.on('click')
}

// Page.vue
import { inject } from 'vue'
setup() {
    const $bus = inject('$bus')
    $bus.off('click')
}
```