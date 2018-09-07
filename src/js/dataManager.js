
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
      console.log(data[id]);
      let item = {};
      item.link = data[id].link;
      item.title = data[id].title;
      let encodedString = data[id].encoded;
      let elem= document.createElement('div');
      elem.innerHTML = encodedString;
      let images = elem.getElementsByTagName('img');
      for(let k=0; k < images.length; k++){
        item.image = images[k].src;
        console.log(images[k].src);
      }
      // item.publisher = data[id].publisher;
      this.articles.push(item);
      id += 1;
    }
    this.cb();
  }

  fetchJSON() {
    fetch(this.url) // Call the fetch function passing the url of the API as a parameter
    .then((data) => {
      data.json().then((dataObject) => {
        if (dataObject.query.results) {
          // console.log(dataObject.query.results.item);
          this.extractJsonData(dataObject.query.results.item);
        } else {
          console.log('FETCH ERROR', dataObject);
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
