import fs from 'fs';
import path from 'path';

const searchStr = 'victorchuyen68';
const replaceStr = 'victorchuyen68';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat && stat.isDirectory()) { 
            // Bỏ qua thư mục node_modules và .git để tăng tốc độ
            if (file !== 'node_modules' && file !== '.git') {
                results = results.concat(walk(fullPath));
            }
        } else {
            // Chỉ tìm kiếm trong các file text
            if (fullPath.endsWith('.md') || fullPath.endsWith('.mjs') || fullPath.endsWith('.js') || fullPath.endsWith('.json')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

console.log('Đang quét và thay thế link affiliate...');
const files = walk(process.cwd());
let changedFiles = 0;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes(searchStr)) {
            // Thay thế tất cả 'victorchuyen68' bằng 'victorchuyen68'
            content = content.split(searchStr).join(replaceStr);
            fs.writeFileSync(file, content, 'utf8');
            changedFiles++;
        }
    } catch (err) {
        console.error(`Không thể đọc file ${file}:`, err.message);
    }
});

console.log(`✅ HOÀN TẤT! Đã thay thế link Affiliate thành công trên ${changedFiles} files!`);
