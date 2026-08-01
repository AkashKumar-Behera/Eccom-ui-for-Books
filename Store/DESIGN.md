---
name: Artisanal Mist
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadad9'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f3'
  surface-container: '#eeeeed'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#40484a'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f0'
  outline: '#70797a'
  outline-variant: '#bfc8ca'
  surface-tint: '#286771'
  primary: '#286771'
  on-primary: '#ffffff'
  primary-container: '#76b1bc'
  on-primary-container: '#00444c'
  inverse-primary: '#95d0db'
  secondary: '#416469'
  on-secondary: '#ffffff'
  secondary-container: '#c1e6ec'
  on-secondary-container: '#45686d'
  tertiary: '#566061'
  on-tertiary: '#ffffff'
  tertiary-container: '#a0aaab'
  on-tertiary-container: '#353f40'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0ecf8'
  primary-fixed-dim: '#95d0db'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#024e58'
  secondary-fixed: '#c4e9ef'
  secondary-fixed-dim: '#a8cdd3'
  on-secondary-fixed: '#001f23'
  on-secondary-fixed-variant: '#294c51'
  tertiary-fixed: '#dae4e5'
  tertiary-fixed-dim: '#bec8c9'
  on-tertiary-fixed: '#141d1e'
  on-tertiary-fixed-variant: '#3f484a'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  section-gap: 80px
  container-padding: 24px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The brand personality is rooted in the intersection of premium craftsmanship and modern warmth. It evokes the tactile joy of physical stationery—the weight of heavy paper, the glide of a pen, and the ritual of journaling. The target audience values intentional living, slow mornings, and the beauty of analog tools in a digital world.

The design style is **Editorial Minimalism**. It prioritizes high-quality photography and expansive whitespace to create a "magazine-like" browsing experience. While the underlying structure is clean and professional, the interface remains approachable through significant roundedness and organic color transitions. The aesthetic borrows the high-end clarity of luxury editorial brands while maintaining a cozy, "handmade" soul through subtle shadows and soft Mist-colored surfaces.

## Colors

This design system utilizes a sophisticated, nature-inspired palette that balances cool teals with an earthy off-black.

- **Primary (#76B1BC):** Used for key brand moments, active states, and decorative flourishes. It represents the "modern" side of the brand—fresh and calm.
- **Secondary (#2C4F54):** The grounding force. Used for primary call-to-action buttons, high-level headers, and instances where maximum legibility and authority are required.
- **Tertiary (#E8F2F3):** Acts as the primary background surface. It provides a softer, warmer alternative to pure white, reducing eye strain and enhancing the "premium paper" feel.
- **Neutral (#1A1C1C):** Reserved for body text, fine lines, and iconography. It is never pure black, ensuring the contrast remains soft and elegant.

## Typography

The typography strategy pairs a classical serif with a precision-engineered sans-serif to bridge the gap between traditional stationery and modern e-commerce.

- **Headlines:** Playfair Display is used for all major headings and product titles. It brings a literary, high-fashion quality to the page. It should be typeset with slightly tighter letter-spacing for large display sizes to maintain a cohesive "block" look.
- **Body & Interface:** Hanken Grotesk provides exceptional legibility for product descriptions and functional UI. Its geometric but friendly construction complements the rounded UI elements.
- **Micro-copy:** Labels and captions use Hanken Grotesk in Medium or SemiBold weights with increased letter-spacing to ensure clarity even at small scales.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** approach for desktop to preserve the editorial composition, transitioning to a fluid model for mobile.

- **Desktop:** 12-column grid with a 1200px maximum width. Large 80px gaps between vertical sections create the necessary "breathability" for a premium feel.
- **Mobile:** 4-column fluid grid. The margins are reduced to 16px, but the internal component padding remains generous to ensure a "chunky" and tactile touch experience.
- **Spacing Rhythm:** All spacing values are multiples of an 8px base unit. Consistent use of large internal padding (minimum 24px) within cards and containers is mandatory to reflect the "Large Whitespace" brand requirement.

## Elevation & Depth

This design system avoids harsh drop shadows in favor of **Tonal Layering** and **Ambient Diffusion**.

- **Surfaces:** The primary background is the Tertiary Mist color. Cards and containers use pure white (#FFFFFF) to subtly "pop" against the mist.
- **Shadows:** When elevation is required (e.g., for hovering over a product or a floating shopping bag), use a very soft, multi-layered shadow: `0px 10px 30px rgba(44, 79, 84, 0.08)`. The use of the Secondary color in the shadow's hex code creates a natural, "ink-on-paper" depth rather than a synthetic gray shadow.
- **Interactions:** Subtle scale-up transforms (e.g., 102%) are preferred over heavy shadows to indicate interactivity, maintaining the clean editorial aesthetic.

## Shapes

The shape language is defined by a signature **24px (1.5rem)** radius for all primary containers, cards, and large buttons. This extreme roundedness communicates warmth, approachability, and the "cozy" nature of the brand.

- **Large Elements:** Use `rounded-xl` (1.5rem / 24px) for product cards, image carousels, and the main navigation bar.
- **Interactive Elements:** Buttons and input fields should also utilize the 24px radius to create a pill-like, ergonomic appearance.
- **Icons:** Icons should feature rounded caps and corners to match the UI's softness.

## Components

- **Buttons:** 
    - *Primary:* Solid Secondary (#2C4F54) background with white text. High-contrast and authoritative. 24px rounded corners.
    - *Secondary:* Outlined with Primary (#76B1BC) or solid Tertiary (#E8F2F3) with Secondary text.
- **Product Cards:** Solid white background with a 1px soft border in Primary (20% opacity). Minimal text below the image. Product images should have the 24px corner radius applied to the top corners or the entire container.
- **Input Fields:** Soft Mist (#E8F2F3) background with no border in its default state. On focus, a 2px Primary (#76B1BC) border.
- **Chips/Badges:** Small, pill-shaped markers for "New" or "Handmade" using the Primary color at 15% opacity with Secondary color text.
- **Search Bar:** A large, prominent element with 24px roundedness and a soft ambient shadow, reflecting the "modern" toolset of the store.
- **The "Ribbon" Detail:** As a nod to the logo, specific primary sections or featured product images can include a small, top-aligned "tag" or "ribbon" graphic element in the Primary teal.