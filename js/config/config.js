import {fetchJsonFile} from "../utilities/utilities.js";
import {version} from "../version/version.js";

export let config = {

    setup: async function(json_config_file, callback) {
        await fetchJsonFile(json_config_file, this.set_config);
        await version.get_latest(config.version.check_path);
        callback();
    },

    set_config: function(json_config) {
        config = Object.assign(config, json_config);
    },

    update_message: function() {
        return `Wed ${config.version.latest} is available at ${config.app_url}. Current is Wed ${config.version.current}`;
    }
}
