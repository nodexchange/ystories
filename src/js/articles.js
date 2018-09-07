class Articles {
  constructor(articles, cube) {
    this.articlesArray = articles;
    this.articleId = 0;
    this.swiperContainer = document.getElementsByClassName('swiper-wrapper')[0];
  }

  setupSliderArticles() {
    for (let i = 0; i < this.articlesArray.length; i++) {
      this.articleTemplate(this.articlesArray[i], true);
    }
  }

  articleTemplate(article, active) {
    // this.cubeSides[this.cubeMap[this.articleId]].style.background = 'url(' + article.image + ')';
    let swiperSlide = document.createElement('div');
    swiperSlide.className = 'swiper-slide';
    swiperSlide.id = 'slide' + this.articleId;
    let slideImageContainer = document.createElement('div');
    let slideTextContainer = document.createElement('div');
    let slideText = document.createElement('div');
    let titleHeader = document.createElement('h3');
    let paragraph = document.createElement('p');
    let readMore = document.createElement('p');
    slideImageContainer.className = 'slide-image';
    slideTextContainer.className = 'slide-text-container';
    slideText.className = 'slide-text';
    readMore.className = 'read-more';
    slideImageContainer.style.background = 'url(' + article.image + ') center';
    titleHeader.innerHTML = this.truncate.apply(article.title, [90, true]);
    titleHeader.dataset.link = article.link;
    readMore.innerHTML = 'Read more';
    slideText.appendChild(titleHeader);
    slideText.appendChild(paragraph);
    slideText.appendChild(readMore);
    slideTextContainer.appendChild(slideText);
    swiperSlide.appendChild(slideImageContainer);
    swiperSlide.appendChild(slideTextContainer);
    this.swiperContainer.appendChild(swiperSlide);
    this.articleId = this.articleId + 1;
  }

  truncate(n, useWordBoundary){
    if (this.length <= n) { return this; }
    var subString = this.substr(0, n-1);
    return (useWordBoundary
       ? subString.substr(0, subString.lastIndexOf(' '))
       : subString) + "&hellip;";
};
}
