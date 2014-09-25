$(function(){
    var $sevenBox = $(".seven-box");

    var $sevenDiv = $(".seven-content div"),
        $clickMe = $(".clickMe"),
        /* 送上祝福 */
        $mask = $(".mask"),
        $popBox = $(".pop-box"),
        $write = $("#write"),
        $uSure = $("#uSure"),
        $sevenContent = $(".seven-content");

 
        $sevenDiv.each(function(){
            defineSevenDiv($(this));
        })

        function defineSevenDiv($own){
            var _obj = defineRandom();
            $own.css({"transform":"rotate("+_obj.rotate+"deg)"}); /* 设置随机旋转值 */
            $own.animate({left: _obj.left+"px",top: _obj.top+"px"}); /* 随机排布 */
        }

        /* 定义随机left，top和旋转值 */
        function defineRandom(){
            var randomLeft = Math.floor(580*(Math.random())) + 30, /* 图片left值 */
                randomTop =  Math.floor(350*Math.random()) + 30, /* 图片top值 */
                randomRotate = 20 - Math.floor(40*Math.random()); /* 图片旋转角度 */
            return {
                left: randomLeft,
                top: randomTop,
                rotate:randomRotate
            }
        }

        /* 拖动祝福卡片 */
        draggableNote();
        /* 拖动图片 */
        function draggableNote(){
            $(".seven-content div").draggable({
                containment: $sevenContent,
                zIndex: 2700,
                start: function(){
                    $(this).css({"transform":"rotate(0deg)","cursor": "crosshair"}); /* 开始拖动图片旋转为0，鼠标样式改变 */
                },
                stop: function(){
                    var _obj = defineRandom();
                    $(this).css({"transform":"rotate("+_obj.rotate+"deg)","cursor": "pointer"}); /* 停止拖动，旋转为随机的 */
                }
            })
        }

        /* 点我送祝福 */
        $clickMe.click(function(){
            $write.val("送上您的祝福吧~");
            $mask.fadeIn();
            $popBox.animate({top: "50%"});
        })

        /* 获取焦点时 */
        $write.focus(function(){
            var _val = $(this).val();
            if(_val == "送上您的祝福吧~"){
                $(this).val("");
            }
        })
        /* 丢失焦点时 */
        $write.blur(function(){
            var _val = $(this).val();
            if(_val.length == 0){
                $(this).val("送上您的祝福吧~");
            }
        })

        /* 点击确定 */
        $uSure.click(function(){
            var _writeVal = $write.val();
            var _randomNum = Math.ceil(Math.random()*6);
            if(_writeVal != "送上您的祝福吧~"){
                var _div = '<div class="note-'+_randomNum+'">'+_writeVal+'</div>';
                $sevenContent.append(_div); /* 如果输入祝福语，将此标签添加的尾部 */
                defineSevenDiv($sevenContent.find("div:last"));
                $popBox.animate({top: "-300px"},function(){
                    $mask.fadeOut();
                    draggableNote(); /* 可拖动卡片，给新添加的标签赋予拖动功能 */
                });
            }else{
                alert("请输入祝福语！");
            }
        })

})