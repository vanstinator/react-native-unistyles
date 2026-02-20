# Container Queries Exploration

This document explores adding container query support to react-native-unistyles, allowing breakpoint object syntax to be based on parent container size rather than window/screen size, with opt-in behavior for entire component trees.

## Clean Design: Shadow DOM + Compiler Step

A cleaner approach that aligns with Unistyles' architecture and adds proper encapsulation:

**Note:** Unistyles does not currently use the Web Shadow DOM API. The "shadow" in `UnistylesShadowRegistry` refers to the element-to-style registry (web) and Fabric's shadow tree (native). The proposal below would introduce Shadow DOM on web as a clean encapsulation mechanism for container query CSS.

## Current Architecture Summary

### Breakpoint Resolution Today

**Web:**
- `UnistylesState.initBreakpoints()` registers `window.matchMedia('(min-width: Xpx)')` listeners
- `state.breakpoint` returns current breakpoint based on **window width**
- `convertUnistyles` → `getObjectStyle` → breakpoint objects become `@media (min-width: Xpx) and (max-width: Ypx)` CSS
- Styles are applied via CSS classes; media queries handle responsive switching

**Native (iOS/Android):**
- C++ `Parser::getValueFromBreakpoints()` uses `_unistylesRuntime->getScreen()` for dimensions
- `UnistylesState::computeCurrentBreakpoint(screenWidth)` computes breakpoint from **screen width**
- Breakpoint resolution happens at parse time in C++; resolved styles are cached
- `UnistyleDependency.Breakpoints` triggers re-parse when screen dimensions change

**Key insight:** Both platforms use a **global** dimension source (window/screen). There is no concept of "container" or "parent size" today.

---

## Clean Design: Shadow DOM + Compiler Step (Recommended)

### Overview

1. **Compiler (Babel plugin):** New `StyleSheet.createContainer()` API—or `StyleSheet.create(fn, { container: true })`—that the plugin recognizes and marks. This is the "compiler step" that enables the container-query code path.

2. **Shadow DOM (web):** Each `ContainerQuery` creates a shadow root. The `@container` CSS for that subtree is injected into the shadow root's `<style>` element—scoped, no global pollution, consistent with a registry-style architecture.

3. **CSS conversion:** At runtime, when `addStyles` is called with container context (from `ContainerQueryContext`), the pipeline emits `@container name (min-width: Xpx)` instead of `@media (min-width: Xpx)`. The plugin's transform is what enables this—it marks stylesheets so the runtime knows to use the container path.

### Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ COMPILE TIME (Babel Plugin)                                      │
├─────────────────────────────────────────────────────────────────┤
│ StyleSheet.createContainer(theme => ({ card: { width: {...} } })) │
│         ↓                                                        │
│ Plugin adds __uni__container: true to stylesheet metadata         │
│ (or uses createContainer → different runtime entry point)        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ RUNTIME (Web)                                                    │
├─────────────────────────────────────────────────────────────────┤
│ ContainerQuery mounts                                            │
│   → attachShadow(), container-type: inline-size                  │
│   → Provides containerName via context                           │
│   → Registers style target (shadow root) with registry           │
│                                                                  │
│ Child with container styles mounts                               │
│   → addStyles(styles, { containerName })                        │
│   → convertUnistyles sees __uni__container → use getContainerQuery│
│   → CSSState.add targets shadow root's <style> (not document)     │
│   → Output: @container uni-cq-123 (min-width: 576px) { .hash{} }  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components

| Component | Role |
|-----------|------|
| **Babel plugin** | Detects `createContainer` / `{ container: true }`, marks stylesheet. No CSS emitted at build time—breakpoint values come from `StyleSheet.configure` at runtime. |
| **getContainerQuery()** | Like `getMediaQuery()` but returns `@container name (min-width: Xpx)` instead of `@media`. |
| **CSSState** | New `containerMap` or per-container style targets. When `containerName` is present, inject into that container's shadow root `<style>` instead of `#unistyles-web`. |
| **ContainerQuery** | Creates shadow host, `container-type`, provides `containerName`, registers its shadow root as the CSS target for descendants. |

### Why Shadow DOM?

- **Scoping:** Each `ContainerQuery`'s `@container` rules live only in its shadow root. No global stylesheet bloat.
- **Consistency:** Mirrors the "registry connects styles to elements" pattern—here we connect container styles to a specific shadow root.
- **Nested containers:** Each `ContainerQuery` has its own shadow root; inner containers naturally scope their rules.

### React + Shadow DOM Integration

React does not natively render into shadow roots. Two approaches:

**Option A: Slot-based (recommended)**  
`ContainerQuery` renders a host that uses `attachShadow`. Children are rendered in the light DOM and projected via `<slot>`. The host has `container-type: inline-size`; the slotted content is the container's descendants. The `@container` CSS lives in the shadow root's `<style>` and correctly targets slotted elements (slotted content participates in the shadow root's tree for styling).

**Option B: Portal into shadow**  
Use `ReactDOM.createPortal(children, shadowRoot)` to render children into the shadow root. Simpler DOM structure but requires careful lifecycle handling.

**Option C: No Shadow DOM**  
Inject `@container` rules into the main `#unistyles-web` stylesheet. Simpler implementation; rules are scoped by `container-name` only. No encapsulation, but no React/shadow integration complexity.

### Compiler Output (What the Plugin Produces)

The plugin does **not** emit raw CSS at build time (breakpoints are runtime config). Instead it:

1. Transforms `StyleSheet.createContainer(...)` to `StyleSheet.create(..., { __uni__container: true })` (or equivalent)
2. Ensures the stylesheet object carries the container flag through to runtime
3. When `addStyles` runs, the flag + `containerName` from context trigger the `@container` path in `convertToCSS` and `CSSState`

The "conversion to CSS" happens at runtime when styles are first applied, but the **structure** (container vs media) is determined by the compiler's marking.

---

## Proposed Design: Opt-in Container Query Context

### 1. `ContainerQuery` Component (Provider)

A wrapper component that:
- Measures its own size via `onLayout` (native) or `ResizeObserver` (web)
- Provides `{ width, height, breakpoint }` to descendants via React Context
- Opt-in: when absent, all descendants use screen/window dimensions (current behavior)

```tsx
// Usage
<ContainerQuery>
  <Card />  {/* breakpoints in Card's styles use container width */}
</ContainerQuery>
```

### 2. Context Structure

```ts
type ContainerDimensions = {
  width: number
  height: number
  breakpoint: string  // computed from width using registered breakpoints
}

// null = use screen/window (default)
const ContainerQueryContext = createContext<ContainerDimensions | null>(null)
```

### 3. Platform-Specific Implementation Strategies

#### Web – Two Viable Approaches

**Option A: Native CSS Container Queries (Recommended)**

- ContainerQuery sets `container-type: inline-size` and `container-name: unistyles-cq-{id}` on its root element
- When context is present, generate `@container unistyles-cq-{id} (min-width: Xpx)` instead of `@media (min-width: Xpx)` for breakpoint styles
- Browser handles all resize logic; no JS re-computation
- Requires: `getMediaQuery()` → `getContainerQuery()` when in container context; CSSState to support `@container` rules

**Option B: ResizeObserver + Dynamic Class**

- Use ResizeObserver to measure container
- Compute breakpoint in JS (e.g. `getBreakpointFromWidth(containerWidth)`)
- Apply `data-container-bp="md"` or class `uni-cq-md` to container
- Child styles use `[data-container-bp="md"] .hash { ... }` selectors
- More JS work, but works in older environments

#### Native (iOS/Android)

**Challenge:** Breakpoint resolution happens in C++ Parser, which only has access to `getScreen()`.

**Option A: Pass Container Dimensions to Native (Complex)**

- Add JSI API: `UnistylesRegistry.setContainerDimensions(rt, dimensions)` 
- Parser checks for "container override" before using screen
- Problem: React tree renders asynchronously; multiple containers could nest; would need a stack/callback model

**Option B: JS-Side Resolution for Container Subtrees (Recommended)**

- When `ContainerQueryContext` has a value, components under it use a **different style resolution path**
- Breakpoint objects stay as objects (not pre-resolved by C++)
- A JS function `resolveBreakpoints(styleObject, dimensions)` picks the right value per breakpoint key
- This requires:
  1. A way to mark stylesheets/styles as "container-aware" (or always pass raw + resolved)
  2. Babel plugin or runtime to emit unresolved breakpoint objects for container descendants
  3. Or: **always** pass raw breakpoint objects to native, and have a "container context" path that resolves in JS before passing final style to View

**Option C: Hybrid – Native for screen, JS for container**

- Default: current native resolution (screen-based)
- Under `ContainerQuery`: use a `useContainerStyles(styles)` hook that:
  - Takes the same style object but resolves breakpoints in JS using `containerDimensions` from context
  - Returns plain React Native style object (no Unistyles secrets)
  - Requires stylesheet to expose raw breakpoint structure to JS (or a `resolveForDimensions` helper)

The cleanest native approach: **ContainerQuery** provides dimensions via context. A new hook `useContainerStyles` (or integration into `useUnistyles` / style resolution) resolves breakpoint objects in JS when context exists, and passes plain styles to the View. The native C++ path remains unchanged for non-container usage.

---

## Implementation Outline

### Phase 1: Foundation

1. **Create `ContainerQueryContext`** and `ContainerQuery` component
   - `ContainerQuery` uses `View` with `onLayout` (native) / `ResizeObserver` (web) to measure
   - Compute `breakpoint` from `width` using `UnistylesRuntime.breakpoints` (same logic as `getBreakpointFromScreenWidth` / `computeCurrentBreakpoint`)
   - Provide `{ width, height, breakpoint }` via context

2. **`useContainerDimensions()` hook** – returns context value or null

### Phase 2: Web

1. **CSS path:** Add `getContainerQuery(breakpointKey, allBreakpoints)` analogous to `getMediaQuery`
2. **ContainerQuery** renders a wrapper with `container-type: inline-size` and unique `container-name`
3. **Registry/CSS pipeline:** When adding styles for a component under ContainerQuery, use `@container` instead of `@media` for breakpoint keys
4. **Challenge:** The web pipeline currently doesn't know "am I inside a container?" at CSS generation time. Options:
   - **A)** Generate both `@media` and `@container` rules; use `@container` when the element is a descendant of a container (requires DOM/ref awareness)
   - **B)** Use a `ContainerQuery` that adds a class to its subtree; generate CSS as `.container-query .hash { @container ... }` so it only applies when that class exists
   - **C)** Use CSS `@layer` or specificity so `@container` overrides `@media` when both exist and the element is in a container

### Phase 3: Native

1. **`resolveBreakpointsInJS(styleObject, dimensions)`** – recursive function that, for each key with breakpoint object, selects value based on `dimensions.width` and registered breakpoints
2. **Container-aware style resolution:** When rendering under `ContainerQuery`, intercept style resolution:
   - If style has breakpoint objects and context exists, resolve in JS with container dimensions
   - Pass resolved (plain) style to View
3. **Integration point:** Likely in `withUnistyles` or a new `withContainerUnistyles` – check for `useContainerDimensions()`, and if present, run `resolveBreakpointsInJS` on the style before passing to the component

### Phase 4: Nested Containers

- Context naturally overrides: inner `ContainerQuery` provides its own dimensions, so nested components use the nearest container's size
- No extra work needed if we use React Context correctly

---

## API Sketch

### Clean design (createContainer + ContainerQuery)

```tsx
import { ContainerQuery, useContainerDimensions, StyleSheet } from 'react-native-unistyles'

// Container styles: compiler knows these use container breakpoints
const cardStyles = StyleSheet.createContainer(theme => ({
  root: {
    width: { xs: '100%', sm: '50%', md: '33%' },
    padding: { xs: 8, md: 16 },
  },
}))

// Wrap a subtree to opt-in to container-based breakpoints
function CardGrid() {
  return (
    <ContainerQuery>
      <View style={gridStyles.grid}>
        {items.map(item => (
          <Card key={item.id} style={cardStyles.root} />
        ))}
      </View>
    </ContainerQuery>
  )
}

const gridStyles = StyleSheet.create(theme => ({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
}))
```

Alternative: `StyleSheet.create(theme => ({...}), { container: true })` if you prefer a single API.

Optional: `useContainerDimensions()` for manual use:

```tsx
const dims = useContainerDimensions()
if (dims) {
  // We're inside a container; dims.width, dims.breakpoint available
}
```

---

## Open Questions

1. **Web:** Should we always generate both `@media` and `@container` and rely on cascade, or only generate `@container` when the component is rendered under `ContainerQuery`? (The latter requires knowing render tree at CSS add time, which is tricky with the current registry model.)

2. **Native:** Should container resolution be automatic (when context exists, always resolve in JS) or require an explicit `useContainerStyles()` / `withContainerUnistyles`? Automatic is nicer DX but requires touching more of the style resolution pipeline.

3. **Performance:** On native, resolving in JS on every container resize could mean more work. Memoization and only re-resolving when dimensions change will be important.

4. **SSR:** Container dimensions are unknown at server render time. Default to smallest breakpoint (xs) or no breakpoint styles?

---

## Files to Modify (Preliminary)

| Area | Files |
|------|-------|
| Context & Provider | `src/components/ContainerQuery.tsx` (new), `src/context/ContainerQueryContext.ts` (new) |
| Web – CSS | `src/web/utils/unistyle.ts` (getContainerQuery), `src/web/css/core.ts`, `src/web/css/state.ts` |
| Web – Registry | `src/web/shadowRegistry.ts` (container awareness?), `src/web/registry.ts` |
| Native – Resolution | `src/utils/resolveBreakpoints.ts` (new), `src/core/withUnistyles/withUnistyles.native.tsx` |
| Specs | `src/specs/UnistylesRuntime` (breakpoint lookup for JS resolution) |
| C++ (if Option A for native) | `cxx/parser/Parser.cpp`, `cxx/core/UnistylesRegistry`, `cxx/core/UnistylesState` |

---

## Recommendation

**Web (clean design):**
- Babel plugin: `StyleSheet.createContainer()` or `create(..., { container: true })` as the compiler step
- Shadow DOM for scoping (Option A slot-based, or Option C if simpler)
- Runtime: `getContainerQuery()` + `CSSState` targeting shadow roots when `containerName` is in context

**Native:**
- Use JS-side resolution (Option B). Avoids C++ changes and fits React's context model.
- Implement `resolveBreakpointsInJS` and integrate into the style flow when `ContainerQueryContext` is set.

**Provider:** Single `ContainerQuery` component that works on all platforms, with platform-specific measurement (onLayout vs ResizeObserver). On web, also creates shadow root and provides `containerName`.

---

## Appendix: Proof-of-Concept Snippets

### `getBreakpointFromWidth` (JS equivalent of C++ logic)

```ts
// Mirrors cxx/common/Breakpoints.h getBreakpointFromScreenWidth
function getBreakpointFromWidth(
  width: number,
  breakpoints: Record<string, number>
): string {
  const sorted = Object.entries(breakpoints)
    .sort(([, a], [, b]) => a - b)
  const idx = sorted.findIndex(([, value]) => width < value)
  if (idx <= 0) return sorted[0]?.[0] ?? 'xs'
  return sorted[idx - 1][0]
}
```

### `resolveBreakpointsInJS` (for native container resolution)

```ts
function resolveBreakpointsInJS<T>(
  value: T,
  width: number,
  breakpoints: Record<string, number>
): T {
  if (value === null || typeof value !== 'object') return value
  if (Array.isArray(value)) return value.map(v => resolveBreakpointsInJS(v, width, breakpoints)) as T

  const bp = getBreakpointFromWidth(width, breakpoints)
  const keys = Object.keys(value)
  const hasBreakpointKeys = keys.some(k => k in breakpoints || isUnistylesMq(k))

  if (hasBreakpointKeys) {
    // Pick value for current breakpoint (cascade: use largest <= width)
    const sorted = [...keys]
      .filter(k => k in breakpoints)
      .sort((a, b) => (breakpoints[b] ?? 0) - (breakpoints[a] ?? 0))
    const match = sorted.find(k => (breakpoints[k] ?? 0) <= width)
    const resolved = (value as Record<string, unknown>)[match ?? sorted[sorted.length - 1]]
    return resolveBreakpointsInJS(resolved, width, breakpoints) as T
  }

  return Object.fromEntries(
    Object.entries(value).map(([k, v]) => [k, resolveBreakpointsInJS(v, width, breakpoints)])
  ) as T
}
```

### `ContainerQuery` component skeleton

```tsx
// ContainerQuery.tsx
import React, { createContext, useContext, useCallback, useState } from 'react'
import { View, type LayoutChangeEvent } from 'react-native'
import { UnistylesRuntime } from '../specs'

type ContainerDimensions = { width: number; height: number; breakpoint: string }

const ContainerQueryContext = createContext<ContainerDimensions | null>(null)

export const useContainerDimensions = () => useContext(ContainerQueryContext)

export const ContainerQuery: React.FC<React.PropsWithChildren<{ style?: any }>> = ({ children, style }) => {
  const [dims, setDims] = useState<ContainerDimensions | null>(null)
  const breakpoints = UnistylesRuntime.breakpoints ?? { xs: 0 }

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    const breakpoint = getBreakpointFromWidth(width, breakpoints)
    setDims({ width, height, breakpoint })
  }, [])

  return (
    <ContainerQueryContext.Provider value={dims}>
      <View style={style} onLayout={onLayout} collapsable={false}>
        {children}
      </View>
    </ContainerQueryContext.Provider>
  )
}
```

Web: use `ResizeObserver` on the wrapper instead of `onLayout`; otherwise same logic.
