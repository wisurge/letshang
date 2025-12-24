'use client';

export default function Header() {
  return (
    <nav className="flex items-center justify-between mb-8">
      {/* Logo and Navigation Menu */}
      <div className="flex items-center gap-8">
        <h1 className="text-4xl font-extralight text-white/95 tracking-tight">let&apos;s hang</h1>
        <a href="#" className="text-white/80 hover:text-white transition-colors font-medium text-base">
          Home
        </a>
        <a href="#" className="text-white/80 hover:text-white transition-colors font-medium text-base">
          People
        </a>
        <a href="#" className="text-white/80 hover:text-white transition-colors font-medium text-base">
          Search
        </a>
      </div>

      {/* Sign in CTA */}
      <div className="flex items-center">
        <button className="px-6 py-3 bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/15 text-white rounded-xl transition-all duration-200 font-medium shadow-md">
          Sign in
        </button>
      </div>
    </nav>
  );
}

