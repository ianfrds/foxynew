import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { HiUpload, HiX, HiPhotograph } from 'react-icons/hi'

const MAX_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }

export default function ImageUploader({ onImageReady }) {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles, rejections) => {
    setError('')
    if (rejections.length > 0) {
      const err = rejections[0].errors[0]
      if (err.code === 'file-too-large') setError('Ukuran file maksimal 10 MB')
      else if (err.code === 'file-invalid-type') setError('Format file harus JPEG atau PNG')
      else setError('File tidak valid')
      return
    }
    const f = acceptedFiles[0]
    if (f.size > MAX_SIZE) {
      setError('Ukuran file maksimal 10 MB')
      return
    }
    setFile(f)
    setUploading(true)
    setTimeout(() => {
      setUploading(false)
      const reader = new FileReader()
      reader.onload = () => onImageReady?.(reader.result, f.name)
      reader.readAsDataURL(f)
    }, 800)
  }, [onImageReady])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    maxFiles: 1,
    multiple: false,
  })

  const removeFile = () => {
    setFile(null)
    setError('')
  }

  if (file && !uploading) {
    return (
      <div className="bg-white rounded-card border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <HiPhotograph className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
            </div>
          </div>
          <button onClick={removeFile} className="p-2 text-gray-400 hover:text-red-500 transition-colors tap-target flex items-center justify-center">
            <HiX className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-card p-8 text-center cursor-pointer transition-all tap-target ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
            {uploading ? (
              <svg className="animate-spin w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <HiUpload className="w-7 h-7 text-primary" />
            )}
          </div>
          <div>
            <p className="font-medium text-gray-700">
              {isDragActive ? 'Lepaskan file di sini...' : 'Seret & lepas foto di sini'}
            </p>
            <p className="text-sm text-gray-500 mt-1">atau klik untuk memilih file</p>
          </div>
          <p className="text-xs text-gray-400">JPEG, PNG • Maks 10 MB</p>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {uploading && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Mengunggah...</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-primary h-full rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      )}
    </div>
  )
}
