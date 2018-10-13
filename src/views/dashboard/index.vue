<template>
    <div class="dashboard-container">
        <div style="margin-bottom: 16px" class="dashboard-text">两种资源引用方式</div>
        <el-row :gutter="20">
            <el-col :span="3">
                <div class="grid-content bg-purple">静态资源引用</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple"><img src="static/vue.png"></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <pre>&lt;img src="static/vue.png"&gt;</pre>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3">
                <div class="grid-content bg-purple">源代码资源引用</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple"><img src="@/assets/vue.png"></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <pre>&lt;img src="@/assets/vue.png"&gt;</pre>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import config from '@/config'
    export default {
        name: 'Dashboard',
        data(){
            return {
                env: config.env
            }
        },
        computed: {
            ...mapGetters([
                'name',
                'fullname',
                'email'
            ])
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .dashboard {
        &-container {
            margin: 30px;
        }
        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
</style>
