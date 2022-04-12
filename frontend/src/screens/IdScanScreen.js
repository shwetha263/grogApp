import React, { useEffect, useState } from 'react'
import { Form, Button, FormLabel, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { verifyId } from '../actions/verifyActions'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Tesseract from 'tesseract.js'
import moment from 'moment'

const IdScanScreen = ({ match, history }) => {
  const productId = match.params.id
  const [id, setId] = useState('')
  const [person, setPerson] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [successfulVerification, setSuccessfullVerification] = useState(false)
  const dispatch = useDispatch()
  const idVerification = useSelector((state) => state.idVerification)
  const { loading, error, success, payload } = idVerification
  const [age, setAge] = useState(0)
  const [idDetails, setIdDetails] = useState('')

  useEffect(() => {
    if (success) {
      setVerificationComplete(true)

      if (payload && payload.personMatched) {
        let an = payload.verificationCode
          ? payload.verificationCode.activeNumber
          : ''
        if (age && age >= 18)
          setMessage(
            `Person Verification Completed and Successful and 'Active Number' is ${an} `
          )
        setSuccessfullVerification(true)
        // history.push('/verify/person')
      } else {
        setSuccessfullVerification(false)
        setMessage('Person Verification Failed')
      }
    } else {
      setVerificationComplete(false)
      setSuccessfullVerification(false)
      setMessage('')
    }
  }, [success, payload, history, idDetails])

  const submitHandler = (e) => {
    e.preventDefault()
    setVerificationComplete(false)
    dispatch(verifyId({ id, person, age }))
    history.push(`/verify/${productId}`)
  }
  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=1`)
  }

  const uploadIdHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    Tesseract.recognize(file, 'eng', {
      logger: (m) => console.log(m),
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async (result) => {
        // Get Confidence score
        let confidence = result.data.confidence

        let text = result.data.text
        let date = text
          .substring(text.indexOf('DOB:') + 4)
          .trim()
          .substring(0, 10)
        setIdDetails(text)
        // let dateString = '23/10/2015' // Oct 23

        let dateMomentObject = moment(date, 'DD/MM/YYYY') // 1st argument - string, 2nd argument - format
        var dateObject = dateMomentObject.toDate() // convert moment.js object to Date object
        var today = new Date()
        var age = today.getFullYear() - dateObject.getFullYear()
        setAge(age)
        console.log(` age ${age}`)
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
          const { data } = await axios.post('/api/upload', formData, config)
          setId(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
      })
  }
  const uploadPersonHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setPerson(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {loading && <Loader />}
      {verificationComplete ? (
        successfulVerification ? (
          <Message variant='info'>{message}</Message>
        ) : (
          <Message variant='danger'>{message}</Message>
        )
      ) : (
        <></>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      <FormContainer>
        {/* <VerificationSteps step1></VerificationSteps> */}
        <h3 className='text-capitalize'>
          Identity and Person Verification for Age
        </h3>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={5}>
              <Form.Group controlId='id'>
                <Form.Label>Official ID :: </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Scan Id card / Upload'
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                ></Form.Control>
                <Form.File
                  id='image-file'
                  custom
                  onChange={uploadIdHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>
            </Col>
            <Col md={2}></Col>
            <Col md={5}>
              <Form.Group controlId='person'>
                <Form.Label>Personal Photo :: </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Take a Photo or Upload photo'
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                ></Form.Control>
                <Form.File
                  id='image-file'
                  custom
                  onChange={uploadPersonHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>
            </Col>
          </Row>
          &nbsp; &nbsp;
          <Row>
            <Col md={12}>
              <Form.Group controlId='submit'>
                <Button type='submit' variant='primary'>
                  Submit and Verify
                </Button>
              </Form.Group>
            </Col>
          </Row>
          &nbsp; &nbsp;
          <Row>
            <Col md={12}>
              <Form.Group controlId='cart'>
                <Button
                  onClick={addToCartHandler}
                  className='btn-block'
                  type='button'
                  disabled={!successfulVerification}
                >
                  Add To Cart
                </Button>
              </Form.Group>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col md={6}>
              <h4> ID extract :: </h4>
            </Col>
            <Col md={6}>
              <p>{idDetails}</p>
            </Col>
          </Row>
        </Form>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h2 className='text-capitalize' style={{ color: 'red' }}>
          {' '}
          NOTE !!!!
        </h2>
        <h2 className='text-capitalize' style={{ color: 'red' }}>
          Only for Demo purpose upload option is allowed. In actual, the ID card
          must be scanned and a photo must be click on the fly through device or
          CCTV
        </h2>
      </FormContainer>
    </>
  )
}

export default IdScanScreen
