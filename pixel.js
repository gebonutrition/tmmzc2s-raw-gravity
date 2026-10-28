// Reads ?pixel=YOUR_ID from the URL. Silently no-ops if absent.
(function () {
  const pixelId = new URLSearchParams(window.location.search).get('pixel');
  if (!pixelId) {
    console.warn('TikTok Pixel ID not found. Use ?pixel=YOUR_PIXEL_ID');
    return;
  }

  !function (w, d, t) {
    w.TiktokAnalyticsObject = t;
    var ttq = w[t] = w[t] || [];
    ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
    ttq.setAndDefer = function (target, method) {
      target[method] = function () {
        target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
    ttq.instance = function (id) {
      var instance = ttq._i[id] || [];
      for (var n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(instance, ttq.methods[n]);
      return instance;
    };
    ttq.load = function (id, options) {
      var src = "https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq._i = ttq._i || {};
      ttq._i[id] = [];
      ttq._i[id]._u = src;
      ttq._t = ttq._t || {};
      ttq._t[id] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[id] = options || {};
      var script = d.createElement("script");
      script.async = true;
      script.src = src + "?sdkid=" + id + "&lib=" + t;
      var firstScript = d.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    };
    ttq.load(pixelId);
    ttq.page();
  }(window, document, 'ttq');
})();
