// import Stats from './stats.module.js';
// var stats = new Stats(Stats);

(function frequencyStart() {

    //构造函数生成配置项，避免引用类型问题
    var Frequency = function(){
        //配置项
        this.options = {
            minHeight: Number($('#minHeight').val()), //音符最小高度
            maxHeight: Number($('#maxHeight').val()), //音符最大高度
            width: Number($('#width').val()), //音符宽度
            align: $('#align').val(), //音符对齐方式
            dis: Number($('#dis').val()), //音符间距
            num: Number($('#num').val()), //音符数量
            color: [$('#color1').val(),$('#color2').val(),$('#color3').val()], //音符颜色,默认三个
            radius: Number($('#radius').val()), //音符圆弧
            speed: $('#speed').val(), //动画速度 
            status:{
                isChangeWidth:false,
                isChangeAlign:false,
                isChangeDis:false,
                isChangeNum:false,
                isChangeColor:false,
                isChangeRadius:false,
                isChangeColor:false
            },
            isChangeParam:false, //是否改变参数
            isAllControl:false, //是否所有都有的参数
            isClose:false //是否关闭
        }
    };

    //原型方法定义函数
    Frequency.prototype = {
        constructor:Frequency,
        //初始化
        init:function() {

            this.setNum();
            this.setAlign();
            this.setColors();

            $('.item').css({
                
                width:this.options.width,
                marginLeft:this.options.dis,
                transition: this.options.speed / 1000 + 's linear',
            })

            //检测帧数
            // function animation() {
            //     stats.update();
            //     requestAnimationFrame(animation);
            //     return;
            // }
            // animation();
        },
        //修改数量
        setNum:function() {
            var item = '';
            for(var i=0;i<this.options.num;i++){
                item += "<div class='item'></div>";
            }
            $('.container').html('').append(item);
            $('.item').css({
                width:this.options.width,
                marginLeft:this.options.dis,
                transition: this.options.speed / 1000 + 's linear',
            })

        },
        //修改对齐方式
        setAlign:function() {
            $('.container').css('align-items',this.options.align);
        },
        //修改颜色
        setColors:function() {
            var _this = this;
            $('.item').each(function(index,now){
                var x = index + 1;
                switch( x % 3 ){
                    case 0:
                        $(this).css({
                            backgroundColor: _this.options.color[2],
                        });
                        break;
                    case 1:
                        $(this).css({
                            backgroundColor: _this.options.color[1],
                        });
                        break;
                    case 2:
                        $(this).css({
                            backgroundColor: _this.options.color[0],
                        });
                        break;
                }
            })
        },
        //动画
        render:function() {
            var lastTime = Date.now();
            var everyTime = 0;
            //var duration = this.options.speed;
            var reserve = true;
            var arr = [];
            var _this = this;


            function draw(param) {
                param = reserve ? param : 1 - param;
                
                switch(true){
                    case _this.options.status.isChangeNum == true:
                        _this.setNum();
                        _this.setColors();
                        _this.options.status.isChangeNum = false;
                        break;
                    case _this.options.status.isChangeWidth:
                        $('.item').css('width', _this.options.width);
                        _this.options.status.isChangeWidth = false;
                        break;
                    case _this.options.status.isChangeAlign:
                        _this.setAlign();
                        _this.options.status.isChangeAlign = false;
                        break;
                    case _this.options.status.isChangeDis:
                        $('.item').css('margin-left', _this.options.dis);
                        _this.options.status.isChangeDis = false;
                        break;
                    case _this.options.status.isChangeRadius:
                        $('.item').css('border-radius', _this.options.radius);
                        _this.options.status.isChangeRadius = false;
                        break;
                    case _this.options.status.isChangeColor:
                        _this.setColors();
                        _this.options.status.isChangeColor = false;
                        break;
                    default:
                        $('.item').each(function (index) {
                            $(this).css({
                                //transform: 'scaleY('+arr[index]+')',
                                height: arr[index] + 'px',
                                transition: _this.options.speed / 1000 + 's linear'
                            })
                        });
                        break;
                }

            }
            animate.call(this);
            
            function animate(parm) {
                //console.log(this.options.speed)
                
                var now = Date.now();
                var everyTime = (now - lastTime) / this.options.speed;
                if (everyTime > 1) {
                    everyTime = 0;
                    lastTime = now;
                    reserve = !reserve;
                    
                    arr = [];
                    for (var i = 0; i < this.options.num; i++) {
                        var heightRange = Math.round(Math.random() * (this.options.maxHeight - this.options.minHeight) + this.options.minHeight);
                        //var heightRange = (Math.random() * ((this.options.maxHeight / this.options.minHeight) - 1.0) + 1.0).toFixed(2);
                        console.log(heightRange)
                        arr.push(heightRange);
                    }
                }
                draw(everyTime);
                requestAnimationFrame(animate.bind(this))
            }
        },
        //操控面板
        control:function() {
             //改变设置项时
             //console.log(this.options)
             var _this = this;
             $('.control-bar').change(function(){
                switch($(this).attr('id')){
                    case 'minHeight':
                        _this.options.minHeight = Number($(this).val());
                        _this.options.isChangeParam = true;
                        break;
                    case 'maxHeight':
                        _this.options.maxHeight = Number($(this).val());
                        _this.options.isChangeParam = true;
                        break;
                    case 'width':
                        _this.options.width = Number($(this).val());
                        _this.options.status.isChangeWidth = true;
                        break;
                    case 'align':
                        _this.options.align = $(this).val();
                        _this.options.status.isChangeAlign = true;
                        break;
                    case 'dis':
                        _this.options.dis = Number($(this).val());
                        _this.options.status.isChangeDis = true;
                        break;
                    case 'radius':
                        _this.options.radius = Number($(this).val());
                        _this.options.status.isChangeRadius = true;
                        break;
                    case 'num':
                        _this.options.num = Number($(this).val());
                        _this.options.status.isChangeNum = true;
                        break;
                    case 'speed':
                        _this.options.speed = Number($(this).val());
                        _this.options.isChangeParam = true;
                        break;
                    case 'color1':
                        _this.options.color[0] = $(this).val();
                        _this.options.status.isChangeColor = true;
                        break;
                    case 'color2':
                        _this.options.color[1] = $(this).val();
                        _this.options.status.isChangeColor = true;
                        break;
                    case 'color3':
                        _this.options.color[2] = $(this).val();
                        _this.options.status.isChangeColor = true;
                        break;
                }
                
            })
        }
    }
    var fre = new Frequency();
    fre.init();
    fre.render();
    fre.control();
})()


//控制元素大小
document.addEventListener('mousemove',function(e){
    //控制元素大小
    var divLeft = $('.container').offset().left;
    var divTop = $('.container').offset().top;
    var divRight = $('.container').width() + divLeft;
    var divBottom = $('.container').height() + divTop;
    //console.log(e);
    switch(true){
        case e.clientX >= divLeft - 5 && e.clientX <= divLeft + 5:
            $('.container').css({
                cursor: 'w-resize'
            });
            break;
            
        case e.clientX >= divRight - 5 && e.clientX <= divRight + 5:
            $('.container').css({
                cursor: 'w-resize'
            });
            break;
        case e.clientY >= divTop - 5 && e.clientY <= divTop + 5:
            $('.container').css({
                cursor: 's-resize'
            });
            break;
        case e.clientY >= divBottom - 5 && e.clientY <= divBottom + 5:
            $('.container').css({
                cursor: 's-resize'
            });
            break;
        default:
            $('.container').css({
                cursor: 'default'
            });
            break;
    }
});


document.onmousedown = function(e){
    var width = $('.container').width();
    var height = $('.container').height();

    var divLeft = $('.container').offset().left;
    var divTop = $('.container').offset().top;
    var divRight = $('.container').width() + divLeft;
    var divBottom = $('.container').height() + divTop;

    var divHeight = $('.container').offset().top;

    var windowWith = document.body.clientWidth;
    var windowHeight = document.body.clientHeight;

    document.onmousemove = function(event){
        var dis = event.clientX - e.clientX;
        var disY = event.clientY - e.clientY;
        
        if (e.clientX >= divLeft - 5 && e.clientX <= divLeft + 5) {
            
            $('.container').css({
                width:width - dis + 'px',
                left:divLeft + dis + 'px'
            })
        }
        if (e.clientX >= divRight - 5 && e.clientX <= divRight + 5) {
            
            $('.container').css({
                width:width + dis + 'px',
                right:windowWith - divRight - dis + 'px'
            })
        }
        if (e.clientY >= divTop - 5 && e.clientY <= divTop + 5) {
            
            $('.container').css({
                height:height - disY  + 'px',
                top:divHeight + disY  + 'px'
            })
        }
        if (e.clientY >= divBottom - 5 && e.clientY <= divBottom + 5) {
            
            $('.container').css({
                height:height + disY  + 'px',
                bottom:windowHeight - divBottom - disY  + 'px'
            })
        }
    }
    
    document.onmouseup = function(){
        document.onmousemove = null;
        //document.onmousedown= null;
    }
}
