const fs = require('fs');
const path = require('path');
const clipboardy = require('clipboardy');

// Đường dẫn đến thư mục chứa các file
const directoryPath = path.join(__dirname, 'database');

// Hàm định dạng ngày
function formatDateTime(date) {
    const pad = n => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error('Lỗi khi đọc thư mục:', err);
    }

    // Chỉ lọc ra file (loại trừ folder)
    const htmlRows = files.map(filename => {
        const filePath = path.join(directoryPath, filename);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            const modTime = formatDateTime(stats.mtime);
            return `<tr>
    <td>${filename}</td>
    <td>${modTime}</td>
    <td><a href="database/${filename}" download>Tải về</a></td>
</tr>`;
        } else {
            return null;
        }
    }).filter(Boolean).join('\n');

    // Copy vào clipboard
    clipboardy.writeSync(htmlRows);
    console.log('✅ Đã tạo danh sách HTML và sao chép vào clipboard!');
});
