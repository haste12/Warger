const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        try {
            await fs.mkdir(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Import conversion utilities
const {
    pdfToWord,
    pdfToPowerPoint,
    wordToPowerPoint,
    powerPointToWord,
    excelToWord,
    wordToExcel
} = require('./utils/converters.js');

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'وەرگێڕ API - File Conversion Service',
        version: '1.0.0',
        endpoints: [
            '/api/convert/pdf-to-word',
            '/api/convert/pdf-to-ppt',
            '/api/convert/word-to-ppt',
            '/api/convert/ppt-to-word',
            '/api/convert/excel-to-word',
            '/api/convert/word-to-excel'
        ]
    });
});

// PDF to Word
app.post('/api/convert/pdf-to-word', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const outputPath = await pdfToWord(req.file.path);

        res.download(outputPath, 'converted.docx', async (err) => {
            // Clean up files after download
            await cleanupFiles([req.file.path, outputPath]);
            if (err) console.error('Download error:', err);
        });
    } catch (error) {
        console.error('PDF to Word conversion error:', error);
        res.status(500).json({ error: 'Conversion failed', details: error.message });
    }
});

// PDF to PowerPoint
app.post('/api/convert/pdf-to-ppt', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const outputPath = await pdfToPowerPoint(req.file.path);

        res.download(outputPath, 'converted.pptx', async (err) => {
            await cleanupFiles([req.file.path, outputPath]);
            if (err) console.error('Download error:', err);
        });
    } catch (error) {
        console.error('PDF to PowerPoint conversion error:', error);
        res.status(500).json({ error: 'Conversion failed', details: error.message });
    }
});

// Word to PowerPoint
app.post('/api/convert/word-to-ppt', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const outputPath = await wordToPowerPoint(req.file.path);

        res.download(outputPath, 'converted.pptx', async (err) => {
            await cleanupFiles([req.file.path, outputPath]);
            if (err) console.error('Download error:', err);
        });
    } catch (error) {
        console.error('Word to PowerPoint conversion error:', error);
        res.status(500).json({ error: 'Conversion failed', details: error.message });
    }
});

// PowerPoint to Word
app.post('/api/convert/ppt-to-word', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const outputPath = await powerPointToWord(req.file.path);

        res.download(outputPath, 'converted.docx', async (err) => {
            await cleanupFiles([req.file.path, outputPath]);
            if (err) console.error('Download error:', err);
        });
    } catch (error) {
        console.error('PowerPoint to Word conversion error:', error);
        res.status(500).json({ error: 'Conversion failed', details: error.message });
    }
});

// Excel to Word
app.post('/api/convert/excel-to-word', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const outputPath = await excelToWord(req.file.path);

        res.download(outputPath, 'converted.docx', async (err) => {
            await cleanupFiles([req.file.path, outputPath]);
            if (err) console.error('Download error:', err);
        });
    } catch (error) {
        console.error('Excel to Word conversion error:', error);
        res.status(500).json({ error: 'Conversion failed', details: error.message });
    }
});

// Word to Excel
app.post('/api/convert/word-to-excel', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const outputPath = await wordToExcel(req.file.path);

        res.download(outputPath, 'converted.xlsx', async (err) => {
            await cleanupFiles([req.file.path, outputPath]);
            if (err) console.error('Download error:', err);
        });
    } catch (error) {
        console.error('Word to Excel conversion error:', error);
        res.status(500).json({ error: 'Conversion failed', details: error.message });
    }
});

// Helper function to clean up files
async function cleanupFiles(filePaths) {
    for (const filePath of filePaths) {
        try {
            await fs.unlink(filePath);
        } catch (error) {
            console.error('Error deleting file:', filePath, error);
        }
    }
}

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: error.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 وەرگێڕ API Server running on port ${PORT}`);
    console.log(`📝 API Documentation: http://localhost:${PORT}`);
});

module.exports = app;
