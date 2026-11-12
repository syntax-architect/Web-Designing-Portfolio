import ScrollVelocity from './reactbits/ScrollVelocity';

export function StudioRibbon() {
  return (
    <div
      aria-label="Studio capabilities overview"
      className="relative w-full max-w-full overflow-x-clip border-y border-hairline bg-surface/65 py-3.5 [contain:layout_paint] md:py-5"
    >
      <ScrollVelocity
        texts={[
          'Web Architecture (Agnish)   ·   React & Full-Stack   ·   Technical SEO   ·   Sub-Second Speed   ·   ',
          'Social Media Growth (Ayush)   ·   Lead Pipelines   ·   Conversion Copy   ·   Client Acquisition   ·   ',
        ]}
        velocity={30}
        numCopies={5}
        damping={45}
        stiffness={320}
        fadeEdges
        pauseOnHover
        skewWithVelocity={0.18}
        color="#0f3d3e"
        className="px-2 uppercase tracking-[0.12em] text-ink/80"
        scrollerClassName="!font-display !text-sm !font-semibold !leading-tight !tracking-[0.12em] !drop-shadow-none sm:!text-base md:!text-lg"
      />
    </div>
  );
}

