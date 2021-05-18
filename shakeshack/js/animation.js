$(function(){
    
    /*------------------------------section1---------------------------------*/
    var a=$(".main1BicTxt p").position().top;
    console.log(a);
    function main1_txt(){
        $(".main1BicTxt p").delay(700).animate({top:0},1000,function(){
        $(".main1SmallTxt").animate({opacity:"1"},1000);  
        });
    }
    $(window).scroll(function(){});
    main1_txt();
    console.log(a);
    console.log($("#section2").offset().top);
    
    
    /*------------------------------section2---------------------------------*/
    //버거 애니메이션
    $(window).resize(function(){
        var burgerWidth=$("#section2 img").width();
        $("#section2 img").css({"height":burgerWidth*0.88});
    });
    $()
    $("#section2 img").mouseover(function(){
        var burgerWidth=$("#section2 img").width();
        $(this).animate({height:burgerWidth*0.78},300,function(){
            $(this).animate({height:burgerWidth},300,function(){
                $(this).animate({height:burgerWidth*0.88},300);
            });
        });
    });
    
    //텍스트 애니메이션
    
    function textBanner1(){
        $("#section2 .shake").delay(100).animate({left:"7%"},1000,function(){
            $("#section2 .shake").delay(100).animate({left:"-7%"},1000,function(){
            });
        });
    }
    function textBanner2(){
        $("#section2 .burger").delay(100).animate({right:"7%"},1000,function(){
            $("#section2 .burger").delay(100).animate({right:"-7%"},1000,function(){

            });
        });
    }
    var timer1=setInterval( textBanner1, 2200);
    var timer2=setInterval( textBanner2, 2200);
    
    
    
    
    /*------------------------------section3---------------------------------*/
    
    $(".main3Mini li").mouseover(function(){
        var p_idx=$(this).index()+1;
        console.log(p_idx);
        $(this).children("p").addClass("active");
        $(".main3Mini li p").not($(this).children("p")).removeClass("active");
        $(".main3Img").css({"background":" url(images/main_pic03-"+p_idx+".png) center center no-repeat"}).css({"background-size":"cover"});
    });
    
    
    
    
    /*------------------------------section4--------------------------------*/
    
    $(".imgList li").mouseover(function(){
      $(this).addClass("off");
    $(".imgList li").not($(this)).removeClass("off");  
    });
    
    
    
    
    
    
    
});