const path = require('path')
const fs = require('fs')

function handleUpload(file, options = {}) {
    const allowedMimeTypes = options.allowedMimeTypes || [
        'image/jpeg',
        'image/png',
        'application/pdf'
    ]
    const maxSizeMB = options.maxSizeMB || 0

    if (!file) {
        throw new Error('No file uploaded')
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
        try {
            fs.unlinkSync(file.path)
        } catch (error) {
            throw new Error(`Invalid file type : ${file.mimetype}`)
        }
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
        try {
            fs.unlinkSync(file.path)
        } catch (error) {
            throw new Error(`File too large `)
        }
    }

    return {
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: path.basename(file.path),
        extension: path.extname(file.originalname).toLowerCase(),
        uploadTime: new Date()
    }
}

module.exports = { handleUpload }