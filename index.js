let month = new Date().getMonth();

Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    let i = 0;
      // Using an interval cause some browsers (including Firefox) are blocking notifications if there are too much in a certain time.
    const interval = setInterval(() => {
    // Thanks to the tag, we should only see the "Hi! 9" notification
    const n = new Notification(`Hi! ${i}`, { tag: "soManyNotification" });
    if (i === 9) {
      clearInterval(interval);
    }
    i++;
    }, 200);
  }
});
