const multer = require('multer') 
const  { GridFsStorage } = require("multer-gridfs-storage")
const crypto = require('crypto') 
const path = require('path')
const variableApp = require('./variable')
 
const storage = new GridFsStorage({
    url: variableApp.mongooseUrl,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) return reject(err)
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename,
                    bucketName: 'uploads',
                };
                resolve(fileInfo)
            })
        })
    }
})

const uploadMulter = multer({ storage })  

module.exports = uploadMulter