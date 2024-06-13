import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import logo from "./logo.svg";
import "./App.css";

function App() {
  async function requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        // Generate token
        const token = await getToken(messaging, {
          vapidKey: "",
        });
        console.log("FCM Token:", token);
      } else if (permission === "denied") {
        alert("You denied the notification permission");
      }
    } catch (error) {
      console.error("Error getting permission or token:", error);
    }
  }

  useEffect(() => {
    async function registerServiceWorker() {
      try {
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );
        console.log(
          "Service Worker registration successful with scope: ",
          registration.scope
        );

        // Request notification permission
        await requestPermission();
      } catch (err) {
        console.error("Service Worker registration failed: ", err);
      }
    }

    registerServiceWorker();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
