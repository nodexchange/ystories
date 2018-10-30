/* global location */

class DataManager {
  constructor(url, articles, loadedCallback, brandSafetyClass) {
    this.url = url;
    this.articles = articles;
    this.cb = loadedCallback;
    this.brandSafetyClass = brandSafetyClass;
    this.retryAttemps = 0;
    this.fetchJSON();
  }

  extractJsonData(data) {
    let id = 0;
    // TEST---
    // console.log(data);
    // data.splice(1, 0, { link: 'test', title: 'Cck in my garden' });
    // console.log(data);
    for (let i = 0; i < 5; i ++) {
      let item = {};
      // console.log(data[id]);
      /// UNDEFINED data means we are out of options
      item.link = data[id].link;
      if (this.brandSafetyClass.verify(data[id].title)) {
        // console.log('----SAFE----');
        item.title = data[id].title;
        let encodedString = data[id].encoded;
        let elem = document.createElement('div');
        elem.innerHTML = encodedString;
        let images = elem.getElementsByTagName('img');
        for (let k = 0; k < images.length; k++) {
          item.image = images[k].src;
        }
        // item.publisher = data[id].publisher;
        this.articles.push(item);
      } else {
        i -= 1;
      }
      id += 1;
    }
    this.cb(true);
  }

  fetchJSON() {
    // console.log(ONE.loadRemoteData);
    // console.log(ONE.adConfig);
    // console.log(this.url);
    if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
      this.url = ONE.services.host.GET + 'a/proxy/text?url=' + this.url + '?ttl=30';
    } else {
      console.log('[LOCALHOST] DEBUG ON');
    }
    fetch(this.url) // Call the fetch function passing the url of the API as a parameter
    .then((data) => {
      data.json().then((dataObject) => {
        if (dataObject.query.results) {
          // console.log(dataObject.query.results.item);
          this.extractJsonData(dataObject.query.results.item);
        } else {
          this.retryAttemps ++;
          // console.log('FETCH ERROR', dataObject);
          if (this.retryAttemps < 5) {
            setTimeout(() => {
              this.fetchJSON();
            }, 1000);
          } else {
            this.defaultMessageRender();
            console.log('FETCH Error', 'GIVE UP');
          }
        }
      });
    })
    .catch((error) => {
      console.log('FETCH ERROR ___ >>>> ', error);
        // This is where you run code if the server returns any errors
    });
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
