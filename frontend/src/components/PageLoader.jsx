import Spinner from './Spinner'

const PageLoader = ({ label = 'Loading...' }) => (
  <div className="flex h-full min-h-[40vh] flex-col items-center justify-center gap-3 text-gray-500 dark:text-gray-400">
    <Spinner className="h-8 w-8" />
    <p className="text-sm">{label}</p>
  </div>
)

export default PageLoader
