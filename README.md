# Vue3-Bus

Tiny event bus plugin for Vue3.

## Why 使用原因
Vue3实例不再提供`$on`与`emit`函数，官方推荐引入外部工具实现，使用本插件可以让你更轻松的在Vue3中使用轻量且功能完善eventBus

App instance dont't have `$on` and `$emit` methods anymore in Vue3.
> Remove \$on, \$off and \$once instance methods. Vue instances no longer implement the event emitter interface. 
> -- [active-rfcs/0020-events-api-change.md](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0020-events-api-change.md)

So the RFC suggests using a third-party library instead. But you have to do some repetitive work for it. This tiny tool can solve this problem for you.


## Install 安装


```sh
$ npm install --save vue3-bus
```

## Usage 用法
**use**

```js
// import {createApp} from 'vue
import eventBus from 'vue3-bus'
// const app = createApp(App)
app.use(eventBus)

```
**emit**
```js
// Button.vue
import bus from 'vue3-bus'
// or: import { bus } from 'vue3-bus'
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
import bus from 'vue3-bus'
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

Don't have to import `vue3-bus`
不需要import `vue3-bus`

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
```js
defaultOptions = {
    // Access by instance
    global: true,
    // Access by inject
    inject: true
}

app.use(bus, {
    inject: false
})
```