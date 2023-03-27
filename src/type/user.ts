export interface ListInt {
    id: number,
    nickName: string,
    role: RoleInt[],
    userName: string
}
interface RoleInt {
    role: number,
    roleName: string
}
interface SelectDataInt {
    role: number,
    nickName: string
}
interface RoleListInt{
    authority: number[],
    roleId:number,
    roleName:string
}
// 表单编辑的信息类型
export interface ActiveInt{
    id: number,
    nickName: string,
    role: number[],
    userName: string
}
export class InitData{
    selectData:SelectDataInt = {
        role: 0,
        nickName: ""
    }
    list:ListInt[]=[] // 用来接收用户信息的列表
    roleList:RoleListInt[] = []
    isShow=false; // 表单编辑显示
    // 表单选中的对象
    active:ActiveInt = {
        id: 0,
        nickName: "",
        role: [],
        userName: ""
    }
}