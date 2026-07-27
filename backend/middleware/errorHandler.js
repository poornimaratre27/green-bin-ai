import multer from 'multer'

export const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (err instanceof multer.MulterError) {
    const message = err.code === 'LIMIT_FILE_SIZE' ? 'Image must be smaller than 5MB' : err.message
    return res.status(400).json({ message })
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((fieldError) => fieldError.message)
      .join(', ')
    return res.status(400).json({ message })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' })
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate value — this record already exists' })
  }

  res.status(err.status || 500).json({ message: err.message || 'Something went wrong' })
}
