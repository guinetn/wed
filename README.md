# wed
A web editor sided with editable samples for training/prototyping: <https://guinetn.github.io/wed> 

## Features
* Html/css/js editor   
* Realtime modifications rendering
* Console outputs catched and displayed
* Templates injection by simple click      
* Local storage to restore application state 

## Running Locally

### Install a server

* Serve
>npm i -g serve

>cd […folder_path…]
>serve 

* VSCode Extension  
Install [LiveServer, a VSCode extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)  
> Open index.html  
> Click on status bar "Go live" or right-click on index.html → Open with LiveServer

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
