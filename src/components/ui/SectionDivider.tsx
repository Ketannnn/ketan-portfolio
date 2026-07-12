/**
 * SectionDivider
 * A subtle gradient horizontal rule used between major page sections.
 * Creates visual breathing room and section identity without adding
 * heavy decorative weight. Matches the page's max-width for alignment.
 */
export function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="max-w-6xl mx-auto px-4 sm:px-6"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </div>
  );
}
