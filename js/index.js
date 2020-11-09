import * as templatesLib from "./templates.js";

// Code mirror
let cmHtml = undefined;
let cmCss = undefined;

const config = {
    templatesDirectory: "templates",
    initialCss: ".grid {\n    display: grid;\n    grid-template-columns: repeat(9, 1fr);\n    grid-template-rows: repeat(4, minmax(100px, auto));\n    background-color: #fff4e6;  \n}\n\n.item {\n    display: grid;\n    grid-column: 2 / 7;\n    grid-row: 2 / 4;\n    grid-template-columns: repeat(3, 1fr);\n    grid-template-rows: subgrid;\n    background-color: #ffd8a8;\n    border: 2px solid #ffa94d;\n}\n\n.subitem {\n    grid-column: 2 / 4;\n    grid-row: 1 / 3;\n    background-color: rgb(40, 240, 83);\n    border: 2px solid #00a94d;\n}\n",
    initialHtml: '<div class="grid">\n  <div class="item">\n    <div class="subitem"></div>\n  </div>\n</div>\n<script>console.log("Catch console.log ! ")</script>\n'
}

// Preview elements
var previewCss = document.querySelector('.wed-previewCss');
var previewHtml = document.querySelector('.wed-preview');
var previewConsole = document.querySelector('#textareConsole');

// Templates
templatesList.addEventListener("click", templateSelected);

// Search in Templates
document.querySelector("#wed-search").addEventListener("change", templatesLib.filterTemplates); // Paste
document.querySelector("#wed-search").addEventListener("keyup", templatesLib.filterTemplates);  // Key pressed

// Commands
document.querySelector('#clearCodes').addEventListener('click', clearCodes);
document.querySelector("#clearConsole").addEventListener("click", clearConsole);

// Init
window.addEventListener('load', init);

function init() {  
  templatesLib.initializeTemplates();
  initEditors();
  getLocalStorage();
}

function initEditors() {
  
  cmHtml = new CodeMirror.fromTextArea(document.getElementById("textareaHtml"),
    {
      lineNumbers: true,
      mode: "javascript",
      theme: "monokai",
      lineWrapping: true,
    }
  );

  cmCss = new CodeMirror.fromTextArea(document.getElementById("textareaCss"), {
    lineNumbers: true,
    mode: "css",
    theme: "monokai",
    lineWrapping: true,
  });

  cmHtml.setSize(600, 300);
  cmCss.setSize(600, 300);

  cmHtml.on("changes", () => update());
  cmCss.on("changes", () => update());
}



// Commands

function clearCodes() {
  setEditors();      
}

function clearConsole() {
  previewConsole.innerHTML = "";
}

// Preview

function update() { 
    const css = cmCss.getValue(); 
    const html = cmHtml.getValue(); 
    setPreview(css, html);
    setLocalStorage(css, html);
}

function setPreview(cssCode, htmlCode) {
  previewCss.innerHTML = cssCode;
  setInnerHTML(previewHtml, htmlCode);
}

// Render html & eval <script> (Welcome Xss attacks, but you're on commands ;) See an original xss punishment at https://fdossena.com/?p=xsspunish/i.md)
function setInnerHTML(element, html)  
{          
    element.innerHTML = html;  
    var codes = element.getElementsByTagName("script");   
    for(var i=0;i<codes.length;i++)          
        eval(codes[i].text);          
}  

// Console Hook (for display purpose). Extend if needed for warn/error…    
(function(){
    console.defaultLog = console.log.bind(console);		
    console.log = function () {
      console.defaultLog.apply(console, arguments);
      previewConsole.innerHTML = Array.from(arguments)[0] + "\n" + previewConsole.innerHTML; // last logs are at top
    };
 })();



// Templates

function templateSelected(event) {
    
    if (! event.target.matches("li")) 
        return;
    
    const content = event.srcElement.getAttribute("data-content");          
    if (content != null) {
        applyTemplate(null,content);
    }
    else {
        const files = event.srcElement.getAttribute("data-files");          
        templatesLib.getTemplateFiles(config.templatesDirectory, files, applyTemplate);          
    }
}    

  function applyTemplate(file, result) {
    if (file == null) {
      cmCss.setValue("");  
      cmHtml.setValue(result);      
    } else {
      const ext = file.split(".");

      if (ext.length < 2) {
        console.log(`Error with ${file}: no extension`);
        return;
      }

      switch (ext[1]) {
        case "css":
          cmCss.setValue(result);
          break;
        case "html":
          cmHtml.setValue(result);
          break;
      }
    }
  }


  // Storage

  var setLocalStorage = function (css, html) {        
    localStorage.setItem("user-css", css);    
    localStorage.setItem("user-html", html);    
  };

  function getLocalStorage() {
    var userCss = localStorage.getItem("user-css");            
    var userHtml = localStorage.getItem("user-html");            
    setEditors(
      userCss != null ? userCss : config.initialCss,    
      userHtml != null ? userHtml : config.initialHtml);        
  };

  function setEditors(css="", html="") {
     cmCss.setValue(css);
     cmHtml.setValue(html);        
  }
