
new Vue({
    el: "#app",
    // 数据模型
    data() {

        // 自定义验证规则
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {

            // 城市列表数据
            cityList: [],

            // POI点数据
            POIList: [],

            // 树型控件属性名
            defaultProps: {
                children: 'districts',
                label: 'cityName'
            },

            // 已选数组
            checkedList: [],

            // 密码表单数据
            ruleForm: {
                oldPwd: '',
                pwd: '',
                checkPwd: ''
            },

            // 验证规则
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

    // 文档加载完后执行的函数
    mounted: function() {
        this.$nextTick(function () {
            this.getcityList();
            this.getPOIData();
        })
    },

    methods: {

        // 表单提交函数
        submitForm(formName) {
            _this = this;
            this.$refs[formName].validate(function(valid) {
                if (valid) {
                    console.log('密码表单要提交的内容：', _this.ruleForm);
                    alert('密码表单要提交的内容：' + JSON.stringify(_this.ruleForm));
                } else {
                    console.log('禁止提交');
                    alert('禁止提交');
                    return false;
                }
            });
        },

        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 获取城市列表数据
        getcityList: function() {
            _this = this;
            this.$http.get('data/cityList.json').then(function(res) {
                _this.cityList = res.body.result.list;
                console.log('获取到的城市数据列表：', _this.cityList);
            })
        },

        // 获取POI点数据
        getPOIData: function() {
            _this = this;
            this.$http.get('data/POIList.json').then(function(res) {
                _this.POIList = res.body.result.list;
                console.log('获取到的POI点列表：', _this.POIList);
            })
        },

        // 点击树形控件时执行的函数，data为传入的数据
        handleNodeClick(data) {
            console.log(data);
        },

        // 编辑
        handleEdit(index, row) {
            console.log('编辑对象与其索引：', index, row);
            alert('编辑对象与其索引：' + JSON.stringify(index) + JSON.stringify(row));
        },
        // 删除
        handleDelete(index, row) {
            console.log('删除对象与其索引：', index, row);
            alert('删除对象与其索引：' + JSON.stringify(index) + JSON.stringify(row));
        },

        // 多选
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.checkedList = val;
            console.log('已选数组：', this.checkedList);
        },

        // 导出
        submitList() {
            console.log('已选数组：', this.checkedList);
            alert('已选数组：' + JSON.stringify(this.checkedList));
        },

        // 刷新列表
        reloadList() {
            _this = this;
            this.$http.get('data/POIList.json').then(function(res) {

                _this.POIList = res.body.result.list;

                if (_this.POIList !== undefined) {
                    _this.$message({
                        message: '刷新成功',
                        type: 'success'
                    });
                }
            })
        }

    }



})
