import * as CATEGORIES_LIB from "./categories/categories_lib.js"; 
import {config} from "./config.js";
import * as EDITOR_LIB from "./editor/editor.js";
import * as CONSOLE_LIB from "./console/console.js";

const CONSOLE_UI_ELEMENT      = document.getElementById('textareaConsole');
const CONSOLE_CLEAR_UI_BUTTON = document.getElementById('clearConsole');
const SEARCH_UI_ELEMENT       = document.getElementById('wed-search');
const CATEGORIES_UI_BUTTONS   = document.getElementById('categoriesButtons');
const CATEGORY_UI_TEMPLATES   = document.getElementById('categoryTemplatesList');
const DEFAULT_CATEGORY        = 'default';

window.addEventListener('load', init_application);

function init_application() {  
  
  CONSOLE_LIB.setup_console_Hook(CONSOLE_UI_ELEMENT, CONSOLE_CLEAR_UI_BUTTON);

  CATEGORIES_LIB.showCategories(CATEGORIES_UI_BUTTONS);
  CATEGORIES_LIB.showTemplates(CATEGORY_UI_TEMPLATES);
  
  config.check_version();
  if (EDITOR_LIB.setupEditors(config)) {
    getTemplate( CATEGORIES_LIB.templates[DEFAULT_CATEGORY].files);
  }

  start_listeners();
}

function start_listeners() {  
  CATEGORIES_UI_BUTTONS.addEventListener("click", categorySelected);
  CATEGORY_UI_TEMPLATES.addEventListener("click", categoryTemplateSelected);

  // Search in Templates
  SEARCH_UI_ELEMENT.addEventListener("change", CATEGORIES_LIB.filterTemplates); // Paste
  SEARCH_UI_ELEMENT.addEventListener("keyup", CATEGORIES_LIB.filterTemplates);  // Key pressed
}

// EVENT: select a category or a  template

function categorySelected(event) {
  if (! event.target.matches("button")) 
        return;

  const category = event.target.innerText;     
  CATEGORIES_LIB.showTemplates(CATEGORY_UI_TEMPLATES, category);
  SEARCH_UI_ELEMENT.value = '';
}

function categoryTemplateSelected(event) {
    
    // event delegation. Target div childs
    if (! event.target.matches("div")) 
        return;

    CONSOLE_CLEAR_UI_BUTTON.click();

    //                  Template  'default': [ … { "name": "default  [html]", "lang": "html", "files": "default.html , default.css" }, … ] Have been formatted to  
    //  event.srcElement format   <div data-lang="html" data-category="default" data-files="default.html , default.css">default  [html]</div>
    const content = event.srcElement.getAttribute("data-content");          
    if (content != null) {
        renderTemplate(null,content);
        return;
    }

    const files = event.srcElement.getAttribute("data-files");   
    const category = event.srcElement.getAttribute("data-category");   
    CATEGORIES_LIB.getTemplate(`${config.categoriesDirectory}/${category}`, files, renderTemplate);          
}

function renderTemplate(file, fileContent) {
  
  // template file not found
  if (file == null) {
    EDITOR_LIB.cmCss.setValue("");  
    EDITOR_LIB.cmHtml.setValue(fileContent);     
    return; 
  } 
  
  const ext = file.split(".");
  if (ext.length < 2) {
    const msg = `Error with ${file}: no extension`;
    EDITOR_LIB.cmHtml.setValue(msg);
    console.log(msg);
    return;
  }

  switch (ext[1]) {
    case "css":
      EDITOR_LIB.cmCss.setValue(fileContent);
      break;
    case "html":
      EDITOR_LIB.cmHtml.setValue(fileContent);
      break;
  }
  
}




