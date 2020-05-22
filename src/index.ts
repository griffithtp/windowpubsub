interface IListenerCallback {
  (data: IWindowPubSubData): any;
}

/**
 * IWindowPubSubData interface
 */
export interface IWindowPubSubData {
  topic: string;
  value: any;
  eventObject: any;
}

let topics: Record<string, unknown> = {};

/**
 * Current list of topics.
 */
function getTopics() {
  return topics;
}

/**
 * Subscribe to a topic
 * @param topic Name of topic to subscribe
 * @param listenerFunction Listener callback function
 */
function subscribe(topic: string, listenerFunction: IListenerCallback) {
  if (!topics.hasOwnProperty(topic)) {
    topics[topic] = listenerFunction;
  }
  window.addEventListener(
    topic,
    (eventData) => processCustomEvent(topic, listenerFunction, eventData),
    false
  );
  window.addEventListener(
    "storage",
    (eventData) => processStorage(topic, listenerFunction, eventData),
    false
  );
  return {
    unsubscribe: () => {
      unsubscribe(topic);
    },
  };
}

function processCustomEvent(
  topic: string,
  listenerFunction: IListenerCallback,
  result: any
) {
  if (topic === result.type) {
    return listenerFunction({
      topic,
      value: result.detail,
      eventObject: result,
    } as IWindowPubSubData);
  }
}

function processStorage(
  topic: string,
  listenerFunction: IListenerCallback,
  result: StorageEvent
) {
  if (topic === result.key) {
    return listenerFunction({
      topic,
      value: result.newValue,
      eventObject: result,
    } as IWindowPubSubData);
  }
}

/**
 * Publish message on given topic.
 * @param {string} topic Name of topic to publish message to.
 * @param {any} message Your topic message.
 * @returns {boolean} True if `message` successfully published on the `topic`.
 */
function publish(topic: string, message: any): boolean {
  if (topics[topic]) {
    window.localStorage.setItem(topic, message);
    const customEvent = new CustomEvent(topic, { detail: message });
    return window.dispatchEvent(customEvent);
  }
  return false;
}

/**
 * Unsubscribe and remove topic from topics list.
 * @param topic Name of topic to unsubscribe.
 * @returns {boolean} True if topic is successfully removed topic from topics list.
 */
function unsubscribe(topic: string): boolean {
  try {
    window.localStorage.removeItem(topic);
    delete topics[topic];
  } catch (error) {
    return false;
  }
  return true;
}

export default {
  getTopics,
  publish,
  subscribe,
  unsubscribe,
};
