<template>
    <div style="width: 100%;height: 95vh;background-color: #f0f2f5;padding: 20px;">
        <div style="display: flex;width: 100%;height: 100%;background-color: #fff;">
            <div style="box-sizing: border-box;padding: 10px; width: 300px;height: 100%; border-right: 3px solid #f0f2f5;">
                <el-input v-model="queryparams.keyword" @input="changeValue" placeholder="输入员工姓名全员搜索"></el-input>
                <el-tree ref="deptTree" node-key="id" :data="depts" :props="defaultProps" default-expand-all
                    :expand-on-click-node="false" :highlight-current="true" @current-change="selNode"></el-tree>
            </div>
            <div style="flex: 1;padding: 10px;box-sizing: border-box;">
                <div style="display: flex;justify-content:end;align-items: center;">
                    <el-button type="primary" size="mini" @click="todetails" v-employee="'permanent'">添加员工</el-button>
                    <el-button size="mini" @click="showimportExcol = true">excol导入</el-button>
                    <el-button size="mini" @click="exportExcol">excol导出</el-button>
                </div>
                <el-table :data="list" style="width: 100%">
                    <el-table-column align="center" prop="staffPhoto" label="头像">
                        <template v-slot="{ row }">
                            <el-avatar v-if="row.staffPhoto" :size="30" :src="row.staffPhoto"></el-avatar>
                            <span class="username" v-else>{{ row.username.charAt(0) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" label="姓名">
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号">
                    </el-table-column>
                    <el-table-column prop="workNumber" label="工号">
                    </el-table-column>
                    <el-table-column prop="formOfEmployment" label="聘用形式">
                        <template v-slot="{ row }">
                            {{ row.formOfEmployment == 1 ? '正式' : row.formOfEmployment == 2 ? '非正式' : "无" }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="departmentName" label="部门">
                    </el-table-column>
                    <el-table-column prop="timeOfEntry" label="入职时间">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template v-slot="{ row }">
                            <el-button type="text" @click="todetail(row)">查看</el-button>
                            <el-button type="text" @click="showRolse(row)">角色</el-button>
                            <el-button slot="reference" type="text">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                    </el-table-column>
                </el-table>
                <div>
                    <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <import-excol-vue :showimportExcol.sync="showimportExcol"></import-excol-vue>
        <rolefabpei ref="rolefabpei" :showRolsestatus.sync="showRolsestatus" :roleId="roleId"></rolefabpei>
    </div>
</template>
<script>
import { getEmployeeList, exportEmployee } from '@/api/employee'
import { transListToTreeData } from '@/utils/index'
import { getDepartment } from '@/api/department'
import { saveAs } from 'file-saver'
import importExcolVue from './components/import-excol.vue'
import rolefabpei from './components/role-fanpei.vue'
export default {
    components: {
        importExcolVue,
        rolefabpei
    },
    created() {
        this.getDepartments()
    },
    data() {
        return {
            showRolsestatus: false,
            roleId: 0,
            showimportExcol: false,
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            total: 10,
            depts: [],
            list: [],
            queryparams: {
                departmentId: null,
                page: 1,
                pagesize: 10,
                keyword: ""
            },
            timerId: null
        }
    },
    methods: {
        async getDepartments() {
            let result = await getDepartment()
            this.depts = transListToTreeData(result, 0)
            //  初始化首个节点
            this.queryparams.departmentId = this.depts[0].id

            // 设置选中节点
            // 树组件的渲染是异步的，等待更新完毕  nextTick
            this.$nextTick(() => {
                this.$refs.deptTree.setCurrentKey(this.queryparams.departmentId)
            }),
                this.getEmployeeList()
        },
        selNode(node) {
            this.queryparams.departmentId = node.id
            this.getEmployeeList()
        },
        async getEmployeeList() {
            let res = await getEmployeeList(this.queryparams)
            let { rows, total } = res
            this.list = rows
            this.total = total
            console.log(total);
        },
        changeValue() {
            clearTimeout(this.timerId)
            this.timerId = setTimeout(() => {
                this.queryparams.page = 1
                this.getEmployeeList()
            }, 500)
        },
        todetail(row) {
            this.$router.push({
                name: "detail1",
                params: {
                    id: row.id
                },
            })
        },
        todetails() {
            this.$router.push('/employee/detail')
        },
        handleCurrentChange(val) {
            this.queryparams.page = val
            this.getEmployeeList()
        },
        async exportExcol() {
            let res = await exportEmployee()
            console.log(res);
            saveAs(res, '员工')
        },
        showRolse(row) {
            console.log(row);
            this.showRolsestatus = true
            this.roleId = row.id
            this.$nextTick(() => {
                this.$refs.rolefabpei.ygxq()
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.username {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    background-color: rgb(0, 110, 255);
    color: rgb(255, 255, 255);
    margin-right: 5px;
}
</style>