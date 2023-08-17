<template>
    <div>
        <div style="width: 500px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="工号">
                    <el-input disabled v-model="ruleForm.workNumber"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="departmentId">
                    <select-tree-vue v-model="ruleForm.departmentId"></select-tree-vue>
                    <!-- <el-input v-model="ruleForm.departmentId"></el-input> -->
                </el-form-item>
                <el-form-item label="聘用形式" prop="formOfEmployment">
                    <el-select v-model="ruleForm.formOfEmployment" placeholder="请选择">
                        <el-option label="正式" :value="1"></el-option>
                        <el-option label="非正式" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入职时间" prop="timeOfEntry">
                    <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="ruleForm.timeOfEntry"
                        type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="转正时间" prop="correctionTime">
                    <el-date-picker v-model="ruleForm.correctionTime" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="员工头像" prop="staffPhoto">
                    <unpload-image v-model="ruleForm.staffPhoto"></unpload-image>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">保存更新</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import selectTreeVue from './components/select-tree.vue'
import unploadImage from './components/unpload-image.vue'
import { addEmployee, getEmployee, putEmployee } from '@/api/employee'
export default {
    components: {
        selectTreeVue,
        unploadImage
    },
    data() {
        const corrTimeValidate = (rule, value, callback) => {
            if (this.ruleForm.timeOfEntry) {
                if (new Date(this.ruleForm.timeOfEntry) > new Date(value)) {
                    callback(new Error('转正时间不能小于入职时间'))
                    return
                }
            }
            callback()
        }
        return {
            ruleForm: {
                username: '',
                formOfEmployment: '',
                mobile: '',
                workNumber: "",
                departmentId: null,
                timeOfEntry: '',
                correctionTime: '',
                staffPhoto: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 1, max: 4, message: '名字在1~4位', trigger: 'blur' }
                ],
                formOfEmployment: [
                    { required: true, message: '请选择聘用形式', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
                ],
                departmentId: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
                timeOfEntry: [{ required: true, message: '请选择入职时间', trigger: 'blur' },],
                correctionTime: [
                    { required: true, message: '请选择转正时间', trigger: 'blur' },
                    { validator: corrTimeValidate }
                ],
            }
        }
    },
    created() {
        this.$route.params.id && this.getEmployee()
    },
    methods: {
        async getEmployee() {
            let res = await getEmployee({ id: this.$route.params.id })
            this.ruleForm = res
        },
        submitForm() {
            this.$refs.ruleForm.validate(async (a, b) => {
                if (this.$route.params.id) {
                    let res = await putEmployee(this.ruleForm)
                    console.log(res);
                    this.$message({
                        type: 'success', // success error warning
                        message: '更改成功',
                    })
                    this.$router.push('/employee')
                } else {
                    let res = await addEmployee(this.ruleForm)
                    console.log(res, '1111');
                    this.$message({
                        type: 'success', // success error warning
                        message: '添加成功',
                    })
                    this.$router.push('/employee')

                }

            })
        },

    },
}
</script>
<style lang="scss" scoped></style>