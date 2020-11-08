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
  { name: "layout", lang: "js", files: "layout.html, layout.css" },
  { name: "article", lang: "html", files: "article.html , article.css" },
  { name: "alert", lang: "js", content: "alert('hi');" },
];

