// 队伍信息类别
import {UserType} from "./user";

export  type  TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime? : Date;
    maxNum: number;
    password?: string;
    //todo 定义枚举值类型 更规范
    status: number;
    userId: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    //是否加入队伍
    hasJoin: boolean;
};
