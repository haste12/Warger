# Vercel Deployment Guide for وەرگێڕ

## 🚀 Quick Deployment Steps

### 1. Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Git installed on your computer

### 2. Prepare Your Repository

```bash
# Navigate to your project
cd d:\warger

# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Prepare for Vercel deployment"

# Create a new repository on GitHub
# Then link it:
git remote add origin https://github.com/YOUR_USERNAME/werger.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

5. Click "Deploy"

### 4. Environment Variables (if needed)

In Vercel Dashboard → Settings → Environment Variables, add:

```
NODE_ENV=production
```

### 5. Custom Domain (Optional)

1. Go to your project in Vercel
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

---

## 📁 Project Structure for Vercel

```
frontend/
├── api/
│   └── convert/
│       └── [type].js          # Serverless function for conversions
├── public/
│   └── fonts/
│       └── Rabar_019.ttf
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── tools/
│   │       └── page.js
│   └── components/
│       ├── ConversionCard.js
│       ├── Footer.js
│       └── Navbar.js
├── utils/
│   └── converters.js          # Conversion utilities
├── .gitignore
├── next.config.js
├── package.json
├── vercel.json                # Vercel configuration
└── README.md
```

---

## ⚙️ Configuration Files

### vercel.json
Already created in your frontend directory. This configures:
- API routes
- Build settings
- Environment variables

### next.config.js
Your existing Next.js configuration works perfectly with Vercel.

---

## 🔧 How It Works on Vercel

### Frontend
- **Next.js App**: Deployed as static/server-rendered pages
- **Automatic Optimization**: Vercel optimizes images, fonts, and assets
- **CDN**: Global edge network for fast loading

### Backend (Serverless Functions)
- **API Routes**: `/api/convert/[type]` becomes serverless functions
- **Automatic Scaling**: Scales based on demand
- **File Storage**: Uses `/tmp` directory (temporary storage)
- **Execution Time**: 10 seconds for Hobby plan, 60 seconds for Pro

---

## 📊 Vercel Limits (Free Tier)

| Resource | Limit |
|----------|-------|
| Bandwidth | 100 GB/month |
| Serverless Function Execution | 100 GB-Hrs |
| Serverless Function Size | 50 MB |
| Serverless Function Duration | 10 seconds |
| Build Duration | 45 minutes |
| Deployments | Unlimited |

**Note**: For heavy file conversions, consider upgrading to Pro plan for:
- 60-second function execution
- 1 TB bandwidth
- Priority support

---

## 🐛 Troubleshooting

### Build Fails

**Issue**: Dependencies not installing
```bash
# Solution: Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Sharp library fails on Vercel
```bash
# Solution: Sharp is automatically handled by Vercel
# No action needed - Vercel uses optimized sharp binaries
```

### Function Timeout

**Issue**: Large file conversions timeout
```bash
# Solutions:
# 1. Upgrade to Vercel Pro (60s timeout)
# 2. Optimize conversion code
# 3. Add file size limits in frontend
```

### Memory Issues

**Issue**: Out of memory during conversion
```bash
# Solutions:
# 1. Limit file size to 10-20MB
# 2. Optimize image extraction (reduce scale)
# 3. Process files in chunks
```

---

## 🔒 Security Best Practices

1. **File Validation**
   - Already implemented: 50MB file size limit
   - Consider adding file type validation

2. **Rate Limiting**
   - Vercel provides DDoS protection
   - Consider adding custom rate limiting for API routes

3. **CORS**
   - Already configured in serverless function
   - Adjust origins for production

---

## 📈 Monitoring

### Vercel Analytics
1. Go to your project dashboard
2. Click "Analytics" tab
3. View:
   - Page views
   - Performance metrics
   - Function invocations
   - Error rates

### Logs
```bash
# View real-time logs
vercel logs

# View logs for specific deployment
vercel logs [deployment-url]
```

---

## 🚀 Performance Optimization

### Already Implemented
✅ Image optimization with Sharp
✅ Temporary file cleanup
✅ Efficient conversion algorithms
✅ Professional caching headers

### Recommended
- Enable Vercel Analytics
- Use Vercel Image Optimization for static images
- Implement client-side file validation
- Add progress indicators for conversions

---

## 📱 Testing Your Deployment

### After Deployment

1. **Test Homepage**
   ```
   https://your-project.vercel.app
   ```

2. **Test API Endpoint**
   ```
   https://your-project.vercel.app/api/convert/pdf-to-word
   ```

3. **Test Conversions**
   - Upload a small PDF
   - Try each conversion type
   - Check download functionality

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update conversion features"
git push

# Vercel automatically:
# 1. Detects the push
# 2. Builds your project
# 3. Runs tests (if configured)
# 4. Deploys to production
# 5. Sends you a notification
```

---

## 📞 Support

### Vercel Support
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Support: support@vercel.com (Pro plan)

### Project Issues
- Check logs in Vercel dashboard
- Review build logs
- Test locally first: `npm run dev`

---

## 🎯 Next Steps After Deployment

1. ✅ Test all conversion types
2. ✅ Add custom domain
3. ✅ Set up analytics
4. ✅ Monitor performance
5. ✅ Gather user feedback
6. ✅ Optimize based on usage patterns

---

## 💡 Pro Tips

1. **Preview Deployments**: Every branch gets a preview URL
2. **Rollback**: Instantly rollback to previous deployments
3. **Environment Variables**: Different values for preview/production
4. **Edge Functions**: Consider using Edge Runtime for faster cold starts
5. **Caching**: Vercel automatically caches static assets

---

**Deployment Checklist**

- [ ] Code pushed to GitHub
- [ ] Dependencies installed
- [ ] Build succeeds locally
- [ ] Environment variables configured
- [ ] Vercel project created
- [ ] First deployment successful
- [ ] All conversion types tested
- [ ] Custom domain added (optional)
- [ ] Analytics enabled
- [ ] Monitoring set up

---

**Ready to Deploy?**

```bash
cd frontend
vercel --prod
```

Your app will be live at: `https://your-project.vercel.app`

Good luck! 🚀
