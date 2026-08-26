# Project Context: Ketan Portfolio

This document provides a comprehensive overview of the "Ketan Portfolio" project to brief an AI assistant on the current state, architecture, and recent engineering decisions.

## 1. Project Overview & Purpose
**Name:** Ketan Portfolio  
**Purpose:** A highly interactive, visually stunning, and high-performance personal portfolio website built for a Senior Web Performance Engineer / Creative Developer.  
**Core Features:** 
- A 3D interactive avatar in the hero section that smoothly tracks the user's cursor.
- Custom cursor mechanics (a dot and a lagging ring) with magnetic button interactions.
- Complex scroll animations, smooth scrolling physics, and parallax layers.
- 3D tilt effects on project cards with localized dynamic spotlight gradients.
- A dark, glassmorphic UI aesthetic optimized for motion accessibility (`prefers-reduced-motion`).

## 2. Tech Stack & Architecture
- **Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Vanilla CSS (`index.css`) for custom utility classes (`.glass`, `.text-gradient`) and scrollbar/selection styling.
- **3D Rendering:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`).
- **Animations & UI:** Framer Motion (for spring physics, layout animations, and reveal effects).
- **Scroll Handling:** Lenis (`@studio-freight/lenis`) for smooth wheel scrolling integrated deeply with GSAP (`gsap` and `ScrollTrigger`).
- **Icons:** `lucide-react`
- **Typography:** `@fontsource-variable/inter`

## 3. Implementation Details
The project enforces a strict separation of concerns, heavily utilizing custom hooks to handle complex DOM and math interactions:
- **`Hero3D.tsx`**: Uses `<Canvas>` to load an `avatar.glb` model. It programmatically intercepts and fixes materials (e.g., modifying hair color and transparency) and runs a `useFrame` loop to make the avatar's head bone track the user's mouse position using linear interpolation (lerp).
- **Hooks Architecture**: 
  - `useMousePosition.ts`: Globally tracks the mouse via `framer-motion` `MotionValue`s.
  - `useSmoothValue.ts`: Wraps `MotionValue`s with spring physics.
  - `useParallax.ts`: Maps mouse coordinates to bounded movement vectors for hero background elements.
  - `useLenis.ts`: Instantiates the Lenis smooth scroller and binds its `raf` to `gsap.ticker` to ensure Framer Motion, Lenis, and GSAP run on the same unified animation frame.
- **`ProjectCard.tsx`**: Implements a 3D tilt effect and a CSS variable-driven dynamic "spotlight" gradient overlay that follows the cursor inside the card bounds.
- **Routing/Structure**: A single-page application structure rendering stacked sections (`Hero`, `About`, `Experience`, `Skills`, `Projects`, `Education`, `Contact`) separated by a `SectionDivider`.

## 4. Challenges & Solutions
We recently diagnosed and resolved a severe performance bottleneck causing main-thread starvation and stuttering on initial load and during mouse movements:

- **Challenge 1: Three.js Render Loop Overhead**
  - *Issue:* Inside `Hero3D.tsx`, `scene.getObjectByName('Head')` was being called inside `useFrame` (60-120 times per second). This forced an O(N) recursive tree traversal of the GLB model every frame.
  - *Solution:* Cached the `headBone` reference using `useMemo` on mount so the traversal only happens once.
- **Challenge 2: Retina Display GPU Overload**
  - *Issue:* The `<Canvas>` lacked a `dpr` (device pixel ratio) cap, forcing Retina displays to push 2x to 3x the necessary pixels for a decorative 3D background element.
  - *Solution:* Implemented a strict pixel ratio cap using `<Canvas dpr={[1, 1.5]}>`.
- **Challenge 3: Layout Thrashing during Mouse Interactions**
  - *Issue:* `ProjectCard.tsx` called `getBoundingClientRect()` on *every single `mousemove` event* to calculate relative cursor coordinates, forcing synchronous layout repaints.
  - *Solution:* Refactored the logic to cache the bounding rect *once* on `mouseenter`. To ensure the math remained accurate even if the user scrolled while hovering, we captured the document-relative coordinates (`rect.top + window.scrollY`) and calculated the offset using `e.pageX` and `e.pageY` during mouse movement.

## 5. Current Status & Next Steps
**Current Status:** 
The core architecture, 3D integrations, scroll physics, and performance optimizations are fully implemented. The UI structure is solidly in place and the project successfully builds (`npm run build`). The severe initial load and mouse lag issues have been completely eradicated.

**Next Steps:**
- Populate the specific content (copy, project images, links, specific resume details) into the respective section components.
- Perform comprehensive mobile/touch testing (e.g., verifying 3D canvas performance on mobile, graceful degradation of the custom cursor, and disabling heavy hover effects on touch devices).
- Finalize SEO and accessibility audits (ensuring all ARIA labels and focus states are polished).
