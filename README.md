# wed
A web editor sided with editable samples

# ROADMAP

# V 0.0.1 - A SINGLE PAGE 
 
 <code>
+------------------+    +------------------+  
+   Render zone    +    +     TEMPLATES    +  
+------------------+    .                  .  
+------------------+  
+  Editable code   +  
+------------------+  
[Render]    
+------------------+  
+  console output  +    .                  .  
+------------------+    +------------------+  
</code>

☐ Html/css/js Editor   
☐ Click [Render] → Editor content is rendered as html in render zone  

# V 0.0.2 - Add console outputs

If the render zone make some "console.log()", catch them in the console output  

# V 0.0.3 - Add some templates 
 
☐ Templates are  
    - independant js/html/css snippets or complete html page  
    - grouped in a json object that will be rendered as <list><a> in the "Templates" zone  
    - original files are in "assets/templates"  
    - a gulp task or powershell script compile these files to a json object rendered as a clickable list in the templates zone  
☐ Click on a template → its code is added to editable zone  
   
# V 0.0.4 - 

☐ Local storage for retrieve last modified app state at re-open

# V 0.1.0 - Use "Code mirror" editor?

☐ Better editor

# V 0.1.1 -  Add Tabs
 ___  ___   
/   \/   \                    ← Tabs   
+------------------+    +------------------+  
+  Editable code   +    +     TEMPLATES    +  
+------------------+    .                  .  
  
+------------------+  
+   Render zone    +  
+------------------+  
  
+------------------+  
+  console output  +    .                  .  
+------------------+    +------------------+  
