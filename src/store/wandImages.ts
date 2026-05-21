/**
 * Generates unique inline SVG data URLs for each wand.
 * Colour palette is keyed by alignment:
 *   Good    — golds, whites, blues
 *   Neutral — greens, greys, purples
 *   Evil    — reds, blacks, dark purples
 */

interface WandSvgConfig {
  bgFrom: string
  bgTo: string
  shaftColor: string
  gemColor: string
  glowColor: string
  accentColor: string
  sparkColor: string
}

const wandConfigs: Record<string, WandSvgConfig> = {
  // Good — 12 wands
  'good-001': { bgFrom: '#1a1a2e', bgTo: '#16213e', shaftColor: '#f5f0dc', gemColor: '#ffe066', glowColor: '#fffbe0', accentColor: '#e8c84a', sparkColor: '#ffffff' },
  'good-002': { bgFrom: '#0d1f3c', bgTo: '#1a3a5c', shaftColor: '#e8d5b0', gemColor: '#aad4ff', glowColor: '#cce8ff', accentColor: '#ffd700', sparkColor: '#e0f4ff' },
  'good-003': { bgFrom: '#1c2240', bgTo: '#26306a', shaftColor: '#d4b896', gemColor: '#ffd060', glowColor: '#fff5cc', accentColor: '#f0c030', sparkColor: '#ffeeaa' },
  'good-004': { bgFrom: '#1a1a2e', bgTo: '#0f3460', shaftColor: '#c8d8e8', gemColor: '#c0d8ff', glowColor: '#e8f4ff', accentColor: '#8ab4d4', sparkColor: '#ffffff' },
  'good-005': { bgFrom: '#0a1f0a', bgTo: '#1a3a1a', shaftColor: '#8db87a', gemColor: '#66dd66', glowColor: '#ccffcc', accentColor: '#44aa44', sparkColor: '#aaffaa' },
  'good-006': { bgFrom: '#1a2030', bgTo: '#2a3060', shaftColor: '#f0ece0', gemColor: '#ffeecc', glowColor: '#fff8e8', accentColor: '#e0c080', sparkColor: '#ffffff' },
  'good-007': { bgFrom: '#2a1800', bgTo: '#4a2800', shaftColor: '#ffd070', gemColor: '#ff9900', glowColor: '#ffdd88', accentColor: '#ffcc00', sparkColor: '#fff0a0' },
  'good-008': { bgFrom: '#001a2e', bgTo: '#002a4a', shaftColor: '#c0ddf0', gemColor: '#88ccff', glowColor: '#ccecff', accentColor: '#4499cc', sparkColor: '#e8f8ff' },
  'good-009': { bgFrom: '#060a20', bgTo: '#0a1040', shaftColor: '#8898cc', gemColor: '#ccddff', glowColor: '#dde8ff', accentColor: '#5566aa', sparkColor: '#eeeeff' },
  'good-010': { bgFrom: '#1a1400', bgTo: '#3a2c00', shaftColor: '#f0d880', gemColor: '#ffe040', glowColor: '#fff5b0', accentColor: '#ffc020', sparkColor: '#fffad0' },
  'good-011': { bgFrom: '#0a1828', bgTo: '#102840', shaftColor: '#b8d4e8', gemColor: '#99ccee', glowColor: '#d0e8f8', accentColor: '#5588bb', sparkColor: '#e8f4ff' },
  'good-012': { bgFrom: '#1a1620', bgTo: '#2a2030', shaftColor: '#e8e0f0', gemColor: '#ddb0ff', glowColor: '#f0ddff', accentColor: '#c090e8', sparkColor: '#f8f0ff' },

  // Neutral — 12 wands
  'neut-001': { bgFrom: '#121220', bgTo: '#1e1e38', shaftColor: '#b0b8d0', gemColor: '#8898cc', glowColor: '#c8d0e8', accentColor: '#6677aa', sparkColor: '#d8e0f0' },
  'neut-002': { bgFrom: '#1a1a14', bgTo: '#2e2e1a', shaftColor: '#e0d8c0', gemColor: '#ccbb88', glowColor: '#eeebda', accentColor: '#aa9944', sparkColor: '#f5f0e0' },
  'neut-003': { bgFrom: '#001020', bgTo: '#001a38', shaftColor: '#a0c0d8', gemColor: '#44aacc', glowColor: '#bbddf0', accentColor: '#228899', sparkColor: '#cceeee' },
  'neut-004': { bgFrom: '#181018', bgTo: '#2a1a2a', shaftColor: '#d0c0d8', gemColor: '#c8a0e0', glowColor: '#ecddf8', accentColor: '#9966bb', sparkColor: '#f0e0ff' },
  'neut-005': { bgFrom: '#181614', bgTo: '#2a2622', shaftColor: '#b0a898', gemColor: '#a0988a', glowColor: '#dcd8d0', accentColor: '#887868', sparkColor: '#e8e4dc' },
  'neut-006': { bgFrom: '#0c0c10', bgTo: '#181820', shaftColor: '#c8c8d0', gemColor: '#d0d0e0', glowColor: '#e8e8f0', accentColor: '#8888a0', sparkColor: '#f0f0f8' },
  'neut-007': { bgFrom: '#100c08', bgTo: '#1e1810', shaftColor: '#b4986a', gemColor: '#c8a850', glowColor: '#ddc880', accentColor: '#8a6820', sparkColor: '#eecc80' },
  'neut-008': { bgFrom: '#0a0818', bgTo: '#120e28', shaftColor: '#9080c0', gemColor: '#8888dd', glowColor: '#c0b8e8', accentColor: '#6655aa', sparkColor: '#d8d0f8' },
  'neut-009': { bgFrom: '#141008', bgTo: '#241c10', shaftColor: '#c8a860', gemColor: '#d4a030', glowColor: '#eec870', accentColor: '#aa7810', sparkColor: '#f8e090' },
  'neut-010': { bgFrom: '#0c1018', bgTo: '#181e2e', shaftColor: '#788898', gemColor: '#6688bb', glowColor: '#aabbdd', accentColor: '#446688', sparkColor: '#ccd8ee' },
  'neut-011': { bgFrom: '#0a1410', bgTo: '#14201a', shaftColor: '#6aaa80', gemColor: '#44cc88', glowColor: '#88ddaa', accentColor: '#229955', sparkColor: '#aaeebb' },
  'neut-012': { bgFrom: '#141414', bgTo: '#202020', shaftColor: '#a0a0a0', gemColor: '#b8b8b8', glowColor: '#d8d8d8', accentColor: '#787878', sparkColor: '#e8e8e8' },

  // Evil — 12 wands
  'evil-001': { bgFrom: '#0a0008', bgTo: '#160010', shaftColor: '#3a0030', gemColor: '#cc0066', glowColor: '#880044', accentColor: '#ff0088', sparkColor: '#ffaacc' },
  'evil-002': { bgFrom: '#060608', bgTo: '#0e0e16', shaftColor: '#2a2840', gemColor: '#5544aa', glowColor: '#4433880', accentColor: '#9988dd', sparkColor: '#ccbbff' },
  'evil-003': { bgFrom: '#080808', bgTo: '#140a00', shaftColor: '#5a3810', gemColor: '#884400', glowColor: '#aa6622', accentColor: '#cc8833', sparkColor: '#ddaa66' },
  'evil-004': { bgFrom: '#080600', bgTo: '#140e00', shaftColor: '#3a6010', gemColor: '#668800', glowColor: '#88aa22', accentColor: '#aacc44', sparkColor: '#ccee88' },
  'evil-005': { bgFrom: '#040808', bgTo: '#081408', shaftColor: '#224422', gemColor: '#336622', glowColor: '#448833', accentColor: '#55aa44', sparkColor: '#88cc77' },
  'evil-006': { bgFrom: '#100008', bgTo: '#1e0010', shaftColor: '#6a0020', gemColor: '#aa0033', glowColor: '#cc2244', accentColor: '#dd4466', sparkColor: '#ffaabb' },
  'evil-007': { bgFrom: '#100400', bgTo: '#200800', shaftColor: '#5a2000', gemColor: '#cc4400', glowColor: '#ee6600', accentColor: '#ff8800', sparkColor: '#ffcc88' },
  'evil-008': { bgFrom: '#080808', bgTo: '#101018', shaftColor: '#282840', gemColor: '#444488', glowColor: '#6666aa', accentColor: '#8888cc', sparkColor: '#bbbbee' },
  'evil-009': { bgFrom: '#060404', bgTo: '#0e0808', shaftColor: '#300808', gemColor: '#5a0a0a', glowColor: '#7a1c1c', accentColor: '#aa3333', sparkColor: '#cc7777' },
  'evil-010': { bgFrom: '#120200', bgTo: '#200400', shaftColor: '#5c1400', gemColor: '#cc2200', glowColor: '#ee4400', accentColor: '#ff6622', sparkColor: '#ffaa66' },
  'evil-011': { bgFrom: '#0a0004', bgTo: '#14000a', shaftColor: '#2a0028', gemColor: '#660055', glowColor: '#880077', accentColor: '#aa0099', sparkColor: '#dd55cc' },
  'evil-012': { bgFrom: '#020202', bgTo: '#080808', shaftColor: '#111118', gemColor: '#222244', glowColor: '#334466', accentColor: '#4455aa', sparkColor: '#8899dd' },
}

const defaultConfig: WandSvgConfig = {
  bgFrom: '#0d0d1a',
  bgTo: '#1a1a33',
  shaftColor: '#aaaacc',
  gemColor: '#8888ff',
  glowColor: '#ccccff',
  accentColor: '#6666cc',
  sparkColor: '#ddddff',
}

function buildSvg(wandId: string, cfg: WandSvgConfig): string {
  // Use wandId as a seed for slight visual variation
  const seed = wandId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const shimmerOffset = (seed % 20) - 10
  const gemY = 60 + (seed % 15)
  const wandAngle = -10 + (seed % 8)

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
  <defs>
    <linearGradient id="bg${wandId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${cfg.bgFrom}"/>
      <stop offset="100%" stop-color="${cfg.bgTo}"/>
    </linearGradient>
    <linearGradient id="shaft${wandId}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${cfg.accentColor}" stop-opacity="0.6"/>
      <stop offset="40%" stop-color="${cfg.shaftColor}"/>
      <stop offset="60%" stop-color="${cfg.shaftColor}"/>
      <stop offset="100%" stop-color="${cfg.accentColor}" stop-opacity="0.6"/>
    </linearGradient>
    <radialGradient id="gem${wandId}" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="${cfg.glowColor}"/>
      <stop offset="50%" stop-color="${cfg.gemColor}"/>
      <stop offset="100%" stop-color="${cfg.accentColor}"/>
    </radialGradient>
    <filter id="glow${wandId}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softglow${wandId}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="200" height="240" fill="url(#bg${wandId})" rx="12"/>

  <!-- Star field -->
  <circle cx="${40 + shimmerOffset}" cy="30" r="1" fill="${cfg.sparkColor}" opacity="0.6"/>
  <circle cx="${80 + shimmerOffset}" cy="20" r="1.5" fill="${cfg.sparkColor}" opacity="0.5"/>
  <circle cx="${140 - shimmerOffset}" cy="35" r="1" fill="${cfg.sparkColor}" opacity="0.7"/>
  <circle cx="${170 + shimmerOffset}" cy="18" r="1.5" fill="${cfg.sparkColor}" opacity="0.4"/>
  <circle cx="${20 - shimmerOffset}" cy="50" r="1" fill="${cfg.sparkColor}" opacity="0.5"/>
  <circle cx="${160 + shimmerOffset}" cy="55" r="1" fill="${cfg.sparkColor}" opacity="0.6"/>
  <circle cx="${110 - shimmerOffset}" cy="10" r="1" fill="${cfg.sparkColor}" opacity="0.8"/>
  <circle cx="${55 + shimmerOffset}" cy="200" r="1" fill="${cfg.sparkColor}" opacity="0.4"/>
  <circle cx="${155 - shimmerOffset}" cy="210" r="1.5" fill="${cfg.sparkColor}" opacity="0.3"/>

  <!-- Wand glow aura -->
  <ellipse cx="100" cy="${120 + gemY / 4}" rx="18" ry="80" fill="${cfg.gemColor}" opacity="0.08" filter="url(#glow${wandId})"/>

  <!-- Wand shaft -->
  <g transform="rotate(${wandAngle}, 100, 120)">
    <!-- Handle wrap lines -->
    <line x1="100" y1="170" x2="100" y2="185" stroke="${cfg.accentColor}" stroke-width="5" stroke-linecap="round" opacity="0.5"/>
    <line x1="97" y1="172" x2="103" y2="172" stroke="${cfg.accentColor}" stroke-width="1.5" opacity="0.7"/>
    <line x1="97" y1="176" x2="103" y2="176" stroke="${cfg.accentColor}" stroke-width="1.5" opacity="0.7"/>
    <line x1="97" y1="180" x2="103" y2="180" stroke="${cfg.accentColor}" stroke-width="1.5" opacity="0.7"/>

    <!-- Main shaft -->
    <rect x="97" y="${gemY + 16}" width="6" height="${170 - gemY - 16}" fill="url(#shaft${wandId})" rx="3" filter="url(#softglow${wandId})"/>

    <!-- Shaft tip -->
    <polygon points="97,${gemY + 16} 100,${gemY + 4} 103,${gemY + 16}" fill="${cfg.shaftColor}" opacity="0.9"/>

    <!-- Ferrule (decorative band) -->
    <rect x="95" y="${gemY + 20}" width="10" height="5" fill="${cfg.accentColor}" rx="1" opacity="0.8"/>

    <!-- Gem -->
    <circle cx="100" cy="${gemY}" r="14" fill="${cfg.gemColor}" opacity="0.25" filter="url(#glow${wandId})"/>
    <circle cx="100" cy="${gemY}" r="10" fill="url(#gem${wandId})" filter="url(#softglow${wandId})"/>
    <circle cx="96" cy="${gemY - 3}" r="3" fill="${cfg.glowColor}" opacity="0.6"/>
    <circle cx="104" cy="${gemY + 2}" r="1.5" fill="${cfg.glowColor}" opacity="0.4"/>

    <!-- Magic sparks -->
    <line x1="100" y1="${gemY - 14}" x2="${100 + shimmerOffset / 2}" y2="${gemY - 24}" stroke="${cfg.sparkColor}" stroke-width="1.5" opacity="0.7" stroke-linecap="round"/>
    <line x1="100" y1="${gemY - 14}" x2="${90 - shimmerOffset / 3}" y2="${gemY - 22}" stroke="${cfg.sparkColor}" stroke-width="1" opacity="0.5" stroke-linecap="round"/>
    <line x1="100" y1="${gemY - 14}" x2="${112 + shimmerOffset / 4}" y2="${gemY - 20}" stroke="${cfg.sparkColor}" stroke-width="1" opacity="0.5" stroke-linecap="round"/>
  </g>

  <!-- Subtle vignette -->
  <radialGradient id="vig${wandId}" cx="50%" cy="50%" r="70%">
    <stop offset="60%" stop-color="transparent"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0.5"/>
  </radialGradient>
  <rect width="200" height="240" fill="url(#vig${wandId})" rx="12"/>
</svg>`
}

/**
 * Returns a unique SVG as a data URL for the given wand ID.
 */
export function getWandSvg(wandId: string): string {
  const cfg = wandConfigs[wandId] ?? defaultConfig
  const svg = buildSvg(wandId, cfg)
  const encoded = encodeURIComponent(svg)
  return `data:image/svg+xml,${encoded}`
}
