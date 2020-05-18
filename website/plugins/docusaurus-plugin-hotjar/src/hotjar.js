import siteConfig from '@generated/docusaurus.config'; // eslint-disable-line

const { themeConfig } = siteConfig;

export default (function hotjar() {
  if (!themeConfig.hotjar) {
    return null;
  }

  const { hjid, manual } = themeConfig.hotjar;
  if (process.env.NODE_ENV === 'development') {
    if (manual === true) {
      console.warn(
        'You specified the `hotjar` object in `themeConfig` with field `manual` set to true. ' +
          'This plugin will fire `stateChange` event on every route update. ' +
          'Please ensure that you set `URL changes` to `manual` on your hotjar site settings.'
      );
    }
    if (!hjid) {
      console.warn(
        'You specified the `hotjar` object in `themeConfig` but the `hjid` field was missing. ' +
          'Please ensure this is not a mistake.'
      );
      return null;
    }
  }

  if (
    process.env.NODE_ENV !== 'production' ||
    !hjid ||
    typeof window === 'undefined'
  ) {
    return null;
  }

  /* eslint-disable */
  (function(h, o, t, j, a, r) {
    h.hj =
      h.hj ||
      function() {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    h._hjSettings = { hjid, hjsv: 6 };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script');
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  /* eslint-enable */

  return manual === true
    ? {
        onRouteUpdate({ location }) {
          // Set page so that subsequent hits on this page are attributed
          // to this page. This is recommended for Single-page Applications.
          window.hj('stateChange', location.pathname);
          // Always refer to the variable on window in-case it gets overridden elsewhere.
        }
      }
    : {};
})();
