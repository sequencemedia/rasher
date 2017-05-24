# Rasher

Rasher is a small set of utilities for managing browser DOM event listeners and delegates.

It's written in ES6 for projects which don't warrant React or Angular but may have lots of forms with user interactions.

Wherever possible, Rasher queries the DOM using the browser's native DOM methods; otherwise, it uses [Sizzle](https://sizzlejs.com/).

Rasher's components are exposed as ES6 classes, too, so if you want to you can use them directly.

## Rasher

### Listeners and Delegates

`Listeners` are event handlers bound to the element raising an event. You might attach a listener to each `<li />` in a `<ul />`, for example, or perhaps more appropriately it would be bound to a specific element inviting a particular action, like a button or a link.


`Delegates` are event handlers bound to a container as though they were bound to the contained element. You might attach a delegate to the `<ul />` for events raised by any of its `<li />` children. Perhaps it would be bound to a form, listening for changes to some radio inputs.

With Rasher, `listeners` and `delegates` are indistinguishable, and have only a simple difference in how they are applied.

#### Listeners 

```
import { 
  Rasher 
} from 'rasher/lib'

const rasher = new Rasher()

rasher
  .find('form input[type="submit"]')
  .then((r) => {
  	r.on('click').do((e) => { e.stop() })
  })
```

First, we use `find` to query the DOM for elements, using a selector.

Second, we use `then` to interact with the DOM elements which have been found.

#### Delegates 

```
import { 
  Rasher 
} from 'rasher/lib'

const rasher = new Rasher()

rasher
  .find('form input[type="radio"]')
  .delegateTo('form')
  .then((r) => {
  	r.on('click').do((e) => { e.stop() })
  })
```

Here, there is an additional method call between `find` and `then`: it is `delegateTo`.

We use `delegateTo` to query the DOM for an element, using a selector, exactly as we do with `find`.

<!--
### Attaching handlers

### Detaching handlers
-->