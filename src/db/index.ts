import mongoose from 'mongoose'

export async function connect() {
  try {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      console.log(`${collectionName}.${method}`, JSON.stringify(query), doc)
    })

    await mongoose.connect('mongodb://127.0.0.1:27017/test')
  } catch (err) {
    console.error('failed to create connection')
  }
}
