const express =require('express');
const app =express();

// using multer to upload image from frontend to backend
const multer = require('multer')

const cors =require("cors");
app.use(cors());
 
// creating a storage for the file being uploaded from client
const storageA = multer.diskStorage({
    destination: (req, file, cb) => {
        // public ==> specifying that public will be directory to store the uploaded file/image
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const download = multer({ storage: storageA }).single('file');// it can be single file in case of Single and multiple file in case of array('file')

// we are using this to specify the url for image.
app.use('/public/', express.static(__dirname + '/public/'));

app.post("/",(req,res)=>{
    download(req, res, (err) => {
        if (err) {
            return res.status(500).json(err.message)
        }
        return res.status(200).send(req.file)
        // sending the uploaded image as response.
    })
})


app.listen(5000,()=>{
    console.log("app working on port 5000");
})