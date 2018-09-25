'use strict';
/* global ONE */

const articles = [];
let articlesClass = {};
let progressClass = {};
let footerClass = {};
let dataManagerClass = {};
let sliderClass = {};

function pageReadyHandler() {
  sliderClass = new Slider({ prevHandler: prevActionHandler, nextHandler: nextActionHandler });
  dataManagerClass = new DataManager('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22https%3A%2F%2Fuk.style.yahoo.com%2Ftagged%2Fstyle%2Frss%22%20limit%205&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', articles, dataLoadedHandler);
}

function dataLoadedHandler() {
  articlesClass = new Articles(articles);
  try {
    articlesClass.setupSliderArticles();
  } catch (e) {
    console.log(e);
  }
  progressClass = new Progress(sliderClass);
  footerClass = new Footer();

  sliderClass.activateSlider();
}
function nextActionHandler() {
  progressClass.nextArrowHandler();
}
function prevActionHandler() {
  progressClass.prevArrowHandler();
}


  // url = 'http://iquery.finance.yahoo.com:4080/v1/finance/trending/CA?lang=en-CA&region=CA&count=30&ssl=true';
  // url = 'http://sidekick-yql.media.yahoo.com:4080/v1/sidekick?app=y20&blending_enabled=true&bucket=news-GB-en-GB-def&device=desktop&referer=www.yahoo.com&spaceid=1197793445&uuid=fa90e956-b0c2-363a-b7c8-55747eeb3c36&view=stream&wikiids=M55_motorway%2CTwitter%2CLancashire&ycts=&lang=en-GB&region=gb&site=news&exclude_uuids=&ssl=true';

  // $.ajax({
      // url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22AAPL%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=quote",
      // url: url,
      // dataType: "jsonp",
      // jsonp: "callback",
      // jsonpCallback: "quote"
  // });

ONE.ready(() => pageReadyHandler()); // ONE load;
