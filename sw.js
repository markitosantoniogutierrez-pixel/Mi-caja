const C='mi-caja-v6',F=['./','index.html','manifest.webmanifest','icon.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!=='ocr-v1').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);
if(u.origin!==location.origin){if(/jsdelivr|projectnaptha/.test(u.host)){e.respondWith(caches.open('ocr-v1').then(c=>c.match(q).then(r=>r||fetch(q).then(x=>{if(x.ok||x.type==='opaque')c.put(q,x.clone());return x}))))}return}
e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q).catch(()=>caches.match('index.html'))))});
