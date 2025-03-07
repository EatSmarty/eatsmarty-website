"use client"

import { useEffect, useRef } from "react"
import { BrowserMultiFormatReader } from "@zxing/library"

interface BarcodeScannerProps {
  onScan: (result: string) => void
  onError: (error: Error) => void
}

export function BarcodeScanner({ onScan, onError }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()
    let mounted = true

    const startScanner = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices()

        if (videoInputDevices.length === 0) {
          onError(new Error("No camera devices found"))
          return
        }

        if (videoRef.current && mounted) {
          await codeReader.decodeFromConstraints(
            {
              video: { facingMode: "environment" },
            },
            videoRef.current,
            (result, error) => {
              if (result && mounted) {
                onScan(result.getText())
              }
              if (error && error.name !== "NotFoundException" && mounted) {
                // Ignore "not found" errors as they're expected when no barcode is in view
                console.error("Barcode scanning error:", error)
              }
            },
          )
        }
      } catch (error) {
        if (mounted) {
          onError(error instanceof Error ? error : new Error("Failed to start scanner"))
        }
      }
    }

    startScanner()

    return () => {
      mounted = false
      codeReader.reset()
    }
  }, [onScan, onError])

  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <video ref={videoRef} className="h-full w-full object-cover" />
      <div className="absolute inset-0 border-2 border-dashed border-primary/50 m-8 pointer-events-none"></div>
    </div>
  )
}

