/* Templates content 
name      Template description. For display/filter purpose
lang      Type of the template: js, css, html. For display/filter purpose
files     Template content are in .html and/or .css files comma separated
          A SERVER IS NEEDED
          Ignored if content is set
content   Raw template content
          NO SERVER is needed
*/
export const templates = [
  { name: "details & summary", lang: "css", files: "details_summary.html" },
  { name: "form placeholder", lang: "js", files: "form_placeholder.html, form_placeholder.css" },
  { name: "cards", lang: "html", files: "cards.html , cards.css" },
  { name: "alert", lang: "js", content: "alert('hi'); <!-- See templates_list.js. No files here, just content:`xxxx` -->" },
  { name: "progress", lang: "html", files: "progress.html , progress.css" },
];

