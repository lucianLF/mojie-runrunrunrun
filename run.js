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

//默认选择，缓存可修改
var 选择的路线 = 1
var 路线 = [
    [
        "艾瑞达神殿5",
        "艾瑞达神殿4",
        "中央大道5",
        "中央大道4",
        "中央大道3",
        "中央大道2",
        "中央大道1",
        "中央大道2",
        "中央大道3",
        "中央大道4",
        "中央大道5",
        "艾瑞达神殿1",
        "艾瑞达神殿2",
        "艾瑞达神殿3",
        "艾瑞达神殿2",
        "艾瑞达神殿1",
        "中央大道5",
        "艾瑞达神殿4"
    ],
    ["河安丘陵二", "河安丘陵三", "河安丘陵四", "河安丘陵一", "河安大道三", "河安丘陵一"]
]
var 游戏名称 = "拉克丝"

var 材料名称 = [
    // "完全生命",
    "高级",
    "三级",
    "霜冻",



    "返回场景"
];

var 延时 = 500



var 缓存的选择的路线 = localStorage.getItem('选择的路线');
if (缓存的选择的路线 == null) {
    localStorage.setItem('选择的路线', 选择的路线)
} else {
    选择的路线 = 缓存的选择的路线;
}



//引入jq
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName('head')[0].appendChild(script);







function 跑图() {
    var 图 = 路线[选择的路线];
    //图的下标 图的名称 下个图的下标 下个图的名称
    var 图的信息 = 获取当前所在地图(图)

    var 是否捡了材料 = 捡材料()
    if (是否捡了材料 == false) {
        去下个图(图的信息.下个图的名称, 图的信息.下个图的下标)
    }

}

function 查询是否点过更多() {
    if (localStorage.getItem('更多是否点了') == 1) {
        return true;
    } else {
        return false;
    }
}
function 清除点击了更多的记录() {
    localStorage.setItem('更多是否点了', 0);
}
function 记录点击了更多的记录() {
    localStorage.setItem('更多是否点了', 1);
}


function 捡材料() {
    for (var i = 0; i < 100; i++) {
        let 链接文字 = $('a').eq(i).text();
        for (var j = 0; j < 材料名称.length; j++) {
            var 查询是否点过更多返回值 = 查询是否点过更多()
            if (链接文字.indexOf(材料名称[j]) != -1) {
                window.location.href = $('a').eq(i).attr('href');
                return true
            } else if (
                $('a').eq(i).text().indexOf('更多') != -1
                && $('a').eq(i + 1).text().indexOf('刷新') != -1
                && !查询是否点过更多返回值
            ) {
                记录点击了更多的记录()
                window.location.href = $('a').eq(i).attr('href');
                return
            }
        }
    }
    return false
}
function 去下个图(图的名字, 下个图的下标) {
    for (var i = 0; i < 50; i++) {
        let 链接文字 = $('a').eq(i).text();
        if (链接文字.indexOf(图的名字) != -1) {
            清除点击了更多的记录()
            localStorage.setItem("这个图的下标", 下个图的下标);
            window.location.href = $('a').eq(i).attr('href');
        }
    }
}
function 获取当前所在地图(图) {

    var a = document.getElementsByClassName('main')[0].innerText;
    var 图的下标 = false;
    var 图的名称 = false;
    var 下个图的下标 = false;
    var 下个图的名称 = false;
    for (var j = 0; j < 图.length; j++) {
        var 文案1 = "你站在" + "「" + 图[j] + "」"
        var 文案2 = "你来到" + "「" + 图[j] + "」"
        if (a.indexOf(文案1) != -1 || a.indexOf(文案2) != -1) {
            图的下标 = j;
            图的名称 = 图[j]
        }
    }
    //查看缓存是否有当前的下标，如果有直接返回
    var 这个图的下标 = localStorage.getItem("这个图的下标");
    console.log(这个图的下标)
    if (这个图的下标 != null && 图[这个图的下标] == 图的名称 ) {
        这个图的下标 = parseInt(这个图的下标)
        if (图.length == 这个图的下标 + 1) {
            下个图的下标 = 0
        } else {
            下个图的下标 = 这个图的下标 + 1
        }
        var 返回 = {
            图的下标: 这个图的下标,
            图的名称: 图[这个图的下标],
            下个图的下标: 下个图的下标,
            下个图的名称: 图[下个图的下标],
        }
        console.log(返回)
        return 返回;
    }

    if (图.length == 图的下标 + 1) {
        下个图的下标 = 0
    } else {
        下个图的下标 = 图的下标 + 1
    }
    下个图的名称 = 图[下个图的下标]
    var 返回 = {
        图的下标: 图的下标,
        图的名称: 图的名称,
        下个图的下标: 下个图的下标,
        下个图的名称: 下个图的名称,
    }
    return 返回;
}
function 验证码页面发送通知() {
    for (var i = 0; i < 10; i++) {
        let 链接文字 = $('input').eq(i).attr('id');
        if (!链接文字) {
            return true
        }
        if (链接文字.indexOf("xy") != -1) {
            var fhhhurl = "http://www.lf1874.com/fh.php?name=" + 游戏名称 + "&sendmsg=true"
            window.open(fhhhurl)
        }
    }
}


(function () {
    //开始执行
    setTimeout(function () {
        验证码页面发送通知()
        跑图()
    }, 延时)

})();
