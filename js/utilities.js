export const httpGet = (url, callback=console.info, err = console.error) => {
  console.info("URL -> ", url);
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};