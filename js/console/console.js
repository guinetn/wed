var previewConsole = document.querySelector('#textareaConsole');

document.querySelector("#clearConsole").addEventListener("click", clearConsole);

function clearConsole() {
  previewConsole.innerHTML = "";
}

// Redirect console.log to an html element. Extend if needed for warn/error…          
export function consoleHook(htmlTarget){
  const target = document.getElementById(htmlTarget);
  console.defaultLog = console.log.bind(console);   
  console.log = function () {
    // argument: local variable available within all non-arrow functions
    console.defaultLog.apply(console, arguments);         
    target.innerHTML = Array.from(arguments)[0] + "\n" + target.innerHTML; // last logs are on top          
  };
};

