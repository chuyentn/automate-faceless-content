import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';
import dotenv from 'dotenv';

// Tự động load biến môi trường từ file .env
dotenv.config();

// Đọc cấu hình RSS từ file
let RSS_URL = 'https://www.artificialintelligence-news.com/feed/';
const configPath = path.join(process.cwd(), 'rss-config.json');
if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (config.rss_url) RSS_URL = config.rss_url;
}

const parser = new Parser();

// Load Cấu hình AI
const ACTIVE_MODEL = process.env.ACTIVE_MODEL || 'gemini';
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const GROQ_KEY = process.env.GROQ_API_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const AFFILIATE_LINK = process.env.MY_AFFILIATE_LINK || 'https://syllaby.io/?via=victorchuyen68';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Gọi API tới model đã chọn để viết bài
 */
async function generateReview(title, content) {
    const prompt = `Bạn là một chuyên gia đánh giá công cụ AI cho dân làm Faceless Video.
Dựa vào tin tức sau, hãy viết một bài review NGẮN GỌN (khoảng 300 chữ) bằng TIẾNG VIỆT, tập trung vào việc công cụ/xu hướng AI này có thể giúp ích gì cho những người làm nội dung video không lộ mặt (Faceless).

Tin gốc:
Tiêu đề: ${title}
Nội dung: ${content}

Yêu cầu định dạng:
1. Có Tiêu đề H1 rõ ràng.
2. Có phần "Ứng dụng cho Faceless Video".
3. Không trả về markdown code block (\`\`\`), chỉ trả về text markdown thuần.`;

    try {
        if (ACTIVE_MODEL === 'gemini' && GEMINI_KEY) {
            // Hỗ trợ đa key: nếu người dùng nhập nhiều key (xuống dòng hoặc phẩy), chọn random 1 key
            const keys = GEMINI_KEY.split(/[\n,]+/).map(k => k.trim()).filter(k => k);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            return await callGemini(prompt, randomKey);
        } else if (ACTIVE_MODEL === 'openai' && OPENAI_KEY) {
            return await callOpenAICompatible(prompt, OPENAI_KEY, 'https://api.openai.com/v1/chat/completions', 'gpt-3.5-turbo');
        } else if (ACTIVE_MODEL === 'groq' && GROQ_KEY) {
            return await callOpenAICompatible(prompt, GROQ_KEY, 'https://api.groq.com/openai/v1/chat/completions', 'llama3-8b-8192');
        } else if (ACTIVE_MODEL === 'openrouter' && OPENROUTER_KEY) {
            return await callOpenAICompatible(prompt, OPENROUTER_KEY, 'https://openrouter.ai/api/v1/chat/completions', 'meta-llama/llama-3-8b-instruct:free');
        } else {
            throw new Error(`Cấu hình model ${ACTIVE_MODEL} bị thiếu API KEY! Hãy mở file .env để điền Key.`);
        }
    } catch (e) {
        console.error("❌ Lỗi khi gọi AI:", e.message);
        return null;
    }
}

/**
 * Gọi Google Gemini API
 */
async function callGemini(prompt, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.candidates[0].content.parts[0].text;
}

/**
 * Gọi OpenAI hoặc các API chuẩn OpenAI (Groq, OpenRouter)
 */
async function callOpenAICompatible(prompt, apiKey, endpoint, model) {
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'http://localhost:5173', // Bắt buộc cho OpenRouter
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }]
        })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.choices[0].message.content;
}

/**
 * Gửi tin nhắn tự động lên Telegram
 */
async function sendTelegramMessage(title, fileSlug) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.log('⚠️ Bỏ qua gửi Telegram vì chưa cấu hình Bot Token/Chat ID.');
        return;
    }
    
    // Link tới bài viết trên trang web (ví dụ: https://edu.tnc.io.vn/tools/ten-bai-viet)
    const postUrl = `https://edu.tnc.io.vn/tools/${fileSlug}`;
    
    const message = `🔥 *BÀI VIẾT MỚI:*\n\n📰 *${title}*\n\n👉 [Đọc chi tiết và nhận bộ công cụ tại đây](${postUrl})\n\n💡 *Bí kíp Faceless Video tự động!*`;
    
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        const data = await res.json();
        if (data.ok) {
            console.log('✅ Đã gửi thông báo lên Telegram thành công!');
        } else {
            console.error('❌ Lỗi gửi Telegram:', data.description);
        }
    } catch (e) {
        console.error('❌ Lỗi kết nối Telegram:', e.message);
    }
}

/**
 * Hàm chính chạy Auto-Blogger
 */
async function runAutoBlogger() {
    console.log('📡 Đang lấy RSS Feed từ nguồn...');
    const feed = await parser.parseURL(RSS_URL);
    
    // Chỉ lấy bài mới nhất để tránh spam
    const latestPost = feed.items[0];
    console.log(`📰 Đã tìm thấy bài mới: ${latestPost.title}`);

    console.log(`🤖 Đang nhờ AI (${ACTIVE_MODEL.toUpperCase()}) phân tích và viết bài...`);
    let aiContent = await generateReview(latestPost.title, latestPost.contentSnippet);
    
    if (!aiContent) return;

    // Chèn link Affiliate vào cuối bài
    const finalContent = `---
layout: doc
title: "${latestPost.title.replace(/"/g, '')}"
---

${aiContent}

---
💡 **Khuyên Dùng:** Nếu bạn muốn xây dựng kênh Faceless tự động, hãy [**Trải nghiệm Syllaby.io miễn phí tại đây**](${AFFILIATE_LINK})!
`;

    // Lưu thành file .md vào thư mục tools
    const fileSlug = latestPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const fileName = fileSlug + '.md';
    const filePath = path.join(process.cwd(), 'tools', fileName);
    
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log(`✅ Đã tạo thành công bài blog mới: /tools/${fileName}`);
    
    // Gửi thông báo lên mạng xã hội (Telegram)
    console.log('📢 Đang đẩy bài lên Telegram...');
    await sendTelegramMessage(latestPost.title, fileSlug);
}

runAutoBlogger();
