// not working import '@tensorflow/tfjs-node'
import canvas from 'canvas'
import faceApi from 'face-api.js'
import path from 'path'

const verifyPerson = async (idImgUrl, personImgUrl) => {
  let matched = false
  const { Canvas, Image, ImageData } = canvas
  console.log('Loaded successfully canvas')

  const __dirname = path.resolve()

  const weightsPath = path.join(__dirname, './backend/commons/weights')

  faceApi.env.monkeyPatch({ Canvas, Image, ImageData })
  console.log('Loaded successfully all the modules')

  let imgUrl = path.join(__dirname, personImgUrl)

  let imgUrl2 = path.join(__dirname, idImgUrl)

  console.log('Loading new models')

  await faceApi.nets.faceRecognitionNet.loadFromDisk(weightsPath)
  await faceApi.nets.faceLandmark68Net.loadFromDisk(weightsPath)
  await faceApi.nets.ssdMobilenetv1.loadFromDisk(weightsPath)
  console.log('loaded new weights and models')

  const img = await canvas.loadImage(imgUrl)
  console.log('ID image converted to buffer')

  const faceDetectionOptions = getFaceDetectorOptions()

  const faceDescriptionOne = await faceApi
    .detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor()

  const img2 = await canvas.loadImage(imgUrl2)
  console.log('Photo converted to buffer')

  const faceDescriptionTwo = await faceApi
    .detectSingleFace(img2)
    .withFaceLandmarks()
    .withFaceDescriptor()

  console.log('All detections called successfully')

  // Similarity match
  if (faceDescriptionOne !== undefined && faceDescriptionTwo !== undefined) {
    const similarityMatch = faceApi.euclideanDistance(
      faceDescriptionOne.descriptor,
      faceDescriptionTwo.descriptor
    )
    console.log(`Similarity match is ${similarityMatch}`)
    if (similarityMatch < 0.5) {
      console.log('Images have matched matched')
      matched = true
    } else {
      console.log('NO MATCH')
    }
  } else {
    console.log('NO FACES DETECTED ')
    matched = false
  }
  return matched
}

const getFaceDetectorOptions = () => {
  // SsdMobilenetv1Options
  const minConfidence = 0.5
  return new faceApi.SsdMobilenetv1Options({ minConfidence: minConfidence })
}

export { verifyPerson }
