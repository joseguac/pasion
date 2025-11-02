# Pasión - 3D Nightclub Experience

A stunning 3D nightclub scene built with Next.js and Three.js (React Three Fiber), featuring atmospheric smoke effects, dramatic red lighting, and smooth 60 FPS performance.

## Features

- 🌫️ **Atmospheric Smoke**: Slowly rotating semi-transparent smoke planes with additive blending
- 💡 **Dynamic Lighting**: Red point light that diffuses through the smoke
- 🎨 **Dark Aesthetic**: Black background with exponential fog for depth
- 📱 **Mobile Optimized**: Capped device pixel ratio for stable performance
- 🎮 **Interactive Controls**: Orbit controls with auto-rotation

## Tech Stack

- **Next.js 14** - App Router
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Three.js** - 3D graphics library
- **TypeScript** - Type safety

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the home page, then click "Enter Club" to experience the 3D nightclub scene.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
pasion/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── club/
│       ├── page.tsx        # Club page wrapper
│       └── ClubScene.tsx   # Three.js scene component
├── public/
│   └── textures/
│       └── smoke.png       # Smoke texture
└── scripts/
    ├── generate-smoke.html # Browser-based texture generator
    └── create-simple-smoke.js # Node.js texture generator
```

## Customization

### Adjust the Atmosphere

In `app/club/ClubScene.tsx`, you can modify:

- **Fog density**: Change the second parameter in `<fogExp2 args={[fogColor, 0.05]} />`
- **Light color**: Modify `0xff0000` in the PointLight creation
- **Light intensity**: Adjust the second parameter (currently `3`)
- **Smoke opacity**: Change `opacity={0.4}` in the SmokePlane component
- **Number of smoke planes**: Modify the array size in `[...Array(6)]`

### Generate Custom Smoke Texture

For a higher quality smoke texture:

1. Open `scripts/generate-smoke.html` in your browser
2. Click "Generate Smoke Texture"
3. Click "Download as smoke.png"
4. Save to `public/textures/smoke.png`

Or run the Node.js generator:
```bash
node scripts/create-simple-smoke.js
```

## Performance Notes

- Device pixel ratio is capped at 1.5 for mobile performance
- Smoke planes use `depthWrite={false}` to prevent z-fighting
- Additive blending creates the glowing effect without expensive postprocessing
- Small texture size (256x256) keeps memory usage low

## Optional Enhancements

Consider adding:
- **@react-three/postprocessing** for bloom effects
- **Volumetric cone mesh** near the light source
- **Music visualization** using Web Audio API
- **Particle systems** for additional atmosphere
- **HDR environment maps** for enhanced lighting

## Browser Support

Works in all modern browsers that support WebGL. For best performance:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT

## Credits

Built with ❤️ using React Three Fiber and Three.js

