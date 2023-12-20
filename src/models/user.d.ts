// 用户类型
export  type  UserType = {
    id: number;
    userName: string;
    userAccount: string;
    gender: number;
    profile?: string; //个人简介
    phone: string; email: string;
    planetCode: string; //星球编号
    avatarUrl?: string;
    userStatus: number;
    tags : string[];
    createTime: Date;
    userRole: number;
};