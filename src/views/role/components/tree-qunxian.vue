<template>
    <div>
        <el-dialog title="分配权限" :visible="treedialogVisible" @close="close">
            <el-tree ref="deptTree" node-key="id" :data="data" :props="defaultProps" :default-checked-keys="permIds"
                default-expand-all :expand-on-click-node="false" show-checkbox></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="queding">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { transListToTreeData } from '@/utils/index'
import { getDepartment1 } from '@/api/department'
import { getlists, putEmployeeDetail } from '@/api/role'
export default {
    props: {
        treedialogVisible: {
            type: Boolean,
            default: false
        },
        ids: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            data: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            permIds: null
        }
    },
    created() {
        this.getDepartment1()
    },
    methods: {
        close() {
            this.permIds = null
            this.$emit('update:treedialogVisible', false)
        },
        async queding() {
            let res = await this.$refs.deptTree.getCheckedNodes()
            console.log(res);
            let arr = []
            res.forEach(item => {
                arr.push(item.id)
            })
            let re = await putEmployeeDetail({ id: this.ids, permIds: arr })
            console.log(re);
            this.$message.success('权限分配成功')
            this.close()
        },
        async getDepartment1() {
            let res = await getDepartment1()
            this.data = transListToTreeData(res, 0)
            // this.data = res.filter(item => item.id != 0 && item.pid != 1)
        },
        async getlists() {
            let res = await getlists({ id: this.ids })
            this.permIds = res.permIds
        }
    }
}
</script>
<style lang="scss" scoped></style>