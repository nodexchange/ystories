'use strict';

const articles = [];
let articlesClass = {};
let progressClass = {};
let sliderClass = {};
let cube = {};

function pageReadyHandler() {
  sliderClass = new Slider({nextButtonClass: 'next-screen', prevButtonClass: 'prev-screen', finishButtonClass: 'finish'});
  dataManagerClass = new DataManager('./sidekick.json', articles, dataLoadedHandler);
}

function dataLoadedHandler() {
  cube = new Cube();
  articlesClass = new Articles(articles, cube);
  articlesClass.setupSliderArticles();
  progressClass = new Progress(sliderClass);
  navigationClass = new Navigation(sliderClass, progressClass);
  console.log('LINKED>>> ');
  sliderClass.openModal();

  document.getElementsByClassName('Scene')[0].addEventListener("click", () => {
    document.querySelector('.Cube').classList.toggle('flipped');
  })
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

  // 


window.addEventListener('load', pageReadyHandler); // ADTECH load;
