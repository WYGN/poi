// 分页，展点功能未实现

new Vue({
    el: "#app",

    // 数据模型
    data: {

        // 审核点数据
        cityList: [],

        // 下属县市数据
        districts: []

    },

    // 过滤器
    filters: {},

    // 文档加载完后执行的函数
    mounted: function () {
        this.$nextTick(function () {
            this.loadMap();
            this.getCheckPoints();
        })
    },

    methods: {

        // 渲染地图函数
        loadMap: function () {

            var path = "imgs";
            var map, vectorLayer, selectControl;

            Geoway.ProxyHost = "/ime-gx/js/geowaySDK/proxy.jsp?";
            map = new Geoway.GwMap("map");

            //加入底图
            Geoway.WMTSUtil.addLayerToMap("baseLayer", "http://www.mapgx.com/ime-server/rest/tdtgx_vec/wmts", true, "tiles", "Vector", map);
            //加入注记图层
            Geoway.WMTSUtil.addLayerToMap("labelLayer", "http://www.mapgx.com/ime-server/rest/tdtgx_vecanno/wmts", false, "tiles", "Vector", map);

            //中心点坐标
            map.setCenter(new Geoway.LonLat(108.36, 22.82), 12);

            //矢量图层
            vectorLayer = new Geoway.Layer.Vector("vector_ly");
            map.addLayer(vectorLayer);

            selectControl = new Geoway.Control.SelectFeature(vectorLayer, {
                onSelect: onSelect,
                onUnselect: onUnselect
            });
            map.addControl(selectControl);
            selectControl.activate();

            var pointStyle = Geoway.Util.extend({}, Geoway.Feature.Vector.style["default"]);
            pointStyle.externalGraphic = path + "/local.png";
            pointStyle.graphicWidth = 16;
            pointStyle.graphicHeight = 24;
            pointStyle.graphicXOffset = -8;
            pointStyle.graphicYOffset = -12;
            pointStyle.graphicOpacity = 1;
            var pointGeometry = new Geoway.Geometry.Point(108.36, 22.82);
            var pointFeature = new Geoway.Feature.Vector(pointGeometry, {}, pointStyle);
            vectorLayer.addFeatures([pointFeature]);


            function onSelect(feature) {
                selectControl.unselectAll();
                if (feature.popup) {
                    map.removePopup(feature.popup);
                    feature.popup = null;
                }
                showPopup(feature);
            }

            function onUnselect(feature) {

            }

            //显示弹框
            function showPopup(feature) {
                var lonlat = feature.geometry.getBounds().getCenterLonLat();
                var size = new Geoway.Size(210, 100);
                var html = '<div class="popup_top"><span>南宁市</span></div>';
                html += '<div class="popup_content">';
                html += '<div class="popup_item">地址：广西壮族自治区</div>';
                html += '</div>';
                var popup = new Geoway.GeowayPopup("mark_popup", lonlat, size, html, 12, true);
                feature.popup = popup;
                map.addPopup(popup);
            }

        },

        // 获取审查点数据
        getCheckPoints: function () {
            _this = this;
            this.$http.get('data/cityList.json').then(function (res) {
                _this.cityList = res.body.result.list;
                console.log(_this.cityList);
            })
        },

        // 显示下属城镇
        showTowns: function (item) {
            this.districts = item.districts;
        }
    },

    computed: {}
})
