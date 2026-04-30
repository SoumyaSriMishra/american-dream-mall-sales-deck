# American Dream Mall - Interactive Sales Deck

> [!IMPORTANT]
> **DESKTOP OPTIMIZED**: This is a cinematic deck presentation designed and optimized for high-resolution desktop viewing. It uses complex particle systems and horizontal scrolling interactions best experienced on a laptop or desktop monitor.

A world-class interactive sales tool showcasing American Dream Mall - one of North America's premier entertainment and retail destinations. Built as a Digideck presentation platform for high-stakes commercial sales.

## ✨ Magical Interactions

The deck features a series of **special golden hover buttons** designed to unlock the "magical views" of the Dream Mall. Look out for these interactive triggers on each page:

- **Skip Now**: Seamlessly transition from the cinematic intro to the main deck.
- **View on Google Maps**: Explore the strategic location in the New Jersey/NYC hub.
- **Live Exposure**: (Retail Slide) Trigger a magical letter explosion to reveal the impact of live retail.
- **Explore the Menu**: (Dining Slide) Start the animated conveyor belt with the moving steam-engine train.
- **View the World**: (Luxury Slide) Launch the Polaroid wall gallery of global luxury hotel partners.
- **Wipe Out to Live the Moment**: (Entertainment Slide) Interact with major attractions and venues.
- **Want to be Attracted**: (Sponsorship Slide) Discover partnership and activation tiers.
- **Visit Website**: Direct connection to live mall resources.
- **Navigation ( > )**: Smoothly transition between chapters of the mall's story.

## Overview

This is a React-based interactive sales deck designed to eliminate presentation friction for American Dream Mall's commercial team. The tool replaces fragmented sales processes (YouTube videos, PDFs, spreadsheets) with a unified, cinematic experience that tells the property's story and drives immediate business action toward leasing, sponsorship, and event bookings.

## Key Features

- **Digideck Navigation** - Non-linear slide navigation with dot indicators, keyboard controls, and number keys
- **Cinematic Hero** - Auto-playing video background with immediate impact and scale demonstration
- **Full-Screen Slides** - Immersive full-screen experience for each business category
- **Video-First Storytelling** - Primary narrative medium with smooth transitions
- **Business Action Focus** - Every slide drives toward leasing, sponsorship, or event booking
- **Premium UI/UX** - Luxury brand inspiration with dark themes and amber accents
- **Responsive Performance** - Optimized for desktop/tablet with mobile support
- **Modular Architecture** - Easy expansion for new slides and sub-modules

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 3 with custom CSS variables
- **Animations**: Framer Motion 11
- **Routing**: React Router DOM v6
- **Icons**: Lucide React

## Project Structure

```
src/
|-- components/
|   |-- digideck/
|   |   |-- DigideckContainer.tsx  # Main digideck with navigation and state
|   |   |-- slides/
|   |   |   |-- HeroSlide.tsx        # Cinematic hero with video
|   |   |   |-- AboutSlide.tsx       # Mall overview and demographics
|   |   |   |-- RetailSlide.tsx       # Retail offerings and tenants
|   |   |   |-- LuxurySlide.tsx       # Luxury shopping experience
|   |   |   |-- DiningSlide.tsx       # Dining with conveyor belt
|   |   |   |-- EntertainmentSlide.tsx # Entertainment venues
|   |   |   |-- EventsSlide.tsx       # Event hosting with slideshow
|   |   |   |-- SponsorshipSlide.tsx  # Partnership opportunities
|   |   |   |-- ContactSlide.tsx       # Contact and location info
|-- data/
|   |-- mallData.ts             # Static content and demographics
|   |-- mediaAssets.ts          # Image and video URLs
|-- lib/
|   |-- animations.ts           # Framer Motion presets
|-- styles/
|   |-- globals.css             # Global styles and CSS variables
|-- App.tsx                   # Main digideck configuration
|-- main.tsx                  # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SoumyaSriMishra/american-dream-mall.git
cd american-dream-mall
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

### Deployment

This project is designed for easy deployment on platforms like:
- Netlify (recommended)
- Vercel
- GitHub Pages
- Any static hosting service

## Design System

### Color Palette
- **Primary**: Amber (#C8922A)
- **Backgrounds**: Ivory (#FAF8F3), Charcoal (#1C1B19)
- **Text**: Slate (#3D3A35), Warm Grey (#9A948C)
- **Accents**: Rust, Sage, Dusty Rose

### Typography
- **Display**: Cormorant (elegant serif)
- **Body**: Outfit (modern sans-serif)
- **Impact**: Bebas Neue (bold display)

### Animation Philosophy
Animations are subtle and smooth, using Framer Motion for:
- Scroll-triggered fade-ins
- Parallax effects
- Hover states
- Page transitions

## Digideck Structure

1. **Hero**: Cinematic video with immediate scale impact and positioning
2. **About**: Mall overview, location advantages, and visitor demographics
3. **Retail**: Shopping experiences, key tenants, and growth trajectory
4. **Luxury**: Elevated retail experience with premium positioning
5. **Dining**: Lifestyle dining with automatic conveyor belt showcase
6. **Entertainment**: Major attractions and venue capabilities
7. **Events**: Event hosting with cinematic background slideshow
8. **Sponsorship**: Partnership opportunities with audience data
9. **Contact**: Location information and business inquiry CTA

## Business Objectives

- **Retail Leasing**: Showcase tenant mix and growth opportunities
- **Sponsorship Deals**: Present audience demographics and partnership tiers
- **Event Bookings**: Highlight venue capabilities and global platform positioning
- **Brand Partnerships**: Demonstrate activation opportunities within property

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Live Deployment

URL: https://american-dream-mall-sales-deck.netlify.app/

## Sub-Modules

- `/events` - Event hosting capabilities and inquiry form

## AI Tools Used

AI Tools Used

- Windsurf: Primary IDE for code implementation and reactive state management.

- Claude: Used for technical architecture, design system planning, and UI/UX logic.

- Gemini & ChatGPT: Narrative strategy, luxury sales copy, and demographic data synthesis.

- Google Anti-Gravity: Used for research and asset discovery.

- Unsplash/Pexels: High-fidelity media assets.
