export function GeometricPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="islamic-star" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M40,0 L48,32 L80,40 L48,48 L40,80 L32,48 L0,40 L32,32 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M40,10 L45,32 L70,40 L45,48 L40,70 L35,48 L10,40 L35,32 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="40" cy="40" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-star)" />
      </svg>
    </div>
  )
}

export function BorderPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-500/20 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-500/20 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-500/20 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-500/20 rounded-br-lg" />
    </div>
  )
}

export function ArabicPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="arabic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M50,0 L100,50 L50,100 L0,50 Z M50,20 L80,50 L50,80 L20,50 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path
              d="M50,0 C70,25 70,75 50,100 C30,75 30,25 50,0 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arabic-pattern)" />
      </svg>
    </div>
  )
}

