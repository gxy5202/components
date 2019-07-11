//import Stats from './stats.module.js';

//频谱
(function musicFrequecy(){
   // var stats = new Stats(); 
         

   //配置项
    var frequencyOption= {
        minHeight: Number($('#minHeight').val()), //音符最小高度
        maxHeight: Number($('#maxHeight').val()), //音符最大高度
        width: Number($('#width').val()), //音符宽度
        align: $('#align').val(), //音符对齐方式
        dis: Number($('#dis').val()), //音符间距
        num: Number($('#num').val()), //音符数量
        color: [$('#color1').val(),$('#color2').val(),$('#color3').val()], //音符颜色,默认三个
        radius: Number($('#radius').val()), //音符圆弧
        speed: $('#speed').val(), //动画速度 
        isChangeParam:false, //是否改变参数
        isAllControl:false, //是否所有都有的参数
        isClose:false //是否关闭
    }
    
    //功能实现
    var frequencySetOption = function(){
         //初始化容器和事件
         this.init = function(){
            $('.container').css('background','black');
            
            //改变设置项时
            $('.control-bar').change(function(){
                
                switch($(this).attr('id')){
                    case 'minHeight':
                        frequencyOption.minHeight = Number($(this).val());
                        break;
                    case 'maxHeight':
                        frequencyOption.maxHeight = Number($(this).val());
                        break;
                    case 'width':
                        frequencyOption.width = Number($(this).val());
                        break;
                    case 'align':
                        frequencyOption.align = $(this).val();
                        frequencyOption.isAllControl = true;
                        break;
                    case 'dis':
                        frequencyOption.dis = Number($(this).val());
                        break;
                    case 'radius':
                        frequencyOption.radius = Number($(this).val());
                        break;
                    case 'num':
                        frequencyOption.num = Number($(this).val());
                        frequencyOption.isAllControl = true;
                        break;
                    case 'speed':
                        frequencyOption.speed = Number($(this).val());
                        break;
                    case 'color1':
                        frequencyOption.color[0] = $(this).val();
                        frequencyOption.isAllControl = true;
                        break;
                    case 'color2':
                        frequencyOption.color[1] = $(this).val();
                        frequencyOption.isAllControl = true;
                        break;
                    case 'color3':
                        frequencyOption.color[2] = $(this).val();
                        frequencyOption.isAllControl = true;
                        break;
                }
                frequencyOption.isChangeParam = true; //开启改变状态
            })
        };

        this.setFrequency = function(param){

            //生成频谱
            function newFrequency(){
                 //对齐方式
                $('.container').html('').css({
                    alignItems:param.align
                });

                //生成个数
                var item = '';
                for(var i=0; i<param.num; i++){
                    item += "<div class='item'></div>";   
                }
                $('.container').append(item);

                //颜色分配
                $('.item').each(function(index,now){
                    var x = index + 1;
                    switch( x % 3 ){
                        case 0:
                            $(this).css({
                                backgroundColor: param.color[2],
                            });
                            break;
                        case 1:
                            $(this).css({
                                backgroundColor:param.color[1],
                            });
                            break;
                        case 2:
                            $(this).css({
                                backgroundColor:param.color[0],
                            });
                            break;
                    }
                })
                
            }
            newFrequency();

            //初始值设置
            function setCss(){
                $('.item').css({
                    width: param.width + 'px',
                    height: param.minHeight + 'px',
                    margin: param.dis,
                    borderRadius:param.radius,
                    backgroundColor:param.color,
                    transition:param.speed / 1000 + 's linear',
                    //animation: 'upDown ' + param.speed / 1000 + 's linear alternate infinite' 
                });
            }
            setCss();
            
            

            function animate(){



                requestAnimationFrame(animate)
            }

            // 设置动画，设置的间隔执行一次
            var frequencyDance = function(){
                //颜色和
                if(param.isChangeParam && frequencyOption.isAllControl){
                    newFrequency();
                }

                $('.item').each(function(index,now){
                    
                    //生成范围内的随机高度
                    var heightRange = Math.round(Math.random() * (param.maxHeight - param.minHeight) + param.minHeight);
                    if(param.isChangeParam){
                        $(this).css({
                            width: param.width + 'px',
                            margin: param.dis,
                            borderRadius:param.radius,
                            height: heightRange + 'px',
                            transition:param.speed / 1000 + 's linear'
                        });
                    }
                    else {
                        $(this).css({
                            height: heightRange + 'px',
                        });
                    }
                })
                frequencyOption.isChangeParam = false;
                frequencyOption.isAllControl = false;
            }
            
            var timer = setInterval(frequencyDance,param.speed);
            
            $('#close').click(function(){
                if(!param.isClose){
                    $('.container').html('');
                    clearInterval(timer);
                    frequencyOption.isClose = true;
                    $(this).html('开始');
                }
                else {
                    newFrequency();
                    setCss();
                    timer = setInterval(frequencyDance,param.speed);
                    $(this).html('关闭');
                    frequencyOption.isClose = false;
                }
                
            })
            

            //检测帧数
            // function animation(){
            //     stats.update();
            //     requestAnimationFrame( animation );
            //     return;
            // }
            // animation();
        }
    }
    var frequency = new frequencySetOption();
    frequency.init();
    frequency.setFrequency(frequencyOption);
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





