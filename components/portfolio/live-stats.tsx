"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Eye, Radio } from "lucide-react";
import s from "./live-stats.module.css";

type Counts = { views: number; online: number };

export function LiveStats() {
  const path = usePathname();
  const [counts, setCounts] = useState<Counts | null>(null);
  const [failed, setFailed] = useState(false);
  const pageView = useRef<{ path: string; id: string } | null>(null);
  const visitor = useRef<string | null>(null);
  useEffect(() => {
    if (!pageView.current || pageView.current.path !== path)
      pageView.current = { path, id: crypto.randomUUID() };
    if (!visitor.current) {
      try {
        const saved = localStorage.getItem("ayeen-visitor");
        visitor.current =
          saved && /^[a-f0-9-]{36}$/.test(saved) ? saved : crypto.randomUUID();
        localStorage.setItem("ayeen-visitor", visitor.current);
      } catch {
        visitor.current = crypto.randomUUID();
      }
    }
    const body = JSON.stringify({
      sessionId: visitor.current,
      viewId: pageView.current.id,
    });
    const controller = new AbortController();
    let pending = false;
    const ping = async () => {
      if (document.hidden || pending || controller.signal.aborted) return;
      pending = true;
      try {
        const response = await fetch("/api/live", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Counter unavailable");
        const data = await response.json();
        if (
          !Number.isSafeInteger(data.views) ||
          !Number.isSafeInteger(data.online)
        )
          throw new Error("Invalid count");
        setCounts({ views: data.views, online: data.online });
        setFailed(false);
      } catch {
        if (!controller.signal.aborted) {
          setFailed(true);
          setCounts(null);
        }
      } finally {
        pending = false;
      }
    };
    void ping();
    const interval = setInterval(ping, 20000);
    document.addEventListener("visibilitychange", ping);
    return () => {
      controller.abort();
      clearInterval(interval);
      document.removeEventListener("visibilitychange", ping);
    };
  }, [path]);

  return (
    <div
      className={s.stats}
      aria-label="Live website activity"
      title="Online counts active browsers seen in the last minute. Views count page visits since this counter launched, not unique visitors."
    >
      {failed ? (
        <span className={s.unavailable}>Live stats unavailable</span>
      ) : (
        <>
          <span>
            <Radio size={12} aria-hidden="true" />
            <strong>
              {counts ? counts.online.toLocaleString("en-US") : "—"}
            </strong>{" "}
            here now
          </span>
          <span>
            <Eye size={12} aria-hidden="true" />
            <strong>
              {counts ? counts.views.toLocaleString("en-US") : "—"}
            </strong>{" "}
            {counts?.views === 1 ? "view" : "views"}
          </span>
        </>
      )}
    </div>
  );
}
