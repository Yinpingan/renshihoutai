<template>
    <div>
        <el-table :data="data" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="code" label="标识">
            </el-table-column>
            <el-table-column prop="description" label="描述">
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="{ row }">
                    <el-button type="text" @click="showadd(row)" v-if="row.pid == 0">添加</el-button>
                    <el-button type="text" @click="edit(row)">编辑</el-button>
                    <el-button slot="reference" type="text" @click="del(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <add-edit ref="add-edit" :eidtids="eidtids" :dialogVisible.sync="dialogVisible" :ids="ids"
            @changadd="getDepartment1"></add-edit>
    </div>
</template>
<script>
import { transListToTreeData } from '@/utils/index'
import { getDepartment1 } from '@/api/department'
import addEdit from './components/add-edit.vue'
import { delpermission } from '@/api/permission'
export default {
    components: {
        addEdit
    },
    data() {
        return {
            data: [],
            dialogVisible: false,
            ids: 0,
            eidtids: null,
        }
    },
    created() {
        this.getDepartment1()
    },
    methods: {
        async getDepartment1() {
            let res = await getDepartment1()
            this.data = transListToTreeData(res, 0)
            // this.data = res
            console.log(res);
            // this.data = res.filter(item => item.id != 0 && item.pid != 1)
        },
        async del(row) {
            console.log(row);
            await delpermission({ id: row.id })
            this.getDepartment1()
        },
        showadd(row) {
            this.dialogVisible = true
            this.ids = row.id
        },
        edit(row) {
            this.eidtids = row.id
            this.dialogVisible = true
            this.$nextTick(() => {
                this.$refs['add-edit'].getpermission()
            })
        }
    },
}
</script>
<style lang="scss" scoped></style>