<script setup>
import { ref, onMounted } from 'vue'
import { globalAuthState } from '../index.mjs'

const githubToken = ref('')
const repoOwner = ref('chuyentn')
const repoName = ref('automate-faceless-content')
const rssUrl = ref('')
const loading = ref(false)
const statusMsg = ref('')
const errorMsg = ref('')

onMounted(() => {
  // Khôi phục token và RSS cũ từ localStorage để khỏi nhập lại
  const savedToken = localStorage.getItem('github_pat')
  if (savedToken) githubToken.value = savedToken
  
  const savedRss = localStorage.getItem('custom_rss')
  if (savedRss) rssUrl.value = savedRss
})

const saveConfig = async () => {
  if (!githubToken.value) {
    errorMsg.value = 'Vui lòng nhập GitHub Token (PAT)'
    return
  }
  if (!rssUrl.value) {
    errorMsg.value = 'Vui lòng nhập RSS URL'
    return
  }

  loading.value = true
  errorMsg.value = ''
  statusMsg.value = 'Đang lưu cấu hình lên GitHub...'
  
  localStorage.setItem('github_pat', githubToken.value)
  localStorage.setItem('custom_rss', rssUrl.value)

  try {
    // 1. Lấy SHA của file rss-config.json hiện tại
    const getRes = await fetch(`https://api.github.com/repos/${repoOwner.value}/${repoName.value}/contents/rss-config.json`, {
      headers: {
        'Authorization': `token ${githubToken.value}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    
    let sha = null
    if (getRes.ok) {
      const currentFile = await getRes.json()
      sha = currentFile.sha
    }

    // 2. Cập nhật file mới
    const contentObj = { rss_url: rssUrl.value }
    const contentBase64 = btoa(JSON.stringify(contentObj, null, 2))
    
    const putBody = {
      message: '🔧 Admin: Cập nhật nguồn RSS từ Online Dashboard',
      content: contentBase64
    }
    if (sha) putBody.sha = sha

    const putRes = await fetch(`https://api.github.com/repos/${repoOwner.value}/${repoName.value}/contents/rss-config.json`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubToken.value}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(putBody)
    })

    if (!putRes.ok) throw new Error('Không thể lưu lên GitHub. Hãy kiểm tra lại Token.')
    
    statusMsg.value = '✅ Đã lưu cấu hình Nguồn Tin thành công!'
    setTimeout(() => { statusMsg.value = '' }, 4000)
  } catch (err) {
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
}

const runBot = async () => {
  if (!githubToken.value) {
    errorMsg.value = 'Vui lòng nhập GitHub Token (PAT) trước khi chạy!'
    return
  }

  loading.value = true
  errorMsg.value = ''
  statusMsg.value = 'Đang kích hoạt Bot trên GitHub Actions...'

  localStorage.setItem('github_pat', githubToken.value)

  try {
    const res = await fetch(`https://api.github.com/repos/${repoOwner.value}/${repoName.value}/actions/workflows/auto-blog.yml/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${githubToken.value}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ref: 'main' })
    })

    if (!res.ok) {
      throw new Error('Lỗi kích hoạt Bot. Hãy kiểm tra lại quyền của Token.')
    }

    statusMsg.value = '🚀 Bot đã được kích hoạt thành công! Hãy đợi khoảng 1-2 phút, bài viết mới sẽ xuất hiện trên web.'
  } catch (err) {
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="admin-wrapper" v-if="globalAuthState.isAdmin">
    <div class="admin-header">
      <h2>👑 Giao Diện Quản Trị Hệ Thống (Admin)</h2>
      <p>Điều khiển hệ thống Auto-Blogger trực tiếp từ Cloudflare Pages thông qua GitHub API.</p>
    </div>

    <div class="admin-card">
      <h3>🔑 1. Xác thực GitHub</h3>
      <p class="desc">Để điều khiển từ xa, bạn cần cung cấp Personal Access Token (PAT) của GitHub có quyền <code>repo</code> và <code>workflow</code>. Token chỉ lưu trên trình duyệt của bạn, cực kỳ an toàn.</p>
      
      <div class="form-group">
        <label>GitHub Token (PAT):</label>
        <input type="password" v-model="githubToken" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" />
      </div>
    </div>

    <div class="admin-card">
      <h3>📡 2. Cài Đặt Nguồn Tin (RSS)</h3>
      <div class="form-group">
        <label>Đường link RSS URL:</label>
        <input type="text" v-model="rssUrl" placeholder="https://www.artificialintelligence-news.com/feed/" />
      </div>
      <button class="btn btn-save" @click="saveConfig" :disabled="loading">💾 Lưu Cấu Hình Lên GitHub</button>
    </div>

    <div class="admin-card">
      <h3>🤖 3. Chạy Bot Viết Bài Bằng AI (Thủ Công)</h3>
      <p class="desc">Hệ thống vốn dĩ đã tự chạy mỗi 8h sáng. Nếu bạn muốn ép nó viết bài ngay lập tức, hãy bấm nút dưới đây. GitHub Actions sẽ nhận lệnh và tự động xử lý trên mây.</p>
      <button class="btn btn-run" @click="runBot" :disabled="loading">🚀 KÍCH HOẠT BOT NGAY</button>
    </div>

    <transition name="fade">
      <div v-if="errorMsg" class="alert alert-error">{{ errorMsg }}</div>
    </transition>
    <transition name="fade">
      <div v-if="statusMsg" class="alert alert-success">{{ statusMsg }}</div>
    </transition>
  </div>

  <div class="admin-wrapper restricted" v-else-if="!globalAuthState.loading && !globalAuthState.isAdmin">
    <div class="lock-icon">🔒</div>
    <h2>Khu Vực Hạn Chế</h2>
    <p>Chỉ tài khoản Quản trị viên (tranngocchuyen1980@gmail.com) mới có quyền truy cập trang này.</p>
    <a href="/auth" class="btn btn-login">Đăng nhập tài khoản Admin</a>
  </div>
</template>

<style scoped>
.admin-wrapper {
  max-width: 800px;
  margin: 40px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.restricted {
  text-align: center;
  padding: 60px 20px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px dashed #d1d5db;
}
.lock-icon { font-size: 3rem; margin-bottom: 20px; }

.admin-header h2 {
  color: #470081;
  margin-bottom: 10px;
}
.admin-header p {
  color: #6b7280;
  margin-bottom: 30px;
}

.admin-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  margin-bottom: 24px;
  border: 1px solid #f3f4f6;
}

.admin-card h3 {
  margin-top: 0;
  color: #111827;
  font-size: 1.1rem;
  margin-bottom: 12px;
}

.desc {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.9rem;
}
.form-group input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}
.form-group input:focus {
  outline: none;
  border-color: #470081;
  box-shadow: 0 0 0 2px rgba(71,0,129,0.2);
}

.btn {
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-save {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}
.btn-save:hover:not(:disabled) { background: #e5e7eb; }

.btn-run {
  width: 100%;
  background: #10b981;
  color: white;
  font-size: 1.1rem;
  padding: 16px;
}
.btn-run:hover:not(:disabled) { background: #059669; }

.btn-login {
  display: inline-block;
  background: #470081;
  color: white;
  text-decoration: none;
  margin-top: 20px;
}
.btn-login:hover { background: #330066; }

.alert {
  padding: 16px;
  border-radius: 8px;
  margin-top: 20px;
  font-weight: 500;
}
.alert-error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #f87171;
}
.alert-success {
  background: #f0fdf4;
  color: #065f46;
  border: 1px solid #34d399;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
