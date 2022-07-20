const fs = require('fs');
const path = require('path');

const CONFIG_FILE = './config.json';
const TARGET_FILE = './js/config/config.js';

/*
*/
const inject_json_in_config = () => {
    
    const rawdata = fs.readFileSync(CONFIG_FILE, 'utf8');
    const jsondata = JSON.parse(rawdata);
    console.log(jsondata);
    //cats.push(`'${path.basename(path.dirname(jsonFile))}': ${rawdata}`);

    const configFile = fs.readFileSync(TARGET_FILE, 'utf8');
    configFile.replace('const config_json = { /* injected at build */};', jsondata)
    console.log(configFile);


};

inject_json_in_config_xxxxnot_used_xxx();

// const categories_data = aggregateCategories(CATEGORIES_FOLDER);
// let categories = `/* Categories have templates 
// templates json object: 
//     name      Template description. For display/filter purpose
//     lang      Type of the template: js, css, html. For display/filter purpose
//     files     Template content are in .html and/or .css files comma separated. Ignored if content is set
//     content   Raw template content.It set, it will overrides files 
// */

// export const categories = { 

// ${categories_data.join(',')}
// }`;

// fs.writeFile(CATEGORIES_OUTFILE, categories, (err) => {
//     if (err) {
//         console.error(`  --> ${CATEGORIES_OUTFILE} created`);
//         throw err;
//     }
//     console.log(`  --> ${CATEGORIES_OUTFILE} created`);
// });