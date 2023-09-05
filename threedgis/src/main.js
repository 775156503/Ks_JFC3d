import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '../node_modules/@supermap/iclient3d-vue-for-webgl/lib/theme/index.css'
import webgl3d from '@supermap/iclient3d-vue-for-webgl'
import router from './router/index'
const app = createApp(App)
// 引入ui依赖
app.use(ElementPlus)
app.use(Antd)
// 引入webgl3d组件包
app.use(webgl3d)
app.use(router)
app.mount('#app')
