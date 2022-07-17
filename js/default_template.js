export const default_template = {
    initialCss: ".wrapper {\n	display: grid;\n    grid-gap: 10px;\n	grid-template-columns: 100px 100px 100px;\n	background-color: #fff;\n	color: #444;\n}\n.box {\n	background-color: #444;\n	color: #fff;\n	border-radius: 5px;\n	padding: 20px;\n	font-size: 150%;\n}\n.a {\n	grid-column: 1/3;\n}\n.b {\n	grid-column: 3 ;\n	grid-row: 1/ span 2;\n}\n.c {\n	grid-column: 1 ;\n	grid-row: 2 ;\n}\n.d {\n	grid-column: 2 ;\n	grid-row: 2 ;\n}",
    
    initialHtml: '<div class="wrapper">\n  <div class="box a">A</div>\n  <div class="box b">B</div>\n  <div class="box c">C</div>\n  <div class="box d">D</div>\n</div>\n<script>console.log("Catch console.log ! ")</script>\n'
}