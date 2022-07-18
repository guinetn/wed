import {version, version_check_path} from "./version.js";
import {httpGet} from "./utilities.js";

function version_check () {
	httpGet(version_check_path, versions_compare, console.err);
}

function versions_compare(online_version) {
  console.info(online_version);
}

export { version, version_check}