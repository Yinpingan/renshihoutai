<template>
    <div>
        <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="uploadImage"
            :before-upload="beforeAvatarUpload">
            <img v-if="value" :src="value" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            const isJPG = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
            const isLt2M = file.size / 1024 / 1024 < 5;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG png gif 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isJPG && isLt2M;
        },
        uploadImage(params) {
            console.log(params.file, '1111')
            const cos = new COS({
                SecretId: 'AKID9B6C3xpTDwS3a8jHQScgcMxSsBFH794s',
                SecretKey: 'sY6Rr78vhN7iCj8LLdlpmW5Tgr2685pQ'
            }) // 完成cos对象的初始化
            cos.putObject({
                Bucket: 'ypa-2210c-1320041660', // 存储桶名称
                Region: 'ap-nanjing', // 地域名称
                Key: params.file.name, // 文件名称
                StorageClass: 'STANDARD', // 固定值
                Body: params.file // 文件对象
            }, (err, data) => {
                if (data.statusCode === 200 && data.Location) {
                    // 拿到了腾讯云返回的地址  data.Location
                    // 通过input自定义事件将地址传出去
                    // console.log(data.Location);
                    this.$emit('input', 'http://' + data.Location) // 将地址返回了
                } else {
                    this.$message.error(err.Message) // 上传失败提示消息
                }
            })
        }
    }
}
</script>
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
