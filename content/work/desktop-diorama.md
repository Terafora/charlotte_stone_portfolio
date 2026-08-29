---
title: Desktop Diorama
summary: An experimental spatial desktop interface that streams real Windows applications onto movable 3D panels inside a head-tracked Godot scene.
eyebrow: Technical case study · Spatial computing
date: 2026-08-29
accent: coral
tags: Godot, C++, Windows, Computer vision
status: Technical prototype · MVP hardening
featured: false
order: 3
draft: false
---
*Reimagining the desktop as a spatial, tactile and more human interface—without losing access to real applications.*

## At a glance

| | |
|---|---|
| **Product** | A spatial desktop interface that places live Windows applications on interactive 3D panels |
| **My role** | Product direction, interaction design, Godot development, capture research, Python prototyping and native integration |
| **Platform** | Windows desktop, presented through Godot |
| **Current stage** | Technical prototype moving towards MVP hardening |
| **Core technologies** | Godot, GDScript, Python, OpenCV, UDP, C++ and Windows Graphics Capture |
| **Core interaction** | Left click interacts with applications; right-click and scroll manipulate panels in 3D |
| **Central proof** | Real windows can be streamed, resized and clicked through with source-like video performance |

## Overview

Desktop Diorama is an experimental spatial desktop interface built in Godot. The project explores a simple question: what if a computer desktop did not have to feel flat, clinical, and trapped behind layers of conventional windows?

Instead of presenting applications as overlapping rectangles on a 2D plane, Desktop Diorama places real desktop windows onto movable 3D panels inside a small diorama-like scene. Users can move, resize, and interact with live application windows as if they were physical objects in a miniature workspace. A webcam-based head tracking system adds parallax, allowing the user to shift their viewpoint and create the feeling of looking into a small spatial world rather than staring at a fixed screen.

The project began as a small Godot experiment around depth and desktop presentation, but quickly evolved into a deeper investigation into how our everyday relationship with computers could become more tactile, personal, and emotionally resonant.

At its current stage, Desktop Diorama has progressed beyond a visual mock-up. The prototype can stream real Windows application content into Godot, resize source windows through the 3D interface, and pass click input from the Godot panel back into the real application by interpolating panel coordinates. Video playback now streams through the panel at the same frame rate as the source window, with no visible delay in testing.

This makes the project less a speculative visual concept and more a technically viable foundation for a new kind of spatial desktop shell.

---

## The Problem

The modern desktop metaphor has barely changed in decades. We still largely work with flat windows, layered panels, taskbars, and invisible stacks of context. While this model is efficient, it can also feel impersonal and disembodied. The desktop often becomes a cluttered surface rather than a meaningful environment.

I wanted to explore whether a desktop could feel more like a place.

The problem was not simply aesthetic. I was interested in whether spatiality could make desktop use feel:

* more tactile;
* more legible;
* more personal;
* more playful;
* less mentally flat;
* and more connected to the user’s sense of presence.

At the same time, I wanted to avoid building something that was purely decorative. A beautiful desktop environment that cannot run or interact with real applications would be a toy, not a tool. The key risk was therefore technical: could real desktop windows be brought into a 3D Godot environment and remain usable?

That question shaped the entire product lifecycle.

---

## Philosophy and Inspiration

Desktop Diorama sits within a broader personal design philosophy: technology should feel less disposable, less sterile, and less hostile to the emotional lives of its users.

A strong influence was the idea of treating computers not simply as productivity machines, but as lived-in objects. I have often been drawn to older hardware, small screens, portable devices, and interfaces that feel specific rather than generic. There is a charm in systems that make constraints visible and meaningful. The project is also connected to my interest in extending the useful life of older or lower-spec technology, inspired by ideas similar to Gunpei Yokoi’s “lateral thinking with withered technology”: using mature, accessible technology imaginatively rather than chasing maximum specification.

Visually and conceptually, the project draws from:

* the Nintendo 3DS “window into a box” feeling;
* dioramas and miniature scenes;
* spatial desktop experiments;
* cosy/ambient software;
* Frutiger Aero-era tactility;
* physical desk objects and small personal displays;
* and the desire to make digital spaces feel less dead.

The goal is not to replace productivity with whimsy. It is to find a way for practical computing to have more atmosphere, depth, and human warmth.

---

## Initial Product Hypothesis

The earliest version of the idea was deliberately modest:

> Could Godot create a convincing depth effect for desktop-like windows?

The first goal was not to build a full desktop replacement. It was to answer whether a spatial window interface could feel good at all.

The early prototype focused on fake panels inside a Godot scene. These panels behaved like simplified windows: they could be moved, resized, selected, and positioned in depth. The initial interaction model separated ordinary application interaction from spatial manipulation:

* left click would eventually be reserved for interacting with application content;
* right-click hold would manipulate the panel spatially;
* scroll while holding would move the panel forward or backward in depth;
* resize handles would allow the panel to change shape;
* camera movement would create the feeling of looking around a small scene.

This separation became an important design decision. Rather than recreating standard OS titlebars, close buttons, minimise buttons, and window chrome, the project moved toward borderless, free-flowing panels. The real application should remain responsible for its own internal controls, while the diorama shell should manage spatial placement.

---

## Product Development Process

### Phase 1: Building the 3D Panel System

The first major phase was building a flexible window-panel object in Godot.

Each panel was constructed from:

* a frame mesh;
* a content mesh;
* a collision shape for mouse interaction;
* corner resize handles;
* and a viewport/material pipeline for displaying content.

The prototype supported multiple independent panels in a 3D scene. Each panel could be selected, dragged, resized, and moved in depth. Early bugs revealed important architectural details, such as the need to duplicate mesh and collision resources per instance. Without that, resizing one panel could accidentally affect all panels because the underlying Godot resources were shared.

The panel system eventually gained:

* independent selection;
* right-click dragging;
* corner-based resizing;
* scroll-wheel depth adjustment;
* hidden resize handles that appear during manipulation;
* optional focus-on-click;
* optional snap-to-grid;
* optional auto-bring-forward;
* and layout save/restore using stable window IDs.

This phase established the first core principle of the project: windows should behave like spatial objects, not just textures on a flat UI.

---

### Phase 2: Camera Modes and Head Tracking

The next question was whether the diorama effect could feel convincing.

At first, the camera was moved using mouse position as a debug input. This created a rough parallax effect, but it also caused conflict when moving windows: dragging a panel also moved the camera. The camera system was therefore refactored into clear modes:

* Static;
* Mouse Debug;
* Head Input.

This made the system easier to reason about and prepared it for real head tracking.

A Python/OpenCV sidecar was then introduced to detect the user’s face through a webcam and send normalised `x` and `y` values to Godot over UDP. Godot interpreted these values as camera offsets. This confirmed the core illusion: moving the user’s head could shift the camera view inside the diorama.

The system was then extended to simulate depth. By tracking the apparent size of the user’s face box, the Python tracker estimated forward/back movement. This produced a `z` value, allowing the Godot camera to move in 3D rather than only on a 2D plane.

Important refinements included:

* calibration with a keyboard shortcut;
* smoothing to reduce jitter;
* a deadzone to ignore tiny accidental movements;
* holding the last known head position when tracking is lost;
* and decoupling the camera from direct mouse movement.

This phase proved the emotional core of the project. The desktop could begin to feel like a small place the user was peering into, rather than a flat arrangement of windows.

---

### Phase 3: External Window Capture Experiments

Once the spatial panel and head tracking systems worked, the next major risk was real window content.

It would have been tempting to start building visual polish: fields, skies, decorative frames, scenes, particles, or themes. Instead, the project deliberately shifted toward the largest remaining technical uncertainty:

> Can real Windows application content be displayed inside a Godot panel?

The first capture spike used Python to capture a screen region around a target window and write frames to an image file that Godot could poll and display. This proved that external pixels could enter Godot and be applied to a 3D panel, but it also revealed a major flaw: if another window covered the target window, the capture showed the covering pixels instead.

This meant the first approach was not true window capture. It was screen-region capture.

The next spike used Win32 `PrintWindow` to capture a specific window handle. This was a significant improvement. It allowed normal application windows, such as Notepad, Calculator, File Explorer, and static browser windows, to remain visible in Godot even when covered by another window.

However, testing with video-heavy content exposed limitations. Browser video and VLC playback could continue in the real application, but the captured feed would freeze or blur once the source window was occluded. This showed that `PrintWindow` was useful as a baseline or fallback, but not sufficient for a robust spatial desktop.

The project then moved to Windows Graphics Capture. A Python package was used for rapid prototyping, again writing frames through a temporary file bridge so that Godot did not need to change dramatically. This improved the capture model, but the file bridge remained a bottleneck: encoding images, writing them to disk, updating a manifest, and reloading them in Godot limited performance and caused occasional file locking.

These spikes were valuable because each one answered a specific question:

* screen-region capture proved external pixels could be displayed;
* PrintWindow proved specific occluded windows could be captured in many normal cases;
* Windows Graphics Capture pointed toward the more serious long-term capture architecture.

The project’s approach throughout was risk-first: use the simplest method to answer the next unknown, then replace it when its limits become clear.

---

### Phase 4: Moving from Python Prototype to C++ Streaming

The most recent development moved beyond the earlier Python bridge and into a C++-based streaming approach.

This was a major technical step. The earlier Python file-based approach was useful for validating the concept, but it was not suitable for a responsive desktop interface. The C++ work addressed the core limitations by allowing real window/video content to stream through at the same frame rate as the source window, with no visible delay in testing.

This changed the status of the project dramatically.

The prototype now supports:

* real window content streaming into the Godot panel;
* video playback at source-like frame rate;
* resizing panels in a way that affects the actual source window/content rather than merely stretching the displayed texture;
* and click-through interaction by interpolating coordinates on the 3D panel and passing them back to the real window.

This means the project has passed its most important viability threshold. It is no longer only a visual experiment or a fake desktop mock-up. The core loop now works:

1. capture a real application window;
2. display it on a 3D panel;
3. move and resize that panel spatially;
4. update the actual window content accordingly;
5. click through the panel to interact with the real app;
6. combine the result with head-tracked camera movement.

That is the central product claim of Desktop Diorama.

---

## Design Decisions

### 1. Risk-first development

The project deliberately prioritised technical feasibility over visual polish.

Rather than spending early time on detailed scenery, themes, or decorative UI, development focused on the questions that could kill the project:

* Can panels behave spatially?
* Can camera movement feel good?
* Can real window content be captured?
* Can covered windows still work?
* Can video stream acceptably?
* Can users interact with the real window through the panel?
* Can resizing affect the source content rather than merely stretching the presentation?

This avoided the classic product trap of polishing a prototype before proving that the central mechanism works.

---

### 2. Separation of spatial manipulation and app interaction

A core UX decision was to separate panel manipulation from application interaction.

The intended model is:

* left click: interact with the app/window content;
* right-click hold: move or resize the spatial panel;
* scroll while manipulating: adjust depth.

This keeps the panel from fighting the application. It also avoids recreating a conventional titlebar-heavy desktop inside Godot.

The diorama is not trying to become a fake operating system. It is trying to become a spatial layer around real applications.

---

### 3. Borderless, free-flowing panels

Early versions included more obvious window controls, but the direction shifted away from conventional minimise/close/fullscreen buttons in the diorama shell.

The reasoning was simple: if the content is a real application, then the application already has its own controls. The diorama’s responsibility is spatial placement, not duplicating the operating system’s entire window management model.

This also supports the project’s emotional goal. The panels should feel like objects in a scene, not like standard windows with extra decoration.

---

### 4. External helper architecture

The project uses Godot for spatial presentation and interaction, while external/native code handles OS-level window capture and input.

This separation is pragmatic. Godot is strong at real-time 3D scenes, materials, camera movement, and interaction logic. Windows capture and window input forwarding are platform-specific and better handled closer to the OS.

The architecture therefore evolved toward:

* Godot as the spatial interface layer;
* native/C++ helper code as the window capture and input bridge;
* webcam/head tracking as a separate input system;
* and a later goal of making these pieces more robust and packaged.

---

## Current State

Desktop Diorama currently has a functioning technical core.

Working or substantially proven:

* 3D movable panels;
* panel resizing;
* saved/restored layouts;
* camera modes;
* mouse-debug parallax;
* webcam head tracking;
* simulated depth tracking;
* live real window capture;
* video streaming at source-like frame rate;
* source-aware resizing;
* click-through interaction from Godot panel to real app;
* coordinate interpolation from 3D panel to window content.

Known remaining areas:

* keyboard input and focus behaviour;
* multi-window management at scale;
* robust lifecycle handling when source windows close, minimise, change title, or move;
* DPI and mixed-monitor edge cases;
* performance profiling;
* packaging the native helper with the Godot app;
* graceful error handling;
* user-facing settings;
* aspect ratio modes and visual framing;
* saved layouts that reconnect to real windows reliably;
* and eventual aesthetic/scene development.

At this stage, I would describe Desktop Diorama as a strong technical prototype moving toward MVP hardening.

---

## Challenges and Learnings

### Capturing real windows is not one problem

One of the biggest learnings was that “window capture” is not a single solved task. Different methods behave very differently depending on whether the source window is visible, covered, GPU-rendered, static, animated, or video-based.

The project moved through multiple capture strategies because each revealed different constraints:

* screen-region capture was easy but invalid for a full-screen shell;
* PrintWindow worked for many ordinary windows but struggled with video/GPU content;
* Windows Graphics Capture was a stronger route but still exposed limits in the early Python bridge;
* C++ streaming became necessary for acceptable performance and responsiveness.

This progression is a good example of iterative technical discovery: build the smallest possible spike, observe where it fails, then make the next architectural decision based on evidence.

---

### Real interaction changes everything

Displaying a captured window is impressive, but it is not enough.

The project became much more viable once users could click through the Godot panel and interact with the actual source window. Coordinate interpolation transformed the prototype from a passive display system into a usable spatial interface.

That was a major product milestone because it validated the idea that Desktop Diorama could become a working interface layer rather than a purely visual overlay.

---

### Resizing needed to affect the source, not the texture

Another important discovery was that simply resizing the Godot panel stretched the captured image. This made the interface feel fake.

The improved version resizes the underlying window/content instead, so the panel behaves more like a real spatial representation of the application. This is critical for preserving the illusion that the panel is the window, not just a picture of a window.

---

## Product Direction

The project’s current direction is not to build a complete desktop replacement immediately. A better near-term goal is a focused MVP around spatial window workspaces.

The MVP should answer:

* Can a user comfortably manage a small number of real windows in 3D?
* Can they move, resize, and interact with those windows reliably?
* Does head tracking add value without becoming distracting?
* Can layouts be saved and restored?
* Does the experience feel meaningfully different from a normal desktop?

The first practical version should likely focus on a small number of windows rather than trying to replace the entire desktop shell.

A strong MVP scenario might be:

* one browser window;
* one notes/editor window;
* one communication/reference window;
* optional head tracking;
* saved layout;
* basic settings;
* robust click and keyboard behaviour;
* and a simple neutral scene.

This would be enough to test whether the core experience is useful and emotionally compelling.

---

## Roadmap

### Short-term: harden the core loop

The next phase should focus on reliability rather than visual polish.

Priorities:

1. keyboard focus and typing support;
2. robust click forwarding;
3. multi-window capture management;
4. graceful handling of closed/minimised windows;
5. stable resizing and coordinate mapping;
6. layout persistence with real source windows;
7. DPI and multi-monitor testing;
8. performance profiling;
9. helper process lifecycle management.

The goal is to make the prototype feel safe to use for a short real session.

---

### Medium-term: productise the experience

Once the core loop is reliable, the product needs a clearer user-facing shape.

Priorities:

* onboarding;
* settings UI;
* calibration controls for head tracking;
* sensitivity/deadzone options;
* capture source selection;
* panel management;
* reset/recover layout controls;
* privacy/safety controls;
* and clear indicators for captured/active windows.

At this stage, the project should start to feel less like a developer prototype and more like a tool.

---

### Long-term: build the diorama world

Only after the capture and interaction layer is stable should the project invest heavily in atmosphere.

Potential directions:

* fields/sky scene;
* window-looking-out aesthetic;
* ambient weather or time-of-day;
* seasonal themes;
* gentle parallax background layers;
* workspace presets;
* low-power mode;
* multi-monitor support;
* and eventually community-made scenes.

The aesthetic layer matters deeply, but it should sit on top of a trustworthy technical base.

---

## Outcome So Far

Desktop Diorama has already progressed through several important product lifecycle stages:

* concept exploration;
* visual prototype;
* interaction prototype;
* head-tracking prototype;
* capture feasibility testing;
* native streaming investigation;
* source-aware resizing;
* and early click-through interaction.

The most important result is that the central concept appears technically viable.

The project began as an experiment in whether a desktop could have depth. It is now becoming an exploration of whether everyday computing can feel spatial, personal, and physically present without losing access to real applications.

That shift matters. It means Desktop Diorama is not just decorative software. It is a practical interface experiment with a clear emotional and technical thesis.

---

## Skills Demonstrated

Desktop Diorama demonstrates a combination of product thinking, UX design, technical prototyping, and systems-level problem solving.

Key skills include:

* product discovery;
* technical risk prioritisation;
* rapid prototyping;
* Godot 3D development;
* interaction design;
* camera/input systems;
* native Windows capture exploration;
* Python prototyping;
* C++/native helper investigation;
* coordinate mapping;
* user-centred iteration;
* debugging across multiple processes;
* and evidence-led roadmap planning.

The project also demonstrates an important product instinct: knowing when not to polish. By focusing first on the riskiest assumptions, the project avoided wasting time on visual refinement before proving that real windows could be captured, streamed, resized, and interacted with.

---

## Reflection

Desktop Diorama is a project about changing the emotional texture of everyday computing.

Most desktop software treats the screen as a flat surface for productivity. This project asks whether the desktop can become a place: something spatial, tactile, and expressive while still remaining useful.

The most satisfying part of the process has been watching the idea move from aesthetic intuition into technical reality. Head tracking made the space feel alive. Real window capture made it practical. Resizing and click-through interaction made it usable.

The project is still unfinished, but the hardest questions are no longer abstract. They have working answers, known limitations, and a clear roadmap.

For me, Desktop Diorama represents the kind of software I want to make: small but ambitious, technically curious, emotionally aware, and interested in making computers feel more human rather than merely more efficient.

