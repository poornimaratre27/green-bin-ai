const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-2 py-1">
    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s] dark:bg-gray-500" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s] dark:bg-gray-500" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500" />
  </div>
)

export default TypingIndicator
