# وەرگێڕ (Wergêr) - Professional Document Converter

A modern, professional document conversion platform built with Next.js and deployed on Vercel.

![Version](https://img.shields.io/badge/version-2.1-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.1-black)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🔄 Conversion Types
- **PDF → Word** - Extract text and images
- **PDF → PowerPoint** - Create professional presentations
- **Word → PowerPoint** - Transform documents into slides
- **PowerPoint → Word** - Convert presentations to documents
- **Excel → Word** - Format tables beautifully
- **Word → Excel** - Structure data in spreadsheets

### 🎨 Advanced Capabilities
- ✅ **Image Extraction** - Automatically extract and embed images from PDFs
- ✅ **Smart Structure** - Intelligent heading and section detection
- ✅ **Table Formatting** - Professional table styling with headers
- ✅ **Professional Design** - Corporate color schemes and layouts
- ✅ **Kurdish Support** - Full RTL text support
- ✅ **High Quality** - Optimized image sizes and formatting

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📦 Tech Stack

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client

### Backend (Serverless)
- **Vercel Functions** - Serverless API
- **Multer** - File upload handling
- **pdf-parse** - PDF text extraction
- **pdf-to-img** - Image extraction
- **docx** - Word document creation
- **pptxgenjs** - PowerPoint generation
- **xlsx** - Excel file handling
- **sharp** - Image optimization
- **mammoth** - Word parsing
- **adm-zip** - Archive handling

## 🌐 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

See [VERCEL_DEPLOYMENT.md](../VERCEL_DEPLOYMENT.md) for detailed instructions.

## 📁 Project Structure

```
frontend/
├── api/
│   └── convert/
│       └── [type].js          # Serverless conversion API
├── public/
│   └── fonts/
│       └── Rabar_019.ttf      # Kurdish font
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   ├── page.js            # Homepage
│   │   └── tools/
│   │       └── page.js        # Conversion tools page
│   └── components/
│       ├── ConversionCard.js  # Conversion option card
│       ├── Footer.js          # Site footer
│       └── Navbar.js          # Navigation bar
├── utils/
│   └── converters.js          # Conversion logic
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
└── vercel.json                # Vercel configuration
```

## 🎯 API Routes

All conversion endpoints follow this pattern:

```
POST /api/convert/[type]
```

### Available Types
- `pdf-to-word`
- `pdf-to-ppt`
- `word-to-ppt`
- `ppt-to-word`
- `excel-to-word`
- `word-to-excel`

### Example Usage

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/convert/pdf-to-word', {
    method: 'POST',
    body: formData
});

const blob = await response.blob();
// Download the converted file
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#2563eb`
- **Dark Blue**: `#1F4788`
- **Light Gray**: `#f8fafc`
- **Medium Gray**: `#64748b`

### Typography
- **Font Family**: Rabar_019 (Kurdish), Segoe UI (fallback)
- **Direction**: RTL (Right-to-Left)

### Components
- Professional glassmorphism effects
- Smooth animations and transitions
- Responsive design for all devices
- Accessible and user-friendly

## 📊 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Conversion Speed**: 2-10s depending on file size

## 🔒 Security

- File size limit: 50MB
- Automatic file cleanup after conversion
- CORS protection
- Input validation
- Temporary storage in `/tmp`

## 🐛 Known Limitations

- **Serverless Timeout**: 10 seconds (Free tier), 60 seconds (Pro)
- **File Size**: Recommended < 20MB for best performance
- **Images**: Converted to raster format
- **Fonts**: Uses default fonts, not original
- **Complex Formatting**: Some advanced features may be simplified

## 🔮 Roadmap

- [ ] OCR support for scanned PDFs
- [ ] Batch file processing
- [ ] Chart and graph extraction
- [ ] Font preservation
- [ ] Cloud storage integration
- [ ] User accounts and history
- [ ] API rate limiting
- [ ] Progress indicators

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions:
- Check the [deployment guide](../VERCEL_DEPLOYMENT.md)
- Review [conversion features](../backend/ENHANCED_FEATURES_SHOWCASE.md)
- Open an issue on GitHub

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and serverless functions
- Open source library maintainers

---

**Made with ❤️ for the Kurdish community**

وەرگێڕ - گۆڕینی فۆرماتی پەڕگەکان بە ئاسانی
