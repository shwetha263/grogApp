import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
const Product = ({ product, history, verificationCode }) => {
  // var cardStyle = {
  //   display: 'block',
  //   width: '30vw',
  //   transitionDuration: '0.3s',
  //   height: '45vw',
  // }
  const verification = () => {
    if (verificationCode && verificationCode.activeNumber) {
      if (
        verificationCode.age &&
        verificationCode.age >= product.restrictedMinAge
      ) {
        history.push(history.push(`/cart/${product._id}?qty=${1}`))
      } else {
        history.push(`/verify/${product._id}`)
      }
    } else {
      history.push(`/verify/${product._id}`)
    }
  }
  const addtoCart = () => {
    history.push(history.push(`/cart/${product._id}?qty=${1}`))
  }
  return (
    // <Card style={cardStyle} className='my-3 p-3 rounded'>
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.numReviews}`} />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
        <Card.Text as='div'>
          {product.isRestrictedByAge ? (
            <strong style={{ color: 'red' }}>Restricted By Age</strong>
          ) : (
            <br></br>
          )}
        </Card.Text>

        {product.isRestrictedByAge ? (
          <Button variant='warning' onClick={verification}>
            Verify and Scan
          </Button>
        ) : (
          <Button variant='dark' onClick={addtoCart}>
            Scan
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default Product
