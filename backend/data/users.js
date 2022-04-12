import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@shwks.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Shwetha',
    email: 'shwetha@shwks.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'shwks',
    email: 'shwks@shwks.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
