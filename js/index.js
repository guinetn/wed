import * as templatesLib from "./templates.js";

const config = {
    templatesDirectory: "templates"
}

// Previews elements
var previewCss = document.querySelector('.wed-previewCss');
var previewHtml = document.querySelector('.wed-preview');
var previewConsole = document.querySelector('#textareConsole');
// Input elements
var textareaHtml = document.querySelector('#textareaHtml');
var textareaCss = document.querySelector('#textareaCss');
    
// Detect input change: user has updated html or css
textareaHtml.addEventListener('input', changeDetected);
textareaCss.addEventListener('input', changeDetected);

function changeDetected() {
    const htmlCode = textareaHtml.value;
    const cssCode = textareaCss.value;
    preview(cssCode, htmlCode);
}

function preview(cssCode, htmlCode) {        
    previewCss.innerHTML = cssCode;
    setInnerHTML(previewHtml, htmlCode);               
}

// Init
window.addEventListener('load', init);

function init() {
    const initialCss = ".grid {\n    display: grid;\n    grid-template-columns: repeat(9, 1fr);\n    grid-template-rows: repeat(4, minmax(100px, auto));\n    background-color: #fff4e6;  \n}\n\n.item {\n    display: grid;\n    grid-column: 2 / 7;\n    grid-row: 2 / 4;\n    grid-template-columns: repeat(3, 1fr);\n    grid-template-rows: subgrid;\n    background-color: #ffd8a8;\n    border: 2px solid #ffa94d;\n}\n\n.subitem {\n    grid-column: 2 / 4;\n    grid-row: 1 / 3;\n    background-color: rgb(40, 240, 83);\n    border: 2px solid #00a94d;\n}\n";
    const initialHtml = '<div class="grid">\n  <div class="item">\n    <div class="subitem"></div>\n  </div>\n</div>\n<script>console.log("Catch console.log ! ")<\/script>\n'
    textareaCss.value = initialCss;
    textareaHtml.value = initialHtml;
    changeDetected();
    templatesLib.initializeTemplates();
}

templatesList.addEventListener("click", templateSelected);

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

document.getElementById("search")
        .addEventListener("change", templatesLib.filterTemplates);
document.getElementById("search")
  .addEventListener("keyup", templatesLib.filterTemplates);


  function applyTemplate(file, result) {
    if (file == null) {
      textareaCss.value = "";
      textareaHtml.value = result;
    } else {
      const ext = file.split(".");

      if (ext.length < 2) {
        console.log(`Error with ${file}: no extension`);
        return;
      }

      switch (ext[1]) {
        case "css":
          textareaCss.value = result;
          break;
        case "html":
          textareaHtml.value = result;
          break;
      }
    }

    changeDetected();
  }




// Eval any <script> in html
function setInnerHTML(ele, html)  
{          
    ele.innerHTML = html;  
    var codes = ele.getElementsByTagName("script");   
    for(var i=0;i<codes.length;i++)          
        eval(codes[i].text);          
}  

// Console Hook. Extend if needed for warn/error…    
(function(){
    console.defaultLog = console.log.bind(console);		
    console.log = function() {
        console.defaultLog.apply(console, arguments);  	
        previewConsole.innerHTML += Array.from(arguments)[0] + '\n';    
    }
 })();


