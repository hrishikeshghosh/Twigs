import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import passwordCheck from '../config/passwordChecker.js'
import AUTHMODEL from '../model/auth.js'
import userSchema from '../model/auth.js'

export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await AUTHMODEL.findOne({ email })

    if (!user) {
      res
        .status(404)
        .json({ message: "User doesn't exist, Create an account!" })
    } else {
      const ispassword = await bcrypt.compare(password, user.password)

      if (!ispassword) {
        res.status(401).json({ message: 'Incorrect email or password' })
      }

      const token = jwt.sign(
        {
          id: user?._id,
          email: user?.email
        },
        'twigs',
        { expiresIn: '24h' }
      )

      const data = {
        name: user?.name,
        role: user?.role,
        followers: user?.followers,
        following: user?.following,
        content: user?.content,
        imageUrl: user?.imageUrl,
        verified: user?.verified,
        designation: user?.designation,
        profileDesc: user?.profileDesc
      }

      res.status(202).json({ result: data, token })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' })
  }
}

export const signup = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body

  try {
    const isUserExists = await AUTHMODEL.findOne({ email })

    if (!isUserExists) {
      if (passwordCheck(password)) {
        if (password === confirmPassword) {
          const hash = await bcrypt.hash(password, 12)

          const result = await AUTHMODEL.create({
            name: fullName,
            email: email,
            password: hash
          })

          const token = jwt.sign(
            {
              id: result?._id,
              email: result?.email
            },
            'twigs',
            { expiresIn: '24h' }
          )

          const data = {
            name: result?.name,
            role: '',
            followers: [],
            following: [],
            content: [],
            imageUrl: '',
            verified: false,
            designation: 'Ground Zero'
          }

          res.status(201).json({ result: data, token })
        } else {
          res.status(400).json({ message: "Passwords doesn't match" })
        }
      } else {
        res.status(400).json({ message: "Password criteria doesn't match" })
      }
    } else {
      res.status(400).json({ message: 'User already Exists!' })
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
