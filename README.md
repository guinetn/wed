# wed
A web editor sided with editable samples for training

## Features
* Html/css/js Editor   
* Real time modifications rendering
* Console outputs catched and displayed
* Templates injection by simple click      
* Local storage to restore application state 

## Start

- ***Try it online***: https://guinetn.github.io/wed  
- From VSCode  
> Open index.html  
> Click on status bar "Go live" or  
> On index.html, right-click → Open with [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)  



![Wed screenshoot](wed.png)

<pre> <code>
+------------------+    +------------------+  
+   Render zone    +    +     TEMPLATES    +  
+------------------+    .                  .  
+------------------+  
+  Editable code   +  
+------------------+  
[Commands]    
+------------------+  
+  console output  +    .                  .  
+------------------+    +------------------+  
</code></pre>

# Templates

Defined in ***js\templates_list.js***  
Can be  
* a simple snippet (no server is required)
* an html and/or css page (then a server is required. LiveServer in vscode is enough)

# Development tools

* VSCode + LiveServer
* CodeMirror