export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-900 text-white py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 icon-container">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">وەڕگێڕ</h3>
                                <p className="text-sm text-gray-400">پلاتفۆرمی پیشەیی</p>
                            </div>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-md">
                            پلاتفۆرمێکی پیشەیی و پێشکەوتوو بۆ گۆڕینی فۆرماتی پەڕگەکان بە کوالیتی بەرز و ئاسانی تەواو.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">بەستەرە خێراکان</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    سەرەتا
                                </a>
                            </li>
                            <li>
                                <a href="/tools" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    خزمەتگوزارییەکان
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    دەربارەمان
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} وەڕگێڕ. هەموو مافێک پارێزراوە.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
