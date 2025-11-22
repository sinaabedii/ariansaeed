'use client'

import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
})

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Contact Information</h2>
      
      <div className="space-y-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
            <p className="text-gray-600">{CONTACT_INFO.address}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
            <p className="text-gray-600">{CONTACT_INFO.phone}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
            <p className="text-gray-600">{CONTACT_INFO.email}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
          </div>
        </div>
      </div>

      <div className="h-80 rounded-2xl overflow-hidden shadow-lg">
        <MapComponent
          center={[CONTACT_INFO.mapCenter.lat, CONTACT_INFO.mapCenter.lng]}
          zoom={15}
          markers={[
            {
              position: [CONTACT_INFO.mapCenter.lat, CONTACT_INFO.mapCenter.lng],
              popup: 'Arian Saeed Industrial Group Inc',
            },
          ]}
        />
      </div>
    </div>
  )
}
