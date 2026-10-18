const CACHE_NAME = 'gastos-cache-v4';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // cache:'reload' ignora o cache HTTP do navegador, garantindo arquivos frescos
      Promise.all(APP_SHELL.map((url) =>
        fetch(new Request(url, { cache: 'reload' })).then((res) => cache.put(url, res))
      ))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Não intercepta chamadas ao Firebase/Firestore, só o "shell" do app
  if (event.request.url.includes('firestore.googleapis.com') ||
      event.request.url.includes('firebaseio.com') ||
      event.request.url.includes('gstatic.com')) {
    return;
  }
  if (event.request.method !== 'GET') return;
  // Rede primeiro (sempre pega a versão nova), cache só como reserva offline
  event.respondWith(
    fetch(event.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(()=>{});
      return res;
    }).catch(() => caches.match(event.request))
  );
});
