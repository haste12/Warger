import './globals.css'

export const metadata = {
    title: 'وەڕگێڕ - گۆڕینی فۆرماتی پەڕگەکان',
    description: 'گۆڕینی فۆرماتی پەڕگەکانی PDF، Word، PowerPoint و Excel بە ئاسانی و خێرایی',
}

export default function RootLayout({ children }) {
    return (
        <html lang="ku" dir="rtl">
            <body>{children}</body>
        </html>
    )
}
