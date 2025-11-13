# Quick Start Guide - 3D Interactive Portfolio

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd portfolio-3d
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

### Controls
- **W/↑**: Move forward
- **S/↓**: Move backward
- **A/←**: Move left
- **D/→**: Move right
- **Mouse Drag**: Rotate camera
- **Mouse Wheel**: Zoom in/out

### Navigation
1. Your pink cat starts at the center of the map
2. Look for the **floating arrows** above colored landmarks
3. Move toward any landmark to explore:
   - 🔴 **Red** = Projects
   - 🟢 **Teal** = Experience
   - 🟣 **Mint** = About Me
   - 🔴 **Pink** = Contact

### Visual Cues
- **Glowing rings** appear when you're close to a landmark
- **Particles** orbit around each landmark
- **Stars** twinkle in the background
- **Path stones** lead from center to landmarks

## ✨ What Makes This Special

### The Cat 🐱
- Professionally designed with smooth geometry
- **Animated tail** that sways as you move
- **Blinking eyes** for lifelike behavior
- Detailed whiskers and paws

### The Map 🗺️
- **50x50 units** of explorable terrain
- 20+ trees scattered around
- Rock formations and bushes
- Elevated platforms
- Stone paths to landmarks

### The Landmarks 🏛️
Each landmark has a unique 3D design:
- **Projects**: Modern glass building
- **Experience**: Multi-tiered tower with glowing platforms
- **About**: Organic flowing spheres with orbiting rings
- **Contact**: Holographic tech structure

### The Effects ✨
- Particle systems around landmarks
- Ambient floating particles
- Starfield background
- Proximity indicators
- Professional lighting setup

## 📱 Mobile Users

The experience works on mobile but is best viewed on desktop/laptop for:
- Full camera control
- Better performance
- Larger view of the beautiful 3D environment

## 🎯 Tips

1. **Take Your Time**: Explore the entire map to see all details
2. **Zoom Out**: Get a bird's eye view of the whole scene
3. **Follow Paths**: Stone paths lead from center to each landmark
4. **Watch the Cat**: Notice the tail animation and blinking!
5. **Enjoy the Ambiance**: Particles and lighting create a magical atmosphere

## 🛠️ Troubleshooting

### Low Frame Rate?
- Close other browser tabs
- Update your graphics drivers
- Try zooming in (less to render)

### Can't See Anything?
- Ensure WebGL is enabled in your browser
- Try a different browser (Chrome recommended)
- Check console for errors (F12)

### Cat Not Moving?
- Click on the 3D scene first
- Make sure you're using WASD or arrow keys
- Check that no input is being blocked

## 📚 Learn More

- See `README.md` for full documentation
- Check `FEATURES.md` for technical details
- Visit project components in `components/` folder

## 🎨 Customize Your Experience

Want to make it your own? Easy edits:

### Change Cat Speed
`components/CatCharacter.tsx` - Line 28:
```typescript
const speed = 0.04 // Lower = slower, Higher = faster
```

### Change Cat Color
`components/CatCharacter.tsx` - Search for `#FFB6C1` and replace with your color

### Add Your Content
`components/UIOverlay.tsx` - Lines 10-30:
Replace the content in `sectionContent` object

---

**Ready to explore? Start the dev server and dive in!** 🚀

