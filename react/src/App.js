import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

/**
To receive push notifications you need:
1. a push service: that manages and receives the notification (the browsers offers a push service)
2. a push subscription: that provides a subscription URL endpoint and allows unsubscription from a push service.
3. a push server: a server that sends push messages to the push subscription endpoint, which is handled by the
 browser push service.

 https://itnext.io/react-push-notifications-with-hooks-d293d36f4836
 */

async function createNotificationSubscription() {
  //wait for service worker installation to be ready
  const serviceWorker = await navigator.serviceWorker.ready;
  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: "pushServerPublicKey"
  });
}

function App() {
  const [notificationSubscriptionURL, setNotificationSubscriptionURL] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={() => {
            Notification.requestPermission();
          }}>
          Enable notifications
        </button>
        <button
          onClick = {() => {
            // createNotificationSubscription()
            //     .then((url) => {
            //       setNotificationSubscriptionURL(url)
            //     })
            if (Notification.permission === 'granted') {
              navigator.serviceWorker.getRegistration()
                  .then((reg) => {
                    reg.showNotification('Hello world!');
                  });
            }}}>
          Create Notification Subscription
        </button>
        <div>{notificationSubscriptionURL}</div>
      </header>
    </div>
  );
}

export default App;
