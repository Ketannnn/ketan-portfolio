interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  /** Highlights this item as the most recent/current role */
  current?: boolean;
  /** Last item — hides the connector line below the dot */
  last?: boolean;
}

/**
 * Single entry in the Experience timeline.
 * Renders a left-border dot connector, role title, company, and date range.
 */
export function TimelineItem({
  title,
  company,
  period,
  current = false,
  last = false,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-5">
      {/* Vertical connector line + dot */}
      <div className="flex flex-col items-center">
        <div
          className={`mt-1.5 h-3 w-3 rounded-full border-2 shrink-0 z-10
            ${current
              ? "border-accent bg-accent shadow-[0_0_10px_rgba(99,102,241,0.6)]"
              : "border-zinc-600 bg-zinc-800"
            }`}
        />
        {!last && (
          <div className="w-px flex-1 bg-gradient-to-b from-zinc-700 to-transparent mt-1" />
        )}
      </div>

      {/* Content */}
      <div className="pb-8">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          {current && (
            <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full bg-accent-muted border border-accent/30 text-accent">
              Current
            </span>
          )}
        </div>
        <p className="text-sm font-medium text-zinc-300">{company}</p>
        {period && (
          <p className="text-xs text-muted mt-0.5">{period}</p>
        )}
      </div>
    </div>
  );
}
