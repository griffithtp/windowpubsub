let topics: Record<string, unknown> = {};
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }

function subscribe(topic: string, listener: ({}) => {}) {
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

function processCustomEvent(topic: string, cb: ({}) => {}, result: any) {
  if (topic === result.type) {
    return cb({ topic, value: result.detail, eventObject: result });
  }
}

function processStorage(topic: string, cb: ({}) => {}, result: any) {
  if (topic === result.key) {
    return cb({ topic, value: result.newValue, eventObject: result });
  }
}

function publish(eventName: string, eventValue: any) {
  if (topics[eventName]) {
    window.localStorage.setItem(eventName, eventValue);
    const customEvent = new CustomEvent(eventName, { detail: eventValue });
    window.dispatchEvent(customEvent);
  }
}

function unsubscribe(subscribeKey: string) {
  window.localStorage.removeItem(subscribeKey);
  delete topics[subscribeKey];
}

export default {
  topics,
  publish,
  subscribe,
  unsubscribe
};
