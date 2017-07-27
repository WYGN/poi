
new Vue({
    el: "#app",

    // 数据模型
    data: {

        // 是否开始拾取
        pickupFlag: false,

        // 经纬度
        localAddress: '',

        // 上传图片相关
        dialogImageUrl: '',
        dialogVisible: false,

        // 上传附件和图片列表
        fileList: [{name: 'demo.xls', url: ''}, {name: 'demo2.xls', url: ''}],
        imgList: [],

        // 表单数据
        ruleForm: {
            name: '',
            otherName: '',
            address: '',
            desc: ''
        },

        // 表单验证规则
        rules: {
            name: [{
                required: true,
                message: '请输入名称',
                trigger: 'blur'
            }],
            otherName: [{
                required: true,
                message: '请输入别名',
                trigger: 'blur'
            }],
            address: [{
                required: true,
                message: '请输入地址',
                trigger: 'blur'
            }]
        }
    },

    // 过滤器
    filters: {

    },

    // 文档加载结束后执行的函数
    mounted: function () {
        this.$nextTick(function () {
            this.loadMap();
        })
    },

    methods: {

        // 渲染地图函数
        loadMap() {

            _this = this;

            var map;

            Geoway.ProxyHost = "/ime-gx/js/geowaySDK/proxy.jsp?";
            map = new Geoway.GwMap("map");
            
            //加入底图
            Geoway.WMTSUtil.addLayerToMap("baseLayer", "http://www.mapgx.com/ime-server/rest/tdtgx_vec/wmts", true, "tiles", "Vector", map);
            //加入标注图层
            Geoway.WMTSUtil.addLayerToMap("labelLayer", "http://www.mapgx.com/ime-server/rest/tdtgx_vecanno/wmts", false, "tiles", "Vector", map);
            map.setCenter(new Geoway.LonLat(108.36, 22.82), 10);
            map.events.register("click", this, geowayEvent);

            // 获取经纬度
            function geowayEvent(evt) {
                var x = evt.x ? evt.x : evt.pageX;
                var y = evt.y ? evt.y : evt.pageY;
                var pixel = new Geoway.Pixel(x,y);
                var lonlat = map.getLonLatFromPixel(pixel);

                if (_this.pickupFlag) {
                    _this.localAddress = lonlat.lon.toFixed(3) + ", "+lonlat.lat.toFixed(3)
                    console.log("经度："+lonlat.lon.toFixed(3) + " 纬度："+lonlat.lat.toFixed(3));
                }
            }

        },

        // 拾取按钮点击事件
        pickup() {

            this.pickupFlag = !this.pickupFlag;
            
            if (this.pickupFlag) {
                this.$message('开始拾取经纬度');
                
            } else {
                this.$message({
                    message: '暂停拾取经纬度',
                    type: 'warning'
              });
            }
        },

        // 表单提交函数
        submitForm(formName) {
            _this = this;
            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    console.log('要提交的数据：', _this.ruleForm, _this.fileList, _this.imgList, _this.localAddress);
                    alert('要提交的数据：' + JSON.stringify(_this.ruleForm) + JSON.stringify(_this.fileList) + JSON.stringify(_this.imgList) + JSON.stringify(_this.localAddress));
                } else {
                    console.log('禁止提交');
                    alert('禁止提交');
                    return false;
                }
            });
        },

        // 图片格式判断
        beforeUploadImg(file) {
            if (file.type !== 'image/jpeg') {
                this.$message.error('上传格式不正确');
                return false;
            } else {
                this.imgList = file;
                console.log('图片数据：', this.imgList);
            }
        },

        // 移除图片时执行
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 预览图片时执行
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

        // 移除文件时执行
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 预览文件时执行
        handlePreview(file) {
            console.log(file);
        }
    },

    computed: {

    }
})
