const DocumentFile = require('../model/documentFile')
const { handleUpload } = require('../helper/handleFileUpload')
const path = require('path')
const fs = require('fs')

class DocumentFileController {
    static async uploadFile(req, res) {
        try {
            if (!req.file) {
                res.status(400).json({ message: 'No file uploaded'})
            } else {
                const metaData = handleUpload(req.file, {
                    allowedMimeTypes: ['image/jpeg', 'image/png', 'application/pdf'],
                    maxSizeMB: 10
                })
                const dataFile = await DocumentFile.create({
                    originalName: metaData.originalName,
                    mimeType: metaData.mimetype,
                    size: metaData.size,
                    path: req.file.path,
                })
                res.status(201).json({
                    message: 'File uploaded successfully',
                    data: dataFile
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message})
        }
    }

    static async getAllFiles(req, res) {
        try {
            const dataFiles = await DocumentFile.findAll({
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json({
                message: 'success',
                data: dataFiles
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message})
        }
    }

    static async getFileById(req, res) {
        const id = req.params.id 
        try {
            const dataFile = await DocumentFile.findByPk(id)
            const baseUrl = `${req.protocol}://${req.get('host')}`
            let result = {
                id: dataFile.id,
                originalName: dataFile.originalName,
                mimeType: dataFile.mimeType,
                size: dataFile.size,
                url: `${baseUrl}/upload/${dataFile.path}`
            }
            res.status(200).json({
                message: 'success',
                data: result
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message})
        }
    }

    static async deleteFile(req, res) {
        const id = req.params.id 
        try {
            const dataFile = await DocumentFile.findByPk(id)
            const uploadDir = path.resolve('upload')
            const filePath = path.join(uploadDir, dataFile.path)
            if (fs.existsSync(filePath)){
                fs.unlink(dataFile.path, (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: err.message})
                    }
                    console.log("file deleted");
                })
            }
            await dataFile.destroy()
            res.status(200).json({
                message: 'File deleted successfully'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message})
        }
    }
}

module.exports = DocumentFileController