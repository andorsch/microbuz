(function () {
  'use strict';

  var GA_ID = 'G-K4BN9RLFNT';
  var CONSENT_KEY = 'microbuz_cookie_consent';

  function setYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function loadGoogleAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
    s.onload = function () {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA_ID);
    };
  }

  function hideCookieBanner(banner) {
    banner.classList.remove('cookie-consent--visible');
    banner.setAttribute('aria-hidden', 'true');
  }

  function initCookieConsent() {
    var banner = document.getElementById('cookie-consent');
    if (!banner) return;

    var consent = null;
    try {
      consent = localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      consent = null;
    }

    if (consent === 'accepted') {
      loadGoogleAnalytics();
      hideCookieBanner(banner);
      return;
    }
    if (consent === 'rejected') {
      hideCookieBanner(banner);
      return;
    }

    banner.classList.add('cookie-consent--visible');
    banner.removeAttribute('aria-hidden');

    var accept = document.getElementById('cookie-consent-accept');
    var reject = document.getElementById('cookie-consent-reject');

    function onAccept() {
      try {
        localStorage.setItem(CONSENT_KEY, 'accepted');
      } catch (e) {}
      loadGoogleAnalytics();
      hideCookieBanner(banner);
    }

    function onReject() {
      try {
        localStorage.setItem(CONSENT_KEY, 'rejected');
      } catch (e) {}
      hideCookieBanner(banner);
    }

    if (accept) accept.addEventListener('click', onAccept);
    if (reject) reject.addEventListener('click', onReject);
  }

  setYear();
  initCookieConsent();

  (function initVehicleCarousel() {
    var root = document.querySelector('[data-vehicle-carousel]');
    if (!root) return;

    var track = root.querySelector('.vehicle-carousel__track');
    var prev = root.querySelector('.vehicle-carousel__btn--prev');
    var next = root.querySelector('.vehicle-carousel__btn--next');
    var dotsHost = document.getElementById('vehicle-carousel-dots');
    if (!track || !prev || !next || !dotsHost) return;

    var slides = track.querySelectorAll('.vehicle-carousel__slide');
    var n = slides.length;
    if (n === 0) return;

    var index = 0;

    function go(i) {
      index = ((i % n) + n) % n;
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      var dots = dotsHost.querySelectorAll('.vehicle-carousel__dot');
      for (var j = 0; j < dots.length; j++) {
        dots[j].setAttribute('aria-selected', j === index ? 'true' : 'false');
        dots[j].tabIndex = j === index ? 0 : -1;
      }
    }

    for (var j = 0; j < n; j++) {
      (function (jj) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'vehicle-carousel__dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Imaginea ' + (jj + 1) + ' din ' + n);
        dot.addEventListener('click', function () {
          go(jj);
        });
        dotsHost.appendChild(dot);
      })(j);
    }

    prev.addEventListener('click', function () {
      go(index - 1);
    });
    next.addEventListener('click', function () {
      go(index + 1);
    });

    go(0);
  })();
})();
