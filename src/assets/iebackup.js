// IE BACKUP Experience
if (navigator.userAgent.indexOf('MSIE') !== -1
  || navigator.appVersion.indexOf('Trident/') > 0) {
  // alert('BACKUP EXPERIENCE HERE');
  activeTheBackupExperience();
}

function activeTheBackupExperience() {
  window.IEbackupExperienceActive = true;
  // alert('ALIVE');
  var item = {};
  var mainContainer = document.getElementById('main-section');
  var backupSlideContainer = document.createElement('div');
  var swiperContainer = document.getElementsByClassName('swiper-container')[0];
  var slideImage = document.createElement('div');
  var slideTextContainer = document.createElement('div');
  var clickContainer = document.createElement('div');
  item.link = 'https://www.yahoo.com/news/';
  item.title = 'Yahoo! News<br/><br/>Get breaking news stories and in-depth coverage with videos and photos.';
  item.image = './default.jpg';
  swiperContainer.style.display = 'none';
  document.getElementById('navigation').style.display = 'none';
  backupSlideContainer.id = 'backup-ie-container';
  slideImage.className = 'slide-image';
  slideTextContainer.className = 'slide-text-container';
  slideImage.style.background = 'url(' + item.image + ')';
  slideTextContainer.innerHTML = '<h3>' + item.title + '</h3>';
  backupSlideContainer.appendChild(slideImage);
  backupSlideContainer.appendChild(slideTextContainer);
  mainContainer.appendChild(backupSlideContainer);

  clickContainer.id = 'clickContainer';
  clickContainer.backgroundColor = 'blue';
  clickContainer.addEventListener('click', function () {
    window.open('https://www.yahoo.com/news/', '_blank');
    $AD.click('FooterClickthrough', {
      overrides: {
        url: 'https://www.yahoo.com/news/'
      }
    });
  });
  document.body.appendChild(clickContainer);

}

// activeTheBackupExperience();