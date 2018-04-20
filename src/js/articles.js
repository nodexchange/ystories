class Articles {
  constructor(articles) {
    this.articlesArray = articles;
  }
  
  setupSliderArticles() {
    let screensContainer = document.getElementsByClassName('screens')[0];
    for (let i=0; i<this.articlesArray.length; i++) {
      let article;
      if (i === 0) {
        article = this.articleTemplate(this.articlesArray[i], true);
      } else {
        article = this.articleTemplate(this.articlesArray[i]);
      }
      screensContainer.appendChild(article);
    }
  }
  // setupslider(articles);

  articleTemplate(article, active) {
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
  }
}