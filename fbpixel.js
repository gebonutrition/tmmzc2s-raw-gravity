// Reads ?fbpixel=YOUR_ID from the URL. Silently no-ops if absent.
(function () {
  const fbPixelId = new URLSearchParams(window.location.search).get('fbpixel');
  if (!fbPixelId) {
    console.warn('Facebook Pixel ID not found. Use ?fbpixel=YOUR_PIXEL_ID');
    return;
  }

  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', fbPixelId);
  fbq('track', 'PageView');
})();
