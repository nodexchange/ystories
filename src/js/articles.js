class Articles {
  constructor(articles, cube) {
    this.articlesArray = articles;
    this.cubeSides = cube.sides;
    this.articleId = 0;
    this.cubeMap = ['front', 'left', 'right', 'back'];
  }
  
  setupSliderArticles() {
    for (let i=0; i<this.articlesArray.length; i++) {
      this.articleTemplate(this.articlesArray[i], true);
    }
  }

  articleTemplate(article, active) {
    if (this.cubeMap[this.articleId] === undefined) {
      console.log('NOT FOUND>>>');
      return;
    }
    this.cubeSides[this.cubeMap[this.articleId]].style.background = 'url(' + article.image + ')';

    let titleHeader = document.createElement('h3');
    titleHeader.innerHTML = article.title;
    let paragraph = document.createElement('p');
    // paragraph.innerHTML = article.summary; // MARTIN--- DISABLED;
    this.cubeSides[this.cubeMap[this.articleId]].appendChild(titleHeader);
    this.cubeSides[this.cubeMap[this.articleId]].appendChild(paragraph);
    this.articleId++;
  }
}