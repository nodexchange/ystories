/* global location $AD */

class DataManager {
  constructor(url, articles, loadedCallback, brandSafetyClass) {
    this.url = url;
    this.articles = articles;
    this.cb = loadedCallback;
    this.brandSafetyClass = brandSafetyClass;
    this.retryAttemps = 0;
    this.fetchJSON();
    // this.fetchRSS();
  }

  fetchJSON() {
    // console.log(ONE.loadRemoteData);
    // console.log(ONE.adConfig);
    if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
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
      // this.url = ONE.services.host.GET + 'a/proxy/text?url=' + this.url + '?ttl=30';
      // this.url = $AD.config.services.host.GET + 'a/proxy/text?url=' + this.url + '?ttl=30';
      this.url = $AD.config.AdServer.proto + '://ads.pictela.net/a/proxy/text?url=' + encodeURIComponent(this.url) + '&callback=externalDataFeedLoadHandler&ttl=30';
      
    } else {
      console.log('[LOCALHOST] RSS DEBUG ON');
    }
    console.log('___ HERE');
    console.log(this.url);
    fetch(this.url, { mode:'no-cors'})
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
      .then(str => console.log(str))

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
    for (let i = 0; i < 5; i ++) {
      let item = {};
      item.link = data[id].link;
      if (this.brandSafetyClass.verify(data[id].title)) {
        item.title = data[id].title;
        let encodedString = data[id].description;
        if (type === 'json') {
          encodedString = data[id].encoded;
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

  defaultMessageRender() {
    let item = {};
    item.link = 'https://www.yahoo.com/news/';
    item.title = 'Yahoo! News - Get breaking news stories and in-depth coverage with videos and photos.';
    item.image = './default.jpg';
    // item.publisher = data[id].publisher;
    this.articles.push(item);
    this.cb(false);
  }
}
