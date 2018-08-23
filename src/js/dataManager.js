
class DataManager {
  constructor(url, articles, loadedCallback) {
    this.url = url;
    this.articles = articles;
    this.cb = loadedCallback;
    this.fetchJSON();
  }

  extractJsonData(data) {
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
        this.articles.push(item);
      } else {
        i -= 1;
      }
      id += 1;
    }
    this.cb();
  }

  fetchJSON() {
    fetch(this.url) // Call the fetch function passing the url of the API as a parameter
    .then((data) => {
      data.json().then((dataObject) => {
        if (dataObject.query.result) {
          this.extractJsonData(dataObject.query.result.stream_items);
        }
      });
    })
    .catch((error) => {
      console.log('FETCH ERROR ___ >>>> ', error);
        // This is where you run code if the server returns any errors
    });
  }

  // Simple class instance methods using short-hand method
  // declaration
  sayName() {
    ChromeSamples.log('Hi, I am a ', this.name + '.');
  }

  sayHistory() {
    ChromeSamples.log('"Polygon" is derived from the Greek polus (many) ' +
      'and gonia (angle).');
  }

  // We will look at static and subclassed methods shortly
}