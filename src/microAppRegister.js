import { registerMicroApps, start, setDefaultMountApp, runAfterFirstMounted, initGlobalState } from 'qiankun'

export default function microAppRegister (vm) {
  if(!window.isQiankunStart) {
    window.isQiankunStart = true

    let langInfo = vm.$store.state.setting.lang
    
    /*
     *主应用的生命周期
     * (这不是必须的，可以省略)
     *
     * */
    const mainLifeCycles = {
      beforeLoad: [
        app => {
          console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
        }
      ],
      beforeMount: [
        app => {
          console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
        }
      ],
      afterMount : [
        app => {
          // 处理微应用切换，公共数据没更新
          console.log('[LifeCycle] after mount %c%s', 'color: red;', app.name)
          let newLangInfo = vm.$store.state.setting.lang
          if(newLangInfo !== langInfo) {
            langInfo = newLangInfo
            actions.setGlobalState({
              langInfo: newLangInfo
            })
          }
        }
      ],
      afterUnmount: [
        app => {
          console.log(
            '[LifeCycle] after unmount %c%s',
            'color: green;',
            app.name
          )
        }
      ]
    }

    /*
     * registerMicroApps(apps, lifeCycles?)
     *  @param apps  {Array<RegistrableApp>}   - 必选，微应用的一些注册信息
     *  @param lifeCycles {LifeCycles}         - 可选，全局的微应用生命周期钩子
     *
     * 当微应用信息注册完后
     * 一旦浏览器url发生变化
     * 便会自动触发qiankun的匹配逻辑
     * 所有activeRule规则匹配上的微应用就会被插入到主应用指定的container中
     * 同时以此调用微应用暴露出的生命周期钩子函数
     *
     * */
    const loader = loading => {
      console.log('LOADER %c%s', 'color:yellow', loading)
      vm.$store.commit('microApp/loadingToggle', loading)
    }
    let apps = vm.$store.getters['microApp/microApps']
    // 用户信息
    let userInfo = vm.$store.getters['account/user']
    console.log('registerMicroApps', apps)
    registerMicroApps(
      apps.map(app => {
        let appInfo = {...app}
        appInfo.props = Object.assign({}, appInfo.props || {}, {
          userInfo: userInfo,
          langInfo: langInfo
        })
        return { ...appInfo, loader }
      }),
      mainLifeCycles
    )

    /*
     *
     * setDefaultMountApp(appLink)
     * @param {string} appLink 必选，设置默认加载的微应用相匹配的URL（注意与apps中的activeRule保持一致）
     *
     * BTW, 如果设置了默认加载的微应用URL，则主应用中就不要设置‘/’的默认路由了，后者会被前者覆盖
     *
     * */
    setDefaultMountApp(apps[0].activeRule)

    /*
     * 启动 qiankun
     *
     *  start(opts?)
     *  @param {Options} opts
     *
     *
     *  Options
     *  @param {boolean | 'all' | string[] | (( apps: RegistrableApp[] ) => { criticalAppNames: string[]; minorAppsName: string[] })} prefetch 可选，是否开启预加载，默认为 true
     *  @param {boolean | { strictStyleIsolation?: boolean, experimentalStyleIsolation?: boolean }} sandbox  可选，是否开启沙箱，默认为 true
     *  @param {boolean | ((app: RegistrableApp<any>) => Promise<boolean>)} singular 可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true
     *  @param {Function} fetch 可选，自定义的 fetch 方法
     *  @param {(url: string) => string } getPublicPath 可选
     *  @param {(url: string) => string } getTemplate  可选
     *  @param {(url: string) => string } excludeAssetFilter  可选，指定部分特殊的动态加载的微应用资源（css/js) 不被qiankun 劫持处理
     *
     * */
    start({
      prefetch: true,
      // 开启严格模式会造成一些有全局作用的插件或组件异常，比如antd的Modal组件
      // sandbox: { strictStyleIsolation: true },
      singular: true
    })

    /*
     *  runAfterFirstMounted(effect)
     *  第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
     *  这个方法不是必须的，可以不调用。
     *
     *  @param {() => void} 必选
     *
     * */
    runAfterFirstMounted(() => {
      console.log('[MainApp] first app mounted')
    })
  }
}


// 初始化 state
export const state = {
  testAttr: 'Hi Channing',
  scrollToBottom: false,
  microAppsRouterMap: [],
  isLoadingMicro: false
}

console.log('initGlobalState...')

export const actions = initGlobalState(state)

/* 暴露三个全局通信方法给主应用的子组件 */
export const {
  onGlobalStateChange,
  setGlobalState,
  offGlobalStateChange
} = actions

/* 全局通信方法的使用demo */
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('主应用全局监听到state发生变化!!!!!!!!!!!!!!!!!!!!!!!!!!')
  console.log('state', state)
  console.log('prev', prev)
})
// state.testAttr = 'Hi Channing again!!!!!!!'
// state.isLoadingMicro = true
// actions.setGlobalState(state)

actions.getGlobalState = (key) => {
  return key ? state[key] : state
}
// actions.offGlobalStateChange()
