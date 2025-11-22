'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'

// Fix for default marker icon
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

interface MapComponentProps {
  center: [number, number]
  zoom?: number
  markers?: Array<{
    position: [number, number]
    popup: string
  }>
  className?: string
}

export default function MapComponent({
  center,
  zoom = 13,
  markers = [],
  className = 'w-full h-full',
}: MapComponentProps) {
  // Add custom CSS for Leaflet popup
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      .leaflet-popup-content-wrapper {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(229, 231, 235, 0.5);
        padding: 12px;
        font-family: inherit;
      }
      .leaflet-popup-content {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: rgb(17, 24, 39);
        text-align: center;
        line-height: 1.5;
      }
      .leaflet-popup-tip {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
      }
      .leaflet-popup-close-button {
        display: none !important;
      }
      .leaflet-container a.leaflet-popup-close-button {
        display: none !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className={className}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} icon={icon}>
          <Popup>
            <div style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgb(17, 24, 39)',
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}>
              {marker.popup}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
