(function () {
    window.Background = Class.extend({
        init : function (option) {
            option = option || {};
            // 图片
            this.image = option.image;
            // 坐标
            this.x = 0;
            this.y = option.y || 0;
            this.width = option.width || 0;
            this.height = option.height || 0;
            // 绘制的总个数
            this.count = parseInt(game.canvas.width/this.width) + 1;
            // 速度
            this.speed = option.speed || 1;
        },
        // 绘制
        render : function () {
            for (var i = 0; i < this.count*2; i++) {
                game.context.drawImage(this.image,this.x+i*this.width,this.y,this.width,this.height);
            }

        },
        // 更新
        update : function () {
            this.x -= this.speed;
            if(this.x == -this.width*this.count){
                this.x = 0;
            }
        },
        // 暂停
        pause : function () {
            this.speed = 0;
        }
    });
})();
