# Todo

## State has not prop independency

Need to add counter property at.

But why? Shouldn't it update only other props and maintin counter untouched? 

```javascript
setTimeout(update, 15000, 
  { 
    greeting: 'HEY HEY', 
    whom:     'HI HI' 
  });
``` 

## Component in another file

JumboTron needs to be imported from other file, like `JumboTron.js`

Error: can't find hmtl function
