let topics = {};

function subscribe(topic, listener) {
  if (!topics.hasOwnProperty(topic)) {
    topics[topic] = listener;
  }
  window.addEventListener(
    topic,
    eventData => processCustomEvent(topic, listener, eventData),
    false
  );
  window.addEventListener(
    "storage",
    eventData => processStorage(topic, listener, eventData),
    false
  );
  return {
    unsubscribe: () => {
      unsubscribe(topic);
    }
  };
}

function processCustomEvent(topic, cb, result) {
  if (topic === result.type) {
    return cb({ topic, value: result.detail, eventObject: result });
  }
}

function processStorage(topic, cb, result) {
  if (topic === result.key) {
    return cb({ topic, value: result.newValue, eventObject: result });
  }
}

function publish(eventName, eventValue) {
  if (topics[eventName]) {
    window.localStorage.setItem(eventName, eventValue);
    const customEvent = new CustomEvent(eventName, { detail: eventValue });
    window.dispatchEvent(customEvent);
  }
}

function unsubscribe(subscribeKey) {
  window.localStorage.removeItem(subscribeKey);
  delete topics[subscribeKey];
}

export default {
  topics,
  publish,
  subscribe,
  unsubscribe
};
