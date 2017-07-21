(function () {
    window.Game = Class.extend({
        // 初始化的方法
        init : function (option) {
            option = option || {};
            // 0.备份指针
            var self = this;
            // 1.fps
            this.fps = option.fps || 60;
            // 2.实例化帧工具类
            this.frameUtil = new FrameUtil();
            // 3.获取画布和上下文
            this.canvas = document.getElementById(option.canvasId);
            this.context = this.canvas.getContext('2d');
            // 4.实例化加载本地数据
            this.staticSourceUtil = new StaticSourceUtil();
            // 5.保存所有的数据
            this.allImageObj = {};
            // 5.加载数据
            // 需要的数据:所有图片的dom对象,所有的图片个数,已经加载好的dom对象个数
            this.staticSourceUtil.loadImage('r.json',function (allImageObj,allImageCount,loadImageCount) {
                    // 判断数据加载完毕后运行游戏
                    if(allImageCount == loadImageCount){
                        // 保存数据
                        self.allImageObj = allImageObj;
                        // 运行游戏
                        self.run();
                    }
            });
            // 6.记录游戏是否正在运行
            this.isRun = true;
        },

        // 运行游戏
        run : function () {
            // 备份指针
            var self = this;
            // 使用定时器
            this.timer = setInterval(function () {
              self.runLoop();
            },1000/self.fps); // fps = 50  1s->50  1000/50->每一帧需要的时间

            // 创建房子
            this.fangzi = new Background({
                image : this.allImageObj['fangzi'],
                y :this.canvas.height-256-100,
                width : 300,
                height : 256,
                speed : 2
            });
            // 创建树
            this.shu = new Background({
                image : this.allImageObj['shu'],
                y :this.canvas.height-216-48,
                width : 300,
                height : 216,
                speed : 3
            });
            // 创建地板
            this.diban = new Background({
                image : this.allImageObj['diban'],
                y :this.canvas.height-48,
                width : 48,
                height : 48,
                speed : 4
            });

            // 定义一个管道数组
            this.pipeArr = [new Pipe()];
            // 创建小鸟
            this.bird = new Bird();
        },

        // 游戏运行循环->每一帧都要执行
        runLoop : function () {
            // 0.清屏
            this.context.clearRect(0,0,canvas.width,canvas.height);
            // 1. 计算每秒真实的帧数
            this.frameUtil.render();
            // 2. 绘制fps/fno
            this.context.fillText('FPS/'+this.frameUtil.realFps,15,15);
            this.context.fillText('FNO/'+this.frameUtil.currentFrame,15,30);
            // 3.渲染和更新房子
            this.fangzi.update();
            this.fangzi.render();
            // 4.渲染和更新树
            this.shu.update();
            this.shu.render();
            // 5.渲染和更新地板
            this.diban.update();
            this.diban.render();

            // 6.每隔100帧创建一个新的管道
            if(this.isRun&&this.frameUtil.currentFrame%100==0){
               this.pipeArr.push(new Pipe());
            }
            // 7.渲染和更新管道
            // 先更新
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].update();
            }
            // 在绘制
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].render();
            }
            // 8.渲染和更新小鸟
            this.bird.update();
            this.bird.render();
        },
        // 暂定游戏
        pause : function () {
            clearInterval(this.timer);
        },
        // 结束游戏
        gameOver : function () {
            // 游戏结束
            this.isRun = false;
            // 暂停背景
            this.fangzi.pause();
            this.shu.pause();
            this.diban.pause();
            // 暂停管道
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].pause();
            }
            // 发送通知,小鸟死亡
            game.bird.die = true;
        }
    });
})();
