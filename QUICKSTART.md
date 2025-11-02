# Quick Start Guide

## What's Included

Your 3D nightclub experience is ready! The project includes:

✅ **Next.js 14** with App Router
✅ **React Three Fiber** for 3D rendering
✅ **Three.js** scene with atmospheric effects
✅ **Procedurally generated smoke texture**
✅ **Mobile-optimized performance**

## Run the Application

```bash
# Start development server
npm run dev
```

Then visit:
- **Home page**: http://localhost:3000
- **Nightclub scene**: http://localhost:3000/club

## Project Structure

```
pasion/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Landing page with "Enter Club" button
│   ├── globals.css             # Global styles
│   └── club/
│       ├── page.tsx            # Club page wrapper (client component)
│       └── ClubScene.tsx       # Three.js scene with smoke and lighting
├── public/
│   └── textures/
│       └── smoke.png           # Procedurally generated smoke texture (133KB)
└── scripts/
    ├── generate-smoke.html     # Browser tool to create custom textures
    └── create-simple-smoke.js  # Node script to regenerate texture
```

## Scene Features

### Current Setup
- **6 smoke planes** rotating slowly with additive blending
- **Red point light** (0xff0000) at position (0, 5, 0) with intensity 3
- **Exponential fog** with density 0.05 and dark red color (0x0a0000)
- **Ambient light** at 0.05 intensity for subtle fill
- **Orbit controls** with auto-rotation, zoom and pan disabled
- **Device pixel ratio** capped at 1.5 for mobile performance

### Customization

Edit `app/club/ClubScene.tsx` to adjust:

```typescript
// Change fog density (higher = thicker fog)
<fogExp2 args={[fogColor, 0.05]} />

// Modify light color and intensity
const pointLight = new THREE.PointLight(0xff0000, 3, 25);

// Adjust smoke opacity (0.0 to 1.0)
opacity={0.4}

// Change number of smoke planes
[...Array(6)].map(...)

// Modify rotation speed
meshRef.current.rotation.z = clock.elapsedTime * 0.05;
```

## Custom Smoke Texture

### Option 1: Browser Tool
1. Open `scripts/generate-smoke.html` in your browser
2. Click "Generate Smoke Texture" to randomize
3. Click "Download as smoke.png"
4. Save to `public/textures/smoke.png`

### Option 2: Node Script
```bash
node scripts/create-simple-smoke.js
```

## Performance Tips

The scene is optimized for 60 FPS on mobile:
- ✅ Capped pixel ratio (1.5 max)
- ✅ Small texture size (256x256)
- ✅ Minimal draw calls (6 planes)
- ✅ `depthWrite={false}` on smoke materials
- ✅ Memoized Three.js objects

### Optional Enhancements

For even better visuals, consider adding:

```bash
npm install @react-three/postprocessing
```

Then add bloom effect in `ClubScene.tsx`:
```typescript
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// In your Canvas:
<EffectComposer>
  <Bloom intensity={1.5} luminanceThreshold={0.1} />
</EffectComposer>
```

## Production Build

```bash
npm run build
npm start
```

## Troubleshooting

**Black screen?**
- Check browser console for errors
- Verify `public/textures/smoke.png` exists
- Try regenerating the smoke texture

**Poor performance?**
- Lower the number of smoke planes
- Reduce fog density
- Check if hardware acceleration is enabled in your browser

**Smoke not visible?**
- Increase light intensity
- Adjust smoke opacity
- Check light position

## Next Steps

1. **Add more lights**: Experiment with multiple colored lights
2. **Add geometry**: Create a floor plane or walls
3. **Add music**: Integrate Web Audio API for visualization
4. **Add particles**: Use `@react-three/drei` PointsBuffer
5. **Add bloom**: Install postprocessing for glowing effects

Enjoy building your nightclub experience! 🎵✨

