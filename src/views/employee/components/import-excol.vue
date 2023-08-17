<template>
    <el-dialog width="500px" title="员工导入" :visible="showimportExcol" @close="$emit('update:showimportExcol', false)">
        <el-row type="flex" justify="center">
            <div class="upload-excel">
                <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls"
                    @change="inputchange">
                <div class="drop">
                    <i class="el-icon-upload" />
                    <el-button type="text" @click="xiazai">下载导入模板</el-button>
                    <span>将文件拖到此处或
                        <el-button type="text" @click="dianjishangc">点击上传</el-button>
                    </span>
                </div>
            </div>
        </el-row>
        <el-row type="flex" justify="end">
            <el-button size="mini" type="primary" @click="$emit('update:showimportExcol', false)">取消</el-button>
        </el-row>
    </el-dialog>
</template>
<script>
import { exportExcole, importEmployee } from '@/api/employee'
import { saveAs } from 'file-saver'
export default {
    props: {
        showimportExcol: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        dianjishangc() {
            this.$refs['excel-upload-input'].click()
        },
        async inputchange(event) {
            let files = event.target.files
            if (files.length > 0) {
                const data = new FormData()
                data.append('file', files[0])
                try {
                    await importEmployee(data)
                } catch {

                }finally{
                    
                }
            }
        },
        async xiazai() {
            let res = await exportExcole()
            saveAs(res, '员工模版')
        }
    }
}
</script>
  
<style scoped lang="scss">
.upload-excel {
    display: flex;
    justify-content: center;
    margin: 20px;
    width: 360px;
    height: 180px;
    align-items: center;
    color: #697086;

    .excel-upload-input {
        display: none;
        z-index: -9999;
    }

    .btn-upload,
    .drop {
        border: 1px dashed #dcdfe6;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 160px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .drop {
        line-height: 40px;
        color: #bbb;

        i {
            font-size: 60px;
            display: block;
            color: #c0c4cc;
        }
    }
}
</style>