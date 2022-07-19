import * as templatesLib from "./templates/template_lib.js";
import {config} from "./config.js";
import * as editor from "./editor/editor.js";
import * as console from "./console/console.js";

// Preview elements

// Templates
templatesList.addEventListener("click", templateSelected);
templatesCategories.addEventListener("click", templateCategorySelected);

// Search in Templates
document.querySelector("#wed-search").addEventListener("change", templatesLib.filterTemplates); // Paste
document.querySelector("#wed-search").addEventListener("keyup", templatesLib.filterTemplates);  // Key pressed

// Init
window.addEventListener('load', init);

function init() {  
  console.consoleHook('textareaConsole');
  templatesLib.setupCategoriesContainer('templatesCategories');
  templatesLib.setupContainer('templatesList');
  config.version_check();
  if (editor.init(config)) {
    getTemplate( templatesLib.templates[0].files);
  }
}


// Templates

function templateCategorySelected(event) {
  if (! event.target.matches("button")) 
        return;

  templatesLib.setupContainer('templatesList', event.target.innerText);
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
function templateSelected(event) {
    
    // event delegation. Target div childs
    if (! event.target.matches("div")) 
        return;
    
    const content = event.srcElement.getAttribute("data-content");          
    if (content != null) {
        renderTemplate(null,content);
        return;
    }

    const files = event.srcElement.getAttribute("data-files");   
    const category = event.srcElement.getAttribute("data-category");   
    getTemplate( files, category );
}    

function getTemplate(files, category) {
  templatesLib.getTemplate(`${config.templatesDirectory}/${category}`, files, renderTemplate);          
}

function renderTemplate(file, result) {
  
  // template file not found
  if (file == null) {
    editor.cmCss.setValue("");  
    editor.cmHtml.setValue(result);     
    return; 
  } 
  
  const ext = file.split(".");
  if (ext.length < 2) {
    const msg = `Error with ${file}: no extension`;
    editor.cmHtml.setValue(msg);
    console.log(msg);
    return;
  }

  switch (ext[1]) {
    case "css":
      editor.cmCss.setValue(result);
      break;
    case "html":
      editor.cmHtml.setValue(result);
      break;
  }
  
}




