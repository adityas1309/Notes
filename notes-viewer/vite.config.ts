import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Custom plugin to serve directory listings
const directoryListingPlugin = {
  name: 'directory-listing',
  configureServer(server) {
    server.middlewares.use('/api/directory', (req, res, next) => {
      const path = req.url || '/'
      const publicPath = resolve(__dirname, 'public')
      const targetPath = resolve(publicPath, path.slice(1))

      try {
        const files = server.fs.readdirSync(targetPath)
        const items = files.map(file => {
          const fullPath = resolve(targetPath, file)
          const isDirectory = server.fs.statSync(fullPath).isDirectory()
          return {
            name: file,
            path: path + (path.endsWith('/') ? '' : '/') + file,
            type: isDirectory ? 'directory' : 'file'
          }
        })

        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(items))
      } catch (error) {
        next(error)
      }
    })
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/notes/' : '/notes-viewer/',
  plugins: [react(), directoryListingPlugin],
  server: {
    fs: {
      strict: false,
      allow: ['..']
    }
  }
})
