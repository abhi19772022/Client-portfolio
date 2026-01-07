interface VSCodeProps {
  isDarkMode?: boolean
}

// Replace VSCode component with an iframe
export default function VSCode({ isDarkMode = true }: VSCodeProps) {
  return (
    <div 
      className="h-full w-full"
      style={{
        background: 'rgba(255, 255, 255, 0)',
        backdropFilter: 'blur(10.9px)',
        WebkitBackdropFilter: 'blur(10.9px)',
      }}
    >
      <iframe
        src="https://github1s.com/daprior/danielprior-macos/blob/main/README.md"
        className="w-full h-full border-0"
        title="VSCode Project View"
      />
    </div>
  )
}
