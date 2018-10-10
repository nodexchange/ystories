
class BrandSafety {
  constructor(url, loadCompleteHandler) {
    this.url = 'brandsafety.txt';
    this.keywordsArray = [];
    this.loadCompleteHandler = loadCompleteHandler;
    this.fetchData();
  }

  extractKeywords(data) {
    this.keywordsArray = data.split(',');
    // console.log(this.keywordsArray);
    this.loadCompleteHandler();
  }

  fetchData() {
    fetch(this.url) // Call the fetch function passing the url of the API as a parameter
    .then((data) => {
      data.text().then((dataObject) => {
        this.extractKeywords(dataObject);
      //   if (dataObject.query.results) {
      //     // console.log(dataObject.query.results.item);
      //     this.extractJsonData(dataObject.query.results.item);
      //   } else {
      //     console.log('FETCH ERROR', dataObject);
      //   }
      });
    })
    .catch((error) => {
      console.log('FETCH ERROR ___ >>>> ', error);
        // This is where you run code if the server returns any errors
    });
  }

  verify(sentence) {
    let message = sentence.split(' ');
    for (let i = 0; i < message.length; i++) {
      // console.log('test word: ' + message[i]);
      let containsBadWord = this.keywordsArray.some(function (word) {
          return new RegExp('\\b' + message[i].toLowerCase() + '\\b').test(word);
      });
  
      if (containsBadWord) {
          // console.log('[REJECTED] bad word found', message[i].toLowerCase());
          return false;
      }
    }
    return true;
  }
}
