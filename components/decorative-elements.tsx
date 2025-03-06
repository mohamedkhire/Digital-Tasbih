export function Crescent() {
  return (
    <div className="absolute top-4 right-4 transform rotate-[20deg] opacity-80">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-emerald-600 dark:text-emerald-400"
      >
        <path
          d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C12.83 21 13.63 20.88 14.39 20.67C11.31 19.64 9 16.58 9 13C9 9.42 11.31 6.36 14.39 5.33C13.63 5.12 12.83 5 12 5"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-emerald-500 dark:text-emerald-400 ${className}`}
    >
      <path d="M12 2L14.4 9.6H22L15.8 14.4L18.2 22L12 17.2L5.8 22L8.2 14.4L2 9.6H9.6L12 2Z" fill="currentColor" />
    </svg>
  )
}

export function Lantern() {
  return (
    <div className="absolute top-4 left-4 transform -rotate-[10deg] opacity-80">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-emerald-600 dark:text-emerald-400"
      >
        <path
          d="M8 2H16M12 2V4M5 4H19M6 4V14C6 15.1046 6.89543 16 8 16H16C17.1046 16 18 15.1046 18 14V4M10 16V18M14 16V18M7 18H17M9 21H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export function DecorativeBorder() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
    </div>
  )
}

