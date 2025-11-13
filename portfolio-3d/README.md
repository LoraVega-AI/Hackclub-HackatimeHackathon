# 3D Interactive Portfolio - Enhanced Edition

An interactive 3D web portfolio inspired by Bruno Simon's site, featuring a cute cat character that navigates a large, detailed low-poly map to explore different portfolio sections. Built with modern web technologies and professional 3D design.

## ✨ Features

### 🐱 Advanced Cat Character
- Professionally designed low-poly cat with smooth geometry
- Animated tail that sways realistically with movement
- Blinking eyes animation for lifelike behavior
- Detailed features including whiskers, paws, and expressive face
- Smooth, controlled movement with WASD/Arrow keys (optimized speed)

### 🗺️ Expansive Interactive Map
- Large 50x50 unit map with varied terrain
- 20+ decorative trees scattered throughout
- Rock formations and elevated platforms
- Bushes and natural elements
- Path markers leading to landmarks
- Professional materials and lighting

### 🏛️ Professional Landmark Designs
Each landmark has a unique, sophisticated 3D architecture:

- **Projects** (Red) - Modern glass building with geometric patterns and metallic accents
- **Experience** (Teal) - Multi-tiered tower with glowing platforms and crystal top
- **About** (Mint) - Organic flowing design with orbiting rings and spheres
- **Contact** (Pink) - Tech-inspired holographic structure with data panels

### ✨ Particle & Visual Effects
- Orbital particles around each landmark
- Ambient floating particles throughout the scene
- Starfield background for depth
- Smooth animations and transitions
- Pulsing glow effects on landmarks

### 🎯 Interactive Features
- Proximity indicators (glowing rings) that appear when approaching landmarks
- Floating arrows above landmarks for easy navigation
- Visual feedback with scaling and pulsing effects
- Smooth spring-based animations for UI modals
- Enhanced lighting with multiple light sources

### 📱 Fully Responsive
- Optimized for desktop, tablet, and mobile
- Adaptive UI scaling
- Touch-friendly controls information
- Performance optimizations for smooth 60fps

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Navigate to the portfolio-3d directory:
```bash
cd portfolio-3d
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 Controls

- **WASD** or **Arrow Keys**: Move the cat character
- **Mouse Drag**: Rotate the camera around the scene
- **Mouse Scroll**: Zoom in/out (12-40 units range)
- **Approach Landmarks**: Get within 2 units to trigger section information

## 🛠️ Technology Stack

- **Next.js 14**: React framework with App Router
- **React Three Fiber**: React renderer for Three.js
- **Three.js**: 3D graphics library
- **@react-three/drei**: Useful helpers and abstractions
- **Framer Motion**: Smooth animations for UI
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety and better DX

## 📁 Project Structure

```
portfolio-3d/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page component
│   └── globals.css          # Global styles
├── components/
│   ├── Scene3D.tsx          # Main 3D scene orchestrator
│   ├── Map.tsx              # Large map with terrain features
│   ├── CatCharacter.tsx     # Advanced cat with animations
│   ├── Landmarks.tsx        # Professional landmark designs
│   ├── ParticleEffects.tsx  # Particle systems
│   ├── ProximityIndicators.tsx # Interactive feedback
│   └── UIOverlay.tsx        # UI and modals
└── package.json
```

## 🎨 Customization

### Adding New Landmarks

Edit `components/Landmarks.tsx` and `components/Scene3D.tsx`:

```typescript
// In Scene3D.tsx landmarks array:
{ 
  name: 'skills', 
  position: new Vector3(0, 0, -15), 
  color: '#FFD700', 
  label: 'Skills' 
}

// In Landmarks.tsx, add a new if condition in the Landmark component
// Create unique 3D design for your new landmark
```

### Adjusting Cat Speed

In `components/CatCharacter.tsx`:
```typescript
const speed = 0.04 // Decrease for slower, increase for faster
```

### Changing Map Size

In `components/Map.tsx`:
```typescript
<planeGeometry args={[50, 50, 20, 20]} /> // [width, height, widthSegments, heightSegments]
```

Update boundary in `components/CatCharacter.tsx`:
```typescript
const boundary = 22 // Should be slightly less than map size / 2
```

### Customizing Particles

In `components/ParticleEffects.tsx`:
- Adjust `count` prop for more/fewer particles
- Modify colors and sizes in PointMaterial
- Change velocities for different movement patterns

### Styling UI

The project uses Tailwind CSS. Modify:
- `app/globals.css`: Global styles and animations
- `components/UIOverlay.tsx`: Modal and control panel styles

## ⚡ Performance Optimization

- Adaptive pixel ratio: `dpr={[1, 2]}` for balanced quality/performance
- Shadow map size optimized at 2048x2048
- Low-poly geometry for efficient rendering
- Particle count balanced for visual quality
- Camera bounds limit render distance
- Dynamic imports for code splitting

## 🌐 Browser Support

- **Chrome/Edge**: ✅ Full support (recommended)
- **Firefox**: ✅ Full support
- **Safari**: ✅ Full support
- **Mobile browsers**: ✅ Supported with touch controls

**Requirements**: WebGL 2.0 support

## 🎯 Features Breakdown

### Visual Quality
- Professional 3D models with proper materials
- Metallic and emissive surfaces
- Multi-light setup (directional, point, hemisphere)
- Shadow casting and receiving
- Particle effects with additive blending

### Interactivity
- Real-time proximity detection
- Smooth camera controls with constraints
- Visual feedback systems
- Animated UI transitions
- Position tracking and updates

### Performance
- 60fps target on modern hardware
- Optimized render loop
- Efficient geometry usage
- Balanced particle counts
- No unnecessary re-renders

## 📝 Tips for Users

1. **Exploration**: Take your time exploring the map - there are decorative elements throughout
2. **Camera**: Use camera rotation to get better views of landmarks
3. **Proximity**: Watch for the glowing rings that appear when you're near landmarks
4. **Path Markers**: Follow the stone paths from the center to find landmarks easily

## 🔧 Development

### Adding New Features

1. Create component in `components/` directory
2. Import in `Scene3D.tsx`
3. Add to the scene within the `<Suspense>` wrapper
4. Test performance impact

### Debugging

- Use React DevTools for component inspection
- Three.js Inspector browser extension for 3D debugging
- Console logs in `useFrame` hooks (be careful of performance)

## 📄 License

MIT

## 🙏 Credits

- Inspired by [Bruno Simon's Portfolio](https://bruno-simon.com/)
- Built with React Three Fiber ecosystem
- Enhanced with custom 3D designs and interactions

## 🚀 Deployment

Build for production:
```bash
npm run build
npm start
```

Or deploy to Vercel:
```bash
vercel
```

---

**Enjoy exploring the 3D portfolio! Feel free to customize it to match your personal style and content.**
