const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'database');
fs.readdir(dir, (err, files) => {
    if (err) {
        console.error('Không đọc được thư mục database');
        return;
    }
    files.forEach(file => {
        console.log(`<li><a href="database/${file}" download>${file}</a></li>`);
    });
});