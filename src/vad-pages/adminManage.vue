<template>
  <div class="app-container">
    <div class="filter-container-flex">
      <el-button class="filter-item" type="primary" :icon="Edit" @click="actions.add()">添加</el-button>
    </div>
    <el-table v-loading="tb.listLoading" :data="tb.list" element-loading-text="Loading" border fit
      highlight-current-row>
      <!-- 内容 -->
      <el-table-column label="主键id" align="center" width="80">
        <template #default="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template #default="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column class-name="status-col" label="操作" align="center" width="220">
        <template #default="scope">
          <el-button-group>
            <el-button type="primary" @click="actions.edit(scope.row)" size="mini">修改</el-button>
            <el-button type="danger" @click="actions.deleteRow(scope.row)" size="mini">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 翻页 -->
    <div class="pagination-container" v-if="tb.total">
      <el-pagination v-model:current-page="tb.query.pageNum" :page-sizes="[5, 10, 20, 30, 50]"
        v-model:page-size="tb.query.pageSize" :total="tb.total" background
        layout="total, sizes, prev, pager, next, jumper" @size-change="(v) => actions.sizeChange(v)"
        @current-change="(v) => actions.pageChange(v)" />
    </div>
    <!-- 添加/删除数据的弹窗 -->
    <el-dialog v-model="tb.addDialogVisible" :title="actions.dialogTitle">
      <el-form :model="tb.row" :rules="tb.source.rules" label-position="left" label-width="100px" style="width: 400px; 
        margin-left: 50px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="tb.row.name" placeHolder="名称" />
        </el-form-item>
      </el-form>
      <template #footer class="dialog-footer">
        <el-button type="primary" @click="actions.submit()">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import AdminQuery, { AdminModel, AdminQueryParmas } from '@/vad-api/admin';
import { ElButton, ElButtonGroup, ElTable, ElTableColumn, ElDialog, ElForm, ElFormItem, ElInput, ElPagination } from 'element-plus'
import { Edit } from '@element-plus/icons-vue'
import refTable from './basic/basic-table';

/** 创建表格，与表格操作 */
const [tb, actions] = refTable<AdminModel, AdminQueryParmas>(
  new AdminQuery(),
  {
    searchString: '',
  }
);

</script>