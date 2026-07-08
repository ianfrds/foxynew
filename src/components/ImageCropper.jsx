import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { HiX } from 'react-icons/hi'

const ASPECT_RATIOS = {
  '2:3': 2 / 3,
  '3:4': 3 / 4,
  A4: 210 / 297,
  A3: 297 / 420,
}

export default function ImageCropper({ image, aspectRatio = '2:3', onCropDone, onClose }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleDone = () => {
    if (!croppedAreaPixels || !image) return
    const canvas = document.createElement('canvas')
    const img = new Image()
    img.onload = () => {
      canvas.width = croppedAreaPixels.width
      canvas.height = croppedAreaPixels.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      )
      onCropDone(canvas.toDataURL('image/jpeg'))
    }
    img.src = image
  }

  const aspect = ASPECT_RATIOS[aspectRatio] || 2 / 3

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-card w-full max-w-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Atur Posisi Foto</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors tap-target flex items-center justify-center">
            <HiX className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full h-[400px] bg-gray-900">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs text-gray-500 font-medium">Perbesar / Perkecil</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full mt-1 accent-primary"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-input hover:bg-gray-50 transition-colors tap-target">
              Batal
            </button>
            <button onClick={handleDone} className="flex-1 py-3 bg-primary text-white font-semibold rounded-input hover:bg-primary-dark transition-all tap-target">
              Gunakan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
