<template>
    <el-dialog title="分配角色" :visible="showRolsestatus" @close='colse'>
        <el-checkbox-group v-model="roleIds">
            <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
            <el-button @click="colse">取 消</el-button>
            <el-button type="primary" @click="queding">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { getEnabledRoles, getEmployeeDetail } from '@/api/role'
import { assignRole } from '@/api/employee'
export default {
    props: {
        showRolsestatus: {
            type: Boolean,
            default: false
        },
        roleId: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            roleIds: [],
            roleList: [],
        }
    },
    created() {
        this.getEnabledRoles()
    },
    methods: {
        async queding() {
            console.log(111);
            let res = await assignRole({
                id: this.roleId,
                roleIds: this.roleIds
            })
            console.log(res);
            this.$message.success("分配角色成功")
            this.colse()
        },
        colse() {
            this.$emit('update:showRolsestatus', false)
            this.roleIds = []
        },
        async getEnabledRoles() {
            let res = await getEnabledRoles()
            console.log(res);
            this.roleList = res
        },
        async ygxq() {
            let res = await getEmployeeDetail({ id: this.roleId })
            console.log(res);
            this.roleIds = res.roleIds
        }

    }
}
</script>
<style lang="scss" scoped></style>