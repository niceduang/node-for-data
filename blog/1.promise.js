const http = require("http");
const https = require('https');
const Promise = require("promise");
const cheerio = require("cheerio");

const URI = 'https://www.jianshu.com';
const url = URI + '/u/9d5bd9366003';

let arrArticles = [];
let arrResult = [];


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
}
const getArticle = html => {
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
	console.log(`loading:${Math.floor((iNow/arrArticles.length)*100)}%...`);
}
const initData = () => {
	if (iNow > arrArticles.length - 1) {
		console.log(arrResult);
		return;
	}
	let articleUrl = arrArticles[iNow];
	let promiseGetInfo = getInfo(articleUrl);
	promiseGetInfo.then(html => {
		getArticle(html);
		iNow++;
		initData(arrArticles);
	});
	return promiseGetInfo;
}


let promiseGetUser = getArrArticles(url);
let iNow = 0;
promiseGetUser
	.then(html => {
		formatItems(html);
		return arrArticles;
	}, error => {
		console.log(error);
	})
	.then((arr) => {
		initData();
	});