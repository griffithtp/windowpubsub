interface IListenerCallback {
  (data: ICallbackData): any;
}

interface ICallbackData {
  topic: string;
  value: any;
  eventObject: any;
}

let topics: Record<string, unknown> = {};

function subscribe(topic: string, listener: IListenerCallback) {
  if (!topics.hasOwnProperty(topic)) {
    topics[topic] = listener;
  }
  window.addEventListener(
    topic,
    (eventData) => processCustomEvent(topic, listener, eventData),
    false
  );
  window.addEventListener(
    "storage",
    (eventData) => processStorage(topic, listener, eventData),
    false
  );
  return {
    unsubscribe: () => {
      unsubscribe(topic);
    },
  };
}

function processCustomEvent(topic: string, cb: IListenerCallback, result: any) {
  if (topic === result.type) {
    return cb({
      topic,
      value: result.detail,
      eventObject: result,
    } as ICallbackData);
  }
}

function processStorage(topic: string, cb: IListenerCallback, result: StorageEvent) {
  if (topic === result.key) {
    return cb({
      topic,
      value: result.newValue,
      eventObject: result,
    } as ICallbackData);
  }
}

function publish(topic: string, message: any) {
  if (topics[topic]) {
    window.localStorage.setItem(topic, message);
    const customEvent = new CustomEvent(topic, { detail: message });
    window.dispatchEvent(customEvent);
  }
}

function unsubscribe(topic: string) {
  window.localStorage.removeItem(topic);
  delete topics[topic];
}

export default {
  topics,
  publish,
  subscribe,
  unsubscribe,
};
