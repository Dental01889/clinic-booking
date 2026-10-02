/* ตัวช่วยให้ติดตั้งหน้าแอดมินเป็นแอปบนมือถือได้
   ไม่เก็บข้อมูลคนไข้ไว้ในเครื่อง — ทุกครั้งที่เปิดจะดึงข้อมูลล่าสุดจากระบบเสมอ */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;          // อย่างอื่นปล่อยผ่านตามปกติ
  e.respondWith(fetch(e.request).catch(() => new Response(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<body style="font-family:sans-serif;padding:40px 24px;color:#1D2A2E;background:#F4F7F6">' +
    '<h2>ไม่มีอินเทอร์เน็ต</h2><p>เชื่อมต่อเน็ตแล้วกดลองใหม่</p>' +
    '<button onclick="location.reload()" style="padding:12px 20px;border:0;border-radius:10px;background:#1F6F68;color:#fff;font-size:16px">ลองใหม่</button>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
