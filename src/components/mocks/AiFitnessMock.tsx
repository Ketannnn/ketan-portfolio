/**
 * Lightweight static mock of the AI Fitness Trainer dashboard.
 * Purely presentational — no state, no interactions.
 * Represents the app's real-time coaching UI.
 */
export function AiFitnessMock() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0f] font-mono text-xs select-none">
      {/* Top bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8 bg-white/3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-zinc-500">AI Fitness Trainer</span>
        <span className="ml-auto text-[10px] flex items-center gap-1.5 text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-white/8 border-b border-white/8">
        {[
          { label: "Reps", value: "12/15", color: "text-accent" },
          { label: "Posture", value: "92%", color: "text-emerald-400" },
          { label: "Streak", value: "4 days", color: "text-yellow-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="px-4 py-3 flex flex-col items-center gap-1">
            <span className={`text-lg font-bold ${color}`}>{value}</span>
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{label}</span>
          </div>
        ))}
      </div>

      {/* Pose detection panel */}
      <div className="px-4 py-4 border-b border-white/8">
        <p className="text-[10px] tracking-widest uppercase text-zinc-600 mb-3">
          Pose Keypoints — MediaPipe
        </p>
        <div className="flex items-end gap-1 h-10">
          {[0.6, 0.85, 0.92, 0.78, 0.95, 0.88, 0.72, 0.91].map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-accent/40"
              style={{ height: `${v * 100}%` }}
            />
          ))}
        </div>
        <p className="text-[10px] text-emerald-400 mt-2">✓ Keypoints detected — 17/17</p>
      </div>

      {/* AI feedback */}
      <div className="px-4 py-3">
        <p className="text-[10px] tracking-widest uppercase text-zinc-600 mb-2">
          AI Feedback
        </p>
        <p className="text-zinc-400 text-[11px] leading-relaxed">
          <span className="text-accent">▶</span>{" "}
          Good form. Keep your back straight and lower slower on the next rep.
        </p>
      </div>
    </div>
  );
}
