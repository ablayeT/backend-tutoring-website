const multer = require('multer');

const MIMES_TYPES = {
    'image/jpg': 'jpg', 
    'image/jpeg': 'jpeg',
    'image/png' : 'png',
    'image/webp': 'webp',

}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // Spécifier le dossier de destination pour les fichiers telechargés
         callback(null, 'images/'); 
    },
    filename: function(req, file, callback) {
        const name = file.originalname.split(' ').join('-')
        console.log('name:', name);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = MIMES_TYPES[file.mimetype]
        callback(null, name + '-' + uniqueSuffix + '.' + extension)

    }
})


const multerUpload = multer({storage}).single('imageUrl')

module.exports = multerUpload; 