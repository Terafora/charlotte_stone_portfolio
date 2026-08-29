# XMB redesign implementation note

## Retained

- Vinext/Next App Router structure and static export deployment.
- Markdown-backed work and writing collections in `content/`.
- Direct URLs, route metadata, long-form case studies, icons and responsive table rendering.
- Existing reusable parsing and content-detail components.

## Refactored

- The homepage is now a client-enhanced navigation surface fed by the existing content model.
- Global site chrome becomes a compact glass navigation bar on reading pages.
- Shared colours, motion, focus states and responsive behaviour live in a separate XMB visual layer.

## Replaced

- The colourful toothed sidebar, bottom ticker and oversized display typography.
- Homepage cards and CTA-led hero in favour of category and child-item navigation.
- Flat page backgrounds in favour of a lightweight CSS atmospheric wave system.

No content files or public routes were removed. The redesign remains progressively navigable through real links, and continuous movement stops when reduced motion is requested.
