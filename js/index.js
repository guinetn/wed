import * as templatesLib from "./templates/templates.js";
import {config} from "./config.js";
import * as editor from "./editor/editor.js";
import * as console from "./console/console.js";

// Preview elements

// Templates
templatesList.addEventListener("click", templateSelected);

// Search in Templates
document.querySelector("#wed-search").addEventListener("change", templatesLib.filterTemplates); // Paste
document.querySelector("#wed-search").addEventListener("keyup", templatesLib.filterTemplates);  // Key pressed

// Init
window.addEventListener('load', init);

function init() {  
  console.consoleHook("textareaConsole");
  templatesLib.initializeTemplates();
  config.version_check();
  if (editor.init(config)) {
    getTemplate( templatesLib.templates[0].files);
  }
}


// Templates

function templateSelected(event) {
    
    if (! event.target.matches("div")) 
        return;
    
    const content = event.srcElement.getAttribute("data-content");          
    if (content != null) {
        applyTemplate(null,content);
    }
    else {
        const files = event.srcElement.getAttribute("data-files");   
      getTemplate( files );
    }
}    

function getTemplate(files) {
  templatesLib.getTemplateFiles(config.templatesDirectory, files, applyTemplate);          
}

function applyTemplate(file, result) {
  if (file == null) {
    editor.cmCss.setValue("");  
    editor.cmHtml.setValue(result);     
    return; 
  } 
  
  const ext = file.split(".");

  if (ext.length < 2) {
    console.log(`Error with ${file}: no extension`);
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




