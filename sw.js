/* 앱 파일을 폰에 저장해 두고, 오프라인에서도 열리게 해요.
   파일을 고쳐서 다시 올릴 땐 아래 버전 숫자를 올리면 새 파일이 확실히 적용돼요. */
var CACHE = 'memo-v1';
var ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'icon-180.png'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;
  var url = new URL(req.url);
  if(url.origin !== location.origin) return;

  e.respondWith(
    caches.match(req).then(function(hit){
      var net = fetch(req).then(function(res){
        if(res && res.ok){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
        }
        return res;
      }).catch(function(){
        return hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined);
      });
      return hit || net;
    })
  );
});
