# wed
A web editor sided with editable samples for training/prototyping: <https://guinetn.github.io/wed> 

## Features

* Html/css/js editor (SublimeText keymap)  
* Realtime rendering as you type
* Console.log() outputs are catched and displayed
* Templates injection by simple click      
* Startup will restore last application state (css and html code panel)  
* Xss attacks are welcome (you're js code is run as it is, but you're on commands)

## Setup

### Running online

Just deploy the folder on an http server

### Running locally: install a local server

* Using 'Serve' npm package 
>npm i -g serve
>cd […project_path…]  
>serve 

* Using 'LiveServer' VSCode Extension  
Install [LiveServer, a VSCode extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)  
> Open the project's folder in VSCode
> Open index.html
> Click on VSCode status bar "Go live" or right-click on index.html → Open with LiveServer

![Wed screenshoot](wed.png)

<pre> <code>
+--------------++------------------+   
+   Templates  ++   Render zone    +   
+              ++------------------+   
+              ++  Editable code   +  
+              ++   HTML  |  CSS   +  
+              ++------------------+  
+              ++  Console output  +   
+--------------++------------------+   
</code></pre>

# CREATE YOUR OWN TEMPLATES

Templates are defined in `js\templates_list.js` and can be  
* a simple snippet 
* an html and/or css / javascript snippet

# TECH STACK

* VSCode + Extensions: LiveServer
* [CodeMirror V5.65.6](https://codemirror.net/)
* FlexBox Layout

## CONTRIBUTING

Wow, thanks to contribute to this project!   
New ideas, samples, forks...are welcome.  
So please just fork it, commit, push and send me a pull request to main.  

## CHANGELOG

See [CHANGELOG](CHANGELOG.md) for more details.


## License

This project is licensed under the [MIT License](LICENSE)
[MIT](https://choosealicense.com/licenses/mit/)

---

*created by Nicolas Guinet*


