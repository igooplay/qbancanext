import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCc9xWmBq8bx7pJbulmyOSXcUNI7xDlRUI",
  authDomain: "voubedelivery.firebaseapp.com",
  projectId: "voubedelivery",
  storageBucket: "voubedelivery.appspot.com",
  messagingSenderId: "528852790709",
  appId: "1:528852790709:web:130f60a3248d7d69bc3dfc",
  measurementId: "G-F6BQL92T9M"
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }

    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "AAAAeyIVLbU:APA91bEjHSgCPBWlvwUwF7JTx4o7w-e5Bt6HnIUGG54d0Z6bgopBp_U5IXxAgRst_OGq1ZK0RnLj75GAEMzoH9IMdnDxrihK2arzjW6i0qZZWWcOzv4k6Uw_BUXx2nz2T3W2yxg5CRDd",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
