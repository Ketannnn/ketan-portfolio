import { useState, useEffect } from "react";

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  response: object;
  status: number;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET",
    path: "/api/users",
    status: 200,
    response: {
      status: "ok",
      count: 3,
      data: [
        { id: 1, name: "Ketan Devraj", role: "admin" },
        { id: 2, name: "Jane Smith", role: "user" },
      ],
    },
  },
  {
    method: "POST",
    path: "/api/auth",
    status: 200,
    response: {
      status: "ok",
      token: "eyJhbGciOiJIUzI1NiJ9.payload.signature",
      expires_in: 3600,
    },
  },
  {
    method: "GET",
    path: "/api/orders",
    status: 200,
    response: {
      status: "ok",
      orders: [
        { id: "ORD-001", amount: 149.99, state: "shipped" },
        { id: "ORD-002", amount: 89.0, state: "pending" },
      ],
    },
  },
  {
    method: "DELETE",
    path: "/api/session",
    status: 204,
    response: { status: "ok", message: "Session terminated." },
  },
  {
    method: "PUT",
    path: "/api/profile",
    status: 200,
    response: {
      status: "ok",
      updated: { name: "Ketan Devraj", location: "Pune, India" },
    },
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  POST: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  PUT: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  DELETE: "text-red-400 bg-red-400/10 border-red-400/20",
};

const STATUS_COLORS: Record<number, string> = {
  200: "text-emerald-400",
  204: "text-emerald-400",
  401: "text-red-400",
  500: "text-red-400",
};

/**
 * Interactive API Console mock.
 * Simulates selecting an endpoint and viewing a formatted JSON response.
 * No real network calls — all data is local fixtures.
 */
export function ApiConsoleMock() {
  const [selected, setSelected] = useState<Endpoint>(ENDPOINTS[0]);
  const [loading, setLoading] = useState(false);
  const [displayed, setDisplayed] = useState<Endpoint>(ENDPOINTS[0]);

  // Simulated network delay with proper cleanup.
  // If the component unmounts before 500ms, the timer is cancelled
  // and no state update is attempted on an unmounted component.
  useEffect(() => {
    if (selected.path === displayed.path) return;
    setLoading(true);
    const timer = setTimeout(() => {
      setDisplayed(selected);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selected]);

  const handleSelect = (ep: Endpoint) => {
    if (ep.path === selected.path || loading) return;
    setSelected(ep);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0f] text-xs font-mono select-none">
      {/* Top bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8 bg-white/3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-zinc-500">API Support Console</span>
      </div>

      <div className="flex h-56">
        {/* Endpoint list */}
        <div className="w-40 border-r border-white/8 flex flex-col overflow-y-auto py-2 shrink-0">
          <p className="px-3 py-1.5 text-[10px] tracking-widest uppercase text-zinc-600">
            Endpoints
          </p>
          {ENDPOINTS.map((ep) => {
            const isActive = selected.path === ep.path;
            return (
              <button
                key={ep.path}
                type="button"
                onClick={() => handleSelect(ep)}
                className={`w-full text-left px-3 py-2 transition-colors duration-150 flex flex-col gap-0.5
                  ${isActive ? "bg-accent/10 border-l-2 border-accent" : "hover:bg-white/4 border-l-2 border-transparent"}`}
              >
                <span
                  className={`text-[10px] font-bold px-1 py-0.5 rounded border ${METHOD_COLORS[ep.method]}`}
                >
                  {ep.method}
                </span>
                <span className="text-zinc-400 text-[10px] truncate">
                  {ep.path}
                </span>
              </button>
            );
          })}
        </div>

        {/* Response pane */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center gap-3 px-4 py-2 border-b border-white/8 bg-white/2">
            <span className={`font-bold ${METHOD_COLORS[selected.method]} text-[10px] px-1.5 py-0.5 rounded border`}>
              {selected.method}
            </span>
            <span className="text-zinc-400 flex-1 truncate">{selected.path}</span>
            {!loading && (
              <span className={`font-bold text-[10px] ${STATUS_COLORS[displayed.status] ?? "text-zinc-400"}`}>
                {displayed.status} OK
              </span>
            )}
          </div>

          {/* JSON response */}
          <div className="flex-1 overflow-auto p-4">
            {loading ? (
              <div className="flex items-center gap-2 text-zinc-600">
                <span className="animate-spin inline-block h-3 w-3 border border-accent border-t-transparent rounded-full" />
                <span>Sending request...</span>
              </div>
            ) : (
              <pre className="text-[11px] leading-relaxed whitespace-pre-wrap">
                <SyntaxHighlight json={displayed.response} />
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Very lightweight JSON syntax colorizer */
function SyntaxHighlight({ json }: { json: object }) {
  const str = JSON.stringify(json, null, 2);
  const parts = str.split(/("(?:[^"\\]|\\.)*"(?:\s*:)?|\b\d+\.?\d*\b|true|false|null)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (/^".*":$/.test(part))
          return <span key={i} className="text-blue-300">{part}</span>;
        if (/^"/.test(part))
          return <span key={i} className="text-emerald-300">{part}</span>;
        if (/^\d/.test(part))
          return <span key={i} className="text-yellow-300">{part}</span>;
        if (part === "true" || part === "false")
          return <span key={i} className="text-purple-300">{part}</span>;
        if (part === "null")
          return <span key={i} className="text-red-300">{part}</span>;
        return <span key={i} className="text-zinc-400">{part}</span>;
      })}
    </>
  );
}
