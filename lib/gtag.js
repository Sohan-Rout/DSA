export const GA_MEASUREMENT_ID = 'G-N8XGEXJXEM' // your id

export const pageview = (url) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}