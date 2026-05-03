import fs from 'fs';
import path from 'path';

const locales = ['vi', 'zh', 'es', 'fr'];
const dirsToCopy = ['course', 'guides'];
const filesToCopy = ['best-automating-tools.md', 'video-ideas.md'];

function copySync(src, dest) {
  if (!fs.existsSync(src)) return;
  
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(child => {
      copySync(path.join(src, child), path.join(dest, child));
    });
  } else {
    // Không ghi đè file index.md ở thư mục gốc của mỗi ngôn ngữ (vì đã được dịch riêng)
    const isRootIndex = path.basename(dest) === 'index.md' && locales.includes(path.basename(path.dirname(dest)));
    if (isRootIndex) return;

    // Chỉ copy nếu file chưa tồn tại (để không ghi đè các file bạn đã tự dịch)
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
    }
  }
}

locales.forEach(locale => {
  const localeDir = path.resolve(process.cwd(), locale);
  if (!fs.existsSync(localeDir)) {
    fs.mkdirSync(localeDir);
  }
  
  dirsToCopy.forEach(dir => {
    copySync(path.resolve(process.cwd(), dir), path.join(localeDir, dir));
  });
  
  filesToCopy.forEach(file => {
    copySync(path.resolve(process.cwd(), file), path.join(localeDir, file));
  });
  
  console.log(`✅ Đã đồng bộ cấu trúc file cho ngôn ngữ: /${locale}/`);
});
