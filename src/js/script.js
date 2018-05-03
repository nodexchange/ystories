'use strict';

const articles = [];
let articlesClass = {};
let progressClass = {};
let sliderClass = {};
let cube = {};

function pageReadyHandler() {
  sliderClass = new Slider({nextButtonClass: 'next-screen', prevButtonClass: 'prev-screen', finishButtonClass: 'finish'});
  dataManagerClass = new DataManager('./sidekick.json', articles, dataLoadedHandler);
}

function dataLoadedHandler() {
  cube = new Cube();
  articlesClass = new Articles(articles, cube);
  articlesClass.setupSliderArticles();
  progressClass = new Progress(sliderClass);
  navigationClass = new Navigation(sliderClass, progressClass);
  console.log('LINKED>>> ');
  sliderClass.openModal();

  document.getElementsByClassName('Scene')[0].addEventListener("click", () => {
    document.querySelector('.Cube').classList.toggle('flipped');
  })
}


  // url = 'http://iquery.finance.yahoo.com:4080/v1/finance/trending/CA?lang=en-CA&region=CA&count=30&ssl=true';
  // url = 'http://sidekick-yql.media.yahoo.com:4080/v1/sidekick?app=y20&blending_enabled=true&bucket=news-GB-en-GB-def&device=desktop&referer=www.yahoo.com&spaceid=1197793445&uuid=fa90e956-b0c2-363a-b7c8-55747eeb3c36&view=stream&wikiids=M55_motorway%2CTwitter%2CLancashire&ycts=&lang=en-GB&region=gb&site=news&exclude_uuids=&ssl=true';

  // $.ajax({
      // url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22AAPL%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=quote",
      // url: url,
      // dataType: "jsonp",
      // jsonp: "callback",
      // jsonpCallback: "quote"
  // });

  // 


window.addEventListener('load', pageReadyHandler); // ADTECH load;

// JavaScript Document
ADTECH.ready(function(){
  var xPos, xPosTouch, bannerJumpUrl;

  var shakeTimer=0;
  CubeAd = {

    isActive : false,
    styleUniqueId: "_swipeCubeAd", //keep this in sync with ad.css otherwise styling issues might occur
    settings: {},
    elements: {},
    images: {},
    init: function(runtime_settings) {
      this.settings = runtime_settings;

      this.settings.display_size = runtime_settings.display_size?runtime_settings.display_size:300;

      //check for retina and compute width/heights
      if(this.settings.retina) {
          this.settings.teaser_height = this.settings.teaser_height/2;
          this.settings.teaser_width = this.settings.teaser_width /2;

          this.settings.teaser_full_width = this.settings.size /2;
          this.settings.teaser_full_height = this.settings.size /2;

          this.settings.flip_full_size = this.settings.size /2;

      } else {
          this.settings.teaser_full_width = this.settings.size;
          this.settings.teaser_full_height = this.settings.size;
          this.settings.flip_full_size = this.settings.size;

      }

      this.settings.el_teaser_id = runtime_settings.teaser_id;
      this.settings.el_teaser_in_id = "teaser_img";
      this.settings.el_teaser_img_id = "teaser_img";
      this.settings.el_flip_id = "flip";
      this.settings.el_banner_flip_id = "hexaflip-demo4";
      this.settings.el_overlay_id = "overlay";
      this.settings.el_teaser_full_id = "teaser_full";
      this.settings.el_teaser_image_element_id = "teaser_image_element";

      this.create();
      this.cacheImages();

    },
    create: function() {

      //populate banner div with html
      this.elements.teaser = document.getElementById(this.settings.el_teaser_id);

      var teaserInnerHtml = ''
        +'<div id="'+this.settings.el_teaser_in_id+'" class="teaser_in" >'
          +'<div id="'+this.settings.el_teaser_img_id+'" class="teaser_img" >'
            +'<div id="'+this.settings.el_teaser_full_id+'" class="teaser_full" style="overflow:hidden;position:absolute;display: none;" >'
            +'</div>'
          +'</div>'
        +'</div>';

      this.elements.teaser.innerHTML = teaserInnerHtml;

      //create elements
      this.elements.bannerElement = document.createElement('div');
      this.elements.bannerElement.setAttribute('id', this.settings.el_flip_id);
      this.elements.bannerElement.style.display= "none";

      this.elements.bannerFlipElement = document.createElement('div');
      this.elements.bannerFlipElement.setAttribute('id', this.settings.el_banner_flip_id);
      this.elements.bannerFlipElement.setAttribute('class', "demo");
      this.elements.bannerElement.appendChild(this.elements.bannerFlipElement);

      this.elements.teaser.appendChild(this.elements.bannerElement);

      this.elements.teaserFullElement = document.getElementById(this.settings.el_teaser_full_id);

      this.images = [
        this.settings.imageFront,
        this.settings.imageRight,
        this.settings.imageBack,
        this.settings.imageLeft
      ];

      this.elements.hexaDemo4 = new HexaFlip(document.getElementById(this.settings.el_banner_flip_id),
      {
        set: this.images},
        {
          size: this.settings.display_size,
          horizontalFlip: true
      });

      //set clicks
      self = this;


      //fix for touch devices
      this.elements.bannerElement.addEventListener("mousemove", function(e){
        xPos = e.pageX;
      });
      this.elements.bannerElement.addEventListener("touchstart", function(e){
        xPosTouch = e.touches[0].pageX;
        xPos = e.touches[0].pageX;
      });
      this.elements.bannerElement.addEventListener("touchmove", function(e){
        xPos = e.touches[0].pageX;
      });

      self.isActive=true;
      self.executeFirst();

    },

    cacheImages: function() {
      var img1 = new Image();
      var img2 = new Image();
      var img3 = new Image();
      var img4 = new Image();

      img1.src = this.images[0];
      img2.src = this.images[1];
      img3.src = this.images[2];
      img4.src = this.images[3];

    },

    executeFirst: function(e) {

      self = this;

      if(this.settings.position == "middle") {
        this.executeMiddle(null);
        window.onresize = function(){
          if(self.isActive) {
            self.positionMiddle();
          }
        };

      } else if(self.settings.position == "inline") {
        self.executeInline(null);
      }

    },

    positionInline : function() {
      this.elements.teaser.style.height = "0px";
      this.elements.teaser.style.position = "absolute";
      this.elements.teaser.style.left = "50%";
      this.elements.teaser.style['margin-left'] = "-150px";
      this.elements.teaser.style.width = (this.settings.display_size)+"px";
      this.elements.teaser.style.overflow ="hidden";

      var initTop = this.elements.teaserFullElement.getBoundingClientRect().top;

      this.elements.teaser.classList.add('foldIn'+CubeAd.styleUniqueId);
      this.elements.teaser.addEventListener( 'webkitTransitionEnd',
        function( event ) {
          this.style.overflow="inherit";
        }, false );
      //Firefox fix
      this.elements.teaser.addEventListener( 'transitionend',
          function( event ) {
            this.style.overflow="inherit";
          }, false );
      //Opera fix
      this.elements.teaser.addEventListener( 'oTransitionEnd',
              function( event ) {
                this.style.overflow="inherit";
              }, false );

      this.elements.teaser.style.height = (this.settings.display_size_height+25)+"px";

      var spacerElement = document.getElementById("spacer_swipeCubeAd");
      spacerElement.style.height = (this.settings.display_size_height)+"px";

      this.elements.bannerElement.style.display = "block";

      this.elements.bannerElement.style.width = this.settings.display_size+"px";
      var teaserImgEl = document.getElementById(this.settings.el_teaser_id);
      var box = this.elements.teaser.getBoundingClientRect();
      var topDelta = box.top - ((this.settings.display_size/2) - (this.elements.teaser.offsetHeight/2));
      var leftDelta = box.left ;

      //make sure it stays on the screen
      if(topDelta<0) topDelta = 5;
      if(leftDelta<0) leftDelta = 0;

      if(topDelta>(document.documentElement.clientHeight-this.settings.display_size)) {
        topDelta = document.documentElement.clientHeight - this.settings.display_size;
        //console.log("topDelta corrected:"+topDelta);
      }

      if(leftDelta>(document.documentElement.clientWidth-this.settings.display_size)) {
        leftDelta = document.documentElement.clientWidth - this.settings.display_size-10;
        //console.log("leftDelta corrected:"+leftDelta);
      }

      this.elements.bannerElement.style.top =  "23px";
      this.elements.bannerElement.style.left =  "-1px";
      this.elements.bannerElement.style.position = "relative";

      var nextHighestZindex = this.getNextHighestZindex();
      this.elements.bannerFlipElement.style.zIndex = nextHighestZindex;
      this.elements.bannerFlipElement.style.position = "relative";
      this.elements.bannerFlipElement.style.top = "-24px";

      //now position close button
      // this.elements.closeBtnElement.style.zIndex = this.getNextHighestZindex();
    },

    executeInline: function(e) {
      if(e) e.preventDefault();
      this.positionInline();

    },

    get_window_size:function() {
      var winW = 630, winH = 460;
      if (document.body && document.body.offsetWidth) {
       winW = document.body.offsetWidth;
       winH = document.body.offsetHeight;
      }
      if (document.compatMode=='CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth ) {
       winW = document.documentElement.offsetWidth;
       winH = document.documentElement.offsetHeight;
      }
      if (window.innerWidth && window.innerHeight) {
       winW = window.innerWidth;
       winH = window.innerHeight;
      }
      return {width:winW, height:winH}
    },

    getNextHighestZindex: function(obj){
       var highestIndex = 0;
       var currentIndex = 0;
       var elArray = Array();
       if(obj){ elArray = obj.getElementsByTagName('*'); }else{ elArray = document.getElementsByTagName('*'); }
       for(var i=0; i < elArray.length; i++){
        if (elArray[i].currentStyle){
         currentIndex = parseFloat(elArray[i].currentStyle['zIndex']);
        }else if(window.getComputedStyle){
         currentIndex = parseFloat(document.defaultView.getComputedStyle(elArray[i],null).getPropertyValue('z-index'));
        }
        if(!isNaN(currentIndex) && currentIndex > highestIndex){ highestIndex = currentIndex; }
       }
       return(highestIndex+1);
    },

  };


  // don't edit below this addEventListener
  (function() {

    var dragging = false;
    var baseName, className, css, cssClass, defaults, faceNames, faceSequence, prefixList, prefixProp, prop, urlRx, _i, _len, _ref, _ref1;
    baseName = 'hexaFlip';

    className = baseName[0].toUpperCase() + baseName.slice(1);

    prefixList = ['webkit', 'Moz', 'O', 'ms'];

    prefixProp = function(prop) {
      var prefix, prefixed, _i, _len;

      if (document.body.style[prop.toLowerCase()] != null) {
        return prop.toLowerCase();
      }
      for (_i = 0, _len = prefixList.length; _i < _len; _i++) {
        prefix = prefixList[_i];
        prefixed = prefix + prop;
        if (document.body.style[prefixed] != null) {
          return prefixed;
        }
      }
      return false;
    };

    css = {};

    _ref = ['Transform', 'Perspective'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      prop = _ref[_i];
      css[prop.toLowerCase()] = prefixProp(prop);
    }

    defaults = {
      size: 300,
      margin: 10,
      fontSize: 100,
      perspective: 1000,
      touchSensitivity: 0.5,
      horizontalFlip: true
    };

    cssClass = baseName.toLowerCase();

    faceNames = ['front', 'bottom', 'back', 'top', 'left', 'right'];

    faceSequence = faceNames.slice(0, 4);

    urlRx = /^((((https?)|(file)):)?\/\/)|(data:)|(\.\.?\/)/i;

    window.HexaFlip = (function() {
      function HexaFlip(el, sets, options) {
        var cube, cubeFragment, fn, i, key, midPoint, option, set, setsKeys, setsLength, type, val, value, z, _fn, _j, _len1, _ref1, _ref2, _ref3,
          _this = this;

        this.el = el;
        this.sets = sets;
        this.options = options != null ? options : {};
        if (!(css.transform && this.el)) {
          return;
        }
        for (option in defaults) {
          value = defaults[option];
          this[option] = (_ref1 = this.options[option]) != null ? _ref1 : defaults[option];
        }
        if (typeof this.fontSize === 'number') {
          this.fontSize += 'px';
        }
        if (!this.sets) {
          this.el.classList.add(cssClass + '-timepicker');
          this.sets = {
            hour: (function() {
              var _j, _results;

              _results = [];
              for (i = _j = 1; _j <= 12; i = ++_j) {
                _results.push(i + '');
              }
              return _results;
            })(),
            minute: (function() {
              var _j, _results;

              _results = [];
              for (i = _j = 0; _j <= 5; i = ++_j) {
                _results.push(i + '0');
              }
              return _results;
            })(),
            meridian: ['am', 'pm']
          };
        }
        setsKeys = Object.keys(this.sets);
        setsLength = setsKeys.length;
        cubeFragment = document.createDocumentFragment();
        i = z = 0;
        midPoint = setsLength / 2 + 1;
        this.cubes = {};
        _ref2 = this.sets;
        for (key in _ref2) {
          set = _ref2[key];
          cube = this.cubes[key] = this._createCube(key);
          if (++i < midPoint) {
            z++;
          } else {
            z--;
          }
          cube.el.style.zIndex = z;
          this._setContent(cube.front, set[0]);
          this._setContent(cube.back, set[2]);
          cubeFragment.appendChild(cube.el);
          for (_j = 0, _len1 = set.length; _j < _len1; _j++) {
            val = set[_j];
            if (urlRx.test(val)) {
              (new Image).src = val;
            }
          }
        }
        this.cubes[setsKeys[0]].el.style.marginLeft = '0';
        this.cubes[setsKeys[setsKeys.length - 1]].el.style.marginRight = '0';
        this.el.classList.add(cssClass);
        this.el.style.height = this.size + 'px';
        this.el.style.width = ((this.size + this.margin * 2) * setsLength) - this.margin * 2 + 'px';
        this.el.style[css.perspective] = this.perspective + 'px';
        this.el.appendChild(cubeFragment);
        this.eProp = this.horizontalFlip ? 'pageX' : 'pageY';
        if (this.domEvents) {
          _ref3 = this.domEvents;
          _fn = function(fn) {
            return _this.el.addEventListener(type, function(e) {
              var target;

              target = e.target;
              if (target.classList.contains("" + cssClass + "-side")) {
                return fn.call(_this, e, target, target.parentNode.parentNode);
              }
            }, false);
          };
          for (type in _ref3) {
            fn = _ref3[type];
            _fn(fn);
          }
          this.domEvents = null;
        }
      }

      HexaFlip.prototype._createCube = function(set) {

        var cube, eString, eventPair, eventPairs, mouseLeaveSupport, rotation, side, sideProto, _fn, _j, _k, _l, _len1, _len2, _len3,
          _this = this;

        cube = {
          set: set,
          offset: 0,
          start: 0,
          delta: 0,
          last: 0,
          el: document.createElement('div'),
          holder: document.createElement('div')
        };
        cube.el.className = "" + cssClass + "-cube"+CubeAd.styleUniqueId+" " + cssClass + "-cube-" + set;
        cube.el.style.margin = "0 " + this.margin + "px";
        cube.el.style.width = cube.holder.style.width = this.size + 'px';
        cube.el.style.height = cube.holder.style.height = 250 + 'px';
        cube.holder.style[css.transform] = this._getTransform(0);
        sideProto = document.createElement('div');
        sideProto.classList.add(cssClass + '-side');
        for (_j = 0, _len1 = faceNames.length; _j < _len1; _j++) {
          side = faceNames[_j];
          cube[side] = sideProto.cloneNode(false);
          cube[side].classList.add("" + cssClass + "-side-" + side);
          cube[side].setAttribute('id', 'tbr_' + side);
          rotation = (function() {
            switch (side) {
              case 'front':
                return '';
              case 'back':
                return 'rotateX(180deg)';
              case 'top':
                return 'rotateX(90deg)';
              case 'bottom':
                return 'rotateX(-90deg)';
              case 'left':
                return 'rotateY(-90deg)';
              case 'right':
                return 'rotateY(90deg)';
            }
          })();

          translate3dValue = (function() {

          })();

          cube[side].style[css.transform] = ("" + rotation + " translate3d(0, 0, " + (this.size / 2) + "px)") + (this.horizontalFlip ? 'rotateZ(90deg)' : '');
          cube[side].style.fontSize = this.fontSize;
          if(side=='left' || side=='right') cube[side].style.display="none";
          cube.holder.appendChild(cube[side]);
        }
        cube.el.appendChild(cube.holder);
        eventPairs = [['TouchStart', 'MouseDown'], ['TouchMove', 'MouseMove'], ['TouchEnd', 'MouseUp'], ['TouchLeave', 'MouseLeave']];
        //eventPairs = [['TouchStart'], ['TouchMove'], ['TouchEnd'], ['TouchLeave']];
        mouseLeaveSupport = 'onmouseleave' in window;
        for (_k = 0, _len2 = eventPairs.length; _k < _len2; _k++) {
          eventPair = eventPairs[_k];
          _fn = function(fn, cube) {
            if (!((eString === 'TouchLeave' || eString === 'MouseLeave') && !mouseLeaveSupport)) {
              return cube.el.addEventListener(eString.toLowerCase(), (function(e) {
                return _this[fn](e, cube);
              }), true);
            } else {

              return cube.el.addEventListener('mouseout', (function(e) {
                return _this._onMouseOut(e, cube);
              }), true);
            }
          };
          for (_l = 0, _len3 = eventPair.length; _l < _len3; _l++) {
            eString = eventPair[_l];
            _fn('_on' + eventPair[0], cube);
          }
        }
        this._setSides(cube);

        t= this;

        cube.holder.style[css.transform] = this._getTransform(20);

        window.onscroll = function (oEvent) {
          if(initAniScroll)return;

          CheckXPos(0);
        }
        CheckXPos(3);

        function CheckXPos(delay){
          var contentPos = document.getElementById("swipeCubeAd").getBoundingClientRect().top;
          if(contentPos<window.innerHeight-(window.innerHeight/6)){
            initAniScroll = true;
            t._startAnimations(cube,delay);
          }
        }

        return cube;
      };
      var t;
      var initAniScroll = false;
      HexaFlip.prototype._getTransform = function(deg, status) {
        if (status == 'finished') {
          return (this.horizontalFlip ? 'rotateZ(-90deg)' : '') + (" translateZ(-" + (this.size / 2) + "px) rotateX(" + deg + "deg)");
        } else if (status == 'zoom' || status =='shaker') {
          return (this.horizontalFlip ? 'rotateZ(-90deg)' : '') + (" translateZ(-" + (this.size / 2) + "px) rotateX(" + deg + "deg)");
        }
        return (this.horizontalFlip ? 'rotateZ(-90deg)' : '') + (" translateZ(-" + (this.size / 1.5 ) + "px) rotateX(" + deg + "deg)");
      };
      HexaFlip.prototype._resetTransform = function() {
        // return ("rotateZ(-90deg) translateZ(-150px) rotateX(0deg)");
        return ("rotateZ(-90deg) translateZ(0px) rotateX(0deg)");
      };
      var sideLoaded=0;
      HexaFlip.prototype._setContent = function(el, content) {
        var key, style, val, value;

        if(sideLoaded >4) return;

        if (!(el && content)) {
          return;
        }
        if (typeof content === 'object') {
          style = content.style, value = content.value;
          for (key in style) {
            val = style[key];
            el.style[key] = val;
          }
        } else {
          value = content;
        }
        el.innerHTML = '';
        sideLoaded ++;
        return el.style.backgroundImage = "url(" + value + ")";

      };

      HexaFlip.prototype._setSides = function(cube) {
        var bottomAdj, faceOffset, offset, set, setLength, setOffset, topAdj;

        cube.holder.style[css.transform] = this._getTransform(cube.delta);
        cube.offset = offset = Math.floor(cube.delta / 90);
        if (offset === cube.lastOffset) {
          return;
        }
        cube.lastOffset = faceOffset = setOffset = offset;
        set = this.sets[cube.set];
        setLength = set.length;
        if (offset < 0) {
          faceOffset = setOffset = ++offset;
          if (offset < 0) {
            if (-offset > setLength) {
              setOffset = setLength - -offset % setLength;
              if (setOffset === setLength) {
                setOffset = 0;
              }
            } else {
              setOffset = setLength + offset;
            }
            if (-offset > 4) {
              faceOffset = 4 - -offset % 4;
              if (faceOffset === 4) {
                faceOffset = 0;
              }
            } else {
              faceOffset = 4 + offset;
            }
          }
        }
        if (setOffset >= setLength) {
          setOffset %= setLength;
        }
        if (faceOffset >= 4) {
          faceOffset %= 4;
        }
        topAdj = faceOffset - 1;
        bottomAdj = faceOffset + 1;
        if (topAdj === -1) {
          topAdj = 3;
        }
        if (bottomAdj === 4) {
          bottomAdj = 0;
        }
        this._setContent(cube[faceSequence[topAdj]], set[setOffset - 1] || set[setLength - 1]);
        return this._setContent(cube[faceSequence[bottomAdj]], set[setOffset + 1] || set[0]);
      };
      var initAni = true;
      HexaFlip.prototype._startAnimations = function(cube, delay) {
        var myCube = this;
        console.log('HERE >>>');
        cube.holder.style[css.transform] = myCube._getTransform(0, 'finished');
        animateSwipeIcon();
        function animateSwipeIcon() {
          var swipeIcon = document.getElementById('swipe_icon');
          swipeIcon.style.display = 'block';
          setTimeout(function() {
            swipeIcon.style.opacity = 1;
            swipeIcon.style.left = '50%';
          }, 2600);

          setTimeout(function() {
            swipeIcon.style.opacity = 0;
            swipeIcon.style.left = '120%';
          }, 7100);

          setTimeout(function() {
            swipeIcon.style.left = '0%';
            swipeIcon.style.display = 'none';
          }, 8100);
        }
      };
      var swipeTrack;
      var swipeTrackTimer =0;
      var spinTimeTolerance = 7;
      var spinDiffTolerance = 90;

      var timeSwipe =0;

      HexaFlip.prototype._onTouchStart = function(e, cube) {
        //console.log('TouchStart');
        timeSwipe =0;
        swipeTrackTimer = 0;
        swipeTrack = setInterval(function(){OnSwipe(cube)},20);
        function OnSwipe(cube){
          swipeTrackTimer++;
          if(swipeTrackTimer>spinTimeTolerance+1) clearInterval(swipeTrack);
        }
        initAni = false;
        //e.preventDefault();
        cube.touchStarted = true;
        cube.holder.classList.add('no-tween');

        if (e.type === 'mousedown') {
          return cube.start = e[this.eProp];
        } else {
          return cube.start = e.touches[0][this.eProp];
        }

      };

      HexaFlip.prototype._onTouchMove = function(e, cube) {
        timeSwipe ++;
        shakeTimer =0;
        if (!cube.touchStarted) {
          return;
        }
        dragging = true;

        if(e.type == "mousedown")
          cube.diff = (e[this.eProp] - cube.start) * this.touchSensitivity;
        else
          cube.diff = (xPos - cube.start) * this.touchSensitivity;

        cube.delta = cube.last - cube.diff;

        //console.log(cube.last,cube.diff,cube.delta);

        return this._setSides(cube);
      };
      HexaFlip.prototype._onTouchEnd = function(e, cube) {
        //console.log('TouchEnd');
        var speed = (cube.delta-cube.last)/timeSwipe;

        var mod;

        cube.touchStarted = false;
        mod = cube.delta % 90;
        var range = (cube.delta-cube.last);
        if ((range < 45 && range > 20) || (range > -45 && range < -22)) {
          if (speed > 0) {
            cube.last = cube.delta + (90 + mod);
            //cube.last = cube.delta - (90 - mod);
          } else {
            cube.last = cube.delta - (90 - mod);
          }

        } else {
          if (mod < 45) {
            cube.last = cube.delta + mod;
          } else {
            if (cube.delta > 0) {
              cube.last = cube.delta + mod;
            } else {
              cube.last = cube.delta - (90 - mod);
            }
          }
        }

        if (cube.last % 50 !== 0) {
          cube.last -= cube.last % 90;
        }
        cube.holder.classList.remove('no-tween');
        if(dragging==false || speed.toString().indexOf('Infinity')!=-1 || speed==0){
          var _cube = cube;
          var tbrVorne = document.getElementById('tbr_front');
          tbrVorne.onclick = function(){
            var speed = (_cube.delta-_cube.last)/timeSwipe;
            if (speed.toString().indexOf('Infinity')!=-1 || isNaN(speed)) {
              ADTECH.click("Side 1 Clickthrough","http://www.blick.ch");
            }
          };

          var tbrHinten = document.getElementById('tbr_back');
          tbrHinten.onclick = function(){
            var speed = (_cube.delta-_cube.last)/timeSwipe;
            if (speed.toString().indexOf('Infinity')!=-1) {
              ADTECH.click("Side 2 Clickthrough","http://www.boleromagazin.ch");
            }
          };

          var tbrLinks = document.getElementById('tbr_top');
          tbrLinks.onclick = function(){
            var speed = (_cube.delta-_cube.last)/timeSwipe;
            if (speed.toString().indexOf('Infinity')!=-1) {
              ADTECH.click("Side 3 Clickthrough","http://www.glueckspost.ch");
            }
          };

          var tbrRechts = document.getElementById('tbr_bottom');
          tbrRechts.onclick = function(){
            var speed = (_cube.delta-_cube.last)/timeSwipe;
            if (speed.toString().indexOf('Infinity')!=-1) {
              ADTECH.click("Side 4 Clickthrough","http://www.schweizer-illustrierte.ch");
            }
          };
          speed=0;
        }
        dragging = false;
        if(speed>11){
          cube.last += 360;
        }
        if(speed<-11){
          cube.last -= 360;
        }

        return cube.holder.style[css.transform] = this._getTransform(cube.last, 'zoom');
      };

      HexaFlip.prototype._onTouchLeave = function(e, cube) {
        return this._onTouchMove(e, cube);
      };

      /*HexaFlip.prototype._onMouseOut = function(e, cube) {
        if (!cube.touchStarted) {
          return;
        }
        if (e.toElement && !cube.el.contains(e.toElement)) {
          return this._onTouchEnd(e, cube);
        }
      };*/

      HexaFlip.prototype.setValue = function(settings) {
        var cube, index, key, value;

        for (key in settings) {
          value = settings[key];
          if (!(this.sets[key] && !this.cubes[key].touchStarted)) {
            continue;
          }
          value = value.toString();
          cube = this.cubes[key];
          index = this.sets[key].indexOf(value);
          cube.delta = cube.last = 90 * index;
          this._setSides(cube);
          this._setContent(cube[faceSequence[index % 4]], value);
        }
        return this;
      };

      HexaFlip.prototype.getValue = function() {
        var cube, offset, set, setLength, _ref1, _results;

        _ref1 = this.cubes;
        _results = [];
        for (set in _ref1) {
          cube = _ref1[set];
          set = this.sets[set];
          setLength = set.length;
          offset = cube.last / 90;
          if (offset < 0) {
            if (-offset > setLength) {
              offset = setLength - -offset % setLength;
              if (offset === setLength) {
                offset = 0;
              }
            } else {
              offset = setLength + offset;
            }
          }
          if (offset >= setLength) {
            offset %= setLength;
          }
          if (typeof set[offset] === 'object') {
            _results.push(set[offset].value);
          } else {
            _results.push(set[offset]);
          }
        }
        return _results;
      };

      HexaFlip.prototype.flip = function(back) {
        var cube, delta, set, _ref1;

        delta = back ? -90 : 90;
        _ref1 = this.cubes;
        for (set in _ref1) {
          cube = _ref1[set];
          if (cube.touchStarted) {
            continue;
          }
          cube.delta = cube.last += delta;
          this._setSides(cube);
        }
        return this;
      };

      HexaFlip.prototype.flipBack = function() {
        return this.flip(true);
      };

      return HexaFlip;

    })();

    if ((window.jQuery != null) || (((_ref1 = window.$) != null ? _ref1.data : void 0) != null)) {
      $.fn.hexaFlip = function(sets, options) {
        var args, el, instance, methodName, _j, _k, _len1, _len2;
        console.log(options);

        if (!css.transform) {
          return this;
        }
        if (typeof sets === 'string') {
          methodName = sets;
          if (typeof HexaFlip.prototype[methodName] !== 'function') {
            return this;
          }
          for (_j = 0, _len1 = this.length; _j < _len1; _j++) {
            el = this[_j];
            if (!(instance = $.data(el, baseName))) {
              return;
            }
            args = Array.prototype.slice.call(arguments);
            args.shift();
            instance[methodName](args);
          }
          return this;
        } else {
          for (_k = 0, _len2 = this.length; _k < _len2; _k++) {
            el = this[_k];
            if (instance = $.data(el, baseName)) {
              return instance;
            } else {
              $.data(el, baseName, new HexaFlip(el, sets, options));
            }
          }
        }
      };
    }

  }).call(this);
});

