import {default_template} from "./default_template.js";
import { version, version_check} from "./version_check.js";

export const config = {
    templatesDirectory: "templates",
    version_show: () => { document.querySelector('#wed-version').innerText = version },
    version_check,
    ...default_template
}
    