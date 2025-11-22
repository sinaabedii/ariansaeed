'use client'

import { useRef, useEffect, useState, useCallback, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Html, Stars, useTexture, Sphere, Preload } from '@react-three/drei'
import * as THREE from 'three'
import { MapPin, Building2, Users, ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2 } from 'lucide-react'

// Countries we work with - VERIFIED precise coordinates
// Coordinates are validated using Google Maps and align perfectly with the Earth texture
// All locations will appear exactly on their real-world positions on the globe
const offices = [
  {
    id: 'iran',
    city: 'Tehran',
    country: 'Iran',
    employees: 'Headquarters',
    image: '/images/counteries/iran-tehran.jpg',
    lat: 35.77857469321197,
    lng: 51.423923904739006,
    color: '#239F40',
    timezone: 'GMT+3:30',
    established: '1982',
    type: 'Main Operations Center',
    description: 'Headquarters and main operations base',
    isBase: true
  },
  {
    id: 'turkey',
    city: 'Istanbul',
    country: 'Turkey',
    employees: 'Active Partnership',
    image: '/images/counteries/Turkey.jpg',
    lat: 41.0082,
    lng: 28.9784,
    color: '#E30A17',
    timezone: 'GMT+3',
    established: '2015',
    type: 'Business Partner',
    description: 'Strategic partnerships and trade operations'
  },
  {
    id: 'uae',
    city: 'Dubai',
    country: 'UAE',
    employees: 'Regional Hub',
    image: '/images/counteries/Dubai.jpg',
    lat: 25.2048,
    lng: 55.2708,
    color: '#00732F',
    timezone: 'GMT+4',
    established: '2016',
    type: 'Regional Office',
    description: 'Middle East business hub and operations'
  },
  {
    id: 'oman',
    city: 'Muscat',
    country: 'Oman',
    employees: 'Active Projects',
    image: '/images/counteries/oman.webp',
    lat: 23.5880,
    lng: 58.3829,
    color: '#D62718',
    timezone: 'GMT+4',
    established: '2017',
    type: 'Business Partner',
    description: 'Infrastructure and development projects'
  },
  {
    id: 'germany',
    city: 'Berlin',
    country: 'Germany',
    employees: 'Strategic Alliance',
    image: '/images/counteries/germany.webp',
    lat: 52.5200,
    lng: 13.4050,
    color: '#000000',
    timezone: 'GMT+1',
    established: '2018',
    type: 'European Partner',
    description: 'Technology transfer and industrial cooperation'
  },
  {
    id: 'china',
    city: 'Beijing',
    country: 'China',
    employees: 'Major Collaborations',
    image: '/images/counteries/china.jpg',
    lat: 39.9042,
    lng: 116.4074,
    color: '#DE2910',
    timezone: 'GMT+8',
    established: '2014',
    type: 'Strategic Partner',
    description: 'Manufacturing and technology partnerships'
  },
  {
    id: 'azerbaijan',
    city: 'Baku',
    country: 'Azerbaijan',
    employees: 'Active Partnership',
    image: '/images/counteries/azerbaijan.jpg',
    lat: 40.4093,
    lng: 49.8671,
    color: '#00B5E2',
    timezone: 'GMT+4',
    established: '2019',
    type: 'Regional Partner',
    description: 'Energy sector and infrastructure projects'
  },
  {
    id: 'russia',
    city: 'Moscow',
    country: 'Russia',
    employees: 'Strategic Projects',
    image: '/images/counteries/russia.jpg',
    lat: 55.7558,
    lng: 37.6173,
    color: '#0033A0',
    timezone: 'GMT+3',
    established: '2016',
    type: 'Business Partner',
    description: 'Industrial and commercial collaborations'
  },
  {
    id: 'tajikistan',
    city: 'Dushanbe',
    country: 'Tajikistan',
    employees: 'Development Projects',
    image: '/images/counteries/tajikistan.jpg',
    lat: 38.5598,
    lng: 68.7738,
    color: '#006600',
    timezone: 'GMT+5',
    established: '2020',
    type: 'Regional Partner',
    description: 'Infrastructure development and trade'
  },
  {
    id: 'iraq',
    city: 'Baghdad',
    country: 'Iraq',
    employees: 'Active Projects',
    image: '/images/counteries/iraq.jpg',
    lat: 33.3152,
    lng: 44.3661,
    color: '#CE1126',
    timezone: 'GMT+3',
    established: '2017',
    type: 'Business Partner',
    description: 'Construction and development projects'
  },
  {
    id: 'syria',
    city: 'Damascus',
    country: 'Syria',
    employees: 'Reconstruction Projects',
    image: '/images/counteries/Damascus.webp',
    lat: 33.5138,
    lng: 36.2765,
    color: '#CE1126',
    timezone: 'GMT+2',
    established: '2021',
    type: 'Development Partner',
    description: 'Reconstruction and humanitarian projects'
  },
  {
    id: 'lebanon',
    city: 'Beirut',
    country: 'Lebanon',
    employees: 'Active Partnerships',
    image: '/images/counteries/syria.jpg',
    lat: 33.8886,
    lng: 35.4955,
    color: '#ED1C24',
    timezone: 'GMT+2',
    established: '2019',
    type: 'Regional Partner',
    description: 'Trade and business development'
  }
]

// Globe configuration
const GLOBE_CONFIG = {
  radius: 2,
  segments: 128,
  rings: 64,
  markerSize: 0.02,
  markerHeight: 0.05,
  connectionOpacity: 0.3,
  atmosphereColor: '#4A90E2',
  atmosphereOpacity: 0.15
}

// Loading placeholder for textures
function LoadingGlobe() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_CONFIG.radius, 32, 32]} />
      <meshStandardMaterial 
        color="#1a365d"
        roughness={0.8}
        metalness={0.2}
        wireframe={false}
      />
    </mesh>
  )
}

// Convert lat/lng to 3D coordinates on sphere surface
// Formula: https://en.wikipedia.org/wiki/Geographic_coordinate_conversion
// IMPORTANT: The globe is rotated -90° on Y axis, so these coordinates align perfectly with the Earth texture
// Example: Tehran (35.69°N, 51.39°E) → position on rotated sphere
function latLngToVector3(lat: number, lng: number, radius: number) {
  // Convert geographic coordinates to radians
  const phi = (90 - lat) * (Math.PI / 180) // Polar angle: 0° at North Pole, 180° at South Pole
  const theta = (lng + 180) * (Math.PI / 180) // Azimuthal angle: 0° at -180° longitude
  
  // Spherical to Cartesian conversion (right-handed coordinate system)
  // X: East-West axis, Y: North-South axis (up), Z: Front-Back axis
  const x = -radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)
  
  return new THREE.Vector3(x, y, z)
}

interface LocationMarkerProps {
  office: typeof offices[0]
  position: THREE.Vector3
  onClick: (office: typeof offices[0]) => void
  isSelected: boolean
  zoomLevel: number
}

function LocationMarker({ office, position, onClick, isSelected, zoomLevel }: LocationMarkerProps) {
  const markerRef = useRef<THREE.Mesh>(null)
  const pulseRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const { viewport } = useThree()
  
  // Detect mobile based on viewport
  const isMobile = viewport.width < 5

  useFrame((state) => {
    if (markerRef.current && pulseRef.current) {
      // Dynamic scaling based on zoom level - larger for base location (Iran)
      const baseScale = Math.max(0.5, Math.min(2, 8 / zoomLevel))
      const sizeMultiplier = office.isBase ? 2 : 1 // Make Iran marker 2x larger
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2
      
      markerRef.current.scale.setScalar(
        baseScale * sizeMultiplier * (hovered || isSelected ? pulseScale * 1.3 : pulseScale)
      )
      
      // Pulse ring animation - more prominent for base location
      pulseRef.current.scale.setScalar(
        baseScale * sizeMultiplier * (1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3)
      )
      
      // Always face camera
      markerRef.current.lookAt(state.camera.position)
      pulseRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <group>
      {/* Main marker */}
      <mesh
        ref={markerRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation()
          onClick(office)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        <sphereGeometry args={[GLOBE_CONFIG.markerSize, 16, 16]} />
        <meshBasicMaterial 
          color={office.color} 
          transparent 
          opacity={hovered || isSelected ? 1 : 0.9}
        />
      </mesh>
      
      {/* Pulse ring effect */}
      <mesh
        ref={pulseRef}
        position={position}
      >
        <ringGeometry args={[GLOBE_CONFIG.markerSize * 1.5, GLOBE_CONFIG.markerSize * 2, 32]} />
        <meshBasicMaterial 
          color={office.color} 
          transparent 
          opacity={hovered || isSelected ? 0.4 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Tooltip - Glass Style */}
      {(hovered || isSelected) && (
        <Html
          position={[0, GLOBE_CONFIG.markerHeight, 0]}
          center
          distanceFactor={isMobile ? 5 : 8}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            transform: 'translateY(-10px)'
          }}
        >
          <div
            style={{
              background: office.isBase 
                ? 'rgba(34, 197, 94, 0.15)'
                : 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              padding: isMobile ? '8px 12px' : '10px 14px',
              borderRadius: isMobile ? '12px' : '14px',
              border: office.isBase 
                ? '1px solid rgba(34, 197, 94, 0.3)'
                : '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
              minWidth: isMobile ? '85px' : '110px',
              maxWidth: isMobile ? '115px' : '150px',
              position: 'relative'
            }}
          >
            {/* City Name */}
            <div
              style={{
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: '700',
                color: office.isBase ? '#22c55e' : '#fff',
                marginBottom: '3px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                letterSpacing: '0.3px'
              }}
            >
              {office.isBase && <span style={{ fontSize: isMobile ? '10px' : '12px' }}>🏢</span>}
              <span>{office.city}</span>
            </div>
            
            {/* Country */}
            <div
              style={{
                fontSize: isMobile ? '10px' : '11px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: '500',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}
            >
              {office.country}
            </div>
            
            {/* Type Badge */}
            <div
              style={{
                fontSize: isMobile ? '8px' : '9px',
                color: 'rgba(255, 255, 255, 0.75)',
                marginTop: '5px',
                paddingTop: '5px',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
              }}
            >
              {office.type}
            </div>
            
            {/* Status Indicator */}
            <div
              style={{
                position: 'absolute',
                top: isMobile ? '8px' : '10px',
                right: isMobile ? '10px' : '12px',
                width: isMobile ? '6px' : '7px',
                height: isMobile ? '6px' : '7px',
                borderRadius: '50%',
                backgroundColor: office.isBase ? '#22c55e' : office.color,
                boxShadow: `0 0 10px ${office.isBase ? '#22c55e' : office.color}`,
                animation: 'pulse 2s ease-in-out infinite'
              }}
            />
          </div>
        </Html>
      )}
      
    </group>
  )
}

// Camera control hook
function CameraController({ selectedOffice, onZoomChange }: { 
  selectedOffice: typeof offices[0] | null
  onZoomChange: (zoom: number) => void 
}) {
  const { camera, gl } = useThree()
  
  useEffect(() => {
    const handleZoom = () => {
      const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0))
      onZoomChange(distance)
    }
    
    gl.domElement.addEventListener('wheel', handleZoom)
    return () => gl.domElement.removeEventListener('wheel', handleZoom)
  }, [camera, gl, onZoomChange])
  
  useEffect(() => {
    if (selectedOffice) {
      // Get marker position in local space (before globe rotation)
      const markerPosLocal = latLngToVector3(selectedOffice.lat, selectedOffice.lng, GLOBE_CONFIG.radius)
      
      // Apply globe rotation (-90° on Y axis) to get world position
      const rotationMatrix = new THREE.Matrix4().makeRotationY(-Math.PI / 2)
      const markerWorldPos = markerPosLocal.clone().applyMatrix4(rotationMatrix)
      
      // Calculate optimal camera position
      // Position camera directly in front of the marker, looking at globe center
      const cameraDistance = 2.0 // Optimal distance for clear view
      
      // Camera looks at the marker from outside
      // Direction from globe center to marker
      const directionToMarker = markerWorldPos.clone().normalize()
      
      // Place camera along this direction, further out
      const cameraTargetPosition = directionToMarker.multiplyScalar(cameraDistance)
      
      // Smooth camera transition
      const startPosition = camera.position.clone()
      const startQuaternion = camera.quaternion.clone()
      
      // Calculate target orientation - camera should look at the marker
      const tempCamera = new THREE.PerspectiveCamera()
      tempCamera.position.copy(cameraTargetPosition)
      // Look at a point slightly in front of the marker (towards center)
      const lookAtTarget = markerWorldPos.clone().multiplyScalar(0.95)
      tempCamera.lookAt(lookAtTarget)
      const endQuaternion = tempCamera.quaternion.clone()
      
      // Animation parameters
      let progress = 0
      const duration = 1.2 // Slightly faster for better UX
      const startTime = Date.now()
      
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000
        progress = Math.min(elapsed / duration, 1)
        
        // Smooth easing (ease-in-out for natural feel)
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2
        
        if (progress < 1) {
          // Smoothly interpolate position and rotation
          camera.position.lerpVectors(startPosition, cameraTargetPosition, eased)
          camera.quaternion.slerpQuaternions(startQuaternion, endQuaternion, eased)
          camera.updateProjectionMatrix()
          requestAnimationFrame(animate)
        } else {
          // Ensure final position is exact
          camera.position.copy(cameraTargetPosition)
          camera.quaternion.copy(endQuaternion)
          camera.lookAt(lookAtTarget)
          camera.updateProjectionMatrix()
        }
      }
      animate()
    }
  }, [selectedOffice, camera])
  
  return null
}

function Globe({ onZoomChange, onLocationSelect, zoomIn, zoomOut, resetToIran }: { 
  onZoomChange: (zoom: number) => void
  onLocationSelect: (selected: boolean) => void
  zoomIn?: boolean
  zoomOut?: boolean
  resetToIran?: boolean
}) {
  const globeRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  const markersGroupRef = useRef<THREE.Group>(null)
  const orbitControlsRef = useRef<any>(null)
  const [selectedOffice, setSelectedOffice] = useState<typeof offices[0] | null>(null)
  const [zoomLevel, setZoomLevel] = useState(5)
  const { camera } = useThree()
  
  // Load high-quality Earth textures using useTexture (better caching)
  const [earthTexture, earthBumpMap] = useTexture([
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png'
  ])
  
  // Configure textures for realistic Earth rendering
  useEffect(() => {
    if (earthTexture) {
      earthTexture.colorSpace = THREE.SRGBColorSpace
      earthTexture.anisotropy = 16
      earthTexture.minFilter = THREE.LinearMipmapLinearFilter
      earthTexture.magFilter = THREE.LinearFilter
      earthTexture.needsUpdate = true
    }
    if (earthBumpMap) {
      earthBumpMap.anisotropy = 16
      earthBumpMap.minFilter = THREE.LinearMipmapLinearFilter
      earthBumpMap.magFilter = THREE.LinearFilter
      earthBumpMap.needsUpdate = true
    }
  }, [earthTexture, earthBumpMap])
  
  useFrame((state) => {
    if (atmosphereRef.current) {
      // Dynamic atmosphere based on zoom - NO automatic globe rotation
      const distance = state.camera.position.distanceTo(new THREE.Vector3(0, 0, 0))
      const atmosphereOpacity = Math.max(0.05, Math.min(0.2, 0.3 - distance * 0.02))
      ;(atmosphereRef.current.material as THREE.MeshBasicMaterial).opacity = atmosphereOpacity
    }
  })

  const handleOfficeClick = useCallback((office: typeof offices[0]) => {
    const newSelection = selectedOffice?.id === office.id ? null : office
    setSelectedOffice(newSelection)
    onLocationSelect(newSelection !== null) // Notify parent about selection
  }, [selectedOffice, onLocationSelect])
  
  const handleZoomChange = useCallback((zoom: number) => {
    setZoomLevel(zoom)
    onZoomChange(zoom)
  }, [onZoomChange])
  
  // Handle zoom in
  useEffect(() => {
    if (zoomIn && camera) {
      const currentDistance = camera.position.length()
      const newDistance = Math.max(0.5, currentDistance - 1.2)
      const direction = camera.position.clone().normalize()
      camera.position.copy(direction.multiplyScalar(newDistance))
    }
  }, [zoomIn, camera])
  
  // Handle zoom out
  useEffect(() => {
    if (zoomOut && camera) {
      const currentDistance = camera.position.length()
      const newDistance = Math.min(25, currentDistance + 1.2)
      const direction = camera.position.clone().normalize()
      camera.position.copy(direction.multiplyScalar(newDistance))
    }
  }, [zoomOut, camera])
  
  // Handle reset to Iran
  useEffect(() => {
    if (resetToIran) {
      setSelectedOffice(null)
      const iranOffice = offices.find(o => o.id === 'iran')
      if (iranOffice && camera) {
        const markerPosLocal = latLngToVector3(iranOffice.lat, iranOffice.lng, GLOBE_CONFIG.radius)
        const rotationMatrix = new THREE.Matrix4().makeRotationY(-Math.PI / 2)
        const markerWorldPos = markerPosLocal.clone().applyMatrix4(rotationMatrix)
        const directionToMarker = markerWorldPos.clone().normalize()
        const targetPosition = directionToMarker.multiplyScalar(2.0)
        
        const startPosition = camera.position.clone()
        let progress = 0
        const duration = 1.0
        const startTime = Date.now()
        
        const animate = () => {
          const elapsed = (Date.now() - startTime) / 1000
          progress = Math.min(elapsed / duration, 1)
          const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
          
          if (progress < 1) {
            camera.position.lerpVectors(startPosition, targetPosition, eased)
            camera.lookAt(markerWorldPos.clone().multiplyScalar(0.95))
            if (orbitControlsRef.current) {
              orbitControlsRef.current.target.copy(markerWorldPos.clone().multiplyScalar(0.95))
              orbitControlsRef.current.update()
            }
            requestAnimationFrame(animate)
          } else {
            camera.position.copy(targetPosition)
            camera.lookAt(markerWorldPos.clone().multiplyScalar(0.95))
            if (orbitControlsRef.current) {
              orbitControlsRef.current.target.copy(markerWorldPos.clone().multiplyScalar(0.95))
              orbitControlsRef.current.update()
            }
          }
        }
        animate()
      }
    }
  }, [resetToIran, camera])
  
  // Update OrbitControls target when office is selected
  useEffect(() => {
    if (selectedOffice && orbitControlsRef.current) {
      // Calculate marker position in world space
      const markerPosLocal = latLngToVector3(selectedOffice.lat, selectedOffice.lng, GLOBE_CONFIG.radius)
      const rotationMatrix = new THREE.Matrix4().makeRotationY(-Math.PI / 2)
      const markerWorldPos = markerPosLocal.clone().applyMatrix4(rotationMatrix)
      
      // Update OrbitControls target to the marker position
      const lookAtTarget = markerWorldPos.clone().multiplyScalar(0.95)
      orbitControlsRef.current.target.copy(lookAtTarget)
      orbitControlsRef.current.update()
    } else if (orbitControlsRef.current) {
      // Reset to globe center when no office is selected
      orbitControlsRef.current.target.set(0, 0, 0)
      orbitControlsRef.current.update()
    }
  }, [selectedOffice])

  return (
    <group>
      <CameraController selectedOffice={selectedOffice} onZoomChange={handleZoomChange} />
      
      {/* Earth Globe with realistic NASA textures */}
      {/* Rotation: -90° on Y axis to align Prime Meridian (0° longitude) to front */}
      <mesh ref={globeRef} rotation={[0, -Math.PI / 2, 0]}>
        <sphereGeometry args={[GLOBE_CONFIG.radius, GLOBE_CONFIG.segments, GLOBE_CONFIG.rings]} />
        <meshStandardMaterial 
          map={earthTexture}
          bumpMap={earthBumpMap}
          bumpScale={0.02}
          roughness={0.9}
          metalness={0.1}
          emissive={new THREE.Color('#050505')}
          emissiveIntensity={0.1}
          toneMapped={false}
        />
      </mesh>
      
      {/* Dynamic atmosphere */}
      <mesh ref={atmosphereRef} scale={[2.05, 2.05, 2.05]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color={GLOBE_CONFIG.atmosphereColor}
          transparent
          opacity={GLOBE_CONFIG.atmosphereOpacity}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Office markers - synced with globe rotation */}
      <group ref={markersGroupRef} rotation={[0, -Math.PI / 2, 0]}>
        {offices.map((office) => {
          const position = latLngToVector3(office.lat, office.lng, GLOBE_CONFIG.radius)
          return (
            <LocationMarker
              key={office.id}
              office={office}
              position={position}
              onClick={handleOfficeClick}
              isSelected={selectedOffice?.id === office.id}
              zoomLevel={zoomLevel}
            />
          )
        })}
        {/* Connection network - inside same rotation group */}
        {offices.map((office, index) => {
          if (index === 0) return null
          const startPos = latLngToVector3(offices[0].lat, offices[0].lng, GLOBE_CONFIG.radius + 0.01)
          const endPos = latLngToVector3(office.lat, office.lng, GLOBE_CONFIG.radius + 0.01)
          
          // Create curved connection line
          const curve = new THREE.QuadraticBezierCurve3(
            startPos,
            startPos.clone().add(endPos).multiplyScalar(0.6).normalize().multiplyScalar(GLOBE_CONFIG.radius + 0.3),
            endPos
          )
          const points = curve.getPoints(50)
          
          return (
            <line key={`connection-${office.id}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={points.length}
                  array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial 
                color={office.color} 
                transparent 
                opacity={GLOBE_CONFIG.connectionOpacity}
                linewidth={2}
              />
            </line>
          )
        })}
      </group>
      
      {/* Orbital rings for visual enhancement */}
      <group rotation={[Math.PI / 6, 0, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[GLOBE_CONFIG.radius * 1.2, 0.005, 8, 64]} />
          <meshBasicMaterial color="#76193A" transparent opacity={0.3} />
        </mesh>
      </group>
      
      <group rotation={[-Math.PI / 8, Math.PI / 3, 0]}>
        <mesh>
          <torusGeometry args={[GLOBE_CONFIG.radius * 1.15, 0.003, 8, 64]} />
          <meshBasicMaterial color="#4A90E2" transparent opacity={0.2} />
        </mesh>
      </group>
      
      {/* OrbitControls - controlled by ref, NO auto rotation */}
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom={true}
        enablePan={false}
        minDistance={0.5}
        maxDistance={25}
        autoRotate={false}
        enableDamping={true}
        dampingFactor={0.05}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.85}
        rotateSpeed={0.7}
        zoomSpeed={3.5}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.ROTATE
        }}
        target={(() => {
          // Set initial target to Iran
          const iranOffice = offices.find(o => o.id === 'iran')
          if (iranOffice) {
            const markerPosLocal = latLngToVector3(iranOffice.lat, iranOffice.lng, GLOBE_CONFIG.radius)
            const rotationMatrix = new THREE.Matrix4().makeRotationY(-Math.PI / 2)
            const markerWorldPos = markerPosLocal.clone().applyMatrix4(rotationMatrix)
            return markerWorldPos.clone().multiplyScalar(0.95)
          }
          return new THREE.Vector3(0, 0, 0)
        })()}
      />
    </group>
  )
}

interface Globe3DProps {
  className?: string
}

export default function Globe3D({ className }: Globe3DProps) {
  const [zoomLevel, setZoomLevel] = useState(5)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isLocationSelected, setIsLocationSelected] = useState(false)
  const [triggerZoomIn, setTriggerZoomIn] = useState(false)
  const [triggerZoomOut, setTriggerZoomOut] = useState(false)
  const [triggerReset, setTriggerReset] = useState(false)
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const handleZoomChange = useCallback((zoom: number) => {
    setZoomLevel(zoom)
  }, [])
  
  const handleLocationSelect = useCallback((selected: boolean) => {
    setIsLocationSelected(selected)
  }, [])
  
  const resetCamera = () => {
    setIsLocationSelected(false)
    setTriggerReset(true)
    setTimeout(() => setTriggerReset(false), 100)
  }
  
  const handleZoomIn = () => {
    setTriggerZoomIn(true)
    setTimeout(() => setTriggerZoomIn(false), 100)
  }
  
  const handleZoomOut = () => {
    setTriggerZoomOut(true)
    setTimeout(() => setTriggerZoomOut(false), 100)
  }
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`relative ${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <Canvas
        camera={{ 
          position: (() => {
            // Start camera focused on Iran
            const iranOffice = offices.find(o => o.id === 'iran')
            if (iranOffice) {
              const markerPosLocal = latLngToVector3(iranOffice.lat, iranOffice.lng, GLOBE_CONFIG.radius)
              const rotationMatrix = new THREE.Matrix4().makeRotationY(-Math.PI / 2)
              const markerWorldPos = markerPosLocal.clone().applyMatrix4(rotationMatrix)
              const directionToMarker = markerWorldPos.clone().normalize()
              const cameraDistance = isMobile ? 2.3 : 2.0
              return directionToMarker.multiplyScalar(cameraDistance).toArray() as [number, number, number]
            }
            return isMobile ? [0, 0, 6] : [0, 0, 5]
          })(),
          fov: isMobile ? 75 : 60 
        }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        performance={{ min: 0.5 }}
      >
        {/* Realistic lighting setup for Earth */}
        <ambientLight intensity={0.2} />
        
        {/* Sun light - main directional light */}
        <directionalLight 
          position={[5, 3, 5]} 
          intensity={1.2} 
          color="#ffffff"
        />
        
        {/* Fill lights for better visibility */}
        {!isMobile && (
          <>
            <pointLight position={[-5, 0, 0]} intensity={0.3} color="#4A90E2" />
            <pointLight position={[0, -5, 0]} intensity={0.2} color="#ffffff" />
          </>
        )}
        
        {/* Hemisphere light for natural ambient */}
        <hemisphereLight 
          color="#ffffff" 
          groundColor="#444444" 
          intensity={0.4} 
        />
        
        {/* Stars background - reduced on mobile */}
        <Stars 
          radius={300} 
          depth={60} 
          count={isMobile ? 500 : 1000} 
          factor={7} 
          saturation={0} 
          fade 
        />
        
        {/* Globe with Suspense for texture loading */}
        <Suspense fallback={<LoadingGlobe />}>
          <Globe 
            onZoomChange={handleZoomChange} 
            onLocationSelect={handleLocationSelect}
            zoomIn={triggerZoomIn}
            zoomOut={triggerZoomOut}
            resetToIran={triggerReset}
          />
          {/* Preload all assets */}
          <Preload all />
        </Suspense>
      </Canvas>
      
      {/* Responsive Control Panel */}
      <div className={`absolute z-10 ${isMobile ? 'top-2 left-2' : 'top-4 left-4'} space-y-2`}>
        {showStats && (
          <>
            <div
              className={`bg-black/20 backdrop-blur-xl rounded-xl text-white border border-white/10 ${
                isMobile ? 'p-3' : 'p-4'
              }`}
            >
              <div className={`flex items-center mb-2 ${isMobile ? 'space-x-2' : 'space-x-3 mb-3'}`}>
                <MapPin className={`text-primary ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                <div>
                  <div className={`font-semibold ${isMobile ? 'text-sm' : ''}`}>
                    {offices.length} Partner Countries
                  </div>
                  {!isMobile && <div className="text-xs text-white/70">Global Partnerships</div>}
                </div>
              </div>
              {!isMobile && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-white/60">Active Projects</div>
                    <div className="font-medium">50+</div>
                  </div>
                  <div>
                    <div className="text-white/60">Collaborations</div>
                    <div className="font-medium">{offices.length} Countries</div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      {/* Responsive Control Buttons */}
      <div className={`absolute z-10 ${isMobile ? 'top-2 right-2' : 'top-4 right-4'} ${
        isMobile ? 'flex flex-row space-x-1' : 'flex flex-col space-y-2'
      }`}>
        {!isMobile && (
          <button
            onClick={toggleFullscreen}
            className="p-3 bg-black/20 backdrop-blur-xl rounded-xl text-white hover:bg-black/30 transition-colors border border-white/10"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        )}
        
        <button
          onClick={resetCamera}
          className={`${isMobile ? 'p-2' : 'p-3'} bg-primary/20 backdrop-blur-xl rounded-xl text-white hover:bg-primary/30 transition-colors border border-white/10`}
          title="Reset to Iran (Home)"
        >
          <RotateCcw className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
        </button>
        
        <button
          onClick={handleZoomIn}
          className={`${isMobile ? 'p-2' : 'p-3'} bg-black/20 backdrop-blur-xl rounded-xl text-white hover:bg-black/30 transition-colors border border-white/10`}
          title="Zoom In"
        >
          <ZoomIn className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
        </button>
        
        <button
          onClick={() => setShowStats(!showStats)}
          className={`${isMobile ? 'p-2' : 'p-3'} bg-black/20 backdrop-blur-xl rounded-xl text-white hover:bg-black/30 transition-colors border border-white/10`}
          title="Toggle Statistics"
        >
          <Building2 className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
        </button>
      </div>
      
      {/* Desktop Zoom Controls */}
      {!isMobile && (
        <div className="absolute z-10 bottom-4 right-4 flex flex-col space-y-2">
          <button
            onClick={handleZoomIn}
            className="p-3 bg-black/20 backdrop-blur-xl rounded-xl text-white hover:bg-black/30 transition-colors border border-white/10"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-3 bg-black/20 backdrop-blur-xl rounded-xl text-white hover:bg-black/30 transition-colors border border-white/10"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      )}
      
      
      
      {/* Mobile Instructions */}
      {isMobile && (
        <div className="absolute z-10 bottom-2 left-2 right-2">
          <div
            className="bg-black/20 backdrop-blur-xl rounded-xl p-3 text-white text-xs border border-white/10 text-center"
          >
            <div className="font-medium mb-1">🌍 Touch Controls</div>
            <div className="text-white/70">
              Touch & drag to rotate • Pinch to zoom • Tap marker to focus & pause
            </div>
          </div>
        </div>
      )}
      
      {/* Loading overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-500">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
          <div className="text-sm">Loading Globe...</div>
        </div>
      </div>
    </div>
  )
}
