import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const PORT = 3000;
const CONFIG_FILE = path.join(process.cwd(), 'rss-config.json');

const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auto-Blogger Admin Dashboard</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f7f6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; }
        h1 { color: #7c3aed; }
        label { font-weight: bold; display: block; margin-bottom: 5px; }
        select, input[type="text"] { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 15px; font-size: 16px; }
        button { background: #7c3aed; color: white; border: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; cursor: pointer; font-weight: bold; transition: 0.3s; }
        button:hover { background: #6d28d9; }
        .btn-run { background: #10b981; width: 100%; font-size: 18px; margin-top: 10px; }
        .btn-run:hover { background: #059669; }
        #status { margin-top: 15px; padding: 10px; border-radius: 5px; display: none; font-weight: bold;}
        .success { background: #d1fae5; color: #065f46; }
        .error { background: #fee2e2; color: #991b1b; }
        .loading { background: #e0e7ff; color: #3730a3; }
        pre { background: #1e293b; color: #f8fafc; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 14px; }
        .info-box { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 10px 15px; margin-bottom: 20px; font-size: 0.95rem;}
    </style>
</head>
<body>

    <h1>🤖 Faceless Auto-Blogger Admin</h1>
    
    <div class="info-box">
        <b>Mẹo:</b> Việc hẹn giờ chạy tự động mỗi ngày đã được cấu hình trên GitHub Actions. Cứ đúng 8 giờ sáng, GitHub sẽ tự động lấy nguồn RSS dưới đây để viết bài đăng lên web bạn. Bạn chỉ dùng trang này để thay đổi Nguồn hoặc muốn ép Bot chạy ngay lập tức.
    </div>

    <div class="card">
        <h3>1. Cài Đặt Nguồn Tin (RSS)</h3>
        <label>Chọn nguồn RSS đề xuất:</label>
        <select id="preset-rss" onchange="updateCustomRss()">
            <option value="https://www.artificialintelligence-news.com/feed/">Artificial Intelligence News (Tin AI tổng hợp - Khuyên dùng)</option>
            <option value="https://www.unite.ai/feed/">Unite.AI (Cập nhật tool cực nhanh)</option>
            <option value="https://www.marktechpost.com/feed/">MarkTechPost (Chuyên sâu về công nghệ)</option>
            <option value="https://techcrunch.com/category/artificial-intelligence/feed/">TechCrunch AI (Tin chuẩn, SEO mạnh)</option>
            <option value="custom">Tự nhập link khác...</option>
        </select>

        <label>Hoặc tự nhập URL RSS của bạn:</label>
        <input type="text" id="custom-rss" placeholder="https://example.com/feed" />
        
        <button onclick="saveConfig()">💾 Lưu Cài Đặt</button>
        <div id="save-status" style="margin-top: 10px; color: green; display: none;">✅ Đã lưu cấu hình thành công! Hãy Commit code lên GitHub để áp dụng lịch chạy tự động.</div>
    </div>

    <div class="card">
        <h3>2. Kích Hoạt Viết Bài Bằng AI (Thủ Công)</h3>
        <p>Bấm nút dưới đây để Bot bắt đầu đọc tin mới nhất và dùng AI viết bài Review. File sẽ được tự động lưu vào thư mục <code>/tools/</code>.</p>
        <button class="btn-run" onclick="runBot()" id="run-btn">🚀 CHẠY BOT NGAY</button>
        
        <div id="status"></div>
        <pre id="log" style="display: none;"></pre>
    </div>

    <script>
        // Load config khi mở trang
        fetch('/api/config')
            .then(res => res.json())
            .then(data => {
                const rssUrl = data.rss_url || '';
                const select = document.getElementById('preset-rss');
                let found = false;
                for(let i=0; i < select.options.length; i++) {
                    if(select.options[i].value === rssUrl) {
                        select.selectedIndex = i;
                        found = true;
                        break;
                    }
                }
                if(!found && rssUrl) {
                    select.value = 'custom';
                }
                document.getElementById('custom-rss').value = rssUrl;
            });

        function updateCustomRss() {
            const select = document.getElementById('preset-rss').value;
            if (select !== 'custom') {
                document.getElementById('custom-rss').value = select;
            } else {
                document.getElementById('custom-rss').value = '';
                document.getElementById('custom-rss').focus();
            }
        }

        async function saveConfig() {
            const url = document.getElementById('custom-rss').value;
            if(!url) return alert('Vui lòng nhập link RSS!');
            
            await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rss_url: url })
            });
            const status = document.getElementById('save-status');
            status.style.display = 'block';
            setTimeout(() => status.style.display = 'none', 4000);
        }

        async function runBot() {
            const btn = document.getElementById('run-btn');
            const status = document.getElementById('status');
            const logBox = document.getElementById('log');
            
            btn.disabled = true;
            btn.innerText = '⏳ Đang gọi AI viết bài... Vui lòng đợi (có thể mất 15-30s)!';
            status.className = 'loading';
            status.innerText = 'Đang tiến hành cào tin và viết bài...';
            status.style.display = 'block';
            logBox.style.display = 'none';

            try {
                const res = await fetch('/api/run', { method: 'POST' });
                const data = await res.json();
                
                logBox.style.display = 'block';
                logBox.innerText = data.log;

                if(res.ok) {
                    status.className = 'success';
                    status.innerText = '✅ Quá trình viết bài đã hoàn tất!';
                } else {
                    status.className = 'error';
                    status.innerText = '❌ Có lỗi xảy ra trong quá trình chạy!';
                }
            } catch (err) {
                status.className = 'error';
                status.innerText = '❌ Lỗi kết nối tới Server Admin.';
            }

            btn.disabled = false;
            btn.innerText = '🚀 CHẠY BOT NGAY';
        }
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(HTML_CONTENT);
    } 
    else if (req.method === 'GET' && req.url === '/api/config') {
        let config = { rss_url: "https://www.artificialintelligence-news.com/feed/" };
        if (fs.existsSync(CONFIG_FILE)) {
            config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(config));
    }
    else if (req.method === 'POST' && req.url === '/api/config') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        });
    }
    else if (req.method === 'POST' && req.url === '/api/run') {
        exec('node scripts/auto-blogger.mjs', (error, stdout, stderr) => {
            const log = stdout + "\n" + stderr;
            if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, log: log }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, log: log }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`\n=============================================`);
    console.log(`🚀 GIAO DIỆN QUẢN TRỊ AUTO-BLOGGER ĐANG CHẠY!`);
    console.log(`👉 Hãy mở trình duyệt và truy cập: http://localhost:${PORT}`);
    console.log(`=============================================\n`);
});
