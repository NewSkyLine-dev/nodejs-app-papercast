import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class LoipenManagerApp {
  constructor(logger, config) {
    this.app = express()
    this.logger = logger || console
    this.config = config || {}

    // Expose the app as a property
    this.onRequest = this.app
  }

  // Initialize the app
  init() {
    const port = process.env.PORT || 3000

    // Setup middleware
    this.setupMiddleware()

    // Setup routes
    this.setupRoutes()

    // Start the server
    this.app.listen(port, () => {
      this.logger.log(`Server running at http://localhost:${port}`)
    })

    return this.app
  }

  // Setup middleware
  setupMiddleware() {
    // Allow CORS for all origins
    this.app.use((_req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      next()
    })

    // Serve static files from dist directory
    this.app.use(express.static(join(__dirname, 'dist')))
  }

  // Setup routes
  setupRoutes() {
    // Add API proxy endpoint
    this.app.get('/api/proxy/*', async (req, res) => {
      try {
        const apiPath = req.params[0]
        const apiToken =
          process.env.VITE_API_KEY || '52|fdAQOSbRKpAgOkAOVqAgtxW0vQgOGsl9m4sg2ylK718c86a6'
        const baseUrl = process.env.VITE_BASE_URL || 'https://web2.tourinfra.com'

        const response = await axios.get(`${baseUrl}/${apiPath}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
        })

        res.json(response.data)
      } catch (error) {
        this.logger.error('API proxy error:', error.message)
        res.status(error.response?.status || 500).json({
          error: 'Failed to fetch data from API',
        })
      }
    })

    // Use a specific pattern for the SPA fallback
    this.app.get('/*', (_req, res) => {
      res.sendFile(join(__dirname, 'dist', 'index.html'))
    })
  }
}

// Create and export the application
export default LoipenManagerApp

// If this file is run directly, start the server
const app = new LoipenManagerApp()
app.init()
