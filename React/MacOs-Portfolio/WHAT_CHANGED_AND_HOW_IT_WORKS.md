# What Changed And How It Works

This document explains the changes made during our chat. It is written from the beginning, so you do not need to already know React state, props, animations, API keys, or backend API routes.

## Big Picture

Your project is a React portfolio that looks like macOS. It has:

- A navbar at the top.
- A dock at the bottom.
- App windows like GitHub, Note, Resume, Spotify, and Terminal.
- A shared `MacWindow` component that wraps each app.
- A terminal window that can run commands.

During this chat, we added:

- Smooth app open and close animations.
- Dock icons that open and close apps.
- Fullscreen behavior for Resume and Spotify.
- Window stacking so the most recently opened or clicked app comes on top.
- A lock screen and shutdown screen.
- Working navbar menu actions.
- Traffic-light window buttons:
  - red closes
  - yellow toggles fullscreen
  - green minimises
- Gemini AI integration inside the terminal using `gpt`, `gemini`, and `ask`.
- Secret-safe environment variable setup so your API key is not uploaded to GitHub.

## Important React Ideas

### Components

A React component is a reusable piece of UI. For example:

- `Dock.jsx` is the dock.
- `Nav.jsx` is the top navbar.
- `MacWindow.jsx` is the reusable macOS window frame.
- `LockScreen.jsx` is the lock screen.

Components can receive information from their parent through `props`.

Example:

```jsx
<Dock toggleWindow={toggleWindow} />
```

Here, `App.jsx` gives the `Dock` component a function called `toggleWindow`.

### State

State is data that React remembers and uses to update the UI.

Example from `App.jsx`:

```jsx
const [isLocked, setIsLocked] = useState(false)
```

This means:

- `isLocked` stores whether the computer is locked.
- `setIsLocked(true)` locks it.
- `setIsLocked(false)` unlocks it.

### Conditional Rendering

Conditional rendering means showing UI only when some condition is true.

Example:

```jsx
{!(isLocked || isShutdown) && <Dock toggleWindow={toggleWindow} />}
```

This says:

- If the system is not locked and not shutdown, show the dock.
- If locked or shutdown, hide the dock.

## File By File Explanation

## `src/App.jsx`

This became the main controller for the desktop.

### What It Controls

It now controls:

- Which windows are open.
- Which window is on top.
- Whether the system is locked.
- Whether the system is shutdown.
- Whether the dock should show.
- Passing needed props to windows, nav, dock, and lock screen.

### Window Open State

The app stores window states like this:

```jsx
const [windowState, setwindowState] = useState({
  github: false,
  note: false,
  resume: false,
  spotify: false,
  terminal: false
})
```

Each value can be:

- `false`: app is closed
- `true`: app is open
- `'closing'`: app is playing the close/minimise animation before disappearing

This lets us animate closing. If we changed from `true` to `false` immediately, React would remove the window instantly and CSS would not have time to animate.

### Window Toggle

The `toggleWindow` function opens an app if it is closed, and closes it if it is already open.

```jsx
const toggleWindow = (appName) => {
  if (windowState[appName] !== true) {
    bringToFront(appName)
  }

  setwindowState(state => ({
    ...state,
    [appName]: state[appName] === true ? 'closing' : true
  }))
}
```

Beginner explanation:

- `appName` is a string like `'terminal'`.
- `state[appName]` reads that app's current open/closed value.
- If the app is open, set it to `'closing'`.
- If the app is closed, set it to `true`.
- `...state` keeps the other app states unchanged.

### Window Stacking

When multiple apps are open, they can overlap. We need to decide which one appears on top.

That is done with `z-index`.

```jsx
const [windowZIndex, setWindowZIndex] = useState({
  github: 100,
  note: 100,
  resume: 100,
  spotify: 100,
  terminal: 100
})
```

When an app is opened or clicked, `bringToFront(appName)` increases its z-index. Higher z-index means it appears above lower z-index windows.

This fixed the case where Spotify was open fullscreen and Terminal should appear above Spotify after clicking Terminal.

### Lock And Shutdown

These states were added:

```jsx
const [isLocked, setIsLocked] = useState(false)
const [isShutdown, setIsShutdown] = useState(false)
```

They control:

- showing the lock screen
- showing the shutdown screen
- hiding the dock while locked or shutdown
- preventing navbar app shortcuts from opening apps while locked

## `src/components/Dock.jsx`

The dock used to directly set app state like this:

```jsx
setWindowState(state => ({ ...state, terminal: true }))
```

Now it receives `toggleWindow` from `App.jsx`:

```jsx
const Dock = ({ toggleWindow }) => {
```

Each app icon calls:

```jsx
toggleWindow('terminal')
```

This means:

- Clicking a closed app opens it.
- Clicking an already open app closes/minimises it.
- The same logic is shared by all dock apps.

Current note: the mail icon is commented out in `Dock.jsx`, so it will not show in the dock unless you uncomment it.

## `src/components/dock.scss`

The dock got a high z-index:

```scss
z-index: 900;
```

This keeps the dock above normal/fullscreen windows, so you can still use the dock when apps are open.

The dock is hidden on the lock screen from `App.jsx`, not from CSS.

## `src/components/Nav.jsx`

The navbar became interactive.

### Apple Menu

Clicking the Apple logo opens a dropdown menu with:

- `Shutdown`
- `Lock`

This is controlled with:

```jsx
const [showAppleMenu, setShowAppleMenu] = useState(false)
```

When `showAppleMenu` is `true`, the menu appears.

### Lock Button

Clicking `Lock` does:

```jsx
setIsShutdown(false)
setIsLocked(true)
```

This shows the lock screen.

### Shutdown Button

Clicking `Shutdown` does:

```jsx
setIsLocked(false)
setIsShutdown(true)
```

This shows the shutdown screen.

### Navbar App Shortcuts

The navbar labels now do things:

- `Ayush kumar` opens GitHub
- `File` opens Note
- `Window` opens Resume
- `Terminal` opens Terminal

But if the system is locked, the app does not open. Instead it shows:

```txt
Unlock PC first
```

That logic is in:

```jsx
const openNavApp = (appName) => {
  if (isLocked) {
    alert('Unlock PC first')
    return
  }

  toggleWindow(appName)
}
```

### Navbar Right Side

The navbar still shows DateTime on the lock screen.

The Wi-Fi icon is hidden when locked:

```jsx
{!isLocked && <div className="nav-icon">...</div>}
```

## `src/components/nav.scss`

The navbar got:

```scss
position: relative;
z-index: 1000;
```

This keeps the navbar above windows and above the lock screen.

Apple menu styles were added:

- absolute positioning under the Apple logo
- blurred/dark background
- hover effect on buttons

## `src/components/LockScreen.jsx`

This is a new component.

It shows either:

- a lock/login screen
- or a shutdown screen

### Password State

```jsx
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const [isUnlocking, setIsUnlocking] = useState(false)
```

These mean:

- `password`: what the user typed
- `error`: message when the password is wrong
- `isUnlocking`: whether the unlock animation is playing

### Password Check

The current password is:

```jsx
const PASSWORD = 'ayush'
```

If the typed password is wrong:

```jsx
setError('Password is incorrect')
setPassword('')
```

If correct:

```jsx
setIsUnlocking(true)
setTimeout(() => {
  setIsLocked(false)
}, 520)
```

This means:

- Start the slide-up animation.
- Wait 520ms.
- Then remove the lock screen.

### Shutdown Screen

If `isShutdown` is true, this component shows a black screen with `Power On`.

Clicking `Power On` sets:

```jsx
setIsShutdown(false)
setIsLocked(true)
```

That means it powers back into the lock screen.

## `src/components/lockscreen.scss`

This file styles the lock screen.

Important parts:

```scss
.lock-screen,
.shutdown-screen {
  position: fixed;
  inset: 0;
  z-index: 950;
}
```

This makes the lock screen cover the full browser viewport.

The z-index is `950`, which is:

- above app windows
- below navbar `1000`

That is why the navbar DateTime can still show above it.

The unlock animation is:

```scss
@keyframes unlock-slide {
  to {
    transform: translateY(-100%);
  }
}
```

This makes the lock screen slide upward when the password is correct.

## `src/windows/MacWindow.jsx`

This is the biggest shared change. Every app window uses this component, so changing it affects GitHub, Note, Resume, Spotify, and Terminal.

### Controlled Window Size And Position

Before, `Rnd` used `default`. Now it uses controlled `size` and `position`.

```jsx
<Rnd
  size={{ width: activeWindow.width, height: activeWindow.height }}
  position={{ x: activeWindow.x, y: activeWindow.y }}
>
```

This lets React control where the window is and how large it is.

### Normal Window

Normal apps use:

```jsx
const defaultWindow = {
  width: '40vw',
  height: '40vh',
  x: windowXPositions[appName] ?? 300,
  y: 200
}
```

### Fullscreen Window

Fullscreen apps use:

```jsx
const fullscreenWindow = {
  width: '100vw',
  height: `calc(100vh - ${navHeight}px)`,
  x: 0,
  y: navHeight
}
```

The `navHeight` keeps fullscreen windows below the navbar.

### Resume And Spotify Open Fullscreen

In `App.jsx`, Resume and Spotify are passed `fullScreen`:

```jsx
<ResumeViewer ... fullScreen />
<Spotify ... fullScreen />
```

That makes them start fullscreen.

### Red, Yellow, Green Buttons

The traffic-light buttons now do this:

- red: close
- yellow: fullscreen/non-fullscreen
- green: minimise

Red and green both set the app to `'closing'`, so the same animation plays.

Yellow changes:

```jsx
setIsFullScreen(state => !state)
```

This toggles fullscreen on/off.

### Fullscreen Animation

When yellow is clicked:

```jsx
setIsFullScreenAnimating(true)
setIsFullScreen(state => !state)
setTimeout(() => {
  setIsFullScreenAnimating(false)
}, 320)
```

The temporary `fullscreen-animating` class adds CSS transitions for width, height, and position.

### Drag And Resize Memory

When a normal window is dragged:

```jsx
onDragStop={(_event, data) => {
  setNormalWindow(state => ({ ...state, x: data.x, y: data.y }))
}}
```

When resized:

```jsx
onResizeStop={(_event, _direction, ref, _delta, position) => {
  setNormalWindow({
    width: ref.style.width,
    height: ref.style.height,
    x: position.x,
    y: position.y
  })
}}
```

This remembers the normal size and position, so when you exit fullscreen, the window goes back to its previous normal shape.

## `src/windows/window.scss`

This file handles window animations.

### Open Animation

```scss
@keyframes window-open {
  from {
    opacity: 0;
    transform: translate3d(0, 70vh, 0) scale(0.06);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

This makes apps appear as if they come up from the dock.

### Close Animation

```scss
@keyframes window-close {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  to {
    opacity: 0;
    transform: translate3d(0, 70vh, 0) scale(0.06);
  }
}
```

This makes apps shrink down toward the dock.

### Fullscreen Toggle Animation

```scss
.fullscreen-animating {
  transition:
    width 320ms cubic-bezier(0.16, 1, 0.3, 1),
    height 320ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 320ms cubic-bezier(0.16, 1, 0.3, 1) !important;
}
```

This makes the yellow button fullscreen toggle smooth.

## `src/windows/Github.jsx`

This component now receives:

- `isClosing`
- `zIndex`
- `bringToFront`

and passes them into `MacWindow`.

That lets GitHub:

- close with animation
- come to the front when clicked
- participate in shared fullscreen/minimise logic

Also, the unused `idx` variable was removed from `.map()` to fix a lint error.

## `src/windows/Note.jsx`

This component now receives and passes:

- `isClosing`
- `zIndex`
- `bringToFront`

This makes Note behave like the other windows.

## `src/windows/ResumeViewer.jsx`

This component now receives and passes:

- `isClosing`
- `fullScreen`
- `zIndex`
- `bringToFront`

Resume opens fullscreen by default because `App.jsx` passes `fullScreen`.

## `src/windows/Spotify.jsx`

This component now receives and passes:

- `isClosing`
- `fullScreen`
- `zIndex`
- `bringToFront`

Spotify opens fullscreen by default because `App.jsx` passes `fullScreen`.

## `src/windows/TerminalWindow.jsx`

This file got the AI terminal commands.

### Gemini Function

The new function is:

```jsx
const askGemini = async (...args) => {
  const prompt = args.join(' ').trim()
  ...
}
```

Why `...args`?

If you type:

```txt
gpt explain react state
```

The terminal library gives the command function separate words:

```txt
['explain', 'react', 'state']
```

`args.join(' ')` turns them back into:

```txt
explain react state
```

That full prompt is sent to `/api/gemini`.

### Commands Added

These commands now call Gemini:

```txt
gpt your question
gemini your question
ask your question
```

They all use the same `askGemini` function.

### Why The API Call Is Not Directly To Gemini

The React frontend does not call Gemini directly. It calls:

```txt
/api/gemini
```

That is important because API keys must not be placed in frontend code. Anything in frontend code can be seen by users in the browser.

## `vite.config.js`

This file now does more than normal Vite configuration. It also creates a local development API route.

### Why This Was Needed

When you run:

```bash
npm run dev
```

Vite serves your React app, but it does not automatically run files inside `api/`.

So `/api/gemini` would fail locally unless we added middleware.

### Local API Route

The middleware checks:

```js
if (!request.url?.startsWith('/api/gemini')) {
  next()
  return
}
```

That means:

- If the request is not `/api/gemini`, let Vite handle it normally.
- If it is `/api/gemini`, handle the request ourselves.

### Reading `.env`

```js
const env = loadEnv(mode, process.cwd(), '')
```

This loads variables from `.env`, including:

```env
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
```

### Calling Gemini

The local API sends a request to:

```txt
https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
```

It sends your key in a server-side header:

```js
'x-goog-api-key': env.GEMINI_API_KEY
```

This keeps the key out of the frontend bundle.

## `api/gemini.js`

This file is for deployment platforms that support serverless API routes, such as Vercel.

It does the same basic job as the Vite middleware:

- accept a POST request
- read `prompt`
- read `GEMINI_API_KEY` from server environment variables
- call Gemini
- return `{ answer: '...' }`

Why have both `vite.config.js` and `api/gemini.js`?

- `vite.config.js` helps local development.
- `api/gemini.js` helps deployment.

## `.gitignore`

This file was updated to protect secrets.

Added:

```gitignore
.env
.env.*
!.env.example
```

This means:

- `.env` will not be uploaded to GitHub.
- `.env.local` and similar files will not be uploaded.
- `.env.example` is allowed because it only contains placeholders.

## `.env`

This file is local only and should not be committed.

It should contain your real Gemini API key:

```env
GEMINI_API_KEY=your_real_key_here
GEMINI_MODEL=gemini-2.5-flash
```

Never put real API keys in React files.

Never upload `.env` to GitHub.

## `.env.example`

This file is safe to upload.

It should contain only placeholders:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

This helps other people know what variables they need without exposing your private key.

## API Key Safety

### Why Not Put The API Key In React?

React runs in the browser. Browser code is public.

If you write:

```js
const apiKey = 'real-key-here'
```

anyone can inspect the website and steal the key.

That is why the app uses:

```txt
React terminal -> /api/gemini -> Gemini API
```

The browser only talks to your backend route. The backend route uses the secret key.

## How To Use The Terminal AI

Start the dev server:

```bash
npm run dev
```

Open the terminal app in your portfolio.

Type:

```txt
gpt explain promises in javascript
```

or:

```txt
gemini write a short intro for my portfolio
```

or:

```txt
ask what is react state
```

## Common Errors

### `GEMINI_API_KEY is not configured`

This means `.env` is missing or does not have:

```env
GEMINI_API_KEY=...
```

After changing `.env`, restart:

```bash
npm run dev
```

### `Gemini request failed`

This usually means:

- the API key is wrong
- the API key is disabled
- the model name is wrong
- the Gemini account/project has an issue

### Old JSON Error

Earlier, the terminal showed:

```txt
Unexpected end of JSON input
```

That happened because the frontend expected JSON but the local API route did not exist yet.

We fixed it by:

- making the terminal read response text safely
- adding local Vite middleware for `/api/gemini`

## Testing Done

After the changes, these commands were run several times:

```bash
npm run build
npm run lint
```

They passed after fixes.

## Mental Model

Think of the project like this:

```txt
App.jsx
  controls global desktop state

Dock.jsx and Nav.jsx
  ask App.jsx to open, close, lock, or shutdown

MacWindow.jsx
  gives every app the same macOS window behavior

TerminalWindow.jsx
  defines terminal commands

vite.config.js / api/gemini.js
  safely call Gemini with the secret API key

.env
  stores private local secrets
```

## Summary Of What Each Feature Uses

| Feature | Main Files |
| --- | --- |
| Dock open/close toggle | `App.jsx`, `Dock.jsx` |
| Open/close animation | `MacWindow.jsx`, `window.scss` |
| Window stacking | `App.jsx`, `MacWindow.jsx` |
| Fullscreen Resume/Spotify | `App.jsx`, `MacWindow.jsx` |
| Yellow fullscreen button | `MacWindow.jsx`, `window.scss` |
| Green minimise button | `MacWindow.jsx`, `window.scss` |
| Red close button | `MacWindow.jsx`, `window.scss` |
| Apple menu | `Nav.jsx`, `nav.scss` |
| Lock screen | `LockScreen.jsx`, `lockscreen.scss`, `App.jsx` |
| Shutdown screen | `LockScreen.jsx`, `App.jsx` |
| Prevent opening apps while locked | `Nav.jsx`, `App.jsx` |
| Hide dock while locked | `App.jsx` |
| Gemini terminal command | `TerminalWindow.jsx`, `vite.config.js`, `api/gemini.js` |
| Secret protection | `.gitignore`, `.env`, `.env.example` |

## Final Advice

When you add new apps later, follow the same pattern:

1. Add the app name to `windowState`.
2. Add a z-index value to `windowZIndex`.
3. Add a dock icon that calls `toggleWindow('appName')`.
4. Render the app in `App.jsx`.
5. Pass `isClosing`, `zIndex`, and `bringToFront` into it.
6. Wrap the app content in `MacWindow`.

That will automatically give the new app:

- opening animation
- closing animation
- minimise behavior
- fullscreen behavior
- stacking behavior
