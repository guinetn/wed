import * as CATEGORIES_LIB from "./categories/categories.js"; 
import {config} from "./config/config.js";
import * as EDITOR_LIB from "./editor/editor.js";
import * as CONSOLE_LIB from "./console/console.js";

const VERSION_UI_ELEMENT       = document.getElementById('wed-version');
const VERSION_UPDATE_UI_SIGN   = document.getElementById('update_sign');
const CONSOLE_UI_ELEMENT       = document.getElementById('textareaConsole');
const CONSOLE_CLEAR_UI_BUTTON  = document.getElementById('clearConsole');
const SEARCH_UI_ELEMENT        = document.getElementById('wed-search');
const CATEGORIES_UI_BUTTONS    = document.getElementById('categoriesButtons');
const CATEGORY_UI_TEMPLATES    = document.getElementById('categoryTemplatesList');
const DEFAULT_CATEGORY         = 'default';
const CONFIG_FILE              = 'config.json';

window.addEventListener('load', setup_application);

// - - - - - - - - - - SETUP - - - - - - - - - -

async function setup_application() {
  
  CONSOLE_LIB.setup_console_Hook(CONSOLE_UI_ELEMENT, CONSOLE_CLEAR_UI_BUTTON);

  CATEGORIES_LIB.showCategories(CATEGORIES_UI_BUTTONS);
  CATEGORIES_LIB.showTemplates(CATEGORY_UI_TEMPLATES);
  
  await config.setup(CONFIG_FILE, showConfig);

  start_listeners();

  if (EDITOR_LIB.setupEditors()) {
   // 'default' template is the default view 
   CATEGORY_UI_TEMPLATES.firstChild.click(); 
  }
}

// - - - - - - - - - - LISTEN - - - - - - - - - -

function start_listeners() {  
  // Listen for user clicking a category or a template
  CATEGORIES_UI_BUTTONS.addEventListener("click", categorySelected);
  CATEGORY_UI_TEMPLATES.addEventListener("click", templateSelected);

  // Listen for user searching a template
  SEARCH_UI_ELEMENT.addEventListener("keyup", filteringTemplates);  
}

// PROCESS EVENTS: category clicked - template clicked - search input change



function categorySelected(event) {
  if (! event.target.matches("button")) 
        return;

  const currentCategory = event.target.innerText;     
  CATEGORIES_LIB.showTemplates(CATEGORY_UI_TEMPLATES, currentCategory);
  SEARCH_UI_ELEMENT.value = '';
}

function templateSelected(event) {
    
    // event delegation. Target div childs
    if (! event.target.matches("div")) 
        return;

    CONSOLE_CLEAR_UI_BUTTON.click();

    //                 Template  'default': [ … { "name": "default  [html]", "lang": "html", "files": "default.html , default.css" }, … ] Have been formatted to  
    //  event.srcElement format   <div data-lang="html" data-category="default" data-files="default.html , default.css">default  [html]</div>
    const content = event.srcElement.getAttribute("data-content");          
    if (content != null) {
        renderTemplate(null,content);
        return;
    }

    const files = event.srcElement.getAttribute("data-files");   
    const category = event.srcElement.getAttribute("data-category");   
    CATEGORIES_LIB.getTemplate(`${config.categories_directory}/${category}`, files, renderTemplate);          
}

// - - - - - - - - - - UI RENDERING - - - - - - - - - -

function filteringTemplates(event) {
  
  let search_term = this.value.toUpperCase();  
  let div_templates = CATEGORY_UI_TEMPLATES.getElementsByTagName("div");

  Array.prototype.map.call(div_templates, div => {
 
    // All item (template name) are compared (case insensitive) with the search input
    let template_name = (div.textContent || div.innerText).toUpperCase();

    // Displays list items that are a match, and nothing if no match
    div.style.display = (template_name.indexOf(search_term) <= -1) ? "none" : "";
  });
}

function showConfig() {

  // Show app version: current version, [online available version]
  VERSION_UI_ELEMENT.innerText = config.version.current;
  
  if (! config.version.is_new_version_available()) {
    return;
  }

  const update_message = config.update_message(); 
  console.log(update_message);
  
  VERSION_UPDATE_UI_SIGN.classList.remove('hidden');
  VERSION_UPDATE_UI_SIGN.title = update_message;
}

function renderTemplate(file, fileContent) {
  
  // template file not found
  if (file == null) {
    EDITOR_LIB.cmCss.setValue("");  
    EDITOR_LIB.cmHtml.setValue(fileContent);     
    return; 
  } 
  
  const fileExtension = file.split('.');
  if (fileExtension.length < 2) {
    const msg = `Error with ${file}: no extension, need it to render it somewhere`;
    EDITOR_LIB.cmHtml.setValue(msg);
    console.log(msg);
    return;
  }

  switch (fileExtension[1]) {
    case "css":
      EDITOR_LIB.cmCss.setValue(fileContent);
      break;
    case "html":
      EDITOR_LIB.cmHtml.setValue(fileContent);
      break;
  }
  
}
