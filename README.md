# Skroller - Premium Website Presentation

Sitio web premium con capacidades 3D avanzadas, creado para demostrar el impacto visual y tecnológico de VisorLab.

## 🚀 Stack Tecnológico de Vanguardia

### Core
- **React 18** + **TypeScript** - Framework moderno y type-safe
- **Three.js** + **@react-three/fiber** - Renderizado 3D y WebGL de alto rendimiento
- **@react-three/drei** - Utilidades avanzadas para Three.js
- **@react-three/postprocessing** - Efectos post-procesamiento profesionales

### Animaciones
- **GSAP** - Animaciones de nivel profesional con timeline
- **Framer Motion** - Micro-interacciones y transiciones fluidas
- **Scroll-triggered animations** - Animaciones basadas en scroll

### Estilos
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - Procesamiento CSS avanzado
- **Custom shaders** - GLSL para efectos visuales únicos

### Build
- **Vite** - Build tool ultra-rápido
- **TypeScript** - Type safety en todo el proyecto

## 🎨 Características Avanzadas

### Efectos 3D y WebGL
- ✨ **Escena 3D interactiva** con 5000+ partículas animadas
- 🎨 **Shaders personalizados** con efectos de ondas y gradientes
- 💫 **Post-processing avanzado**: Bloom, Chromatic Aberration, Glitch, Vignette
- 🌊 **Líneas geométricas 3D** con curvas complejas y animación
- 🎯 **Interactividad con mouse** - elementos 3D responden al cursor
- 🔮 **Torus flotante** con materiales PBR (Physically Based Rendering)

### Animaciones y Efectos
- 🎭 **GSAP** para animaciones complejas y secuencias
- 🌊 **Framer Motion** para micro-interacciones fluidas
- 📊 **Scroll-triggered animations** avanzadas
- ✨ **Partículas flotantes** con física realista
- 🎨 **Gradientes animados** y efectos de glow
- 💎 **Glassmorphism** y efectos de profundidad

### Performance
- ⚡ **Optimización WebGL** con frustum culling
- 🎯 **LOD (Level of Detail)** para mejor rendimiento
- 📱 **Mobile-first** con optimizaciones específicas
- 🔧 **DPR adaptativo** para diferentes pantallas

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

El sitio se abrirá en `http://localhost:3000`

## 🏗️ Build

```bash
npm run build
```

## 📄 Estructura

```
src/
├── components/        # Componentes React
│   ├── Hero.tsx      # Sección principal
│   ├── Scene3D.tsx   # Escena 3D con Three.js
│   └── ...
├── App.tsx           # Componente principal
├── main.tsx          # Punto de entrada
└── index.css         # Estilos globales
```

## 🎨 Sistema de Diseño

- **Colores principales**: Magenta (#FF00FF), Azul (#00BFFF), Oscuro (#0A0A0A)
- **Tipografía**: Inter (Google Fonts)
- **Efectos**: Glassmorphism, gradientes, glows

## 📱 Responsive

El sitio está optimizado para:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (320px - 767px)

