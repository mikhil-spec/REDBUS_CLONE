self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch { data = { title: 'RedBus', body: event.data?.text() || 'You have a new journey update.' }; }
  const title = data.title || 'RedBus Journey Update';
  const options = {
    body: data.body || 'You have a new notification.',
    icon: '/assets/logo.png',
    badge: '/assets/logo.png',
    data: data.url || '/notifications',
    requireInteraction: false
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = event.notification.data || '/notifications';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    for (const client of clientList) {
      if ('focus' in client) {
        client.navigate(target);
        return client.focus();
      }
    }
    return clients.openWindow(target);
  }));
});
