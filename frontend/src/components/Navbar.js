'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav ${scrolled ? 'shadow-lg' : 'shadow-md'
            }`}>
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-14 h-14 icon-container">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-gray-900">
                                وەڕگێڕ
                            </span>
                            <p className="text-xs text-gray-600">
                                پلاتفۆرمی پیشەیی
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="font-semibold transition-all duration-300 text-gray-700 hover:text-blue-600"
                        >
                            سەرەتا
                        </Link>
                        <Link
                            href="/tools"
                            className="font-semibold transition-all duration-300 text-gray-700 hover:text-blue-600"
                        >
                            خزمەتگوزارییەکان
                        </Link>
                        <Link
                            href="/tools"
                            className="btn-primary"
                        >
                            دەست پێبکە
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg transition-colors text-gray-900"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-6 pb-4 space-y-4 animate-fade-in-up">
                        <Link
                            href="/"
                            className="block font-semibold py-2 transition-colors text-gray-700 hover:text-blue-600"
                        >
                            سەرەتا
                        </Link>
                        <Link
                            href="/tools"
                            className="block font-semibold py-2 transition-colors text-gray-700 hover:text-blue-600"
                        >
                            خزمەتگوزارییەکان
                        </Link>
                        <Link href="/tools" className="block btn-primary text-center">
                            دەست پێبکە
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}
