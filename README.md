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
<div class="someClass someClass2" id="div_1">IN DIV<br><span style="color:red">IN SPAN</span></div>
```

# view object
