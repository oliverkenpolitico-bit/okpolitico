// Service worker de OKpolítico
const CACHE='okp-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/offline.html'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate')e.respondWith(fetch(e.request).catch(()=>caches.match('/offline.html')))});
self.addEventListener('push',e=>{e.waitUntil(fetch('https://okp-avisos.okpolitico.workers.dev/ultimo',{cache:'no-store'}).then(r=>r.json()).catch(()=>({})).then(d=>self.registration.showNotification(d.titulo||'OKpolítico',{body:d.cuerpo||'Hay una noticia nueva.',icon:'/img/icono-192.png',badge:'/img/icono-192.png',tag:String(d.t||'okp'),data:{url:d.url||'/'}})))});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=new URL(e.notification.data.url||'/',location.origin);u.searchParams.set('utm_source','notificacion');e.waitUntil(clients.openWindow(u.href))});
