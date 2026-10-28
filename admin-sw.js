/* Admin only. Fetch live HTML; do not store appointment or API data. */
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url),page=new URL('./admin.html',self.location.href);
  if(event.request.method!=='GET'||event.request.mode!=='navigate'||url.origin!==page.origin||url.pathname!==page.pathname)return;
  event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>new Response(
    '<!doctype html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>แอดมินคลินิก</title></head>'+
    '<body style="font-family:system-ui,sans-serif;line-height:1.7;background:#f4f7f6;color:#203c37;padding:40px 24px">'+
    '<h1 style="font-size:24px">ยังไม่ได้เชื่อมต่ออินเทอร์เน็ต</h1><p>เชื่อมต่ออินเทอร์เน็ตเพื่อดูตารางคิวล่าสุด</p>'+
    '<button onclick="location.reload()" style="font:inherit;padding:12px 24px;border:0;border-radius:12px;color:white;background:#1f6f68">ลองใหม่</button></body></html>',
    {status:200,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})));
});
