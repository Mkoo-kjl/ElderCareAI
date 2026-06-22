import React, { useState } from 'react';
import Logo from './Logo';

export default function AdminLogin({ onLogin, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    // Simulate network delay for a more realistic dashboard login experience
    setTimeout(() => {
      if (username.trim() === 'admin' && password === 'admin123') {
        localStorage.setItem('admin_authenticated', 'true');
        onLogin();
      } else {
        setError('Invalid username or password. Please try again.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden font-body px-4 py-8">
      {/* Decorative background glow circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-leaf/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky/10 blur-[120px] pointer-events-none" />
      
      {/* Dynamic line vector styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="w-full max-w-md z-10 animate-fade-up">
        {/* Logo and header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo wordmark={true} variant="light" className="mb-4" />
          <h2 className="font-display text-2xl font-bold text-white mt-2">
            Administrator Portal
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Access secure IoT monitoring and system configurations
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-card p-8 shadow-2xl relative">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-950/50 border border-red-800 rounded-lg text-red-300 text-xs flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Username field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-leaf transition-colors duration-200"
                  placeholder="Enter admin username"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-leaf transition-colors duration-200"
                  placeholder="Enter admin password"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-leaf text-white font-semibold py-3 rounded-full hover:bg-leaf-dark active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-leaf/15"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>

              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="w-full bg-transparent border border-slate-850 hover:bg-slate-800/40 text-slate-400 hover:text-white py-3 rounded-full text-sm font-medium transition-colors duration-200"
              >
                Cancel & Return
              </button>
            </div>
          </form>

          {/* Credential Helper Info */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <div className="inline-block bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-850">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest block mb-1">
                Demo Credentials
              </span>
              <code className="text-xs text-sky font-mono">
                User: <span className="text-white font-bold">admin</span> &bull; Pass: <span className="text-white font-bold">admin123</span>
              </code>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
