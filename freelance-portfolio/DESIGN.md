---
name: Aarush Gupta — Freelance Portfolio
description: A working digital sculpture studio with editorial clarity.
colors:
  paper: "#f6f5f0"
  ink: "#242621"
  muted: "#686b62"
  orange: "#d8441a"
  line: "#d8d9d0"
  soft: "#eeeee6"
  contact: "#282c24"
  contact-accent: "#f57c50"
  button-orange: "#f27a4d"
  button-orange-hover: "#ff936c"
  button-orange-ink: "#232820"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(62px, 6.7vw, 96px)"
    fontWeight: 400
    lineHeight: 1.035
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(36px, 4.1vw, 58px)"
    fontWeight: 400
    lineHeight: 1.07
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "13px"
    lineHeight: 1.65
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "11px"
rounded:
  tag: "4px"
  button: "5px"
  artwork: "8px"
  project: "10px"
  filter: "20px"
  controls: "25px"
spacing:
  section-desktop: "112px"
  section-tablet: "80px"
  section-mobile: "64px"
  project-gap: "30px"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "17px 21px"
  button-dark-hover:
    backgroundColor: "{colors.orange}"
  button-orange:
    backgroundColor: "{colors.button-orange}"
    textColor: "{colors.button-orange-ink}"
    rounded: "{rounded.button}"
    padding: "18px 21px"
    width: "100%"
  button-orange-hover:
    backgroundColor: "{colors.button-orange-hover}"
  filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.filter}"
    padding: "8px 13px"
---

# Design System: Aarush Gupta — Freelance Portfolio

## Overview

**Creative North Star: "The Working Sculpture Studio"**

Playful engineering presented with editorial clarity. Ivory paper, near-black Archivo typography, signal orange lacquer, and polished chrome create a studio atmosphere with generous open space and fine dividing rules.

Large regular-weight statements share the page with small practical labels. Material depth belongs to the sculpture, screenshot objects, and typographic artwork; navigation, lists, and forms stay visually quiet.

**Key Characteristics:**
- Oversized Archivo statements and compact supporting text.
- Ivory and ink surfaces with deliberate orange accents.
- Real project screenshots, a live material study, and fine rules.

## Colors

### Primary

Signal Orange marks the hero emphasis, brand dot, icons, process numbers, focus outlines, and dark-button hover. The sculpture uses a separate lit lacquer material; it is not a flat UI swatch. Warm contact accents and the lighter orange submit button retain contrast on the dark closing section.

### Neutral

Paper is the main canvas; Ink supplies headings and primary controls. Muted supports prose and metadata. Line separates sections; Soft gives the service area a tonal surface. Contact uses its own deep olive-black background. Project previews retain their individual sage and blue-gray backdrops.

## Typography

Archivo is served locally from regular and bold TTF assets, with Arial and sans-serif fallbacks. Display and section headings are regular weight; the wordmark and oversized decorative initial are bold. There is no separate serif or monospace face.

The frontmatter describes the desktop hero, base section heading, project title, project body, and compact label roles. Supporting prose varies from 13–15px; metadata runs 9–11px. Heading sizes have section-specific overrides. The hero becomes 75px at 1150px, 64px at 850px, and `clamp(49px, 12.5vw, 76px)` at 650px. Mobile form controls increase to 16px.

## Layout

The centered shell caps at 1440px, with 56px side gutters by default, 36px at 1150px, and 20px at 650px. Desktop uses an asymmetric hero, two-column work/services/about/contact layouts, and a three-step process row. Major content section spacing is recorded above; services and contact have independent padding.

At 650px the major grids become single-column, the sculpture follows the hero text, and navigation becomes an expandable menu. The process becomes numbered rows. The form’s name/email fields are two-column on desktop, one-column between 651px and 850px, and two-column again within the full-width mobile form. At 1500px the hero and sculpture grow taller. No fixed header is implemented.

## Elevation & Depth

Depth is selective: browser previews and the tilted orange typographic artwork cast soft shadows. The sculpture combines physical lighting, reflective material, thin orbit outlines, and a blurred ground shadow. Ordinary sections, filter controls, and service rows use tone and rules rather than card shadows. The mobile navigation has a small separating shadow. Exact shadows and motion timings live in the sidecar.

## Shapes

Buttons have modest corners; tags are slightly tighter. Project imagery and artwork use broader corners. Filter pills, circular project arrows, material swatches, and the capsule sculpture controls are the rounded exceptions. Fine one-pixel borders and straight section rules define the overall structure. Angled preview frames and the artwork introduce restrained asymmetry.

## Components

### Buttons and links

The primary work CTA is Ink on Paper’s inverse, shifts to Orange on hover, and lifts 3px. Its diagonal arrow shifts 2px up and right. The contact submit button fills its column and uses the warmer orange variant. Text links remain unboxed and move their arrows horizontally. Interactive elements share a 2px Orange focus outline with a 5px offset.

### Navigation

A lowercase bold wordmark ends with an orange dot. Desktop links use a growing underline; the contact link is a compact filled button. Mobile uses a Menu/Close toggle with `aria-expanded`; selecting a link closes it, and Escape closes it and restores toggle focus.

### Filters and tags

Project filters use `aria-pressed`, transparent resting surfaces, Soft hover surfaces, and an Ink selected pill. Project tags are compact outlined labels. CrackAI is the AI Resources project, displayed as a wide two-column feature with a real screenshot and platform description; the AI & tools filter isolates it.

### Project previews

Real Tomas, EchoFoil, and CrackAI screenshots appear in angled browser frames on project-specific tinted surfaces. Hover straightens and lifts the frame; a circular open arrow changes to Ink. Titles, repository links, descriptions, and tags sit below the image rather than inside raised cards.

### Service accordion

Four icon-led rows use full-width buttons, fine separators, plus/minus indicators, and `aria-expanded`/`aria-controls`. The first service starts open; one panel or none can be expanded. Details sit indented beneath the title, with plain slash-separated capability labels.

### Contact fields

Persistent labels sit above transparent fields with bottom borders on the dark surface. The textarea resizes vertically within bounds. Native required/type/length constraints validate the brief. Submission prepares a `mailto:` draft and displays a status message; copy-email has success and failure text. There is no server submission or invented success confirmation.

### Sculpture and motion

The signature object is a Three.js torus knot with a floating chrome bead, orange/chrome material controls, pointer-responsive orientation, and a pause/play control. Animation pauses for reduced-motion preferences and rendering skips when hidden or outside the viewport. A CSS interlocking-ring fallback appears if WebGL fails; unavailable controls are then hidden. CSS reduced-motion handling suppresses transition and entrance motion. Hero copy enters with a small vertical move and blur; hover motion elsewhere remains local to the affected object.


### Project payments
A soft-surface section follows the process and precedes contact. Its open two-column grid pairs a 42px heading with payment controls; mobile stacks at 650px. The pending button explicitly says online payments are coming soon and is natively disabled, with an email action for requesting instructions. A validated HTTPS destination in `lib/payments.ts` activates the external provider link. No amount, payment provider, or completed transaction is invented. Navigation includes Payments.

## Do's and Don'ts

### Do:

- **Do** use Archivo with regular-weight display type and tight tracking.
- **Do** retain visible focus outlines, semantic control states, and reduced-motion behavior.
- **Do** show real project evidence and keep unavailable previews explicitly identified.
- **Do** use spacious section layouts and fine rules to organize content.

### Don't:

- **Don’t** turn every section into a raised card.
- **Don’t** replace the restrained material palette with unrelated decorative gradients.
- **Don’t** imply the contact form sends a message directly; it opens an email draft.
