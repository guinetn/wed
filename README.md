# wed
A web editor sided with editable samples for training

* Html/css/js Editor   
* Real time modifications rendering
* Console outputs catched and displayed
* Templates injection by simple click      
* Local storage to restore application state 

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

* VSCode [ + LiveServer ]

