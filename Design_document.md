# Website Design Document

## Project Name
Interactive Solar System Exploration Website

## Visual Style
Modern

## Mood
Friendly, welcoming, educational

## Industry
Space education / science visualization / interactive exploration

## Target Audience
- Students (12–25)
- Science enthusiasts
- Teachers and educators
- Designers and developers interested in modern web design
- General users curious about astronomy

---

# 1. Color Palette

The design combines **dark cosmic backgrounds** with **bright friendly accent colors** to create strong contrast and an immersive visual experience.

## Primary Colors

| Color Name | Hex | Usage |
|------------|-----|------|
| Deep Space | #0B1020 | Main background |
| Cosmic Black | #05070D | Hero background |
| Midnight Blue | #141B2D | Section background |
| Starlight White | #FFFFFF | Primary text |

---

## Secondary Colors

| Color Name | Hex | Usage |
|------------|-----|------|
| Soft Gray | #C8CEDA | Secondary text |
| Nebula Gray | #8B92A3 | Labels and captions |
| Dark Panel | #1E263A | Cards and UI containers |

---

## Accent Colors

| Color | Hex | Usage |
|------|-----|------|
| Solar Orange | #FF7A1A | Primary call-to-action |
| Planet Blue | #4EDFFF | Links and highlights |
| Mars Red | #FF4D4D | Buttons and alerts |
| Saturn Gold | #D7A856 | Highlight elements |

---

## Gradient Examples

Hero background gradient

```

#05070D → #0B1020

```

CTA gradient

```

#FF7A1A → #FFB347

```

---

# 2. Typography

Typography should feel **modern, futuristic, and readable**.

## Primary Heading Font

Recommended font: **Orbitron**

Alternative: **Exo 2**

Usage:
- Hero titles
- Planet names
- Section headings

| Element | Size |
|--------|------|
| Hero Title | 64px |
| Section Title | 42px |
| Subheading | 28px |

Style

```

Weight: 700
Letter spacing: 2px
Uppercase

```

---

## Secondary Font

Recommended font: **Poppins**

Alternative: **Inter**

Usage:
- Body text
- Navigation
- UI labels
- Buttons

| Element | Size |
|--------|------|
| Body text | 16px |
| Small text | 14px |
| Captions | 12px |

Style

```

Weight: 400–500
Line height: 1.6
Color: #C8CEDA

```

---

# 3. Layout Structure

The website uses a **full-screen immersive layout** with large visual elements.

## Layout Type

```

Width: 100%
Max content width: 1400px

```

---

## Grid System

12-column responsive grid

```

Columns: 12
Gutter: 24px
Margins: 80px (desktop)

```

Example

```

|1|2|3|4|5|6|7|8|9|10|11|12|

```

---

## Section Height

Hero sections

```

Height: 100vh

```

Content sections

```

Padding top: 120px
Padding bottom: 120px

```

---

## Layout Zones

Typical page structure

```

Navigation
Hero Section
Main Content
Interactive Elements
Footer

```

---

# 4. Component Specifications

---

# Navigation Bar

## Dimensions

Desktop

```

Height: 80px
Width: 100%
Padding: 0 80px

```

Tablet

```

Height: 72px
Padding: 0 40px

```

Mobile

```

Height: 64px
Padding: 0 20px

```

---

## Layout

```

[Logo]      [Navigation Links]      [Menu Icon]

```

---

## Colors

Background

```

Default: transparent
Scrolled: #0B1020

```

Text

```

Primary: #FFFFFF
Secondary: #C8CEDA
Active link: #4EDFFF

```

---

## Typography

```

Font: Poppins
Size: 16px
Weight: 500
Letter spacing: 1px

```

---

## Hover State

```

Color: #4EDFFF
Underline animation
Transition: 0.3s

```

---

## Responsive Behavior

Desktop

```

Horizontal navigation

```

Mobile

```

Hamburger menu
Slide-out navigation panel

```

---

# Hero Section

## Dimensions

```

Height: 100vh
Width: 100%
Padding: 120px top
Padding: 80px sides
Max content width: 1200px

```

---

## Layout

```

Hero Title
Short description
CTA button
Large planet background

```

Text alignment

```

Center

```

---

## Colors

```

Background gradient: #05070D → #0B1020
Title: #FFFFFF
Description: #C8CEDA
Accent highlight: #FF7A1A

```

---

## Typography

Hero Title

```

Font: Orbitron
Weight: 700
Size: 64px
Letter spacing: 2px

```

Hero Subtitle

```

Font: Poppins
Size: 18px
Line height: 1.6

```

---

## Interaction

- Subtle parallax background
- Animated CTA button
- Smooth scroll indicator

---

## Responsive

Tablet

```

Title: 48px
Padding: 80px

```

Mobile

```

Title: 32px
Stacked layout
Scaled visuals

```

---

# Call-to-Action Buttons

## Dimensions

Primary button

```

Height: 48px
Padding: 12px 28px
Border radius: 30px

```

Secondary button

```

Height: 42px
Padding: 10px 24px

```

---

## Colors

Primary

```

Background: #FF7A1A
Text: #FFFFFF

```

Secondary

```

Background: transparent
Border: 2px solid #4EDFFF
Text: #4EDFFF

```

---

## Typography

```

Font: Poppins
Size: 16px
Weight: 500

```

Example labels

```

Explore Now
Learn More
View Planet

```

---

## Hover State

Primary

```

Background: #FF4D4D
Box shadow: 0 0 15px rgba(255,77,77,0.4)
Transform: scale(1.05)

```

Secondary

```

Background: #4EDFFF
Text color: #0B1020

```

---

## Responsive

Mobile

```

Full width
Height: 50px
Font size: 18px

```

---

# Cards / Content Blocks

## Dimensions

Standard card

```

Width: 300px
Padding: 24px
Border radius: 16px

```

Large card

```

Width: 420px
Padding: 32px

```

---

## Colors

```

Background: #1E263A
Border: rgba(255,255,255,0.1)
Text primary: #FFFFFF
Text secondary: #C8CEDA

```

---

## Typography

Card title

```

Font: Poppins
Size: 20px
Weight: 600

```

Card body

```

Font: Poppins
Size: 14px

```

---

## Hover State

```

Transform: translateY(-8px)
Shadow: 0 10px 30px rgba(0,0,0,0.3)

```

---

## Responsive

Desktop

```

3-column grid

```

Tablet

```

2-column grid

```

Mobile

```

Single column
Full width

```

---

# Forms

## Input Dimensions

```

Height: 48px
Width: 100%
Padding: 12px
Border radius: 10px

```

Textarea

```

Height: 120px

```

---

## Colors

```

Background: #1E263A
Border: rgba(255,255,255,0.1)
Text: #FFFFFF
Placeholder: #8B92A3

```

---

## Typography

```

Font: Poppins
Size: 16px

```

---

## Focus State

```

Border color: #4EDFFF
Glow: 0 0 10px rgba(78,223,255,0.3)

```

---

## Responsive

```

Full width fields
Vertical layout
Large touch targets

```

---

# Footer

## Dimensions

```

Padding top: 80px
Padding bottom: 60px
Max width: 1400px

```

---

## Layout

```

Logo
Navigation links
Social icons
Copyright

```

Grid

```

Desktop: 3 columns
Tablet: 2 columns
Mobile: 1 column

```

---

## Colors

```

Background: #05070D
Primary text: #FFFFFF
Secondary text: #8B92A3
Divider: rgba(255,255,255,0.1)

```

---

## Typography

Footer headings

```

Font: Poppins
Size: 16px
Weight: 600

```

Footer links

```

Font: Poppins
Size: 14px

```

---

## Hover State

```

Color: #4EDFFF
Transition: 0.2s

```

---

# Responsive Design Overview

| Device | Layout |
|------|------|
Desktop | 12 column grid |
Tablet | 8 column grid |
Mobile | Single column |

Mobile optimizations

- Hamburger navigation
- Full-width buttons
- Stacked content
- Reduced spacing

---

# Spacing Guidelines

Base unit

```

8px

```

Spacing scale

| Size | Value |
|-----|------|
XS | 8px |
SM | 16px |
MD | 24px |
LG | 40px |
XL | 64px |
XXL | 96px |

---

# Design Philosophy

The interface should feel like:

**A friendly futuristic control panel for exploring the solar system.**

Core principles

- Modern minimal interface
- Large cinematic visuals
- Clear readable typography
- Smooth animations
- Intuitive user interactions

The user experience should make visitors feel like they are **exploring space in an immersive yet approachable environment.**
```
