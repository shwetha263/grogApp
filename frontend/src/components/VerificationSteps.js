import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const VerificationSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/verify/id'>
            <Nav.Link>Id Verification</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Id Verification</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/verify/person'>
            <Nav.Link>Person Verification</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Person Verification</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default VerificationSteps
