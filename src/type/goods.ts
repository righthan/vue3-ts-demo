// 对商品传的列表信息类型限制
export interface ListInt {
    id: number,
    introduce: string,
    title: string,
    userid: number
}

// 搜索框搜索内容
interface selectDataInt {
    title: string,
    introduce: string,
    // 分页限制
    page: number,
    count: number,
    pageSize: number
}

export class InitData {
    selectData: selectDataInt = {
        title: "",
        introduce: "",
        // 分页限制
        page: 1,
        count: 0,
        pageSize: 5
    }
    list: ListInt[] = [] // 展示的数据内容
}