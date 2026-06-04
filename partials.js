/* Nordar — shared nav + footer for static (non-React) pages */
(function () {
  // Use logo C (Brackets) by default — matches NORDAR_DEFAULTS.logo on homepage
  var logoSvg = '<svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Nordar mark">' +
    '<path d="M8 5 H4 V27 H8" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" fill="none" />' +
    '<path d="M24 5 H28 V27 H24" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" fill="none" />' +
    '<path d="M11 23 V9 L21 23 V9" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" fill="none" />' +
    '</svg>';

  // Determine current page from <html data-page="..."> or filename
  function currentPage() {
    var dp = document.documentElement.getAttribute("data-page");
    if (dp) return dp;
    var p = (location.pathname || "").split("/").pop();
    if (!p || p === "" || p === "index.html") return "home";
    if (/Nordar\s*Site/i.test(p)) return "home";
    if (/^Services/i.test(p)) return "services";
    if (/^About/i.test(p)) return "about";
    if (/^Contact/i.test(p)) return "contact";
    if (/^Privacy/i.test(p)) return "privacy";
    return "";
  }

  var page = currentPage();

  // Nav items: top-level pages
  var navItems = [
    { href: "Services.html", key: "services", label: "Services", num: "01" },
    { href: "About.html",    key: "about",    label: "About",    num: "02" },
    { href: "Contact.html",  key: "contact",  label: "Contact",  num: "03" }
  ];

  function isActive(key) { return key === page ? " active" : ""; }

  function navLinksHtml() {
    return navItems.map(function (i) {
      return '<a href="' + i.href + '" class="' + isActive(i.key).trim() + '">' + i.label + '</a>';
    }).join("");
  }

  function drawerLinksHtml() {
    return navItems.map(function (i) {
      return '<a href="' + i.href + '"><span>' + i.label + '</span><span class="num">' + i.num + '</span></a>';
    }).join("");
  }

  function brandHref() {
    return page === "home" ? "#" : "index.html";
  }

  var navHtml =
    '<header class="nav">' +
      '<div class="container nav-inner">' +
        '<a href="' + brandHref() + '" class="brand">' + logoSvg + '<span class="word">Nordar</span></a>' +
        '<nav class="nav-links">' +
          navLinksHtml() +
        '</nav>' +
        '<button class="nav-toggle" aria-label="Open menu" id="navToggle">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<path d="M2 5 H14 M2 11 H14" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" />' +
          '</svg>' +
        '</button>' +
        '<div class="nav-drawer" id="navDrawer">' +
          drawerLinksHtml() +
        '</div>' +
      '</div>' +
    '</header>';

  var footHtml =
    '<footer>' +
      '<div class="container">' +
        '<div class="foot">' +
          '<div>' +
            '<a href="index.html" class="brand" style="margin-bottom: 16px;">' + logoSvg + '<span class="word">Nordar</span></a>' +
            '<p style="font-size: 14px; color: var(--ink-2); max-width: 32ch; margin-top: 16px; line-height: 1.55;">' +
              'Independent software consulting for the firms that build, operate, and depend on financial asset-management infrastructure.' +
            '</p>' +
          '</div>' +
          '<div>' +
            '<h5>Pages</h5>' +
            '<ul>' +
              '<li><a href="index.html">Home</a></li>' +
              '<li><a href="Services.html">Services</a></li>' +
              '<li><a href="About.html">About</a></li>' +
              '<li><a href="Contact.html">Contact</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h5>Practice</h5>' +
            '<ul>' +
              '<li><a href="Services.html#infrastructure">Infrastructure</a></li>' +
              '<li><a href="Services.html#cybersecurity">Cybersecurity</a></li>' +
              '<li><a href="Services.html#continuity">DR &amp; continuity</a></li>' +
              '<li><a href="Services.html#software">Custom software</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h5>Office</h5>' +
            '<ul>' +
              '<li>contact@nordarllc.com</li>' +
              '<li>By appointment</li>' +
              '<li><a href="privacy-policy.html">Privacy Policy</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="foot-bottom">' +
          '<span>© Nordar, LLC · ' + new Date().getFullYear() + '</span>' +
          '<span>Built and operated, ground-up.</span>' +
        '</div>' +
      '</div>' +
    '</footer>';

  // Inject into placeholders
  var navMount = document.getElementById("nav-mount");
  var footMount = document.getElementById("footer-mount");
  if (navMount) navMount.outerHTML = navHtml;
  if (footMount) footMount.outerHTML = footHtml;

  // Wire up the menu drawer
  var btn = document.getElementById("navToggle");
  var drawer = document.getElementById("navDrawer");
  var navInner = document.querySelector(".nav-inner");
  if (btn && drawer) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      drawer.classList.toggle("open");
    });
    document.addEventListener("mousedown", function (e) {
      if (navInner && !navInner.contains(e.target)) drawer.classList.remove("open");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") drawer.classList.remove("open");
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { drawer.classList.remove("open"); });
    });
  }
})();
