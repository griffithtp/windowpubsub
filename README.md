
# windowpubsub

[![npm version](https://img.shields.io/npm/v/windowpubsub.svg?style=flat)](https://www.npmjs.com/package/windowpubsub)
[![npm](https://img.shields.io/npm/dm/windowpubsub.svg)]()
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)]()

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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
