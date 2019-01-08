/* global location $AD */

class DataManager {
  constructor(articles, loadedCallback, brandSafetyClass) {
    this.articles = articles;
    this.cb = loadedCallback;
    this.brandSafetyClass = brandSafetyClass;
    this.retryAttemps = 0;
    // this.fetchJSON();
    // this.fetchRSS();
    this.fetchXML('https://uk.style.yahoo.com/rss');
  }

  fetchXML(urlSrc) {
    let proto = 'https';
    if (typeof $AD.config.AdServer.proto !== 'undefined') {
      proto = $AD.config.AdServer.proto;
    }
    this.url = urlSrc;
    window.checkForTimeout();
    const script = document.createElement('script');
    script.src = proto + '://ads.pictela.net/a/proxy/text?url=' + encodeURIComponent('https://api.rss2json.com/v1/api.json?rss_url=' + this.url) + '&callback=externalDataFeedLoadHandler&ttl=30';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  fetchJSON() {
    // console.log(ONE.loadRemoteData);
    // console.log(ONE.adConfig);
    if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      // LIVE BUT FAULTY this.url = ONE.services.host.GET + 'a/proxy/text?url=' + this.url + '?ttl=30';
    } else {
      console.log('[LOCALHOST] DEBUG ON');
    }
    fetch(this.url) // Call the fetch function passing the url of the API as a parameter
    .then((data) => {
      data.json().then((dataObject) => {
        if (dataObject.query.results) {
          // console.log(dataObject.query.results.item);
          this.extractJsonData(dataObject.query.results.item, 'json');
        } else {
          this.retryAttemps ++;
          // console.log('FETCH ERROR', dataObject);
          if (this.retryAttemps < 5) {
            setTimeout(() => {
              this.fetchJSON();
            }, 1000);
          } else {
            this.defaultMessageRender();
            console.log('[JSON] FETCH Attempt Error', 'GIVE UP');
          }
        }
      });
    })
    .catch((error) => {
      this.defaultMessageRender();
      console.log('[JSON] FETCH ERROR ___ >>>> ', error);
        // This is where you run code if the server returns any errors
    });
  }

  fetchRSS() {
    if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
      this.url = $AD.config.AdServer.proto + '://ads.pictela.net/a/proxy/text?url=' + encodeURIComponent(this.url) + '&callback=externalDataFeedLoadHandler&ttl=30';
    } else {
      console.log('[LOCALHOST] RSS DEBUG ON');
    }
    // fetch(this.url, { mode:'no-cors'})
    //   .then(response => response.text())
    //   .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
    //   .then(str => console.log(str))

    // fetch(this.url, {
        // mode: 'no-cors' // no-cors, cors, *same-origi
    // })
    // .then(response => response.text())
    // .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    // .then(data => console.log(data));
    // fetch(this.url, {
    //   mode: 'no-cors' // no-cors, cors, *same-origi
    // }).then((results) => {
    //   // results returns XML. lets cast this to a string, then create
    //   // a new DOM object out of it!
    //   console.log(results);
    //   results
    //     .text()
    //     .then((str) => {
    //       let responseDoc = new DOMParser().parseFromString(str, 'application/xml');
    //       console.log(responseDoc);
    //       //return responseDoc.getElementsByTagName('zpid')[0].textContent;
    //     });
    //   });
  }

  extractJsonData(data, type) {
    let id = 0;
    for (let i = 0; i < 5; i++) {
      let item = {};
      item.link = data[id].link;
      if (this.brandSafetyClass.verify(data[id].title)) {
        item.title = data[id].title;
        let encodedString = data[id].description;
        if (type === 'json') {
          encodedString = data[id].content;
        }
        let elem = document.createElement('div');
        elem.innerHTML = encodedString;
        let images = elem.getElementsByTagName('img');
        for (let k = 0; k < images.length; k++) {
          let imgUrl = '';
          if (type !== 'json') {
            if (!item.image) {
              imgUrl = images[k].src.split('http:');
              item.image = 'https:' + imgUrl[2];
              if (!imgUrl[2]) {
                imgUrl = images[k].src.split('https:');
                item.image = 'https:' + imgUrl[2];
              }
            }
          } else {
            item.image = images[k].src;
          }
          // return;
        }
        this.articles.push(item);
      } else {
        i -= 1;
      }
      id += 1;
    }
    this.cb(true);
  }

  defaultMessageRender(failedLoad) {
    let item = {};
    item.link = 'https://uk.news.yahoo.com/';
    item.title = 'Yahoo! News - Get breaking news stories and in-depth coverage with videos and photos.';
    item.image = './default.jpg';
    if (!failedLoad) {
      $AD.event('Default Message');
    } else {
      $AD.event('Failed to load the feed');
    }
    // item.publisher = data[id].publisher;
    this.articles.push(item);
    this.cb(false);
  }
}
