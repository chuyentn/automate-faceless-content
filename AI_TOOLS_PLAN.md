# Kế Hoạch Tích Hợp "AI Tools Review" Tự Động (Auto-Blogging)

Mục tiêu cốt lõi: **Biến website thành cỗ máy thu hút Traffic tự nhiên (SEO) và tạo thu nhập thụ động bền vững** thông qua việc tự động hóa nội dung và gắn link Affiliate.

---

## 🎯 Đánh Giá Ý Tưởng Của Bạn

Ý tưởng thêm tab **"Công cụ AI mới nhất"** dạng Blog Review và crawl RSS là một ý tưởng **XUẤT SẮC** để scale (mở rộng) dự án này. 

**Tại sao nó hiệu quả?**
1. **Khóa học (Course)** là sản phẩm mồi (Phễu) giúp bạn chốt sale công cụ chính (Syllaby). Nhưng người học xong sẽ rời đi.
2. **Blog Review** tạo ra nội dung tươi mới liên tục (Fresh Content) -> Google rất thích điều này, giúp website lên top SEO.
3. Người dùng làm Faceless Video LUÔN khao khát công cụ mới (Giọng đọc AI, tạo ảnh AI, cắt video AI...). Đây là **ngách cực kỳ dễ bán (High-converting niche)**.

---

## ⚠️ Cảnh Báo Quan Trọng (User Review Required)

**Vấn đề Duplicate Content (Copy nội dung)**
Nếu bạn chỉ crawl RSS thuần túy và đăng lại nguyên văn (chỉ thay link aff) thì **Google sẽ phạt website của bạn (SEO Penalty)** vì lỗi "Duplicate Content". Trang web sẽ mất hoàn toàn traffic tự nhiên.

**Giải pháp: AI Auto-Rewrite Workflow**
Thay vì copy nguyên văn, chúng ta sẽ thiết lập một hệ thống: **Crawl RSS -> Gửi cho AI (Gemini/ChatGPT) để viết lại thành bài Review độc nhất (Unique) + Thêm nhận xét "Công cụ này giúp ích gì cho Faceless Video?" -> Tự động chèn link Affiliate -> Xuất ra file Markdown (.md) cho VitePress.**

---

## 🚀 Đề Xuất Plan Xây Dựng Hoàn Chỉnh (3 Giai Đoạn)

### GIAI ĐOẠN 1: Tái Cấu Trúc UI/UX VitePress (Tạo Phễu Hứng Traffic)

Chúng ta cần tạo không gian trên web để hiển thị các bài blog/review này.

#### 1. Tạo `/tools/` (Thư mục Blog/Review)
Tạo một Tab mới trên Navbar tên là **"🔥 AI Tools"** hoặc **"Khám Phá AI"**.
Bên trong là danh sách dạng lưới (Grid) hiển thị các bài review công cụ AI mới nhất.

#### 2. Chỉnh sửa `.vitepress/config.mjs`
Cập nhật Navbar để thêm tab mới, trỏ vào `/tools/index.md`.

### GIAI ĐOẠN 2: Xây Dựng Hệ Thống Tự Động Hóa (The Engine)

Thay vì làm thủ công, chúng ta sẽ viết một Script Node.js chạy ngầm.

#### 1. Tạo file `scripts/auto-blogger.mjs`
Một kịch bản tự động làm các việc sau:
1. **Nguồn cấp dữ liệu (RSS Feeds):** Lấy tin từ các trang như *Futurepedia, AI Valley, ProductHunt, hoặc các blog công nghệ lớn*.
2. **Lọc nội dung:** Chỉ chọn các công cụ liên quan đến Video, Audio, SEO, Content.
3. **AI Rewrite (Tích hợp Gemini/OpenAI API):** Tự động tóm tắt tính năng và viết một bài review chuẩn SEO.
4. **Link Injection:** Dựa vào tên công cụ (VD: InVideo, ElevenLabs), kịch bản tự động lục tìm trong "Kho Link Affiliate" của bạn và chèn vào bài viết.
5. **Publish:** Lưu thành file `.md` vào thư mục `/tools/` với ngày tháng đầy đủ.

#### 2. Tự động hóa bằng GitHub Actions
Sử dụng **GitHub Actions** để tự động chạy file `auto-blogger.mjs` mỗi ngày 1 lần. Web của bạn sẽ tự động có bài mới mỗi ngày mà bạn **KHÔNG CẦN MỞ MÁY TÍNH**. Khi có bài mới, hệ thống sẽ tự động Build lại web. Hệ thống thụ động 100%.

### GIAI ĐOẠN 3: Chiến Lược Ngách & Monetization (Tối Đa Hóa Lợi Nhuận)

Đừng chỉ dừng lại ở Syllaby. Dưới đây là "Top Ngách Affiliate" đang chuyển đổi tốt nhất cho dân làm Faceless mà bạn cần đăng ký ngay:

1. **Ngách Video AI Generator (Hoa hồng cao nhất):**
   - *InVideo AI* (Cực hot cho Faceless)
   - *Pictory.ai*
   - *Opus Clip* (Tạo short video)
2. **Ngách Voice/Audio AI (Đăng ký bắt buộc):**
   - *ElevenLabs* (Giọng AI số 1 hiện nay - hoa hồng cực ngon)
   - *Murf.ai*
3. **Ngách Graphic/Assets:**
   - *Canva Pro*
   - *Midjourney/Leonardo AI* (Thông qua các khóa học prompt trên ClickBank/Digistore24)
4. **Ngách Quản lý/SEO YouTube:**
   - *VidIQ*
   - *TubeBuddy*

---

## ❓ Open Questions (Câu hỏi cần bạn xác nhận để triển khai)

1. **Bạn có muốn tôi bắt tay vào code Giai đoạn 1 (Tạo giao diện trang AI Tools trên VitePress) ngay bây giờ không?**
2. Về **Giai đoạn 2 (Auto-blogger)**, bạn có sẵn API Key của OpenAI (ChatGPT) hoặc Google Gemini để dùng cho việc viết lại bài tự động không? (Gemini có gói miễn phí rất tốt cho việc này).
3. **Nguồn RSS**: Bạn muốn tự tìm các trang web để crawl, hay muốn tôi đề xuất luôn danh sách các trang tin AI tốt nhất?
