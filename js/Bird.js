(function () {
    window.Bird = Class.extend({
        init : function () {
            // 宽高
            this.width = 85;
            this.height = 60;
            // 坐标
            this.x = (game.canvas.width-this.width) * 0.5;
            this.y = 100;
            // 小鸟翅膀的状态 合法值:0,1,2
            this.wingState = 0;
            //  下落的增量
            this.dy = 0;
            // 下落的帧数
            this.dropFrame = game.frameUtil.currentFrame;
            // 下落的角度
            this.rotateAngle = 0;
            // 小鸟的状态 0: 下落 1:上升
            this.state = 0;

            // 绑定事件
            this.blindClick();

            // 空气的阻力
            this.deleteY = 1;
            // 是否死亡
            this.die = false;
            // 动画的索引
            this.dieAnimationIndex = 0;

        },
        // 绘制
         render :function () {
            // 小鸟死亡,抛热血
             if(this.die == true){

                 // 计算需要的值
                 var clipW = 1625/5;
                 var clipH = 828/6;
                 // 求出行号和列号
                 var row = parseInt(this.dieAnimationIndex/5);
                 var col = this.dieAnimationIndex%5;
                 // 绘制热血
                 game.context.drawImage(game.allImageObj['blood'],col*clipW,row*clipH,clipW,clipH,this.x-100,this.y,clipW,clipH);

                 // 绘制游戏结束
                 var gameOverX = (game.canvas.width-626)*0.5;
                 var gameOverY = (game.canvas.height-144)*0.5;
                 game.context.drawImage(game.allImageObj['gameover'],gameOverX,gameOverY);

                 return;
             }
             game.context.save();
            // 把画布位移到小鸟的中心点
             game.context.translate(this.x+this.width*0.5,this.y+this.height*0.5);
             // 旋转
             game.context.rotate(this.rotateAngle*Math.PI/180);
             // 复位
             game.context.translate(-(this.x+this.width*0.5),-(this.y+this.height*0.5));
             // 绘制小鸟
            game.context.drawImage(game.allImageObj['bird'],this.wingState*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
             game.context.restore();
         },
        // 更新
        update : function () {
             // 更新抛热血的动画
            if(this.die==true){
                this.dieAnimationIndex++;
                if(this.dieAnimationIndex>=30){ // 抛热血的动画执行完毕
                    // 暂停游戏
                    game.pause();
                }
                return;
            }
            // 1.每隔5帧更新一次状态
            if(game.frameUtil.currentFrame%5==0){
                // 更新状态
                this.wingState++;
                if(this.wingState >2){
                    this.wingState = 0;
                }
            }

            // 2.根据小鸟的状态判断是下落还是上升
            if(this.state == 0){ // 下落
                // 下落,模拟自由落体运动
                // Math.pow(3,2) 3^2
                this.dy = 0.01*Math.pow((game.frameUtil.currentFrame - this.dropFrame),2);
                // 累加下落的角度
                this.rotateAngle += 1;
            } else if(this.state == 1){ // 上升
                // 阻力越来越大
                this.deleteY++;
                // 默认让小鸟向上冲
                this.dy = -15 + this.deleteY;
                if (this.dy >= 0){ // 下落
                    // 更新小鸟的状态
                    this.state = 0;
                    // 更新下落的帧数
                    this.dropFrame = game.frameUtil.currentFrame;
                }
            }

            // 3.修改Y值
            this.y += this.dy;

            // 4.封锁上空
             if (this.y <= 0) {
                 this.y = 0;
             }
             // 5.小鸟撞到地板,游戏结束
            if(this.y+this.height+48>game.canvas.height){
                 // 游戏结束
                game.gameOver();
            }

        },
        // 绑定事件
        blindClick : function () {
            //备份指针
            var self = this;
            game.canvas.onmousedown = function () {
                // 更新小鸟的状态
               self.state = 1;
               // 小鸟上升的角度
                self.rotateAngle = -25;
                // 复位空气的阻力
                self.deleteY = 1;
            }
        }
        
    });
})();
