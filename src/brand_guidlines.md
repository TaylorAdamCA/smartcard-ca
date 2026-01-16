# SmartCard CA — Brand Guidelines & Design System

**Version:** 1.0  
**Last Updated:** January 2026  
**Market:** Canada

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Brand Personality](#brand-personality)
3. [Logo & Wordmark](#logo--wordmark)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Spacing & Layout](#spacing--layout)
7. [Component Library](#component-library)
8. [Iconography](#iconography)
9. [Motion & Animation](#motion--animation)
10. [Photography & Imagery](#photography--imagery)
11. [Voice & Tone](#voice--tone)
12. [Accessibility](#accessibility)
13. [Usage Examples](#usage-examples)

---

## Brand Overview

### Mission Statement
**"Empower Canadians to maximize their credit card rewards through transparent, privacy-first spending analysis."**

### Brand Promise
SmartCard CA promises users complete privacy—their financial data never leaves their browser—while delivering precise, actionable recommendations that save them real money.

### Core Values

| Value | Description |
|-------|-------------|
| **Privacy-First** | Zero-knowledge processing. Data stays on the user's device. |
| **Transparency** | Clear explanations of calculations and affiliate relationships. |
| **Precision** | Forensic-level accuracy, not rough estimates. |
| **Simplicity** | Complex financial math, presented simply. |
| **Trust** | Trustworthy design that inspires confidence in sensitive financial decisions. |

### Competitive Positioning
Unlike competitors that require manual spending estimates, SmartCard CA analyzes actual transaction history to provide accurate, personalized recommendations.

---

## Brand Personality

### Personality Traits

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Trustworthy ●━━━━━━━━━━━━━●○○○○○○○ Playful              │
│                                                             │
│   Expert      ●━━━━━━━━━━●○○○○○○○○○○ Casual               │
│                                                             │
│   Modern      ●━━━━━━━━━━━━━━●○○○○○○ Traditional          │
│                                                             │
│   Warm        ○○○○●━━━━━━━━━━━━━━━━━● Clinical            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Brand Archetype
**The Sage** — SmartCard CA positions itself as a trusted advisor that empowers users with knowledge and tools to make better financial decisions.

---

## Logo & Wordmark

### Primary Logo
The SmartCard CA logo combines a stylized credit card icon with a maple leaf motif, representing Canadian financial optimization.

```
┌────────────────────────────────────────┐
│                                        │
│   ╔══╗  SmartCard CA                  │
│   ╚══╝                                 │
│                                        │
└────────────────────────────────────────┘
```

### Logo Variations

| Variation | Usage |
|-----------|-------|
| **Full Logo** | Primary usage on light backgrounds |
| **Reversed** | Use on dark/hero sections |
| **Icon Only** | Favicons, app icons, compact spaces |
| **Wordmark Only** | Text-heavy contexts |

### Clear Space
Maintain clear space equal to the height of the "S" in SmartCard around all sides of the logo.

### Minimum Sizes
- **Digital:** 120px wide (full logo), 32px (icon only)
- **Print:** 1 inch wide (full logo), 0.25 inch (icon only)

---

## Color System

### Primary Palette

#### Deep Slate (Primary)
The foundation of trust and professionalism.

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--primary` | `222 47% 15%` | `#141D2E` | Primary buttons, headers, hero backgrounds |
| `--primary-foreground` | `210 40% 98%` | `#F8FAFC` | Text on primary |

#### Emerald (Accent)
Represents money, growth, and positive financial outcomes.

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--accent` | `158 64% 42%` | `#27AE7A` | CTAs, highlights, positive metrics |
| `--accent-foreground` | `0 0% 100%` | `#FFFFFF` | Text on accent |
| `--success` | `158 64% 42%` | `#27AE7A` | Success states, savings callouts |

### Secondary Palette

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--secondary` | `220 14% 96%` | `#F3F4F6` | Backgrounds, cards |
| `--secondary-foreground` | `222 47% 11%` | `#1A1F2E` | Text on secondary |
| `--muted` | `220 14% 96%` | `#F3F4F6` | Disabled states, subtle backgrounds |
| `--muted-foreground` | `220 9% 46%` | `#6B7280` | Secondary text, placeholders |

### Semantic Colors

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--destructive` | `0 84% 60%` | `#EF4444` | Errors, destructive actions |
| `--warning` | `38 92% 50%` | `#F59E0B` | Warnings, attention needed |
| `--success` | `158 64% 42%` | `#27AE7A` | Success, positive outcomes |

### Background & Surface

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--background` | `220 20% 97%` | `#F7F8FA` | Page background |
| `--foreground` | `222 47% 11%` | `#1A1F2E` | Primary text |
| `--card` | `0 0% 100%` | `#FFFFFF` | Card surfaces |
| `--card-foreground` | `222 47% 11%` | `#1A1F2E` | Card text |
| `--border` | `220 13% 91%` | `#E5E7EB` | Borders, dividers |

### Gradients

```css
/* Hero Gradient - Deep to lighter slate */
--gradient-hero: linear-gradient(135deg, 
  hsl(222, 47%, 11%) 0%, 
  hsl(222, 47%, 20%) 50%, 
  hsl(200, 40%, 25%) 100%
);

/* Card Gradient - Subtle depth */
--gradient-card: linear-gradient(180deg, 
  hsl(0, 0%, 100%) 0%, 
  hsl(220, 20%, 98%) 100%
);

/* Accent Gradient - Money green */
--gradient-accent: linear-gradient(135deg, 
  hsl(158, 64%, 42%) 0%, 
  hsl(170, 60%, 45%) 100%
);

/* Glass Effect */
--gradient-glass: linear-gradient(135deg, 
  rgba(255,255,255,0.9) 0%, 
  rgba(255,255,255,0.7) 100%
);
```

### Dark Mode

Dark mode inverts the hierarchy while maintaining brand recognition:

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `--background` | `220 20% 97%` | `222 47% 8%` |
| `--card` | `0 0% 100%` | `222 47% 11%` |
| `--foreground` | `222 47% 11%` | `210 40% 98%` |
| `--accent` | `158 64% 42%` | `158 64% 52%` |

---

## Typography

### Font Family

**Primary Font:** Plus Jakarta Sans

```css
font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
```

Plus Jakarta Sans was chosen for its:
- Modern, geometric feel
- Excellent legibility at all sizes
- Professional yet approachable character
- Strong support for numbers (crucial for financial data)

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| **Display** | 48-72px | 800 | 1.1 | Hero headlines |
| **H1** | 36-48px | 700 | 1.2 | Page titles |
| **H2** | 24-30px | 700 | 1.3 | Section headers |
| **H3** | 20-24px | 600 | 1.4 | Card titles |
| **H4** | 16-18px | 600 | 1.4 | Subsections |
| **Body Large** | 18px | 400 | 1.6 | Lead paragraphs |
| **Body** | 16px | 400 | 1.6 | Default text |
| **Body Small** | 14px | 400 | 1.5 | Secondary info |
| **Caption** | 12px | 500 | 1.4 | Labels, metadata |

### Text Styles

```css
/* Headlines */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  letter-spacing: -0.02em; /* tracking-tight */
}

/* Numbers & Data */
.financial-data {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}

/* Emphasis */
.gradient-text {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## Spacing & Layout

### Spacing Scale

Based on a 4px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing, icon gaps |
| `space-2` | 8px | Compact elements |
| `space-3` | 12px | Default element spacing |
| `space-4` | 16px | Card padding, form gaps |
| `space-5` | 20px | Section gaps |
| `space-6` | 24px | Large gaps |
| `space-8` | 32px | Section padding |
| `space-10` | 40px | Major sections |
| `space-12` | 48px | Hero spacing |
| `space-16` | 64px | Page sections |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | 12px | Default (cards, buttons) |
| `radius-sm` | 8px | Small elements |
| `radius-md` | 10px | Medium elements |
| `radius-lg` | 12px | Cards, modals |
| `radius-xl` | 16px | Large cards |
| `radius-full` | 9999px | Pills, avatars |

### Container

```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

### Grid System

- 12-column grid for complex layouts
- 4-column grid for card grids
- Single column for mobile (< 640px)

---

## Component Library

### Buttons

#### Primary Button
```jsx
<Button className="accent-gradient text-accent-foreground">
  Get Started
</Button>
```
- Background: Emerald gradient
- Text: White
- Border radius: 12px
- Padding: 12px 24px
- Hover: Slight scale (1.02) + shadow

#### Secondary Button
```jsx
<Button variant="outline">
  Learn More
</Button>
```
- Background: Transparent
- Border: 1px solid border
- Text: foreground
- Hover: Background muted

#### Ghost Button
```jsx
<Button variant="ghost">
  Cancel
</Button>
```
- Background: Transparent
- No border
- Hover: Subtle background

### Cards

#### Standard Card
```jsx
<Card className="shadow-card hover:shadow-card-hover transition-shadow">
  <CardContent>...</CardContent>
</Card>
```

#### Glass Card
```jsx
<div className="glass-card rounded-xl p-6">
  ...
</div>
```
- Background: card/80 with backdrop-blur
- Border: 1px white/20
- Shadow: shadow-card

### Form Elements

#### Input Fields
- Height: 44px
- Border: 1px solid border
- Border radius: 12px
- Focus: Ring with ring color
- Placeholder: muted-foreground

#### Dropdowns/Selects
- Same styling as inputs
- Chevron indicator
- Dropdown background: popover

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-card: 0 4px 24px -4px rgb(0 0 0 / 0.08);
--shadow-card-hover: 0 12px 32px -8px rgb(0 0 0 / 0.15);
```

---

## Iconography

### Icon Library
**Lucide React** — Clean, consistent line icons

### Icon Sizes

| Size | Pixels | Usage |
|------|--------|-------|
| `sm` | 16px | Inline text, buttons |
| `md` | 20px | Default |
| `lg` | 24px | Feature icons |
| `xl` | 32px | Section icons |
| `2xl` | 48px | Hero illustrations |

### Icon Style Guidelines
- Stroke width: 2px (default)
- Rounded corners: Always
- Color: Inherit from parent (currentColor)
- Spacing: 8px from adjacent text

### Common Icons

| Icon | Usage |
|------|-------|
| `Shield` | Privacy/security |
| `CreditCard` | Credit card related |
| `TrendingUp` | Rewards/growth |
| `Upload` | File upload |
| `Check` | Success/verified |
| `AlertCircle` | Warning/info |
| `DollarSign` | Money/savings |
| `PieChart` | Analytics/breakdown |

---

## Motion & Animation

### Principles
1. **Purposeful** — Animation should guide attention and provide feedback
2. **Subtle** — Never distract from content
3. **Fast** — Respect user time; most animations < 300ms

### Timing Functions

```css
/* Standard ease */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Ease out (for entering elements) */
transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

/* Ease in (for exiting elements) */
transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
```

### Standard Durations

| Duration | Usage |
|----------|-------|
| `150ms` | Micro-interactions (hover states) |
| `200ms` | Button states, toggles |
| `300ms` | Card transitions, modals |
| `500ms` | Page transitions, reveals |

### Defined Animations

```css
/* Float - Gentle hover for hero elements */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Slide Up - Content reveals */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Fade In - Subtle appearances */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Scale In - Modal/card entrances */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Shimmer - Loading states */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Bounce Subtle - Attention elements */
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
```

### Animation Classes

```css
.animate-float      /* 6s infinite float */
.animate-pulse-slow /* 4s pulse */
.animate-slide-up   /* 0.5s slide up */
.animate-fade-in    /* 0.5s fade in */
.animate-scale-in   /* 0.3s scale in */
.animate-shimmer    /* 2s infinite shimmer */
```

---

## Photography & Imagery

### Style Guidelines

1. **Abstract Financial** — Geometric patterns suggesting data/analytics
2. **Canadian Context** — Subtle Canadian imagery when appropriate
3. **Clean & Minimal** — Uncluttered, modern aesthetic
4. **Privacy Metaphors** — Shields, locks, secure vaults

### Image Treatment
- Overlays: hero-gradient at 80% opacity
- Corners: Rounded (border-radius: 12px)
- Aspect ratios: 16:9 (hero), 1:1 (icons), 4:3 (cards)

### Illustration Style
- Line illustrations preferred
- Color: Emerald accent with slate details
- Simple, geometric forms
- Consistent stroke weight (2px)

---

## Voice & Tone

### Brand Voice

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Clear** | No jargon, plain language | "You could save $500/year" not "Optimize your ROI" |
| **Confident** | Expert but not arrogant | "We'll show you exactly..." |
| **Empowering** | User-focused | "Your data stays on your device" |
| **Honest** | Transparent about limitations | "We found some transactions we're not sure about" |

### Tone Variations

| Context | Tone |
|---------|------|
| **Hero/Marketing** | Bold, aspirational |
| **Instructions** | Helpful, encouraging |
| **Errors** | Calm, solution-focused |
| **Success** | Celebratory but not excessive |

### Writing Guidelines

1. **Lead with benefit** — "Save $500/year" before "Upload your statements"
2. **Use numbers** — Specific figures build trust
3. **Active voice** — "Upload your statement" not "Your statement should be uploaded"
4. **Second person** — "You" and "Your" create connection

### Key Phrases

| Do ✓ | Don't ✗ |
|------|---------|
| "Stop guessing" | "Optimize your spending" |
| "Find your perfect card" | "Leverage our algorithm" |
| "100% private" | "Data-secure solution" |
| "You're leaving money on the table" | "Unrealized reward potential" |

---

## Accessibility

### Color Contrast
All text meets WCAG 2.1 AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Interactive Elements
- Minimum touch target: 44x44px
- Focus states: Visible ring (ring color)
- Hover states: Clear visual change

### Screen Readers
- All images have alt text
- Form labels are properly associated
- ARIA labels on icon-only buttons
- Semantic HTML structure

### Motion
- Respect `prefers-reduced-motion`
- No auto-playing animations that can't be paused
- No flashing content

---

## Usage Examples

### Hero Section
```jsx
<section className="hero-gradient text-primary-foreground py-20">
  <h1 className="text-5xl font-extrabold tracking-tight">
    Stop Guessing.
    <span className="gradient-text"> Start Earning.</span>
  </h1>
  <p className="text-xl text-primary-foreground/80">
    Upload your statements. See exactly which card pays you the most.
  </p>
  <Button className="accent-gradient">
    Get Started — It's Free
  </Button>
</section>
```

### Results Card
```jsx
<Card className="shadow-card hover:shadow-card-hover transition-all">
  <CardHeader>
    <div className="flex items-center gap-3">
      <TrendingUp className="h-6 w-6 text-accent" />
      <CardTitle>You Could Earn $450 More</CardTitle>
    </div>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">
      Based on your $12,000 grocery spend...
    </p>
  </CardContent>
</Card>
```

### Privacy Badge
```jsx
<div className="glass-card flex items-center gap-2 px-4 py-2">
  <Shield className="h-4 w-4 text-accent" />
  <span className="text-sm font-medium">
    100% Private — Data never leaves your browser
  </span>
</div>
```

---

## File Structure Reference

```
src/
├── index.css              # Design tokens & base styles
├── App.css                # App-specific overrides
├── tailwind.config.ts     # Tailwind configuration
├── components/
│   └── ui/                # shadcn/ui components
└── lib/
    └── utils.ts           # cn() helper
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 2026 | Initial brand guidelines |

---

*For questions about brand usage, contact the design team.*
