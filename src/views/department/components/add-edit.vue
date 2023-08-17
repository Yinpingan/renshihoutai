<template>
    <div>
        <el-dialog :title="title" :visible="dialogVisible" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="2-10个字符"></el-input>
                </el-form-item>
                <el-form-item label="部门编码" prop="code">
                    <el-input v-model="ruleForm.code" placeholder="2-10个字符"></el-input>
                </el-form-item>
                <el-form-item v-if="title == '新增部门'" label="部门负责人" prop="managerId">
                    <el-select v-model="ruleForm.managerId" placeholder="请选择负责人">
                        <el-option v-for="item in managerlist" :key="item.id" :label="item.username"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="title == '编辑部门'" label="部门负责人" prop="managerId">
                    <el-select v-model="ruleForm.managerId" placeholder="请选择负责人">
                        <el-option v-for="item in managerlist" :key="item.id" :label="item.username"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门介绍" prop="introduce">
                    <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
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

export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
        },
        ruleForm: {
            type: Object,
            default: {}
        }
    },
    created() {
        this.getmanagerlist()
    },
    data() {
        const nameValidata = async (a, b, c) => {
            let res = await getDepartment()
            if (res.some(item => item.name == b)) {
                if (this.title == '新增部门') {
                    c(new Error('部门中已经存在该部门'))
                } else {
                    c()
                }

            } else {
                c()
            }
        }


        const codeValidata = async (a, b, c) => {
            let res = await getDepartment()
            if (res.some(item => item.code == b)) {
                if (this.title == '新增部门') {
                    c(new Error('部门中已经存在该编码'))
                } else {
                    c()
                }
            } else {
                c()
            }
        }
        return {

            managerlist: [],
            rules: {
                name: [
                    { required: true, message: '部门名称不能为空', trigger: 'blur' },
                    { min: 2, max: 10, message: '部门编号的长度为 2 到 10 位', trigger: 'blur' },
                    {
                        validator: nameValidata
                    }
                ],
                code: [
                    { required: true, message: '部门编号不能为空', trigger: 'blur' },
                    { min: 2, max: 10, message: '部门编号的长度为 2 到 10 位', trigger: 'blur' },
                    {
                        validator: codeValidata
                    }
                ],
                managerId: [
                    { required: true, message: '部门负责人不能为空', trigger: 'blur' },
                ],
                introduce: [
                    { required: true, message: '请输入部门介绍', trigger: 'blur' },
                    { min: 1, max: 100, message: '部门介绍的长度为 1 到 100 位', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
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
        queding() {
            this.$refs.ruleForm.validate(async (a, b) => {
                if (this.title == '新增部门') {
                    let res = await getadd(this.ruleForm)

                    this.$emit('addshuju')

                    this.$message.success('添加成功')

                    this.fn()
                } else {
                    let res = await putedit(this.ruleForm)

                    this.$emit('addshuju')

                    this.$message.success('编辑成功')
                    this.fn()

                }

            })
        }
    }
}
</script>
<style lang="sass" scoped>

</style>