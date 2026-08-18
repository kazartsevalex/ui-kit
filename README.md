# UI Kit

This repository is a small React component and motion playground with Storybook stories for each exported component.

## Components

### Counter

An animated numeric counter that starts counting when it enters the viewport. It is intended for stats, metrics, or highlight numbers that should reveal with scroll-based motion.

### LiquidDotsCanvas

A full-canvas background effect made from softly colored floating dots with lightweight connecting lines. It works as a decorative animated backdrop rather than a content-bearing component.

### LogoInteractiveCanvas

A particle-based logo renderer that converts an embedded bitmap into dots and short line connections. The particles react to pointer movement and then ease back into the original logo shape.

### MatrixCanvas

A canvas background inspired by Matrix-style falling glyph trails. It renders columns of animated characters with fading green trails on a dark surface.

### Slider

A gallery-style slider built from `Gallery`, `Slide`, and `SlideImage` primitives. It is set up for image-based presentation and can be adapted for hero banners, portfolios, or featured content carousels.

## Notes

Storybook is the primary browsing surface for this package, and each component has a colocated story under `src/components`.
