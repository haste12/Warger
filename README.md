# وەرگێڕ (Wergêr) - File Conversion Platform

A professional, modern file conversion web application that supports conversions between PDF, Word, PowerPoint, and Excel formats.

## 🚀 Features

- **PDF to Word** - Convert PDF documents to editable Word files
- **PDF to PowerPoint** - Transform PDFs into presentation slides
- **Word to PowerPoint** - Create presentations from Word documents
- **PowerPoint to Word** - Extract presentation content to Word
- **Excel to Word** - Convert spreadsheets to formatted Word tables
- **Word to Excel** - Export Word content to Excel spreadsheets

## 🎨 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Document Processing Libraries
- **pdf-parse** - PDF text extraction
- **docx** - Word document creation and manipulation
- **pptxgenjs** - PowerPoint generation
- **xlsx** - Excel file handling
- **mammoth** - Word document parsing
- **adm-zip** - ZIP file handling for PPTX extraction

## 📁 Project Structure

```
warger/
├── backend/
│   ├── index.js                 # Express server
│   ├── utils/
│   │   └── converters.js        # Conversion logic
│   ├── uploads/                 # Temporary file storage
│   ├── package.json
│   └── CONVERSION_FEATURES.md   # Detailed feature documentation
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js          # Home page
│   │   │   ├── tools/
│   │   │   │   └── page.js      # Conversion tool page
│   │   │   ├── layout.js        # Root layout
│   │   │   └── globals.css      # Global styles
│   │   └── components/
│   │       ├── Navbar.js        # Navigation component
│   │       ├── Footer.js        # Footer component
│   │       └── ConversionCard.js # Conversion option card
│   ├── public/                  # Static assets
│   ├── package.json
│   └── tailwind.config.js       # Tailwind configuration
│
└── .gitignore                   # Git ignore rules
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🎯 Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Select the conversion type you need
3. Upload your file (drag & drop or click to browse)
4. Click "Convert" button
5. Download the converted file

## 📊 File Limits

- **Maximum file size**: 50MB
- **Supported formats**: PDF, DOCX, PPTX, XLSX
- **Slide limits**: 
  - PDF → PPTX: 30 slides max
  - Word → PPTX: 25 slides max

## 🔒 Security Features

- Files are automatically deleted after conversion
- No permanent storage of user files
- CORS enabled for secure cross-origin requests
- File type validation
- Size limit enforcement

## 🌟 Enhanced Conversion Features

### PDF → Word
- Automatic heading detection
- Paragraph structure preservation
- Text formatting (bold detection)
- Professional margins and spacing

### PDF → PowerPoint
- Intelligent slide creation
- Auto title detection
- Bullet point conversion
- Professional styling with corporate colors
- Slide numbers and footers

### Word → PowerPoint
- HTML parsing for formatting preservation
- Heading structure maintenance
- Table detection and conversion
- Smart sectioning

### PowerPoint → Word
- XML extraction from PPTX
- Slide-by-slide conversion
- Structured document output

### Excel → Word
- Multi-sheet support
- Formatted tables with borders
- Header row highlighting
- Professional styling

### Word → Excel
- Structured layout with columns
- Line numbering
- Content analysis

## 🚧 Known Limitations

- Images are not extracted from PDFs (text-only conversion)
- Complex formatting may be simplified
- Original fonts are not preserved
- Charts and SmartArt not fully preserved
- Macros are not converted

## 📝 Development

### Running in Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 🤝 Contributing

This is a private project. For issues or feature requests, please contact the development team.

## 📄 License

ISC

## 👨‍💻 Author

Developed with ❤️ for professional document conversion needs.

---

**Version**: 2.0 Enhanced  
**Last Updated**: January 28, 2026
