<template>
    <div>
        <div style="display: flex;align-items: center;justify-content: center;">
            <el-tree style="width: 80%;" :data="data" :props="defaultProps" :default-expand-all="true">
                <span class="custom-tree-node" slot-scope="{ node,data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button type="text" style="color: #000;">{{ data.managerName }}</el-button>
                        <el-button type="text" size="mini">
                            <el-dropdown trigger="click" @command="handleCommand($event, data)">
                                <span class="el-dropdown-link">
                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                                    <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                                    <el-dropdown-item command="del">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <add-edit :dialogVisible.sync="dialogVisible" @addshuju="getDepartment" :title="title"
            :ruleForm="ruleForm"></add-edit>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { transListToTreeData } from '@/utils/index'
import { getDepartment, deteledel } from '@/api/department'
import addEdit from './components/add-edit.vue'
export default {
    components: {
        addEdit
    },
    data() {
        return {
            data: [],
            ruleForm: {
                name: '',
                code: '',
                username: '',
                jieshao: ''
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            dialogVisible: false,
            title: ''
        }
    },
    computed: {

    },
    methods: {
        async getDepartment() {
            let res = await getDepartment()
            this.data = transListToTreeData(res, 0)
            // this.data = res
        },
        open1(a, b) {
            this.title = a
            this.dialogVisible = true

            if (this.title == '新增部门') {
                this.ruleForm = {

                    name: '',
                    code: '',
                    managerId: '',
                    introduce: '',
                    pid: b.id,
                }
            } else {
                this.ruleForm = {
                    name: b.name,
                    code: b.code,
                    managerId: b.pid,
                    introduce: b.introduce,
                    pid: b.pid,
                    createTime: b.createTime,
                    managerName: b.managerName,
                    id: b.id
                }
            }
        },


        handleCommand(command, data) {
            if (command == 'del') {
                this.open(data)
            } else if (command == 'add') {
                this.open1('新增部门', data)
            } else {
                this.open1('编辑部门', data)
            }
        },
        open(data) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deteledel({ id: data.id })
                this.getDepartment()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
    },
    created() {
        this.getDepartment()
    }
}
</script>
<style lang="scss" scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>