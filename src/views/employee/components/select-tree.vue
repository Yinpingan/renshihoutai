<template>
    <el-cascader :value="value" placeholder="请选择" @change="changeValue" :options="treeData" :props="defaultProps"
        separator="-">
    </el-cascader>
</template>
<script>
import { transListToTreeData } from '@/utils/index'
import { getDepartment } from '@/api/department'
export default {
    props: {
        value: {
            type: Number,
            default: ''
        }
    },
    data() {
        return {
            treeData: [],
            defaultProps: {
                label: 'name',
                value: 'id'
            }
        }
    },
    created() {
        this.getDepartment()
    },
    methods: {
        async getDepartment() {
            let res = await getDepartment()
            this.treeData = transListToTreeData(res, 0)
        },
        changeValue(v) {
            this.$emit('input', v[v.length - 1])
        }
    }
}
</script>