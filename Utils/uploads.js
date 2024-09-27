import fs from 'fs';
import path from 'path';
import multer from 'multer';




const  uploadDr = path.join(import.meta.dirname, "../upload");
    if(!fs.existsSync(uploadDr)) {
        fs.mkdirSync(uploadDr);
    }


    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, uploadDr);
        },
        filename: function (req, file, callback)  {
            let ext = path.extname(file.originalname);
            callback(null, Date.now()  + ext);
        },
    });


    export const upload = multer({
        storage, 
        fileFilter: function (req, file, callback) {
            if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                callback(null, true);
            }
            else  {
                callback(new Error("File .png va .jpeg format da emas"), false);
            }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});