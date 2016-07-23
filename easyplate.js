/**
 * renderView - The unique method of easyplate :)
 * @method
 * @param  {object} viewObj The view object
 * @param  {element} parent The parent DOM element, could be empty, so return a string
 * @param  {object} dataObj The data that could be mapped to the view : each key is mapped to innerHTML element in viewObj
 * @return {string} Return a string of generated html
 */
function renderView(viewObj, parent, dataObj)
{

  // if parent is null or undefined, we stock outerHTML of rendered element in
	var viewString = "";

  for(var v in viewObj)
  {

    // if data is an array
    if(dataObj && dataObj[v] && dataObj[v].constructor === Array) viewObj[v].number = dataObj[v].length;

    // number of iterations of this object
    if(viewObj[v].number === undefined) viewObj[v].number = 1;

	  // if no tag, set it to div by default
	  if(!viewObj[v].tag) viewObj[v].tag = "div";

    for(var i = 0; i < viewObj[v].number; i++)
    {
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

      // if data is an aray, override innerHTML with data i
      if(dataObj && dataObj[v] && dataObj[v].constructor === Array) element.innerHTML = dataObj[v][i];

      // else set data if string, number etc
      else if(dataObj && dataObj[v]) element.innerHTML = dataObj[v];

      // if child, we create childs
      if(viewObj[v].child)
      {
        // create each child element with parent = current scope element recursively
        renderView(viewObj[v].child, element, dataObj);
      }

      // here append child to parent, you can use insertBefore either etc
      if(parent) parent.appendChild(element);
      else viewString += element.outerHTML;
    }

   }

   // return viewString in all case
   return viewString;
}
