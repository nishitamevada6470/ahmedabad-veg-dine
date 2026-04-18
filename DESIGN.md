# Design Brief

## Direction

Warm Culinary — a celebratory, food-first design system for a vegetarian restaurant website that emphasizes organic ingredients, inviting warmth, and editorial presentation.

## Tone

Organic, editorial, and warm. The palette draws from natural food colors — terracotta earth tones, cream, and sage accents — creating an immediate sense of freshness and authenticity without cliché rusticity.

## Differentiation

Clear vegetarian-centric design with sage green badges for vegetarian items and warm red for non-vegetarian, making dietary choices instantly recognizable. Food imagery and warm shadows reinforce culinary context.

## Color Palette

| Token      | OKLCH          | Role                          |
| ---------- | -------------- | ----------------------------- |
| background | 0.96 0.015 75  | warm cream, primary surface   |
| foreground | 0.22 0.05 50   | warm dark brown, text         |
| card       | 0.98 0.01 75   | off-white, elevated cards     |
| primary    | 0.45 0.15 35   | warm terracotta, CTAs & links |
| accent     | 0.55 0.10 160  | sage green, vegetarian badge  |
| muted      | 0.92 0.02 75   | light secondary, dividers     |

## Typography

- Display: Fraunces (serif) — hero, section headings, restaurant name. Bold, elegant, editorial presence.
- Body: DM Sans (sans-serif) — menu descriptions, form labels, body text. Clean, modern, readable.
- Scale: hero `text-5xl md:text-7xl font-bold`, h2 `text-3xl md:text-5xl font-bold`, label `text-sm font-semibold uppercase`, body `text-base md:text-lg`

## Elevation & Depth

Subtle warm shadows on cards and elevated surfaces (shadow-subtle, shadow-elevated) create visual separation without chroma dominance. Layered backgrounds (cream → off-white → warm accent) establish hierarchy through lightness and warmth variation.

## Structural Zones

| Zone    | Background  | Border                   | Notes                                     |
| ------- | ----------- | ------------------------ | ----------------------------------------- |
| Header  | card        | bottom: border (1px)     | Warm cream + subtle bottom separator      |
| Content | background  | —                        | Cream; alternating card backgrounds       |
| Footer  | card        | top: border (1px)        | Off-white + warm brown text + sage accent |

## Spacing & Rhythm

Section gaps: `gap-12 md:gap-16`. Card padding: `p-6 md:p-8`. Micro-spacing: buttons/badges use `px-3 py-1.5`. Breathing room between menu items and sections emphasizes editorial clarity over density.

## Component Patterns

- Buttons: warm terracotta primary, rounded corners, warm shadow on hover, smooth transition
- Cards: subtle rounded corners (6px), warm off-white background, shadow-subtle default, shadow-elevated on hover
- Badges: sage green (vegetarian) or warm red (non-vegetarian), rounded-full shape, small uppercase label

## Motion

- Entrance: menu items fade-in on scroll with 200ms stagger
- Hover: button/card shadow increases to elevated, smooth 300ms transition
- Decorative: none (prioritize clarity for food presentation)

## Constraints

- Always use sage accent (#accent) for vegetarian badges; warm red (#destructive) for non-vegetarian
- Mobile-first: header responsive at sm/md breakpoints, images scale fluidly
- Avoid heavy shadows; keep warmth through color, not blur depth

## Signature Detail

Warm terracotta primary paired with sage green accent creates an unexpected, non-clichéd food palette that feels organic and sophisticated rather than rustic-stereotypical.
