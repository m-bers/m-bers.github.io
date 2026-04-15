# Android Browser Debugging via ADB + Chrome DevTools Protocol

Debug any Chrome-based browser (Chrome, Brave, Edge, WebViews) on Android from Termux using ADB wireless debugging and CDP.

## Prerequisites

- **Developer Options** enabled on the Android device
- **Wireless debugging** enabled in Developer Options
- `android-tools` package installed in Termux (`pkg install android-tools`)

## Setup

### 1. Pair ADB (one-time per device)

In Wireless debugging settings, tap **Pair device with pairing code**. Note the IP:port and code, then run quickly (code expires):

```bash
adb pair <ip>:<pairing-port> <code>
# Example: adb pair 192.168.50.244:43849 756230
```

### 2. Connect to device

The **IP address & Port** shown in the Wireless debugging screen (not the pairing port):

```bash
adb connect <ip>:<port>
# Example: adb connect 192.168.50.244:33061

adb devices  # Should show "device" status
```

### 3. Find browser debug sockets

Android browsers automatically expose a devtools Unix socket when ADB is connected:

```bash
adb shell cat /proc/net/unix | grep devtools
```

Output looks like:
```
@chrome_devtools_remote           # Generic (usually the foreground browser)
@chrome_devtools_remote_17512     # PID-specific (Chrome)
```

Multiple browsers = multiple sockets. The generic one is usually whichever browser was started first or is in the foreground.

### 4. Forward socket to TCP

```bash
adb forward tcp:9222 localabstract:chrome_devtools_remote
# Or for a specific browser PID:
adb forward tcp:9223 localabstract:chrome_devtools_remote_17512
```

### 5. Verify

```bash
curl -s http://localhost:9222/json/version  # Browser info
curl -s http://localhost:9222/json          # List open tabs
```

## CDP Endpoints

| Endpoint | Description |
|----------|-------------|
| `http://localhost:9222/json/version` | Browser version info |
| `http://localhost:9222/json` or `/json/list` | List of debuggable targets (tabs) |
| `ws://localhost:9222/devtools/browser` | WebSocket for browser-level control |
| `ws://localhost:9222/devtools/page/<targetId>` | WebSocket for a specific tab |

## Example: Navigate and read page content

```javascript
// cdp.mjs — run with: node cdp.mjs
const ws = new WebSocket("ws://localhost:9222/devtools/browser");
let id = 1;
let sid = null;

function send(method, params, s) {
  const msg = {id: id++, method, params};
  if (s) msg.sessionId = s;
  ws.send(JSON.stringify(msg));
}

ws.addEventListener("open", () => send("Target.getTargets"));

ws.addEventListener("message", (evt) => {
  const msg = JSON.parse(evt.data);

  // Find a page target and attach
  if (msg.result?.targetInfos) {
    const page = msg.result.targetInfos.find(t => t.type === "page");
    if (page) send("Target.attachToTarget", {targetId: page.targetId, flatten: true});
  }

  // Once attached, navigate and read content
  if (msg.result?.sessionId && !sid) {
    sid = msg.result.sessionId;
    send("Security.setIgnoreCertificateErrors", {ignore: true}, sid);
    send("Runtime.enable", {}, sid);
    send("Page.navigate", {url: "https://example.com"}, sid);

    setTimeout(() => {
      send("Runtime.evaluate", {
        expression: 'document.body.innerText',
        returnByValue: true
      }, sid);
    }, 5000);
  }

  // Print evaluation results
  if (msg.result?.result?.value && typeof msg.result.result.value === "string" && msg.id > 5) {
    console.log(msg.result.result.value);
    process.exit(0);
  }
});

setTimeout(() => process.exit(1), 15000);
```

## Common CDP commands

```javascript
// Bypass self-signed certs
send("Security.setIgnoreCertificateErrors", {ignore: true}, sessionId);

// Navigate
send("Page.navigate", {url: "https://localhost:8443"}, sessionId);

// Reload
send("Page.reload", {ignoreCache: true}, sessionId);

// Execute JavaScript
send("Runtime.evaluate", {
  expression: 'document.title',
  returnByValue: true
}, sessionId);

// Listen for console output
// (enable Runtime first, then watch for Runtime.consoleAPICalled events)
send("Runtime.enable", {}, sessionId);

// Take screenshot
send("Page.captureScreenshot", {format: "png"}, sessionId);
// Returns base64-encoded image in result.data
```

## Known issues

- **Brave**: The generic `@chrome_devtools_remote` socket may hang on `/json/list`. Use the PID-specific socket instead, or use `/json/version` to verify connectivity.
- **ADB forward persists** until the ADB connection drops. Re-run `adb forward` after reconnecting.
- **ADB connect** needs to be re-run after device restart, but pairing persists.
- **Node.js**: Built-in `WebSocket` (Node 22+) uses `addEventListener` not `.on()`. For `.on()` style, install the `ws` package.
- **Self-pairing**: ADB can pair a phone with itself (Termux → same phone). Install `android-tools` in Termux and pair using the wireless debugging info.
