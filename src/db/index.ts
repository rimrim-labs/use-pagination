import mongoose from 'mongoose'

export async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test')
  } catch (err) {
    console.error('failed to create connection')
  }
}
