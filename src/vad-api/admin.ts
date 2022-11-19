import Queryable, { BasicQueryParams } from "./source/queryable";

/** 模型 */
export interface AdminModel {
    id: number,
    name: string,
}

/** 搜索条件 */
export interface AdminQueryParmas extends BasicQueryParams {
    searchString: string,
}

/** 数据源，增删查改等请求 */
export default class AdminQuery extends Queryable<AdminModel, AdminQueryParmas> {
    // constructor(id) {
    //     super();
    //     this.id = id;
    // }

    /** 对象名称 */
    get objectName(): string {
        return '管理员'
    };

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
    // async all(params: AdminQueryParmas) {
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