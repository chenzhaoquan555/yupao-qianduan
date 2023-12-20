import { createApp } from 'vue'
import App from './App.vue'
// 2. 引入组件样式
import 'vant/lib/index.css';
import 'vant/es/toast/style';
// 1. 引入你需要的组件
//引入vue router组件库 将vue-router中的所有方法都导入到VueRouter对象中
import * as VueRouter from 'vue-router';
import routes from "./config/routes.ts";
import Vant, {Calendar} from 'vant';
import 'vant/lib/index.css';
//引入全局css
import '/global.css';




const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    //history: VueRouter.createWebHashHistory(),
    //现在换成新的模式,url不带#号
    history: VueRouter.createWebHistory(),

    routes, // `routes: routes` 的缩写
});

const app = createApp(App);
// 3. 注册你需要的组件
app.use(Vant);
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
app.use(router)

app.use(Calendar);


app.mount('#app');










