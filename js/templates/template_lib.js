import { templates } from '../../templates/templates.js';


export function setupCategoriesContainer(templateCategoriesContainerId) {
  const container = document.getElementById(templateCategoriesContainerId);

 const categories = Object.entries(templates);
  for (let [k, v] of categories) {

    if (k=='default') {
      continue;
    }
    
    let button = document.createElement("button");
    button.className = "template html-template";
    button.innerText = k;
    container.appendChild(button);    
  }
}

export function setupContainer(templateContainerId, category='html') {
  
  const container = document.getElementById(templateContainerId);
  container.innerHTML = "";
  showCategoryTemplates('default', container);
  showCategoryTemplates(category, container);
}
    

/*
templates: [

    category
    ↓
  'html': [

    category items
        ↓
    { "name": "cards", "lang": "html", "files": "cards.html , cards.css" },
    { "name": "progress", "lang": "html", "files": "progress.html , progress.css" }
     …
   ],
   'css': …

]
*/
function showCategoryTemplates(category, container) {

  const cat = category.toLowerCase();
  const categoryItems = Object.entries(templates[cat]);
  for (let [k, v] of categoryItems) {

    let div = document.createElement("div");

    div.innerText = `${v.name}  [${v.lang}]`;
    div.setAttribute("data-lang", v.lang);
    div.setAttribute("data-category", cat);

    if (v.content != null) 
      div.setAttribute("data-content", v.content);
    else if (v.files != null) 
      div.setAttribute("data-files", v.files);

    container.appendChild(div);
  }
}

export function getTemplate(dir, files, callback) {
  
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