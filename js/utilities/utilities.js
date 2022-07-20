export function httpGet(url, callback=console.info, err = console.error) {

  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
}

export async function httpGetJson(url) {
   await httpGet(url, function(data) {
      return JSON.parse(data);
    return
   });
}

export async function fetchFile(file, callback) {    
  await fetch(file)
   .then((res) => res.text())
    .then((res) => callback(res))
    .catch(function (err) {
      console.error(`fetchFile: Something went wrong with '${file}: ${err}`);
    });
}

export async function fetchJsonFile(jsonfile, callback) {    
  await fetch(jsonfile)
    .then((res) => res.json())
    .then((jsonContent) => callback(jsonContent))
    .catch(function (err) {
      console.error(`fetchJsonFile: Something went wrong with '${jsonfile}: ${err}`);
    });
}

export async function copyToClipboard(stringToCopy, show = null) {
  try {
    await navigator.clipboard.writeText(stringToCopy.toString());
    // this.snackbar(`copied ${show == true ? stringToCopy : ""}`);
  } catch (err) {
    console.error(`Failed to copy ${stringToCopy}`, err);
  }
}