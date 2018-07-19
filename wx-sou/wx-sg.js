// 加载http模块
var http = require('http');
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
var cheerio = require('cheerio');

// 定义网络爬虫的目标地址：自如友家的主页
var url = 'http://weixin.sogou.com';

http
.get(url, function(res) {
    var html = '';
    // 获取页面数据
    res.on('data', function(data) {
        html += data;
    });
    // 数据获取结束
    res.on('end', function() {
        // 通过过滤页面信息获取实际需求的轮播图信息
        var slideListData = filterSlideList(html);
        // 打印信息
        printInfo(slideListData);
    });
})
.on('error', function() {
    console.log('获取数据出错！');
});

/* 过滤页面信息 */
function filterSlideList(html) {
    if (html) {
        // 沿用JQuery风格，定义$
        var $ = cheerio.load(html);
        // 根据id获取轮播图列表信息
        var slideList = $('.news-list-right');
        // 数据
        // var slideListData = [{
        //     "id":"0",
        //     "date":"07月14日",
        //     "author":"老王",
        //     "tit":"知乎热门：你有没有完成过一件不可能完成的事？",
        //     "link":"http://xxx.com",
        //     "pointer":"http://xxx.jpg"
        // }];
        var slideListData = [];

        /* 列表信息遍历 */
        var count = 0;
        slideList.each(function() {
            var $this = $(this);
            var $lis = $this.find('li');
            $lis.each(function() {
                var $this = $(this);
                var json = {
                    "id": ++count,
                    "date": $this.find('.p2 span').text(),
                    "author": $this.find('.p2 a').attr('title'),
                    "tit": $this.find('.p1 a').attr('title'),
                    "link": $this.find('.p1 a').attr('href').trim(),
                    "pointer": $this.find('.img-box img').attr('src').trim()
                }
                slideListData.push(json);
            });
        });
        // 返回轮播图列表信息
        return slideListData;
    } else {
        console.log('无数据传入！');
    }
}

/* 打印信息 */
function printInfo(slideListData) {
    console.log(slideListData);
    // 遍历信息列表
    slideListData.forEach(function(item,index) {
        // id
        var id = item.id;
        // 日期
        var date = item.date;
        // 作者
        var author = item.author;
        // 标题
        var tit = item.tit;
        // 链接地址
        var link = item.link;
        // 图片
        var pointer = item.pointer;
        // 打印信息
        console.log('\n');
        console.log(id+'|'+date+'|'+author+'|'+tit+'|'+link+'|'+pointer);
        console.log('\n');
    });
}

/**
 * 工具扩展
 */
String.prototype.trim = function(){
    return this.replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, "");
}