const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const os = require('os');

const {
    pdfToWord,
    pdfToPowerPoint,
    wordToPowerPoint,
    powerPointToWord,
    excelToWord,
    wordToExcel
} = require('../../utils/converters.js');

// Configure multer for serverless (use /tmp directory)
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadDir = path.join(os.tmpdir(), 'uploads');
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

// Export handler for Vercel serverless function
module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Get conversion type from URL
    const conversionType = req.url.split('/').pop();

    // Handle file upload with multer
    return new Promise((resolve, reject) => {
        upload.single('file')(req, res, async (err) => {
            if (err) {
                res.status(400).json({ error: 'File upload failed', details: err.message });
                return resolve();
            }

            if (!req.file) {
                res.status(400).json({ error: 'No file uploaded' });
                return resolve();
            }

            try {
                let outputPath;
                let fileName;

                switch (conversionType) {
                    case 'pdf-to-word':
                        outputPath = await pdfToWord(req.file.path);
                        fileName = 'converted.docx';
                        break;
                    case 'pdf-to-ppt':
                        outputPath = await pdfToPowerPoint(req.file.path);
                        fileName = 'converted.pptx';
                        break;
                    case 'word-to-ppt':
                        outputPath = await wordToPowerPoint(req.file.path);
                        fileName = 'converted.pptx';
                        break;
                    case 'ppt-to-word':
                        outputPath = await powerPointToWord(req.file.path);
                        fileName = 'converted.docx';
                        break;
                    case 'excel-to-word':
                        outputPath = await excelToWord(req.file.path);
                        fileName = 'converted.docx';
                        break;
                    case 'word-to-excel':
                        outputPath = await wordToExcel(req.file.path);
                        fileName = 'converted.xlsx';
                        break;
                    default:
                        res.status(400).json({ error: 'Invalid conversion type' });
                        await cleanupFiles([req.file.path]);
                        return resolve();
                }

                // Read the converted file
                const fileBuffer = await fs.readFile(outputPath);

                // Set headers for file download
                res.setHeader('Content-Type', 'application/octet-stream');
                res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
                res.send(fileBuffer);

                // Clean up files
                await cleanupFiles([req.file.path, outputPath]);
                resolve();
            } catch (error) {
                console.error('Conversion error:', error);
                res.status(500).json({ error: 'Conversion failed', details: error.message });
                await cleanupFiles([req.file.path]);
                resolve();
            }
        });
    });
};
