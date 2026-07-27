import dotenv from 'dotenv'

// Imported first (as a side-effecting module) in server.js, before any other
// local import — guarantees env vars are loaded before anything else in the
// import chain has a chance to read process.env at module-evaluation time.
dotenv.config()
