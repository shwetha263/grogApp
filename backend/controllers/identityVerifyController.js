import asyncHandler from 'express-async-handler'

import { verifyPerson } from '../commons/faceReck.js'
import { v4 as uuid } from 'uuid'
import { promises as fs } from 'fs'
import path from 'path'
import { createWorker } from 'tesseract.js'

// verify identity
// {image: <path>} will be the JSON body
// @access Public
const verifyIdentity = asyncHandler(async (req, res) => {
  console.log('verify id')
  console.log(`${JSON.stringify(req.body)}`)

  const idImagePath = req.body.id
  const personImagePath = req.body.person

  console.log(`next id: ${idImagePath}  person: ${personImagePath}`)

  // personImagePath = path.join(__dirname, personImagePath)
  // const personImage = await fs.readFile(personImagePath)
  // console.log(personImage)

  // idImagePath = path.join(__dirname, idImagePath)
  // const idImage = await fs.readFile(idImagePath)
  // console.log(idImage)

  let [result] = await Promise.all([verifyPerson(idImagePath, personImagePath)])
  // let result = await verifyPerson(idImagePath, personImagePath)
  let age
  let activeNumber
  let verificationCode = {}

  const __dirname = path.resolve()

  try {
    await fs.unlink(path.join(__dirname, idImagePath))
  } catch (err) {
    console.error(err)
  }
  try {
    await fs.unlink(path.join(__dirname, personImagePath))
  } catch (err) {
    console.error(err)
  }

  if (result) {
    activeNumber = uuid()
    verificationCode.activeNumber = activeNumber

    verificationCode.age = req.body.age
  }
  console.log('verification Completed')
  res
    .status(200)
    .json({ personMatched: result, verificationCode: verificationCode })
})

const extractText = (req, res) => {
  // Tesseract.recognize(
  //   'https://tesseract.projectnaptha.com/img/eng_bw.png',
  //   'eng',
  //   { logger: (m) => console.log(m) }
  // ).then(({ data: { text } }) => {
  //   console.log(text)
  // })
  const worker = createWorker({
    logger: (m) => console.log(m),
  })
  const __dirname = path.resolve()
  const idPath = path.join(__dirname, '/uploads/id.png')

  ;(async () => {
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    const {
      data: { text },
    } = await worker.recognize(idPath)
    console.log(text)
    await worker.terminate()
    res.json(text)
  })()
}
export { verifyIdentity, extractText }
