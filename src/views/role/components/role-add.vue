<template>
    <div>
        <el-dialog title="新增角色" :visible="dialogVisible" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="启用">
                    <el-switch v-model="ruleForm.state" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="部门编码" prop="description">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="fn">取 消</el-button>
                <el-button type="primary" @click="queding">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { addlist } from '@/api/role'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
    },
    created() {

    },
    data() {
        return {
            ruleForm: {
                name: "",
                description: "",
                state: 0
            },
            managerlist: [],
            rules: {
                name: [
                    { required: true, message: '部门名称不能为空', trigger: 'blur' },
                    { min: 2, max: 10, message: '部门编号的长度为 2 到 10 位', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '部门编号不能为空', trigger: 'blur' },
                    { min: 2, max: 100, message: '部门编号的长度为 2 到 100 位', trigger: 'blur' },

                ],
            },
        }
    },
    methods: {
        handleClose(done) {
            this.fn()
        },
        fn() {
            this.$emit('update:dialogVisible', false)
        },
        queding() {
            this.$refs.ruleForm.validate(async (a, b) => {
                let res = await addlist(this.ruleForm)
                this.$message.success('添加成功')
                this.$emit('add')
                this.fn()
            })
        }
    }
}
</script>
<style lang="sass" scoped>

</style>