/**
 * Ivory ambient backdrop: soft teal & coral tint blobs plus a faint
 * engineering grid that fades toward the edges. Pure GPU gradients,
 * zero runtime cost.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Soft brand tint blobs */}
      <div className="absolute -top-48 left-1/2 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(20,125,124,0.10),transparent)] blur-2xl" />
      <div className="absolute top-[34%] -left-72 h-[520px] w-[680px] rounded-full bg-[radial-gradient(closest-side,rgba(255,107,74,0.09),transparent)] blur-2xl" />
      <div className="absolute -right-72 bottom-[-10rem] h-[540px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(255,158,122,0.10),transparent)] blur-2xl" />
      {/* Faint grid, masked toward the top like modern SaaS heroes */}
      <div className="grid-lines absolute inset-x-0 top-0 h-[80vh] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_0%,black,transparent_80%)]" />
    </div>
  );
}
