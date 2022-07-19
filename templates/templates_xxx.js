/* Templates content 
name      Template description. For display/filter purpose
lang      Type of the template: js, css, html. For display/filter purpose
files     Template content are in .html and/or .css files comma separated
          A SERVER IS NEEDED
          Ignored if content is set
content   Raw template content
          NO SERVER is needed

x = { 'a': ['01','02','03'],
      'b': ['010','020','030'],
    }
x['a'] → ['01', '02', '03']
*/

export const templates = { 
'default': [
    { "name": "default", "lang": "html", "files": "default.html , default.css" },
    { "name": "empty", "lang": "html", "files": "empty.html , empty.css" }
]



,'html': [
  { "name": "details & summary", "lang": "html", "files": "details_summary.html" },
  { "name": "form placeholder", "lang": "html", "files": "form_placeholder.html, form_placeholder.css" },
  { "name": "cards", "lang": "html", "files": "cards.html , cards.css" },
  { "name": "progress", "lang": "html", "files": "progress.html , progress.css" }
]



,'js': [
    { "name": "alert", "lang": "js", "content": "alert('hi'); <!-- See templates_list.js. No files here, just \"content\":`xxxx` -->" },
    { "name": "event-delegation", "lang": "js", "files": "event-delegation.html , event-delegation.css" }
]


,'layout': [
    { "name": "bootstrap 5.1.3", "lang": "css", "files": "bootstrap-513.html , bootstrap-513.css" }
]



,'react': [
    { "name": "react", "lang": "html", "files": "react.html , react.css" }
]



,'vue': [
   { "name": "vue", "lang": "html", "files": "vue.html , vue.css" }
]




}