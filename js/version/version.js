import {fetchFile} from "../utilities/utilities.js";

let version = {
    current:null,
    latest: null,

    is_dnew_version_available: function() {
      return this.latest != this.current;
    },

    // Will check the url './config.json'
    get_latest: async function(json_config_url) {
      await fetchFile(json_config_url, this.extractLatestVersion);
    },

    extractLatestVersion : function(online_data_version) {
        // Parse config.json   ' "current": "1.1.0",  '
        const latestFound = /(?:["']current["'] ?: ?["'])(?<version>(\d+\.*){3})(?:")/u.exec(online_data_version).groups.version;
        version = {...version, 'latest': latestFound};
    }     
}

export { version } 