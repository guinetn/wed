import { categories } from '../../categories/categories.js';

export function showCategories(container) {

 const categories_items = Object.entries(categories);
  for (let [k, v] of categories_items) {

    if (k=='default') {
      continue;
    }
    
    let button = document.createElement("button");
    button.className = "template html-template";
    button.innerText = k;
    container.appendChild(button);    
  }
}

export function showTemplates(container, category='html') {
  
  container.innerHTML = "";
  addTemplates(container, 'default');
  addTemplates(container, category);
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
function addTemplates(container, category) {

  const cat = category.toLowerCase();
  const categoryTemplates = Object.entries(categories[cat]);
  for (let [k, v] of categoryTemplates) {

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

/* SEARCH */

export function filterTemplates() {
  
  var filter, templates, div, item, i, txtValue;
  
  filter = this.value.toUpperCase();  
  templates = document.getElementById("categoryTemplatesList");
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