# Arian Saeed Industrial Group Inc - Corporate Website

A cutting-edge, innovative corporate website built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Features

- ✨ **Modern Design**: Clean, professional design with stunning animations
- 📱 **Fully Responsive**: Mobile-first approach, works on all devices
- 🎨 **Advanced Animations**: Framer Motion for smooth, engaging interactions
- 🗺️ **Interactive Maps**: Leaflet integration for location services
- 💬 **AI Chatbot**: Custom-designed chatbot interface
- 🌐 **Multiple Pages**: Home, About, Contact, and Careers pages
- 🎯 **Business Domains**: Showcase of 7 different business sectors
- 🏢 **Subsidiary Companies**: Interactive company portfolio
- 📰 **Featured Articles**: News and insights section
- ⚡ **Performance Optimized**: Fast loading with code splitting and lazy loading
- 🎭 **3D Elements**: Three.js integration for immersive experiences
- 📊 **Stats & Metrics**: Animated statistics and achievements

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Maps**: Leaflet & React-Leaflet
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Icons**: Lucide React
- **UI Components**: Custom components with shadcn/ui patterns

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🚀 Getting Started

1. **Install Dependencies**

```bash
npm install
```

2. **Run Development Server**

```bash
npm run dev
```

3. **Open Browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ariansaeed/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── about/           # About page
│   │   ├── contact/         # Contact page
│   │   ├── careers/         # Careers page
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── home/           # Homepage sections
│   │   ├── about/          # About page components
│   │   ├── contact/        # Contact page components
│   │   ├── careers/        # Careers page components
│   │   ├── layout/         # Header & Footer
│   │   ├── Chatbot.tsx     # AI Chatbot component
│   │   └── MapComponent.tsx # Interactive map
│   └── lib/                # Utilities and constants
│       ├── utils.ts        # Helper functions
│       └── constants.ts    # Site configuration
├── public/                 # Static assets
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies

```

## 🎨 Color Scheme

- **Primary**: #76193A (Brand Maroon)
- **Secondary**: #FFFFFF (White)
- **Accent**: Shades of maroon/burgundy

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌟 Key Pages

### Homepage
- Hero slider with 3D animations
- About section with company info
- Animated statistics
- Business domains showcase
- Innovation & creativity section
- Subsidiary companies carousel
- Featured articles

### About Us
- Company history timeline
- Mission, vision, values
- Leadership team profiles
- Certificates & achievements

### Contact
- Interactive contact form
- Location map (Leaflet)
- Contact information
- Business hours

### Careers
- Open positions
- Company benefits
- Application process
- Employee testimonials

## 🔧 Configuration

### Site Configuration
Edit `src/lib/constants.ts` to update:
- Company information
- Business domains
- Contact details
- Navigation items
- Map coordinates

### Styling
- Tailwind config: `tailwind.config.ts`
- Global styles: `src/app/globals.css`
- Custom animations and utilities included

## 🌐 Map Coordinates

Default location (Tehran):
- Latitude: 35.77857469321197
- Longitude: 51.423923904739006

Update in `src/lib/constants.ts` to change location.

## ♿ Accessibility

- WCAG 2.1 compliant
- Keyboard navigation support
- Screen reader compatible
- Color contrast adherence

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

Copyright © 2024 Arian Saeed Industrial Group Inc. All rights reserved.

## 🤝 Contributing

This is a proprietary project. For inquiries, please contact the development team.

## ⚡ Performance Optimization

This website is optimized for maximum performance:
- **Dynamic Imports**: Lazy loading for below-the-fold components
- **Image Optimization**: Next.js Image component with AVIF/WebP support
- **Code Splitting**: Automatic chunking for optimal bundle size
- **SWC Minification**: Fast production builds
- **CSS Optimization**: Tailwind CSS with PurgeCSS
- **Font Optimization**: Google Fonts with display swap

Target Lighthouse Score: 90+

## 📧 Contact

For support or questions:
- Email: info@ariansaeed.com
- Phone: +98 21 1234 5678
- Website: https://www.ariansaeed.com

---

Built with ❤️ using Next.js and modern web technologies.
