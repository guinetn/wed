export function filterTemplates() {
  
  var filter, templates, div, item, i, txtValue;
  
  filter = this.value.toUpperCase();  
  templates = document.getElementById("categoryTemplatesList");
  div = templates.getElementsByTagName("div");

  // Treats lists items like an array, where each item can be accessed through      it's index
  for (i = 0; i < div.length; i++) {
    item = div[i];

    // All list item are checked to see if the value of the input, 
    // ignoring case, matches the inner text or inner html of the item.
    txtValue = item.textContent || item.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      // Displays list items that are a match, and nothing if no match
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }
}