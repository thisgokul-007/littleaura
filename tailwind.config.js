/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Mandatory Light-Theme Palette at top-level (e.g. bg-pureWhite, text-navyBlue, bg-deepOcean, text-oceanTeal, bg-aquaMist, text-midnightNavy)
        aquaMist: '#a7ebf2',      // Soft highlight: selected panels, subtle backgrounds
        oceanTeal: '#54acbf',     // Interactive accent: secondary buttons, active indicators
        deepOcean: '#26658c',     // Primary action: main CTA buttons, interactive links
        navyBlue: '#023859',      // Strong contrast: headings, navigation labels, important text
        midnightNavy: '#011c40',  // Deep contrast: strong heading emphasis, branding
        pureWhite: '#ffffff',     // Primary surface: main page background, content surfaces

        // Namespaced aura palette for backwards-compatibility
        aura: {
          aquaMist: '#a7ebf2',
          oceanTeal: '#54acbf',
          deepOcean: '#26658c',
          navyBlue: '#023859',
          midnightNavy: '#011c40',
          pureWhite: '#ffffff',
          blue: '#26658c',
          mint: '#54acbf',
          lavender: '#a7ebf2',
          yellow: '#d97706',
          softBg: '#ffffff',
          darkBg: '#011c40',
          darkSurface: '#ffffff',
          textDark: '#011c40',
          mutedText: '#64748b',
          darkBorder: '#e2e8f0',
          lightBorder: '#e2e8f0',
        }
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(2, 56, 89, 0.05)',
        'subtle': '0 1px 3px 0 rgba(2, 56, 89, 0.05), 0 1px 2px -1px rgba(2, 56, 89, 0.05)',
        'card': '0 4px 16px -2px rgba(2, 56, 89, 0.06), 0 2px 6px -2px rgba(2, 56, 89, 0.04)',
        'elevated': '0 10px 25px -5px rgba(2, 56, 89, 0.08), 0 8px 10px -6px rgba(2, 56, 89, 0.04)',
        'aura-glow': '0 0 20px -3px rgba(167, 235, 242, 0.6)',
        'ai-glow': '0 0 25px -3px rgba(84, 172, 191, 0.35)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
