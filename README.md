# easyplate
The simpliest engine for template/view rendering in JS

```javascript
renderView(myView);
```

Yes, that's all. myView is a very simple js object :

```javascript
var myView =
var myView =
{
   "div1":
    {
       "tag": "div",
       "attribute":
       {
           "class": "someClass someClass2",
           "id": "div_1"
       },
	   "innerHTML": "IN DIV",
       "child":
       {
			"br1":
			{
				"tag": "br"
			},
           "span1":
		   {
				"tag": "span",
				"innerHTML": "IN SPAN",
				"attribute":
				{
					"style":"color:red"
				}
		   }
       }
    },
	"div2":
	{
		// default tag value set to "div"
		"attribute":
		{
			"id": "div_2"
		},
		"innerHTML": "IN DIV 2"
	}
}
```

the result is : 
```html
<div class="someClass someClass2" id="div_1">IN DIV<br><span style="color:red">IN SPAN</span></div><div id="div_2">IN DIV 2</div>
```

# view object

View object is a simple JS object. "child" designed the child of current object, "attribute" is the attributes of current object, "tag" is the tag of the current object (a, div, span ...), and innerHTML is the content of current object in string.

# renderView parameters

The renderView function take two parameters :
- viewObj, the object we want to render,
- parent, the parent element in which we want append the view. If parent is empty (== undefined || null), then renderView return a string.
