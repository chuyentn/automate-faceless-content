# Hướng Dẫn Cấu Hình Biến Môi Trường (Environment Variables) Trên Cloudflare Pages

Khi deploy mã nguồn lên Cloudflare Pages, file `.env` chứa các thông tin bảo mật (như API Keys, cấu hình Firebase) sẽ không được đẩy lên GitHub. Do đó, bạn cần khai báo các biến môi trường này trực tiếp trên giao diện của Cloudflare để quá trình Build có thể nhận diện được cấu hình.

## Các Bước Cấu Hình Chi Tiết

**Bước 1:** Đăng nhập vào bảng điều khiển [Cloudflare Dashboard](https://dash.cloudflare.com/).

**Bước 2:** Chọn mục **Workers & Pages** ở thanh menu bên trái.

**Bước 3:** Nhấn vào **Dự án Pages** của bạn (ví dụ: `automate-faceless-content`).

**Bước 4:** Chuyển sang tab **Settings** (Cài đặt), sau đó cuộn xuống và chọn **Environment variables** (Biến môi trường) ở menu con bên trái.

**Bước 5:** Trong mục **Production** (và **Preview** nếu cần), nhấn nút **Add variables** (Thêm biến).

**Bước 6:** Thêm lần lượt các biến từ file `.env` hoặc `.env.example` trên máy tính của bạn vào bảng. Bạn điền `Variable name` ở ô bên trái, và `Value` (giá trị) ở ô bên phải. 

Dưới đây là các nhóm biến quan trọng:

### 1. Cấu Hình Firebase (Cần cho chức năng Đăng Nhập)
Bạn cần thêm các biến sau để tính năng Xác Thực (Auth) của hệ thống hoạt động:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

*(Lưu ý: Đối với Vite, các biến dùng cho Fontend Client BẮT BUỘC phải bắt đầu bằng chữ `VITE_`)*

### 2. Cấu Hình AI API Keys (Dùng cho tính năng Auto-Blogger)
Nếu bạn đang chạy tool viết bài tự động hoặc API bên thứ 3, hãy cấu hình key bảo mật tương ứng:

- `GEMINI_API_KEY` (Khuyên dùng)
- `OPENAI_API_KEY`
- `GROQ_API_KEY`
- `OPENROUTER_API_KEY`
- `ACTIVE_MODEL`: Model bạn chọn làm mặc định (ví dụ: `gemini`)

### 3. Cấu Hình Link Tiếp Thị Liên Kết (Affiliate)
- `MY_AFFILIATE_LINK`: Link Affiliate riêng của bạn. Tool sẽ tự động lấy và chèn link này vào nội dung.

**Bước 7:** Nhấn nút **Save** (Lưu) để Cloudflare lưu trữ các biến này lại một cách bảo mật.

---

## 🛑 Quan Trọng: Cần Triển Khai Lại (Redeploy)
> [!WARNING]
> Sau khi thêm Biến Môi Trường mới, hệ thống **không tự động áp dụng** cho bản web đang chạy. Bạn bắt buộc phải **Redeploy** (Build lại) thì các biến này mới có tác dụng!

**Cách Redeploy nhanh nhất:**
1. Chuyển sang tab **Deployments** (Các bản triển khai).
2. Tại bản deploy gần nhất trên cùng, nhấp chuột vào dấu `...` ở góc phải.
3. Chọn **Retry deployment** (Thử triển khai lại). 
4. Đợi Cloudflare build lại trong khoảng 1-2 phút. Xong! Trang web của bạn giờ đã có đầy đủ cấu hình.
