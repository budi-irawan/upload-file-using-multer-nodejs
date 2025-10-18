const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const documentFileController = require('../controller/documentFileController')

router.post('/upload', upload.single('document_file'), documentFileController.uploadFile)
router.get('/', documentFileController.getAllFiles)
router.get('/:id', documentFileController.getFileById)
router.delete('/:id', documentFileController.deleteFile)

module.exports = router