# Optional Animation Modules (GSAP & ScrollTrigger)

This folder contains the optional animations for the Sketchflow landing page. Both entry animations and scroll-driven parallax/tilt effects are completely self-contained and can be removed independently or together without breaking the application or landing layout.

---

## 🛠 File Layout

```
animations/
├── entry-animation.js    # Phase 10: Orchestrates load-in drawing (heading wobble, arrow, etc.)
├── entry-animation.css   # Phase 10: Animation initial state styles
├── scroll-animation.js   # Phase 11: Scroll parallax drift, feature bobbing, and 3D tilts
├── scroll-animation.css  # Phase 11: Perspective settings and layout bounds for parallax SVGs
└── README.md             # Removal instructions (this file)
```

---

## 🛑 How to Remove Safely

### Option A: Remove Everything
1. **Delete** this `animations/` folder.
2. Open the root **`index.html`** and remove these lines from the `<head>`:
   ```html
   <!-- Entry animation (optional — safe to remove this line + the animations/ folder) -->
   <link rel="stylesheet" href="./animations/entry-animation.css">
   
   <!-- Scroll animation (optional) -->
   <link rel="stylesheet" href="./animations/scroll-animation.css">
   
   <!-- GSAP & ScrollTrigger Libraries from CDN (belonging to the optional animation block) -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
   ```
3. Remove these lines from the bottom of `<body>`:
   ```html
   <!-- Entry animation script (optional — safe to remove this line + the animations/ folder) -->
   <script type="module" src="./animations/entry-animation.js"></script>

   <!-- Scroll animation script (optional) -->
   <script type="module" src="./animations/scroll-animation.js"></script>
   ```

### Option B: Remove ONLY Scroll Animations
1. Delete `scroll-animation.js` and `scroll-animation.css`.
2. Open **`index.html`** and remove:
   - `<link rel="stylesheet" href="./animations/scroll-animation.css">`
   - `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>`
   - `<script type="module" src="./animations/scroll-animation.js"></script>`
3. The entry animation will still play normally.

### Option C: Remove ONLY Entry Animations
1. Delete `entry-animation.js` and `entry-animation.css`.
2. Open **`index.html`** and remove:
   - `<link rel="stylesheet" href="./animations/entry-animation.css">`
   - `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"></script>`
   - `<script type="module" src="./animations/entry-animation.js"></script>`
3. The scroll-driven parallax and 3D tilts will still execute normally.

---

## ⚙ Design Details

- **Input/Accessibility Safeguard**: If `prefers-reduced-motion` is active, animations are bypassed automatically. Parallax shapes appear static, while bobs and 3D tilts are skipped.
- **Fail-safe CDN Checks**: If the external library loads fail or are blocked, scripts identify the absence of `gsap` or `ScrollTrigger` and bail out silently. Layouts display normally.
- **No Shared Variables**: `entry-animation.js` and `scroll-animation.js` are decoupled. They share no internal script dependencies.
