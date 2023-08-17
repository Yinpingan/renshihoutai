<template>
    <div>
        <el-button type="primary" @click="dialogVisible = true">添加角色</el-button>
        <el-table :data="data" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.eidtRow.name" v-if="scope.row.isEdit"></el-input>
                    <span v-else>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="启用">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.eidtRow.state" :active-value="1" :inactive-value="0"
                        v-if="scope.row.isEdit"></el-switch>
                    <span v-else>{{ scope.row.state == 1 ? '已启用' : '未启用' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="描述">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.eidtRow.description" v-if="scope.row.isEdit"></el-input>
                    <span v-else>{{ scope.row.description }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <template v-if="scope.row.isEdit">
                        <el-button type="text" @click="gxlist(scope.row)">确定</el-button>
                        <el-button type="text" @click="scope.row.isEdit = false">取消</el-button>
                    </template>
                    <template v-else>
                        <el-button type="text" @click="btnqf(scope.row)">分配权限</el-button>
                        <el-button type="text" @click="btnrow(scope.row)" style="margin-right: 10px;">编辑</el-button>
                        <el-popover placement="top" width="160">
                            <p>这是一段内容这是一段内容确定删除吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="del(scope.row)">确定</el-button>
                            </div>
                            <el-button slot="reference" type="text">删除</el-button>
                        </el-popover>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total">
        </el-pagination>
        <role-add :dialogVisible.sync="dialogVisible" @add="getlist"></role-add>
        <tree-qunxian ref="treequanxian" :treedialogVisible.sync="treedialogVisible" :ids="ids"></tree-qunxian>
    </div>
</template>
<script>
import roleAdd from "./components/role-add.vue";
import treeQunxian from "./components/tree-qunxian.vue";
import { getlist, putlist, dellist } from "@/api/role";
export default {
    components: { roleAdd, treeQunxian },
    data() {
        return {
            ids: 0,
            data: [],
            page: 1,
            pagesize: 5,
            total: 0,
            dialogVisible: false,
            treedialogVisible: false,
        }
    },
    created() {
        this.getlist()
    },
    methods: {
        async getlist() {
            let res = await getlist({ page: this.page, pagesize: this.pagesize, total: this.total })
            this.total = res.total + 10
            this.data = res.rows
            this.data.forEach(item => {
                this.$set(item, 'isEdit', false)
                this.$set(item, 'eidtRow', {
                    name: item.name,
                    state: item.state,
                    description: item.description
                })
            })
        },
        btnrow(row) {
            row.isEdit = true
            row.eidtRow = {
                name: row.name,
                state: row.state,
                description: row.description
            }
        },
        async gxlist(row) {
            if (row.eidtRow.name && row.eidtRow.description) {
                let res = await putlist({ ...row.eidtRow, id: row.id })
                this.$message.success('更新成功')
                Object.assign(row, {
                    ...row.eidtRow,
                    isEdit: false
                })
            } else {
                this.$message.warning('姓名和描述不能为空')
            }
        },
        handleCurrentChange(val) {
            this.page = val
            this.getlist()
        },
        async del(row) {
            let res = await dellist({ id: row.id })
            this.$message.success('删除成功')
            this.getlist()
        },
        btnqf(row) {
            this.treedialogVisible = true
            this.ids = row.id
            this.$nextTick(() => {
                this.$refs.treequanxian.getlists()
            })
        }
    },
}
</script>
<style lang="scss" scoped></style>