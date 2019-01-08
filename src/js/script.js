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
  dataManagerClass = new DataManager(articles, dataLoadedHandler, brandSafetyClass);
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
window.externalDataFeedLoadHandler = (data) => {
  this.dataLoaded = true;
  if (data.items.length > 0) {
    dataManagerClass.extractJsonData(data.items, 'json');
  } else {
    dataManagerClass.defaultMessageRender(true);
  }
};
window.checkForTimeout = () => {
  setTimeout(() => {
    if (!this.dataLoaded) {
      dataManagerClass.defaultMessageRender(true);
    }
  }, 3500);
};

if (!window.IEbackupExperienceActive) {
  window.onload = (() => {
    pageReadyHandler();
  });
}
