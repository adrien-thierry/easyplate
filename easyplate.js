// The main and unique function !
function renderView(viewObj, parent)
{
  // if parent is null or undefined, we stock outerHTML of rendered element in
	var viewString = "";
   for(var v in viewObj)
   {
	  // if no tag, set it to div by default
	  if(!viewObj[v].tag) viewObj[v].tag = "div";
	  
      // create obj with tag value
      var element = document.createElement(viewObj[v].tag);
	  
	  // loop on each element
     for(var a in viewObj[v].attribute)
     {
          // set each attribute for element
          element.setAttribute(a, viewObj[v].attribute[a]);
     }
     
	 // if innerHTML, set it
	 if(viewObj[v].innerHTML)
	{
		element.innerHTML = viewObj[v].innerHTML;
	}
		
	// if child, we create childs
	if(viewObj[v].child)
	{
		// create each child element with parent = current scope element recursively
		renderView(viewObj[v].child, element)
	}
		
    // here append child to parent, you can use insertBefore either etc
    if(parent) parent.appendChild(element);
	  else viewString += element.outerHTML;
   }
   // return viewString in all case
   return viewString;
}
