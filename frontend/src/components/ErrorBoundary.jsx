import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center dark:bg-gray-900">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Something went wrong</h1>
          <p className="text-gray-500 dark:text-gray-400">Please refresh the page and try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
          >
            Refresh
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
