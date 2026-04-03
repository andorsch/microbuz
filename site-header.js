(function () {
  'use strict';

  var ROOT_ID = 'site-header-root';
  var OVERLAY_ID = 'site-nav-overlay';
  var DRAWER_ID = 'site-nav-drawer';
  var TOGGLE_ID = 'site-nav-toggle';
  var CLOSE_ID = 'site-nav-close';
  var PHONE_TEL = 'tel:+40746063301';
  var PHONE_LABEL = '0746 063 301';

  function uiLang() {
    var l = document.documentElement.getAttribute('lang') || 'ro';
    return l.slice(0, 2) === 'en' ? 'en' : 'ro';
  }

  function strings(lang) {
    if (lang === 'en') {
      return {
        navLabel: 'Main',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        drawerTitle: 'Menu',
      };
    }
    return {
      navLabel: 'Principal',
      openMenu: 'Deschide meniul',
      closeMenu: 'Închide meniul',
      drawerTitle: 'Meniu',
    };
  }

  function homeHref(lang) {
    return lang === 'en' ? 'index-en.html' : 'index.html';
  }

  function navItems(lang) {
    var home = homeHref(lang);
    var servHash = lang === 'en' ? '#services' : '#servicii';
    var vehHash = lang === 'en' ? '#vehicle' : '#vehicul';
    return [
      { id: 'home', href: home, label: lang === 'en' ? 'Home' : 'Acasă' },
      { id: 'servicii', href: home + servHash, label: lang === 'en' ? 'Services' : 'Servicii' },
      { id: 'vehicul', href: home + vehHash, label: lang === 'en' ? 'Vehicle' : 'Vehicul' },
      { id: 'pret', href: 'pret.html', label: lang === 'en' ? 'Pricing' : 'Tarife' },
      { id: 'cum-inchiriezi', href: 'cum-inchiriezi.html', label: lang === 'en' ? 'How to rent' : 'Cum închiriezi' },
      { id: 'faq', href: 'intrebari-frecvente.html', label: lang === 'en' ? 'FAQ' : 'Întrebări' },
      { id: 'despre', href: 'despre-noi.html', label: lang === 'en' ? 'About' : 'Despre noi' },
      { id: 'contact', href: home + '#contact', label: 'Contact' },
    ];
  }

  function currentPageId() {
    var path = location.pathname || '';
    var name = path.split('/').pop();
    if (!name || name === '') {
      name = 'index.html';
    }
    var h = (location.hash || '').replace(/^#/, '');
    if (name === 'index.html') {
      if (h === 'servicii') return 'servicii';
      if (h === 'vehicul') return 'vehicul';
      if (h === 'contact') return 'contact';
      return 'home';
    }
    if (name === 'index-en.html') {
      if (h === 'services') return 'servicii';
      if (h === 'vehicle') return 'vehicul';
      if (h === 'contact') return 'contact';
      return 'home';
    }
    var map = {
      'pret.html': 'pret',
      'cum-inchiriezi.html': 'cum-inchiriezi',
      'intrebari-frecvente.html': 'faq',
      'despre-noi.html': 'despre',
      'termeni.html': 'legal',
      'confidentialitate.html': 'legal',
      'politica-cookies.html': 'legal',
    };
    return map[name] || null;
  }

  function isHomePageForLangSwitch() {
    var path = location.pathname || '';
    var name = path.split('/').pop();
    if (!name || name === '') return true;
    return name === 'index.html' || name === 'index-en.html';
  }

  function langSwitch(lang) {
    if (!isHomePageForLangSwitch()) return null;
    if (lang === 'en') {
      return { href: 'index.html', label: 'RO', langAttr: 'ro' };
    }
    return { href: 'index-en.html', label: 'EN', langAttr: 'en' };
  }

  function buildLink(href, text, currentId, itemId, onNavigate) {
    var a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    if (itemId === currentId) {
      a.setAttribute('aria-current', 'page');
    }
    if (onNavigate) {
      a.addEventListener('click', onNavigate);
    }
    return a;
  }

  function buildNavList(items, currentId, listClass, linkClass, onNavigate) {
    var ul = document.createElement('ul');
    ul.className = listClass;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var li = document.createElement('li');
      var a = buildLink(it.href, it.label, currentId, it.id, onNavigate);
      if (linkClass) a.className = linkClass;
      li.appendChild(a);
      ul.appendChild(li);
    }
    return ul;
  }

  function init() {
    var root = document.getElementById(ROOT_ID);
    if (!root || root.getAttribute('data-header-mounted') === '1') return;
    root.setAttribute('data-header-mounted', '1');

    var lang = uiLang();
    var s = strings(lang);
    var items = navItems(lang);
    var currentId = currentPageId();
    var logoHref = homeHref(lang);
    var ls = langSwitch(lang);

    var row = document.createElement('div');
    row.className = 'site-header__row';

    var logo = document.createElement('a');
    logo.href = logoHref;
    logo.className = 'site-logo';
    logo.textContent = 'MICROBUZ CLUJ';

    var navDesktop = document.createElement('nav');
    navDesktop.className = 'site-nav-desktop';
    navDesktop.setAttribute('aria-label', s.navLabel);
    navDesktop.appendChild(buildNavList(items, currentId, 'site-nav-desktop__list', 'site-nav-desktop__link', null));

    var end = document.createElement('div');
    end.className = 'site-header__end';

    if (ls) {
      var langA = document.createElement('a');
      langA.href = ls.href;
      langA.className = 'header-lang-link';
      langA.setAttribute('lang', ls.langAttr);
      langA.setAttribute('hreflang', ls.langAttr);
      langA.textContent = ls.label;
      end.appendChild(langA);
    }

    var cta = document.createElement('a');
    cta.href = PHONE_TEL;
    cta.className = 'header-cta site-header__cta';
    cta.textContent = '📞 ' + PHONE_LABEL;
    end.appendChild(cta);

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.id = TOGGLE_ID;
    toggle.className = 'site-nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', DRAWER_ID);
    toggle.setAttribute('aria-label', s.openMenu);
    for (var b = 0; b < 3; b++) {
      var bar = document.createElement('span');
      bar.className = 'site-nav-toggle__bar';
      bar.setAttribute('aria-hidden', 'true');
      toggle.appendChild(bar);
    }

    end.appendChild(toggle);

    row.appendChild(logo);
    row.appendChild(navDesktop);
    row.appendChild(end);
    root.appendChild(row);

    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.className = 'site-nav-overlay';
    overlay.hidden = true;
    overlay.setAttribute('aria-hidden', 'true');

    var drawer = document.createElement('aside');
    drawer.id = DRAWER_ID;
    drawer.className = 'site-nav-drawer';
    drawer.hidden = true;
    drawer.setAttribute('aria-hidden', 'true');
    drawer.setAttribute('aria-label', s.drawerTitle);
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');

    function closeDrawer() {
      if (!document.documentElement.classList.contains('site-nav-open')) return;
      overlay.classList.remove('site-nav-overlay--visible');
      drawer.classList.remove('site-nav-drawer--open');
      toggle.setAttribute('aria-expanded', 'false');
      window.setTimeout(function () {
        document.documentElement.classList.remove('site-nav-open');
        document.body.classList.remove('site-nav-open');
        overlay.hidden = true;
        overlay.setAttribute('aria-hidden', 'true');
        drawer.hidden = true;
        drawer.setAttribute('aria-hidden', 'true');
      }, 280);
      toggle.focus();
    }

    function openDrawer() {
      document.documentElement.classList.add('site-nav-open');
      document.body.classList.add('site-nav-open');
      overlay.hidden = false;
      overlay.setAttribute('aria-hidden', 'false');
      drawer.hidden = false;
      drawer.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          overlay.classList.add('site-nav-overlay--visible');
          drawer.classList.add('site-nav-drawer--open');
        });
      });
      var closeEl = document.getElementById(CLOSE_ID);
      if (closeEl) {
        window.setTimeout(function () {
          closeEl.focus();
        }, 50);
      }
    }

    function onDrawerLinkClick() {
      if (document.documentElement.classList.contains('site-nav-open')) {
        closeDrawer();
      }
    }

    var drawerHead = document.createElement('div');
    drawerHead.className = 'site-nav-drawer__head';

    var drawerTitle = document.createElement('span');
    drawerTitle.className = 'site-nav-drawer__title';
    drawerTitle.textContent = s.drawerTitle;

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.id = CLOSE_ID;
    closeBtn.className = 'site-nav-drawer__close';
    closeBtn.setAttribute('aria-label', s.closeMenu);
    closeBtn.innerHTML = '\u00d7';

    drawerHead.appendChild(drawerTitle);
    drawerHead.appendChild(closeBtn);

    var drawerNav = document.createElement('nav');
    drawerNav.className = 'site-nav-drawer__nav';
    drawerNav.setAttribute('aria-label', s.navLabel);
    drawerNav.appendChild(
      buildNavList(items, currentId, 'site-nav-drawer__list', 'site-nav-drawer__link', onDrawerLinkClick)
    );

    var drawerActions = document.createElement('div');
    drawerActions.className = 'site-nav-drawer__actions';

    if (ls) {
      var langM = document.createElement('a');
      langM.href = ls.href;
      langM.className = 'site-nav-drawer__lang';
      langM.setAttribute('lang', ls.langAttr);
      langM.textContent = ls.langAttr === 'en' ? 'English' : 'Română';
      langM.addEventListener('click', onDrawerLinkClick);
      drawerActions.appendChild(langM);
    }

    var ctaM = document.createElement('a');
    ctaM.href = PHONE_TEL;
    ctaM.className = 'header-cta site-nav-drawer__cta';
    ctaM.textContent = '📞 ' + PHONE_LABEL;
    ctaM.addEventListener('click', onDrawerLinkClick);
    drawerActions.appendChild(ctaM);

    drawer.appendChild(drawerHead);
    drawer.appendChild(drawerNav);
    drawer.appendChild(drawerActions);

    root.parentNode.insertBefore(overlay, root.nextSibling);
    overlay.parentNode.insertBefore(drawer, overlay.nextSibling);

    toggle.addEventListener('click', function () {
      if (document.documentElement.classList.contains('site-nav-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.documentElement.classList.contains('site-nav-open')) {
        closeDrawer();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
