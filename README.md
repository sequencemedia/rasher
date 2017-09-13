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
import Rasher from 'rasher'

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
import Rasher from 'rasher'

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


### Attaching handlers

In either case, whether we want to attach a `listener` or a `delegate`, we do the work with the function given to `then`.

The function given to `then` is the `callOut`.

The `callOut` is called once for each DOM element matching the query. It receives three arguments:

1. A plain object
2. An `index`
2. A `length`

So:
```
rasher
  .find('form input[type="radio"]')
  .then((r, index, length) => {
    /* */
  })
```

The plain object is named `r`. The `index` identifies the position of the current _element_ as though iterating through an array, while `length` is the total number of _elements_ to iterate over.

Or:
```
rasher
  .find('form input[type="radio"]')
  .delegateTo('form')
  .then((r, index, length) => {
    /* */
  })
```
The plain object is named `r`. Here, the `index` identifies the position of the current _delegate element_ as though iterating through an array, while `length` is the total number of _delegate elements_ to iterate over.

In either case, the plain object is the entry point for attaching handlers. It follows the pattern `on` ... `do`.

```
r.on('click').do((event) => { /* */ })
```

### Detaching handlers

Similarly, whether we want to detach a `listener` or a `delegate`, we do the work with the return value from `then`.

```
const R = rasher
  .find('form input[type="radio"]')
  .then((r, index, length) => {
    /* */
  })

R.stopAll()
```

The return value of `then` is a plain object, named `R`.

Invoking `stopAll` will detach handlers from all listener and delegate elements in the collection, `R`.

Individual handlers are identified by index, and invoking `listAll` will return a plain object with methods for accessing the items in the collection.

```
{
  size: () => { },
  node: (index) => { },
  type: (index) => { },
  stop: (index) => { },
  indexOf: (element) => { }
}
```

1. `size` returns the length of the whole collection
2. `node` returns the DOM element at this position
3. `type` returns the DOM event type at this position
4. `stop` removes the handler, as well as the object at this position in the collection

If `size()` returns `1` then we can call `stop(0)` to remove both the handler from the DOM and the item from the collection. In this case, the return value from `stop(0)` will be true.


Another invocation of `size()` will return `0`, and another invocation of `stop(0)` will return false.

We can find the position of a specific DOM element in the collection by giving it as an argument to `indexOf`. Since the collection is a dynamically resizing array, the position of each element in the collection might change whenever `stop` is called.
