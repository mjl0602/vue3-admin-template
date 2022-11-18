import Queryable from "./source/queryable";


export interface AdminModel {
    id: number,
    name: string,
}

export default class AdminQuery extends Queryable<AdminModel> {

    // 默认的内容
    get defaultObject() {
        return {};
    }

    // 读取正在输入的数据，用于表单校验
    _valueGetter: () => Partial<AdminModel> = () => ({});

    // 已输入的数据的Getter
    get currentEditRow(): Partial<AdminModel> {
        return this._valueGetter();
    }

    // 表单规则
    get rules() {
        return {}
    };

    // 查询全部
    // async all() {
    //     var res: AdminModel[] = [];
    //     return res
    // }

    // // 上传修改
    // async edit(obj: AdminModel) {

    // }

    // // 添加
    // async add(obj: AdminModel) {

    // }

    // // 通过id删除
    // async deleteObj(obj: AdminModel) {

    // }
}