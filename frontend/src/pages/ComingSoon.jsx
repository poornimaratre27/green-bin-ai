const ComingSoon = ({ title }) => (
  <div className="flex h-full min-h-[60vh] flex-col items-center justify-center rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h1>
    <p className="mt-2 text-gray-500 dark:text-gray-400">This feature is coming soon.</p>
  </div>
)

export default ComingSoon
