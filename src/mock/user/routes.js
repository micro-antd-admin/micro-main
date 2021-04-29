import Mock from 'mockjs'

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/routes`, 'get', () => {
  let result = {}
  result.code = 0
  result.data = [{
    router: 'root',
    children: [
      {
        router: 'microApp',
        name: 'Vue 微应用',
        appName: 'micro-vue',
        path: 'micro-vue',
        entry: 'http://localhost:9000',
        icon: 'appstore',
        children: [
          {
            router: 'parent',
            name: '二级目录',
            icon: 'ant-design',
            children: ['test']
          },
          {
            router: 'home',
            icon: 'calendar',
            name: '首页',
          },
          {
            router: 'about',
            icon: 'bulb',
            name: '关于'
          }
        ]
      },
      // {
      //   router: 'microApp',
      //   name: 'React 微应用',
      //   appName: 'micro-react',
      //   path: 'micro-react',
      //   entry: 'http://localhost:3000',
      //   children: ['home', 'about']
      // },
      {
        router: 'dashboard',
        children: ['workplace', 'analysis'],
      },
      {
        router: 'form',
        children: ['basicForm', 'stepForm', 'advanceForm']
      },
      {
        router: 'basicForm',
        name: '验权表单',
        icon: 'file-excel',
        authority: 'queryForm'
      },
      {
        router: 'antdv',
        path: 'antdv',
        name: 'Ant Design Vue',
        icon: 'ant-design',
        link: 'https://www.antdv.com/docs/vue/introduce-cn/'
      },
      {
        router: 'document',
        path: 'document',
        name: '使用文档',
        icon: 'file-word',
        link: 'https://iczer.gitee.io/vue-antd-admin-docs/'
      }
    ]
  }]
  return result
})
