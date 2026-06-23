export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-white/40 sm:flex-row">
        <span>
          © {new Date().getFullYear()} Aarush Gupta. All rights reserved.
        </span>
        <span>
          Built with <span className="text-white/60">Next.js</span> &{" "}
          <span className="text-white/60">Tailwind CSS</span>
        </span>
      </div>
    </footer>
  );
}
