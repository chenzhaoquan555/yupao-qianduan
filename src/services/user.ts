//缓存用户信息数据,我的个人理解是缓存用户信息数据,因为用户信息数据变化频率比较低,所以可以缓存,减少数据库访问次数
import myAxios from "../plugins/myAxios.js";
import {setCurrentUser} from "../status/user.js";


/**
 * TODO 暂时不使用这个方式,如果后期需要,可以打开这个链接查看即可:https://www.yuque.com/tt110617/bv53z1/at7t2c?#DYsxH
 * 获取用户信息
 * 无论哪个页面要获取用户信息,都调用这个方法
 */

export const getCurrentUser = async () => {
  const res = await myAxios.get("/user/current");
  if (res.code === 0){
    setCurrentUser(res.data)
    return res.data;
  }
  return null;
}
