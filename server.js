const http = require('http')
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('./controllers/productController')

const server = http.createServer((req, res) => {
  // Serve a basic HTML Page
  // res.statusCode = 200
  // res.setHeader('Content-Type', 'text/html')
  // res.write('<h1>Hello World!</h1>')
  // res.end()

  // Serve a JSON response at an endpoint, using shorthand
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res)
  } else if (
    req.url.match(/\/api\/product\/([0-9a-z]|-)+/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3]
    getProduct(req, res, id)
  } else if (
    req.url.match(/\/api\/product\/([0-9a-z]|-)+/) &&
    req.method === 'PUT'
  ) {
    const id = req.url.split('/')[3]
    updateProduct(req, res, id)
  } else if (
    req.url.match(/\/api\/product\/([0-9a-z]|-)+/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3]
    deleteProduct(req, res, id)
  } else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found.' }))
  }
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
