'use strict';
/* global ONE $AD */

const articles = [];
let articlesClass = {};
let progressClass = {};
let footerClass = {};
let dataManagerClass = {};
let brandSafetyClass = {};
let sliderClass = {};

function pageReadyHandler() {
  let assetPath = $AD.config.Creative.assetPath;
  sliderClass = new Slider({ prevHandler: prevActionHandler, nextHandler: nextActionHandler });
  brandSafetyClass = new BrandSafety(assetPath + './brandsafety.txt', initateDataManager);
}

function initateDataManager() {
  dataManagerClass = new DataManager('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22https%3A%2F%2Fuk.style.yahoo.com%2Ftagged%2Fstyle%2Frss%22%20limit%2010&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', articles, dataLoadedHandler, brandSafetyClass);
  //RSS dataManagerClass = new DataManager('https://www.yahoo.com/news/rss', articles, dataLoadedHandler, brandSafetyClass);
}

function dataLoadedHandler(live) {
  articlesClass = new Articles(articles);
  try {
    articlesClass.setupSliderArticles();
  } catch (e) {
    console.log(e);
  }
  progressClass = new Progress(sliderClass);
  footerClass = new Footer(live);

  sliderClass.activateSlider();
}
function nextActionHandler() {
  progressClass.nextArrowHandler();
}
function prevActionHandler() {
  progressClass.prevArrowHandler();
}
if (!window.IEbackupExperienceActive) {
  window.onload = (() => {
    pageReadyHandler();
  });
}
