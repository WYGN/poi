
new Vue({

	el: "#app",

	// 数据模型
	data: {

		// 登录表单数据
        ruleForm: {
			username: '',
			pwd: '',
			verifyCode: ''
		},

		// 是否记住密码
        savePwd: true,

		// 表单验证规则
		rules: {
			username: [
				{ required: true, message: '请输入姓名', trigger: 'blur' }
			],
			pwd: [
				{ required: true, message: '请输入密码', trigger: 'blur' }
			],
			verifyCode: [
				{ required: true, message: '请输入验证码', trigger: 'blur' }
			]
		}

	},

	// 过滤器
	filters: {

	},

	// 文档加载完后要执行的函数
	mounted: function() {
		this.$nextTick(function () {

		})
	},

	methods: {
		// 提交表单函数
		submitForm(formName) {
			_this = this;
			this.$refs[formName].validate(function(valid) {
				if (valid) {
					console.log('表单数据：', _this.ruleForm);
					alert('表单数据：' + JSON.stringify(_this.ruleForm));

                    // 判断跳转，还没有后台数据，暂时这样简写
                    if ((_this.ruleForm.username == "admin") && (_this.ruleForm.pwd == "123456")) {
                        window.location.href = "adminIndex.html";
                    } else if ((_this.ruleForm.username == "collector") && (_this.ruleForm.pwd == "111111")) {
                        window.location.href = "collectionIndex.html";
                    } else {
                        _this.$message.error('登录失败');
                    }


				} else {
                    return false;
                    console.log('禁止提交');
                }
			});
		}

	},

	computed: {

	}

})