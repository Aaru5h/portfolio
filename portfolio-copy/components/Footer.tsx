export default function Footer() {
  return (
    <footer className="px-6 pb-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="label">
          © {new Date().getFullYear()} Aarush Gupta — All rights reserved
        </span>
        <span className="label">Next.js · Tailwind · Framer Motion</span>
        <a href="#" className="label hover:text-accent transition-colors">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
