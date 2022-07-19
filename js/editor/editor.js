import * as sublime from "./sublime.js";
import {copyToClipboard} from "../utilities/utilities.js";

// Code mirror
let cmHtml = undefined;
let cmCss = undefined;

var previewCss = document.querySelector('.wed-previewCss');
var previewHtml = document.querySelector('.wed-preview');

// Commands
document.querySelector('#clearHtml').addEventListener('click', clearHtml);
document.querySelector('#clearCss').addEventListener('click', clearCss);
document.querySelector('#copyHtml').addEventListener('click', copyHtml);
document.querySelector('#copyCss').addEventListener('click', copyCss);

// return true if localstorage has no data and need to be set at default template
function init(config) {
  
  cmHtml = new CodeMirror.fromTextArea(document.getElementById("textareaHtml"),
    {
      lineNumbers: true,
      mode: "javascript",
      theme: "monokai",
      lineWrapping: true,
      keyMap: "sublime"
    }
  );

  cmCss = new CodeMirror.fromTextArea(document.getElementById("textareaCss"), {
    lineNumbers: true,
    mode: "css",
    theme: "monokai",
    lineWrapping: true,
    keyMap: "sublime"
  });

  // cmHtml.setSize("100%", "100%");
  // cmCss.setSize("100%", "100%");

  cmHtml.on("changes", () => update());
  cmCss.on("changes", () => update());

  return getLocalStorage(config);  
}

// Commands

function setEditors(css="", html="") {
   cmCss.setValue(css);
   cmHtml.setValue(html);        
}

function clearCss() {
  cmCss.setValue('');   
}

function clearHtml() {
  cmHtml.setValue('');   
}

function copyCss() {
  copyToClipboard(cmCss.getValue());   
}

function copyHtml() {
  copyToClipboard(cmHtml.getValue());   
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

// Storage

var setLocalStorage = function (css, html) {        
  localStorage.setItem("user-css", css);    
  localStorage.setItem("user-html", html);    
};

function getLocalStorage(config) {
  var userCss = localStorage.getItem("user-css");            
  var userHtml = localStorage.getItem("user-html");            
  setEditors(
    userCss != null ? userCss : "unset",    
    userHtml != null ? userHtml : "unset");    

    return (userCss ==null && userHtml == null);
};

export {cmHtml, cmCss , init}

