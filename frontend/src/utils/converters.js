import { promises as fs } from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, AlignmentType, HeadingLevel, BorderStyle } from 'docx';
import PptxGenJS from 'pptxgenjs';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import AdmZip from 'adm-zip';
// import pdf2img from 'pdf-to-img';
// import sharp from 'sharp';

/**
 * Enhanced PDF to Word conversion with IMAGE EXTRACTION
 */
async function pdfToWord(pdfPath) {
    try {
        console.log('Starting enhanced PDF to Word conversion with image extraction...');
        const dataBuffer = await fs.readFile(pdfPath);
        const pdfData = await pdfParse(dataBuffer);

        const text = pdfData.text;
        const lines = text.split('\n');

        // Analyze and create structured paragraphs
        const paragraphs = [];
        let currentSection = [];

        // Note: Image extraction disabled for compatibility
        const images = [];
        
        /*
        // Extract images from PDF
        console.log('Extracting images from PDF...');
        const images = [];
        try {
            const document = await fromPath(pdfPath, {
                scale: 2.0, // Higher quality
            });

            let pageNum = 0;
            for await (const image of document) {
                pageNum++;
                const imagePath = path.join(path.dirname(pdfPath), `temp-image-${pageNum}-${Date.now()}.png`);
                await fs.writeFile(imagePath, image);

                // Resize image if too large
                const resizedImageBuffer = await sharp(imagePath)
                    .resize({ width: 600, fit: 'inside' })
                    .toBuffer();

                images.push({
                    buffer: resizedImageBuffer,
                    path: imagePath,
                    page: pageNum
                });

                console.log(`Extracted image from page ${pageNum}`);
            }
        } catch (imgError) {
            console.log('No images found or error extracting images:', imgError.message);
        }
        */

        // Add images at the beginning if found
        if (images.length > 0) {
            paragraphs.push(new Paragraph({
                text: 'Extracted Images',
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 200, after: 200 }
            }));

            for (const img of images) {
                try {
                    paragraphs.push(new Paragraph({
                        children: [
                            new ImageRun({
                                data: img.buffer,
                                transformation: {
                                    width: 600,
                                    height: 400,
                                },
                            }),
                        ],
                        spacing: { after: 300 }
                    }));

                    paragraphs.push(new Paragraph({
                        text: `Image from Page ${img.page}`,
                        italics: true,
                        spacing: { after: 400 }
                    }));
                } catch (imgErr) {
                    console.log('Error adding image:', imgErr.message);
                }
            }

            // Add separator
            paragraphs.push(new Paragraph({
                text: 'Document Content',
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }));
        }

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (!line) {
                // Empty line - end current section
                if (currentSection.length > 0) {
                    paragraphs.push(createParagraphFromLines(currentSection));
                    currentSection = [];
                }
                continue;
            }

            // Detect headings (lines that are short and followed by content)
            const isHeading = line.length < 100 &&
                line.length > 0 &&
                !line.endsWith('.') &&
                !line.endsWith(',') &&
                i < lines.length - 1 &&
                lines[i + 1].trim().length > 0;

            if (isHeading) {
                // Add previous section
                if (currentSection.length > 0) {
                    paragraphs.push(createParagraphFromLines(currentSection));
                    currentSection = [];
                }
                // Add heading
                paragraphs.push(new Paragraph({
                    text: line,
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 400, after: 200 }
                }));
            } else {
                currentSection.push(line);
            }
        }

        // Add remaining section
        if (currentSection.length > 0) {
            paragraphs.push(createParagraphFromLines(currentSection));
        }

        // Add metadata
        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: 1440,
                            right: 1440,
                            bottom: 1440,
                            left: 1440,
                        }
                    }
                },
                children: paragraphs
            }]
        });

        const outputPath = path.join(path.dirname(pdfPath), `converted-${Date.now()}.docx`);
        const buffer = await Packer.toBuffer(doc);
        await fs.writeFile(outputPath, buffer);

        // Clean up temporary image files
        for (const img of images) {
            try {
                await fs.unlink(img.path);
            } catch (e) {
                console.log('Error cleaning up temp image:', e.message);
            }
        }

        console.log('PDF to Word conversion completed successfully with', images.length, 'images');
        return outputPath;
    } catch (error) {
        console.error('PDF to Word error:', error);
        throw new Error('Failed to convert PDF to Word: ' + error.message);
    }
}

/**
 * Helper function to create formatted paragraphs
 */
function createParagraphFromLines(lines) {
    const text = lines.join(' ');

    // Detect if text contains special formatting
    const isBold = text.toUpperCase() === text && text.length < 50;

    return new Paragraph({
        children: [new TextRun({
            text: text,
            bold: isBold,
            size: isBold ? 28 : 24
        })],
        spacing: { after: 200 },
        alignment: AlignmentType.JUSTIFIED
    });
}

/**
 * Enhanced PDF to PowerPoint conversion with IMAGE SUPPORT and slide structure
 */
async function pdfToPowerPoint(pdfPath) {
    try {
        console.log('Starting enhanced PDF to PowerPoint conversion with images...');
        const dataBuffer = await fs.readFile(pdfPath);
        const pdfData = await pdfParse(dataBuffer);

        const text = pdfData.text;
        const numPages = pdfData.numpages;

        console.log(`PDF has ${numPages} pages`);

        const pptx = new PptxGenJS();

        // Configure presentation
        pptx.author = 'وەرگێڕ Converter';
        pptx.company = 'وەرگێڕ';
        pptx.subject = 'Converted from PDF';
        pptx.title = 'PDF Presentation';

        // Extract images from PDF
        console.log('Extracting images from PDF for presentation...');
        const images = [];
        try {
            const document = await fromPath(pdfPath, {
                scale: 2.0,
            });

            let pageNum = 0;
            for await (const image of document) {
                pageNum++;
                const imagePath = path.join(path.dirname(pdfPath), `temp-ppt-image-${pageNum}-${Date.now()}.png`);
                await fs.writeFile(imagePath, image);

                images.push({
                    path: imagePath,
                    page: pageNum
                });

                console.log(`Extracted image from page ${pageNum} for slide`);
            }
        } catch (imgError) {
            console.log('No images found or error extracting images:', imgError.message);
        }

        // Split text into logical sections
        const sections = splitIntoSections(text);

        console.log(`Created ${sections.length} sections`);

        // Create slides from sections
        sections.forEach((section, index) => {
            const slide = pptx.addSlide();

            // Add slide number
            slide.addText(`${index + 1}`, {
                x: 9.2,
                y: 7.2,
                w: 0.5,
                h: 0.3,
                fontSize: 10,
                color: '999999',
                align: 'right'
            });

            if (section.title) {
                // Title slide or section slide
                slide.addText(section.title, {
                    x: 0.5,
                    y: 0.5,
                    w: 9,
                    h: 1.2,
                    fontSize: 32,
                    bold: true,
                    color: '1F4788',
                    align: 'left',
                    valign: 'top'
                });

                if (section.content) {
                    // Add content with bullet points if applicable
                    const contentLines = section.content.split('\\n').filter(l => l.trim());

                    if (contentLines.length > 0) {
                        slide.addText(contentLines.map(line => ({
                            text: line,
                            options: {
                                bullet: true,
                                fontSize: 18,
                                color: '333333',
                                breakLine: true
                            }
                        })), {
                            x: 0.5,
                            y: 2.0,
                            w: 9,
                            h: 5,
                            fontSize: 18,
                            color: '333333',
                            valign: 'top'
                        });
                    }
                }
            } else {
                // Content-only slide
                slide.addText(section.content || 'No content', {
                    x: 0.5,
                    y: 0.5,
                    w: 9,
                    h: 6.5,
                    fontSize: 16,
                    color: '333333',
                    align: 'left',
                    valign: 'top'
                });
            }

            // Add footer
            slide.addText('Converted by وەرگێڕ', {
                x: 0.5,
                y: 7.2,
                w: 8,
                h: 0.3,
                fontSize: 10,
                color: '999999',
                align: 'left'
            });
        });

        // Add image slides if images were extracted
        if (images.length > 0) {
            console.log(`Adding ${images.length} image slides...`);

            for (const img of images) {
                const slide = pptx.addSlide();

                slide.addText(`Images from Page ${img.page}`, {
                    x: 0.5,
                    y: 0.3,
                    w: 9,
                    h: 0.5,
                    fontSize: 24,
                    bold: true,
                    color: '1F4788'
                });

                try {
                    slide.addImage({
                        path: img.path,
                        x: 1.5,
                        y: 1.5,
                        w: 7,
                        h: 5,
                        sizing: { type: 'contain', w: 7, h: 5 }
                    });
                } catch (imgErr) {
                    console.log('Error adding image to slide:', imgErr.message);
                    slide.addText('Image could not be loaded', {
                        x: 3,
                        y: 3.5,
                        fontSize: 14,
                        color: '999999'
                    });
                }

                // Add footer
                slide.addText('Converted by وەرگێڕ', {
                    x: 0.5,
                    y: 7.2,
                    w: 8,
                    h: 0.3,
                    fontSize: 10,
                    color: '999999',
                    align: 'left'
                });
            }
        }

        // If no sections were created, create at least one slide
        if (sections.length === 0 && images.length === 0) {
            const slide = pptx.addSlide();
            slide.addText('Converted from PDF', {
                x: 1,
                y: 1,
                w: 8,
                h: 1,
                fontSize: 32,
                bold: true,
                color: '1F4788'
            });
            slide.addText(text.substring(0, 1000), {
                x: 1,
                y: 2.5,
                w: 8,
                h: 4.5,
                fontSize: 14,
                color: '333333'
            });
        }

        const outputPath = path.join(path.dirname(pdfPath), `converted-${Date.now()}.pptx`);
        console.log('Writing PowerPoint file to:', outputPath);

        await pptx.writeFile(outputPath);
        console.log('PowerPoint file written successfully');

        // Clean up temporary image files
        for (const img of images) {
            try {
                await fs.unlink(img.path);
            } catch (e) {
                console.log('Error cleaning up temp image:', e.message);
            }
        }

        return outputPath;
    } catch (error) {
        console.error('PDF to PowerPoint error:', error);
        throw new Error('Failed to convert PDF to PowerPoint: ' + error.message);
    }
}

/**
 * Split text into logical sections for slides
 */
function splitIntoSections(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    const sections = [];
    let currentSection = { title: '', content: '' };
    let contentLines = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Detect potential titles (short lines, no ending punctuation)
        const isPotentialTitle = line.length < 100 &&
            line.length > 3 &&
            !line.endsWith('.') &&
            !line.endsWith(',') &&
            !line.endsWith(';');

        if (isPotentialTitle && contentLines.length > 3) {
            // Save current section
            if (currentSection.title || contentLines.length > 0) {
                currentSection.content = contentLines.join('\n');
                sections.push({ ...currentSection });
            }

            // Start new section
            currentSection = { title: line, content: '' };
            contentLines = [];
        } else {
            contentLines.push(line);
        }

        // Create new slide every 10-15 lines to avoid overcrowding
        if (contentLines.length >= 12) {
            currentSection.content = contentLines.join('\n');
            sections.push({ ...currentSection });
            currentSection = { title: '', content: '' };
            contentLines = [];
        }
    }

    // Add final section
    if (currentSection.title || contentLines.length > 0) {
        currentSection.content = contentLines.join('\n');
        sections.push(currentSection);
    }

    return sections.slice(0, 30); // Limit to 30 slides
}

/**
 * Enhanced Word to PowerPoint conversion with formatting preservation
 */
async function wordToPowerPoint(wordPath) {
    try {
        console.log('Starting enhanced Word to PowerPoint conversion...');

        // Extract HTML to preserve formatting
        const result = await mammoth.convertToHtml({ path: wordPath });
        const html = result.value;

        // Also get raw text
        const textResult = await mammoth.extractRawText({ path: wordPath });
        const text = textResult.value;

        const pptx = new PptxGenJS();
        pptx.author = 'وەرگێڕ Converter';
        pptx.title = 'Converted from Word';

        // Parse HTML to extract structure
        const sections = parseWordContent(text, html);

        console.log(`Created ${sections.length} slides from Word document`);

        sections.forEach((section, index) => {
            const slide = pptx.addSlide();

            // Add title if exists
            if (section.title) {
                slide.addText(section.title, {
                    x: 0.5,
                    y: 0.5,
                    w: 9,
                    h: 1,
                    fontSize: 28,
                    bold: true,
                    color: '1F4788'
                });
            }

            // Add content
            if (section.content) {
                const yPos = section.title ? 1.8 : 0.5;
                const height = section.title ? 5.2 : 6.5;

                slide.addText(section.content, {
                    x: 0.5,
                    y: yPos,
                    w: 9,
                    h: height,
                    fontSize: 16,
                    color: '333333',
                    valign: 'top'
                });
            }

            // Add table if exists
            if (section.table) {
                slide.addTable(section.table, {
                    x: 0.5,
                    y: section.title ? 2.0 : 0.5,
                    w: 9,
                    fontSize: 12,
                    color: '333333',
                    border: { pt: 1, color: 'CCCCCC' }
                });
            }

            // Footer
            slide.addText(`Slide ${index + 1} | وەرگێڕ`, {
                x: 0.5,
                y: 7.2,
                w: 9,
                h: 0.3,
                fontSize: 10,
                color: '999999',
                align: 'center'
            });
        });

        const outputPath = path.join(path.dirname(wordPath), `converted-${Date.now()}.pptx`);
        await pptx.writeFile(outputPath);

        console.log('Word to PowerPoint conversion completed');
        return outputPath;
    } catch (error) {
        console.error('Word to PowerPoint error:', error);
        throw new Error('Failed to convert Word to PowerPoint: ' + error.message);
    }
}

/**
 * Parse Word content into structured sections
 */
function parseWordContent(text, html) {
    const sections = [];
    const paragraphs = text.split('\n\n').filter(p => p.trim());

    let currentSection = null;

    for (let i = 0; i < paragraphs.length; i++) {
        const para = paragraphs[i].trim();

        // Detect headings (short paragraphs, likely titles)
        const isHeading = para.length < 100 &&
            para.length > 0 &&
            !para.includes('\n') &&
            (i === 0 || paragraphs[i - 1].length > 100);

        if (isHeading) {
            // Save previous section
            if (currentSection) {
                sections.push(currentSection);
            }
            // Start new section
            currentSection = { title: para, content: '' };
        } else {
            if (!currentSection) {
                currentSection = { title: '', content: '' };
            }
            currentSection.content += (currentSection.content ? '\n\n' : '') + para;
        }

        // Limit content length per slide
        if (currentSection && currentSection.content.length > 800) {
            sections.push(currentSection);
            currentSection = null;
        }
    }

    // Add final section
    if (currentSection) {
        sections.push(currentSection);
    }

    return sections.slice(0, 25);
}

/**
 * Enhanced PowerPoint to Word conversion
 */
async function powerPointToWord(pptPath) {
    try {
        console.log('Starting PowerPoint to Word conversion...');

        // Extract text from PPTX using JSZip
        const zip = new AdmZip(pptPath);
        const zipEntries = zip.getEntries();

        const slides = [];
        let slideTexts = [];

        // Extract slide content from XML
        zipEntries.forEach(entry => {
            if (entry.entryName.match(/ppt\/slides\/slide\d+\.xml/)) {
                const content = entry.getData().toString('utf8');
                // Extract text from XML (basic extraction)
                const textMatches = content.match(/<a:t>([^<]+)<\/a:t>/g);
                if (textMatches) {
                    const slideText = textMatches
                        .map(match => match.replace(/<\/?a:t>/g, ''))
                        .join('\n');
                    slideTexts.push(slideText);
                }
            }
        });

        console.log(`Extracted ${slideTexts.length} slides from PowerPoint`);

        // Create Word document with slides as sections
        const paragraphs = [];

        slideTexts.forEach((slideText, index) => {
            // Add slide number as heading
            paragraphs.push(new Paragraph({
                text: `Slide ${index + 1}`,
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }));

            // Add slide content
            const lines = slideText.split('\n').filter(l => l.trim());
            lines.forEach(line => {
                paragraphs.push(new Paragraph({
                    text: line,
                    spacing: { after: 150 }
                }));
            });

            // Add spacing between slides
            paragraphs.push(new Paragraph({ text: '' }));
        });

        const doc = new Document({
            sections: [{
                properties: {},
                children: paragraphs
            }]
        });

        const outputPath = path.join(path.dirname(pptPath), `converted-${Date.now()}.docx`);
        const buffer = await Packer.toBuffer(doc);
        await fs.writeFile(outputPath, buffer);

        console.log('PowerPoint to Word conversion completed');
        return outputPath;
    } catch (error) {
        console.error('PowerPoint to Word error:', error);
        throw new Error('Failed to convert PowerPoint to Word: ' + error.message);
    }
}

/**
 * Enhanced Excel to Word conversion with table formatting
 */
async function excelToWord(excelPath) {
    try {
        console.log('Starting enhanced Excel to Word conversion...');
        const fileBuffer = await fs.readFile(excelPath);
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

        const paragraphs = [];

        // Process each sheet
        workbook.SheetNames.forEach((sheetName, sheetIndex) => {
            const worksheet = workbook.Sheets[sheetName];

            // Add sheet name as heading
            paragraphs.push(new Paragraph({
                text: sheetName,
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }));

            // Convert to JSON to get data
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

            if (data.length > 0) {
                // Create table with proper formatting
                const tableRows = data.map((row, rowIndex) => {
                    const isHeader = rowIndex === 0;
                    return new TableRow({
                        children: row.map(cell =>
                            new TableCell({
                                children: [new Paragraph({
                                    children: [new TextRun({
                                        text: String(cell || ''),
                                        bold: isHeader,
                                        size: isHeader ? 24 : 20
                                    })]
                                })],
                                shading: isHeader ? {
                                    fill: '1F4788',
                                    color: 'FFFFFF'
                                } : undefined
                            })
                        )
                    });
                });

                const table = new Table({
                    rows: tableRows,
                    width: {
                        size: 100,
                        type: 'pct'
                    },
                    borders: {
                        top: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
                        bottom: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
                        left: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
                        right: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
                        insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
                        insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }
                    }
                });

                paragraphs.push(table);
            }

            // Add spacing between sheets
            if (sheetIndex < workbook.SheetNames.length - 1) {
                paragraphs.push(new Paragraph({ text: '' }));
            }
        });

        const doc = new Document({
            sections: [{
                properties: {},
                children: paragraphs
            }]
        });

        const outputPath = path.join(path.dirname(excelPath), `converted-${Date.now()}.docx`);
        const docBuffer = await Packer.toBuffer(doc);
        await fs.writeFile(outputPath, docBuffer);

        console.log('Excel to Word conversion completed');
        return outputPath;
    } catch (error) {
        console.error('Excel to Word error:', error);
        throw new Error('Failed to convert Excel to Word: ' + error.message);
    }
}

/**
 * Enhanced Word to Excel conversion
 */
async function wordToExcel(wordPath) {
    try {
        console.log('Starting enhanced Word to Excel conversion...');
        
        // Extract HTML to preserve more structure
        const result = await mammoth.convertToHtml({ path: wordPath });
        const html = result.value;
        const textResult = await mammoth.extractRawText({ path: wordPath });
        const text = textResult.value;

        const wb = XLSX.utils.book_new();

        // Check if there are tables in the document
        const tableMatches = html.match(/<table[\s\S]*?<\/table>/gi);
        
        if (tableMatches && tableMatches.length > 0) {
            // Process each table
            tableMatches.forEach((tableHtml, tableIndex) => {
                const rows = [];
                const rowMatches = tableHtml.match(/<tr[\s\S]*?<\/tr>/gi);
                
                if (rowMatches) {
                    rowMatches.forEach(rowHtml => {
                        const cells = [];
                        const cellMatches = rowHtml.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi);
                        
                        if (cellMatches) {
                            cellMatches.forEach(cellHtml => {
                                const cellText = cellHtml.replace(/<[^>]+>/g, '').trim();
                                cells.push(cellText);
                            });
                        }
                        
                        if (cells.length > 0) {
                            rows.push(cells);
                        }
                    });
                }
                
                if (rows.length > 0) {
                    const ws = XLSX.utils.aoa_to_sheet(rows);
                    
                    // Auto-size columns
                    const maxWidths = [];
                    rows.forEach(row => {
                        row.forEach((cell, i) => {
                            const cellLength = String(cell).length;
                            maxWidths[i] = Math.max(maxWidths[i] || 10, Math.min(cellLength + 2, 50));
                        });
                    });
                    ws['!cols'] = maxWidths.map(w => ({ wch: w }));
                    
                    XLSX.utils.book_append_sheet(wb, ws, `Table ${tableIndex + 1}`);
                }
            });
        }

        // Create main content sheet with structured data
        const lines = text.split('\n').filter(line => line.trim());
        
        // Detect structure: headings, paragraphs, lists
        const contentData = [['Type', 'Content', 'Characters', 'Words']];
        
        lines.forEach(line => {
            const trimmedLine = line.trim();
            let type = 'Paragraph';
            
            // Detect type based on length and content
            if (trimmedLine.length < 50 && !trimmedLine.endsWith('.') && !trimmedLine.endsWith(',')) {
                type = 'Heading/Title';
            } else if (trimmedLine.match(/^\d+\.|^[•\-\*]/)) {
                type = 'List Item';
            } else if (trimmedLine.length > 200) {
                type = 'Long Paragraph';
            }
            
            const wordCount = trimmedLine.split(/\s+/).length;
            
            contentData.push([
                type,
                trimmedLine,
                trimmedLine.length,
                wordCount
            ]);
        });

        const mainWs = XLSX.utils.aoa_to_sheet(contentData);
        
        // Set column widths
        mainWs['!cols'] = [
            { wch: 15 },  // Type
            { wch: 80 },  // Content
            { wch: 12 },  // Characters
            { wch: 10 }   // Words
        ];

        // Insert main sheet at the beginning
        XLSX.utils.book_append_sheet(wb, mainWs, 'Document Content');

        // Create summary sheet
        const summaryData = [
            ['Document Summary', ''],
            ['Total Lines', lines.length],
            ['Total Characters', text.length],
            ['Total Words', text.split(/\s+/).length],
            ['Tables Found', tableMatches ? tableMatches.length : 0],
            ['', ''],
            ['Conversion Date', new Date().toLocaleString()]
        ];
        
        const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
        summaryWs['!cols'] = [{ wch: 20 }, { wch: 30 }];
        XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');

        const outputPath = path.join(path.dirname(wordPath), `converted-${Date.now()}.xlsx`);
        const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
        await fs.writeFile(outputPath, excelBuffer);

        console.log('Word to Excel conversion completed');
        return outputPath;
    } catch (error) {
        console.error('Word to Excel error:', error);
        throw new Error('Failed to convert Word to Excel: ' + error.message);
    }
}

export {
    pdfToWord,
    pdfToPowerPoint,
    wordToPowerPoint,
    powerPointToWord,
    excelToWord,
    wordToExcel
};
