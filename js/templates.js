import { templates } from './templates_list.js';

export function initializeTemplates() {
  const container = document.getElementById("templatesList");
  templates.forEach(template => {
    let li = document.createElement("li");
    li.innerText = `${template.name}  [${template.lang}]`;
    li.setAttribute("data-lang", template.lang);
    if (template.files != null)     
      li.setAttribute("data-files", template.files);
    if (template.content!=null) 
      li.setAttribute("data-content", template.content);
    container.appendChild(li);
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
  
  var filter, ul, li, item, i, txtValue;
  // Filter, makes search not case sensitive
  filter = this.value.toUpperCase();
  // Grabs the parent element by id
  ul = document.getElementById("templatesList");
  // Individual item on list
  li = ul.getElementsByTagName("li");

  // Treats lists items like an array, where each item can be accessed through      it's index
  for (i = 0; i < li.length; i++) {
    item = li[i];

    // Iterate over each list item to see if the value of the input, ignoring         case, matches the inner text or inner html of the item.
    txtValue = item.textContent || item.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      // Displays list items that are a match, and nothing if no match
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

