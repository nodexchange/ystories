'use strict';

/* global $,  */
let quote;
const articles = [];

function pageReadyHandler() {
  var walkthrough;
  var url;
  walkthrough = {
    index: 0,
    nextScreen: function () {
      if (this.index < this.indexMax()) {
        this.index += 1;
        this.updateScreen();
      }
    },
    prevScreen: function () {
      if (this.index > 0) {
        this.index -= 1;
        this.updateScreen();
      }
    },
    updateScreen: function () {
      this.reset();
      this.goTo(this.index);
      return this.setBtns();
    },
    setBtns: function () {
      var $lastBtn;
      var $nextBtn;
      var $prevBtn;
      $nextBtn = $('.next-screen');
      $prevBtn = $('.prev-screen');
      $lastBtn = $('.finish');
      if (walkthrough.index === walkthrough.indexMax()) {
        $nextBtn.prop('disabled', true);
        $prevBtn.prop('disabled', false);
        return $lastBtn.addClass('active').prop('disabled', false);
      } else if (walkthrough.index === 0) {
        $nextBtn.prop('disabled', false);
        $prevBtn.prop('disabled', true);
        return $lastBtn.removeClass('active').prop('disabled', true);
      }
      $nextBtn.prop('disabled', false);
      $prevBtn.prop('disabled', false);
      return $lastBtn.removeClass('active').prop('disabled', true);
    },
    goTo: function (index) {
      $('.screen').eq(index).addClass('active');
      return $('.dot').eq(index).addClass('active');
    },
    reset: function () {
      return $('.screen, .dot').removeClass('active');
    },
    indexMax: function () {
      return $('.screen').length - 1;
    },
    closeModal: function () {
      $('.walkthrough, .shade').removeClass('reveal');
      return setTimeout(() => {
        $('.walkthrough, .shade').removeClass('show');
        this.index = 0;
        return this.updateScreen();
      }, 200);
    },
    openModal: function () {
      $('.walkthrough, .shade').addClass('show');
      setTimeout((() => {
        return $('.walkthrough, .shade').addClass('reveal');
      }), 200);
      return this.updateScreen();
    }
  };
  $('.next-screen').click(function () {
    return walkthrough.nextScreen();
  });
  $('.prev-screen').click(function () {
    return walkthrough.prevScreen();
  });
  $('.close').click(function () {
    return walkthrough.closeModal();
  });
  $('.open-walkthrough').click(function () {
    return walkthrough.openModal();
  });
  
  function setupWalkthrough(articlesArray) {
    let screensContainer = document.getElementsByClassName('screens')[0];
    for (let i=0; i<articlesArray.length; i++) {
      let article;
      if (i === 0) {
        article = articleTemplate(articlesArray[i], true);
      } else {
        article = articleTemplate(articlesArray[i]);
      }
      screensContainer.appendChild(article);
    }
  }
  walkthrough.openModal();
  // url = 'http://iquery.finance.yahoo.com:4080/v1/finance/trending/CA?lang=en-CA&region=CA&count=30&ssl=true';
  // url = 'http://sidekick-yql.media.yahoo.com:4080/v1/sidekick?app=y20&blending_enabled=true&bucket=news-GB-en-GB-def&device=desktop&referer=www.yahoo.com&spaceid=1197793445&uuid=fa90e956-b0c2-363a-b7c8-55747eeb3c36&view=stream&wikiids=M55_motorway%2CTwitter%2CLancashire&ycts=&lang=en-GB&region=gb&site=news&exclude_uuids=&ssl=true';

  // $.ajax({
      // url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22AAPL%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=quote",
      // url: url,
      // dataType: "jsonp",
      // jsonp: "callback",
      // jsonpCallback: "quote"
  // });

  function extractJsonData(data) {
    let id = 0;
    for (let i=0; i<5; i++) {
      if (data[id].type === 'article') {
        let item = {};
        item.link = data[id].link;
        if (data[id].summary.length > 180) {
          item.summary = data[id].summary.substring(0, 180) + '(...)';
        } else {
          item.summary = data[id].summary;
        }
        item.title = data[id].title;
        item.publisher = data[id].publisher;
        if (data[id].image_assets) {
          if (data[id].image_assets[0].url) {
            item.image = data[id].image_assets[0].url;
          }
        }
        articles.push(item);
      } else {
        i -= 1;
      }
      // console.log(data[i]); // type article // image_assets[0].url // link // summary // title // publisher?
      id += 1;
    }
    setupWalkthrough(articles);
  }

  $.getJSON('./sidekick.json', function (data) {
    if (data.query.result) {
      // console.log('___ HERE', data.query.result.stream_items);
      extractJsonData(data.query.result.stream_items);
    }
  });

  let polygon = new Polygon(300, 500);
  console.log(' >>>> ' + Polygon);

  function articleTemplate(article, active) {
    // figure.style.transformOrigin = `50% 50% ${-apothem}px`;
    let screenItem = document.createElement('li');
    screenItem.className = 'screen';
    if (active) {
      screenItem.className = 'screen active';
    }

    let media = document.createElement('div');
    media.className = 'media logo';
    
    let mediaImg = document.createElement('img');
    mediaImg.className = 'logo';
    mediaImg.src = article.image;

    let titleHeader = document.createElement('h3');
    titleHeader.innerHTML = article.title;
    let paragraph = document.createElement('p');
    paragraph.innerHTML = article.summary;
    
    media.appendChild(mediaImg)
    screenItem.appendChild(media);
    screenItem.appendChild(titleHeader);
    screenItem.appendChild(paragraph);

    return screenItem;

    // <li class='screen active'>
    //         <div class='media logo'>
    //           <img class='logo' src='https://s3.amazonaws.com/jebbles-codepen/icon.png'>
    //         </div>
    //         <h3>
    //           Product Intro
    //           <br>Walkthrough</br>
    //         </h3>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    //           magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
    //       </li>
  }



  // Optionally use arrow keys to navigate walkthrough
  $(document).keydown(function (e) {
    switch (e.which) {
      case 37:
        // left
        walkthrough.prevScreen();
        break;
      case 38:
        // up
        walkthrough.openModal();
        break;
      case 39:
        // right
        walkthrough.nextScreen();
        break;
      case 40:
        // down
        walkthrough.closeModal();
        break;
      default:
        return;
    }
    e.preventDefault();
  });
}

quote = function(data) {
  // $(".price").text("$" + data.query.results.quote.AskRealtime);
  // console.log('HERE', data);
};

window.addEventListener('load', pageReadyHandler);
