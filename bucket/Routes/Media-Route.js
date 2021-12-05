import express from 'express'
const router = express.Router()
import multer from 'multer'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadString
} from 'firebase/storage'
import { storage } from '../resources.js'

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => callback(null, './media'),

//   filename: (req, file, callback) => {
//     callback(
//       null,
//       new Date().toISOString().replace(/:/g, '-') +
//         '-' +
//         file.fieldname +
//         file.originalname
//     )
//   }
// })

const uploadMedia = async file => {
  try {
    let dowloadUrl = ''
  } catch (error) {
    console.log(error)
  }
}

const upload = multer({ storage: multer.memoryStorage() })

router.post('/', upload.single('media'), async (req, res, next) => {
  try {
    const file = req.file
    let path =
      'posts/' +
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
    // const downloadLink = 'http://localhost:8080/media/' + filename
    // console.log(downloadLink)
    // res.status(201).json({ downloadable_Link: downloadLink })
  } catch (error) {
    console.log(error.message)
  }
})

router.patch('/', upload.single('media'), (req, res, next) => {
  try {
    console.log(req.file)
    const filename = req.file.filename
    const downloadLink = 'http://localhost:8080/media/' + filename
    console.log(downloadLink)
    res.status(201).json({ downloadable_Link: downloadLink })
  } catch (error) {
    console.log(error.message)
  }
})

export default router
