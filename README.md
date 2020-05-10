localpubsub
===

Simple pubsub lightweight library using Window event listener and storage event.

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