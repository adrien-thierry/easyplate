/*
  Copyright (C) 2016  Adrien THIERRY
  http://seraum.com
  License MIT
*/

/**
 * renderView - The unique method of easyplate :)
 * @method
 * @param  {object} viewObj The view object
 * @param  {element} parent The parent DOM element, could be empty, so return a string
 * @param  {object} dataObj The data that could be mapped to the view : each key is mapped to innerHTML element in viewObj, if dataObj[key] is an object, this object is used in recursivity
 * @param {object} optionObj An object with rendering options
 * @return {string} Return a string of generated html
 */
function renderView(viewObj, parent, dataObj, optionObj)
{
  var once = false;
  // for speed, no need to check if empty or not
  if(!dataObj) dataObj = {};
  if(!optionObj) optionObj =
  {
    // default function, override it for fit your needs
    setValue: function(element, value)
    {
      switch (element.tagName)
      {
        case "INPUT":
          element.setAttribute("value", value);
          break;
        case "IMG":
          element.setAttribute("src", value);
          break;
        case "A":
          element.setAttribute("href", value);
          break;
        default:
          element.innerHTML = value;
          break;
      }
    }
  };
  // if parent is null or undefined, we stock outerHTML of rendered element in
	var viewString = "";

  if(dataObj.constructor === Array)
  {
    // if we have an array, we loop on it
    for(var i = 0; i < dataObj.length; i++)
    {
      viewString += renderView(viewObj, parent, dataObj[i], optionObj);
    }
  }
  else if(typeof dataObj == "object")
  {
    // if we have an object, we construct our view
    for(var v in viewObj)
    {

      // if data is an array
      if(dataObj[v] && dataObj[v].constructor === Array) viewObj[v].number = dataObj[v].length;

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
        if(dataObj[v] && dataObj[v].constructor === Array)
        {
          if(typeof dataObj[v][i] == "object")
          {
            once = true;
            renderView(viewObj[v].child, element, dataObj[v][i], optionObj);
          }
          else
          {
            optionObj.setValue(element, dataObj[v][i]);
          }
        }

        // else set data if string, number etc
        else if(dataObj[v] && typeof dataObj[v] != "object")
        {
          optionObj.setValue(element, dataObj[v]);
        }

        // if child, we create childs
        if(!once && viewObj[v].child)
        {
          // create each child element with parent = current scope element recursively
          if(dataObj[v] && dataObj[v].constructor === Array) renderView(viewObj[v].child, element, {}, optionObj);
          else if(dataObj[v] && typeof dataObj[v] == "object") renderView(viewObj[v].child, element, dataObj[v], optionObj);
          else renderView(viewObj[v].child, element, dataObj, optionObj);
        }

        // here append child to parent, you can use insertBefore either etc
        if(parent) parent.appendChild(element);
        else viewString += element.outerHTML;
      }

     }
   }
   else
   {
     // dataObj is bad, so we replace it by {}
     viewString += renderView(viewObj, parent, {}, optionObj);
   }

   // return viewString in all case
   return viewString;
}
