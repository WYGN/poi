
new Vue({
    el: "#app",

    // 数据模型
    data() {

        // 自定义验证规则
        // 验证两次输入的密码是否一致
        var validatePass = (rule, value, callback) => {     // element文档里的写法，这里我不知道怎么把ES6的箭头函数转换为旧的写法
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {

            // POI数据
            POIList: [],

            // 表单数据
            ruleForm: {
                oldPwd: '',
                pwd: '',
                checkPwd: ''
            },

            // 导入文件数据
            fileList: [{name: 'demo.xls', url: ''}, {name: 'demo2.xls', url: ''}],

            // 已选数组
            checkedList: [],

            // 表单验证规则
            rules: {
                oldPwd: [
                    {required: true, message: '请输入原始密码', trigger: 'blur'}
                ],
                pwd: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                checkPwd: [
                    {required: true, validator: validatePass, trigger: 'blur'}
                ]
            }

        };
    },

    // 过滤器
    filters: {

    },

    // 文档加载完成时执行的函数
    mounted: function() {
        this.$nextTick(function () {
            this.getPOIData();
        })
    },

    methods: {

        // 表单提交函数
        submitForm(formName) {
            _this = this;
            this.$refs[formName].validate(function(valid) {
                if (valid) {
                    console.log('提交的表单数据：', _this.ruleForm);
                    alert('提交的表单数据：' + JSON.stringify(_this.ruleForm));
                } else {
                    console.log('禁止提交');
                    alert('禁止提交');
                    return false;
                }
            });
        },

        // 重置表单数据
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 获取POI数据
        getPOIData: function() {
            _this = this;
            this.$http.get('data/POIList.json').then(function(res) {
                _this.POIList = res.body.result.list;
                console.log('获取到的POI数据：', _this.POIList);
            })
        },

        // 文件格式判断，只能上传Excel表格
        beforeUpload(file) {
            if (file.type !== 'application/vnd.ms-excel') {
                this.$message.error('文件格式不正确');
                return false;
            }
        },

        // 删除文件钩子函数
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },

        // 文件预览钩子函数
        handlePreview(file) {
            console.log(file);
        },

        // 刷新列表
        reloadList() {

            this.$http.get('data/POIList.json').then(function (res) {

                _this.POIList = res.body.result.list;

                if (typeof _this.POIList !== 'undefined') {
                    this.$message({
                        message: '刷新成功',
                        type: 'success'
                    });
                } else {
                    this.$message.error('刷新出错');
                }
            })

        },

        // 多选
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.checkedList = val;
            console.log('已选数组：', this.checkedList);
        },

        // 导出
        submitList() {
            console.log('要导出的选数组：', this.checkedList);
            alert('要导出的选数组：' + JSON.stringify(this.checkedList));
        }

    }
})
