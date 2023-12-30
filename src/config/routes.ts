/*https://router.vuejs.org/zh/guide/ vue router文档 */

// 2. 定义一些路由
import IndexPage from "../pages/IndexPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";

const routes = [
    {path: "/:", component: IndexPage},
    {path: "/team", name: '找队伍', component: TeamPage},
    {path: "/team/add:",name:"创建队伍",component: TeamAddPage},
    {path: "/team/update:", name:'修改队伍',component: TeamUpdatePage},
    {path: "/user", name:'用户主页',component: UserPage},
    {path: "/user/update", name:'用户修改',component: UserUpdatePage},
    {path: "/user/create",name:'我创建的队伍', component: UserTeamCreatePage},
    {path: "/user/join", name:'我加入的队伍',component: UserTeamJoinPage},
    {path: "/search", name:'搜索队伍',component: SearchPage},
    {path: "/user/edit", name:'编辑用户信息',component: UserEditPage},
    {path: "/user/list", name:'用户列表',component: SearchResultPage},
    {path: "/user/login",name:'用户登录', component: UserLoginPage},
]

export default routes;
