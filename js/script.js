function loadData(){$.ajax({type:"get",async:!1,cache:!1,url:"./data/images.json",dataType:"json",success:function(a,i){$.each(a,function(i){$(".grid").append('<div class="grid__unit grid__unit--30" data-img="'+a[i].img+'" data-title="'+a[i].profile_name+'" data-descr="'+a[i].location+'" data-index="'+a[i].id+'" style="background-image: url('+a[i].img+')"><img class="visuallyhidden" src="'+a[i].img+'"/></div>')})}})}$(document).ready(function(){loadData();var a=function(){$(".popup__nav--left").removeClass("popup__nav--disable"),$(".popup__nav--right").removeClass("popup__nav--disable");var i=$(".grid__unit--active").data("index");a.totalUnits=$(".grid__unit").length,1==i?$(".popup__nav--left").addClass("popup__nav--disable"):$(".popup__nav--left").removeClass("popup__nav--disable"),i==a.totalUnits?$(".popup__nav--right").addClass("popup__nav--disable"):$(".popup__nav--right").removeClass("popup__nav--disable")};$(".grid__unit").click(function(){$(".grid__unit").removeClass("grid__unit--active"),$(this).addClass("grid__unit--active"),showModal($(this)),a()}),$("body").on("click",".popup__nav--right, .popup__nav--left",function(){if(!$(this).hasClass("popup__nav--disable")){var i=$(".grid__unit--active").data("index"),t=parseInt(i+1);$(this).hasClass("popup__nav--left")&&(t-=2);var p=$(".grid__unit[data-index="+t+"]");p.length>0&&($(".grid__unit").removeClass("grid__unit--active"),showModal($(p)),p.first().addClass("grid__unit--active")),a()}})});var modalContent="";showModal=function(a){var i=a.data("title"),t=a.data("descr"),p=a.data("img");modalContent='<div class="popup__close"><i class="fa fa-times" aria-hidden="true"></i></div><div class="popup__wrapper"><div class="popup__nav popup__nav--left"><i class="fa fa-chevron-left" aria-hidden="true"></i></div><div class="popup__nav popup__nav--right"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>',modalContent+='<div class="popup__slider" style="background-image:url('+p+')">',modalContent+="</div>",modalContent+='<div class="popup__content">',modalContent+='<h3 class="popup__title">'+i+"</h3>",modalContent+='<p class="popup__descr">'+t+"</p>",modalContent+="</div>",modalContent+="</div>",$(".popup").html(modalContent),$(".popup").addClass("popup--active"),$(".overlay").addClass("overlay--active"),$(".popup__close").click(function(){$(this).parent().removeClass("popup--active"),$(".overlay").removeClass("overlay--active")})};