/**
 * Ivory ambient backdrop: soft drifting teal & coral tint blobs, faint
 * engineering grid, and ultra-subtle editorial grain. Pure GPU transforms,
 * lighter blur on phones for 60fps performance.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Soft drifting brand tint blobs (static on phones for 60fps touch scrolling) */}
      <div className="animate-float max-md:animate-none absolute -top-48 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(20,125,124,0.11),transparent)] blur-xl will-change-transform md:h-[560px] md:w-[980px] md:blur-2xl" />
      <div className="animate-float-reverse max-md:animate-none absolute top-[34%] -left-72 h-[380px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(255,107,74,0.10),transparent)] blur-xl will-change-transform md:h-[520px] md:w-[680px] md:blur-2xl" />
      <div className="animate-float max-md:animate-none absolute -right-72 bottom-[-10rem] h-[400px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(255,158,122,0.11),transparent)] blur-xl will-change-transform md:h-[540px] md:w-[760px] md:blur-2xl" />
      {/* Faint grid, masked toward the top */}
      <div className="grid-lines absolute inset-x-0 top-0 h-[75vh] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_0%,black,transparent_80%)] md:h-[80vh]" />
      {/* Subtle paper texture (hidden on small screens to avoid full-screen blend compositing overhead) */}
      <div className="bg-grain hidden absolute inset-0 opacity-[0.03] mix-blend-multiply sm:block" />
    </div>
  );
}
