const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(__dirname)); // phục vụ file tĩnh

app.get('/list-files', (req, res) => {
    const dirPath = path.join(__dirname, 'database');
    fs.readdir(dirPath, (err, files) => {
        if (err) return res.status(500).json({ error: 'Không đọc được thư mục' });
        res.json(files);
    });
});

app.get('/download/:filename', (req, res) => {
    const fileName = decodeURIComponent(req.params.filename); // Giải mã tên file
    const filePath = path.join(__dirname, 'database', fileName);

    // Kiểm tra file nằm trong thư mục database (tránh truy cập ngoài ý muốn)
    if (!filePath.startsWith(path.join(__dirname, 'database'))) {
        return res.status(400).send('Invalid file path');
    }

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.download(filePath);
    });
});

app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});