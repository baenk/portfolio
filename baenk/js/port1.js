 $(function(){
            
            //새로고침시 최상단
            window.onload=function(){
                setTimeout(function(){
                    scrollTo(0,0);
                }, 100);
            }
            $(window).resize(function(){
//                timeline= setInterval( canvas_ani,1000/60 );
                height=$(this).height();
                if($(window).width()<769){
                    $("#section3 .part1").css({"width":"100%"});
                    $("#section3 .part2").css({"width":"80%","height":"40%"});
                }
                else{
                    $("#section3 .part1").css({"width":"36%"});
                    $("#section3 .part2").css({"width":"56%","height":"70%"});
                }
                
            });
            
            //section1----------------------------------------------------------------------
            //시작 텍스트 애니메이션
           if($(window).width()>460){
               
            $(".txt").delay(1000).animate({width:"100%"},1200,"easeOutQuart",function(){
                    $(".txt").delay(300).animate({height:"100%"},800,function(){
                        $("#bgArea").css({"opacity":"1"});
                        $("#section1 img").css({"opacity":"1"});
                        $(".txt").css({"background":"none"});
                        $(".scroll").stop().animate({opacity:"1"},800,function(){
                            timer;
                            $(".txt2").css({"position":"absolute"});
                            scrollToggle=true;
                        });
                    });
                });
            }
            else{
            $(".txt").delay(1000).animate({height:"100%"},1200,"easeOutQuart",function(){
                    $(".txt").delay(300).animate({width:"100%"},800,function(){
                        $("#bgArea").css({"opacity":"1"});
                        $("#section1 img").css({"opacity":"1"});
                        $(".txt").css({"background":"none"});
                        $(".scroll").stop().animate({opacity:"1"},800,function(){
                            timer;
                            $(".txt2").css({"position":"absolute"});
                            scrollToggle=true;
                        });
                    });
                });
            }
            //section2----------------------------------------------------------------------
            //디테일 버튼 마우스오버
            var sec2_btn= $("#section2 .hourBox a");
            mouseHover(sec2_btn);
            
            //canvas
            var canv=$("#canvas1")[0].getContext("2d");
            
            var skill=0;
            var per=0;
            
            function canvas_ani(){
                var canWidth= $("#canvas1").width();
                var canHeight=$("#canvas1").height();
                skill+= 0.02*(800-skill);
                per= Math.round(skill);
                
                canv.clearRect(0,0,400,canHeight*0.8);
                canv.font="100px Bold";
                canv.lineWidth="5"
                canv.strokeStyle="white";
                canv.fillStyle="white";

                if($(window).width()<460){
                    canv.font="70px Bold";
                    canv.strokeText(per,40,120);
                    canv.fillText(per,40,120);
                }
                else{
                    canv.font="90px Bold";
                    canv.strokeText(per,0,120);
                    canv.fillText(per,0,120);
                }
            }

            //section3-----------------------------------------------------------------------
            //workTxt버튼 마우스오버
            var sec3_btn=$("#section3 .workTxt a");
            mouseHover(sec3_btn);
            
            
            
            $("#section3 .part2 li").mouseover(function(){
                $(this).addClass("active");
                $(this).children("a").addClass("active");
                
            });
            $("#section3 .part2 li").mouseleave(function(){
                $(this).removeClass("active");
                $(this).children("a").removeClass("active");
            });
            
             //popup
            $("#section3 .part2 li a").click(function(e){
                e.preventDefault();
                var idx= $(this).parent("li").index();
                if(idx==0){
                    $("#popup_info").css({"background":"#15af85"});
                    $("#popup_bg .popup_info_txt ul a").attr("href","http://johnstones.dothome.co.kr");
                }
                else if(idx==1){
                    $("#popup_info").css({"background":" #62ae39"});
                    $("#popup_bg .popup_info_txt ul a").attr("href","http://baenk0"+(idx+1)+".dothome.co.kr");
                }
                else if(idx==2){
                    $("#popup_info").css({"background":"#434f7a"});
                    $("#popup_bg .popup_info_txt ul a").attr("href","http://baenk0"+(idx+1)+".dothome.co.kr");
                }
                else if(idx==3){
                    $("#popup_info").css({"background":"#333"});
                    $("#popup_bg .popup_info_txt ul a").attr("href","http://baenk0"+(idx+1)+".dothome.co.kr");
//                    $("#popup_bg .detail_image").css({"width":"100%"});
                }
                $("#popup").css({"background":"#ffffff"});
                $("#popup_bg").show().animate({opacity: "1"}, 1000,"easeOutQuart");
                $("#popup_bg #popup .work_name").text($("#section3 .workTxt li").eq(idx).children("h2").text());
                $("#popup_bg .work_detail").text($("#section3 .workTxt li").eq(idx).children("p").text());
                $("#popup_bg #work_img img").attr("src","images/detail_pic0"+(idx+1)+".png");
                $("#popup_bg .detail_image img").attr("src","images/detail0"+(idx+1)+".png");
        
            });
    
             $("#popup_bg #popup #popup_info>span").click(function(e){
                 e.preventDefault();
//                 $(window).scrollTop(st);
//                 $("body").css({"overflow":"auto","overflow-x":"hidden"});
                 $("html,body").css({"position":"relative"});
                 $("#popup_bg").animate({opacity: "0"}, 500,"easeInOutQuart",function(){
                     $("#popup_bg").hide();
                 });

             });
            $("#popup_bg #popup #popup_info>span").mouseover(function(){
                $(this).css({"opacity":"1"});
            });
            $("#popup_bg #popup #popup_info>span").mouseleave(function(){
                $(this).css({"opacity":"0.4"});
            });
            
            //section4---------------------------------------------------------------
            
            
            
            //마우스 휠 event-------------------------------------------------------------------
            //페이지 업다운 스위치
            var scrollToggle=false;
            //페이지 카운트
            var count=0;
            //section2
            //li[0] 스위치
            var txt1=false;
            //li[1] 스위치
            var txt2=false;
            //li[2] 스위치
            var txt3=false;
            //li[3] 스위치
            var txt4=false;
            //페이지 높이
            var height;
            
            $(window).mousewheel(function(e, delta){
                console.log(scrollToggle);
                if(scrollToggle==false){return;}
                //팝업 실행 시 바디 스크롤 멈춤
                if($("#popup_bg").is(":visible")){
                    count=2;
                    return;}
                height=$(this).height();
                var length= $("body>section").length;
                //휠 내릴때
                    if(delta<0){
                        if(count==2){
                            if(txt1==true && txt2==true && txt3==true && txt4 ==true){
                                count++;
                                pageMove(count);
                            }
                            
                            //애니메이션 동작
                            after_pageOn(true);
                        }
//                        else if(count==2){
//                            //애니메이션 동작
//                            after_pageOn(true);
//                        }
                        
                        else{
                            //마지막 섹션 도착 시 최대값 마지막 섹션으로 초기화
                            if(count>=length-1){
                                count= length-1;
                                }
                            //카운트 증가
                            else{
                                    count++;
                                }
                            }
                    }
                //휠 올릴때
                    else{
                        if(count==2){
                            //애니메이션 동작 안했으면 위페이지 이동
                            if(txt1==false && txt2==false && txt3==false && txt4 ==false){
                                count--;
                                pageMove(count);
                            }
                            //애니메이션 동작했으면 오프
                         after_pageOff(false);
                            
                        }
                        else{
                            //첫페이지 도착 시 0으로 초기화
                            if(count<=0){
                                count=0;
                            }
                            //카운트감소
                            else{
                                count--;
                            }
                        }
                    }
                    
                    //section2
                    if(count==1){
                        $(".scroll").hide();
                        if($(".pill").height() !=0){
                            setTimeout(function(){scrollToggle=true; }, 1000);
//                            scrollToggle=true;
                        }
                        else{
                            $(".pillPer1").delay(1500).animate({height:"60%"},1200,"easeOutQuart");
                            $(".pillPer2").delay(1500).animate({height:"40%"},1200,"easeOutQuart");
                            $(".pillPer3").delay(1500).animate({height:"80%"},1200,"easeOutQuart");
                            $(".pillPer4").delay(1500).animate({height:"70%"},1200,"easeOutQuart");
                            $(".pillPer5").delay(1500).animate({height:"90%"},1200,"easeOutQuart",function(){
                            scrollToggle=true;
                            });
                            var timeline= setInterval( canvas_ani,1000/60 );
                        }
                    }
                    //section3
                    else if(count==2){
                        $(".scroll").hide();
                        
                        if($(window).width()<769){
                                $("#section3 .part1").stop().animate({width:"100%"},1000,function(){
                                    $("#section3 .part2").stop().animate({width:"80%",height:"40%"},500);
                                });
                            }
                            else{
                                $("#section3 .part1").stop().animate({width:"36%"},1000,function(){
                                    $("#section3 .part2").stop().animate({width:"56%",height:"70%"},500);
                                });
                                
                            }
                        $(".workTxt").delay(1000).animate({opacity:1},1000,"easeOutQuart");
                        setTimeout(function(){scrollToggle=true; }, 500);
                    }
                else if(count==3){
//                    $("#section4 .part1").delay(1000).stop().animate({width:"100%",height:"300px"},1000,"easeOutQuart",function(){
//                         $("#section4 .part2").delay(400).stop().animate({width:"100%",height:"80px"},1000,"easeOutQuart",function(){
//                              $("#section4 .part3").delay(400).stop().animate({width:"100%",height:"80px"},1000,"easeOutQuart",function(){
//                                  $(".scroll img").css({"transform": "rotate(180deg)"});
//                                  $(".scroll").show();
//                              });
//                        
//                         });
//                    });
                }
                console.log(count);
                pageMove(count);
            });
            
            //터치이벤트-----------------------------------------------------------------------
            $("body").swipe({swipe: function(event, direction){
                if(scrollToggle==false){return;}
                if($("#popup_bg").is(":visible")){
                    count=2;
                    return;}
                height=$(this).height();
                var length= $("body>section").length;
                
                //터치 위로
                if(direction=="up"||direction=="left"){
                    if(count==2){
                        if(txt1==true && txt2==true && txt3==true && txt4 ==true){
                            count++;
                            pageMove(count);
                        }
                        //애니메이션 동작
                        after_pageOn(true);
                    }
                    else{
                        //마지막 섹션 도착 시 최대값 마지막 섹션으로 초기화
                        if(count>=length-1){
                            count= length-1;
                            }
                        //카운트 증가
                        else{
                                count++;
                            }
                    }
                }
                //터치 아래로
                else if(direction=="down"||direction=="right"){
                   if(count==2){
                        //애니메이션 동작 안했으면 위페이지 이동
                        if(txt1==false && txt2==false && txt3==false && txt4 ==false){
                            count--;
                            pageMove(count);
                        }
                        //애니메이션 동작했으면 오프
                         after_pageOff(false);

                    }
                    else{
                        //첫페이지 도착 시 0으로 초기화
                        if(count<=0){
                            count=0;
                        }
                        //카운트감소
                        else{
                            count--;
                        }
                    }
                }
                 if(count==1){
                        $(".scroll").hide();
                        if($(".pill").height() !=0){
                            setTimeout(function(){scrollToggle=true; }, 1000);
//                            scrollToggle=true;
                        }
                        else{
                            $(".pillPer1").delay(1500).animate({height:"60%"},1200,"easeOutQuart");
                            $(".pillPer2").delay(1500).animate({height:"40%"},1200,"easeOutQuart");
                            $(".pillPer3").delay(1500).animate({height:"80%"},1200,"easeOutQuart");
                            $(".pillPer4").delay(1500).animate({height:"70%"},1200,"easeOutQuart");
                            $(".pillPer5").delay(1500).animate({height:"90%"},1200,"easeOutQuart",function(){
                            scrollToggle=true;
                            });
                            var timeline= setInterval( canvas_ani,1000/60 );
                        }
                    }
                    //section3
                    else if(count==2){
                        $(".scroll").hide();
                        
                        if($(window).width()<769){
                                $("#section3 .part1").stop().animate({width:"100%"},1000,function(){
                                    $("#section3 .part2").stop().animate({width:"80%",height:"40%"},500);
                                });
                            }
                            else{
                                $("#section3 .part1").stop().animate({width:"36%"},1000,function(){
                                    $("#section3 .part2").stop().animate({width:"56%",height:"70%"},500);
                                });
                                
                            }
                        $(".workTxt").delay(1000).animate({opacity:1},1000,"easeOutQuart");
                        setTimeout(function(){scrollToggle=true; }, 500);
                    }
                else if(count==3){
//                    $("#section4 .part1").delay(1000).stop().animate({width:"100%",height:"300px"},1000,"easeOutQuart",function(){
//                         $("#section4 .part2").delay(400).stop().animate({width:"100%",height:"80px"},1000,"easeOutQuart",function(){
//                              $("#section4 .part3").delay(400).stop().animate({width:"100%",height:"80px"},1000,"easeOutQuart",function(){
//                                  $(".scroll img").css({"transform": "rotate(180deg)"});
//                                  $(".scroll").show();
//                              });
//                        
//                         });
//                    });
                }
                
                pageMove(count);
            }
        });
        /*-------------------------------------------------------------------------------*/
            
            
            /*-----------------------------function-----------------------------------*/
            //애니3 이후 페이지다운
            function after_pageOn(ts){
                if(txt1 !=ts){
                    $("#section3 .work2").animate({opacity:"1"},600).show();
                    $("#section3 .work1").animate({opacity:"0"},600).hide();
                    txt1=ts;
                    }
                else{
                    if(txt2 !=ts){
                        $("#section3 .work3").animate({opacity:"1"},600).show();
                        $("#section3 .work2").animate({opacity:"0"},600).hide();
                        txt2=ts;
                        }
                    else{
                        if(txt3 !=ts){
                            $("#section3 .work4").animate({opacity:"1"},600).show();
                            $("#section3 .work3").animate({opacity:"0"},600).hide();
                            txt3=ts;
                            }
                        else{
                            if(txt4 !=ts){
                                count++;
                                pageMove(count);
                                txt4=ts;
                             }
                        }
                    }
                }
            }
            //페이지업 이후 애니3
            function after_pageOff(ts){
                if(txt3 !=ts){
                    $("#section3 .work4").animate({opacity:"0"},600).hide();
                    $("#section3 .work3").animate({opacity:"1"},600).show();
                    txt3=ts;
                }else{
                    if(txt2 !=ts){
                        $("#section3 .work3").animate({opacity:"0"},600).hide();
                        $("#section3 .work2").animate({opacity:"1"},600).show();
                        txt2=ts;
                    }
                    else{
                        if(txt1 !=ts){
                            $("#section3 .work2").animate({opacity:"0"},600).hide();
                            $("#section3 .work1").animate({opacity:"1"},600).show();
                            txt1=ts;
                            }
                        else{
                            if(txt4 !=ts){
                                txt4=ts;
                                count--;
                                pageMove(count);
                            }
                        }
                    }
                }
            }
            
            
            //페이지 업다운
            function pageMove(a){
                $("html, body").stop().animate({"scrollTop":height*a},1000,"easeInOutCubic",function(){
                    //section1
                    if(count==0){
                        $(".scroll img").css({"transform": "rotate(0deg)"});
                        $(".scroll").show();
                        scrollToggle=true;
                    }
                });
                //section3 배경변화
                if(count>=2){
                    $("#bgArea").delay(500).addClass("sec3Bg");
                }
                else{
                    $("#bgArea").delay(500).removeClass("sec3Bg");
                }
                //section4 스크롤 업
//                if(count!=3){
//                    scrollToggle=false;
//                    $("#bgArea").css({"width":"100%"});
//                }
                if(count==3){
                    $("#section4 .part1").delay(1000).stop().animate({width:"100%",height:"300px"},1000,"easeOutQuart",function(){
                         $("#section4 .part2").delay(400).stop().animate({width:"100%",height:"80px"},1000,"easeOutQuart",function(){
                              $("#section4 .part3").delay(400).stop().animate({width:"100%",height:"80px"},1000,"easeOutQuart",function(){
                              });
                        
                         });
                    });
                    $(".scroll img").css({"transform": "rotate(180deg)"});
                    setTimeout(function(){scrollToggle=true;$(".scroll").show();},1000);
                }
                scrollToggle=false;
            }
            
            //버튼 마우스오버
            function mouseHover(buttonName){
                $(buttonName).mouseover(function(){
                    $(this).addClass("active");
                });
                $(buttonName).mouseleave(function(){
                    $(this).removeClass("active");
                });
                
            }
            //scroll버튼 
            var scrollAni= function(){
                $(".scroll").animate({bottom:"4.5%",opacity:"0.7"},200);
                $(".scroll").animate({bottom:"5%",opacity:"1"},150);
                $(".scroll").animate({bottom:"4.5%",opacity:"0.7"},200);
                $(".scroll").animate({bottom:"5%",opacity:"1"},150);
            }
            var timer=setInterval( scrollAni, 5000);
            
            /*-------------------------------------------------------------------------------*/

            
        });