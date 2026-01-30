import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ConversionCard from '@/components/ConversionCard'

export default function Home() {
    const conversions = [
        {
            iconType: 'pdf-word',
            title: 'PDF بۆ Word',
            description: 'گۆڕینی بەڵگەنامەی PDF بۆ فۆرماتی Word بە پاراستنی فۆرمات و ناوەڕۆک',
            from: 'PDF',
            to: 'DOCX',
            href: '/tools?type=pdf-to-word'
        },
        {
            iconType: 'pdf-ppt',
            title: 'PDF بۆ PowerPoint',
            description: ' گۆرینی ( پی دی ئێف ) بۆ( پاورپۆینت )  ',
            from: 'PDF',
            to: 'PPTX',
            href: '/tools?type=pdf-to-ppt'
        },
        {
            iconType: 'word-ppt',
            title: 'Word بۆ PowerPoint',
            description: 'گۆڕینی بەڵگەنامەی Word بۆ  PowerPoint',
            from: 'DOCX',
            to: 'PPTX',
            href: '/tools?type=word-to-ppt'
        },
        {
            iconType: 'ppt-word',
            title: 'PowerPoint بۆ Word',
            description: '  گۆرینی فایلی pdf بۆ بەڵگەنامەی Word',
            from: 'PPTX',
            to: 'DOCX',
            href: '/tools?type=ppt-to-word'
        },
        {
            iconType: 'excel-word',
            title: 'Excel بۆ Word',
            description: 'گۆڕینی خشتەکانی Excel بۆ بەڵگەنامەی Word',
            from: 'XLSX',
            to: 'DOCX',
            href: '/tools?type=excel-to-word'
        },
        {
            iconType: 'word-excel',
            title: 'Word بۆ Excel',
            description: 'هەناردەکردنی داتاکانی Word بۆ خشتەی Excel',
            from: 'DOCX',
            to: 'XLSX',
            href: '/tools?type=word-to-excel'
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="hero-bg pt-32 pb-24 px-6 relative">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-white opacity-0 animate-fade-in-up">
                            <div className="inline-block mb-4">
                                <span className="px-4 py-2 bg-blue-600 bg-opacity-20 rounded-full text-sm font-semibold border border-blue-400 border-opacity-30">
                                    پلاتفۆرمی پیشەیی
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                وەڕگێڕ
                            </h1>
                            <h2 className="text-2xl md:text-3xl mb-6 text-gray-300">
                                گۆڕینی فۆرماتی پەڕگەکان
                            </h2>
                            <p className="text-xl mb-8 text-gray-400 leading-relaxed max-w-xl">
                                چارەسەرێکی پیشەیی و پێشکەوتوو بۆ گۆڕینی فۆرماتی بەڵگەنامەکانی PDF، Word، PowerPoint و Excel بە کوالیتی بەرز
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/tools" className="btn-primary text-lg px-10 py-4 text-center">
                                    دەست پێبکە ئێستا
                                </Link>
                                <a href="#features" className="btn-secondary text-lg px-10 py-4 text-center">
                                    زیاتر بزانە
                                </a>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-700">
                                <div className="opacity-0 animate-fade-in-up stagger-1">
                                    <div className="text-3xl font-bold text-blue-400">99.9%</div>
                                    <div className="text-sm text-gray-400 mt-1">وردی</div>
                                </div>
                                <div className="opacity-0 animate-fade-in-up stagger-2">
                                    <div className="text-3xl font-bold text-blue-400">24/7</div>
                                    <div className="text-sm text-gray-400 mt-1">بەردەستە</div>
                                </div>
                                <div className="opacity-0 animate-fade-in-up stagger-3">
                                    <div className="text-3xl font-bold text-blue-400">100%</div>
                                    <div className="text-sm text-gray-400 mt-1">پارێزراو</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className="hidden lg:block opacity-0 animate-scale-in stagger-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-600 opacity-20 blur-3xl rounded-full animate-pulse"></div>
                                <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
                                    <div className="grid grid-cols-2 gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className={`bg-white bg-opacity-10 rounded-xl p-6 animate-float`} style={{ animationDelay: `${i * 0.2}s` }}>
                                                <div className="w-12 h-12 bg-blue-600 rounded-lg mb-3 flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="h-2 bg-white bg-opacity-20 rounded mb-2"></div>
                                                <div className="h-2 bg-white bg-opacity-10 rounded w-3/4"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-6 bg-gray-50">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="section-title inline-block">بۆچی وەڕگێڕ؟</h2>
                        <p className="section-subtitle max-w-2xl mx-auto mt-6">
                            تەکنەلۆژیای پێشکەوتوو و ئەزموونی بەکارهێنەری نایاب بۆ گۆڕینی پەڕگەکانتان
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card opacity-0 animate-fade-in-up stagger-1">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">خێرا و کارا</h3>
                            <p className="text-gray-600 text-center leading-relaxed">
                                گۆڕینی پەڕگەکانتان لە چەند چرکەیەکدا بە بەکارهێنانی تەکنەلۆژیای پێشکەوتوو و سێرڤەرە بەهێزەکان
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card opacity-0 animate-fade-in-up stagger-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">پارێزراو و سەلامەت</h3>
                            <p className="text-gray-600 text-center leading-relaxed">
                                پەڕگەکانتان بە تەواوی شفرەکراون و دوای گۆڕین ڕاستەوخۆ لە سێرڤەرەکانمان دەسڕێنەوە
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card opacity-0 animate-fade-in-up stagger-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">کوالیتی بەرز</h3>
                            <p className="text-gray-600 text-center leading-relaxed">
                                پاراستنی فۆرمات، وێنە و هەموو وردەکارییەکانی بەڵگەنامە ڕەسەنەکەتان بە وردی تەواو
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 px-6 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="section-title inline-block">خزمەتگوزارییەکانمان</h2>
                        <p className="section-subtitle max-w-2xl mx-auto mt-6">
                            هەڵبژاردنی جۆری گۆڕین کە پێویستتە
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {conversions.map((conversion, index) => (
                            <div key={index} className={`opacity-0 animate-fade-in-up stagger-${(index % 6) + 1}`}>
                                <ConversionCard {...conversion} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
                </div>
                <div className="container mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        ئامادەیت بۆ دەستپێکردن؟
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        دەست بکە بە گۆڕینی پەڕگەکانت ئێستا بە ئاسانی، خێرایی و بێبەرامبەر
                    </p>
                    <Link href="/tools" className="btn-primary text-lg px-12 py-4 inline-block">
                        دەست پێبکە بێبەرامبەر
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
