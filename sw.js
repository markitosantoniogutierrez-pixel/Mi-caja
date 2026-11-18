const C='mi-caja-v14',F=['./','index.html','manifest.webmanifest','icon.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;if(new URL(q.url).origin!==location.origin)return;
const net=fetch(q,{cache:'no-store'}).then(r=>{if(r.ok){const k=r.clone();caches.open(C).then(c=>c.put(q,k))}return r});net.catch(()=>{});
const cached=()=>caches.match(q,{ignoreSearch:true}).then(c=>c||caches.match('index.html'));
e.respondWith(Promise.race([net,new Promise(r=>setTimeout(()=>r(null),3000))]).then(r=>r||cached().then(c=>c||net)).catch(()=>cached()))});
