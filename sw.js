const CACHE='osel-lazaro-v4';
const CORE=['./impercope-ambiente.webp','./fibratado-ambiente.webp','./bronce-ambiente.webp','./oro-ambiente.webp','./plata-ambiente.webp','./esmalte-plata-ambiente.webp','./esmalte-oro-ambiente.webp','./cope-ambiente.webp','./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./logo.webp','./icon-180.png','./icon-192.png','./icon-512.png','./oro.webp','./plata.webp','./bronce.webp','./impercope.webp','./fibratado.webp','./esmalte-oro.webp','./esmalte-plata.webp','./cope.webp','./sala-realista.webp'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('osel-lazaro-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 if(request.mode==='navigate'){event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put('./index.html',copy)))}return response}).catch(()=>caches.match('./index.html')));return;}
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)))}return response})));
});


