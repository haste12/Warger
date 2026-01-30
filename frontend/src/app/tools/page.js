'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import axios from 'axios'

function ToolsPageContent() {
    const searchParams = useSearchParams()
    const [selectedType, setSelectedType] = useState('')
    const [file, setFile] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [isConverting, setIsConverting] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const type = searchParams.get('type')
        if (type) {
            setSelectedType(type)
        }
    }, [searchParams])

    const conversionTypes = [
        {
            id: 'pdf-to-word',
            name: 'PDF بۆ Word',
            from: 'PDF',
            to: 'DOCX',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            id: 'pdf-to-ppt',
            name: 'PDF بۆ PowerPoint',
            from: 'PDF',
            to: 'PPTX',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: 'word-to-ppt',
            name: 'Word بۆ PowerPoint',
            from: 'DOCX',
            to: 'PPTX',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            id: 'ppt-to-word',
            name: 'PowerPoint بۆ Word',
            from: 'PPTX',
            to: 'DOCX',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: 'excel-to-word',
            name: 'Excel بۆ Word',
            from: 'XLSX',
            to: 'DOCX',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: 'word-to-excel',
            name: 'Word بۆ Excel',
            from: 'DOCX',
            to: 'XLSX',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
            )
        }
    ]

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) {
            setFile(droppedFile)
            setError('')
        }
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            setError('')
        }
    }

    const handleConvert = async () => {
        if (!file || !selectedType) {
            setError('تکایە پەڕگە و جۆری گۆڕین هەڵبژێرە')
            return
        }

        setIsConverting(true)
        setProgress(0)
        setError('')
        setSuccess(false)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval)
                        return 90
                    }
                    return prev + 10
                })
            }, 200)

            const response = await axios.post(
                `/api/convert/${selectedType}`,
                formData,
                {
                    responseType: 'blob'
                }
            )

            clearInterval(progressInterval)
            setProgress(100)

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url

            const extension = conversionTypes.find(t => t.id === selectedType)?.to.toLowerCase()
            link.setAttribute('download', `converted.${extension}`)
            document.body.appendChild(link)
            link.click()
            link.remove()

            setSuccess(true)
            setTimeout(() => {
                setFile(null)
                setProgress(0)
                setSuccess(false)
            }, 3000)

        } catch (err) {
            console.error('Conversion error:', err)
            setError('هەڵەیەک ڕوویدا لە گۆڕینی پەڕگە. تکایە دووبارە هەوڵبدەرەوە.')
        } finally {
            setIsConverting(false)
        }
    }

    const currentConversion = conversionTypes.find(t => t.id === selectedType)

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-12 animate-fade-in-up">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            خزمەتگوزارییەکانی گۆڕین
                        </h1>
                        <p className="text-xl text-gray-600">
                            گۆڕینی پیشەیی و خێرای فۆرماتی پەڕگەکان
                        </p>
                    </div>

                    {/* Conversion Type Selector */}
                    <div className="card mb-8 animate-fade-in-up stagger-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">جۆری گۆڕین هەڵبژێرە</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {conversionTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`p-5 rounded-xl border-2 transition-all duration-300 ${selectedType === type.id
                                        ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${selectedType === type.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {type.icon}
                                        </div>
                                        <div className="text-right flex-1">
                                            <div className="font-bold text-gray-900">{type.name}</div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {type.from} → {type.to}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* File Upload Area */}
                    {selectedType && (
                        <div className="card mb-8 animate-scale-in">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">بارکردنی پەڕگە</h2>

                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`upload-area ${isDragging ? 'drag-over' : ''}`}
                            >
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept={currentConversion ? `.${currentConversion.from.toLowerCase()}` : '*'}
                                />
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </div>
                                        <p className="text-xl font-semibold text-gray-700 mb-2">
                                            پەڕگە بکێشە بۆ ئێرە یان کلیک بکە
                                        </p>
                                        <p className="text-gray-500">
                                            فۆرماتی پشتگیریکراو: {currentConversion?.from}
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {/* Selected File */}
                            {file && (
                                <div className="mt-6 p-5 bg-green-50 border-2 border-green-200 rounded-xl animate-scale-in">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{file.name}</p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setFile(null)}
                                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-100 rounded-lg transition-all"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mt-6 p-5 bg-red-50 border-2 border-red-200 rounded-xl animate-scale-in">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-red-700 font-semibold">{error}</p>
                                    </div>
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="mt-6 p-5 bg-green-50 border-2 border-green-200 rounded-xl animate-scale-in">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-green-700 font-bold">
                                            گۆڕین سەرکەوتوو بوو! داگرتن دەست پێدەکات...
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Progress Bar */}
                            {isConverting && (
                                <div className="mt-6 animate-fade-in">
                                    <div className="flex justify-between mb-3">
                                        <span className="text-gray-700 font-semibold">گۆڕین لە جێبەجێکردندایە...</span>
                                        <span className="text-blue-600 font-bold">{progress}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Convert Button */}
                            <div className="mt-8 text-center">
                                <button
                                    onClick={handleConvert}
                                    disabled={!file || isConverting}
                                    className={`btn-primary text-lg px-12 py-4 ${(!file || isConverting) ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {isConverting ? (
                                        <span className="flex items-center gap-3 justify-center">
                                            <svg className="w-5 h-5 spinner" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            گۆڕین...
                                        </span>
                                    ) : (
                                        'دەست بکە بە گۆڕین'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Info Section */}
                    <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-10 text-white animate-fade-in-up stagger-3">
                        <h3 className="text-2xl font-bold mb-8 text-center">چۆنیەتی بەکارهێنان</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                    <span className="text-3xl font-bold">١</span>
                                </div>
                                <p className="font-semibold text-lg">جۆری گۆڕین هەڵبژێرە</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                    <span className="text-3xl font-bold">٢</span>
                                </div>
                                <p className="font-semibold text-lg">پەڕگەکەت باربکە</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                    <span className="text-3xl font-bold">٣</span>
                                </div>
                                <p className="font-semibold text-lg">دابگرە و بەکاری بهێنە</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default function ToolsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">چاوەڕوان بە...</p>
                </div>
            </div>
        }>
            <ToolsPageContent />
        </Suspense>
    )
}
