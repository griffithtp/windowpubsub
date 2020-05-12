windowpubsub
===

Simple and lightweight Pub/Sub library using Window event listener and storage event with zero dependencies.

This enable applications to subscribe to events across different windows or tabs.
Some use cases are for shopping carts updates or theme switching.

#### Subscribing
`subscribe(topic, callbackFunction);`


```
import localpubsub from 'localpubsub';

function displayMessage(data) {
  console.log(data)
}
localpubsub.subscribe('my topic', displayMessage);
```

#### Publishing
`publish(topic, message);`

```
localpubsub.publish('my topic', 'Hello');
```

#### Unsubscribe
`unsubscribe(topic);`

```
const subscription = localpubsub.subscribe(topic, displayMessage);
subscription.unsubscribe();

localpubsub.unsubscribe(topic);
```
