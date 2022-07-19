const TEMPLATES_DIRNAME = 'templates';
const TEMPLATES_OUTFILE = 'templates.js';
const fs = require('fs');

const path = require('path');

const getFileList = (dirName) => {

    let files = [];
    const items = fs.readdirSync(dirName, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            files = [...files, ...getFileList(`${dirName}/${item.name}`)];
        } else {

            if (path.extname(item.name) == '.json') {
                const jsonFile = `${dirName}/${item.name}`;
                const rawdata = fs.readFileSync(jsonFile, 'utf8');
                // const data = JSON.parse(rawdata);
                files.push(`'${path.basename(path.dirname(jsonFile))}': ${rawdata}`);
            }
        }
    }

    return files;
};

const files =getFileList(TEMPLATES_DIRNAME);
let templates_list = `/* Templates content 
name      Template description. For display/filter purpose
lang      Type of the template: js, css, html. For display/filter purpose
files     Template content are in .html and/or .css files comma separated
          A SERVER IS NEEDED
          Ignored if content is set
content   Raw template content
          NO SERVER is needed
*/

export const templates = { 

${files.join(',')}
}`;
 let templatesOutFile = `${TEMPLATES_DIRNAME}/${TEMPLATES_OUTFILE}`;
fs.writeFile(templatesOutFile, templates_list, (err) => {
    if (err) throw err;
    console.log(`  --> ${templatesOutFile} created`);
});