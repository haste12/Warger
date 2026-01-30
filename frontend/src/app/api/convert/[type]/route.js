import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, unlink, mkdir } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

// Import conversion utilities
import {
    pdfToWord,
    pdfToPowerPoint,
    wordToPowerPoint,
    powerPointToWord,
    excelToWord,
    wordToExcel
} from '../../../../utils/converters.js'

// Helper function to clean up files
async function cleanupFiles(filePaths) {
    for (const filePath of filePaths) {
        try {
            await unlink(filePath)
        } catch (error) {
            console.error('Error deleting file:', filePath, error)
        }
    }
}

// Handle file upload and conversion
export async function POST(request, { params }) {
    try {
        const { type } = params
        const formData = await request.formData()
        const file = formData.get('file')

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        // Create temporary directory
        const uploadDir = join(tmpdir(), 'uploads')
        await mkdir(uploadDir, { recursive: true })

        // Save uploaded file temporarily
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const tempFilePath = join(uploadDir, uniqueSuffix + '-' + file.name)
        await writeFile(tempFilePath, buffer)

        let outputPath
        let fileName
        let contentType

        try {
            switch (type) {
                case 'pdf-to-word':
                    outputPath = await pdfToWord(tempFilePath)
                    fileName = 'converted.docx'
                    contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    break
                case 'pdf-to-ppt':
                    outputPath = await pdfToPowerPoint(tempFilePath)
                    fileName = 'converted.pptx'
                    contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                    break
                case 'word-to-ppt':
                    outputPath = await wordToPowerPoint(tempFilePath)
                    fileName = 'converted.pptx'
                    contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                    break
                case 'ppt-to-word':
                    outputPath = await powerPointToWord(tempFilePath)
                    fileName = 'converted.docx'
                    contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    break
                case 'excel-to-word':
                    outputPath = await excelToWord(tempFilePath)
                    fileName = 'converted.docx'
                    contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    break
                case 'word-to-excel':
                    outputPath = await wordToExcel(tempFilePath)
                    fileName = 'converted.xlsx'
                    contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    break
                default:
                    await cleanupFiles([tempFilePath])
                    return NextResponse.json({ error: 'Invalid conversion type' }, { status: 400 })
            }

            // Read the converted file
            const fileBuffer = await readFile(outputPath)

            // Clean up files
            await cleanupFiles([tempFilePath, outputPath])

            // Return the file as a download
            return new NextResponse(fileBuffer, {
                headers: {
                    'Content-Type': contentType,
                    'Content-Disposition': `attachment; filename="${fileName}"`,
                    'Content-Length': fileBuffer.length.toString(),
                },
            })

        } catch (conversionError) {
            console.error('Conversion error:', conversionError)
            await cleanupFiles([tempFilePath])
            return NextResponse.json({ 
                error: 'Conversion failed', 
                details: conversionError.message 
            }, { status: 500 })
        }

    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ 
            error: 'Internal server error', 
            details: error.message 
        }, { status: 500 })
    }
}

// Handle CORS preflight
export async function OPTIONS(request) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    })
}