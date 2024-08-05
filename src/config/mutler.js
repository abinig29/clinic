import multer from "multer";

const DIR = "./uploads/"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
}); 

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg|webp)$/)) {
        return cb(new Error('Please upload a valid image file'))
    }
    cb(undefined, true)
}


export const upload = multer({
    storage:storage, 
    limits:{fileSize: 1024 * 1024}, 
    fileFilter:fileFilter
})


// import multer from "multer";

// const multerStorage = multer.diskStorage({
//   destination: (request, file, callback) => {
//     callback(null, __dirname);
//   },

//   filename: (request, file, callback) => {
//     callback(null, file.originalname);
//   },
// });

// export const multerUpload = multer({ storage: multerStorage });