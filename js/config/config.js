import {fetchJsonFile} from "../utilities/utilities.js";
import {version} from "../version/version.js";

export let config = {

    ...{version},

    setup: async function(json_config_file, callback) {
        await fetchJsonFile(json_config_file, this.set_config);
        await this.version.get_latest(config.version.check_path);
        callback();
    },

    set_config: function(json_config) {
        config.app_url = json_config.app_url;
        config.categories_directory = json_config.categories_directory;
        config.version.current = json_config.version.current;
        config.version.check_path = json_config.version.check_path;
    },

    update_message: function() {
        return `Wed ${config.version.latest} is available at ${config.app_url}. Current is Wed ${config.version.current}`;
    }
}
