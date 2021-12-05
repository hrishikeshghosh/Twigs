import express from 'express'
import multer from 'multer'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../resources.js'
const router = express.Router()

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, `./profile_images`)
//   },
//   filename: (req, file, callback) => {
//     callback(
//       null,
//       new Date().toISOString().replace(/:/g, '-') +
//         '-' +
//         '(' +
//         req.body.uid +
//         ')' +
//         '-' +
//         file.fieldname +
//         '-' +
//         file.originalname
//     )
//   }
// })

const upload = multer({ storage: multer.memoryStorage() })

router.post('/', upload.single('profile'), (req, res, next) => {
  try {
    const file = req.file
    let path =
      'profiles/' +
      new Date().toISOString().replace(/:/g, '-') +
      '-' +
      file.fieldname +
      file.originalname
    const storageRef = ref(storage, path)
    const uploadTask = uploadBytesResumable(storageRef, file.buffer, {
      contentType: file.mimetype
    })

    uploadTask.on(
      'state_changed',
      snapshot => {
        console.log(
          'uploading: ' +
            Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ) +
            '%'
        )
      },
      err => console.log(err),
      () =>
        getDownloadURL(uploadTask.snapshot.ref)
          .then(url => {
            res.status(201).json({ data: url })
          })
          .catch(err => console.log(err))
    )
    // const filename = req.file.filename
    // const downloadLink = 'http://localhost:8080/profile_images/' + filename
    // res.status(201).json({ downloadable_Link: downloadLink })
  } catch (error) {
    console.log(error)
  }
})

export default router
