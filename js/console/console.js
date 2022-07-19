var console_ui_element = null;

function clearConsole() {
  console_ui_element.innerHTML = "";
}

// Redirect javascript console.log/info/error to an html element
export function setup_console_Hook(ui_element, clear_ui_element) {

  console_ui_element = ui_element;
  clear_ui_element.addEventListener("click", clearConsole);

  console.defaultLog = console.log.bind(console);   
  console.log = function () {
    // argument: local variable available within all non-arrow functions
    console.defaultLog.apply(console, arguments);         
    console_ui_element.innerHTML = Array.from(arguments)[0] + "\n" + console_ui_element.innerHTML; // last logs are on top          
  };

  console.info = function () {
    // argument: local variable available within all non-arrow functions
    console.defaultLog.apply(console, arguments);         
    console_ui_element.innerHTML = Array.from(arguments)[0] + "\n ℹ️ " + console_ui_element.innerHTML; // last logs are on top          
  };

  console.error = function () {
    // argument: local variable available within all non-arrow functions
    console.defaultLog.apply(console, arguments);         
    console_ui_element.innerHTML = Array.from(arguments)[0] + "\n 🔥 " + console_ui_element.innerHTML; // last logs are on top          
  };
};

