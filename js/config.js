import {version} from "./version/version.js";

function version_check () {
    version.get_tatest_version_available(update_ui_version);    
}

function create_update_message () {
    return `Wed ${version.config.latest} is available at ${version.config.app_url}. Current is Wed ${version.config.current}`;
}

function update_ui_version () {

    document.querySelector('#wed-version').innerText = version.config.current;
    
    if (version.is_new_version_available()) {
        const update_message = create_update_message(); 
        console.log(update_message);
        
        const updateSign = document.querySelector('#update_sign')
        updateSign.classList.remove('hidden');
        updateSign.title = update_message;
    }
}  

export const config = {
    templatesDirectory: "templates",
    ...{version},
    version_check
}
    