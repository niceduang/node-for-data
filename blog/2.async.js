const http = require("http");
const https = require("https");
const Promise = require("promise");
const cheerio = require("cheerio");

// base url
const URI = 'https://www.jianshu.com';
// user id
const USER_ID = '9d5bd9366003';
// user id 对应主页
const url = URI + `/u/${USER_ID}`;

// 首页文章列表数值
let arrArticles = [];
// 所有文章详细信息
let arrResult = [];
// 遍历索引开始值
let iNow = 0;


const getArrArticles = url => {
	let promise = new Promise((resolve, reject) => {
		https
			.get(url, res => {
				let html = '';
				res.on('data', data => {
					html += data;
				});
				res.on('end', () => {
					resolve(html);
				});
			})
			.on('error', () => {
				reject('获取 user-home 数据出错！');
			});
	});
	return promise;
}

const formatItems = html => {
	if (!html) {
		return;
	}
	let $ = cheerio.load(html);
	let $lis = $('.note-list li');
	let arrLi = Array.prototype.slice.call($lis);
	arrLi.forEach((item, index) => {
		arrArticles.push(URI + $(item).find('.title').attr('href'));
	});
	return arrArticles;
}


const getInfo = url => {
	let promise = new Promise((resolve, reject) => {
		https
			.get(url, res => {
				let html = '';
				res.on('data', data => {
					html += data;
				});
				res.on('end', () => {
					resolve(html);
				});
			})
			.on('error', () => {
				reject('获取 user-article 数据出错！');
			});
	});
	return promise;
}


const formatData = html => {
	if (!html) {
		return;
	}
	let $ = cheerio.load(html);
	let $article = $('.article');
	let info = {
		"title": $article.find('.title').text(),
		"date": $article.find('.publish-time').text(),
		"view": $article.find('.views-count').text()
	}
	arrResult.push(info);
	console.log(`loading: ${Math.floor((iNow/arrArticles.length)*100)}% ...`);
}

const getData = async () => {
	let url_article = arrArticles[iNow];
	let html_article = await getInfo(url_article);
	formatData(html_article);
	if (iNow >= arrArticles.length - 1) {
		console.log(arrResult);
		return;
	}
	iNow++;
	getData();
}



const run = async () => {
	let html_user_home = await getArrArticles(url);
	let arr = formatItems(html_user_home);
	// console.log(arrArticles);
	// console.log(arr);
	getData();
}

run();