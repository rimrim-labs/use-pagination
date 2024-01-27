import app from './src/app'
import { connect } from './src/db'

const PORT = 3000

app.listen(PORT, async () => {
  await connect()
  console.log(`server is running at port ${PORT}`)
})
