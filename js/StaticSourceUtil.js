// 加载本地数据->图片
(function () {
    window.StaticSourceUtil = Class.extend({
        init : function () {
            // 保存所有的数据
            this.allImageObj = {};
        },
        // 加载图片对象
        // 返回需要的数据:所有图片的dom对象,所有的图片个数,已经加载好的dom对象个数
        loadImage : function (jsonUrl,callBack) {
            // 0.备份指针
             var self = this;
            // 1.创建请求对象
            var xhr = new XMLHttpRequest();
            // 2.ajax三步走
            xhr.open('get',jsonUrl);
            xhr.send();
            //  判断请求完成获取数据
            xhr.onreadystatechange=function()
            {
                // 当 readyState 等于 4 且状态为 200 时，表示响应已就绪,请求完成
                if (xhr.readyState==4 && xhr.status==200)
                {
                    // 已经加载好的dom个数
                    var loadImageCount = 0;
                    // 获取响应的数据(json字符串)
                    var responseText = xhr.responseText;
                    // JSON解析->对象
                    var responseJson = JSON.parse(responseText);
                    // 获取数组
                    var dataArray = responseJson.images;
                    //  遍历数组
                    for (var i = 0; i < dataArray.length; i++) {
                         // 创建图片的dom对象
                         var image = new Image();
                         image.src = dataArray[i].src;
                         image.index = i;

                         // 图片dom对象加载完毕后,返回
                        image.onload = function () {
                            // 记录已经加载好的dom个数
                            loadImageCount ++;
                            // 保存图片的dom对象
                            // key->name value->image
                            var key = dataArray[this.index].name;
                            //  this->image
                            self.allImageObj[key] = this;
                            callBack(self.allImageObj,dataArray.length,loadImageCount);
                        }
                    }
                }
            }
        }
    });
})();
