import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { verifyId } from '../actions/verifyActions'
import VerificationSteps from '../components/VerificationSteps'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'

const PersonScanScreen = ({ history }) => {
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const idVerification = useSelector((state) => state.idVerification)
  const { loading, error, success } = idVerification

  useEffect(() => {
    if (success) {
      // dispatch({ type: ID_VERIFY_SUCCESS })
      history.push('/verify/person')
    }
  }, [success, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(verifyId({ image }))
    history.push('/verify/id')
  }
  const uploadFileHandler = async (e) => {
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
      setImage(data)
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
      {error && <Message variant='danger'>{error}</Message>}
      <FormContainer>
        <VerificationSteps step1 step2></VerificationSteps>
        <h1> Person Verification</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Upload your image/Click your pic'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>
          <Button type='submit' variant='primary'>
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PersonScanScreen
