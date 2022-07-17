import { templates } from './templates_list.js';

export function initializeTemplates() {
  const container = document.getElementById("templatesList");
  templates.forEach(template => {
    let div = document.createElement("div");

    div.innerText = `${template.name}  [${template.lang}]`;
    div.setAttribute("data-lang", template.lang);

    if (template.content != null) 
      div.setAttribute("data-content", template.content);
    else if (template.files != null) 
      div.setAttribute("data-files", template.files);

    container.appendChild(div);
  });
}
    
export function getTemplateFiles(dir, files, callback) {
  
  files.split(",").forEach(f => {
    getFile(`${dir}/${f.trim()}`, callback);
  });    
  
}

function getFile(file, callback) {

  fetch(file)
  .then(function (response) {
    if (!response.ok) {
      throw new Error(`HTTP error on ${file}. Status:${response.status}`);
    }
    return response.blob();
  })
  .then(function (myBlob) {
    var reader = new FileReader();
    var textFile = /text.*/;
    if (myBlob.type.match(textFile)) {

      reader.onload = function (event) {         
        callback(file, event.target.result);       
      };

    } else {
      console.log(`HTTP exception on ${file}`);
    }
    reader.readAsText(myBlob);
  })
  .catch(function (error) {
    console.log(`HTTP exception on ${file}. ${error}`);
  });
}

/* SEARCH*/

export function filterTemplates() {
  
  var filter, templates, div, item, i, txtValue;
  
  filter = this.value.toUpperCase();  
  templates = document.getElementById("templatesList");
  div = templates.getElementsByTagName("div");

  // Treats lists items like an array, where each item can be accessed through      it's index
  for (i = 0; i < div.length; i++) {
    item = div[i];

    // All list item are checked to see if the value of the input, 
    // ignoring case, matches the inner text or inner html of the item.
    txtValue = item.textContent || item.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      // Displays list items that are a match, and nothing if no match
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }
}