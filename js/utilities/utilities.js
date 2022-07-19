export function httpGet(url, callback=console.info, err = console.error) {

  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
}

export async function copyToClipboard(stringToCopy, show = null) {
  try {
    await navigator.clipboard.writeText(stringToCopy.toString());
    // this.snackbar(`copied ${show == true ? stringToCopy : ""}`);
  } catch (err) {
    console.error(`Failed to copy ${stringToCopy}`, err);
  }
}