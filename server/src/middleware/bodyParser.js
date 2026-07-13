import express from 'express'
import multer from 'multer'

const upload = multer()

export function parseBody(req, res, next) {
  const contentType = req.headers['content-type'] || ''
  console.log('[BodyParser] Content-Type:', contentType)

  if (contentType.startsWith('multipart/form-data')) {
    console.log('[BodyParser] Using multer for multipart')
    upload.none()(req, res, next)
  } else if (contentType.startsWith('application/json')) {
    console.log('[BodyParser] Using express.json')
    express.json()(req, res, next)
  } else if (contentType.startsWith('application/x-www-form-urlencoded')) {
    console.log('[BodyParser] Using express.urlencoded')
    express.urlencoded({ extended: true })(req, res, next)
  } else {
    console.log('[BodyParser] No parser for:', contentType)
    next()
  }
}

export { upload }