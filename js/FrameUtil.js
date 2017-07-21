
// 帧工具类:获取每一秒的真实帧数 总的的帧数
(function () {
    window.FrameUtil = Class.extend({
        init : function () {
            // 1.开始的时间
            this.sTime = new Date();
            // 2.开始的帧数
            this.sFrame = 0;
            // 3. 当前的总帧数
            this.currentFrame = 0;
            // 4.真实的 fps
            this.realFps = 0;
        },

        // 每一帧都要执行1次
        render : function () {
            // 累加当前的总帧数
            this.currentFrame++;
            // 当前的时间
             var currentTime = new Date();
            //  判断是否走过了1秒
            if(currentTime-this.sTime >= 1000) { // 走过了1秒
                // 计算真实的fps
                this.realFps = this.currentFrame - this.sFrame;
                // 更新开始的帧数
                this.sFrame = this.currentFrame;
                // 更新开始的时间
                this.sTime = currentTime;
            }
        }
    });
})();