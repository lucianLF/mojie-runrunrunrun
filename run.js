// ==UserScript==
// @name         跑图专业户
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        *://ah0.wapgame.top/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wapgame.top
// @grant        none
// ==/UserScript==
(function () {


})();

var script=document.createElement("script");
script.type="text/javascript";
script.src="https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName('head')[0].appendChild(script);
setTimeout(function(){
for(var i=0;i<50;i++){
    if($('a').eq(i).text().indexOf('返回场景')!=-1){
        window.location.href=$('a').eq(i).attr('href');
        return
    }else if($('a').eq(i).text().indexOf('三级')!=-1){
        window.location.href=$('a').eq(i).attr('href');
        return
    }else if($('a').eq(i).text().indexOf('高级')!=-1){
        window.location.href=$('a').eq(i).attr('href');
        return
    }else if($('a').eq(i).text().indexOf('更多')!=-1){
        window.location.href=$('a').eq(i).attr('href');
        return
    }else{
         if($('a').eq(i).text()=="挂机"&&localStorage.getItem('tu')!=1){
            if($('a').eq(i+2).text()=="属性"){
                localStorage.setItem('tu','1');
            }
            window.location.href=$('a').eq(i+1).attr('href');
            return
        }else if($('a').eq(i).text()=="挂机"&&localStorage.getItem('tu')==1){
            if($('a').eq(i+2).text()=="属性"){
                localStorage.setItem('tu','0');
            }
            for(var a=i;a<50;a++){
                if($('a').eq(a).text()=="属性"){
                    window.location.href=$('a').eq(a-1).attr('href');
                    return
                }
            }
        }
    }

}
},3000)
