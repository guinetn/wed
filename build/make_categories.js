const fs = require('fs');
const path = require('path');

const CATEGORIES_FOLDER = 'categories';
const CATEGORIES_FILENAME = 'categories.js';
const CATEGORIES_OUTFILE = `${CATEGORIES_FOLDER}/${CATEGORIES_FILENAME}`;

/*
Allow the application to know all the files under each category 
Create categories/categories.js, an aggregation of all the 'templates/templates.json' files
categories: [

    category (folder in /categories)
    ↓
  'html': [

    category templates (categories/…cat…/templates.json files content)
        ↓
    { "name": "cards", "lang": "html", "files": "cards.html , cards.css" },
    { "name": "progress", "lang": "html", "files": "progress.html , progress.css" }
     …
   ],
   'css': …

]
*/
const aggregateCategories = (folder) => {

    let cats = [];
    const items = fs.readdirSync(folder, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            cats = [...cats, ...aggregateCategories(`${folder}/${item.name}`)];
        } else {

            // Aggregate all templates.json cats    
            if (path.extname(item.name) == '.json') {
                const jsonFile = `${folder}/${item.name}`;
                const rawdata = fs.readFileSync(jsonFile, 'utf8');

                cats.push(`'${path.basename(path.dirname(jsonFile))}': ${rawdata}`);
            }
        }
    }

    return cats;
};

const categories_data = aggregateCategories(CATEGORIES_FOLDER);
let categories = `/* Categories have templates 
templates json object: 
    name      Template description. For display/filter purpose
    lang      Type of the template: js, css, html. For display/filter purpose
    files     Template content are in .html and/or .css files comma separated. Ignored if content is set
    content   Raw template content.It set, it will overrides files 
*/

export const categories = { 

${categories_data.join(',')}
}`;

fs.writeFile(CATEGORIES_OUTFILE, categories, (err) => {
    if (err) {
        console.error(`  --> ${CATEGORIES_OUTFILE} created`);
        throw err;
    }
    console.log(`  --> ${CATEGORIES_OUTFILE} created`);
});