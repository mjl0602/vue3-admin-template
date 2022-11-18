<template>
  <div class="app-container">
    <div class="filter-container-flex">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="actions.add">添加</el-button>
    </div>
    <el-table v-loading="table.listLoading" :data="table.list" element-loading-text="Loading" border fit
      highlight-current-row>
      <!-- 内容 -->
      <el-table-column label="主键id" align="center">
        <template #default="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column label="名称" align="center">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
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
    <div class="pagination-container" v-if="table.total">
      <el-pagination :current-page="table.query.pageNum" :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="table.query.pageSize" :total="table.total" background
        layout="total, sizes, prev, pager, next, jumper" @size-change="actions.handleSizeChange"
        @current-change="actions.handleCurrentChange" />
    </div>
    <el-dialog :visible.sync="table.addDialogVisible" :title="actions.dialogTitle">
      <el-form :model="table.row" :rules="table.source.rules" label-position="left" label-width="100px"
        style="width: 400px; margin-left: 50px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="table.row.name" placeHolder="名称" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="actions.submit">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script lang="ts" setup>
import AdminQuery, { AdminModel, AdminModelQueryParmas } from '@/vad-api/admin';
import { ElButton, ElCheckbox, ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import refTable from './basic/basic-table';

const admin = new AdminQuery();
const [table, actions] = refTable<AdminModel, AdminModelQueryParmas>(
  admin,
  {
    
  });

</script>