# Wedding Invitation — 

A premium, mobile-first **digital Muslim wedding invitation**.
Pure frontend: React + Vite + CSS. **No backend, no database, no API, no auth.**

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # preview the production build
```

## Add the background music

Drop your audio file at:

```
public/audio/wedding-music.mp3
```

The player starts only after the guest taps **Open Invitation** (browsers block
autoplay before a user gesture). If the file is missing the site still works —
the music button simply stays in the paused state.

## Edit the wedding details

Everything is centralised in [`src/data/weddingData.js`](src/data/weddingData.js):
names, qualifications, parents, the Arabic quote, event list, Valima, venue,
map link, RSVP replies and the creator handle.

## Structure

```
src/
├── components/
│   ├── OpeningScreen.jsx   # cover + 3D envelope opening cinematic
│   ├── GroomSection.jsx    # THE GROOM
│   ├── QuoteSection.jsx    # Arabic verse + translation
│   ├── EventsSection.jsx   # event cards with date/time/venue
│   ├── VenueSection.jsx    # venue + view location
│   ├── ValimaSection.jsx   # VALIMA DINNER feature card
│   ├── RSVPSection.jsx     # three reaction buttons (state only)
│   ├── ThankYouSection.jsx # envelope + thank you note
│   └── MusicButton.jsx     # floating audio control
├── data/weddingData.js
├── App.jsx                 # 3D scene layers + parallax + audio state
├── App.css                 # design tokens, sections, cards, buttons
└── main.jsx
```

## How the 3D / motion works

* **Layered depth** — `App.jsx` renders three `position: fixed` planes:
  `--far` (atmosphere + blossoms, `translateZ(-240px)`, blurred),
  `--mid` (floral plane, `translateZ(-120px)`), and the sharp content plane,
  plus a `--near` blossom plane at `translateZ(60px)`.
* **Camera** — scroll position is smoothed in `requestAnimationFrame` and written
  to a `--sy` CSS variable; each plane offsets by a different factor, producing
  real parallax dolly movement. A slow `cameraDrift` keyframe adds ambient camera life.
* **Opening cinematic** — tapping **Open Invitation** runs a 2.15 s CSS-3D sequence:
  the envelope flies in from depth → the wax seal breaks → the flap rotates open
  on `rotateX(-172deg)` → the card rises out of the pocket → everything rushes
  toward the camera, and the invitation settles back with a depth blur.
* **Scroll reveal** — `IntersectionObserver` adds `.visible`; sections animate
  from `translateY(46px) rotateX(3deg) scale(.985)` with staggered delays.
* **Reduced motion** — `prefers-reduced-motion: reduce` disables camera drift,
  parallax, petal/blossom loops and the envelope cinematic while keeping all
  content visible and usable.

## Accessibility

Keyboard-operable buttons with visible focus rings, `aria-pressed` / `aria-label`
on the audio toggle, `role="status" aria-live="polite"` for RSVP feedback,
`target="_blank" rel="noopener noreferrer"` on map links, semantic landmarks,
and decorative SVG marked `aria-hidden`.

## Notes

* Location buttons are plain external links to Google Maps — no Maps API or key.
* RSVP is React state only; nothing is stored or transmitted.
* Typography: Allura (script), Playfair Display (serif), Amiri (Arabic),
  Poppins (body), loaded from Google Fonts.
