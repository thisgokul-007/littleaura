import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled Application Error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((r) => r.unregister());
        });
      }
    } catch (e) {
      console.warn('Storage purge error:', e);
    }
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white border border-[#a7ebf2] rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-[#a7ebf2]/40 rounded-full flex items-center justify-center mx-auto mb-4 text-[#023859]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#011c40] mb-2">Display Reset Required</h1>
            <p className="text-[#023859]/80 text-sm mb-6 leading-relaxed">
              Your normal browser window had older cached data from an earlier session. Click below to clear stale cache and load LittleAura cleanly.
            </p>
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-4 bg-[#26658c] hover:bg-[#023859] text-white font-semibold rounded-xl transition duration-200 shadow"
              >
                Clear Stale Cache & Reload
              </button>
              <a
                href="/dashboard"
                className="inline-block text-xs text-[#54acbf] hover:text-[#023859] font-medium"
              >
                Or try regular refresh
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
