import { categories } from '../../categories/categories.js';
import {fetchFile} from "../utilities/utilities.js";

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
     const file = `${dir}/${f.trim()}`;
     fetchFile(file, function(rawFile) {
        callback(file, rawFile);  
     });
  });    
  
}
