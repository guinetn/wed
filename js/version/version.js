import {version_config} from "./version_config.js";
import {httpGet} from "../utilities/utilities.js";

let version = {
    config: version_config,
    
    update_ui: null,

    is_new_version_available: function() {
      return version.config.latest != version.config.current;
    },

    get_latest_version_available: function(ui_callback) {
      this.update_ui = ui_callback;
      httpGet(this.config.version_check_path, this.parse_online_version, console.err);
    },

    parse_online_version : function(online_data_version) {
        // Parse js/version/version_config.js    'export const version = "0.1.0";'
        const latestFound = /(?:current ?= ?")(?<version>(\d+\.*){3})(?:")/u.exec(online_data_version).groups.version;
        version.config.latest  = latestFound;
        version.update_ui();
    }     
}

export { version } 