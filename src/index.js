const express = require("express")
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'src/views');

app.use(express.static(__dirname + '/public/'))

const router = require('./controllers/routes.js')
app.use('/', router)

const port = process.env.PORT || 8081

app.listen(port, () => console.log(`Server iniciou na porta ${port}`))


