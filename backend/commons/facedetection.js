import faceApi from 'face-api.js'

export const faceDetectionNet = faceapi.nets.ssdMobilenetv1

// SsdMobilenetv1Options
const minConfidence = 0.5

// TinyFaceDetectorOptions
const inputSize = 408
const scoreThreshold = 0.5

function getFaceDetectorOptions(net) {
  return net === faceApi.nets.ssdMobilenetv1
    ? new faceapi.SsdMobilenetv1Options({ minConfidence: minConfidence })
    : new faceapi.TinyFaceDetectorOptions({
        inputSize: inputSize,
        scoreThreshold: scoreThreshold,
      })
}
exports.faceDetectionOptions = getFaceDetectorOptions(exports.faceDetectionNet)
