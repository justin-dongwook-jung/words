let month = new Date().getMonth();

Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    const notification = new Notification("Hi there!");
  }
});
