import Queryable, { PagedData } from "@/vad-api/source/queryable";
import { onMounted, ref, Ref } from "vue";
import { ElNotification, ElMessageBox } from 'element-plus'

interface TableState<T> {
  // 表格内容
  objStr: string,
  list: T[],
  total: number,
  listLoading: boolean,
  query: {
    pageNum: number,
    pageSize: number,
  },
  // 添加的Dialog
  addDialogVisible: boolean,
  isNew: boolean,
  // 增加使用的对象
  row: Partial<T>,
  rules: { [P in keyof T]?: any },
  source: Queryable<T>,
}

class BasicTable<T> {
  private _ref?: Ref<TableState<T>>;

  private get ref() {
    return this._ref!;
  }

  private get v() {
    return this._ref!.value;
  }

  static refTable = function <T>(data: Queryable<T>, config: Partial<TableState<T>>): [Ref<TableState<T>>, BasicTable<T>] {
    const table = new BasicTable<T>();
    const finalConfig = Object.assign(config, {
      objStr: '条目',
      list: [],
      total: 0,
      listLoading: false,
      query: {
        pageNum: 1,
        pageSize: 5,
      },
      addDialogVisible: false,
      isNew: false,
      row: {},
      rules: {},
      source: data,
    });
    onMounted(() => {
      table.queryAll();
    })
    const tableRef = ref(finalConfig) as Ref<TableState<T>>
    table._ref = tableRef;
    return [
      tableRef,
      table,
    ]
  }

  // 查询
  async queryAll(args?: { resetPage: boolean }) {
    this.v.listLoading = true;
    try {
      if (args?.resetPage === true) {
        this.v.query.pageNum = 1;
      }
      let res = await this.v.source.all(this.v.query);
      if (res.hasOwnProperty("total")) {
        res = res as PagedData<T>;
        this.v.list = res.data;
        this.v.total = res.total;
      } else {
        this.v.list = res as T[];
      }
      console.log("查询数据:", this.v.list);
    } catch (error) {
      console.error(error);
      this.notifyError("查询失败", "查询数据时发生错误");
      this.v.listLoading = false;
    }
    this.v.listLoading = false;
  }
  // 增加
  async add() {
    this.v.isNew = true;
    this.v.row = Object.assign({}, this.v.source.defaultObject);
    this.v.rules = this.v.source.rules;
    this.v.addDialogVisible = true;
  }
  // 编辑
  edit(row: T) {
    console.log("edit", row);
    this.v.isNew = false;
    this.v.row = Object.assign({}, row);
    this.v.rules = this.v.source.rules;
    this.v.addDialogVisible = true;
  }
  // 提交（增加与修改）
  async submit(obj = this.v.row) {
    console.log("###submit", obj, this.v.isNew);
    try {
      if (this.v.isNew) {
        console.log("add");
        await this.v.source.add(this.v.row);
        this.notifySuccess("新增成功", `成功新增${this.v.objStr}`);
      } else {
        console.log("edit");
        await this.v.source.edit(this.v.row);
        this.notifySuccess("修改成功", `${this.v.objStr}修改成功`);
      }
      this.v.addDialogVisible = false;
      await this.queryAll();
    } catch (error) {
      console.error(error);
      this.notifyError("失败", "操作发生错误，数据提交失败");
    }
  }
  // 删除
  async deleteRow(row: T) {
    try {
      await ElMessageBox.confirm("删除操作将不能撤销, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      });
      await this.v.source.deleteObj(row);
      this.notifySuccess("删除成功", `${this.v.objStr}已被删除`);
    } catch (error) {
      console.error(error);
      this.notifyError("失败", "操作发生错误，数据提交失败");
    }
    await this.queryAll();
  }

  get dialogTitle() {
    return (this.v.isNew ? "新增" : "修改") + this.v.objStr;
  }

  handleSizeChange(size) {
    this.v.query.pageNum = 1;
    this.v.query.pageSize = size;
    this.queryAll();
  }
  handleCurrentChange(page) {
    this.v.query.pageNum = page;
    this.queryAll();
  }

  notifySuccess(title: string, msg: string) {
    ElNotification({
      title: title,
      message: msg,
      type: 'success',
    })
  }
  notifyError(title: string, msg: string) {
    ElNotification({
      title: title,
      message: msg,
      type: 'error',
    })
  }
}

export default BasicTable.refTable;