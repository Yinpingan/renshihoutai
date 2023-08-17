<template>
    <div>
        <el-dialog title="新增权限点" :visible="dialogVisible" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="权限名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="2-10个字符"></el-input>
                </el-form-item>
                <el-form-item label="权限标识" prop="code">
                    <el-input v-model="ruleForm.code" placeholder="2-10个字符"></el-input>
                </el-form-item>
                <el-form-item label="权限描述">
                    <el-input v-model="ruleForm.description" placeholder="2-10个字符"></el-input>
                </el-form-item>
                <el-form-item label="开启">
                    <el-switch v-model="ruleForm.type" :active-value="1" :inactive-value="2"></el-switch>
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
import { getDepartment, getmanagerlist, getadd, putedit } from '@/api/department'
import { postpermission, getpermission, putpermission } from '@/api/permission'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        ids: {
            type: Number,
            default: null
        },
        eidtids: {
            type: Number,
            default: null
        }
    },
    created() {

    },
    data() {
        return {
            ruleForm: {
                description: "",
                enVisible: "2",
                type: 2,
                name: '',
                code: '',
            },
            managerlist: [],
            rules: {
                name: [
                    { required: true, message: '部门名称不能为空', trigger: 'blur' },
                    { min: 2, max: 10, message: '部门编号的长度为 2 到 10 位', trigger: 'blur' },

                ],
                code: [
                    { required: true, message: '部门编号不能为空', trigger: 'blur' },
                    { min: 2, max: 10, message: '部门编号的长度为 2 到 10 位', trigger: 'blur' },

                ],

            },
        }
    },
    methods: {
        async getpermission() {
            let res = await getpermission({ id: this.eidtids })
            console.log(res);
            this.ruleForm = res
        },
        async getmanagerlist() {
            let res = await getmanagerlist()
            this.managerlist = res
        },
        handleClose(done) {
            this.fn()
        },
        fn() {
            this.$emit('update:dialogVisible', false)
        },
        async queding() {
            if (this.ruleForm.id) {
                await putpermission(this.ruleForm)
                this.$message({
                    type: 'success', // success error warning
                    message: '编辑成功',
                    duration: 2000,
                })
            } else {
                let res = await postpermission({ ...this.ruleForm, pid: this.ids })
                console.log(res);
                this.$message({
                    type: 'success', // success error warning
                    message: '添加成功',
                    duration: 2000,
                })
            }
            this.fn()
            this.$emit('changadd')
        }
    }
}
</script>
<style lang="sass" scoped>

</style>