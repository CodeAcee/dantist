import {
  i as fs,
  e as Ur,
  d as ps,
  c as Dr,
  f as Mr,
  b as at,
  u as gs,
  M as ms,
  j as d,
  m as ot,
} from "./use-motion-value.BnOC8dny.js";
import { r as j } from "./index.CVf8TyFT.js";
/* empty css                       */ function ys(...t) {
  const e = !Array.isArray(t[0]),
    r = e ? 0 : -1,
    s = t[0 + r],
    n = t[1 + r],
    i = t[2 + r],
    a = t[3 + r],
    o = fs(n, i, a);
  return e ? o(s) : o;
}
function Br(t, e) {
  const r = Ur(e()),
    s = () => r.set(e());
  return (
    s(),
    ps(() => {
      const n = () => Mr.preRender(s, !1, !0),
        i = t.map((a) => a.on("change", n));
      return () => {
        (i.forEach((a) => a()), Dr(s));
      };
    }),
    r
  );
}
function vs(t) {
  ((at.current = []), t());
  const e = Br(at.current, t);
  return ((at.current = void 0), e);
}
function bs(t, e, r, s) {
  if (typeof t == "function") return vs(t);
  const i = typeof e == "function" ? e : ys(e, r, s),
    a = Array.isArray(t) ? Lt(t, i) : Lt([t], ([l]) => i(l)),
    o = Array.isArray(t) ? void 0 : t.accelerate;
  return (
    o &&
      !o.isTransformed &&
      typeof e != "function" &&
      Array.isArray(r) &&
      s?.clamp !== !1 &&
      (a.accelerate = { ...o, times: e, keyframes: r, isTransformed: !0 }),
    a
  );
}
function Lt(t, e) {
  const r = gs(() => []);
  return Br(t, () => {
    r.length = 0;
    const s = t.length;
    for (let n = 0; n < s; n++) r[n] = t[n].get();
    return e(r);
  });
}
function ws(t) {
  const e = j.useRef(0),
    { isStatic: r } = j.useContext(ms);
  j.useEffect(() => {
    if (r) return;
    const s = ({ timestamp: n, delta: i }) => {
      (e.current || (e.current = n), t(n - e.current, i));
    };
    return (Mr.update(s, !0), () => Dr(s));
  }, [t]);
}
function rt(t, e) {
  var r = {};
  for (var s in t)
    Object.prototype.hasOwnProperty.call(t, s) &&
      e.indexOf(s) < 0 &&
      (r[s] = t[s]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, s = Object.getOwnPropertySymbols(t); n < s.length; n++)
      e.indexOf(s[n]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(t, s[n]) &&
        (r[s[n]] = t[s[n]]);
  return r;
}
function _s(t, e, r, s) {
  function n(i) {
    return i instanceof r
      ? i
      : new r(function (a) {
          a(i);
        });
  }
  return new (r || (r = Promise))(function (i, a) {
    function o(h) {
      try {
        c(s.next(h));
      } catch (u) {
        a(u);
      }
    }
    function l(h) {
      try {
        c(s.throw(h));
      } catch (u) {
        a(u);
      }
    }
    function c(h) {
      h.done ? i(h.value) : n(h.value).then(o, l);
    }
    c((s = s.apply(t, e || [])).next());
  });
}
const xs = (t) => (t ? (...e) => t(...e) : (...e) => fetch(...e));
class It extends Error {
  constructor(e, r = "FunctionsError", s) {
    (super(e), (this.name = r), (this.context = s));
  }
  toJSON() {
    return { name: this.name, message: this.message, context: this.context };
  }
}
class Ss extends It {
  constructor(e) {
    super(
      "Failed to send a request to the Edge Function",
      "FunctionsFetchError",
      e,
    );
  }
}
class Nt extends It {
  constructor(e) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", e);
  }
}
class Ut extends It {
  constructor(e) {
    super(
      "Edge Function returned a non-2xx status code",
      "FunctionsHttpError",
      e,
    );
  }
}
var vt;
(function (t) {
  ((t.Any = "any"),
    (t.ApNortheast1 = "ap-northeast-1"),
    (t.ApNortheast2 = "ap-northeast-2"),
    (t.ApSouth1 = "ap-south-1"),
    (t.ApSoutheast1 = "ap-southeast-1"),
    (t.ApSoutheast2 = "ap-southeast-2"),
    (t.CaCentral1 = "ca-central-1"),
    (t.EuCentral1 = "eu-central-1"),
    (t.EuWest1 = "eu-west-1"),
    (t.EuWest2 = "eu-west-2"),
    (t.EuWest3 = "eu-west-3"),
    (t.SaEast1 = "sa-east-1"),
    (t.UsEast1 = "us-east-1"),
    (t.UsWest1 = "us-west-1"),
    (t.UsWest2 = "us-west-2"));
})(vt || (vt = {}));
class ks {
  constructor(e, { headers: r = {}, customFetch: s, region: n = vt.Any } = {}) {
    ((this.url = e),
      (this.headers = r),
      (this.region = n),
      (this.fetch = xs(s)));
  }
  setAuth(e) {
    this.headers.Authorization = `Bearer ${e}`;
  }
  invoke(e) {
    return _s(this, arguments, void 0, function* (r, s = {}) {
      var n;
      let i, a;
      try {
        const { headers: o, method: l, body: c, signal: h, timeout: u } = s;
        let f = {},
          { region: p } = s;
        p || (p = this.region);
        const g = new URL(`${this.url}/${r}`);
        p &&
          p !== "any" &&
          ((f["x-region"] = p), g.searchParams.set("forceFunctionRegion", p));
        let m;
        c &&
        ((o && !Object.prototype.hasOwnProperty.call(o, "Content-Type")) || !o)
          ? (typeof Blob < "u" && c instanceof Blob) || c instanceof ArrayBuffer
            ? ((f["Content-Type"] = "application/octet-stream"), (m = c))
            : typeof c == "string"
              ? ((f["Content-Type"] = "text/plain"), (m = c))
              : typeof FormData < "u" && c instanceof FormData
                ? (m = c)
                : ((f["Content-Type"] = "application/json"),
                  (m = JSON.stringify(c)))
          : c &&
              typeof c != "string" &&
              !(typeof Blob < "u" && c instanceof Blob) &&
              !(c instanceof ArrayBuffer) &&
              !(typeof FormData < "u" && c instanceof FormData)
            ? (m = JSON.stringify(c))
            : (m = c);
        let v = h;
        u &&
          ((a = new AbortController()),
          (i = setTimeout(() => a.abort(), u)),
          h
            ? ((v = a.signal), h.addEventListener("abort", () => a.abort()))
            : (v = a.signal));
        const y = yield this.fetch(g.toString(), {
            method: l || "POST",
            headers: Object.assign(
              Object.assign(Object.assign({}, f), this.headers),
              o,
            ),
            body: m,
            signal: v,
          }).catch((E) => {
            throw new Ss(E);
          }),
          w = y.headers.get("x-relay-error");
        if (w && w === "true") throw new Nt(y);
        if (!y.ok) throw new Ut(y);
        let b = (
            (n = y.headers.get("Content-Type")) !== null && n !== void 0
              ? n
              : "text/plain"
          )
            .split(";")[0]
            .trim(),
          _;
        return (
          b === "application/json"
            ? (_ = yield y.json())
            : b === "application/octet-stream" || b === "application/pdf"
              ? (_ = yield y.blob())
              : b === "text/event-stream"
                ? (_ = y)
                : b === "multipart/form-data"
                  ? (_ = yield y.formData())
                  : (_ = yield y.text()),
          { data: _, error: null, response: y }
        );
      } catch (o) {
        return {
          data: null,
          error: o,
          response: o instanceof Ut || o instanceof Nt ? o.context : void 0,
        };
      } finally {
        i && clearTimeout(i);
      }
    });
  }
}
const zr = 3,
  Dt = (t) => Math.min(1e3 * 2 ** t, 3e4),
  Es = [520, 503],
  Fr = ["GET", "HEAD", "OPTIONS"];
var Ts = class extends Error {
  constructor(t) {
    (super(t.message),
      (this.name = "PostgrestError"),
      (this.details = t.details),
      (this.hint = t.hint),
      (this.code = t.code));
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      details: this.details,
      hint: this.hint,
      code: this.code,
    };
  }
};
function Mt(t, e) {
  return new Promise((r) => {
    if (e?.aborted) {
      r();
      return;
    }
    const s = setTimeout(() => {
      (e?.removeEventListener("abort", n), r());
    }, t);
    function n() {
      (clearTimeout(s), r());
    }
    e?.addEventListener("abort", n);
  });
}
function As(t, e, r, s) {
  return !(!s || r >= zr || !Fr.includes(t) || !Es.includes(e));
}
var Rs = class {
    constructor(t) {
      var e, r, s, n, i;
      ((this.shouldThrowOnError = !1),
        (this.retryEnabled = !0),
        (this.method = t.method),
        (this.url = t.url),
        (this.headers = new Headers(t.headers)),
        (this.schema = t.schema),
        (this.body = t.body),
        (this.shouldThrowOnError =
          (e = t.shouldThrowOnError) !== null && e !== void 0 ? e : !1),
        (this.signal = t.signal),
        (this.isMaybeSingle =
          (r = t.isMaybeSingle) !== null && r !== void 0 ? r : !1),
        (this.shouldStripNulls =
          (s = t.shouldStripNulls) !== null && s !== void 0 ? s : !1),
        (this.urlLengthLimit =
          (n = t.urlLengthLimit) !== null && n !== void 0 ? n : 8e3),
        (this.retryEnabled = (i = t.retry) !== null && i !== void 0 ? i : !0),
        t.fetch ? (this.fetch = t.fetch) : (this.fetch = fetch));
    }
    throwOnError() {
      return ((this.shouldThrowOnError = !0), this);
    }
    stripNulls() {
      if (this.headers.get("Accept") === "text/csv")
        throw new Error("stripNulls() cannot be used with csv()");
      return ((this.shouldStripNulls = !0), this);
    }
    setHeader(t, e) {
      return (
        (this.headers = new Headers(this.headers)),
        this.headers.set(t, e),
        this
      );
    }
    retry(t) {
      return ((this.retryEnabled = t), this);
    }
    then(t, e) {
      var r = this;
      if (
        (this.schema === void 0 ||
          (["GET", "HEAD"].includes(this.method)
            ? this.headers.set("Accept-Profile", this.schema)
            : this.headers.set("Content-Profile", this.schema)),
        this.method !== "GET" &&
          this.method !== "HEAD" &&
          this.headers.set("Content-Type", "application/json"),
        this.shouldStripNulls)
      ) {
        const a = this.headers.get("Accept");
        a === "application/vnd.pgrst.object+json"
          ? this.headers.set(
              "Accept",
              "application/vnd.pgrst.object+json;nulls=stripped",
            )
          : (!a || a === "application/json") &&
            this.headers.set(
              "Accept",
              "application/vnd.pgrst.array+json;nulls=stripped",
            );
      }
      const s = this.fetch;
      let i = (async () => {
        let a = 0;
        for (;;) {
          const c = new Headers(r.headers);
          a > 0 && c.set("X-Retry-Count", String(a));
          let h;
          try {
            h = await s(r.url.toString(), {
              method: r.method,
              headers: c,
              body: JSON.stringify(r.body, (u, f) =>
                typeof f == "bigint" ? f.toString() : f,
              ),
              signal: r.signal,
            });
          } catch (u) {
            if (
              u?.name === "AbortError" ||
              u?.code === "ABORT_ERR" ||
              !Fr.includes(r.method)
            )
              throw u;
            if (r.retryEnabled && a < zr) {
              const f = Dt(a);
              (a++, await Mt(f, r.signal));
              continue;
            }
            throw u;
          }
          if (As(r.method, h.status, a, r.retryEnabled)) {
            var o, l;
            const u =
                (o =
                  (l = h.headers) === null || l === void 0
                    ? void 0
                    : l.get("Retry-After")) !== null && o !== void 0
                  ? o
                  : null,
              f = u !== null ? Math.max(0, parseInt(u, 10) || 0) * 1e3 : Dt(a);
            (await h.text(), a++, await Mt(f, r.signal));
            continue;
          }
          return await r.processResponse(h);
        }
      })();
      return (
        this.shouldThrowOnError ||
          (i = i.catch((a) => {
            var o;
            let l = "",
              c = "",
              h = "";
            const u = a?.cause;
            if (u) {
              var f, p, g, m;
              const w = (f = u?.message) !== null && f !== void 0 ? f : "",
                b = (p = u?.code) !== null && p !== void 0 ? p : "";
              ((l = `${(g = a?.name) !== null && g !== void 0 ? g : "FetchError"}: ${a?.message}`),
                (l += `

Caused by: ${(m = u?.name) !== null && m !== void 0 ? m : "Error"}: ${w}`),
                b && (l += ` (${b})`),
                u?.stack &&
                  (l += `
${u.stack}`));
            } else {
              var v;
              l = (v = a?.stack) !== null && v !== void 0 ? v : "";
            }
            const y = this.url.toString().length;
            return (
              a?.name === "AbortError" || a?.code === "ABORT_ERR"
                ? ((h = ""),
                  (c = "Request was aborted (timeout or manual cancellation)"),
                  y > this.urlLengthLimit &&
                    (c += `. Note: Your request URL is ${y} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`))
                : (u?.name === "HeadersOverflowError" ||
                    u?.code === "UND_ERR_HEADERS_OVERFLOW") &&
                  ((h = ""),
                  (c = "HTTP headers exceeded server limits (typically 16KB)"),
                  y > this.urlLengthLimit &&
                    (c += `. Your request URL is ${y} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),
              {
                success: !1,
                error: {
                  message: `${(o = a?.name) !== null && o !== void 0 ? o : "FetchError"}: ${a?.message}`,
                  details: l,
                  hint: c,
                  code: h,
                },
                data: null,
                count: null,
                status: 0,
                statusText: "",
              }
            );
          })),
        i.then(t, e)
      );
    }
    async processResponse(t) {
      var e = this;
      let r = null,
        s = null,
        n = null,
        i = t.status,
        a = t.statusText;
      if (t.ok) {
        var o, l;
        if (e.method !== "HEAD") {
          var c;
          const f = await t.text();
          f === "" ||
            (e.headers.get("Accept") === "text/csv" ||
            (e.headers.get("Accept") &&
              !((c = e.headers.get("Accept")) === null || c === void 0) &&
              c.includes("application/vnd.pgrst.plan+text"))
              ? (s = f)
              : (s = JSON.parse(f)));
        }
        const h =
            (o = e.headers.get("Prefer")) === null || o === void 0
              ? void 0
              : o.match(/count=(exact|planned|estimated)/),
          u =
            (l = t.headers.get("content-range")) === null || l === void 0
              ? void 0
              : l.split("/");
        (h && u && u.length > 1 && (n = parseInt(u[1])),
          e.isMaybeSingle &&
            Array.isArray(s) &&
            (s.length > 1
              ? ((r = {
                  code: "PGRST116",
                  details: `Results contain ${s.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                  hint: null,
                  message:
                    "JSON object requested, multiple (or no) rows returned",
                }),
                (s = null),
                (n = null),
                (i = 406),
                (a = "Not Acceptable"))
              : s.length === 1
                ? (s = s[0])
                : (s = null)));
      } else {
        const h = await t.text();
        try {
          ((r = JSON.parse(h)),
            Array.isArray(r) &&
              t.status === 404 &&
              ((s = []), (r = null), (i = 200), (a = "OK")));
        } catch {
          t.status === 404 && h === ""
            ? ((i = 204), (a = "No Content"))
            : (r = { message: h });
        }
        if (r && e.shouldThrowOnError) throw new Ts(r);
      }
      return {
        success: r === null,
        error: r,
        data: s,
        count: n,
        status: i,
        statusText: a,
      };
    }
    returns() {
      return this;
    }
    overrideTypes() {
      return this;
    }
  },
  js = class extends Rs {
    select(t) {
      let e = !1;
      const r = (t ?? "*")
        .split("")
        .map((s) => (/\s/.test(s) && !e ? "" : (s === '"' && (e = !e), s)))
        .join("");
      return (
        this.url.searchParams.set("select", r),
        this.headers.append("Prefer", "return=representation"),
        this
      );
    }
    order(
      t,
      {
        ascending: e = !0,
        nullsFirst: r,
        foreignTable: s,
        referencedTable: n = s,
      } = {},
    ) {
      const i = n ? `${n}.order` : "order",
        a = this.url.searchParams.get(i);
      return (
        this.url.searchParams.set(
          i,
          `${a ? `${a},` : ""}${t}.${e ? "asc" : "desc"}${r === void 0 ? "" : r ? ".nullsfirst" : ".nullslast"}`,
        ),
        this
      );
    }
    limit(t, { foreignTable: e, referencedTable: r = e } = {}) {
      const s = typeof r > "u" ? "limit" : `${r}.limit`;
      return (this.url.searchParams.set(s, `${t}`), this);
    }
    range(t, e, { foreignTable: r, referencedTable: s = r } = {}) {
      const n = typeof s > "u" ? "offset" : `${s}.offset`,
        i = typeof s > "u" ? "limit" : `${s}.limit`;
      return (
        this.url.searchParams.set(n, `${t}`),
        this.url.searchParams.set(i, `${e - t + 1}`),
        this
      );
    }
    abortSignal(t) {
      return ((this.signal = t), this);
    }
    single() {
      return (
        this.headers.set("Accept", "application/vnd.pgrst.object+json"),
        this
      );
    }
    maybeSingle() {
      return ((this.isMaybeSingle = !0), this);
    }
    csv() {
      return (this.headers.set("Accept", "text/csv"), this);
    }
    geojson() {
      return (this.headers.set("Accept", "application/geo+json"), this);
    }
    explain({
      analyze: t = !1,
      verbose: e = !1,
      settings: r = !1,
      buffers: s = !1,
      wal: n = !1,
      format: i = "text",
    } = {}) {
      var a;
      const o = [
          t ? "analyze" : null,
          e ? "verbose" : null,
          r ? "settings" : null,
          s ? "buffers" : null,
          n ? "wal" : null,
        ]
          .filter(Boolean)
          .join("|"),
        l =
          (a = this.headers.get("Accept")) !== null && a !== void 0
            ? a
            : "application/json";
      return (
        this.headers.set(
          "Accept",
          `application/vnd.pgrst.plan+${i}; for="${l}"; options=${o};`,
        ),
        i === "json" ? this : this
      );
    }
    rollback() {
      return (this.headers.append("Prefer", "tx=rollback"), this);
    }
    returns() {
      return this;
    }
    maxAffected(t) {
      return (
        this.headers.append("Prefer", "handling=strict"),
        this.headers.append("Prefer", `max-affected=${t}`),
        this
      );
    }
  };
const Bt = new RegExp("[,()]");
var ye = class extends js {
    eq(t, e) {
      return (this.url.searchParams.append(t, `eq.${e}`), this);
    }
    neq(t, e) {
      return (this.url.searchParams.append(t, `neq.${e}`), this);
    }
    gt(t, e) {
      return (this.url.searchParams.append(t, `gt.${e}`), this);
    }
    gte(t, e) {
      return (this.url.searchParams.append(t, `gte.${e}`), this);
    }
    lt(t, e) {
      return (this.url.searchParams.append(t, `lt.${e}`), this);
    }
    lte(t, e) {
      return (this.url.searchParams.append(t, `lte.${e}`), this);
    }
    like(t, e) {
      return (this.url.searchParams.append(t, `like.${e}`), this);
    }
    likeAllOf(t, e) {
      return (
        this.url.searchParams.append(t, `like(all).{${e.join(",")}}`),
        this
      );
    }
    likeAnyOf(t, e) {
      return (
        this.url.searchParams.append(t, `like(any).{${e.join(",")}}`),
        this
      );
    }
    ilike(t, e) {
      return (this.url.searchParams.append(t, `ilike.${e}`), this);
    }
    ilikeAllOf(t, e) {
      return (
        this.url.searchParams.append(t, `ilike(all).{${e.join(",")}}`),
        this
      );
    }
    ilikeAnyOf(t, e) {
      return (
        this.url.searchParams.append(t, `ilike(any).{${e.join(",")}}`),
        this
      );
    }
    regexMatch(t, e) {
      return (this.url.searchParams.append(t, `match.${e}`), this);
    }
    regexIMatch(t, e) {
      return (this.url.searchParams.append(t, `imatch.${e}`), this);
    }
    is(t, e) {
      return (this.url.searchParams.append(t, `is.${e}`), this);
    }
    isDistinct(t, e) {
      return (this.url.searchParams.append(t, `isdistinct.${e}`), this);
    }
    in(t, e) {
      const r = Array.from(new Set(e))
        .map((s) => (typeof s == "string" && Bt.test(s) ? `"${s}"` : `${s}`))
        .join(",");
      return (this.url.searchParams.append(t, `in.(${r})`), this);
    }
    notIn(t, e) {
      const r = Array.from(new Set(e))
        .map((s) => (typeof s == "string" && Bt.test(s) ? `"${s}"` : `${s}`))
        .join(",");
      return (this.url.searchParams.append(t, `not.in.(${r})`), this);
    }
    contains(t, e) {
      return (
        typeof e == "string"
          ? this.url.searchParams.append(t, `cs.${e}`)
          : Array.isArray(e)
            ? this.url.searchParams.append(t, `cs.{${e.join(",")}}`)
            : this.url.searchParams.append(t, `cs.${JSON.stringify(e)}`),
        this
      );
    }
    containedBy(t, e) {
      return (
        typeof e == "string"
          ? this.url.searchParams.append(t, `cd.${e}`)
          : Array.isArray(e)
            ? this.url.searchParams.append(t, `cd.{${e.join(",")}}`)
            : this.url.searchParams.append(t, `cd.${JSON.stringify(e)}`),
        this
      );
    }
    rangeGt(t, e) {
      return (this.url.searchParams.append(t, `sr.${e}`), this);
    }
    rangeGte(t, e) {
      return (this.url.searchParams.append(t, `nxl.${e}`), this);
    }
    rangeLt(t, e) {
      return (this.url.searchParams.append(t, `sl.${e}`), this);
    }
    rangeLte(t, e) {
      return (this.url.searchParams.append(t, `nxr.${e}`), this);
    }
    rangeAdjacent(t, e) {
      return (this.url.searchParams.append(t, `adj.${e}`), this);
    }
    overlaps(t, e) {
      return (
        typeof e == "string"
          ? this.url.searchParams.append(t, `ov.${e}`)
          : this.url.searchParams.append(t, `ov.{${e.join(",")}}`),
        this
      );
    }
    textSearch(t, e, { config: r, type: s } = {}) {
      let n = "";
      s === "plain"
        ? (n = "pl")
        : s === "phrase"
          ? (n = "ph")
          : s === "websearch" && (n = "w");
      const i = r === void 0 ? "" : `(${r})`;
      return (this.url.searchParams.append(t, `${n}fts${i}.${e}`), this);
    }
    match(t) {
      return (
        Object.entries(t)
          .filter(([e, r]) => r !== void 0)
          .forEach(([e, r]) => {
            this.url.searchParams.append(e, `eq.${r}`);
          }),
        this
      );
    }
    not(t, e, r) {
      return (this.url.searchParams.append(t, `not.${e}.${r}`), this);
    }
    or(t, { foreignTable: e, referencedTable: r = e } = {}) {
      const s = r ? `${r}.or` : "or";
      return (this.url.searchParams.append(s, `(${t})`), this);
    }
    filter(t, e, r) {
      return (this.url.searchParams.append(t, `${e}.${r}`), this);
    }
  },
  Cs = class {
    constructor(
      t,
      {
        headers: e = {},
        schema: r,
        fetch: s,
        urlLengthLimit: n = 8e3,
        retry: i,
      },
    ) {
      ((this.url = t),
        (this.headers = new Headers(e)),
        (this.schema = r),
        (this.fetch = s),
        (this.urlLengthLimit = n),
        (this.retry = i));
    }
    cloneRequestState() {
      return {
        url: new URL(this.url.toString()),
        headers: new Headers(this.headers),
      };
    }
    select(t, e) {
      const { head: r = !1, count: s } = e ?? {},
        n = r ? "HEAD" : "GET";
      let i = !1;
      const a = (t ?? "*")
          .split("")
          .map((c) => (/\s/.test(c) && !i ? "" : (c === '"' && (i = !i), c)))
          .join(""),
        { url: o, headers: l } = this.cloneRequestState();
      return (
        o.searchParams.set("select", a),
        s && l.append("Prefer", `count=${s}`),
        new ye({
          method: n,
          url: o,
          headers: l,
          schema: this.schema,
          fetch: this.fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry,
        })
      );
    }
    insert(t, { count: e, defaultToNull: r = !0 } = {}) {
      var s;
      const n = "POST",
        { url: i, headers: a } = this.cloneRequestState();
      if (
        (e && a.append("Prefer", `count=${e}`),
        r || a.append("Prefer", "missing=default"),
        Array.isArray(t))
      ) {
        const o = t.reduce((l, c) => l.concat(Object.keys(c)), []);
        if (o.length > 0) {
          const l = [...new Set(o)].map((c) => `"${c}"`);
          i.searchParams.set("columns", l.join(","));
        }
      }
      return new ye({
        method: n,
        url: i,
        headers: a,
        schema: this.schema,
        body: t,
        fetch: (s = this.fetch) !== null && s !== void 0 ? s : fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry,
      });
    }
    upsert(
      t,
      {
        onConflict: e,
        ignoreDuplicates: r = !1,
        count: s,
        defaultToNull: n = !0,
      } = {},
    ) {
      var i;
      const a = "POST",
        { url: o, headers: l } = this.cloneRequestState();
      if (
        (l.append("Prefer", `resolution=${r ? "ignore" : "merge"}-duplicates`),
        e !== void 0 && o.searchParams.set("on_conflict", e),
        s && l.append("Prefer", `count=${s}`),
        n || l.append("Prefer", "missing=default"),
        Array.isArray(t))
      ) {
        const c = t.reduce((h, u) => h.concat(Object.keys(u)), []);
        if (c.length > 0) {
          const h = [...new Set(c)].map((u) => `"${u}"`);
          o.searchParams.set("columns", h.join(","));
        }
      }
      return new ye({
        method: a,
        url: o,
        headers: l,
        schema: this.schema,
        body: t,
        fetch: (i = this.fetch) !== null && i !== void 0 ? i : fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry,
      });
    }
    update(t, { count: e } = {}) {
      var r;
      const s = "PATCH",
        { url: n, headers: i } = this.cloneRequestState();
      return (
        e && i.append("Prefer", `count=${e}`),
        new ye({
          method: s,
          url: n,
          headers: i,
          schema: this.schema,
          body: t,
          fetch: (r = this.fetch) !== null && r !== void 0 ? r : fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry,
        })
      );
    }
    delete({ count: t } = {}) {
      var e;
      const r = "DELETE",
        { url: s, headers: n } = this.cloneRequestState();
      return (
        t && n.append("Prefer", `count=${t}`),
        new ye({
          method: r,
          url: s,
          headers: n,
          schema: this.schema,
          fetch: (e = this.fetch) !== null && e !== void 0 ? e : fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry,
        })
      );
    }
  };
function Ie(t) {
  "@babel/helpers - typeof";
  return (
    (Ie =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    Ie(t)
  );
}
function Os(t, e) {
  if (Ie(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var s = r.call(t, e);
    if (Ie(s) != "object") return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function Ps(t) {
  var e = Os(t, "string");
  return Ie(e) == "symbol" ? e : e + "";
}
function Is(t, e, r) {
  return (
    (e = Ps(e)) in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = r),
    t
  );
}
function zt(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    (e &&
      (s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      })),
      r.push.apply(r, s));
  }
  return r;
}
function Be(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? zt(Object(r), !0).forEach(function (s) {
          Is(t, s, r[s]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
        : zt(Object(r)).forEach(function (s) {
            Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(r, s));
          });
  }
  return t;
}
var $s = class qr {
  constructor(
    e,
    {
      headers: r = {},
      schema: s,
      fetch: n,
      timeout: i,
      urlLengthLimit: a = 8e3,
      retry: o,
    } = {},
  ) {
    ((this.url = e),
      (this.headers = new Headers(r)),
      (this.schemaName = s),
      (this.urlLengthLimit = a));
    const l = n ?? globalThis.fetch;
    (i !== void 0 && i > 0
      ? (this.fetch = (c, h) => {
          const u = new AbortController(),
            f = setTimeout(() => u.abort(), i),
            p = h?.signal;
          if (p) {
            if (p.aborted) return (clearTimeout(f), l(c, h));
            const g = () => {
              (clearTimeout(f), u.abort());
            };
            return (
              p.addEventListener("abort", g, { once: !0 }),
              l(c, Be(Be({}, h), {}, { signal: u.signal })).finally(() => {
                (clearTimeout(f), p.removeEventListener("abort", g));
              })
            );
          }
          return l(c, Be(Be({}, h), {}, { signal: u.signal })).finally(() =>
            clearTimeout(f),
          );
        })
      : (this.fetch = l),
      (this.retry = o));
  }
  from(e) {
    if (!e || typeof e != "string" || e.trim() === "")
      throw new Error(
        "Invalid relation name: relation must be a non-empty string.",
      );
    return new Cs(new URL(`${this.url}/${e}`), {
      headers: new Headers(this.headers),
      schema: this.schemaName,
      fetch: this.fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry,
    });
  }
  schema(e) {
    return new qr(this.url, {
      headers: this.headers,
      schema: e,
      fetch: this.fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry,
    });
  }
  rpc(e, r = {}, { head: s = !1, get: n = !1, count: i } = {}) {
    var a;
    let o;
    const l = new URL(`${this.url}/rpc/${e}`);
    let c;
    const h = (p) =>
        p !== null && typeof p == "object" && (!Array.isArray(p) || p.some(h)),
      u = s && Object.values(r).some(h);
    u
      ? ((o = "POST"), (c = r))
      : s || n
        ? ((o = s ? "HEAD" : "GET"),
          Object.entries(r)
            .filter(([p, g]) => g !== void 0)
            .map(([p, g]) => [
              p,
              Array.isArray(g) ? `{${g.join(",")}}` : `${g}`,
            ])
            .forEach(([p, g]) => {
              l.searchParams.append(p, g);
            }))
        : ((o = "POST"), (c = r));
    const f = new Headers(this.headers);
    return (
      u
        ? f.set("Prefer", i ? `count=${i},return=minimal` : "return=minimal")
        : i && f.set("Prefer", `count=${i}`),
      new ye({
        method: o,
        url: l,
        headers: f,
        schema: this.schemaName,
        body: c,
        fetch: (a = this.fetch) !== null && a !== void 0 ? a : fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry,
      })
    );
  }
};
class Ls {
  constructor() {}
  static detectEnvironment() {
    var e;
    if (typeof WebSocket < "u")
      return { type: "native", wsConstructor: WebSocket };
    const r = globalThis;
    if (typeof globalThis < "u" && typeof r.WebSocket < "u")
      return { type: "native", wsConstructor: r.WebSocket };
    const s = typeof global < "u" ? global : void 0;
    if (s && typeof s.WebSocket < "u")
      return { type: "native", wsConstructor: s.WebSocket };
    if (
      typeof globalThis < "u" &&
      typeof r.WebSocketPair < "u" &&
      typeof globalThis.WebSocket > "u"
    )
      return {
        type: "cloudflare",
        error:
          "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
        workaround:
          "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime.",
      };
    if (
      (typeof globalThis < "u" && r.EdgeRuntime) ||
      (typeof navigator < "u" &&
        !((e = navigator.userAgent) === null || e === void 0) &&
        e.includes("Vercel-Edge"))
    )
      return {
        type: "unsupported",
        error:
          "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
        workaround:
          "Use serverless functions or a different deployment target for WebSocket functionality.",
      };
    const n = globalThis.process;
    if (n) {
      const i = n.versions;
      if (i && i.node) {
        const a = i.node,
          o = parseInt(a.replace(/^v/, "").split(".")[0]);
        return o >= 22
          ? typeof globalThis.WebSocket < "u"
            ? { type: "native", wsConstructor: globalThis.WebSocket }
            : {
                type: "unsupported",
                error: `Node.js ${o} detected but native WebSocket not found.`,
                workaround:
                  "Provide a WebSocket implementation via the transport option.",
              }
          : {
              type: "unsupported",
              error: `Node.js ${o} detected without native WebSocket support.`,
              workaround: `For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`,
            };
      }
    }
    return {
      type: "unsupported",
      error: "Unknown JavaScript runtime without WebSocket support.",
      workaround:
        "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation.",
    };
  }
  static getWebSocketConstructor() {
    const e = this.detectEnvironment();
    if (e.wsConstructor) return e.wsConstructor;
    let r = e.error || "WebSocket not supported in this environment.";
    throw (
      e.workaround &&
        (r += `

Suggested solution: ${e.workaround}`),
      new Error(r)
    );
  }
  static isWebSocketSupported() {
    try {
      const e = this.detectEnvironment();
      return e.type === "native" || e.type === "ws";
    } catch {
      return !1;
    }
  }
}
const Ns = "2.106.2",
  Us = `realtime-js/${Ns}`,
  Ds = "1.0.0",
  Wr = "2.0.0",
  Ms = Wr,
  Bs = 1e4,
  zs = 100,
  ne = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving",
  },
  Hr = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    leave: "phx_leave",
    access_token: "access_token",
  },
  bt = { connecting: "connecting", closing: "closing", closed: "closed" };
class Fs {
  constructor(e) {
    ((this.HEADER_LENGTH = 1),
      (this.USER_BROADCAST_PUSH_META_LENGTH = 6),
      (this.KINDS = { userBroadcastPush: 3, userBroadcast: 4 }),
      (this.BINARY_ENCODING = 0),
      (this.JSON_ENCODING = 1),
      (this.BROADCAST_EVENT = "broadcast"),
      (this.allowedMetadataKeys = []),
      (this.allowedMetadataKeys = e ?? []));
  }
  encode(e, r) {
    if (
      e.event === this.BROADCAST_EVENT &&
      !(e.payload instanceof ArrayBuffer) &&
      typeof e.payload.event == "string"
    )
      return r(this._binaryEncodeUserBroadcastPush(e));
    let s = [e.join_ref, e.ref, e.topic, e.event, e.payload];
    return r(JSON.stringify(s));
  }
  _binaryEncodeUserBroadcastPush(e) {
    var r;
    return this._isArrayBuffer(
      (r = e.payload) === null || r === void 0 ? void 0 : r.payload,
    )
      ? this._encodeBinaryUserBroadcastPush(e)
      : this._encodeJsonUserBroadcastPush(e);
  }
  _encodeBinaryUserBroadcastPush(e) {
    var r, s;
    const n =
      (s = (r = e.payload) === null || r === void 0 ? void 0 : r.payload) !==
        null && s !== void 0
        ? s
        : new ArrayBuffer(0);
    return this._encodeUserBroadcastPush(e, this.BINARY_ENCODING, n);
  }
  _encodeJsonUserBroadcastPush(e) {
    var r, s;
    const n =
        (s = (r = e.payload) === null || r === void 0 ? void 0 : r.payload) !==
          null && s !== void 0
          ? s
          : {},
      a = new TextEncoder().encode(JSON.stringify(n)).buffer;
    return this._encodeUserBroadcastPush(e, this.JSON_ENCODING, a);
  }
  _encodeUserBroadcastPush(e, r, s) {
    var n, i;
    const a = e.topic,
      o = (n = e.ref) !== null && n !== void 0 ? n : "",
      l = (i = e.join_ref) !== null && i !== void 0 ? i : "",
      c = e.payload.event,
      h = this.allowedMetadataKeys
        ? this._pick(e.payload, this.allowedMetadataKeys)
        : {},
      u = Object.keys(h).length === 0 ? "" : JSON.stringify(h);
    if (l.length > 255)
      throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);
    if (o.length > 255)
      throw new Error(`ref length ${o.length} exceeds maximum of 255`);
    if (a.length > 255)
      throw new Error(`topic length ${a.length} exceeds maximum of 255`);
    if (c.length > 255)
      throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);
    if (u.length > 255)
      throw new Error(`metadata length ${u.length} exceeds maximum of 255`);
    const f =
        this.USER_BROADCAST_PUSH_META_LENGTH +
        l.length +
        o.length +
        a.length +
        c.length +
        u.length,
      p = new ArrayBuffer(this.HEADER_LENGTH + f);
    let g = new DataView(p),
      m = 0;
    (g.setUint8(m++, this.KINDS.userBroadcastPush),
      g.setUint8(m++, l.length),
      g.setUint8(m++, o.length),
      g.setUint8(m++, a.length),
      g.setUint8(m++, c.length),
      g.setUint8(m++, u.length),
      g.setUint8(m++, r),
      Array.from(l, (y) => g.setUint8(m++, y.charCodeAt(0))),
      Array.from(o, (y) => g.setUint8(m++, y.charCodeAt(0))),
      Array.from(a, (y) => g.setUint8(m++, y.charCodeAt(0))),
      Array.from(c, (y) => g.setUint8(m++, y.charCodeAt(0))),
      Array.from(u, (y) => g.setUint8(m++, y.charCodeAt(0))));
    var v = new Uint8Array(p.byteLength + s.byteLength);
    return (
      v.set(new Uint8Array(p), 0),
      v.set(new Uint8Array(s), p.byteLength),
      v.buffer
    );
  }
  decode(e, r) {
    if (this._isArrayBuffer(e)) {
      let s = this._binaryDecode(e);
      return r(s);
    }
    if (typeof e == "string") {
      const s = JSON.parse(e),
        [n, i, a, o, l] = s;
      return r({ join_ref: n, ref: i, topic: a, event: o, payload: l });
    }
    return r({});
  }
  _binaryDecode(e) {
    const r = new DataView(e),
      s = r.getUint8(0),
      n = new TextDecoder();
    switch (s) {
      case this.KINDS.userBroadcast:
        return this._decodeUserBroadcast(e, r, n);
    }
  }
  _decodeUserBroadcast(e, r, s) {
    const n = r.getUint8(1),
      i = r.getUint8(2),
      a = r.getUint8(3),
      o = r.getUint8(4);
    let l = this.HEADER_LENGTH + 4;
    const c = s.decode(e.slice(l, l + n));
    l = l + n;
    const h = s.decode(e.slice(l, l + i));
    l = l + i;
    const u = s.decode(e.slice(l, l + a));
    l = l + a;
    const f = e.slice(l, e.byteLength),
      p = o === this.JSON_ENCODING ? JSON.parse(s.decode(f)) : f,
      g = { type: this.BROADCAST_EVENT, event: h, payload: p };
    return (
      a > 0 && (g.meta = JSON.parse(u)),
      {
        join_ref: null,
        ref: null,
        topic: c,
        event: this.BROADCAST_EVENT,
        payload: g,
      }
    );
  }
  _isArrayBuffer(e) {
    var r;
    return (
      e instanceof ArrayBuffer ||
      ((r = e?.constructor) === null || r === void 0 ? void 0 : r.name) ===
        "ArrayBuffer"
    );
  }
  _pick(e, r) {
    return !e || typeof e != "object"
      ? {}
      : Object.fromEntries(Object.entries(e).filter(([s]) => r.includes(s)));
  }
}
var O;
(function (t) {
  ((t.abstime = "abstime"),
    (t.bool = "bool"),
    (t.date = "date"),
    (t.daterange = "daterange"),
    (t.float4 = "float4"),
    (t.float8 = "float8"),
    (t.int2 = "int2"),
    (t.int4 = "int4"),
    (t.int4range = "int4range"),
    (t.int8 = "int8"),
    (t.int8range = "int8range"),
    (t.json = "json"),
    (t.jsonb = "jsonb"),
    (t.money = "money"),
    (t.numeric = "numeric"),
    (t.oid = "oid"),
    (t.reltime = "reltime"),
    (t.text = "text"),
    (t.time = "time"),
    (t.timestamp = "timestamp"),
    (t.timestamptz = "timestamptz"),
    (t.timetz = "timetz"),
    (t.tsrange = "tsrange"),
    (t.tstzrange = "tstzrange"));
})(O || (O = {}));
const Ft = (t, e, r = {}) => {
    var s;
    const n = (s = r.skipTypes) !== null && s !== void 0 ? s : [];
    return e
      ? Object.keys(e).reduce((i, a) => ((i[a] = qs(a, t, e, n)), i), {})
      : {};
  },
  qs = (t, e, r, s) => {
    const n = e.find((o) => o.name === t),
      i = n?.type,
      a = r[t];
    return i && !s.includes(i) ? Vr(i, a) : wt(a);
  },
  Vr = (t, e) => {
    if (t.charAt(0) === "_") {
      const r = t.slice(1, t.length);
      return Gs(e, r);
    }
    switch (t) {
      case O.bool:
        return Ws(e);
      case O.float4:
      case O.float8:
      case O.int2:
      case O.int4:
      case O.int8:
      case O.numeric:
      case O.oid:
        return Hs(e);
      case O.json:
      case O.jsonb:
        return Vs(e);
      case O.timestamp:
        return Ks(e);
      case O.abstime:
      case O.date:
      case O.daterange:
      case O.int4range:
      case O.int8range:
      case O.money:
      case O.reltime:
      case O.text:
      case O.time:
      case O.timestamptz:
      case O.timetz:
      case O.tsrange:
      case O.tstzrange:
        return wt(e);
      default:
        return wt(e);
    }
  },
  wt = (t) => t,
  Ws = (t) => {
    switch (t) {
      case "t":
        return !0;
      case "f":
        return !1;
      default:
        return t;
    }
  },
  Hs = (t) => {
    if (typeof t == "string") {
      const e = parseFloat(t);
      if (!Number.isNaN(e)) return e;
    }
    return t;
  },
  Vs = (t) => {
    if (typeof t == "string")
      try {
        return JSON.parse(t);
      } catch {
        return t;
      }
    return t;
  },
  Gs = (t, e) => {
    if (typeof t != "string") return t;
    const r = t.length - 1,
      s = t[r];
    if (t[0] === "{" && s === "}") {
      let i;
      const a = t.slice(1, r);
      try {
        i = JSON.parse("[" + a + "]");
      } catch {
        i = a ? a.split(",") : [];
      }
      return i.map((o) => Vr(e, o));
    }
    return t;
  },
  Ks = (t) => (typeof t == "string" ? t.replace(" ", "T") : t),
  Gr = (t) => {
    const e = new URL(t);
    return (
      (e.protocol = e.protocol.replace(/^ws/i, "http")),
      (e.pathname = e.pathname
        .replace(/\/+$/, "")
        .replace(/\/socket\/websocket$/i, "")
        .replace(/\/socket$/i, "")
        .replace(/\/websocket$/i, "")),
      e.pathname === "" || e.pathname === "/"
        ? (e.pathname = "/api/broadcast")
        : (e.pathname = e.pathname + "/api/broadcast"),
      e.href
    );
  };
var je = (t) =>
    typeof t == "function"
      ? t
      : function () {
          return t;
        },
  Js = typeof self < "u" ? self : null,
  ve = typeof window < "u" ? window : null,
  Y = Js || ve || globalThis,
  Xs = "2.0.0",
  Ys = 1e4,
  Zs = 1e3,
  Z = { connecting: 0, open: 1, closing: 2, closed: 3 },
  q = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving",
  },
  te = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave",
  },
  _t = { longpoll: "longpoll", websocket: "websocket" },
  Qs = { complete: 4 },
  xt = "base64url.bearer.phx.",
  ze = class {
    constructor(t, e, r, s) {
      ((this.channel = t),
        (this.event = e),
        (this.payload =
          r ||
          function () {
            return {};
          }),
        (this.receivedResp = null),
        (this.timeout = s),
        (this.timeoutTimer = null),
        (this.recHooks = []),
        (this.sent = !1),
        (this.ref = void 0));
    }
    resend(t) {
      ((this.timeout = t), this.reset(), this.send());
    }
    send() {
      this.hasReceived("timeout") ||
        (this.startTimeout(),
        (this.sent = !0),
        this.channel.socket.push({
          topic: this.channel.topic,
          event: this.event,
          payload: this.payload(),
          ref: this.ref,
          join_ref: this.channel.joinRef(),
        }));
    }
    receive(t, e) {
      return (
        this.hasReceived(t) && e(this.receivedResp.response),
        this.recHooks.push({ status: t, callback: e }),
        this
      );
    }
    reset() {
      (this.cancelRefEvent(),
        (this.ref = null),
        (this.refEvent = null),
        (this.receivedResp = null),
        (this.sent = !1));
    }
    destroy() {
      (this.cancelRefEvent(), this.cancelTimeout());
    }
    matchReceive({ status: t, response: e, _ref: r }) {
      this.recHooks.filter((s) => s.status === t).forEach((s) => s.callback(e));
    }
    cancelRefEvent() {
      this.refEvent && this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      (clearTimeout(this.timeoutTimer), (this.timeoutTimer = null));
    }
    startTimeout() {
      (this.timeoutTimer && this.cancelTimeout(),
        (this.ref = this.channel.socket.makeRef()),
        (this.refEvent = this.channel.replyEventName(this.ref)),
        this.channel.on(this.refEvent, (t) => {
          (this.cancelRefEvent(),
            this.cancelTimeout(),
            (this.receivedResp = t),
            this.matchReceive(t));
        }),
        (this.timeoutTimer = setTimeout(() => {
          this.trigger("timeout", {});
        }, this.timeout)));
    }
    hasReceived(t) {
      return this.receivedResp && this.receivedResp.status === t;
    }
    trigger(t, e) {
      this.channel.trigger(this.refEvent, { status: t, response: e });
    }
  },
  Kr = class {
    constructor(t, e) {
      ((this.callback = t),
        (this.timerCalc = e),
        (this.timer = void 0),
        (this.tries = 0));
    }
    reset() {
      ((this.tries = 0), clearTimeout(this.timer));
    }
    scheduleTimeout() {
      (clearTimeout(this.timer),
        (this.timer = setTimeout(
          () => {
            ((this.tries = this.tries + 1), this.callback());
          },
          this.timerCalc(this.tries + 1),
        )));
    }
  },
  en = class {
    constructor(t, e, r) {
      ((this.state = q.closed),
        (this.topic = t),
        (this.params = je(e || {})),
        (this.socket = r),
        (this.bindings = []),
        (this.bindingRef = 0),
        (this.timeout = this.socket.timeout),
        (this.joinedOnce = !1),
        (this.joinPush = new ze(this, te.join, this.params, this.timeout)),
        (this.pushBuffer = []),
        (this.stateChangeRefs = []),
        (this.rejoinTimer = new Kr(() => {
          this.socket.isConnected() && this.rejoin();
        }, this.socket.rejoinAfterMs)),
        this.stateChangeRefs.push(
          this.socket.onError(() => this.rejoinTimer.reset()),
        ),
        this.stateChangeRefs.push(
          this.socket.onOpen(() => {
            (this.rejoinTimer.reset(), this.isErrored() && this.rejoin());
          }),
        ),
        this.joinPush.receive("ok", () => {
          ((this.state = q.joined),
            this.rejoinTimer.reset(),
            this.pushBuffer.forEach((s) => s.send()),
            (this.pushBuffer = []));
        }),
        this.joinPush.receive("error", (s) => {
          ((this.state = q.errored),
            this.socket.hasLogger() &&
              this.socket.log("channel", `error ${this.topic}`, s),
            this.socket.isConnected() && this.rejoinTimer.scheduleTimeout());
        }),
        this.onClose(() => {
          (this.rejoinTimer.reset(),
            this.socket.hasLogger() &&
              this.socket.log("channel", `close ${this.topic}`),
            (this.state = q.closed),
            this.socket.remove(this));
        }),
        this.onError((s) => {
          (this.socket.hasLogger() &&
            this.socket.log("channel", `error ${this.topic}`, s),
            this.isJoining() && this.joinPush.reset(),
            (this.state = q.errored),
            this.socket.isConnected() && this.rejoinTimer.scheduleTimeout());
        }),
        this.joinPush.receive("timeout", () => {
          (this.socket.hasLogger() &&
            this.socket.log(
              "channel",
              `timeout ${this.topic}`,
              this.joinPush.timeout,
            ),
            new ze(this, te.leave, je({}), this.timeout).send(),
            (this.state = q.errored),
            this.joinPush.reset(),
            this.socket.isConnected() && this.rejoinTimer.scheduleTimeout());
        }),
        this.on(te.reply, (s, n) => {
          this.trigger(this.replyEventName(n), s);
        }));
    }
    join(t = this.timeout) {
      if (this.joinedOnce)
        throw new Error(
          "tried to join multiple times. 'join' can only be called a single time per channel instance",
        );
      return (
        (this.timeout = t),
        (this.joinedOnce = !0),
        this.rejoin(),
        this.joinPush
      );
    }
    teardown() {
      (this.pushBuffer.forEach((t) => t.destroy()),
        (this.pushBuffer = []),
        this.rejoinTimer.reset(),
        this.joinPush.destroy(),
        (this.state = q.closed),
        (this.bindings = []));
    }
    onClose(t) {
      this.on(te.close, t);
    }
    onError(t) {
      return this.on(te.error, (e) => t(e));
    }
    on(t, e) {
      let r = this.bindingRef++;
      return (this.bindings.push({ event: t, ref: r, callback: e }), r);
    }
    off(t, e) {
      this.bindings = this.bindings.filter(
        (r) => !(r.event === t && (typeof e > "u" || e === r.ref)),
      );
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(t, e, r = this.timeout) {
      if (((e = e || {}), !this.joinedOnce))
        throw new Error(
          `tried to push '${t}' to '${this.topic}' before joining. Use channel.join() before pushing events`,
        );
      let s = new ze(
        this,
        t,
        function () {
          return e;
        },
        r,
      );
      return (
        this.canPush() ? s.send() : (s.startTimeout(), this.pushBuffer.push(s)),
        s
      );
    }
    leave(t = this.timeout) {
      (this.rejoinTimer.reset(),
        this.joinPush.cancelTimeout(),
        (this.state = q.leaving));
      let e = () => {
          (this.socket.hasLogger() &&
            this.socket.log("channel", `leave ${this.topic}`),
            this.trigger(te.close, "leave"));
        },
        r = new ze(this, te.leave, je({}), t);
      return (
        r.receive("ok", () => e()).receive("timeout", () => e()),
        r.send(),
        this.canPush() || r.trigger("ok", {}),
        r
      );
    }
    onMessage(t, e, r) {
      return e;
    }
    filterBindings(t, e, r) {
      return !0;
    }
    isMember(t, e, r, s) {
      return this.topic !== t
        ? !1
        : s && s !== this.joinRef()
          ? (this.socket.hasLogger() &&
              this.socket.log("channel", "dropping outdated message", {
                topic: t,
                event: e,
                payload: r,
                joinRef: s,
              }),
            !1)
          : !0;
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(t = this.timeout) {
      this.isLeaving() ||
        (this.socket.leaveOpenTopic(this.topic),
        (this.state = q.joining),
        this.joinPush.resend(t));
    }
    trigger(t, e, r, s) {
      let n = this.onMessage(t, e, r, s);
      if (e && !n)
        throw new Error(
          "channel onMessage callbacks must return the payload, modified or unmodified",
        );
      let i = this.bindings.filter(
        (a) => a.event === t && this.filterBindings(a, e, r),
      );
      for (let a = 0; a < i.length; a++)
        i[a].callback(n, r, s || this.joinRef());
    }
    replyEventName(t) {
      return `chan_reply_${t}`;
    }
    isClosed() {
      return this.state === q.closed;
    }
    isErrored() {
      return this.state === q.errored;
    }
    isJoined() {
      return this.state === q.joined;
    }
    isJoining() {
      return this.state === q.joining;
    }
    isLeaving() {
      return this.state === q.leaving;
    }
  },
  Je = class {
    static request(t, e, r, s, n, i, a) {
      if (Y.XDomainRequest) {
        let o = new Y.XDomainRequest();
        return this.xdomainRequest(o, t, e, s, n, i, a);
      } else if (Y.XMLHttpRequest) {
        let o = new Y.XMLHttpRequest();
        return this.xhrRequest(o, t, e, r, s, n, i, a);
      } else {
        if (Y.fetch && Y.AbortController)
          return this.fetchRequest(t, e, r, s, n, i, a);
        throw new Error("No suitable XMLHttpRequest implementation found");
      }
    }
    static fetchRequest(t, e, r, s, n, i, a) {
      let o = { method: t, headers: r, body: s },
        l = null;
      return (
        n &&
          ((l = new AbortController()),
          setTimeout(() => l.abort(), n),
          (o.signal = l.signal)),
        Y.fetch(e, o)
          .then((c) => c.text())
          .then((c) => this.parseJSON(c))
          .then((c) => a && a(c))
          .catch((c) => {
            c.name === "AbortError" && i ? i() : a && a(null);
          }),
        l
      );
    }
    static xdomainRequest(t, e, r, s, n, i, a) {
      return (
        (t.timeout = n),
        t.open(e, r),
        (t.onload = () => {
          let o = this.parseJSON(t.responseText);
          a && a(o);
        }),
        i && (t.ontimeout = i),
        (t.onprogress = () => {}),
        t.send(s),
        t
      );
    }
    static xhrRequest(t, e, r, s, n, i, a, o) {
      (t.open(e, r, !0), (t.timeout = i));
      for (let [l, c] of Object.entries(s)) t.setRequestHeader(l, c);
      return (
        (t.onerror = () => o && o(null)),
        (t.onreadystatechange = () => {
          if (t.readyState === Qs.complete && o) {
            let l = this.parseJSON(t.responseText);
            o(l);
          }
        }),
        a && (t.ontimeout = a),
        t.send(n),
        t
      );
    }
    static parseJSON(t) {
      if (!t || t === "") return null;
      try {
        return JSON.parse(t);
      } catch {
        return (
          console && console.log("failed to parse JSON response", t),
          null
        );
      }
    }
    static serialize(t, e) {
      let r = [];
      for (var s in t) {
        if (!Object.prototype.hasOwnProperty.call(t, s)) continue;
        let n = e ? `${e}[${s}]` : s,
          i = t[s];
        typeof i == "object"
          ? r.push(this.serialize(i, n))
          : r.push(encodeURIComponent(n) + "=" + encodeURIComponent(i));
      }
      return r.join("&");
    }
    static appendParams(t, e) {
      if (Object.keys(e).length === 0) return t;
      let r = t.match(/\?/) ? "&" : "?";
      return `${t}${r}${this.serialize(e)}`;
    }
  },
  tn = (t) => {
    let e = "",
      r = new Uint8Array(t),
      s = r.byteLength;
    for (let n = 0; n < s; n++) e += String.fromCharCode(r[n]);
    return btoa(e);
  },
  de = class {
    constructor(t, e) {
      (e &&
        e.length === 2 &&
        e[1].startsWith(xt) &&
        (this.authToken = atob(e[1].slice(xt.length))),
        (this.endPoint = null),
        (this.token = null),
        (this.skipHeartbeat = !0),
        (this.reqs = new Set()),
        (this.awaitingBatchAck = !1),
        (this.currentBatch = null),
        (this.currentBatchTimer = null),
        (this.batchBuffer = []),
        (this.onopen = function () {}),
        (this.onerror = function () {}),
        (this.onmessage = function () {}),
        (this.onclose = function () {}),
        (this.pollEndpoint = this.normalizeEndpoint(t)),
        (this.readyState = Z.connecting),
        setTimeout(() => this.poll(), 0));
    }
    normalizeEndpoint(t) {
      return t
        .replace("ws://", "http://")
        .replace("wss://", "https://")
        .replace(new RegExp("(.*)/" + _t.websocket), "$1/" + _t.longpoll);
    }
    endpointURL() {
      return Je.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(t, e, r) {
      (this.close(t, e, r), (this.readyState = Z.connecting));
    }
    ontimeout() {
      (this.onerror("timeout"), this.closeAndRetry(1005, "timeout", !1));
    }
    isActive() {
      return this.readyState === Z.open || this.readyState === Z.connecting;
    }
    poll() {
      const t = { Accept: "application/json" };
      (this.authToken && (t["X-Phoenix-AuthToken"] = this.authToken),
        this.ajax(
          "GET",
          t,
          null,
          () => this.ontimeout(),
          (e) => {
            if (e) {
              var { status: r, token: s, messages: n } = e;
              if (r === 410 && this.token !== null) {
                (this.onerror(410),
                  this.closeAndRetry(3410, "session_gone", !1));
                return;
              }
              this.token = s;
            } else r = 0;
            switch (r) {
              case 200:
                (n.forEach((i) => {
                  setTimeout(() => this.onmessage({ data: i }), 0);
                }),
                  this.poll());
                break;
              case 204:
                this.poll();
                break;
              case 410:
                ((this.readyState = Z.open), this.onopen({}), this.poll());
                break;
              case 403:
                (this.onerror(403), this.close(1008, "forbidden", !1));
                break;
              case 0:
              case 500:
                (this.onerror(500),
                  this.closeAndRetry(1011, "internal server error", 500));
                break;
              default:
                throw new Error(`unhandled poll status ${r}`);
            }
          },
        ));
    }
    send(t) {
      (typeof t != "string" && (t = tn(t)),
        this.currentBatch
          ? this.currentBatch.push(t)
          : this.awaitingBatchAck
            ? this.batchBuffer.push(t)
            : ((this.currentBatch = [t]),
              (this.currentBatchTimer = setTimeout(() => {
                (this.batchSend(this.currentBatch), (this.currentBatch = null));
              }, 0))));
    }
    batchSend(t) {
      ((this.awaitingBatchAck = !0),
        this.ajax(
          "POST",
          { "Content-Type": "application/x-ndjson" },
          t.join(`
`),
          () => this.onerror("timeout"),
          (e) => {
            ((this.awaitingBatchAck = !1),
              !e || e.status !== 200
                ? (this.onerror(e && e.status),
                  this.closeAndRetry(1011, "internal server error", !1))
                : this.batchBuffer.length > 0 &&
                  (this.batchSend(this.batchBuffer), (this.batchBuffer = [])));
          },
        ));
    }
    close(t, e, r) {
      for (let n of this.reqs) n.abort();
      this.readyState = Z.closed;
      let s = Object.assign(
        { code: 1e3, reason: void 0, wasClean: !0 },
        { code: t, reason: e, wasClean: r },
      );
      ((this.batchBuffer = []),
        clearTimeout(this.currentBatchTimer),
        (this.currentBatchTimer = null),
        typeof CloseEvent < "u"
          ? this.onclose(new CloseEvent("close", s))
          : this.onclose(s));
    }
    ajax(t, e, r, s, n) {
      let i,
        a = () => {
          (this.reqs.delete(i), s());
        };
      ((i = Je.request(t, this.endpointURL(), e, r, this.timeout, a, (o) => {
        (this.reqs.delete(i), this.isActive() && n(o));
      })),
        this.reqs.add(i));
    }
  },
  rn = class Ae {
    constructor(e, r = {}) {
      let s = r.events || { state: "presence_state", diff: "presence_diff" };
      ((this.state = {}),
        (this.pendingDiffs = []),
        (this.channel = e),
        (this.joinRef = null),
        (this.caller = {
          onJoin: function () {},
          onLeave: function () {},
          onSync: function () {},
        }),
        this.channel.on(s.state, (n) => {
          let { onJoin: i, onLeave: a, onSync: o } = this.caller;
          ((this.joinRef = this.channel.joinRef()),
            (this.state = Ae.syncState(this.state, n, i, a)),
            this.pendingDiffs.forEach((l) => {
              this.state = Ae.syncDiff(this.state, l, i, a);
            }),
            (this.pendingDiffs = []),
            o());
        }),
        this.channel.on(s.diff, (n) => {
          let { onJoin: i, onLeave: a, onSync: o } = this.caller;
          this.inPendingSyncState()
            ? this.pendingDiffs.push(n)
            : ((this.state = Ae.syncDiff(this.state, n, i, a)), o());
        }));
    }
    onJoin(e) {
      this.caller.onJoin = e;
    }
    onLeave(e) {
      this.caller.onLeave = e;
    }
    onSync(e) {
      this.caller.onSync = e;
    }
    list(e) {
      return Ae.list(this.state, e);
    }
    inPendingSyncState() {
      return !this.joinRef || this.joinRef !== this.channel.joinRef();
    }
    static syncState(e, r, s, n) {
      let i = this.clone(e),
        a = {},
        o = {};
      return (
        this.map(i, (l, c) => {
          r[l] || (o[l] = c);
        }),
        this.map(r, (l, c) => {
          let h = i[l];
          if (h) {
            let u = c.metas.map((m) => m.phx_ref),
              f = h.metas.map((m) => m.phx_ref),
              p = c.metas.filter((m) => f.indexOf(m.phx_ref) < 0),
              g = h.metas.filter((m) => u.indexOf(m.phx_ref) < 0);
            (p.length > 0 && ((a[l] = c), (a[l].metas = p)),
              g.length > 0 && ((o[l] = this.clone(h)), (o[l].metas = g)));
          } else a[l] = c;
        }),
        this.syncDiff(i, { joins: a, leaves: o }, s, n)
      );
    }
    static syncDiff(e, r, s, n) {
      let { joins: i, leaves: a } = this.clone(r);
      return (
        s || (s = function () {}),
        n || (n = function () {}),
        this.map(i, (o, l) => {
          let c = e[o];
          if (((e[o] = this.clone(l)), c)) {
            let h = e[o].metas.map((f) => f.phx_ref),
              u = c.metas.filter((f) => h.indexOf(f.phx_ref) < 0);
            e[o].metas.unshift(...u);
          }
          s(o, c, l);
        }),
        this.map(a, (o, l) => {
          let c = e[o];
          if (!c) return;
          let h = l.metas.map((u) => u.phx_ref);
          ((c.metas = c.metas.filter((u) => h.indexOf(u.phx_ref) < 0)),
            n(o, c, l),
            c.metas.length === 0 && delete e[o]);
        }),
        e
      );
    }
    static list(e, r) {
      return (
        r ||
          (r = function (s, n) {
            return n;
          }),
        this.map(e, (s, n) => r(s, n))
      );
    }
    static map(e, r) {
      return Object.getOwnPropertyNames(e).map((s) => r(s, e[s]));
    }
    static clone(e) {
      return JSON.parse(JSON.stringify(e));
    }
  },
  Fe = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(t, e) {
      if (t.payload.constructor === ArrayBuffer) return e(this.binaryEncode(t));
      {
        let r = [t.join_ref, t.ref, t.topic, t.event, t.payload];
        return e(JSON.stringify(r));
      }
    },
    decode(t, e) {
      if (t.constructor === ArrayBuffer) return e(this.binaryDecode(t));
      {
        let [r, s, n, i, a] = JSON.parse(t);
        return e({ join_ref: r, ref: s, topic: n, event: i, payload: a });
      }
    },
    binaryEncode(t) {
      let { join_ref: e, ref: r, event: s, topic: n, payload: i } = t,
        a = this.META_LENGTH + e.length + r.length + n.length + s.length,
        o = new ArrayBuffer(this.HEADER_LENGTH + a),
        l = new DataView(o),
        c = 0;
      (l.setUint8(c++, this.KINDS.push),
        l.setUint8(c++, e.length),
        l.setUint8(c++, r.length),
        l.setUint8(c++, n.length),
        l.setUint8(c++, s.length),
        Array.from(e, (u) => l.setUint8(c++, u.charCodeAt(0))),
        Array.from(r, (u) => l.setUint8(c++, u.charCodeAt(0))),
        Array.from(n, (u) => l.setUint8(c++, u.charCodeAt(0))),
        Array.from(s, (u) => l.setUint8(c++, u.charCodeAt(0))));
      var h = new Uint8Array(o.byteLength + i.byteLength);
      return (
        h.set(new Uint8Array(o), 0),
        h.set(new Uint8Array(i), o.byteLength),
        h.buffer
      );
    },
    binaryDecode(t) {
      let e = new DataView(t),
        r = e.getUint8(0),
        s = new TextDecoder();
      switch (r) {
        case this.KINDS.push:
          return this.decodePush(t, e, s);
        case this.KINDS.reply:
          return this.decodeReply(t, e, s);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(t, e, s);
      }
    },
    decodePush(t, e, r) {
      let s = e.getUint8(1),
        n = e.getUint8(2),
        i = e.getUint8(3),
        a = this.HEADER_LENGTH + this.META_LENGTH - 1,
        o = r.decode(t.slice(a, a + s));
      a = a + s;
      let l = r.decode(t.slice(a, a + n));
      a = a + n;
      let c = r.decode(t.slice(a, a + i));
      a = a + i;
      let h = t.slice(a, t.byteLength);
      return { join_ref: o, ref: null, topic: l, event: c, payload: h };
    },
    decodeReply(t, e, r) {
      let s = e.getUint8(1),
        n = e.getUint8(2),
        i = e.getUint8(3),
        a = e.getUint8(4),
        o = this.HEADER_LENGTH + this.META_LENGTH,
        l = r.decode(t.slice(o, o + s));
      o = o + s;
      let c = r.decode(t.slice(o, o + n));
      o = o + n;
      let h = r.decode(t.slice(o, o + i));
      o = o + i;
      let u = r.decode(t.slice(o, o + a));
      o = o + a;
      let f = t.slice(o, t.byteLength),
        p = { status: u, response: f };
      return { join_ref: l, ref: c, topic: h, event: te.reply, payload: p };
    },
    decodeBroadcast(t, e, r) {
      let s = e.getUint8(1),
        n = e.getUint8(2),
        i = this.HEADER_LENGTH + 2,
        a = r.decode(t.slice(i, i + s));
      i = i + s;
      let o = r.decode(t.slice(i, i + n));
      i = i + n;
      let l = t.slice(i, t.byteLength);
      return { join_ref: null, ref: null, topic: a, event: o, payload: l };
    },
  },
  sn = class {
    constructor(t, e = {}) {
      ((this.stateChangeCallbacks = {
        open: [],
        close: [],
        error: [],
        message: [],
      }),
        (this.channels = []),
        (this.sendBuffer = []),
        (this.ref = 0),
        (this.fallbackRef = null),
        (this.timeout = e.timeout || Ys),
        (this.transport = e.transport || Y.WebSocket || de),
        (this.conn = void 0),
        (this.primaryPassedHealthCheck = !1),
        (this.longPollFallbackMs = e.longPollFallbackMs),
        (this.fallbackTimer = null));
      let r = null;
      try {
        r = Y && Y.sessionStorage;
      } catch {}
      ((this.sessionStore = e.sessionStorage || r),
        (this.establishedConnections = 0),
        (this.defaultEncoder = Fe.encode.bind(Fe)),
        (this.defaultDecoder = Fe.decode.bind(Fe)),
        (this.closeWasClean = !0),
        (this.disconnecting = !1),
        (this.binaryType = e.binaryType || "arraybuffer"),
        (this.connectClock = 1),
        (this.pageHidden = !1),
        (this.encode = void 0),
        (this.decode = void 0),
        this.transport !== de
          ? ((this.encode = e.encode || this.defaultEncoder),
            (this.decode = e.decode || this.defaultDecoder))
          : ((this.encode = this.defaultEncoder),
            (this.decode = this.defaultDecoder)));
      let s = null;
      (ve &&
        ve.addEventListener &&
        (ve.addEventListener("pagehide", (n) => {
          this.conn && (this.disconnect(), (s = this.connectClock));
        }),
        ve.addEventListener("pageshow", (n) => {
          s === this.connectClock && ((s = null), this.connect());
        }),
        ve.addEventListener("visibilitychange", () => {
          document.visibilityState === "hidden"
            ? (this.pageHidden = !0)
            : ((this.pageHidden = !1),
              !this.isConnected() &&
                !this.closeWasClean &&
                this.teardown(() => this.connect()));
        })),
        (this.heartbeatIntervalMs = e.heartbeatIntervalMs || 3e4),
        (this.autoSendHeartbeat = e.autoSendHeartbeat ?? !0),
        (this.heartbeatCallback = e.heartbeatCallback ?? (() => {})),
        (this.rejoinAfterMs = (n) =>
          e.rejoinAfterMs ? e.rejoinAfterMs(n) : [1e3, 2e3, 5e3][n - 1] || 1e4),
        (this.reconnectAfterMs = (n) =>
          e.reconnectAfterMs
            ? e.reconnectAfterMs(n)
            : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][n - 1] || 5e3),
        (this.logger = e.logger || null),
        !this.logger &&
          e.debug &&
          (this.logger = (n, i, a) => {
            console.log(`${n}: ${i}`, a);
          }),
        (this.longpollerTimeout = e.longpollerTimeout || 2e4),
        (this.params = je(e.params || {})),
        (this.endPoint = `${t}/${_t.websocket}`),
        (this.vsn = e.vsn || Xs),
        (this.heartbeatTimeoutTimer = null),
        (this.heartbeatTimer = null),
        (this.heartbeatSentAt = null),
        (this.pendingHeartbeatRef = null),
        (this.reconnectTimer = new Kr(() => {
          if (this.pageHidden) {
            (this.log("Not reconnecting as page is hidden!"), this.teardown());
            return;
          }
          this.teardown(async () => {
            (e.beforeReconnect && (await e.beforeReconnect()), this.connect());
          });
        }, this.reconnectAfterMs)),
        (this.authToken = e.authToken));
    }
    getLongPollTransport() {
      return de;
    }
    replaceTransport(t) {
      (this.connectClock++,
        (this.closeWasClean = !0),
        clearTimeout(this.fallbackTimer),
        this.reconnectTimer.reset(),
        this.conn && (this.conn.close(), (this.conn = null)),
        (this.transport = t));
    }
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let t = Je.appendParams(Je.appendParams(this.endPoint, this.params()), {
        vsn: this.vsn,
      });
      return t.charAt(0) !== "/"
        ? t
        : t.charAt(1) === "/"
          ? `${this.protocol()}:${t}`
          : `${this.protocol()}://${location.host}${t}`;
    }
    disconnect(t, e, r) {
      (this.connectClock++,
        (this.disconnecting = !0),
        (this.closeWasClean = !0),
        clearTimeout(this.fallbackTimer),
        this.reconnectTimer.reset(),
        this.teardown(
          () => {
            ((this.disconnecting = !1), t && t());
          },
          e,
          r,
        ));
    }
    connect(t) {
      (t &&
        (console &&
          console.log(
            "passing params to connect is deprecated. Instead pass :params to the Socket constructor",
          ),
        (this.params = je(t))),
        !(this.conn && !this.disconnecting) &&
          (this.longPollFallbackMs && this.transport !== de
            ? this.connectWithFallback(de, this.longPollFallbackMs)
            : this.transportConnect()));
    }
    log(t, e, r) {
      this.logger && this.logger(t, e, r);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(t) {
      let e = this.makeRef();
      return (this.stateChangeCallbacks.open.push([e, t]), e);
    }
    onClose(t) {
      let e = this.makeRef();
      return (this.stateChangeCallbacks.close.push([e, t]), e);
    }
    onError(t) {
      let e = this.makeRef();
      return (this.stateChangeCallbacks.error.push([e, t]), e);
    }
    onMessage(t) {
      let e = this.makeRef();
      return (this.stateChangeCallbacks.message.push([e, t]), e);
    }
    onHeartbeat(t) {
      this.heartbeatCallback = t;
    }
    ping(t) {
      if (!this.isConnected()) return !1;
      let e = this.makeRef(),
        r = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: e });
      let s = this.onMessage((n) => {
        n.ref === e && (this.off([s]), t(Date.now() - r));
      });
      return !0;
    }
    transportName(t) {
      switch (t) {
        case de:
          return "LongPoll";
        default:
          return t.name;
      }
    }
    transportConnect() {
      (this.connectClock++, (this.closeWasClean = !1));
      let t;
      (this.authToken &&
        (t = ["phoenix", `${xt}${btoa(this.authToken).replace(/=/g, "")}`]),
        (this.conn = new this.transport(this.endPointURL(), t)),
        (this.conn.binaryType = this.binaryType),
        (this.conn.timeout = this.longpollerTimeout),
        (this.conn.onopen = () => this.onConnOpen()),
        (this.conn.onerror = (e) => this.onConnError(e)),
        (this.conn.onmessage = (e) => this.onConnMessage(e)),
        (this.conn.onclose = (e) => this.onConnClose(e)));
    }
    getSession(t) {
      return this.sessionStore && this.sessionStore.getItem(t);
    }
    storeSession(t, e) {
      this.sessionStore && this.sessionStore.setItem(t, e);
    }
    connectWithFallback(t, e = 2500) {
      clearTimeout(this.fallbackTimer);
      let r = !1,
        s = !0,
        n,
        i,
        a = this.transportName(t),
        o = (l) => {
          (this.log("transport", `falling back to ${a}...`, l),
            this.off([n, i]),
            (s = !1),
            this.replaceTransport(t),
            this.transportConnect());
        };
      if (this.getSession(`phx:fallback:${a}`)) return o("memorized");
      ((this.fallbackTimer = setTimeout(o, e)),
        (i = this.onError((l) => {
          (this.log("transport", "error", l),
            s && !r && (clearTimeout(this.fallbackTimer), o(l)));
        })),
        this.fallbackRef && this.off([this.fallbackRef]),
        (this.fallbackRef = this.onOpen(() => {
          if (((r = !0), !s)) {
            let l = this.transportName(t);
            return (
              this.primaryPassedHealthCheck ||
                this.storeSession(`phx:fallback:${l}`, "true"),
              this.log("transport", `established ${l} fallback`)
            );
          }
          (clearTimeout(this.fallbackTimer),
            (this.fallbackTimer = setTimeout(o, e)),
            this.ping((l) => {
              (this.log("transport", "connected to primary after", l),
                (this.primaryPassedHealthCheck = !0),
                clearTimeout(this.fallbackTimer));
            }));
        })),
        this.transportConnect());
    }
    clearHeartbeats() {
      (clearTimeout(this.heartbeatTimer),
        clearTimeout(this.heartbeatTimeoutTimer));
    }
    onConnOpen() {
      (this.hasLogger() &&
        this.log("transport", `connected to ${this.endPointURL()}`),
        (this.closeWasClean = !1),
        (this.disconnecting = !1),
        this.establishedConnections++,
        this.flushSendBuffer(),
        this.reconnectTimer.reset(),
        this.autoSendHeartbeat && this.resetHeartbeat(),
        this.triggerStateCallbacks("open"));
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        ((this.pendingHeartbeatRef = null),
          (this.heartbeatSentAt = null),
          this.hasLogger() &&
            this.log(
              "transport",
              "heartbeat timeout. Attempting to re-establish connection",
            ));
        try {
          this.heartbeatCallback("timeout");
        } catch (t) {
          this.log("error", "error in heartbeat callback", t);
        }
        (this.triggerChanError(new Error("heartbeat timeout")),
          (this.closeWasClean = !1),
          this.teardown(
            () => this.reconnectTimer.scheduleTimeout(),
            Zs,
            "heartbeat timeout",
          ));
      }
    }
    resetHeartbeat() {
      (this.conn && this.conn.skipHeartbeat) ||
        ((this.pendingHeartbeatRef = null),
        this.clearHeartbeats(),
        (this.heartbeatTimer = setTimeout(
          () => this.sendHeartbeat(),
          this.heartbeatIntervalMs,
        )));
    }
    teardown(t, e, r) {
      if (!this.conn) return t && t();
      const s = this.conn;
      this.waitForBufferDone(s, () => {
        (e ? s.close(e, r || "") : s.close(),
          this.waitForSocketClosed(s, () => {
            (this.conn === s &&
              ((this.conn.onopen = function () {}),
              (this.conn.onerror = function () {}),
              (this.conn.onmessage = function () {}),
              (this.conn.onclose = function () {}),
              (this.conn = null)),
              t && t());
          }));
      });
    }
    waitForBufferDone(t, e, r = 1) {
      if (r === 5 || !t.bufferedAmount) {
        e();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(t, e, r + 1);
      }, 150 * r);
    }
    waitForSocketClosed(t, e, r = 1) {
      if (r === 5 || t.readyState === Z.closed) {
        e();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(t, e, r + 1);
      }, 150 * r);
    }
    onConnClose(t) {
      (this.conn && (this.conn.onclose = () => {}),
        this.hasLogger() && this.log("transport", "close", t),
        this.triggerChanError(t),
        this.clearHeartbeats(),
        this.closeWasClean || this.reconnectTimer.scheduleTimeout(),
        this.triggerStateCallbacks("close", t));
    }
    onConnError(t) {
      this.hasLogger() && this.log("transport", "error", t);
      let e = this.transport,
        r = this.establishedConnections;
      (this.triggerStateCallbacks("error", t, e, r),
        (e === this.transport || r > 0) && this.triggerChanError(t));
    }
    triggerChanError(t) {
      this.channels.forEach((e) => {
        e.isErrored() ||
          e.isLeaving() ||
          e.isClosed() ||
          e.trigger(te.error, t);
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case Z.connecting:
          return "connecting";
        case Z.open:
          return "open";
        case Z.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(t) {
      (this.off(t.stateChangeRefs),
        (this.channels = this.channels.filter((e) => e !== t)));
    }
    off(t) {
      for (let e in this.stateChangeCallbacks)
        this.stateChangeCallbacks[e] = this.stateChangeCallbacks[e].filter(
          ([r]) => t.indexOf(r) === -1,
        );
    }
    channel(t, e = {}) {
      let r = new en(t, e, this);
      return (this.channels.push(r), r);
    }
    push(t) {
      if (this.hasLogger()) {
        let { topic: e, event: r, payload: s, ref: n, join_ref: i } = t;
        this.log("push", `${e} ${r} (${i}, ${n})`, s);
      }
      this.isConnected()
        ? this.encode(t, (e) => this.conn.send(e))
        : this.sendBuffer.push(() => this.encode(t, (e) => this.conn.send(e)));
    }
    makeRef() {
      let t = this.ref + 1;
      return (
        t === this.ref ? (this.ref = 0) : (this.ref = t),
        this.ref.toString()
      );
    }
    sendHeartbeat() {
      if (!this.isConnected()) {
        try {
          this.heartbeatCallback("disconnected");
        } catch (t) {
          this.log("error", "error in heartbeat callback", t);
        }
        return;
      }
      if (this.pendingHeartbeatRef) {
        this.heartbeatTimeout();
        return;
      }
      ((this.pendingHeartbeatRef = this.makeRef()),
        (this.heartbeatSentAt = Date.now()),
        this.push({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: this.pendingHeartbeatRef,
        }));
      try {
        this.heartbeatCallback("sent");
      } catch (t) {
        this.log("error", "error in heartbeat callback", t);
      }
      this.heartbeatTimeoutTimer = setTimeout(
        () => this.heartbeatTimeout(),
        this.heartbeatIntervalMs,
      );
    }
    flushSendBuffer() {
      this.isConnected() &&
        this.sendBuffer.length > 0 &&
        (this.sendBuffer.forEach((t) => t()), (this.sendBuffer = []));
    }
    onConnMessage(t) {
      this.decode(t.data, (e) => {
        let { topic: r, event: s, payload: n, ref: i, join_ref: a } = e;
        if (i && i === this.pendingHeartbeatRef) {
          const o = this.heartbeatSentAt
            ? Date.now() - this.heartbeatSentAt
            : void 0;
          this.clearHeartbeats();
          try {
            this.heartbeatCallback(n.status === "ok" ? "ok" : "error", o);
          } catch (l) {
            this.log("error", "error in heartbeat callback", l);
          }
          ((this.pendingHeartbeatRef = null),
            (this.heartbeatSentAt = null),
            this.autoSendHeartbeat &&
              (this.heartbeatTimer = setTimeout(
                () => this.sendHeartbeat(),
                this.heartbeatIntervalMs,
              )));
        }
        this.hasLogger() &&
          this.log(
            "receive",
            `${n.status || ""} ${r} ${s} ${(i && "(" + i + ")") || ""}`.trim(),
            n,
          );
        for (let o = 0; o < this.channels.length; o++) {
          const l = this.channels[o];
          l.isMember(r, s, n, a) && l.trigger(s, n, i, a);
        }
        this.triggerStateCallbacks("message", e);
      });
    }
    triggerStateCallbacks(t, ...e) {
      try {
        this.stateChangeCallbacks[t].forEach(([r, s]) => {
          try {
            s(...e);
          } catch (n) {
            this.log("error", `error in ${t} callback`, n);
          }
        });
      } catch (r) {
        this.log("error", `error triggering ${t} callbacks`, r);
      }
    }
    leaveOpenTopic(t) {
      let e = this.channels.find(
        (r) => r.topic === t && (r.isJoined() || r.isJoining()),
      );
      e &&
        (this.hasLogger() &&
          this.log("transport", `leaving duplicate topic "${t}"`),
        e.leave());
    }
  };
class Ce {
  constructor(e, r) {
    const s = an(r);
    ((this.presence = new rn(e.getChannel(), s)),
      this.presence.onJoin((n, i, a) => {
        const o = Ce.onJoinPayload(n, i, a);
        e.getChannel().trigger("presence", o);
      }),
      this.presence.onLeave((n, i, a) => {
        const o = Ce.onLeavePayload(n, i, a);
        e.getChannel().trigger("presence", o);
      }),
      this.presence.onSync(() => {
        e.getChannel().trigger("presence", { event: "sync" });
      }));
  }
  get state() {
    return Ce.transformState(this.presence.state);
  }
  static transformState(e) {
    return (
      (e = nn(e)),
      Object.getOwnPropertyNames(e).reduce((r, s) => {
        const n = e[s];
        return ((r[s] = Ke(n)), r);
      }, {})
    );
  }
  static onJoinPayload(e, r, s) {
    const n = qt(r),
      i = Ke(s);
    return { event: "join", key: e, currentPresences: n, newPresences: i };
  }
  static onLeavePayload(e, r, s) {
    const n = qt(r),
      i = Ke(s);
    return { event: "leave", key: e, currentPresences: n, leftPresences: i };
  }
}
function Ke(t) {
  return t.metas.map(
    (e) => (
      (e.presence_ref = e.phx_ref),
      delete e.phx_ref,
      delete e.phx_ref_prev,
      e
    ),
  );
}
function nn(t) {
  return JSON.parse(JSON.stringify(t));
}
function an(t) {
  return t?.events && { events: t.events };
}
function qt(t) {
  return t?.metas ? Ke(t) : [];
}
var Wt;
(function (t) {
  ((t.SYNC = "sync"), (t.JOIN = "join"), (t.LEAVE = "leave"));
})(Wt || (Wt = {}));
class on {
  get state() {
    return this.presenceAdapter.state;
  }
  constructor(e, r) {
    ((this.channel = e),
      (this.presenceAdapter = new Ce(this.channel.channelAdapter, r)));
  }
}
function ln(t) {
  if (t instanceof Error) return t;
  if (typeof t == "string") return new Error(t);
  if (t && typeof t == "object") {
    const e = t;
    if (typeof e.code == "number") {
      const r = typeof e.reason == "string" && e.reason ? ` (${e.reason})` : "";
      return new Error(`socket closed: ${e.code}${r}`, { cause: t });
    }
    return new Error("channel error: transport failure", { cause: t });
  }
  return new Error("channel error: connection lost");
}
class cn {
  constructor(e, r, s) {
    const n = hn(s);
    ((this.channel = e.getSocket().channel(r, n)), (this.socket = e));
  }
  get state() {
    return this.channel.state;
  }
  set state(e) {
    this.channel.state = e;
  }
  get joinedOnce() {
    return this.channel.joinedOnce;
  }
  get joinPush() {
    return this.channel.joinPush;
  }
  get rejoinTimer() {
    return this.channel.rejoinTimer;
  }
  on(e, r) {
    return this.channel.on(e, r);
  }
  off(e, r) {
    this.channel.off(e, r);
  }
  subscribe(e) {
    return this.channel.join(e);
  }
  unsubscribe(e) {
    return this.channel.leave(e);
  }
  teardown() {
    this.channel.teardown();
  }
  onClose(e) {
    this.channel.onClose(e);
  }
  onError(e) {
    return this.channel.onError(e);
  }
  push(e, r, s) {
    let n;
    try {
      n = this.channel.push(e, r, s);
    } catch {
      throw new Error(
        `tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`,
      );
    }
    if (this.channel.pushBuffer.length > zs) {
      const i = this.channel.pushBuffer.shift();
      (i.cancelTimeout(),
        this.socket.log(
          "channel",
          `discarded push due to buffer overflow: ${i.event}`,
          i.payload(),
        ));
    }
    return n;
  }
  updateJoinPayload(e) {
    const r = this.channel.joinPush.payload();
    this.channel.joinPush.payload = () =>
      Object.assign(Object.assign({}, r), e);
  }
  canPush() {
    return this.socket.isConnected() && this.state === ne.joined;
  }
  isJoined() {
    return this.state === ne.joined;
  }
  isJoining() {
    return this.state === ne.joining;
  }
  isClosed() {
    return this.state === ne.closed;
  }
  isLeaving() {
    return this.state === ne.leaving;
  }
  updateFilterBindings(e) {
    this.channel.filterBindings = e;
  }
  updatePayloadTransform(e) {
    this.channel.onMessage = e;
  }
  getChannel() {
    return this.channel;
  }
}
function hn(t) {
  return {
    config: Object.assign(
      {
        broadcast: { ack: !1, self: !1 },
        presence: { key: "", enabled: !1 },
        private: !1,
      },
      t.config,
    ),
  };
}
var Ht;
(function (t) {
  ((t.ALL = "*"),
    (t.INSERT = "INSERT"),
    (t.UPDATE = "UPDATE"),
    (t.DELETE = "DELETE"));
})(Ht || (Ht = {}));
var _e;
(function (t) {
  ((t.BROADCAST = "broadcast"),
    (t.PRESENCE = "presence"),
    (t.POSTGRES_CHANGES = "postgres_changes"),
    (t.SYSTEM = "system"));
})(_e || (_e = {}));
var re;
(function (t) {
  ((t.SUBSCRIBED = "SUBSCRIBED"),
    (t.TIMED_OUT = "TIMED_OUT"),
    (t.CLOSED = "CLOSED"),
    (t.CHANNEL_ERROR = "CHANNEL_ERROR"));
})(re || (re = {}));
class Oe {
  get state() {
    return this.channelAdapter.state;
  }
  set state(e) {
    this.channelAdapter.state = e;
  }
  get joinedOnce() {
    return this.channelAdapter.joinedOnce;
  }
  get timeout() {
    return this.socket.timeout;
  }
  get joinPush() {
    return this.channelAdapter.joinPush;
  }
  get rejoinTimer() {
    return this.channelAdapter.rejoinTimer;
  }
  constructor(e, r = { config: {} }, s) {
    var n, i;
    if (
      ((this.topic = e),
      (this.params = r),
      (this.socket = s),
      (this.bindings = {}),
      (this.subTopic = e.replace(/^realtime:/i, "")),
      (this.params.config = Object.assign(
        {
          broadcast: { ack: !1, self: !1 },
          presence: { key: "", enabled: !1 },
          private: !1,
        },
        r.config,
      )),
      (this.channelAdapter = new cn(this.socket.socketAdapter, e, this.params)),
      (this.presence = new on(this)),
      this._onClose(() => {
        this.socket._remove(this);
      }),
      this._updateFilterTransform(),
      (this.broadcastEndpointURL = Gr(this.socket.socketAdapter.endPointURL())),
      (this.private = this.params.config.private || !1),
      !this.private &&
        !(
          (i =
            (n = this.params.config) === null || n === void 0
              ? void 0
              : n.broadcast) === null || i === void 0
        ) &&
        i.replay)
    )
      throw new Error(
        `tried to use replay on public channel '${this.topic}'. It must be a private channel.`,
      );
  }
  subscribe(e, r = this.timeout) {
    var s, n, i;
    if (
      (this.socket.isConnected() || this.socket.connect(),
      this.channelAdapter.isClosed())
    ) {
      const {
          config: { broadcast: a, presence: o, private: l },
        } = this.params,
        c =
          (n =
            (s = this.bindings.postgres_changes) === null || s === void 0
              ? void 0
              : s.map((p) => p.filter)) !== null && n !== void 0
            ? n
            : [],
        h =
          (!!this.bindings[_e.PRESENCE] &&
            this.bindings[_e.PRESENCE].length > 0) ||
          ((i = this.params.config.presence) === null || i === void 0
            ? void 0
            : i.enabled) === !0,
        u = {},
        f = {
          broadcast: a,
          presence: Object.assign(Object.assign({}, o), { enabled: h }),
          postgres_changes: c,
          private: l,
        };
      (this.socket.accessTokenValue &&
        (u.access_token = this.socket.accessTokenValue),
        this._onError((p) => {
          e?.(re.CHANNEL_ERROR, ln(p));
        }),
        this._onClose(() => e?.(re.CLOSED)),
        this.updateJoinPayload(Object.assign({ config: f }, u)),
        this._updateFilterMessage(),
        this.channelAdapter
          .subscribe(r)
          .receive("ok", async ({ postgres_changes: p }) => {
            if (
              (this.socket._isManualToken() || this.socket.setAuth(),
              p === void 0)
            ) {
              e?.(re.SUBSCRIBED);
              return;
            }
            this._updatePostgresBindings(p, e);
          })
          .receive("error", (p) => {
            this.state = ne.errored;
            const g = Object.values(p).join(", ") || "error";
            e?.(re.CHANNEL_ERROR, new Error(g, { cause: p }));
          })
          .receive("timeout", () => {
            e?.(re.TIMED_OUT);
          }));
    }
    return this;
  }
  _updatePostgresBindings(e, r) {
    var s;
    const n = this.bindings.postgres_changes,
      i = (s = n?.length) !== null && s !== void 0 ? s : 0,
      a = [];
    for (let o = 0; o < i; o++) {
      const l = n[o],
        {
          filter: { event: c, schema: h, table: u, filter: f },
        } = l,
        p = e && e[o];
      if (
        p &&
        p.event === c &&
        Oe.isFilterValueEqual(p.schema, h) &&
        Oe.isFilterValueEqual(p.table, u) &&
        Oe.isFilterValueEqual(p.filter, f)
      )
        a.push(Object.assign(Object.assign({}, l), { id: p.id }));
      else {
        (this.unsubscribe(),
          (this.state = ne.errored),
          r?.(
            re.CHANNEL_ERROR,
            new Error(
              "mismatch between server and client bindings for postgres changes",
            ),
          ));
        return;
      }
    }
    ((this.bindings.postgres_changes = a),
      this.state != ne.errored && r && r(re.SUBSCRIBED));
  }
  presenceState() {
    return this.presence.state;
  }
  async track(e, r = {}) {
    return await this.send(
      { type: "presence", event: "track", payload: e },
      r.timeout || this.timeout,
    );
  }
  async untrack(e = {}) {
    return await this.send({ type: "presence", event: "untrack" }, e);
  }
  on(e, r, s) {
    const n = this.channelAdapter.isJoined() || this.channelAdapter.isJoining(),
      i = e === _e.PRESENCE || e === _e.POSTGRES_CHANGES;
    if (n && i)
      throw (
        this.socket.log(
          "channel",
          `cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`,
        ),
        new Error(
          `cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`,
        )
      );
    return this._on(e, r, s);
  }
  async httpSend(e, r, s = {}) {
    var n;
    if (r == null)
      return Promise.reject(new Error("Payload is required for httpSend()"));
    const i = {
      apikey: this.socket.apiKey ? this.socket.apiKey : "",
      "Content-Type": "application/json",
    };
    this.socket.accessTokenValue &&
      (i.Authorization = `Bearer ${this.socket.accessTokenValue}`);
    const a = {
        method: "POST",
        headers: i,
        body: JSON.stringify({
          messages: [
            {
              topic: this.subTopic,
              event: e,
              payload: r,
              private: this.private,
            },
          ],
        }),
      },
      o = await this._fetchWithTimeout(
        this.broadcastEndpointURL,
        a,
        (n = s.timeout) !== null && n !== void 0 ? n : this.timeout,
      );
    if (o.status === 202) return { success: !0 };
    let l = o.statusText;
    try {
      const c = await o.json();
      l = c.error || c.message || l;
    } catch {}
    return Promise.reject(new Error(l));
  }
  async send(e, r = {}) {
    var s, n;
    if (!this.channelAdapter.canPush() && e.type === "broadcast") {
      console.warn(
        "Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.",
      );
      const { event: i, payload: a } = e,
        o = {
          apikey: this.socket.apiKey ? this.socket.apiKey : "",
          "Content-Type": "application/json",
        };
      this.socket.accessTokenValue &&
        (o.Authorization = `Bearer ${this.socket.accessTokenValue}`);
      const l = {
        method: "POST",
        headers: o,
        body: JSON.stringify({
          messages: [
            {
              topic: this.subTopic,
              event: i,
              payload: a,
              private: this.private,
            },
          ],
        }),
      };
      try {
        const c = await this._fetchWithTimeout(
          this.broadcastEndpointURL,
          l,
          (s = r.timeout) !== null && s !== void 0 ? s : this.timeout,
        );
        return (
          await ((n = c.body) === null || n === void 0 ? void 0 : n.cancel()),
          c.ok ? "ok" : "error"
        );
      } catch (c) {
        return c instanceof Error && c.name === "AbortError"
          ? "timed out"
          : "error";
      }
    } else
      return new Promise((i) => {
        var a, o, l;
        const c = this.channelAdapter.push(
          e.type,
          e,
          r.timeout || this.timeout,
        );
        (e.type === "broadcast" &&
          !(
            !(
              (l =
                (o =
                  (a = this.params) === null || a === void 0
                    ? void 0
                    : a.config) === null || o === void 0
                  ? void 0
                  : o.broadcast) === null || l === void 0
            ) && l.ack
          ) &&
          i("ok"),
          c.receive("ok", () => i("ok")),
          c.receive("error", () => i("error")),
          c.receive("timeout", () => i("timed out")));
      });
  }
  updateJoinPayload(e) {
    this.channelAdapter.updateJoinPayload(e);
  }
  async unsubscribe(e = this.timeout) {
    return new Promise((r) => {
      this.channelAdapter
        .unsubscribe(e)
        .receive("ok", () => r("ok"))
        .receive("timeout", () => r("timed out"))
        .receive("error", () => r("error"));
    });
  }
  teardown() {
    this.channelAdapter.teardown();
  }
  async _fetchWithTimeout(e, r, s) {
    const n = new AbortController(),
      i = setTimeout(() => n.abort(), s),
      a = await this.socket.fetch(
        e,
        Object.assign(Object.assign({}, r), { signal: n.signal }),
      );
    return (clearTimeout(i), a);
  }
  _on(e, r, s) {
    const n = e.toLocaleLowerCase(),
      i = this.channelAdapter.on(e, s),
      a = { type: n, filter: r, callback: s, ref: i };
    return (
      this.bindings[n] ? this.bindings[n].push(a) : (this.bindings[n] = [a]),
      this._updateFilterMessage(),
      this
    );
  }
  _onClose(e) {
    this.channelAdapter.onClose(e);
  }
  _onError(e) {
    this.channelAdapter.onError(e);
  }
  _updateFilterMessage() {
    this.channelAdapter.updateFilterBindings((e, r, s) => {
      var n, i, a, o, l, c, h;
      const u = e.event.toLocaleLowerCase();
      if (this._notThisChannelEvent(u, s)) return !1;
      const f =
        (n = this.bindings[u]) === null || n === void 0
          ? void 0
          : n.find((p) => p.ref === e.ref);
      if (!f) return !0;
      if (["broadcast", "presence", "postgres_changes"].includes(u))
        if ("id" in f) {
          const p = f.id,
            g = (i = f.filter) === null || i === void 0 ? void 0 : i.event;
          return (
            p &&
            ((a = r.ids) === null || a === void 0 ? void 0 : a.includes(p)) &&
            (g === "*" ||
              g?.toLocaleLowerCase() ===
                ((o = r.data) === null || o === void 0
                  ? void 0
                  : o.type.toLocaleLowerCase()))
          );
        } else {
          const p =
            (c =
              (l = f?.filter) === null || l === void 0 ? void 0 : l.event) ===
              null || c === void 0
              ? void 0
              : c.toLocaleLowerCase();
          return (
            p === "*" ||
            p ===
              ((h = r?.event) === null || h === void 0
                ? void 0
                : h.toLocaleLowerCase())
          );
        }
      else return f.type.toLocaleLowerCase() === u;
    });
  }
  _notThisChannelEvent(e, r) {
    const { close: s, error: n, leave: i, join: a } = Hr;
    return r && [s, n, i, a].includes(e) && r !== this.joinPush.ref;
  }
  _updateFilterTransform() {
    this.channelAdapter.updatePayloadTransform((e, r, s) => {
      if (typeof r == "object" && "ids" in r) {
        const n = r.data,
          { schema: i, table: a, commit_timestamp: o, type: l, errors: c } = n;
        return Object.assign(
          Object.assign(
            {},
            {
              schema: i,
              table: a,
              commit_timestamp: o,
              eventType: l,
              new: {},
              old: {},
              errors: c,
            },
          ),
          this._getPayloadRecords(n),
        );
      }
      return r;
    });
  }
  copyBindings(e) {
    if (this.joinedOnce)
      throw new Error("cannot copy bindings into joined channel");
    for (const r in e.bindings)
      for (const s of e.bindings[r]) this._on(s.type, s.filter, s.callback);
  }
  static isFilterValueEqual(e, r) {
    return (e ?? void 0) === (r ?? void 0);
  }
  _getPayloadRecords(e) {
    const r = { new: {}, old: {} };
    return (
      (e.type === "INSERT" || e.type === "UPDATE") &&
        (r.new = Ft(e.columns, e.record)),
      (e.type === "UPDATE" || e.type === "DELETE") &&
        (r.old = Ft(e.columns, e.old_record)),
      r
    );
  }
}
class un {
  constructor(e, r) {
    this.socket = new sn(e, r);
  }
  get timeout() {
    return this.socket.timeout;
  }
  get endPoint() {
    return this.socket.endPoint;
  }
  get transport() {
    return this.socket.transport;
  }
  get heartbeatIntervalMs() {
    return this.socket.heartbeatIntervalMs;
  }
  get heartbeatCallback() {
    return this.socket.heartbeatCallback;
  }
  set heartbeatCallback(e) {
    this.socket.heartbeatCallback = e;
  }
  get heartbeatTimer() {
    return this.socket.heartbeatTimer;
  }
  get pendingHeartbeatRef() {
    return this.socket.pendingHeartbeatRef;
  }
  get reconnectTimer() {
    return this.socket.reconnectTimer;
  }
  get vsn() {
    return this.socket.vsn;
  }
  get encode() {
    return this.socket.encode;
  }
  get decode() {
    return this.socket.decode;
  }
  get reconnectAfterMs() {
    return this.socket.reconnectAfterMs;
  }
  get sendBuffer() {
    return this.socket.sendBuffer;
  }
  get stateChangeCallbacks() {
    return this.socket.stateChangeCallbacks;
  }
  connect() {
    this.socket.connect();
  }
  disconnect(e, r, s, n = 1e4) {
    return new Promise((i) => {
      (setTimeout(() => i("timeout"), n),
        this.socket.disconnect(
          () => {
            (e(), i("ok"));
          },
          r,
          s,
        ));
    });
  }
  push(e) {
    this.socket.push(e);
  }
  log(e, r, s) {
    this.socket.log(e, r, s);
  }
  makeRef() {
    return this.socket.makeRef();
  }
  onOpen(e) {
    this.socket.onOpen(e);
  }
  onClose(e) {
    this.socket.onClose(e);
  }
  onError(e) {
    this.socket.onError(e);
  }
  onMessage(e) {
    this.socket.onMessage(e);
  }
  isConnected() {
    return this.socket.isConnected();
  }
  isConnecting() {
    return this.socket.connectionState() == bt.connecting;
  }
  isDisconnecting() {
    return this.socket.connectionState() == bt.closing;
  }
  connectionState() {
    return this.socket.connectionState();
  }
  endPointURL() {
    return this.socket.endPointURL();
  }
  sendHeartbeat() {
    this.socket.sendHeartbeat();
  }
  getSocket() {
    return this.socket;
  }
}
const Vt = { HEARTBEAT_INTERVAL: 25e3 },
  dn = [1e3, 2e3, 5e3, 1e4],
  fn = 1e4;
function pn() {
  const t = new Map();
  return {
    get length() {
      return t.size;
    },
    clear() {
      t.clear();
    },
    getItem(e) {
      return t.has(e) ? t.get(e) : null;
    },
    key(e) {
      var r;
      return (r = Array.from(t.keys())[e]) !== null && r !== void 0 ? r : null;
    },
    removeItem(e) {
      t.delete(e);
    },
    setItem(e, r) {
      t.set(e, String(r));
    },
  };
}
function gn() {
  try {
    if (typeof globalThis < "u" && globalThis.sessionStorage)
      return globalThis.sessionStorage;
  } catch {}
  return pn();
}
const mn = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
class yn {
  get endPoint() {
    return this.socketAdapter.endPoint;
  }
  get timeout() {
    return this.socketAdapter.timeout;
  }
  get transport() {
    return this.socketAdapter.transport;
  }
  get heartbeatCallback() {
    return this.socketAdapter.heartbeatCallback;
  }
  get heartbeatIntervalMs() {
    return this.socketAdapter.heartbeatIntervalMs;
  }
  get heartbeatTimer() {
    return this.worker
      ? this._workerHeartbeatTimer
      : this.socketAdapter.heartbeatTimer;
  }
  get pendingHeartbeatRef() {
    return this.worker
      ? this._pendingWorkerHeartbeatRef
      : this.socketAdapter.pendingHeartbeatRef;
  }
  get reconnectTimer() {
    return this.socketAdapter.reconnectTimer;
  }
  get vsn() {
    return this.socketAdapter.vsn;
  }
  get encode() {
    return this.socketAdapter.encode;
  }
  get decode() {
    return this.socketAdapter.decode;
  }
  get reconnectAfterMs() {
    return this.socketAdapter.reconnectAfterMs;
  }
  get sendBuffer() {
    return this.socketAdapter.sendBuffer;
  }
  get stateChangeCallbacks() {
    return this.socketAdapter.stateChangeCallbacks;
  }
  constructor(e, r) {
    var s;
    if (
      ((this.channels = new Array()),
      (this.accessTokenValue = null),
      (this.accessToken = null),
      (this.apiKey = null),
      (this.httpEndpoint = ""),
      (this.headers = {}),
      (this.params = {}),
      (this.ref = 0),
      (this.serializer = new Fs()),
      (this._manuallySetToken = !1),
      (this._authPromise = null),
      (this._workerHeartbeatTimer = void 0),
      (this._pendingWorkerHeartbeatRef = null),
      (this._pendingDisconnectTimer = null),
      (this._disconnectOnEmptyChannelsAfterMs = 0),
      (this._resolveFetch = (i) =>
        i ? (...a) => i(...a) : (...a) => fetch(...a)),
      !(!((s = r?.params) === null || s === void 0) && s.apikey))
    )
      throw new Error("API key is required to connect to Realtime");
    this.apiKey = r.params.apikey;
    const n = this._initializeOptions(r);
    ((this.socketAdapter = new un(e, n)),
      (this.httpEndpoint = Gr(e)),
      (this.fetch = this._resolveFetch(r?.fetch)));
  }
  connect() {
    if (
      !(this.isConnecting() || this.isDisconnecting() || this.isConnected())
    ) {
      (this.accessToken && !this._authPromise && this._setAuthSafely("connect"),
        this._setupConnectionHandlers());
      try {
        this.socketAdapter.connect();
      } catch (e) {
        const r = e.message;
        throw r.includes("Node.js")
          ? new Error(`${r}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`)
          : new Error(`WebSocket not available: ${r}`);
      }
      this._handleNodeJsRaceCondition();
    }
  }
  endpointURL() {
    return this.socketAdapter.endPointURL();
  }
  async disconnect(e, r) {
    return (
      this._cancelPendingDisconnect(),
      this.isDisconnecting()
        ? "ok"
        : await this.socketAdapter.disconnect(
            () => {
              (clearInterval(this._workerHeartbeatTimer),
                this._terminateWorker());
            },
            e,
            r,
          )
    );
  }
  getChannels() {
    return this.channels;
  }
  async removeChannel(e) {
    const r = await e.unsubscribe();
    return (r === "ok" && e.teardown(), r);
  }
  async removeAllChannels() {
    const e = this.channels.map(async (s) => {
        const n = await s.unsubscribe();
        return (s.teardown(), n);
      }),
      r = await Promise.all(e);
    return (await this.disconnect(), r);
  }
  log(e, r, s) {
    this.socketAdapter.log(e, r, s);
  }
  connectionState() {
    return this.socketAdapter.connectionState() || bt.closed;
  }
  isConnected() {
    return this.socketAdapter.isConnected();
  }
  isConnecting() {
    return this.socketAdapter.isConnecting();
  }
  isDisconnecting() {
    return this.socketAdapter.isDisconnecting();
  }
  channel(e, r = { config: {} }) {
    const s = `realtime:${e}`,
      n = this.getChannels().find((i) => i.topic === s);
    if (n) return n;
    {
      const i = new Oe(`realtime:${e}`, r, this);
      return (this._cancelPendingDisconnect(), this.channels.push(i), i);
    }
  }
  push(e) {
    this.socketAdapter.push(e);
  }
  async setAuth(e = null) {
    this._authPromise = this._performAuth(e);
    try {
      await this._authPromise;
    } finally {
      this._authPromise = null;
    }
  }
  _isManualToken() {
    return this._manuallySetToken;
  }
  async sendHeartbeat() {
    this.socketAdapter.sendHeartbeat();
  }
  onHeartbeat(e) {
    this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(e);
  }
  _makeRef() {
    return this.socketAdapter.makeRef();
  }
  _remove(e) {
    ((this.channels = this.channels.filter((r) => r.topic !== e.topic)),
      this.channels.length === 0 &&
        (this.log("transport", "no channels remaining, scheduling disconnect"),
        this._schedulePendingDisconnect()));
  }
  _schedulePendingDisconnect() {
    if (
      (this._cancelPendingDisconnect(),
      this._disconnectOnEmptyChannelsAfterMs === 0)
    ) {
      (this.log("transport", "disconnecting immediately - no channels"),
        this.disconnect());
      return;
    }
    ((this._pendingDisconnectTimer = setTimeout(() => {
      ((this._pendingDisconnectTimer = null),
        this.channels.length === 0 &&
          (this.log(
            "transport",
            "deferred disconnect fired - no channels, disconnecting",
          ),
          this.disconnect()));
    }, this._disconnectOnEmptyChannelsAfterMs)),
      this.log(
        "transport",
        `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`,
      ));
  }
  _cancelPendingDisconnect() {
    this._pendingDisconnectTimer !== null &&
      (this.log(
        "transport",
        "pending disconnect cancelled - channel activity detected",
      ),
      clearTimeout(this._pendingDisconnectTimer),
      (this._pendingDisconnectTimer = null));
  }
  async _performAuth(e = null) {
    let r,
      s = !1;
    if (e) ((r = e), (s = !0));
    else if (this.accessToken)
      try {
        r = await this.accessToken();
      } catch (n) {
        (this.log("error", "Error fetching access token from callback", n),
          (r = this.accessTokenValue));
      }
    else r = this.accessTokenValue;
    (s
      ? (this._manuallySetToken = !0)
      : this.accessToken && (this._manuallySetToken = !1),
      this.accessTokenValue != r &&
        ((this.accessTokenValue = r),
        this.channels.forEach((n) => {
          const i = { access_token: r, version: Us };
          (r && n.updateJoinPayload(i),
            n.joinedOnce &&
              n.channelAdapter.isJoined() &&
              n.channelAdapter.push(Hr.access_token, { access_token: r }));
        })));
  }
  async _waitForAuthIfNeeded() {
    this._authPromise && (await this._authPromise);
  }
  _setAuthSafely(e = "general") {
    this._isManualToken() ||
      this.setAuth().catch((r) => {
        this.log("error", `Error setting auth in ${e}`, r);
      });
  }
  _setupConnectionHandlers() {
    (this.socketAdapter.onOpen(() => {
      ((
        this._authPromise ||
        (this.accessToken && !this.accessTokenValue
          ? this.setAuth()
          : Promise.resolve())
      ).catch((r) => {
        this.log("error", "error waiting for auth on connect", r);
      }),
        this.worker && !this.workerRef && this._startWorkerHeartbeat());
    }),
      this.socketAdapter.onClose(() => {
        this.worker && this.workerRef && this._terminateWorker();
      }),
      this.socketAdapter.onMessage((e) => {
        e.ref &&
          e.ref === this._pendingWorkerHeartbeatRef &&
          (this._pendingWorkerHeartbeatRef = null);
      }));
  }
  _handleNodeJsRaceCondition() {
    this.socketAdapter.isConnected() &&
      this.socketAdapter.getSocket().onConnOpen();
  }
  _wrapHeartbeatCallback(e) {
    return (r, s) => {
      (r == "sent" && this._setAuthSafely(), e && e(r, s));
    };
  }
  _startWorkerHeartbeat() {
    this.workerUrl
      ? this.log("worker", `starting worker for from ${this.workerUrl}`)
      : this.log("worker", "starting default worker");
    const e = this._workerObjectUrl(this.workerUrl);
    ((this.workerRef = new Worker(e)),
      (this.workerRef.onerror = (r) => {
        (this.log("worker", "worker error", r.message),
          this._terminateWorker(),
          this.disconnect());
      }),
      (this.workerRef.onmessage = (r) => {
        r.data.event === "keepAlive" && this.sendHeartbeat();
      }),
      this.workerRef.postMessage({
        event: "start",
        interval: this.heartbeatIntervalMs,
      }));
  }
  _terminateWorker() {
    this.workerRef &&
      (this.log("worker", "terminating worker"),
      this.workerRef.terminate(),
      (this.workerRef = void 0));
  }
  _workerObjectUrl(e) {
    let r;
    if (e) r = e;
    else {
      const s = new Blob([mn], { type: "application/javascript" });
      r = URL.createObjectURL(s);
    }
    return r;
  }
  _initializeOptions(e) {
    var r, s, n, i, a, o, l, c, h, u, f, p;
    ((this.worker = (r = e?.worker) !== null && r !== void 0 ? r : !1),
      (this.accessToken =
        (s = e?.accessToken) !== null && s !== void 0 ? s : null));
    const g = {};
    ((g.timeout = (n = e?.timeout) !== null && n !== void 0 ? n : Bs),
      (g.heartbeatIntervalMs =
        (i = e?.heartbeatIntervalMs) !== null && i !== void 0
          ? i
          : Vt.HEARTBEAT_INTERVAL),
      (this._disconnectOnEmptyChannelsAfterMs =
        (a = e?.disconnectOnEmptyChannelsAfterMs) !== null && a !== void 0
          ? a
          : 2 *
            ((o = e?.heartbeatIntervalMs) !== null && o !== void 0
              ? o
              : Vt.HEARTBEAT_INTERVAL)),
      (g.transport =
        (l = e?.transport) !== null && l !== void 0
          ? l
          : Ls.getWebSocketConstructor()),
      (g.params = e?.params),
      (g.logger = e?.logger),
      (g.heartbeatCallback = this._wrapHeartbeatCallback(e?.heartbeatCallback)),
      (g.sessionStorage =
        (c = e?.sessionStorage) !== null && c !== void 0 ? c : gn()),
      (g.reconnectAfterMs =
        (h = e?.reconnectAfterMs) !== null && h !== void 0
          ? h
          : (w) => dn[w - 1] || fn));
    let m, v;
    const y = (u = e?.vsn) !== null && u !== void 0 ? u : Ms;
    switch (y) {
      case Ds:
        ((m = (w, b) => b(JSON.stringify(w))),
          (v = (w, b) => b(JSON.parse(w))));
        break;
      case Wr:
        ((m = this.serializer.encode.bind(this.serializer)),
          (v = this.serializer.decode.bind(this.serializer)));
        break;
      default:
        throw new Error(`Unsupported serializer version: ${g.vsn}`);
    }
    if (
      ((g.vsn = y),
      (g.encode = (f = e?.encode) !== null && f !== void 0 ? f : m),
      (g.decode = (p = e?.decode) !== null && p !== void 0 ? p : v),
      (g.beforeReconnect = this._reconnectAuth.bind(this)),
      (e?.logLevel || e?.log_level) &&
        ((this.logLevel = e.logLevel || e.log_level),
        (g.params = Object.assign(Object.assign({}, g.params), {
          log_level: this.logLevel,
        }))),
      this.worker)
    ) {
      if (typeof window < "u" && !window.Worker)
        throw new Error("Web Worker is not supported");
      ((this.workerUrl = e?.workerUrl), (g.autoSendHeartbeat = !this.worker));
    }
    return g;
  }
  async _reconnectAuth() {
    (await this._waitForAuthIfNeeded(), this.isConnected() || this.connect());
  }
}
var $e = class extends Error {
  constructor(t, e) {
    (super(t),
      (this.name = "IcebergError"),
      (this.status = e.status),
      (this.icebergType = e.icebergType),
      (this.icebergCode = e.icebergCode),
      (this.details = e.details),
      (this.isCommitStateUnknown =
        e.icebergType === "CommitStateUnknownException" ||
        ([500, 502, 504].includes(e.status) &&
          e.icebergType?.includes("CommitState") === !0)));
  }
  isNotFound() {
    return this.status === 404;
  }
  isConflict() {
    return this.status === 409;
  }
  isAuthenticationTimeout() {
    return this.status === 419;
  }
};
function vn(t, e, r) {
  const s = new URL(e, t);
  if (r)
    for (const [n, i] of Object.entries(r))
      i !== void 0 && s.searchParams.set(n, i);
  return s.toString();
}
async function bn(t) {
  return !t || t.type === "none"
    ? {}
    : t.type === "bearer"
      ? { Authorization: `Bearer ${t.token}` }
      : t.type === "header"
        ? { [t.name]: t.value }
        : t.type === "custom"
          ? await t.getHeaders()
          : {};
}
function wn(t) {
  const e = t.fetchImpl ?? globalThis.fetch;
  return {
    async request({ method: r, path: s, query: n, body: i, headers: a }) {
      const o = vn(t.baseUrl, s, n),
        l = await bn(t.auth),
        c = await e(o, {
          method: r,
          headers: {
            ...(i ? { "Content-Type": "application/json" } : {}),
            ...l,
            ...a,
          },
          body: i ? JSON.stringify(i) : void 0,
        }),
        h = await c.text(),
        u = (c.headers.get("content-type") || "").includes("application/json"),
        f = u && h ? JSON.parse(h) : h;
      if (!c.ok) {
        const p = u ? f : void 0,
          g = p?.error;
        throw new $e(g?.message ?? `Request failed with status ${c.status}`, {
          status: c.status,
          icebergType: g?.type,
          icebergCode: g?.code,
          details: p,
        });
      }
      return { status: c.status, headers: c.headers, data: f };
    },
  };
}
function qe(t) {
  return t.join("");
}
var _n = class {
  constructor(t, e = "") {
    ((this.client = t), (this.prefix = e));
  }
  async listNamespaces(t) {
    const e = t ? { parent: qe(t.namespace) } : void 0;
    return (
      await this.client.request({
        method: "GET",
        path: `${this.prefix}/namespaces`,
        query: e,
      })
    ).data.namespaces.map((s) => ({ namespace: s }));
  }
  async createNamespace(t, e) {
    const r = { namespace: t.namespace, properties: e?.properties };
    return (
      await this.client.request({
        method: "POST",
        path: `${this.prefix}/namespaces`,
        body: r,
      })
    ).data;
  }
  async dropNamespace(t) {
    await this.client.request({
      method: "DELETE",
      path: `${this.prefix}/namespaces/${qe(t.namespace)}`,
    });
  }
  async loadNamespaceMetadata(t) {
    return {
      properties: (
        await this.client.request({
          method: "GET",
          path: `${this.prefix}/namespaces/${qe(t.namespace)}`,
        })
      ).data.properties,
    };
  }
  async namespaceExists(t) {
    try {
      return (
        await this.client.request({
          method: "HEAD",
          path: `${this.prefix}/namespaces/${qe(t.namespace)}`,
        }),
        !0
      );
    } catch (e) {
      if (e instanceof $e && e.status === 404) return !1;
      throw e;
    }
  }
  async createNamespaceIfNotExists(t, e) {
    try {
      return await this.createNamespace(t, e);
    } catch (r) {
      if (r instanceof $e && r.status === 409) return;
      throw r;
    }
  }
};
function fe(t) {
  return t.join("");
}
var xn = class {
    constructor(t, e = "", r) {
      ((this.client = t), (this.prefix = e), (this.accessDelegation = r));
    }
    async listTables(t) {
      return (
        await this.client.request({
          method: "GET",
          path: `${this.prefix}/namespaces/${fe(t.namespace)}/tables`,
        })
      ).data.identifiers;
    }
    async createTable(t, e) {
      const r = {};
      return (
        this.accessDelegation &&
          (r["X-Iceberg-Access-Delegation"] = this.accessDelegation),
        (
          await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces/${fe(t.namespace)}/tables`,
            body: e,
            headers: r,
          })
        ).data.metadata
      );
    }
    async updateTable(t, e) {
      const r = await this.client.request({
        method: "POST",
        path: `${this.prefix}/namespaces/${fe(t.namespace)}/tables/${t.name}`,
        body: e,
      });
      return {
        "metadata-location": r.data["metadata-location"],
        metadata: r.data.metadata,
      };
    }
    async dropTable(t, e) {
      await this.client.request({
        method: "DELETE",
        path: `${this.prefix}/namespaces/${fe(t.namespace)}/tables/${t.name}`,
        query: { purgeRequested: String(e?.purge ?? !1) },
      });
    }
    async loadTable(t) {
      const e = {};
      return (
        this.accessDelegation &&
          (e["X-Iceberg-Access-Delegation"] = this.accessDelegation),
        (
          await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${fe(t.namespace)}/tables/${t.name}`,
            headers: e,
          })
        ).data.metadata
      );
    }
    async tableExists(t) {
      const e = {};
      this.accessDelegation &&
        (e["X-Iceberg-Access-Delegation"] = this.accessDelegation);
      try {
        return (
          await this.client.request({
            method: "HEAD",
            path: `${this.prefix}/namespaces/${fe(t.namespace)}/tables/${t.name}`,
            headers: e,
          }),
          !0
        );
      } catch (r) {
        if (r instanceof $e && r.status === 404) return !1;
        throw r;
      }
    }
    async createTableIfNotExists(t, e) {
      try {
        return await this.createTable(t, e);
      } catch (r) {
        if (r instanceof $e && r.status === 409)
          return await this.loadTable({ namespace: t.namespace, name: e.name });
        throw r;
      }
    }
  },
  Sn = class {
    constructor(t) {
      let e = "v1";
      t.catalogName && (e += `/${t.catalogName}`);
      const r = t.baseUrl.endsWith("/") ? t.baseUrl : `${t.baseUrl}/`;
      ((this.client = wn({ baseUrl: r, auth: t.auth, fetchImpl: t.fetch })),
        (this.accessDelegation = t.accessDelegation?.join(",")),
        (this.namespaceOps = new _n(this.client, e)),
        (this.tableOps = new xn(this.client, e, this.accessDelegation)));
    }
    async listNamespaces(t) {
      return this.namespaceOps.listNamespaces(t);
    }
    async createNamespace(t, e) {
      return this.namespaceOps.createNamespace(t, e);
    }
    async dropNamespace(t) {
      await this.namespaceOps.dropNamespace(t);
    }
    async loadNamespaceMetadata(t) {
      return this.namespaceOps.loadNamespaceMetadata(t);
    }
    async listTables(t) {
      return this.tableOps.listTables(t);
    }
    async createTable(t, e) {
      return this.tableOps.createTable(t, e);
    }
    async updateTable(t, e) {
      return this.tableOps.updateTable(t, e);
    }
    async dropTable(t, e) {
      await this.tableOps.dropTable(t, e);
    }
    async loadTable(t) {
      return this.tableOps.loadTable(t);
    }
    async namespaceExists(t) {
      return this.namespaceOps.namespaceExists(t);
    }
    async tableExists(t) {
      return this.tableOps.tableExists(t);
    }
    async createNamespaceIfNotExists(t, e) {
      return this.namespaceOps.createNamespaceIfNotExists(t, e);
    }
    async createTableIfNotExists(t, e) {
      return this.tableOps.createTableIfNotExists(t, e);
    }
  };
function Le(t) {
  "@babel/helpers - typeof";
  return (
    (Le =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    Le(t)
  );
}
function kn(t, e) {
  if (Le(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var s = r.call(t, e);
    if (Le(s) != "object") return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function En(t) {
  var e = kn(t, "string");
  return Le(e) == "symbol" ? e : e + "";
}
function Tn(t, e, r) {
  return (
    (e = En(e)) in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = r),
    t
  );
}
function Gt(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    (e &&
      (s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      })),
      r.push.apply(r, s));
  }
  return r;
}
function T(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? Gt(Object(r), !0).forEach(function (s) {
          Tn(t, s, r[s]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
        : Gt(Object(r)).forEach(function (s) {
            Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(r, s));
          });
  }
  return t;
}
var st = class extends Error {
  constructor(t, e = "storage", r, s) {
    (super(t),
      (this.__isStorageError = !0),
      (this.namespace = e),
      (this.name = e === "vectors" ? "StorageVectorsError" : "StorageError"),
      (this.status = r),
      (this.statusCode = s));
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
};
function nt(t) {
  return typeof t == "object" && t !== null && "__isStorageError" in t;
}
var St = class extends st {
    constructor(t, e, r, s = "storage") {
      (super(t, s, e, r),
        (this.name =
          s === "vectors" ? "StorageVectorsApiError" : "StorageApiError"),
        (this.status = e),
        (this.statusCode = r));
    }
    toJSON() {
      return T({}, super.toJSON());
    }
  },
  Jr = class extends st {
    constructor(t, e, r = "storage") {
      (super(t, r),
        (this.name =
          r === "vectors"
            ? "StorageVectorsUnknownError"
            : "StorageUnknownError"),
        (this.originalError = e));
    }
  };
function Xe(t, e, r) {
  const s = T({}, t),
    n = e.toLowerCase();
  for (const i of Object.keys(s)) i.toLowerCase() === n && delete s[i];
  return ((s[n] = r), s);
}
function An(t) {
  const e = {};
  for (const [r, s] of Object.entries(t)) e[r.toLowerCase()] = s;
  return e;
}
const Rn = (t) => (t ? (...e) => t(...e) : (...e) => fetch(...e)),
  jn = (t) => {
    if (typeof t != "object" || t === null) return !1;
    const e = Object.getPrototypeOf(t);
    return (
      (e === null ||
        e === Object.prototype ||
        Object.getPrototypeOf(e) === null) &&
      !(Symbol.toStringTag in t) &&
      !(Symbol.iterator in t)
    );
  },
  kt = (t) => {
    if (Array.isArray(t)) return t.map((r) => kt(r));
    if (typeof t == "function" || t !== Object(t)) return t;
    const e = {};
    return (
      Object.entries(t).forEach(([r, s]) => {
        const n = r.replace(/([-_][a-z])/gi, (i) =>
          i.toUpperCase().replace(/[-_]/g, ""),
        );
        e[n] = kt(s);
      }),
      e
    );
  },
  Cn = (t) =>
    !t ||
    typeof t != "string" ||
    t.length === 0 ||
    t.length > 100 ||
    t.trim() !== t ||
    t.includes("/") ||
    t.includes("\\")
      ? !1
      : /^[\w!.\*'() &$@=;:+,?-]+$/.test(t),
  Kt = (t) => {
    if (typeof t == "object" && t !== null) {
      const e = t;
      if (typeof e.msg == "string") return e.msg;
      if (typeof e.message == "string") return e.message;
      if (typeof e.error_description == "string") return e.error_description;
      if (typeof e.error == "string") return e.error;
      if (typeof e.error == "object" && e.error !== null) {
        const r = e.error;
        if (typeof r.message == "string") return r.message;
      }
    }
    return JSON.stringify(t);
  },
  On = async (t, e, r, s) => {
    if (
      t !== null &&
      typeof t == "object" &&
      "json" in t &&
      typeof t.json == "function"
    ) {
      const n = t;
      let i = parseInt(String(n.status), 10);
      (Number.isFinite(i) || (i = 500),
        n
          .json()
          .then((a) => {
            const o = a?.statusCode || a?.code || i + "";
            e(new St(Kt(a), i, o, s));
          })
          .catch(() => {
            const a = i + "";
            e(new St(n.statusText || `HTTP ${i} error`, i, a, s));
          }));
    } else e(new Jr(Kt(t), t, s));
  },
  Pn = (t, e, r, s) => {
    const n = { method: t, headers: e?.headers || {} };
    if (t === "GET" || t === "HEAD" || !s) return T(T({}, n), r);
    if (jn(s)) {
      var i;
      const a = e?.headers || {};
      let o;
      for (const [l, c] of Object.entries(a))
        l.toLowerCase() === "content-type" && (o = c);
      ((n.headers = Xe(
        a,
        "Content-Type",
        (i = o) !== null && i !== void 0 ? i : "application/json",
      )),
        (n.body = JSON.stringify(s)));
    } else n.body = s;
    return (e?.duplex && (n.duplex = e.duplex), T(T({}, n), r));
  };
async function Te(t, e, r, s, n, i, a) {
  return new Promise((o, l) => {
    t(r, Pn(e, s, n, i))
      .then((c) => {
        if (!c.ok) throw c;
        if (s?.noResolveJson) return c;
        if (a === "vectors") {
          const h = c.headers.get("content-type");
          if (c.headers.get("content-length") === "0" || c.status === 204)
            return {};
          if (!h || !h.includes("application/json")) return {};
        }
        return c.json();
      })
      .then((c) => o(c))
      .catch((c) => On(c, l, s, a));
  });
}
function Xr(t = "storage") {
  return {
    get: async (e, r, s, n) => Te(e, "GET", r, s, n, void 0, t),
    post: async (e, r, s, n, i) => Te(e, "POST", r, n, i, s, t),
    put: async (e, r, s, n, i) => Te(e, "PUT", r, n, i, s, t),
    head: async (e, r, s, n) =>
      Te(e, "HEAD", r, T(T({}, s), {}, { noResolveJson: !0 }), n, void 0, t),
    remove: async (e, r, s, n, i) => Te(e, "DELETE", r, n, i, s, t),
  };
}
const In = Xr("storage"),
  { get: Ne, post: G, put: Et, head: $n, remove: $t } = In,
  W = Xr("vectors");
var ke = class {
  constructor(t, e = {}, r, s = "storage") {
    ((this.shouldThrowOnError = !1),
      (this.url = t),
      (this.headers = An(e)),
      (this.fetch = Rn(r)),
      (this.namespace = s));
  }
  throwOnError() {
    return ((this.shouldThrowOnError = !0), this);
  }
  setHeader(t, e) {
    return ((this.headers = Xe(this.headers, t, e)), this);
  }
  async handleOperation(t) {
    var e = this;
    try {
      return { data: await t(), error: null };
    } catch (r) {
      if (e.shouldThrowOnError) throw r;
      if (nt(r)) return { data: null, error: r };
      throw r;
    }
  }
};
let Yr;
Yr = Symbol.toStringTag;
var Ln = class {
  constructor(t, e) {
    ((this.downloadFn = t),
      (this.shouldThrowOnError = e),
      (this[Yr] = "StreamDownloadBuilder"),
      (this.promise = null));
  }
  then(t, e) {
    return this.getPromise().then(t, e);
  }
  catch(t) {
    return this.getPromise().catch(t);
  }
  finally(t) {
    return this.getPromise().finally(t);
  }
  getPromise() {
    return (this.promise || (this.promise = this.execute()), this.promise);
  }
  async execute() {
    var t = this;
    try {
      return { data: (await t.downloadFn()).body, error: null };
    } catch (e) {
      if (t.shouldThrowOnError) throw e;
      if (nt(e)) return { data: null, error: e };
      throw e;
    }
  }
};
let Zr;
Zr = Symbol.toStringTag;
var Nn = class {
  constructor(t, e) {
    ((this.downloadFn = t),
      (this.shouldThrowOnError = e),
      (this[Zr] = "BlobDownloadBuilder"),
      (this.promise = null));
  }
  asStream() {
    return new Ln(this.downloadFn, this.shouldThrowOnError);
  }
  then(t, e) {
    return this.getPromise().then(t, e);
  }
  catch(t) {
    return this.getPromise().catch(t);
  }
  finally(t) {
    return this.getPromise().finally(t);
  }
  getPromise() {
    return (this.promise || (this.promise = this.execute()), this.promise);
  }
  async execute() {
    var t = this;
    try {
      return { data: await (await t.downloadFn()).blob(), error: null };
    } catch (e) {
      if (t.shouldThrowOnError) throw e;
      if (nt(e)) return { data: null, error: e };
      throw e;
    }
  }
};
const Un = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } },
  Jt = {
    cacheControl: "3600",
    contentType: "text/plain;charset=UTF-8",
    upsert: !1,
  };
var Dn = class extends ke {
  constructor(t, e = {}, r, s) {
    (super(t, e, s, "storage"), (this.bucketId = r));
  }
  async uploadOrUpdate(t, e, r, s) {
    var n = this;
    return n.handleOperation(async () => {
      let i;
      const a = T(T({}, Jt), s);
      let o = T(
        T({}, n.headers),
        t === "POST" && { "x-upsert": String(a.upsert) },
      );
      const l = a.metadata;
      if (
        (typeof Blob < "u" && r instanceof Blob
          ? ((i = new FormData()),
            i.append("cacheControl", a.cacheControl),
            l && i.append("metadata", n.encodeMetadata(l)),
            i.append("", r))
          : typeof FormData < "u" && r instanceof FormData
            ? ((i = r),
              i.has("cacheControl") || i.append("cacheControl", a.cacheControl),
              l &&
                !i.has("metadata") &&
                i.append("metadata", n.encodeMetadata(l)))
            : ((i = r),
              (o["cache-control"] = `max-age=${a.cacheControl}`),
              (o["content-type"] = a.contentType),
              l && (o["x-metadata"] = n.toBase64(n.encodeMetadata(l))),
              ((typeof ReadableStream < "u" && i instanceof ReadableStream) ||
                (i &&
                  typeof i == "object" &&
                  "pipe" in i &&
                  typeof i.pipe == "function")) &&
                !a.duplex &&
                (a.duplex = "half")),
        s?.headers)
      )
        for (const [f, p] of Object.entries(s.headers)) o = Xe(o, f, p);
      const c = n._removeEmptyFolders(e),
        h = n._getFinalPath(c),
        u = await (t == "PUT" ? Et : G)(
          n.fetch,
          `${n.url}/object/${h}`,
          i,
          T({ headers: o }, a?.duplex ? { duplex: a.duplex } : {}),
        );
      return { path: c, id: u.Id, fullPath: u.Key };
    });
  }
  async upload(t, e, r) {
    return this.uploadOrUpdate("POST", t, e, r);
  }
  async uploadToSignedUrl(t, e, r, s) {
    var n = this;
    const i = n._removeEmptyFolders(t),
      a = n._getFinalPath(i),
      o = new URL(n.url + `/object/upload/sign/${a}`);
    return (
      o.searchParams.set("token", e),
      n.handleOperation(async () => {
        let l;
        const c = T(T({}, Jt), s);
        let h = T(T({}, n.headers), { "x-upsert": String(c.upsert) });
        const u = c.metadata;
        if (
          (typeof Blob < "u" && r instanceof Blob
            ? ((l = new FormData()),
              l.append("cacheControl", c.cacheControl),
              u && l.append("metadata", n.encodeMetadata(u)),
              l.append("", r))
            : typeof FormData < "u" && r instanceof FormData
              ? ((l = r),
                l.has("cacheControl") ||
                  l.append("cacheControl", c.cacheControl),
                u &&
                  !l.has("metadata") &&
                  l.append("metadata", n.encodeMetadata(u)))
              : ((l = r),
                (h["cache-control"] = `max-age=${c.cacheControl}`),
                (h["content-type"] = c.contentType),
                u && (h["x-metadata"] = n.toBase64(n.encodeMetadata(u))),
                ((typeof ReadableStream < "u" && l instanceof ReadableStream) ||
                  (l &&
                    typeof l == "object" &&
                    "pipe" in l &&
                    typeof l.pipe == "function")) &&
                  !c.duplex &&
                  (c.duplex = "half")),
          s?.headers)
        )
          for (const [f, p] of Object.entries(s.headers)) h = Xe(h, f, p);
        return {
          path: i,
          fullPath: (
            await Et(
              n.fetch,
              o.toString(),
              l,
              T({ headers: h }, c?.duplex ? { duplex: c.duplex } : {}),
            )
          ).Key,
        };
      })
    );
  }
  async createSignedUploadUrl(t, e) {
    var r = this;
    return r.handleOperation(async () => {
      let s = r._getFinalPath(t);
      const n = T({}, r.headers);
      e?.upsert && (n["x-upsert"] = "true");
      const i = await G(
          r.fetch,
          `${r.url}/object/upload/sign/${s}`,
          {},
          { headers: n },
        ),
        a = new URL(r.url + i.url),
        o = a.searchParams.get("token");
      if (!o) throw new st("No token returned by API");
      return { signedUrl: a.toString(), path: t, token: o };
    });
  }
  async update(t, e, r) {
    return this.uploadOrUpdate("PUT", t, e, r);
  }
  async move(t, e, r) {
    var s = this;
    return s.handleOperation(
      async () =>
        await G(
          s.fetch,
          `${s.url}/object/move`,
          {
            bucketId: s.bucketId,
            sourceKey: t,
            destinationKey: e,
            destinationBucket: r?.destinationBucket,
          },
          { headers: s.headers },
        ),
    );
  }
  async copy(t, e, r) {
    var s = this;
    return s.handleOperation(async () => ({
      path: (
        await G(
          s.fetch,
          `${s.url}/object/copy`,
          {
            bucketId: s.bucketId,
            sourceKey: t,
            destinationKey: e,
            destinationBucket: r?.destinationBucket,
          },
          { headers: s.headers },
        )
      ).Key,
    }));
  }
  async createSignedUrl(t, e, r) {
    var s = this;
    return s.handleOperation(async () => {
      let n = s._getFinalPath(t);
      const i =
        typeof r?.transform == "object" &&
        r.transform !== null &&
        Object.keys(r.transform).length > 0;
      let a = await G(
        s.fetch,
        `${s.url}/object/sign/${n}`,
        T({ expiresIn: e }, i ? { transform: r.transform } : {}),
        { headers: s.headers },
      );
      const o = new URLSearchParams();
      (r?.download && o.set("download", r.download === !0 ? "" : r.download),
        r?.cacheNonce != null && o.set("cacheNonce", String(r.cacheNonce)));
      const l = o.toString();
      return {
        signedUrl: encodeURI(`${s.url}${a.signedURL}${l ? `&${l}` : ""}`),
      };
    });
  }
  async createSignedUrls(t, e, r) {
    var s = this;
    return s.handleOperation(async () => {
      const n = await G(
          s.fetch,
          `${s.url}/object/sign/${s.bucketId}`,
          { expiresIn: e, paths: t },
          { headers: s.headers },
        ),
        i = new URLSearchParams();
      (r?.download && i.set("download", r.download === !0 ? "" : r.download),
        r?.cacheNonce != null && i.set("cacheNonce", String(r.cacheNonce)));
      const a = i.toString();
      return n.map((o) =>
        T(
          T({}, o),
          {},
          {
            signedUrl: o.signedURL
              ? encodeURI(`${s.url}${o.signedURL}${a ? `&${a}` : ""}`)
              : null,
          },
        ),
      );
    });
  }
  download(t, e, r) {
    const s =
        typeof e?.transform == "object" &&
        e.transform !== null &&
        Object.keys(e.transform).length > 0
          ? "render/image/authenticated"
          : "object",
      n = new URLSearchParams();
    (e?.transform && this.applyTransformOptsToQuery(n, e.transform),
      e?.cacheNonce != null && n.set("cacheNonce", String(e.cacheNonce)));
    const i = n.toString(),
      a = this._getFinalPath(t),
      o = () =>
        Ne(
          this.fetch,
          `${this.url}/${s}/${a}${i ? `?${i}` : ""}`,
          { headers: this.headers, noResolveJson: !0 },
          r,
        );
    return new Nn(o, this.shouldThrowOnError);
  }
  async info(t) {
    var e = this;
    const r = e._getFinalPath(t);
    return e.handleOperation(async () =>
      kt(
        await Ne(e.fetch, `${e.url}/object/info/${r}`, { headers: e.headers }),
      ),
    );
  }
  async exists(t) {
    var e = this;
    const r = e._getFinalPath(t);
    try {
      return (
        await $n(e.fetch, `${e.url}/object/${r}`, { headers: e.headers }),
        { data: !0, error: null }
      );
    } catch (n) {
      if (e.shouldThrowOnError) throw n;
      if (nt(n)) {
        var s;
        const i =
          n instanceof St
            ? n.status
            : n instanceof Jr
              ? (s = n.originalError) === null || s === void 0
                ? void 0
                : s.status
              : void 0;
        if (i !== void 0 && [400, 404].includes(i))
          return { data: !1, error: n };
      }
      throw n;
    }
  }
  getPublicUrl(t, e) {
    const r = this._getFinalPath(t),
      s = new URLSearchParams();
    (e?.download && s.set("download", e.download === !0 ? "" : e.download),
      e?.transform && this.applyTransformOptsToQuery(s, e.transform),
      e?.cacheNonce != null && s.set("cacheNonce", String(e.cacheNonce)));
    const n = s.toString(),
      i =
        typeof e?.transform == "object" &&
        e.transform !== null &&
        Object.keys(e.transform).length > 0
          ? "render/image"
          : "object";
    return {
      data: {
        publicUrl:
          encodeURI(`${this.url}/${i}/public/${r}`) + (n ? `?${n}` : ""),
      },
    };
  }
  async remove(t) {
    var e = this;
    return e.handleOperation(
      async () =>
        await $t(
          e.fetch,
          `${e.url}/object/${e.bucketId}`,
          { prefixes: t },
          { headers: e.headers },
        ),
    );
  }
  async list(t, e, r) {
    var s = this;
    return s.handleOperation(async () => {
      const n = T(T(T({}, Un), e), {}, { prefix: t || "" });
      return await G(
        s.fetch,
        `${s.url}/object/list/${s.bucketId}`,
        n,
        { headers: s.headers },
        r,
      );
    });
  }
  async listV2(t, e) {
    var r = this;
    return r.handleOperation(async () => {
      const s = T({}, t);
      return await G(
        r.fetch,
        `${r.url}/object/list-v2/${r.bucketId}`,
        s,
        { headers: r.headers },
        e,
      );
    });
  }
  encodeMetadata(t) {
    return JSON.stringify(t);
  }
  toBase64(t) {
    return typeof Buffer < "u" ? Buffer.from(t).toString("base64") : btoa(t);
  }
  _getFinalPath(t) {
    return `${this.bucketId}/${t.replace(/^\/+/, "")}`;
  }
  _removeEmptyFolders(t) {
    return t.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  applyTransformOptsToQuery(t, e) {
    return (
      e.width && t.set("width", e.width.toString()),
      e.height && t.set("height", e.height.toString()),
      e.resize && t.set("resize", e.resize),
      e.format && t.set("format", e.format),
      e.quality && t.set("quality", e.quality.toString()),
      t
    );
  }
};
const Mn = "2.106.2",
  Me = { "X-Client-Info": `storage-js/${Mn}` };
var Bn = class extends ke {
    constructor(t, e = {}, r, s) {
      const n = new URL(t);
      s?.useNewHostname &&
        /supabase\.(co|in|red)$/.test(n.hostname) &&
        !n.hostname.includes("storage.supabase.") &&
        (n.hostname = n.hostname.replace("supabase.", "storage.supabase."));
      const i = n.href.replace(/\/$/, ""),
        a = T(T({}, Me), e);
      super(i, a, r, "storage");
    }
    async listBuckets(t) {
      var e = this;
      return e.handleOperation(async () => {
        const r = e.listBucketOptionsToQueryString(t);
        return await Ne(e.fetch, `${e.url}/bucket${r}`, { headers: e.headers });
      });
    }
    async getBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await Ne(e.fetch, `${e.url}/bucket/${t}`, { headers: e.headers }),
      );
    }
    async createBucket(t, e = { public: !1 }) {
      var r = this;
      return r.handleOperation(
        async () =>
          await G(
            r.fetch,
            `${r.url}/bucket`,
            {
              id: t,
              name: t,
              type: e.type,
              public: e.public,
              file_size_limit: e.fileSizeLimit,
              allowed_mime_types: e.allowedMimeTypes,
            },
            { headers: r.headers },
          ),
      );
    }
    async updateBucket(t, e) {
      var r = this;
      return r.handleOperation(
        async () =>
          await Et(
            r.fetch,
            `${r.url}/bucket/${t}`,
            {
              id: t,
              name: t,
              public: e.public,
              file_size_limit: e.fileSizeLimit,
              allowed_mime_types: e.allowedMimeTypes,
            },
            { headers: r.headers },
          ),
      );
    }
    async emptyBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await G(
            e.fetch,
            `${e.url}/bucket/${t}/empty`,
            {},
            { headers: e.headers },
          ),
      );
    }
    async deleteBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await $t(e.fetch, `${e.url}/bucket/${t}`, {}, { headers: e.headers }),
      );
    }
    listBucketOptionsToQueryString(t) {
      const e = {};
      return (
        t &&
          ("limit" in t && (e.limit = String(t.limit)),
          "offset" in t && (e.offset = String(t.offset)),
          t.search && (e.search = t.search),
          t.sortColumn && (e.sortColumn = t.sortColumn),
          t.sortOrder && (e.sortOrder = t.sortOrder)),
        Object.keys(e).length > 0 ? "?" + new URLSearchParams(e).toString() : ""
      );
    }
  },
  zn = class extends ke {
    constructor(t, e = {}, r) {
      const s = t.replace(/\/$/, ""),
        n = T(T({}, Me), e);
      super(s, n, r, "storage");
    }
    async createBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await G(
            e.fetch,
            `${e.url}/bucket`,
            { name: t },
            { headers: e.headers },
          ),
      );
    }
    async listBuckets(t) {
      var e = this;
      return e.handleOperation(async () => {
        const r = new URLSearchParams();
        (t?.limit !== void 0 && r.set("limit", t.limit.toString()),
          t?.offset !== void 0 && r.set("offset", t.offset.toString()),
          t?.sortColumn && r.set("sortColumn", t.sortColumn),
          t?.sortOrder && r.set("sortOrder", t.sortOrder),
          t?.search && r.set("search", t.search));
        const s = r.toString(),
          n = s ? `${e.url}/bucket?${s}` : `${e.url}/bucket`;
        return await Ne(e.fetch, n, { headers: e.headers });
      });
    }
    async deleteBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await $t(e.fetch, `${e.url}/bucket/${t}`, {}, { headers: e.headers }),
      );
    }
    from(t) {
      var e = this;
      if (!Cn(t))
        throw new st(
          "Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.",
        );
      const r = new Sn({
          baseUrl: this.url,
          catalogName: t,
          auth: { type: "custom", getHeaders: async () => e.headers },
          fetch: this.fetch,
        }),
        s = this.shouldThrowOnError;
      return new Proxy(r, {
        get(n, i) {
          const a = n[i];
          return typeof a != "function"
            ? a
            : async (...o) => {
                try {
                  return { data: await a.apply(n, o), error: null };
                } catch (l) {
                  if (s) throw l;
                  return { data: null, error: l };
                }
              };
        },
      });
    }
  },
  Fn = class extends ke {
    constructor(t, e = {}, r) {
      const s = t.replace(/\/$/, ""),
        n = T(T({}, Me), {}, { "Content-Type": "application/json" }, e);
      super(s, n, r, "vectors");
    }
    async createIndex(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          (await W.post(e.fetch, `${e.url}/CreateIndex`, t, {
            headers: e.headers,
          })) || {},
      );
    }
    async getIndex(t, e) {
      var r = this;
      return r.handleOperation(
        async () =>
          await W.post(
            r.fetch,
            `${r.url}/GetIndex`,
            { vectorBucketName: t, indexName: e },
            { headers: r.headers },
          ),
      );
    }
    async listIndexes(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await W.post(e.fetch, `${e.url}/ListIndexes`, t, {
            headers: e.headers,
          }),
      );
    }
    async deleteIndex(t, e) {
      var r = this;
      return r.handleOperation(
        async () =>
          (await W.post(
            r.fetch,
            `${r.url}/DeleteIndex`,
            { vectorBucketName: t, indexName: e },
            { headers: r.headers },
          )) || {},
      );
    }
  },
  qn = class extends ke {
    constructor(t, e = {}, r) {
      const s = t.replace(/\/$/, ""),
        n = T(T({}, Me), {}, { "Content-Type": "application/json" }, e);
      super(s, n, r, "vectors");
    }
    async putVectors(t) {
      var e = this;
      if (t.vectors.length < 1 || t.vectors.length > 500)
        throw new Error("Vector batch size must be between 1 and 500 items");
      return e.handleOperation(
        async () =>
          (await W.post(e.fetch, `${e.url}/PutVectors`, t, {
            headers: e.headers,
          })) || {},
      );
    }
    async getVectors(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await W.post(e.fetch, `${e.url}/GetVectors`, t, {
            headers: e.headers,
          }),
      );
    }
    async listVectors(t) {
      var e = this;
      if (t.segmentCount !== void 0) {
        if (t.segmentCount < 1 || t.segmentCount > 16)
          throw new Error("segmentCount must be between 1 and 16");
        if (
          t.segmentIndex !== void 0 &&
          (t.segmentIndex < 0 || t.segmentIndex >= t.segmentCount)
        )
          throw new Error(
            `segmentIndex must be between 0 and ${t.segmentCount - 1}`,
          );
      }
      return e.handleOperation(
        async () =>
          await W.post(e.fetch, `${e.url}/ListVectors`, t, {
            headers: e.headers,
          }),
      );
    }
    async queryVectors(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await W.post(e.fetch, `${e.url}/QueryVectors`, t, {
            headers: e.headers,
          }),
      );
    }
    async deleteVectors(t) {
      var e = this;
      if (t.keys.length < 1 || t.keys.length > 500)
        throw new Error("Keys batch size must be between 1 and 500 items");
      return e.handleOperation(
        async () =>
          (await W.post(e.fetch, `${e.url}/DeleteVectors`, t, {
            headers: e.headers,
          })) || {},
      );
    }
  },
  Wn = class extends ke {
    constructor(t, e = {}, r) {
      const s = t.replace(/\/$/, ""),
        n = T(T({}, Me), {}, { "Content-Type": "application/json" }, e);
      super(s, n, r, "vectors");
    }
    async createBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          (await W.post(
            e.fetch,
            `${e.url}/CreateVectorBucket`,
            { vectorBucketName: t },
            { headers: e.headers },
          )) || {},
      );
    }
    async getBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await W.post(
            e.fetch,
            `${e.url}/GetVectorBucket`,
            { vectorBucketName: t },
            { headers: e.headers },
          ),
      );
    }
    async listBuckets(t = {}) {
      var e = this;
      return e.handleOperation(
        async () =>
          await W.post(e.fetch, `${e.url}/ListVectorBuckets`, t, {
            headers: e.headers,
          }),
      );
    }
    async deleteBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          (await W.post(
            e.fetch,
            `${e.url}/DeleteVectorBucket`,
            { vectorBucketName: t },
            { headers: e.headers },
          )) || {},
      );
    }
  },
  Hn = class extends Wn {
    constructor(t, e = {}) {
      super(t, e.headers || {}, e.fetch);
    }
    from(t) {
      return new Vn(this.url, this.headers, t, this.fetch);
    }
    async createBucket(t) {
      var e = () => super.createBucket,
        r = this;
      return e().call(r, t);
    }
    async getBucket(t) {
      var e = () => super.getBucket,
        r = this;
      return e().call(r, t);
    }
    async listBuckets(t = {}) {
      var e = () => super.listBuckets,
        r = this;
      return e().call(r, t);
    }
    async deleteBucket(t) {
      var e = () => super.deleteBucket,
        r = this;
      return e().call(r, t);
    }
  },
  Vn = class extends Fn {
    constructor(t, e, r, s) {
      (super(t, e, s), (this.vectorBucketName = r));
    }
    async createIndex(t) {
      var e = () => super.createIndex,
        r = this;
      return e().call(
        r,
        T(T({}, t), {}, { vectorBucketName: r.vectorBucketName }),
      );
    }
    async listIndexes(t = {}) {
      var e = () => super.listIndexes,
        r = this;
      return e().call(
        r,
        T(T({}, t), {}, { vectorBucketName: r.vectorBucketName }),
      );
    }
    async getIndex(t) {
      var e = () => super.getIndex,
        r = this;
      return e().call(r, r.vectorBucketName, t);
    }
    async deleteIndex(t) {
      var e = () => super.deleteIndex,
        r = this;
      return e().call(r, r.vectorBucketName, t);
    }
    index(t) {
      return new Gn(
        this.url,
        this.headers,
        this.vectorBucketName,
        t,
        this.fetch,
      );
    }
  },
  Gn = class extends qn {
    constructor(t, e, r, s, n) {
      (super(t, e, n), (this.vectorBucketName = r), (this.indexName = s));
    }
    async putVectors(t) {
      var e = () => super.putVectors,
        r = this;
      return e().call(
        r,
        T(
          T({}, t),
          {},
          { vectorBucketName: r.vectorBucketName, indexName: r.indexName },
        ),
      );
    }
    async getVectors(t) {
      var e = () => super.getVectors,
        r = this;
      return e().call(
        r,
        T(
          T({}, t),
          {},
          { vectorBucketName: r.vectorBucketName, indexName: r.indexName },
        ),
      );
    }
    async listVectors(t = {}) {
      var e = () => super.listVectors,
        r = this;
      return e().call(
        r,
        T(
          T({}, t),
          {},
          { vectorBucketName: r.vectorBucketName, indexName: r.indexName },
        ),
      );
    }
    async queryVectors(t) {
      var e = () => super.queryVectors,
        r = this;
      return e().call(
        r,
        T(
          T({}, t),
          {},
          { vectorBucketName: r.vectorBucketName, indexName: r.indexName },
        ),
      );
    }
    async deleteVectors(t) {
      var e = () => super.deleteVectors,
        r = this;
      return e().call(
        r,
        T(
          T({}, t),
          {},
          { vectorBucketName: r.vectorBucketName, indexName: r.indexName },
        ),
      );
    }
  },
  Kn = class extends Bn {
    constructor(t, e = {}, r, s) {
      super(t, e, r, s);
    }
    from(t) {
      return new Dn(this.url, this.headers, t, this.fetch);
    }
    get vectors() {
      return new Hn(this.url + "/vector", {
        headers: this.headers,
        fetch: this.fetch,
      });
    }
    get analytics() {
      return new zn(this.url + "/iceberg", this.headers, this.fetch);
    }
  };
const Qr = "2.106.2",
  be = 30 * 1e3,
  Tt = 3,
  lt = Tt * be,
  Jn = "http://localhost:9999",
  Xn = "supabase.auth.token",
  Yn = { "X-Client-Info": `gotrue-js/${Qr}` },
  At = "X-Supabase-Api-Version",
  es = {
    "2024-01-01": {
      timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
      name: "2024-01-01",
    },
  },
  Zn = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,
  Qn = 10 * 60 * 1e3;
class Se extends Error {
  constructor(e, r, s) {
    (super(e),
      (this.__isAuthError = !0),
      (this.name = "AuthError"),
      (this.status = r),
      (this.code = s));
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
    };
  }
}
function x(t) {
  return typeof t == "object" && t !== null && "__isAuthError" in t;
}
class ei extends Se {
  constructor(e, r, s) {
    (super(e, r, s),
      (this.name = "AuthApiError"),
      (this.status = r),
      (this.code = s));
  }
}
function ti(t) {
  return x(t) && t.name === "AuthApiError";
}
class K extends Se {
  constructor(e, r) {
    (super(e), (this.name = "AuthUnknownError"), (this.originalError = r));
  }
}
class se extends Se {
  constructor(e, r, s, n) {
    (super(e, s, n), (this.name = r), (this.status = s));
  }
}
class D extends se {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
}
function We(t) {
  return x(t) && t.name === "AuthSessionMissingError";
}
class pe extends se {
  constructor() {
    super(
      "Auth session or user missing",
      "AuthInvalidTokenResponseError",
      500,
      void 0,
    );
  }
}
class He extends se {
  constructor(e) {
    super(e, "AuthInvalidCredentialsError", 400, void 0);
  }
}
class Ve extends se {
  constructor(e, r = null) {
    (super(e, "AuthImplicitGrantRedirectError", 500, void 0),
      (this.details = null),
      (this.details = r));
  }
  toJSON() {
    return Object.assign(Object.assign({}, super.toJSON()), {
      details: this.details,
    });
  }
}
function ri(t) {
  return x(t) && t.name === "AuthImplicitGrantRedirectError";
}
class Xt extends se {
  constructor(e, r = null) {
    (super(e, "AuthPKCEGrantCodeExchangeError", 500, void 0),
      (this.details = null),
      (this.details = r));
  }
  toJSON() {
    return Object.assign(Object.assign({}, super.toJSON()), {
      details: this.details,
    });
  }
}
class si extends se {
  constructor() {
    super(
      "PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.",
      "AuthPKCECodeVerifierMissingError",
      400,
      "pkce_code_verifier_not_found",
    );
  }
}
class Rt extends se {
  constructor(e, r) {
    super(e, "AuthRetryableFetchError", r, void 0);
  }
}
function ct(t) {
  return x(t) && t.name === "AuthRetryableFetchError";
}
class Yt extends se {
  constructor(e, r, s) {
    (super(e, "AuthWeakPasswordError", r, "weak_password"), (this.reasons = s));
  }
  toJSON() {
    return Object.assign(Object.assign({}, super.toJSON()), {
      reasons: this.reasons,
    });
  }
}
class jt extends se {
  constructor(e) {
    super(e, "AuthInvalidJwtError", 400, "invalid_jwt");
  }
}
const Ye =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(
      "",
    ),
  Zt = ` 	
\r=`.split(""),
  ni = (() => {
    const t = new Array(128);
    for (let e = 0; e < t.length; e += 1) t[e] = -1;
    for (let e = 0; e < Zt.length; e += 1) t[Zt[e].charCodeAt(0)] = -2;
    for (let e = 0; e < Ye.length; e += 1) t[Ye[e].charCodeAt(0)] = e;
    return t;
  })();
function Qt(t, e, r) {
  if (t !== null)
    for (e.queue = (e.queue << 8) | t, e.queuedBits += 8; e.queuedBits >= 6; ) {
      const s = (e.queue >> (e.queuedBits - 6)) & 63;
      (r(Ye[s]), (e.queuedBits -= 6));
    }
  else if (e.queuedBits > 0)
    for (
      e.queue = e.queue << (6 - e.queuedBits), e.queuedBits = 6;
      e.queuedBits >= 6;
    ) {
      const s = (e.queue >> (e.queuedBits - 6)) & 63;
      (r(Ye[s]), (e.queuedBits -= 6));
    }
}
function ts(t, e, r) {
  const s = ni[t];
  if (s > -1)
    for (e.queue = (e.queue << 6) | s, e.queuedBits += 6; e.queuedBits >= 8; )
      (r((e.queue >> (e.queuedBits - 8)) & 255), (e.queuedBits -= 8));
  else {
    if (s === -2) return;
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`);
  }
}
function er(t) {
  const e = [],
    r = (a) => {
      e.push(String.fromCodePoint(a));
    },
    s = { utf8seq: 0, codepoint: 0 },
    n = { queue: 0, queuedBits: 0 },
    i = (a) => {
      oi(a, s, r);
    };
  for (let a = 0; a < t.length; a += 1) ts(t.charCodeAt(a), n, i);
  return e.join("");
}
function ii(t, e) {
  if (t <= 127) {
    e(t);
    return;
  } else if (t <= 2047) {
    (e(192 | (t >> 6)), e(128 | (t & 63)));
    return;
  } else if (t <= 65535) {
    (e(224 | (t >> 12)), e(128 | ((t >> 6) & 63)), e(128 | (t & 63)));
    return;
  } else if (t <= 1114111) {
    (e(240 | (t >> 18)),
      e(128 | ((t >> 12) & 63)),
      e(128 | ((t >> 6) & 63)),
      e(128 | (t & 63)));
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`);
}
function ai(t, e) {
  for (let r = 0; r < t.length; r += 1) {
    let s = t.charCodeAt(r);
    if (s > 55295 && s <= 56319) {
      const n = ((s - 55296) * 1024) & 65535;
      ((s = (((t.charCodeAt(r + 1) - 56320) & 65535) | n) + 65536), (r += 1));
    }
    ii(s, e);
  }
}
function oi(t, e, r) {
  if (e.utf8seq === 0) {
    if (t <= 127) {
      r(t);
      return;
    }
    for (let s = 1; s < 6; s += 1)
      if (!((t >> (7 - s)) & 1)) {
        e.utf8seq = s;
        break;
      }
    if (e.utf8seq === 2) e.codepoint = t & 31;
    else if (e.utf8seq === 3) e.codepoint = t & 15;
    else if (e.utf8seq === 4) e.codepoint = t & 7;
    else throw new Error("Invalid UTF-8 sequence");
    e.utf8seq -= 1;
  } else if (e.utf8seq > 0) {
    if (t <= 127) throw new Error("Invalid UTF-8 sequence");
    ((e.codepoint = (e.codepoint << 6) | (t & 63)),
      (e.utf8seq -= 1),
      e.utf8seq === 0 && r(e.codepoint));
  }
}
function xe(t) {
  const e = [],
    r = { queue: 0, queuedBits: 0 },
    s = (n) => {
      e.push(n);
    };
  for (let n = 0; n < t.length; n += 1) ts(t.charCodeAt(n), r, s);
  return new Uint8Array(e);
}
function li(t) {
  const e = [];
  return (ai(t, (r) => e.push(r)), new Uint8Array(e));
}
function he(t) {
  const e = [],
    r = { queue: 0, queuedBits: 0 },
    s = (n) => {
      e.push(n);
    };
  return (t.forEach((n) => Qt(n, r, s)), Qt(null, r, s), e.join(""));
}
function ci(t) {
  return Math.round(Date.now() / 1e3) + t;
}
function hi() {
  return Symbol("auth-callback");
}
const F = () => typeof window < "u" && typeof document < "u",
  ae = { tested: !1, writable: !1 },
  rs = () => {
    if (!F()) return !1;
    try {
      if (typeof globalThis.localStorage != "object") return !1;
    } catch {
      return !1;
    }
    if (ae.tested) return ae.writable;
    const t = `lswt-${Math.random()}${Math.random()}`;
    try {
      (globalThis.localStorage.setItem(t, t),
        globalThis.localStorage.removeItem(t),
        (ae.tested = !0),
        (ae.writable = !0));
    } catch {
      ((ae.tested = !0), (ae.writable = !1));
    }
    return ae.writable;
  };
function ui(t) {
  const e = {},
    r = new URL(t);
  if (r.hash && r.hash[0] === "#")
    try {
      new URLSearchParams(r.hash.substring(1)).forEach((n, i) => {
        e[i] = n;
      });
    } catch {}
  return (
    r.searchParams.forEach((s, n) => {
      e[n] = s;
    }),
    e
  );
}
const ss = (t) => (t ? (...e) => t(...e) : (...e) => fetch(...e)),
  di = (t) =>
    typeof t == "object" &&
    t !== null &&
    "status" in t &&
    "ok" in t &&
    "json" in t &&
    typeof t.json == "function",
  we = async (t, e, r) => {
    await t.setItem(e, JSON.stringify(r));
  },
  oe = async (t, e) => {
    const r = await t.getItem(e);
    if (!r) return null;
    try {
      return JSON.parse(r);
    } catch {
      return null;
    }
  },
  z = async (t, e) => {
    await t.removeItem(e);
  };
class it {
  constructor() {
    this.promise = new it.promiseConstructor((e, r) => {
      ((this.resolve = e), (this.reject = r));
    });
  }
}
it.promiseConstructor = Promise;
function Ge(t) {
  const e = t.split(".");
  if (e.length !== 3) throw new jt("Invalid JWT structure");
  for (let s = 0; s < e.length; s++)
    if (!Zn.test(e[s])) throw new jt("JWT not in base64url format");
  return {
    header: JSON.parse(er(e[0])),
    payload: JSON.parse(er(e[1])),
    signature: xe(e[2]),
    raw: { header: e[0], payload: e[1] },
  };
}
async function fi(t) {
  return await new Promise((e) => {
    setTimeout(() => e(null), t);
  });
}
function pi(t, e) {
  return new Promise((s, n) => {
    (async () => {
      for (let i = 0; i < 1 / 0; i++)
        try {
          const a = await t(i);
          if (!e(i, null, a)) {
            s(a);
            return;
          }
        } catch (a) {
          if (!e(i, a)) {
            n(a);
            return;
          }
        }
    })();
  });
}
function gi(t) {
  return ("0" + t.toString(16)).substr(-2);
}
function mi() {
  const e = new Uint32Array(56);
  if (typeof crypto > "u") {
    const r =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",
      s = r.length;
    let n = "";
    for (let i = 0; i < 56; i++) n += r.charAt(Math.floor(Math.random() * s));
    return n;
  }
  return (crypto.getRandomValues(e), Array.from(e, gi).join(""));
}
async function yi(t) {
  const r = new TextEncoder().encode(t),
    s = await crypto.subtle.digest("SHA-256", r),
    n = new Uint8Array(s);
  return Array.from(n)
    .map((i) => String.fromCharCode(i))
    .join("");
}
async function vi(t) {
  if (
    !(
      typeof crypto < "u" &&
      typeof crypto.subtle < "u" &&
      typeof TextEncoder < "u"
    )
  )
    return (
      console.warn(
        "WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.",
      ),
      t
    );
  const r = await yi(t);
  return btoa(r).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function ge(t, e, r = !1) {
  const s = mi();
  let n = s;
  (r && (n += "/recovery"), await we(t, `${e}-code-verifier`, n));
  const i = await vi(s);
  return [i, s === i ? "plain" : "s256"];
}
const bi = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function wi(t) {
  const e = t.headers.get(At);
  if (!e || !e.match(bi)) return null;
  try {
    return new Date(`${e}T00:00:00.0Z`);
  } catch {
    return null;
  }
}
function _i(t) {
  if (!t) throw new Error("Missing exp claim");
  const e = Math.floor(Date.now() / 1e3);
  if (t <= e) throw new Error("JWT has expired");
}
function xi(t) {
  switch (t) {
    case "RS256":
      return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
    case "ES256":
      return { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } };
    default:
      throw new Error("Invalid alg claim");
  }
}
const Si = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function ee(t) {
  if (!Si.test(t))
    throw new Error(
      "@supabase/auth-js: Expected parameter to be UUID but is not",
    );
}
function V(t) {
  if (!t.passkey)
    throw new Error(
      "@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).",
    );
}
function ht() {
  const t = {};
  return new Proxy(t, {
    get: (e, r) => {
      if (r === "__isUserNotAvailableProxy") return !0;
      if (typeof r == "symbol") {
        const s = r.toString();
        if (
          s === "Symbol(Symbol.toPrimitive)" ||
          s === "Symbol(Symbol.toStringTag)" ||
          s === "Symbol(util.inspect.custom)"
        )
          return;
      }
      throw new Error(
        `@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`,
      );
    },
    set: (e, r) => {
      throw new Error(
        `@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`,
      );
    },
    deleteProperty: (e, r) => {
      throw new Error(
        `@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`,
      );
    },
  });
}
function ki(t, e) {
  return new Proxy(t, {
    get: (r, s, n) => {
      if (s === "__isInsecureUserWarningProxy") return !0;
      if (typeof s == "symbol") {
        const i = s.toString();
        if (
          i === "Symbol(Symbol.toPrimitive)" ||
          i === "Symbol(Symbol.toStringTag)" ||
          i === "Symbol(util.inspect.custom)" ||
          i === "Symbol(nodejs.util.inspect.custom)"
        )
          return Reflect.get(r, s, n);
      }
      return (
        !e.value &&
          typeof s == "string" &&
          (console.warn(
            "Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.",
          ),
          (e.value = !0)),
        Reflect.get(r, s, n)
      );
    },
  });
}
function tr(t) {
  return JSON.parse(JSON.stringify(t));
}
const ce = (t) => {
    if (typeof t == "object" && t !== null) {
      const e = t;
      if (typeof e.msg == "string") return e.msg;
      if (typeof e.message == "string") return e.message;
      if (typeof e.error_description == "string") return e.error_description;
      if (typeof e.error == "string") return e.error;
    }
    return JSON.stringify(t);
  },
  Ei = [502, 503, 504, 520, 521, 522, 523, 524, 530];
async function rr(t) {
  var e;
  if (!di(t)) throw new Rt(ce(t), 0);
  if (Ei.includes(t.status)) throw new Rt(ce(t), t.status);
  let r;
  try {
    r = await t.json();
  } catch (i) {
    throw new K(ce(i), i);
  }
  let s;
  const n = wi(t);
  if (
    (n &&
    n.getTime() >= es["2024-01-01"].timestamp &&
    typeof r == "object" &&
    r &&
    typeof r.code == "string"
      ? (s = r.code)
      : typeof r == "object" &&
        r &&
        typeof r.error_code == "string" &&
        (s = r.error_code),
    s)
  ) {
    if (s === "weak_password")
      throw new Yt(
        ce(r),
        t.status,
        ((e = r.weak_password) === null || e === void 0 ? void 0 : e.reasons) ||
          [],
      );
    if (s === "session_not_found") throw new D();
  } else if (
    typeof r == "object" &&
    r &&
    typeof r.weak_password == "object" &&
    r.weak_password &&
    Array.isArray(r.weak_password.reasons) &&
    r.weak_password.reasons.length &&
    r.weak_password.reasons.reduce((i, a) => i && typeof a == "string", !0)
  )
    throw new Yt(ce(r), t.status, r.weak_password.reasons);
  throw new ei(ce(r), t.status || 500, s);
}
const Ti = (t, e, r, s) => {
  const n = { method: t, headers: e?.headers || {} };
  return t === "GET"
    ? n
    : ((n.headers = Object.assign(
        { "Content-Type": "application/json;charset=UTF-8" },
        e?.headers,
      )),
      (n.body = JSON.stringify(s)),
      Object.assign(Object.assign({}, n), r));
};
async function k(t, e, r, s) {
  var n;
  const i = Object.assign({}, s?.headers);
  (i[At] || (i[At] = es["2024-01-01"].name),
    s?.jwt && (i.Authorization = `Bearer ${s.jwt}`));
  const a = (n = s?.query) !== null && n !== void 0 ? n : {};
  s?.redirectTo && (a.redirect_to = s.redirectTo);
  const o = Object.keys(a).length
      ? "?" + new URLSearchParams(a).toString()
      : "",
    l = await Ai(
      t,
      e,
      r + o,
      { headers: i, noResolveJson: s?.noResolveJson },
      {},
      s?.body,
    );
  return s?.xform ? s?.xform(l) : { data: Object.assign({}, l), error: null };
}
async function Ai(t, e, r, s, n, i) {
  const a = Ti(e, s, n, i);
  let o;
  try {
    o = await t(r, Object.assign({}, a));
  } catch (l) {
    throw (console.error(l), new Rt(ce(l), 0));
  }
  if ((o.ok || (await rr(o)), s?.noResolveJson)) return o;
  try {
    return await o.json();
  } catch (l) {
    await rr(l);
  }
}
function H(t) {
  var e;
  let r = null;
  Ci(t) &&
    ((r = Object.assign({}, t)),
    t.expires_at || (r.expires_at = ci(t.expires_in)));
  const s =
    (e = t.user) !== null && e !== void 0
      ? e
      : typeof t?.id == "string"
        ? t
        : null;
  return { data: { session: r, user: s }, error: null };
}
function sr(t) {
  const e = H(t);
  return (
    !e.error &&
      t.weak_password &&
      typeof t.weak_password == "object" &&
      Array.isArray(t.weak_password.reasons) &&
      t.weak_password.reasons.length &&
      t.weak_password.message &&
      typeof t.weak_password.message == "string" &&
      t.weak_password.reasons.reduce((r, s) => r && typeof s == "string", !0) &&
      (e.data.weak_password = t.weak_password),
    e
  );
}
function ie(t) {
  var e;
  return {
    data: { user: (e = t.user) !== null && e !== void 0 ? e : t },
    error: null,
  };
}
function Ri(t) {
  return { data: t, error: null };
}
function ji(t) {
  const {
      action_link: e,
      email_otp: r,
      hashed_token: s,
      redirect_to: n,
      verification_type: i,
    } = t,
    a = rt(t, [
      "action_link",
      "email_otp",
      "hashed_token",
      "redirect_to",
      "verification_type",
    ]),
    o = {
      action_link: e,
      email_otp: r,
      hashed_token: s,
      redirect_to: n,
      verification_type: i,
    },
    l = Object.assign({}, a);
  return { data: { properties: o, user: l }, error: null };
}
function nr(t) {
  return t;
}
function Ci(t) {
  return !!t.access_token && !!t.refresh_token && !!t.expires_in;
}
const ut = ["global", "local", "others"];
class Oi {
  _encodePathSegment(e) {
    if (e === "." || e === "..") throw new Se("Invalid path segment");
    return encodeURIComponent(e);
  }
  constructor({ url: e = "", headers: r = {}, fetch: s, experimental: n }) {
    ((this.url = e),
      (this.headers = r),
      (this.fetch = ss(s)),
      (this.experimental = n ?? {}),
      (this.mfa = {
        listFactors: this._listFactors.bind(this),
        deleteFactor: this._deleteFactor.bind(this),
      }),
      (this.oauth = {
        listClients: this._listOAuthClients.bind(this),
        createClient: this._createOAuthClient.bind(this),
        getClient: this._getOAuthClient.bind(this),
        updateClient: this._updateOAuthClient.bind(this),
        deleteClient: this._deleteOAuthClient.bind(this),
        regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this),
      }),
      (this.customProviders = {
        listProviders: this._listCustomProviders.bind(this),
        createProvider: this._createCustomProvider.bind(this),
        getProvider: this._getCustomProvider.bind(this),
        updateProvider: this._updateCustomProvider.bind(this),
        deleteProvider: this._deleteCustomProvider.bind(this),
      }),
      (this.passkey = {
        listPasskeys: this._adminListPasskeys.bind(this),
        deletePasskey: this._adminDeletePasskey.bind(this),
      }));
  }
  async signOut(e, r = ut[0]) {
    if (ut.indexOf(r) < 0)
      throw new Error(
        `@supabase/auth-js: Parameter scope must be one of ${ut.join(", ")}`,
      );
    try {
      return (
        await k(this.fetch, "POST", `${this.url}/logout?scope=${r}`, {
          headers: this.headers,
          jwt: e,
          noResolveJson: !0,
        }),
        { data: null, error: null }
      );
    } catch (s) {
      if (x(s)) return { data: null, error: s };
      throw s;
    }
  }
  async inviteUserByEmail(e, r = {}) {
    try {
      return await k(this.fetch, "POST", `${this.url}/invite`, {
        body: { email: e, data: r.data },
        headers: this.headers,
        redirectTo: r.redirectTo,
        xform: ie,
      });
    } catch (s) {
      if (x(s)) return { data: { user: null }, error: s };
      throw s;
    }
  }
  async generateLink(e) {
    try {
      const { options: r } = e,
        s = rt(e, ["options"]),
        n = Object.assign(Object.assign({}, s), r);
      return (
        "newEmail" in s && ((n.new_email = s?.newEmail), delete n.newEmail),
        await k(this.fetch, "POST", `${this.url}/admin/generate_link`, {
          body: n,
          headers: this.headers,
          xform: ji,
          redirectTo: r?.redirectTo,
        })
      );
    } catch (r) {
      if (x(r)) return { data: { properties: null, user: null }, error: r };
      throw r;
    }
  }
  async createUser(e) {
    try {
      return await k(this.fetch, "POST", `${this.url}/admin/users`, {
        body: e,
        headers: this.headers,
        xform: ie,
      });
    } catch (r) {
      if (x(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async listUsers(e) {
    var r, s, n, i, a, o, l;
    try {
      const c = { nextPage: null, lastPage: 0, total: 0 },
        h = await k(this.fetch, "GET", `${this.url}/admin/users`, {
          headers: this.headers,
          noResolveJson: !0,
          query: {
            page:
              (s =
                (r = e?.page) === null || r === void 0
                  ? void 0
                  : r.toString()) !== null && s !== void 0
                ? s
                : "",
            per_page:
              (i =
                (n = e?.perPage) === null || n === void 0
                  ? void 0
                  : n.toString()) !== null && i !== void 0
                ? i
                : "",
          },
          xform: nr,
        });
      if (h.error) throw h.error;
      const u = await h.json(),
        f =
          (a = h.headers.get("x-total-count")) !== null && a !== void 0 ? a : 0,
        p =
          (l =
            (o = h.headers.get("link")) === null || o === void 0
              ? void 0
              : o.split(",")) !== null && l !== void 0
            ? l
            : [];
      return (
        p.length > 0 &&
          (p.forEach((g) => {
            const m = parseInt(g.split(";")[0].split("=")[1].substring(0, 1)),
              v = JSON.parse(g.split(";")[1].split("=")[1]);
            c[`${v}Page`] = m;
          }),
          (c.total = parseInt(f))),
        { data: Object.assign(Object.assign({}, u), c), error: null }
      );
    } catch (c) {
      if (x(c)) return { data: { users: [] }, error: c };
      throw c;
    }
  }
  async getUserById(e) {
    ee(e);
    try {
      return await k(this.fetch, "GET", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        xform: ie,
      });
    } catch (r) {
      if (x(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async updateUserById(e, r) {
    ee(e);
    try {
      return await k(this.fetch, "PUT", `${this.url}/admin/users/${e}`, {
        body: r,
        headers: this.headers,
        xform: ie,
      });
    } catch (s) {
      if (x(s)) return { data: { user: null }, error: s };
      throw s;
    }
  }
  async deleteUser(e, r = !1) {
    ee(e);
    try {
      return await k(this.fetch, "DELETE", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        body: { should_soft_delete: r },
        xform: ie,
      });
    } catch (s) {
      if (x(s)) return { data: { user: null }, error: s };
      throw s;
    }
  }
  async _listFactors(e) {
    ee(e.userId);
    try {
      const { data: r, error: s } = await k(
        this.fetch,
        "GET",
        `${this.url}/admin/users/${e.userId}/factors`,
        {
          headers: this.headers,
          xform: (n) => ({ data: { factors: n }, error: null }),
        },
      );
      return { data: r, error: s };
    } catch (r) {
      if (x(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _deleteFactor(e) {
    (ee(e.userId), ee(e.id));
    try {
      return {
        data: await k(
          this.fetch,
          "DELETE",
          `${this.url}/admin/users/${e.userId}/factors/${e.id}`,
          { headers: this.headers },
        ),
        error: null,
      };
    } catch (r) {
      if (x(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _listOAuthClients(e) {
    var r, s, n, i, a, o, l;
    try {
      const c = { nextPage: null, lastPage: 0, total: 0 },
        h = await k(this.fetch, "GET", `${this.url}/admin/oauth/clients`, {
          headers: this.headers,
          noResolveJson: !0,
          query: {
            page:
              (s =
                (r = e?.page) === null || r === void 0
                  ? void 0
                  : r.toString()) !== null && s !== void 0
                ? s
                : "",
            per_page:
              (i =
                (n = e?.perPage) === null || n === void 0
                  ? void 0
                  : n.toString()) !== null && i !== void 0
                ? i
                : "",
          },
          xform: nr,
        });
      if (h.error) throw h.error;
      const u = await h.json(),
        f =
          (a = h.headers.get("x-total-count")) !== null && a !== void 0 ? a : 0,
        p =
          (l =
            (o = h.headers.get("link")) === null || o === void 0
              ? void 0
              : o.split(",")) !== null && l !== void 0
            ? l
            : [];
      return (
        p.length > 0 &&
          (p.forEach((g) => {
            const m = parseInt(g.split(";")[0].split("=")[1].substring(0, 1)),
              v = JSON.parse(g.split(";")[1].split("=")[1]);
            c[`${v}Page`] = m;
          }),
          (c.total = parseInt(f))),
        { data: Object.assign(Object.assign({}, u), c), error: null }
      );
    } catch (c) {
      if (x(c)) return { data: { clients: [] }, error: c };
      throw c;
    }
  }
  async _createOAuthClient(e) {
    try {
      return await k(this.fetch, "POST", `${this.url}/admin/oauth/clients`, {
        body: e,
        headers: this.headers,
        xform: (r) => ({ data: r, error: null }),
      });
    } catch (r) {
      if (x(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _getOAuthClient(e) {
    try {
      const r = this._encodePathSegment(e);
      return await k(
        this.fetch,
        "GET",
        `${this.url}/admin/oauth/clients/${r}`,
        { headers: this.headers, xform: (s) => ({ data: s, error: null }) },
      );
    } catch (r) {
      if (x(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _updateOAuthClient(e, r) {
    try {
      const s = this._encodePathSegment(e);
      return await k(
        this.fetch,
        "PUT",
        `${this.url}/admin/oauth/clients/${s}`,
        {
          body: r,
          headers: this.headers,
          xform: (n) => ({ data: n, error: null }),
        },
      );
    } catch (s) {
      if (x(s)) return { data: null, error: s };
      throw s;
    }
  }
  async _deleteOAuthClient(e) {
    try {
      const r = this._encodePathSegment(e);
      return (
        await k(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${r}`, {
          headers: this.headers,
          noResolveJson: !0,
        }),
        { data: null, error: null }
      );
    } catch (r) {
      if (x(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _regenerateOAuthClientSecret(e) {
    try {
      const r = this._encodePathSegment(e);
      return await k(
        this.fetch,
        "POST",
        `${this.url}/admin/oauth/clients/${r}/regenerate_secret`,
        { headers: this.headers, xform: (s) => ({ data: s, error: null }) },
      );
    } catch (r) {
      if (x(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _listCustomProviders(e) {
    try {
      const r = {};
      return (
        e?.type && (r.type = e.type),
        await k(this.fetch, "GET", `${this.url}/admin/custom-providers`, {
          headers: this.headers,
          query: r,
          xform: (s) => {
            var n;
            return {
              data: {
                providers: (n = s?.providers) !== null && n !== void 0 ? n : [],
              },
              error: null,
            };
          },
        })
      );
    } catch (r) {
      if (x(r)) return { data: { providers: [] }, error: r };
      throw r;
    }
  }
  async _createCustomProvider(e) {
    try {
      return await k(this.fetch, "POST", `${this.url}/admin/custom-providers`, {
        body: e,
        headers: this.headers,
        xform: (r) => ({ data: r, error: null }),
      });
    } catch (r) {
      if (x(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _getCustomProvider(e) {
    try {
      const r = this._encodePathSegment(e);
      return await k(
        this.fetch,
        "GET",
        `${this.url}/admin/custom-providers/${r}`,
        { headers: this.headers, xform: (s) => ({ data: s, error: null }) },
      );
    } catch (r) {
      if (x(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _updateCustomProvider(e, r) {
    try {
      const s = this._encodePathSegment(e);
      return await k(
        this.fetch,
        "PUT",
        `${this.url}/admin/custom-providers/${s}`,
        {
          body: r,
          headers: this.headers,
          xform: (n) => ({ data: n, error: null }),
        },
      );
    } catch (s) {
      if (x(s)) return { data: null, error: s };
      throw s;
    }
  }
  async _deleteCustomProvider(e) {
    try {
      const r = this._encodePathSegment(e);
      return (
        await k(
          this.fetch,
          "DELETE",
          `${this.url}/admin/custom-providers/${r}`,
          { headers: this.headers, noResolveJson: !0 },
        ),
        { data: null, error: null }
      );
    } catch (r) {
      if (x(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _adminListPasskeys(e) {
    (V(this.experimental), ee(e.userId));
    try {
      return await k(
        this.fetch,
        "GET",
        `${this.url}/admin/users/${e.userId}/passkeys`,
        { headers: this.headers, xform: (r) => ({ data: r, error: null }) },
      );
    } catch (r) {
      if (x(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _adminDeletePasskey(e) {
    (V(this.experimental), ee(e.userId), ee(e.passkeyId));
    try {
      return (
        await k(
          this.fetch,
          "DELETE",
          `${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,
          { headers: this.headers, noResolveJson: !0 },
        ),
        { data: null, error: null }
      );
    } catch (r) {
      if (x(r)) return { data: null, error: r };
      throw r;
    }
  }
}
function ir(t = {}) {
  return {
    getItem: (e) => t[e] || null,
    setItem: (e, r) => {
      t[e] = r;
    },
    removeItem: (e) => {
      delete t[e];
    },
  };
}
const X = {
  debug: !!(
    globalThis &&
    rs() &&
    globalThis.localStorage &&
    globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true"
  ),
};
class ns extends Error {
  constructor(e) {
    (super(e), (this.isAcquireTimeout = !0));
  }
}
class ar extends ns {}
async function Pi(t, e, r) {
  X.debug &&
    console.log("@supabase/gotrue-js: navigatorLock: acquire lock", t, e);
  const s = new globalThis.AbortController();
  let n;
  (e > 0 &&
    (n = setTimeout(() => {
      (s.abort(),
        X.debug &&
          console.log(
            "@supabase/gotrue-js: navigatorLock acquire timed out",
            t,
          ));
    }, e)),
    await Promise.resolve());
  try {
    return await globalThis.navigator.locks.request(
      t,
      e === 0
        ? { mode: "exclusive", ifAvailable: !0 }
        : { mode: "exclusive", signal: s.signal },
      async (i) => {
        if (i) {
          (clearTimeout(n),
            X.debug &&
              console.log(
                "@supabase/gotrue-js: navigatorLock: acquired",
                t,
                i.name,
              ));
          try {
            return await r();
          } finally {
            X.debug &&
              console.log(
                "@supabase/gotrue-js: navigatorLock: released",
                t,
                i.name,
              );
          }
        } else {
          if (e === 0)
            throw (
              X.debug &&
                console.log(
                  "@supabase/gotrue-js: navigatorLock: not immediately available",
                  t,
                ),
              new ar(
                `Acquiring an exclusive Navigator LockManager lock "${t}" immediately failed`,
              )
            );
          if (X.debug)
            try {
              const a = await globalThis.navigator.locks.query();
              console.log(
                "@supabase/gotrue-js: Navigator LockManager state",
                JSON.stringify(a, null, "  "),
              );
            } catch (a) {
              console.warn(
                "@supabase/gotrue-js: Error when querying Navigator LockManager state",
                a,
              );
            }
          return (
            console.warn(
              "@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request",
            ),
            clearTimeout(n),
            await r()
          );
        }
      },
    );
  } catch (i) {
    if (
      (e > 0 && clearTimeout(n),
      i !== null &&
        typeof i == "object" &&
        "name" in i &&
        i.name === "AbortError" &&
        e > 0)
    ) {
      if (s.signal.aborted)
        return (
          X.debug &&
            console.log(
              "@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock",
              t,
            ),
          console.warn(
            `@supabase/gotrue-js: Lock "${t}" was not released within ${e}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`,
          ),
          await Promise.resolve().then(() =>
            globalThis.navigator.locks.request(
              t,
              { mode: "exclusive", steal: !0 },
              async (a) => {
                if (a) {
                  X.debug &&
                    console.log(
                      "@supabase/gotrue-js: navigatorLock: recovered (stolen)",
                      t,
                      a.name,
                    );
                  try {
                    return await r();
                  } finally {
                    X.debug &&
                      console.log(
                        "@supabase/gotrue-js: navigatorLock: released (stolen)",
                        t,
                        a.name,
                      );
                  }
                } else
                  return (
                    console.warn(
                      "@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true",
                    ),
                    await r()
                  );
              },
            ),
          )
        );
      throw (
        X.debug &&
          console.log(
            "@supabase/gotrue-js: navigatorLock: lock was stolen by another request",
            t,
          ),
        new ar(`Lock "${t}" was released because another request stole it`)
      );
    }
    throw i;
  }
}
function Ii() {
  if (typeof globalThis != "object")
    try {
      (Object.defineProperty(Object.prototype, "__magic__", {
        get: function () {
          return this;
        },
        configurable: !0,
      }),
        (__magic__.globalThis = __magic__),
        delete Object.prototype.__magic__);
    } catch {
      typeof self < "u" && (self.globalThis = self);
    }
}
function is(t) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(t))
    throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);
  return t.toLowerCase();
}
function $i(t) {
  return parseInt(t, 16);
}
function Li(t) {
  const e = new TextEncoder().encode(t);
  return "0x" + Array.from(e, (s) => s.toString(16).padStart(2, "0")).join("");
}
function Ni(t) {
  var e;
  const {
    chainId: r,
    domain: s,
    expirationTime: n,
    issuedAt: i = new Date(),
    nonce: a,
    notBefore: o,
    requestId: l,
    resources: c,
    scheme: h,
    uri: u,
    version: f,
  } = t;
  {
    if (!Number.isInteger(r))
      throw new Error(
        `@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`,
      );
    if (!s)
      throw new Error(
        '@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.',
      );
    if (a && a.length < 8)
      throw new Error(
        `@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`,
      );
    if (!u)
      throw new Error(
        '@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.',
      );
    if (f !== "1")
      throw new Error(
        `@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${f}`,
      );
    if (
      !((e = t.statement) === null || e === void 0) &&
      e.includes(`
`)
    )
      throw new Error(
        `@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`,
      );
  }
  const p = is(t.address),
    g = h ? `${h}://${s}` : s,
    m = t.statement
      ? `${t.statement}
`
      : "",
    v = `${g} wants you to sign in with your Ethereum account:
${p}

${m}`;
  let y = `URI: ${u}
Version: ${f}
Chain ID: ${r}${
    a
      ? `
Nonce: ${a}`
      : ""
  }
Issued At: ${i.toISOString()}`;
  if (
    (n &&
      (y += `
Expiration Time: ${n.toISOString()}`),
    o &&
      (y += `
Not Before: ${o.toISOString()}`),
    l &&
      (y += `
Request ID: ${l}`),
    c)
  ) {
    let w = `
Resources:`;
    for (const b of c) {
      if (!b || typeof b != "string")
        throw new Error(
          `@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${b}`,
        );
      w += `
- ${b}`;
    }
    y += w;
  }
  return `${v}
${y}`;
}
class $ extends Error {
  constructor({ message: e, code: r, cause: s, name: n }) {
    var i;
    (super(e, { cause: s }),
      (this.__isWebAuthnError = !0),
      (this.name =
        (i = n ?? (s instanceof Error ? s.name : void 0)) !== null &&
        i !== void 0
          ? i
          : "Unknown Error"),
      (this.code = r));
  }
  toJSON() {
    return { name: this.name, message: this.message, code: this.code };
  }
}
class Ze extends $ {
  constructor(e, r) {
    (super({
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: r,
      message: e,
    }),
      (this.name = "WebAuthnUnknownError"),
      (this.originalError = r));
  }
}
function Ui({ error: t, options: e }) {
  var r, s, n;
  const { publicKey: i } = e;
  if (!i) throw Error("options was missing required publicKey property");
  if (t.name === "AbortError") {
    if (e.signal instanceof AbortSignal)
      return new $({
        message: "Registration ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: t,
      });
  } else if (t.name === "ConstraintError") {
    if (
      ((r = i.authenticatorSelection) === null || r === void 0
        ? void 0
        : r.requireResidentKey) === !0
    )
      return new $({
        message:
          "Discoverable credentials were required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
        cause: t,
      });
    if (
      e.mediation === "conditional" &&
      ((s = i.authenticatorSelection) === null || s === void 0
        ? void 0
        : s.userVerification) === "required"
    )
      return new $({
        message:
          "User verification was required during automatic registration but it could not be performed",
        code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
        cause: t,
      });
    if (
      ((n = i.authenticatorSelection) === null || n === void 0
        ? void 0
        : n.userVerification) === "required"
    )
      return new $({
        message:
          "User verification was required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
        cause: t,
      });
  } else {
    if (t.name === "InvalidStateError")
      return new $({
        message: "The authenticator was previously registered",
        code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
        cause: t,
      });
    if (t.name === "NotAllowedError")
      return new $({
        message: t.message,
        code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
        cause: t,
      });
    if (t.name === "NotSupportedError")
      return i.pubKeyCredParams.filter((o) => o.type === "public-key")
        .length === 0
        ? new $({
            message: 'No entry in pubKeyCredParams was of type "public-key"',
            code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
            cause: t,
          })
        : new $({
            message:
              "No available authenticator supported any of the specified pubKeyCredParams algorithms",
            code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
            cause: t,
          });
    if (t.name === "SecurityError") {
      const a = window.location.hostname;
      if (as(a)) {
        if (i.rp.id !== a)
          return new $({
            message: `The RP ID "${i.rp.id}" is invalid for this domain`,
            code: "ERROR_INVALID_RP_ID",
            cause: t,
          });
      } else
        return new $({
          message: `${window.location.hostname} is an invalid domain`,
          code: "ERROR_INVALID_DOMAIN",
          cause: t,
        });
    } else if (t.name === "TypeError") {
      if (i.user.id.byteLength < 1 || i.user.id.byteLength > 64)
        return new $({
          message: "User ID was not between 1 and 64 characters",
          code: "ERROR_INVALID_USER_ID_LENGTH",
          cause: t,
        });
    } else if (t.name === "UnknownError")
      return new $({
        message:
          "The authenticator was unable to process the specified options, or could not create a new credential",
        code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
        cause: t,
      });
  }
  return new $({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: t,
  });
}
function Di({ error: t, options: e }) {
  const { publicKey: r } = e;
  if (!r) throw Error("options was missing required publicKey property");
  if (t.name === "AbortError") {
    if (e.signal instanceof AbortSignal)
      return new $({
        message: "Authentication ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: t,
      });
  } else {
    if (t.name === "NotAllowedError")
      return new $({
        message: t.message,
        code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
        cause: t,
      });
    if (t.name === "SecurityError") {
      const s = window.location.hostname;
      if (as(s)) {
        if (r.rpId !== s)
          return new $({
            message: `The RP ID "${r.rpId}" is invalid for this domain`,
            code: "ERROR_INVALID_RP_ID",
            cause: t,
          });
      } else
        return new $({
          message: `${window.location.hostname} is an invalid domain`,
          code: "ERROR_INVALID_DOMAIN",
          cause: t,
        });
    } else if (t.name === "UnknownError")
      return new $({
        message:
          "The authenticator was unable to process the specified options, or could not create a new assertion signature",
        code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
        cause: t,
      });
  }
  return new $({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: t,
  });
}
class Mi {
  createNewAbortSignal() {
    if (this.controller) {
      const r = new Error("Cancelling existing WebAuthn API call for new one");
      ((r.name = "AbortError"), this.controller.abort(r));
    }
    const e = new AbortController();
    return ((this.controller = e), e.signal);
  }
  cancelCeremony() {
    if (this.controller) {
      const e = new Error("Manually cancelling existing WebAuthn API call");
      ((e.name = "AbortError"),
        this.controller.abort(e),
        (this.controller = void 0));
    }
  }
}
const Ct = new Mi();
function or(t) {
  if (!t) throw new Error("Credential creation options are required");
  if (
    typeof PublicKeyCredential < "u" &&
    "parseCreationOptionsFromJSON" in PublicKeyCredential &&
    typeof PublicKeyCredential.parseCreationOptionsFromJSON == "function"
  )
    return PublicKeyCredential.parseCreationOptionsFromJSON(t);
  const { challenge: e, user: r, excludeCredentials: s } = t,
    n = rt(t, ["challenge", "user", "excludeCredentials"]),
    i = xe(e).buffer,
    a = Object.assign(Object.assign({}, r), { id: xe(r.id).buffer }),
    o = Object.assign(Object.assign({}, n), { challenge: i, user: a });
  if (s && s.length > 0) {
    o.excludeCredentials = new Array(s.length);
    for (let l = 0; l < s.length; l++) {
      const c = s[l];
      o.excludeCredentials[l] = Object.assign(Object.assign({}, c), {
        id: xe(c.id).buffer,
        type: c.type || "public-key",
        transports: c.transports,
      });
    }
  }
  return o;
}
function lr(t) {
  if (!t) throw new Error("Credential request options are required");
  if (
    typeof PublicKeyCredential < "u" &&
    "parseRequestOptionsFromJSON" in PublicKeyCredential &&
    typeof PublicKeyCredential.parseRequestOptionsFromJSON == "function"
  )
    return PublicKeyCredential.parseRequestOptionsFromJSON(t);
  const { challenge: e, allowCredentials: r } = t,
    s = rt(t, ["challenge", "allowCredentials"]),
    n = xe(e).buffer,
    i = Object.assign(Object.assign({}, s), { challenge: n });
  if (r && r.length > 0) {
    i.allowCredentials = new Array(r.length);
    for (let a = 0; a < r.length; a++) {
      const o = r[a];
      i.allowCredentials[a] = Object.assign(Object.assign({}, o), {
        id: xe(o.id).buffer,
        type: o.type || "public-key",
        transports: o.transports,
      });
    }
  }
  return i;
}
function cr(t) {
  var e;
  if ("toJSON" in t && typeof t.toJSON == "function") return t.toJSON();
  const r = t;
  return {
    id: t.id,
    rawId: t.id,
    response: {
      attestationObject: he(new Uint8Array(t.response.attestationObject)),
      clientDataJSON: he(new Uint8Array(t.response.clientDataJSON)),
    },
    type: "public-key",
    clientExtensionResults: t.getClientExtensionResults(),
    authenticatorAttachment:
      (e = r.authenticatorAttachment) !== null && e !== void 0 ? e : void 0,
  };
}
function hr(t) {
  var e;
  if ("toJSON" in t && typeof t.toJSON == "function") return t.toJSON();
  const r = t,
    s = t.getClientExtensionResults(),
    n = t.response;
  return {
    id: t.id,
    rawId: t.id,
    response: {
      authenticatorData: he(new Uint8Array(n.authenticatorData)),
      clientDataJSON: he(new Uint8Array(n.clientDataJSON)),
      signature: he(new Uint8Array(n.signature)),
      userHandle: n.userHandle ? he(new Uint8Array(n.userHandle)) : void 0,
    },
    type: "public-key",
    clientExtensionResults: s,
    authenticatorAttachment:
      (e = r.authenticatorAttachment) !== null && e !== void 0 ? e : void 0,
  };
}
function as(t) {
  return t === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t);
}
function Qe() {
  var t, e;
  return !!(
    F() &&
    "PublicKeyCredential" in window &&
    window.PublicKeyCredential &&
    "credentials" in navigator &&
    typeof ((t = navigator?.credentials) === null || t === void 0
      ? void 0
      : t.create) == "function" &&
    typeof ((e = navigator?.credentials) === null || e === void 0
      ? void 0
      : e.get) == "function"
  );
}
async function os(t) {
  try {
    const e = await navigator.credentials.create(t);
    return e
      ? e instanceof PublicKeyCredential
        ? { data: e, error: null }
        : {
            data: null,
            error: new Ze("Browser returned unexpected credential type", e),
          }
      : { data: null, error: new Ze("Empty credential response", e) };
  } catch (e) {
    return { data: null, error: Ui({ error: e, options: t }) };
  }
}
async function ls(t) {
  try {
    const e = await navigator.credentials.get(t);
    return e
      ? e instanceof PublicKeyCredential
        ? { data: e, error: null }
        : {
            data: null,
            error: new Ze("Browser returned unexpected credential type", e),
          }
      : { data: null, error: new Ze("Empty credential response", e) };
  } catch (e) {
    return { data: null, error: Di({ error: e, options: t }) };
  }
}
const Bi = {
    hints: ["security-key"],
    authenticatorSelection: {
      authenticatorAttachment: "cross-platform",
      requireResidentKey: !1,
      userVerification: "preferred",
      residentKey: "discouraged",
    },
    attestation: "direct",
  },
  zi = {
    userVerification: "preferred",
    hints: ["security-key"],
    attestation: "direct",
  };
function et(...t) {
  const e = (n) => n !== null && typeof n == "object" && !Array.isArray(n),
    r = (n) => n instanceof ArrayBuffer || ArrayBuffer.isView(n),
    s = {};
  for (const n of t)
    if (n)
      for (const i in n) {
        const a = n[i];
        if (a !== void 0)
          if (Array.isArray(a)) s[i] = a;
          else if (r(a)) s[i] = a;
          else if (e(a)) {
            const o = s[i];
            e(o) ? (s[i] = et(o, a)) : (s[i] = et(a));
          } else s[i] = a;
      }
  return s;
}
function Fi(t, e) {
  return et(Bi, t, e || {});
}
function qi(t, e) {
  return et(zi, t, e || {});
}
class Wi {
  constructor(e) {
    ((this.client = e),
      (this.enroll = this._enroll.bind(this)),
      (this.challenge = this._challenge.bind(this)),
      (this.verify = this._verify.bind(this)),
      (this.authenticate = this._authenticate.bind(this)),
      (this.register = this._register.bind(this)));
  }
  async _enroll(e) {
    return this.client.mfa.enroll(
      Object.assign(Object.assign({}, e), { factorType: "webauthn" }),
    );
  }
  async _challenge(
    { factorId: e, webauthn: r, friendlyName: s, signal: n },
    i,
  ) {
    var a;
    try {
      const { data: o, error: l } = await this.client.mfa.challenge({
        factorId: e,
        webauthn: r,
      });
      if (!o) return { data: null, error: l };
      const c = n ?? Ct.createNewAbortSignal();
      if (o.webauthn.type === "create") {
        const { user: h } = o.webauthn.credential_options.publicKey;
        if (!h.name) {
          const u = s;
          if (u) h.name = `${h.id}:${u}`;
          else {
            const p = (await this.client.getUser()).data.user,
              g =
                ((a = p?.user_metadata) === null || a === void 0
                  ? void 0
                  : a.name) ||
                p?.email ||
                p?.id ||
                "User";
            h.name = `${h.id}:${g}`;
          }
        }
        h.displayName || (h.displayName = h.name);
      }
      switch (o.webauthn.type) {
        case "create": {
          const h = Fi(o.webauthn.credential_options.publicKey, i?.create),
            { data: u, error: f } = await os({ publicKey: h, signal: c });
          return u
            ? {
                data: {
                  factorId: e,
                  challengeId: o.id,
                  webauthn: { type: o.webauthn.type, credential_response: u },
                },
                error: null,
              }
            : { data: null, error: f };
        }
        case "request": {
          const h = qi(o.webauthn.credential_options.publicKey, i?.request),
            { data: u, error: f } = await ls(
              Object.assign(Object.assign({}, o.webauthn.credential_options), {
                publicKey: h,
                signal: c,
              }),
            );
          return u
            ? {
                data: {
                  factorId: e,
                  challengeId: o.id,
                  webauthn: { type: o.webauthn.type, credential_response: u },
                },
                error: null,
              }
            : { data: null, error: f };
        }
      }
    } catch (o) {
      return x(o)
        ? { data: null, error: o }
        : { data: null, error: new K("Unexpected error in challenge", o) };
    }
  }
  async _verify({ challengeId: e, factorId: r, webauthn: s }) {
    return this.client.mfa.verify({ factorId: r, challengeId: e, webauthn: s });
  }
  async _authenticate(
    {
      factorId: e,
      webauthn: {
        rpId: r = typeof window < "u" ? window.location.hostname : void 0,
        rpOrigins: s = typeof window < "u" ? [window.location.origin] : void 0,
        signal: n,
      } = {},
    },
    i,
  ) {
    if (!r)
      return {
        data: null,
        error: new Se("rpId is required for WebAuthn authentication"),
      };
    try {
      if (!Qe())
        return {
          data: null,
          error: new K("Browser does not support WebAuthn", null),
        };
      const { data: a, error: o } = await this.challenge(
        { factorId: e, webauthn: { rpId: r, rpOrigins: s }, signal: n },
        { request: i },
      );
      if (!a) return { data: null, error: o };
      const { webauthn: l } = a;
      return this._verify({
        factorId: e,
        challengeId: a.challengeId,
        webauthn: {
          type: l.type,
          rpId: r,
          rpOrigins: s,
          credential_response: l.credential_response,
        },
      });
    } catch (a) {
      return x(a)
        ? { data: null, error: a }
        : { data: null, error: new K("Unexpected error in authenticate", a) };
    }
  }
  async _register(
    {
      friendlyName: e,
      webauthn: {
        rpId: r = typeof window < "u" ? window.location.hostname : void 0,
        rpOrigins: s = typeof window < "u" ? [window.location.origin] : void 0,
        signal: n,
      } = {},
    },
    i,
  ) {
    if (!r)
      return {
        data: null,
        error: new Se("rpId is required for WebAuthn registration"),
      };
    try {
      if (!Qe())
        return {
          data: null,
          error: new K("Browser does not support WebAuthn", null),
        };
      const { data: a, error: o } = await this._enroll({ friendlyName: e });
      if (!a)
        return (
          await this.client.mfa
            .listFactors()
            .then((h) => {
              var u;
              return (u = h.data) === null || u === void 0
                ? void 0
                : u.all.find(
                    (f) =>
                      f.factor_type === "webauthn" &&
                      f.friendly_name === e &&
                      f.status !== "unverified",
                  );
            })
            .then((h) =>
              h ? this.client.mfa.unenroll({ factorId: h?.id }) : void 0,
            ),
          { data: null, error: o }
        );
      const { data: l, error: c } = await this._challenge(
        {
          factorId: a.id,
          friendlyName: a.friendly_name,
          webauthn: { rpId: r, rpOrigins: s },
          signal: n,
        },
        { create: i },
      );
      return l
        ? this._verify({
            factorId: a.id,
            challengeId: l.challengeId,
            webauthn: {
              rpId: r,
              rpOrigins: s,
              type: l.webauthn.type,
              credential_response: l.webauthn.credential_response,
            },
          })
        : { data: null, error: c };
    } catch (a) {
      return x(a)
        ? { data: null, error: a }
        : { data: null, error: new K("Unexpected error in register", a) };
    }
  }
}
Ii();
const Hi = {
  url: Jn,
  storageKey: Xn,
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  headers: Yn,
  flowType: "implicit",
  debug: !1,
  hasCustomAuthorizationHeader: !1,
  throwOnError: !1,
  lockAcquireTimeout: 5e3,
  skipAutoInitialize: !1,
  experimental: {},
};
async function ur(t, e, r) {
  return await r();
}
const me = {};
class Ue {
  get jwks() {
    var e, r;
    return (r =
      (e = me[this.storageKey]) === null || e === void 0 ? void 0 : e.jwks) !==
      null && r !== void 0
      ? r
      : { keys: [] };
  }
  set jwks(e) {
    me[this.storageKey] = Object.assign(
      Object.assign({}, me[this.storageKey]),
      { jwks: e },
    );
  }
  get jwks_cached_at() {
    var e, r;
    return (r =
      (e = me[this.storageKey]) === null || e === void 0
        ? void 0
        : e.cachedAt) !== null && r !== void 0
      ? r
      : Number.MIN_SAFE_INTEGER;
  }
  set jwks_cached_at(e) {
    me[this.storageKey] = Object.assign(
      Object.assign({}, me[this.storageKey]),
      { cachedAt: e },
    );
  }
  constructor(e) {
    var r, s, n, i;
    ((this.userStorage = null),
      (this.memoryStorage = null),
      (this.stateChangeEmitters = new Map()),
      (this.autoRefreshTicker = null),
      (this.autoRefreshTickTimeout = null),
      (this.visibilityChangedCallback = null),
      (this.refreshingDeferred = null),
      (this.initializePromise = null),
      (this.detectSessionInUrl = !0),
      (this.hasCustomAuthorizationHeader = !1),
      (this.suppressGetSessionWarning = !1),
      (this.lockAcquired = !1),
      (this.pendingInLock = []),
      (this.broadcastChannel = null),
      (this.logger = console.log));
    const a = Object.assign(Object.assign({}, Hi), e);
    if (
      ((this.storageKey = a.storageKey),
      (this.instanceID =
        (r = Ue.nextInstanceID[this.storageKey]) !== null && r !== void 0
          ? r
          : 0),
      (Ue.nextInstanceID[this.storageKey] = this.instanceID + 1),
      (this.logDebugMessages = !!a.debug),
      typeof a.debug == "function" && (this.logger = a.debug),
      this.instanceID > 0 && F())
    ) {
      const o = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
      (console.warn(o), this.logDebugMessages && console.trace(o));
    }
    if (
      ((this.persistSession = a.persistSession),
      (this.autoRefreshToken = a.autoRefreshToken),
      (this.experimental =
        (s = a.experimental) !== null && s !== void 0 ? s : {}),
      (this.admin = new Oi({
        url: a.url,
        headers: a.headers,
        fetch: a.fetch,
        experimental: this.experimental,
      })),
      (this.url = a.url),
      (this.headers = a.headers),
      (this.fetch = ss(a.fetch)),
      (this.lock = a.lock || ur),
      (this.detectSessionInUrl = a.detectSessionInUrl),
      (this.flowType = a.flowType),
      (this.hasCustomAuthorizationHeader = a.hasCustomAuthorizationHeader),
      (this.throwOnError = a.throwOnError),
      (this.lockAcquireTimeout = a.lockAcquireTimeout),
      a.lock
        ? (this.lock = a.lock)
        : this.persistSession &&
            F() &&
            !((n = globalThis?.navigator) === null || n === void 0) &&
            n.locks
          ? (this.lock = Pi)
          : (this.lock = ur),
      this.jwks ||
        ((this.jwks = { keys: [] }),
        (this.jwks_cached_at = Number.MIN_SAFE_INTEGER)),
      (this.mfa = {
        verify: this._verify.bind(this),
        enroll: this._enroll.bind(this),
        unenroll: this._unenroll.bind(this),
        challenge: this._challenge.bind(this),
        listFactors: this._listFactors.bind(this),
        challengeAndVerify: this._challengeAndVerify.bind(this),
        getAuthenticatorAssuranceLevel:
          this._getAuthenticatorAssuranceLevel.bind(this),
        webauthn: new Wi(this),
      }),
      (this.oauth = {
        getAuthorizationDetails: this._getAuthorizationDetails.bind(this),
        approveAuthorization: this._approveAuthorization.bind(this),
        denyAuthorization: this._denyAuthorization.bind(this),
        listGrants: this._listOAuthGrants.bind(this),
        revokeGrant: this._revokeOAuthGrant.bind(this),
      }),
      (this.passkey = {
        startRegistration: this._startPasskeyRegistration.bind(this),
        verifyRegistration: this._verifyPasskeyRegistration.bind(this),
        startAuthentication: this._startPasskeyAuthentication.bind(this),
        verifyAuthentication: this._verifyPasskeyAuthentication.bind(this),
        list: this._listPasskeys.bind(this),
        update: this._updatePasskey.bind(this),
        delete: this._deletePasskey.bind(this),
      }),
      this.persistSession
        ? (a.storage
            ? (this.storage = a.storage)
            : rs()
              ? (this.storage = globalThis.localStorage)
              : ((this.memoryStorage = {}),
                (this.storage = ir(this.memoryStorage))),
          a.userStorage && (this.userStorage = a.userStorage))
        : ((this.memoryStorage = {}), (this.storage = ir(this.memoryStorage))),
      F() &&
        globalThis.BroadcastChannel &&
        this.persistSession &&
        this.storageKey)
    ) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(
          this.storageKey,
        );
      } catch (o) {
        console.error(
          "Failed to create a new BroadcastChannel, multi-tab state changes will not be available",
          o,
        );
      }
      (i = this.broadcastChannel) === null ||
        i === void 0 ||
        i.addEventListener("message", async (o) => {
          this._debug(
            "received broadcast notification from other tab or client",
            o,
          );
          try {
            await this._notifyAllSubscribers(o.data.event, o.data.session, !1);
          } catch (l) {
            this._debug("#broadcastChannel", "error", l);
          }
        });
    }
    a.skipAutoInitialize ||
      this.initialize().catch((o) => {
        this._debug("#initialize()", "error", o);
      });
  }
  isThrowOnErrorEnabled() {
    return this.throwOnError;
  }
  _returnResult(e) {
    if (this.throwOnError && e && e.error) throw e.error;
    return e;
  }
  _logPrefix() {
    return `GoTrueClient@${this.storageKey}:${this.instanceID} (${Qr}) ${new Date().toISOString()}`;
  }
  _debug(...e) {
    return (
      this.logDebugMessages && this.logger(this._logPrefix(), ...e),
      this
    );
  }
  async initialize() {
    return this.initializePromise
      ? await this.initializePromise
      : ((this.initializePromise = (async () =>
          await this._acquireLock(
            this.lockAcquireTimeout,
            async () => await this._initialize(),
          ))()),
        await this.initializePromise);
  }
  async _initialize() {
    var e;
    try {
      let r = {},
        s = "none";
      if (
        (F() &&
          ((r = ui(window.location.href)),
          this._isImplicitGrantCallback(r)
            ? (s = "implicit")
            : (await this._isPKCECallback(r)) && (s = "pkce")),
        F() && this.detectSessionInUrl && s !== "none")
      ) {
        const { data: n, error: i } = await this._getSessionFromURL(r, s);
        if (i) {
          if (
            (this._debug(
              "#_initialize()",
              "error detecting session from URL",
              i,
            ),
            ri(i))
          ) {
            const l =
              (e = i.details) === null || e === void 0 ? void 0 : e.code;
            if (
              l === "identity_already_exists" ||
              l === "identity_not_found" ||
              l === "single_identity_not_deletable"
            )
              return { error: i };
          }
          return { error: i };
        }
        const { session: a, redirectType: o } = n;
        return (
          this._debug(
            "#_initialize()",
            "detected session in URL",
            a,
            "redirect type",
            o,
          ),
          await this._saveSession(a),
          setTimeout(async () => {
            o === "recovery"
              ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", a)
              : await this._notifyAllSubscribers("SIGNED_IN", a);
          }, 0),
          { error: null }
        );
      }
      return (await this._recoverAndRefresh(), { error: null });
    } catch (r) {
      return x(r)
        ? this._returnResult({ error: r })
        : this._returnResult({
            error: new K("Unexpected error during initialization", r),
          });
    } finally {
      (await this._handleVisibilityChange(),
        this._debug("#_initialize()", "end"));
    }
  }
  async signInAnonymously(e) {
    var r, s, n;
    try {
      const i = await k(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            data:
              (s =
                (r = e?.options) === null || r === void 0 ? void 0 : r.data) !==
                null && s !== void 0
                ? s
                : {},
            gotrue_meta_security: {
              captcha_token:
                (n = e?.options) === null || n === void 0
                  ? void 0
                  : n.captchaToken,
            },
          },
          xform: H,
        }),
        { data: a, error: o } = i;
      if (o || !a)
        return this._returnResult({
          data: { user: null, session: null },
          error: o,
        });
      const l = a.session,
        c = a.user;
      return (
        a.session &&
          (await this._saveSession(a.session),
          await this._notifyAllSubscribers("SIGNED_IN", l)),
        this._returnResult({ data: { user: c, session: l }, error: null })
      );
    } catch (i) {
      if (x(i))
        return this._returnResult({
          data: { user: null, session: null },
          error: i,
        });
      throw i;
    }
  }
  async signUp(e) {
    var r, s, n;
    try {
      let i;
      if ("email" in e) {
        const { email: h, password: u, options: f } = e;
        let p = null,
          g = null;
        (this.flowType === "pkce" &&
          ([p, g] = await ge(this.storage, this.storageKey)),
          (i = await k(this.fetch, "POST", `${this.url}/signup`, {
            headers: this.headers,
            redirectTo: f?.emailRedirectTo,
            body: {
              email: h,
              password: u,
              data: (r = f?.data) !== null && r !== void 0 ? r : {},
              gotrue_meta_security: { captcha_token: f?.captchaToken },
              code_challenge: p,
              code_challenge_method: g,
            },
            xform: H,
          })));
      } else if ("phone" in e) {
        const { phone: h, password: u, options: f } = e;
        i = await k(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone: h,
            password: u,
            data: (s = f?.data) !== null && s !== void 0 ? s : {},
            channel: (n = f?.channel) !== null && n !== void 0 ? n : "sms",
            gotrue_meta_security: { captcha_token: f?.captchaToken },
          },
          xform: H,
        });
      } else
        throw new He(
          "You must provide either an email or phone number and a password",
        );
      const { data: a, error: o } = i;
      if (o || !a)
        return (
          await z(this.storage, `${this.storageKey}-code-verifier`),
          this._returnResult({ data: { user: null, session: null }, error: o })
        );
      const l = a.session,
        c = a.user;
      return (
        a.session &&
          (await this._saveSession(a.session),
          await this._notifyAllSubscribers("SIGNED_IN", l)),
        this._returnResult({ data: { user: c, session: l }, error: null })
      );
    } catch (i) {
      if ((await z(this.storage, `${this.storageKey}-code-verifier`), x(i)))
        return this._returnResult({
          data: { user: null, session: null },
          error: i,
        });
      throw i;
    }
  }
  async signInWithPassword(e) {
    try {
      let r;
      if ("email" in e) {
        const { email: i, password: a, options: o } = e;
        r = await k(
          this.fetch,
          "POST",
          `${this.url}/token?grant_type=password`,
          {
            headers: this.headers,
            body: {
              email: i,
              password: a,
              gotrue_meta_security: { captcha_token: o?.captchaToken },
            },
            xform: sr,
          },
        );
      } else if ("phone" in e) {
        const { phone: i, password: a, options: o } = e;
        r = await k(
          this.fetch,
          "POST",
          `${this.url}/token?grant_type=password`,
          {
            headers: this.headers,
            body: {
              phone: i,
              password: a,
              gotrue_meta_security: { captcha_token: o?.captchaToken },
            },
            xform: sr,
          },
        );
      } else
        throw new He(
          "You must provide either an email or phone number and a password",
        );
      const { data: s, error: n } = r;
      if (n)
        return this._returnResult({
          data: { user: null, session: null },
          error: n,
        });
      if (!s || !s.session || !s.user) {
        const i = new pe();
        return this._returnResult({
          data: { user: null, session: null },
          error: i,
        });
      }
      return (
        s.session &&
          (await this._saveSession(s.session),
          await this._notifyAllSubscribers("SIGNED_IN", s.session)),
        this._returnResult({
          data: Object.assign(
            { user: s.user, session: s.session },
            s.weak_password ? { weakPassword: s.weak_password } : null,
          ),
          error: n,
        })
      );
    } catch (r) {
      if (x(r))
        return this._returnResult({
          data: { user: null, session: null },
          error: r,
        });
      throw r;
    }
  }
  async signInWithOAuth(e) {
    var r, s, n, i;
    return await this._handleProviderSignIn(e.provider, {
      redirectTo:
        (r = e.options) === null || r === void 0 ? void 0 : r.redirectTo,
      scopes: (s = e.options) === null || s === void 0 ? void 0 : s.scopes,
      queryParams:
        (n = e.options) === null || n === void 0 ? void 0 : n.queryParams,
      skipBrowserRedirect:
        (i = e.options) === null || i === void 0
          ? void 0
          : i.skipBrowserRedirect,
    });
  }
  async exchangeCodeForSession(e) {
    return (
      await this.initializePromise,
      this._acquireLock(this.lockAcquireTimeout, async () =>
        this._exchangeCodeForSession(e),
      )
    );
  }
  async signInWithWeb3(e) {
    const { chain: r } = e;
    switch (r) {
      case "ethereum":
        return await this.signInWithEthereum(e);
      case "solana":
        return await this.signInWithSolana(e);
      default:
        throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`);
    }
  }
  async signInWithEthereum(e) {
    var r, s, n, i, a, o, l, c, h, u, f;
    let p, g;
    if ("message" in e) ((p = e.message), (g = e.signature));
    else {
      const { chain: m, wallet: v, statement: y, options: w } = e;
      let b;
      if (F())
        if (typeof v == "object") b = v;
        else {
          const C = window;
          if (
            "ethereum" in C &&
            typeof C.ethereum == "object" &&
            "request" in C.ethereum &&
            typeof C.ethereum.request == "function"
          )
            b = C.ethereum;
          else
            throw new Error(
              "@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.",
            );
        }
      else {
        if (typeof v != "object" || !w?.url)
          throw new Error(
            "@supabase/auth-js: Both wallet and url must be specified in non-browser environments.",
          );
        b = v;
      }
      const _ = new URL(
          (r = w?.url) !== null && r !== void 0 ? r : window.location.href,
        ),
        E = await b
          .request({ method: "eth_requestAccounts" })
          .then((C) => C)
          .catch(() => {
            throw new Error(
              "@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid",
            );
          });
      if (!E || E.length === 0)
        throw new Error(
          "@supabase/auth-js: No accounts available. Please ensure the wallet is connected.",
        );
      const S = is(E[0]);
      let A =
        (s = w?.signInWithEthereum) === null || s === void 0
          ? void 0
          : s.chainId;
      if (!A) {
        const C = await b.request({ method: "eth_chainId" });
        A = $i(C);
      }
      const L = {
        domain: _.host,
        address: S,
        statement: y,
        uri: _.href,
        version: "1",
        chainId: A,
        nonce:
          (n = w?.signInWithEthereum) === null || n === void 0
            ? void 0
            : n.nonce,
        issuedAt:
          (a =
            (i = w?.signInWithEthereum) === null || i === void 0
              ? void 0
              : i.issuedAt) !== null && a !== void 0
            ? a
            : new Date(),
        expirationTime:
          (o = w?.signInWithEthereum) === null || o === void 0
            ? void 0
            : o.expirationTime,
        notBefore:
          (l = w?.signInWithEthereum) === null || l === void 0
            ? void 0
            : l.notBefore,
        requestId:
          (c = w?.signInWithEthereum) === null || c === void 0
            ? void 0
            : c.requestId,
        resources:
          (h = w?.signInWithEthereum) === null || h === void 0
            ? void 0
            : h.resources,
      };
      ((p = Ni(L)),
        (g = await b.request({ method: "personal_sign", params: [Li(p), S] })));
    }
    try {
      const { data: m, error: v } = await k(
        this.fetch,
        "POST",
        `${this.url}/token?grant_type=web3`,
        {
          headers: this.headers,
          body: Object.assign(
            { chain: "ethereum", message: p, signature: g },
            !((u = e.options) === null || u === void 0) && u.captchaToken
              ? {
                  gotrue_meta_security: {
                    captcha_token:
                      (f = e.options) === null || f === void 0
                        ? void 0
                        : f.captchaToken,
                  },
                }
              : null,
          ),
          xform: H,
        },
      );
      if (v) throw v;
      if (!m || !m.session || !m.user) {
        const y = new pe();
        return this._returnResult({
          data: { user: null, session: null },
          error: y,
        });
      }
      return (
        m.session &&
          (await this._saveSession(m.session),
          await this._notifyAllSubscribers("SIGNED_IN", m.session)),
        this._returnResult({ data: Object.assign({}, m), error: v })
      );
    } catch (m) {
      if (x(m))
        return this._returnResult({
          data: { user: null, session: null },
          error: m,
        });
      throw m;
    }
  }
  async signInWithSolana(e) {
    var r, s, n, i, a, o, l, c, h, u, f, p;
    let g, m;
    if ("message" in e) ((g = e.message), (m = e.signature));
    else {
      const { chain: v, wallet: y, statement: w, options: b } = e;
      let _;
      if (F())
        if (typeof y == "object") _ = y;
        else {
          const S = window;
          if (
            "solana" in S &&
            typeof S.solana == "object" &&
            (("signIn" in S.solana && typeof S.solana.signIn == "function") ||
              ("signMessage" in S.solana &&
                typeof S.solana.signMessage == "function"))
          )
            _ = S.solana;
          else
            throw new Error(
              "@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.",
            );
        }
      else {
        if (typeof y != "object" || !b?.url)
          throw new Error(
            "@supabase/auth-js: Both wallet and url must be specified in non-browser environments.",
          );
        _ = y;
      }
      const E = new URL(
        (r = b?.url) !== null && r !== void 0 ? r : window.location.href,
      );
      if ("signIn" in _ && _.signIn) {
        const S = await _.signIn(
          Object.assign(
            Object.assign(
              Object.assign(
                { issuedAt: new Date().toISOString() },
                b?.signInWithSolana,
              ),
              { version: "1", domain: E.host, uri: E.href },
            ),
            w ? { statement: w } : null,
          ),
        );
        let A;
        if (Array.isArray(S) && S[0] && typeof S[0] == "object") A = S[0];
        else if (
          S &&
          typeof S == "object" &&
          "signedMessage" in S &&
          "signature" in S
        )
          A = S;
        else
          throw new Error(
            "@supabase/auth-js: Wallet method signIn() returned unrecognized value",
          );
        if (
          "signedMessage" in A &&
          "signature" in A &&
          (typeof A.signedMessage == "string" ||
            A.signedMessage instanceof Uint8Array) &&
          A.signature instanceof Uint8Array
        )
          ((g =
            typeof A.signedMessage == "string"
              ? A.signedMessage
              : new TextDecoder().decode(A.signedMessage)),
            (m = A.signature));
        else
          throw new Error(
            "@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields",
          );
      } else {
        if (
          !("signMessage" in _) ||
          typeof _.signMessage != "function" ||
          !("publicKey" in _) ||
          typeof _ != "object" ||
          !_.publicKey ||
          !("toBase58" in _.publicKey) ||
          typeof _.publicKey.toBase58 != "function"
        )
          throw new Error(
            "@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API",
          );
        g = [
          `${E.host} wants you to sign in with your Solana account:`,
          _.publicKey.toBase58(),
          ...(w ? ["", w, ""] : [""]),
          "Version: 1",
          `URI: ${E.href}`,
          `Issued At: ${(n = (s = b?.signInWithSolana) === null || s === void 0 ? void 0 : s.issuedAt) !== null && n !== void 0 ? n : new Date().toISOString()}`,
          ...(!((i = b?.signInWithSolana) === null || i === void 0) &&
          i.notBefore
            ? [`Not Before: ${b.signInWithSolana.notBefore}`]
            : []),
          ...(!((a = b?.signInWithSolana) === null || a === void 0) &&
          a.expirationTime
            ? [`Expiration Time: ${b.signInWithSolana.expirationTime}`]
            : []),
          ...(!((o = b?.signInWithSolana) === null || o === void 0) && o.chainId
            ? [`Chain ID: ${b.signInWithSolana.chainId}`]
            : []),
          ...(!((l = b?.signInWithSolana) === null || l === void 0) && l.nonce
            ? [`Nonce: ${b.signInWithSolana.nonce}`]
            : []),
          ...(!((c = b?.signInWithSolana) === null || c === void 0) &&
          c.requestId
            ? [`Request ID: ${b.signInWithSolana.requestId}`]
            : []),
          ...(!(
            (u =
              (h = b?.signInWithSolana) === null || h === void 0
                ? void 0
                : h.resources) === null || u === void 0
          ) && u.length
            ? [
                "Resources",
                ...b.signInWithSolana.resources.map((A) => `- ${A}`),
              ]
            : []),
        ].join(`
`);
        const S = await _.signMessage(new TextEncoder().encode(g), "utf8");
        if (!S || !(S instanceof Uint8Array))
          throw new Error(
            "@supabase/auth-js: Wallet signMessage() API returned an recognized value",
          );
        m = S;
      }
    }
    try {
      const { data: v, error: y } = await k(
        this.fetch,
        "POST",
        `${this.url}/token?grant_type=web3`,
        {
          headers: this.headers,
          body: Object.assign(
            { chain: "solana", message: g, signature: he(m) },
            !((f = e.options) === null || f === void 0) && f.captchaToken
              ? {
                  gotrue_meta_security: {
                    captcha_token:
                      (p = e.options) === null || p === void 0
                        ? void 0
                        : p.captchaToken,
                  },
                }
              : null,
          ),
          xform: H,
        },
      );
      if (y) throw y;
      if (!v || !v.session || !v.user) {
        const w = new pe();
        return this._returnResult({
          data: { user: null, session: null },
          error: w,
        });
      }
      return (
        v.session &&
          (await this._saveSession(v.session),
          await this._notifyAllSubscribers("SIGNED_IN", v.session)),
        this._returnResult({ data: Object.assign({}, v), error: y })
      );
    } catch (v) {
      if (x(v))
        return this._returnResult({
          data: { user: null, session: null },
          error: v,
        });
      throw v;
    }
  }
  async _exchangeCodeForSession(e) {
    const r = await oe(this.storage, `${this.storageKey}-code-verifier`),
      [s, n] = (r ?? "").split("/");
    try {
      if (!s && this.flowType === "pkce") throw new si();
      const { data: i, error: a } = await k(
        this.fetch,
        "POST",
        `${this.url}/token?grant_type=pkce`,
        {
          headers: this.headers,
          body: { auth_code: e, code_verifier: s },
          xform: H,
        },
      );
      if ((await z(this.storage, `${this.storageKey}-code-verifier`), a))
        throw a;
      if (!i || !i.session || !i.user) {
        const o = new pe();
        return this._returnResult({
          data: { user: null, session: null, redirectType: null },
          error: o,
        });
      }
      return (
        i.session &&
          (await this._saveSession(i.session),
          await this._notifyAllSubscribers(
            n === "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN",
            i.session,
          )),
        this._returnResult({
          data: Object.assign(Object.assign({}, i), {
            redirectType: n ?? null,
          }),
          error: a,
        })
      );
    } catch (i) {
      if ((await z(this.storage, `${this.storageKey}-code-verifier`), x(i)))
        return this._returnResult({
          data: { user: null, session: null, redirectType: null },
          error: i,
        });
      throw i;
    }
  }
  async signInWithIdToken(e) {
    try {
      const {
          options: r,
          provider: s,
          token: n,
          access_token: i,
          nonce: a,
        } = e,
        o = await k(
          this.fetch,
          "POST",
          `${this.url}/token?grant_type=id_token`,
          {
            headers: this.headers,
            body: {
              provider: s,
              id_token: n,
              access_token: i,
              nonce: a,
              gotrue_meta_security: { captcha_token: r?.captchaToken },
            },
            xform: H,
          },
        ),
        { data: l, error: c } = o;
      if (c)
        return this._returnResult({
          data: { user: null, session: null },
          error: c,
        });
      if (!l || !l.session || !l.user) {
        const h = new pe();
        return this._returnResult({
          data: { user: null, session: null },
          error: h,
        });
      }
      return (
        l.session &&
          (await this._saveSession(l.session),
          await this._notifyAllSubscribers("SIGNED_IN", l.session)),
        this._returnResult({ data: l, error: c })
      );
    } catch (r) {
      if (x(r))
        return this._returnResult({
          data: { user: null, session: null },
          error: r,
        });
      throw r;
    }
  }
  async signInWithOtp(e) {
    var r, s, n, i, a;
    try {
      if ("email" in e) {
        const { email: o, options: l } = e;
        let c = null,
          h = null;
        this.flowType === "pkce" &&
          ([c, h] = await ge(this.storage, this.storageKey));
        const { error: u } = await k(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email: o,
            data: (r = l?.data) !== null && r !== void 0 ? r : {},
            create_user:
              (s = l?.shouldCreateUser) !== null && s !== void 0 ? s : !0,
            gotrue_meta_security: { captcha_token: l?.captchaToken },
            code_challenge: c,
            code_challenge_method: h,
          },
          redirectTo: l?.emailRedirectTo,
        });
        return this._returnResult({
          data: { user: null, session: null },
          error: u,
        });
      }
      if ("phone" in e) {
        const { phone: o, options: l } = e,
          { data: c, error: h } = await k(
            this.fetch,
            "POST",
            `${this.url}/otp`,
            {
              headers: this.headers,
              body: {
                phone: o,
                data: (n = l?.data) !== null && n !== void 0 ? n : {},
                create_user:
                  (i = l?.shouldCreateUser) !== null && i !== void 0 ? i : !0,
                gotrue_meta_security: { captcha_token: l?.captchaToken },
                channel: (a = l?.channel) !== null && a !== void 0 ? a : "sms",
              },
            },
          );
        return this._returnResult({
          data: { user: null, session: null, messageId: c?.message_id },
          error: h,
        });
      }
      throw new He("You must provide either an email or phone number.");
    } catch (o) {
      if ((await z(this.storage, `${this.storageKey}-code-verifier`), x(o)))
        return this._returnResult({
          data: { user: null, session: null },
          error: o,
        });
      throw o;
    }
  }
  async verifyOtp(e) {
    var r, s;
    try {
      let n, i;
      "options" in e &&
        ((n = (r = e.options) === null || r === void 0 ? void 0 : r.redirectTo),
        (i =
          (s = e.options) === null || s === void 0 ? void 0 : s.captchaToken));
      const { data: a, error: o } = await k(
        this.fetch,
        "POST",
        `${this.url}/verify`,
        {
          headers: this.headers,
          body: Object.assign(Object.assign({}, e), {
            gotrue_meta_security: { captcha_token: i },
          }),
          redirectTo: n,
          xform: H,
        },
      );
      if (o) throw o;
      if (!a) throw new Error("An error occurred on token verification.");
      const l = a.session,
        c = a.user;
      return (
        l?.access_token &&
          (await this._saveSession(l),
          await this._notifyAllSubscribers(
            e.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN",
            l,
          )),
        this._returnResult({ data: { user: c, session: l }, error: null })
      );
    } catch (n) {
      if (x(n))
        return this._returnResult({
          data: { user: null, session: null },
          error: n,
        });
      throw n;
    }
  }
  async signInWithSSO(e) {
    var r, s, n, i, a;
    try {
      let o = null,
        l = null;
      this.flowType === "pkce" &&
        ([o, l] = await ge(this.storage, this.storageKey));
      const c = await k(this.fetch, "POST", `${this.url}/sso`, {
        body: Object.assign(
          Object.assign(
            Object.assign(
              Object.assign(
                Object.assign(
                  {},
                  "providerId" in e ? { provider_id: e.providerId } : null,
                ),
                "domain" in e ? { domain: e.domain } : null,
              ),
              {
                redirect_to:
                  (s =
                    (r = e.options) === null || r === void 0
                      ? void 0
                      : r.redirectTo) !== null && s !== void 0
                    ? s
                    : void 0,
              },
            ),
            !((n = e?.options) === null || n === void 0) && n.captchaToken
              ? {
                  gotrue_meta_security: {
                    captcha_token: e.options.captchaToken,
                  },
                }
              : null,
          ),
          {
            skip_http_redirect: !0,
            code_challenge: o,
            code_challenge_method: l,
          },
        ),
        headers: this.headers,
        xform: Ri,
      });
      return (
        !((i = c.data) === null || i === void 0) &&
          i.url &&
          F() &&
          !(
            !((a = e.options) === null || a === void 0) && a.skipBrowserRedirect
          ) &&
          window.location.assign(c.data.url),
        this._returnResult(c)
      );
    } catch (o) {
      if ((await z(this.storage, `${this.storageKey}-code-verifier`), x(o)))
        return this._returnResult({ data: null, error: o });
      throw o;
    }
  }
  async reauthenticate() {
    return (
      await this.initializePromise,
      await this._acquireLock(
        this.lockAcquireTimeout,
        async () => await this._reauthenticate(),
      )
    );
  }
  async _reauthenticate() {
    try {
      return await this._useSession(async (e) => {
        const {
          data: { session: r },
          error: s,
        } = e;
        if (s) throw s;
        if (!r) throw new D();
        const { error: n } = await k(
          this.fetch,
          "GET",
          `${this.url}/reauthenticate`,
          { headers: this.headers, jwt: r.access_token },
        );
        return this._returnResult({
          data: { user: null, session: null },
          error: n,
        });
      });
    } catch (e) {
      if (x(e))
        return this._returnResult({
          data: { user: null, session: null },
          error: e,
        });
      throw e;
    }
  }
  async resend(e) {
    try {
      const r = `${this.url}/resend`;
      if ("email" in e) {
        const { email: s, type: n, options: i } = e,
          { error: a } = await k(this.fetch, "POST", r, {
            headers: this.headers,
            body: {
              email: s,
              type: n,
              gotrue_meta_security: { captcha_token: i?.captchaToken },
            },
            redirectTo: i?.emailRedirectTo,
          });
        return this._returnResult({
          data: { user: null, session: null },
          error: a,
        });
      } else if ("phone" in e) {
        const { phone: s, type: n, options: i } = e,
          { data: a, error: o } = await k(this.fetch, "POST", r, {
            headers: this.headers,
            body: {
              phone: s,
              type: n,
              gotrue_meta_security: { captcha_token: i?.captchaToken },
            },
          });
        return this._returnResult({
          data: { user: null, session: null, messageId: a?.message_id },
          error: o,
        });
      }
      throw new He(
        "You must provide either an email or phone number and a type",
      );
    } catch (r) {
      if (x(r))
        return this._returnResult({
          data: { user: null, session: null },
          error: r,
        });
      throw r;
    }
  }
  async getSession() {
    return (
      await this.initializePromise,
      await this._acquireLock(this.lockAcquireTimeout, async () =>
        this._useSession(async (r) => r),
      )
    );
  }
  async _acquireLock(e, r) {
    this._debug("#_acquireLock", "begin", e);
    try {
      if (this.lockAcquired) {
        const s = this.pendingInLock.length
            ? this.pendingInLock[this.pendingInLock.length - 1]
            : Promise.resolve(),
          n = (async () => (await s, await r()))();
        return (
          this.pendingInLock.push(
            (async () => {
              try {
                await n;
              } catch {}
            })(),
          ),
          n
        );
      }
      return await this.lock(`lock:${this.storageKey}`, e, async () => {
        this._debug(
          "#_acquireLock",
          "lock acquired for storage key",
          this.storageKey,
        );
        try {
          this.lockAcquired = !0;
          const s = r();
          for (
            this.pendingInLock.push(
              (async () => {
                try {
                  await s;
                } catch {}
              })(),
            ),
              await s;
            this.pendingInLock.length;
          ) {
            const n = [...this.pendingInLock];
            (await Promise.all(n), this.pendingInLock.splice(0, n.length));
          }
          return await s;
        } finally {
          (this._debug(
            "#_acquireLock",
            "lock released for storage key",
            this.storageKey,
          ),
            (this.lockAcquired = !1));
        }
      });
    } finally {
      this._debug("#_acquireLock", "end");
    }
  }
  async _useSession(e) {
    this._debug("#_useSession", "begin");
    try {
      const r = await this.__loadSession();
      return await e(r);
    } finally {
      this._debug("#_useSession", "end");
    }
  }
  async __loadSession() {
    (this._debug("#__loadSession()", "begin"),
      this.lockAcquired ||
        this._debug(
          "#__loadSession()",
          "used outside of an acquired lock!",
          new Error().stack,
        ));
    try {
      let e = null;
      const r = await oe(this.storage, this.storageKey);
      if (
        (this._debug("#getSession()", "session from storage", r),
        r !== null &&
          (this._isValidSession(r)
            ? (e = r)
            : (this._debug(
                "#getSession()",
                "session from storage is not valid",
              ),
              await this._removeSession())),
        !e)
      )
        return { data: { session: null }, error: null };
      const s = e.expires_at ? e.expires_at * 1e3 - Date.now() < lt : !1;
      if (
        (this._debug(
          "#__loadSession()",
          `session has${s ? "" : " not"} expired`,
          "expires_at",
          e.expires_at,
        ),
        !s)
      ) {
        if (this.userStorage) {
          const a = await oe(this.userStorage, this.storageKey + "-user");
          a?.user ? (e.user = a.user) : (e.user = ht());
        }
        if (
          this.storage.isServer &&
          e.user &&
          !e.user.__isUserNotAvailableProxy
        ) {
          const a = { value: this.suppressGetSessionWarning };
          ((e.user = ki(e.user, a)),
            a.value && (this.suppressGetSessionWarning = !0));
        }
        return { data: { session: e }, error: null };
      }
      const { data: n, error: i } = await this._callRefreshToken(
        e.refresh_token,
      );
      return i
        ? this._returnResult({ data: { session: null }, error: i })
        : this._returnResult({ data: { session: n }, error: null });
    } finally {
      this._debug("#__loadSession()", "end");
    }
  }
  async getUser(e) {
    if (e) return await this._getUser(e);
    await this.initializePromise;
    const r = await this._acquireLock(
      this.lockAcquireTimeout,
      async () => await this._getUser(),
    );
    return (r.data.user && (this.suppressGetSessionWarning = !0), r);
  }
  async _getUser(e) {
    try {
      return e
        ? await k(this.fetch, "GET", `${this.url}/user`, {
            headers: this.headers,
            jwt: e,
            xform: ie,
          })
        : await this._useSession(async (r) => {
            var s, n, i;
            const { data: a, error: o } = r;
            if (o) throw o;
            return !(
              !((s = a.session) === null || s === void 0) && s.access_token
            ) && !this.hasCustomAuthorizationHeader
              ? { data: { user: null }, error: new D() }
              : await k(this.fetch, "GET", `${this.url}/user`, {
                  headers: this.headers,
                  jwt:
                    (i =
                      (n = a.session) === null || n === void 0
                        ? void 0
                        : n.access_token) !== null && i !== void 0
                      ? i
                      : void 0,
                  xform: ie,
                });
          });
    } catch (r) {
      if (x(r))
        return (
          We(r) &&
            (await this._removeSession(),
            await z(this.storage, `${this.storageKey}-code-verifier`)),
          this._returnResult({ data: { user: null }, error: r })
        );
      throw r;
    }
  }
  async updateUser(e, r = {}) {
    return (
      await this.initializePromise,
      await this._acquireLock(
        this.lockAcquireTimeout,
        async () => await this._updateUser(e, r),
      )
    );
  }
  async _updateUser(e, r = {}) {
    try {
      return await this._useSession(async (s) => {
        const { data: n, error: i } = s;
        if (i) throw i;
        if (!n.session) throw new D();
        const a = n.session;
        let o = null,
          l = null;
        this.flowType === "pkce" &&
          e.email != null &&
          ([o, l] = await ge(this.storage, this.storageKey));
        const { data: c, error: h } = await k(
          this.fetch,
          "PUT",
          `${this.url}/user`,
          {
            headers: this.headers,
            redirectTo: r?.emailRedirectTo,
            body: Object.assign(Object.assign({}, e), {
              code_challenge: o,
              code_challenge_method: l,
            }),
            jwt: a.access_token,
            xform: ie,
          },
        );
        if (h) throw h;
        return (
          (a.user = c.user),
          await this._saveSession(a),
          await this._notifyAllSubscribers("USER_UPDATED", a),
          this._returnResult({ data: { user: a.user }, error: null })
        );
      });
    } catch (s) {
      if ((await z(this.storage, `${this.storageKey}-code-verifier`), x(s)))
        return this._returnResult({ data: { user: null }, error: s });
      throw s;
    }
  }
  async setSession(e) {
    return (
      await this.initializePromise,
      await this._acquireLock(
        this.lockAcquireTimeout,
        async () => await this._setSession(e),
      )
    );
  }
  async _setSession(e) {
    try {
      if (!e.access_token || !e.refresh_token) throw new D();
      const r = Date.now() / 1e3;
      let s = r,
        n = !0,
        i = null;
      const { payload: a } = Ge(e.access_token);
      if ((a.exp && ((s = a.exp), (n = s <= r)), n)) {
        const { data: o, error: l } = await this._callRefreshToken(
          e.refresh_token,
        );
        if (l)
          return this._returnResult({
            data: { user: null, session: null },
            error: l,
          });
        if (!o) return { data: { user: null, session: null }, error: null };
        i = o;
      } else {
        const { data: o, error: l } = await this._getUser(e.access_token);
        if (l)
          return this._returnResult({
            data: { user: null, session: null },
            error: l,
          });
        ((i = {
          access_token: e.access_token,
          refresh_token: e.refresh_token,
          user: o.user,
          token_type: "bearer",
          expires_in: s - r,
          expires_at: s,
        }),
          await this._saveSession(i),
          await this._notifyAllSubscribers("SIGNED_IN", i));
      }
      return this._returnResult({
        data: { user: i.user, session: i },
        error: null,
      });
    } catch (r) {
      if (x(r))
        return this._returnResult({
          data: { session: null, user: null },
          error: r,
        });
      throw r;
    }
  }
  async refreshSession(e) {
    return (
      await this.initializePromise,
      await this._acquireLock(
        this.lockAcquireTimeout,
        async () => await this._refreshSession(e),
      )
    );
  }
  async _refreshSession(e) {
    try {
      return await this._useSession(async (r) => {
        var s;
        if (!e) {
          const { data: a, error: o } = r;
          if (o) throw o;
          e = (s = a.session) !== null && s !== void 0 ? s : void 0;
        }
        if (!e?.refresh_token) throw new D();
        const { data: n, error: i } = await this._callRefreshToken(
          e.refresh_token,
        );
        return i
          ? this._returnResult({
              data: { user: null, session: null },
              error: i,
            })
          : n
            ? this._returnResult({
                data: { user: n.user, session: n },
                error: null,
              })
            : this._returnResult({
                data: { user: null, session: null },
                error: null,
              });
      });
    } catch (r) {
      if (x(r))
        return this._returnResult({
          data: { user: null, session: null },
          error: r,
        });
      throw r;
    }
  }
  async _getSessionFromURL(e, r) {
    var s;
    try {
      if (!F()) throw new Ve("No browser detected.");
      if (e.error || e.error_description || e.error_code)
        throw new Ve(
          e.error_description ||
            "Error in URL with unspecified error_description",
          {
            error: e.error || "unspecified_error",
            code: e.error_code || "unspecified_code",
          },
        );
      switch (r) {
        case "implicit":
          if (this.flowType === "pkce")
            throw new Xt("Not a valid PKCE flow url.");
          break;
        case "pkce":
          if (this.flowType === "implicit")
            throw new Ve("Not a valid implicit grant flow url.");
          break;
        default:
      }
      if (r === "pkce") {
        if (
          (this._debug("#_initialize()", "begin", "is PKCE flow", !0), !e.code)
        )
          throw new Xt("No code detected.");
        const { data: b, error: _ } = await this._exchangeCodeForSession(
          e.code,
        );
        if (_) throw _;
        const E = new URL(window.location.href);
        return (
          E.searchParams.delete("code"),
          window.history.replaceState(window.history.state, "", E.toString()),
          {
            data: {
              session: b.session,
              redirectType:
                (s = b.redirectType) !== null && s !== void 0 ? s : null,
            },
            error: null,
          }
        );
      }
      const {
        provider_token: n,
        provider_refresh_token: i,
        access_token: a,
        refresh_token: o,
        expires_in: l,
        expires_at: c,
        token_type: h,
      } = e;
      if (!a || !l || !o || !h) throw new Ve("No session defined in URL");
      const u = Math.round(Date.now() / 1e3),
        f = parseInt(l);
      let p = u + f;
      c && (p = parseInt(c));
      const g = p - u;
      g * 1e3 <= be &&
        console.warn(
          `@supabase/gotrue-js: Session as retrieved from URL expires in ${g}s, should have been closer to ${f}s`,
        );
      const m = p - f;
      u - m >= 120
        ? console.warn(
            "@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",
            m,
            p,
            u,
          )
        : u - m < 0 &&
          console.warn(
            "@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",
            m,
            p,
            u,
          );
      const { data: v, error: y } = await this._getUser(a);
      if (y) throw y;
      const w = {
        provider_token: n,
        provider_refresh_token: i,
        access_token: a,
        expires_in: f,
        expires_at: p,
        refresh_token: o,
        token_type: h,
        user: v.user,
      };
      return (
        (window.location.hash = ""),
        this._debug("#_getSessionFromURL()", "clearing window.location.hash"),
        this._returnResult({
          data: { session: w, redirectType: e.type },
          error: null,
        })
      );
    } catch (n) {
      if (x(n))
        return this._returnResult({
          data: { session: null, redirectType: null },
          error: n,
        });
      throw n;
    }
  }
  _isImplicitGrantCallback(e) {
    return typeof this.detectSessionInUrl == "function"
      ? this.detectSessionInUrl(new URL(window.location.href), e)
      : !!(e.access_token || e.error_description);
  }
  async _isPKCECallback(e) {
    const r = await oe(this.storage, `${this.storageKey}-code-verifier`);
    return !!(e.code && r);
  }
  async signOut(e = { scope: "global" }) {
    return (
      await this.initializePromise,
      await this._acquireLock(
        this.lockAcquireTimeout,
        async () => await this._signOut(e),
      )
    );
  }
  async _signOut({ scope: e } = { scope: "global" }) {
    return await this._useSession(async (r) => {
      var s;
      const { data: n, error: i } = r;
      if (i && !We(i)) return this._returnResult({ error: i });
      const a =
        (s = n.session) === null || s === void 0 ? void 0 : s.access_token;
      if (a) {
        const { error: o } = await this.admin.signOut(a, e);
        if (
          o &&
          !(
            (ti(o) &&
              (o.status === 404 || o.status === 401 || o.status === 403)) ||
            We(o)
          )
        )
          return this._returnResult({ error: o });
      }
      return (
        e !== "others" &&
          (await this._removeSession(),
          await z(this.storage, `${this.storageKey}-code-verifier`)),
        this._returnResult({ error: null })
      );
    });
  }
  onAuthStateChange(e) {
    const r = hi(),
      s = {
        id: r,
        callback: e,
        unsubscribe: () => {
          (this._debug(
            "#unsubscribe()",
            "state change callback with id removed",
            r,
          ),
            this.stateChangeEmitters.delete(r));
        },
      };
    return (
      this._debug("#onAuthStateChange()", "registered callback with id", r),
      this.stateChangeEmitters.set(r, s),
      (async () => (
        await this.initializePromise,
        await this._acquireLock(this.lockAcquireTimeout, async () => {
          this._emitInitialSession(r);
        })
      ))(),
      { data: { subscription: s } }
    );
  }
  async _emitInitialSession(e) {
    return await this._useSession(async (r) => {
      var s, n;
      try {
        const {
          data: { session: i },
          error: a,
        } = r;
        if (a) throw a;
        (await ((s = this.stateChangeEmitters.get(e)) === null || s === void 0
          ? void 0
          : s.callback("INITIAL_SESSION", i)),
          this._debug("INITIAL_SESSION", "callback id", e, "session", i));
      } catch (i) {
        (await ((n = this.stateChangeEmitters.get(e)) === null || n === void 0
          ? void 0
          : n.callback("INITIAL_SESSION", null)),
          this._debug("INITIAL_SESSION", "callback id", e, "error", i),
          We(i) ? console.warn(i) : console.error(i));
      }
    });
  }
  async resetPasswordForEmail(e, r = {}) {
    let s = null,
      n = null;
    this.flowType === "pkce" &&
      ([s, n] = await ge(this.storage, this.storageKey, !0));
    try {
      return await k(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email: e,
          code_challenge: s,
          code_challenge_method: n,
          gotrue_meta_security: { captcha_token: r.captchaToken },
        },
        headers: this.headers,
        redirectTo: r.redirectTo,
      });
    } catch (i) {
      if ((await z(this.storage, `${this.storageKey}-code-verifier`), x(i)))
        return this._returnResult({ data: null, error: i });
      throw i;
    }
  }
  async getUserIdentities() {
    var e;
    try {
      const { data: r, error: s } = await this.getUser();
      if (s) throw s;
      return this._returnResult({
        data: {
          identities: (e = r.user.identities) !== null && e !== void 0 ? e : [],
        },
        error: null,
      });
    } catch (r) {
      if (x(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async linkIdentity(e) {
    return "token" in e
      ? this.linkIdentityIdToken(e)
      : this.linkIdentityOAuth(e);
  }
  async linkIdentityOAuth(e) {
    var r;
    try {
      const { data: s, error: n } = await this._useSession(async (i) => {
        var a, o, l, c, h;
        const { data: u, error: f } = i;
        if (f) throw f;
        const p = await this._getUrlForProvider(
          `${this.url}/user/identities/authorize`,
          e.provider,
          {
            redirectTo:
              (a = e.options) === null || a === void 0 ? void 0 : a.redirectTo,
            scopes:
              (o = e.options) === null || o === void 0 ? void 0 : o.scopes,
            queryParams:
              (l = e.options) === null || l === void 0 ? void 0 : l.queryParams,
            skipBrowserRedirect: !0,
          },
        );
        return await k(this.fetch, "GET", p, {
          headers: this.headers,
          jwt:
            (h =
              (c = u.session) === null || c === void 0
                ? void 0
                : c.access_token) !== null && h !== void 0
              ? h
              : void 0,
        });
      });
      if (n) throw n;
      return (
        F() &&
          !(
            !((r = e.options) === null || r === void 0) && r.skipBrowserRedirect
          ) &&
          window.location.assign(s?.url),
        this._returnResult({
          data: { provider: e.provider, url: s?.url },
          error: null,
        })
      );
    } catch (s) {
      if (x(s))
        return this._returnResult({
          data: { provider: e.provider, url: null },
          error: s,
        });
      throw s;
    }
  }
  async linkIdentityIdToken(e) {
    return await this._useSession(async (r) => {
      var s;
      try {
        const {
          error: n,
          data: { session: i },
        } = r;
        if (n) throw n;
        const {
            options: a,
            provider: o,
            token: l,
            access_token: c,
            nonce: h,
          } = e,
          u = await k(
            this.fetch,
            "POST",
            `${this.url}/token?grant_type=id_token`,
            {
              headers: this.headers,
              jwt: (s = i?.access_token) !== null && s !== void 0 ? s : void 0,
              body: {
                provider: o,
                id_token: l,
                access_token: c,
                nonce: h,
                link_identity: !0,
                gotrue_meta_security: { captcha_token: a?.captchaToken },
              },
              xform: H,
            },
          ),
          { data: f, error: p } = u;
        return p
          ? this._returnResult({
              data: { user: null, session: null },
              error: p,
            })
          : !f || !f.session || !f.user
            ? this._returnResult({
                data: { user: null, session: null },
                error: new pe(),
              })
            : (f.session &&
                (await this._saveSession(f.session),
                await this._notifyAllSubscribers("USER_UPDATED", f.session)),
              this._returnResult({ data: f, error: p }));
      } catch (n) {
        if ((await z(this.storage, `${this.storageKey}-code-verifier`), x(n)))
          return this._returnResult({
            data: { user: null, session: null },
            error: n,
          });
        throw n;
      }
    });
  }
  async unlinkIdentity(e) {
    try {
      return await this._useSession(async (r) => {
        var s, n;
        const { data: i, error: a } = r;
        if (a) throw a;
        return await k(
          this.fetch,
          "DELETE",
          `${this.url}/user/identities/${e.identity_id}`,
          {
            headers: this.headers,
            jwt:
              (n =
                (s = i.session) === null || s === void 0
                  ? void 0
                  : s.access_token) !== null && n !== void 0
                ? n
                : void 0,
          },
        );
      });
    } catch (r) {
      if (x(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async _refreshAccessToken(e) {
    const r = `#_refreshAccessToken(${e.substring(0, 5)}...)`;
    this._debug(r, "begin");
    try {
      const s = Date.now();
      return await pi(
        async (n) => (
          n > 0 && (await fi(200 * Math.pow(2, n - 1))),
          this._debug(r, "refreshing attempt", n),
          await k(
            this.fetch,
            "POST",
            `${this.url}/token?grant_type=refresh_token`,
            { body: { refresh_token: e }, headers: this.headers, xform: H },
          )
        ),
        (n, i) => {
          const a = 200 * Math.pow(2, n);
          return i && ct(i) && Date.now() + a - s < be;
        },
      );
    } catch (s) {
      if ((this._debug(r, "error", s), x(s)))
        return this._returnResult({
          data: { session: null, user: null },
          error: s,
        });
      throw s;
    } finally {
      this._debug(r, "end");
    }
  }
  _isValidSession(e) {
    return (
      typeof e == "object" &&
      e !== null &&
      "access_token" in e &&
      "refresh_token" in e &&
      "expires_at" in e
    );
  }
  async _handleProviderSignIn(e, r) {
    const s = await this._getUrlForProvider(`${this.url}/authorize`, e, {
      redirectTo: r.redirectTo,
      scopes: r.scopes,
      queryParams: r.queryParams,
    });
    return (
      this._debug(
        "#_handleProviderSignIn()",
        "provider",
        e,
        "options",
        r,
        "url",
        s,
      ),
      F() && !r.skipBrowserRedirect && window.location.assign(s),
      { data: { provider: e, url: s }, error: null }
    );
  }
  async _recoverAndRefresh() {
    var e, r;
    const s = "#_recoverAndRefresh()";
    this._debug(s, "begin");
    try {
      const n = await oe(this.storage, this.storageKey);
      if (n && this.userStorage) {
        let a = await oe(this.userStorage, this.storageKey + "-user");
        (!this.storage.isServer &&
          Object.is(this.storage, this.userStorage) &&
          !a &&
          ((a = { user: n.user }),
          await we(this.userStorage, this.storageKey + "-user", a)),
          (n.user = (e = a?.user) !== null && e !== void 0 ? e : ht()));
      } else if (n && !n.user && !n.user) {
        const a = await oe(this.storage, this.storageKey + "-user");
        a && a?.user
          ? ((n.user = a.user),
            await z(this.storage, this.storageKey + "-user"),
            await we(this.storage, this.storageKey, n))
          : (n.user = ht());
      }
      if (
        (this._debug(s, "session from storage", n), !this._isValidSession(n))
      ) {
        (this._debug(s, "session is not valid"),
          n !== null && (await this._removeSession()));
        return;
      }
      const i =
        ((r = n.expires_at) !== null && r !== void 0 ? r : 1 / 0) * 1e3 -
          Date.now() <
        lt;
      if (
        (this._debug(
          s,
          `session has${i ? "" : " not"} expired with margin of ${lt}s`,
        ),
        i)
      ) {
        if (this.autoRefreshToken && n.refresh_token) {
          const { error: a } = await this._callRefreshToken(n.refresh_token);
          a &&
            (console.error(a),
            ct(a) ||
              (this._debug(
                s,
                "refresh failed with a non-retryable error, removing the session",
                a,
              ),
              await this._removeSession()));
        }
      } else if (n.user && n.user.__isUserNotAvailableProxy === !0)
        try {
          const { data: a, error: o } = await this._getUser(n.access_token);
          !o && a?.user
            ? ((n.user = a.user),
              await this._saveSession(n),
              await this._notifyAllSubscribers("SIGNED_IN", n))
            : this._debug(
                s,
                "could not get user data, skipping SIGNED_IN notification",
              );
        } catch (a) {
          (console.error("Error getting user data:", a),
            this._debug(
              s,
              "error getting user data, skipping SIGNED_IN notification",
              a,
            ));
        }
      else await this._notifyAllSubscribers("SIGNED_IN", n);
    } catch (n) {
      (this._debug(s, "error", n), console.error(n));
      return;
    } finally {
      this._debug(s, "end");
    }
  }
  async _callRefreshToken(e) {
    var r, s;
    if (!e) throw new D();
    if (this.refreshingDeferred) return this.refreshingDeferred.promise;
    const n = `#_callRefreshToken(${e.substring(0, 5)}...)`;
    this._debug(n, "begin");
    try {
      this.refreshingDeferred = new it();
      const { data: i, error: a } = await this._refreshAccessToken(e);
      if (a) throw a;
      if (!i.session) throw new D();
      (await this._saveSession(i.session),
        await this._notifyAllSubscribers("TOKEN_REFRESHED", i.session));
      const o = { data: i.session, error: null };
      return (this.refreshingDeferred.resolve(o), o);
    } catch (i) {
      if ((this._debug(n, "error", i), x(i))) {
        const a = { data: null, error: i };
        return (
          ct(i) || (await this._removeSession()),
          (r = this.refreshingDeferred) === null ||
            r === void 0 ||
            r.resolve(a),
          a
        );
      }
      throw (
        (s = this.refreshingDeferred) === null || s === void 0 || s.reject(i),
        i
      );
    } finally {
      ((this.refreshingDeferred = null), this._debug(n, "end"));
    }
  }
  async _notifyAllSubscribers(e, r, s = !0) {
    const n = `#_notifyAllSubscribers(${e})`;
    this._debug(n, "begin", r, `broadcast = ${s}`);
    try {
      this.broadcastChannel &&
        s &&
        this.broadcastChannel.postMessage({ event: e, session: r });
      const i = [],
        a = Array.from(this.stateChangeEmitters.values()).map(async (o) => {
          try {
            await o.callback(e, r);
          } catch (l) {
            i.push(l);
          }
        });
      if ((await Promise.all(a), i.length > 0)) {
        for (let o = 0; o < i.length; o += 1) console.error(i[o]);
        throw i[0];
      }
    } finally {
      this._debug(n, "end");
    }
  }
  async _saveSession(e) {
    (this._debug("#_saveSession()", e),
      (this.suppressGetSessionWarning = !0),
      await z(this.storage, `${this.storageKey}-code-verifier`));
    const r = Object.assign({}, e),
      s = r.user && r.user.__isUserNotAvailableProxy === !0;
    if (this.userStorage) {
      !s &&
        r.user &&
        (await we(this.userStorage, this.storageKey + "-user", {
          user: r.user,
        }));
      const n = Object.assign({}, r);
      delete n.user;
      const i = tr(n);
      await we(this.storage, this.storageKey, i);
    } else {
      const n = tr(r);
      await we(this.storage, this.storageKey, n);
    }
  }
  async _removeSession() {
    (this._debug("#_removeSession()"),
      (this.suppressGetSessionWarning = !1),
      await z(this.storage, this.storageKey),
      await z(this.storage, this.storageKey + "-code-verifier"),
      await z(this.storage, this.storageKey + "-user"),
      this.userStorage &&
        (await z(this.userStorage, this.storageKey + "-user")),
      await this._notifyAllSubscribers("SIGNED_OUT", null));
  }
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    const e = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      e &&
        F() &&
        window?.removeEventListener &&
        window.removeEventListener("visibilitychange", e);
    } catch (r) {
      console.error("removing visibilitychange callback failed", r);
    }
  }
  async _startAutoRefresh() {
    (await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()"));
    const e = setInterval(() => this._autoRefreshTokenTick(), be);
    ((this.autoRefreshTicker = e),
      e && typeof e == "object" && typeof e.unref == "function"
        ? e.unref()
        : typeof Deno < "u" &&
          typeof Deno.unrefTimer == "function" &&
          Deno.unrefTimer(e));
    const r = setTimeout(async () => {
      (await this.initializePromise, await this._autoRefreshTokenTick());
    }, 0);
    ((this.autoRefreshTickTimeout = r),
      r && typeof r == "object" && typeof r.unref == "function"
        ? r.unref()
        : typeof Deno < "u" &&
          typeof Deno.unrefTimer == "function" &&
          Deno.unrefTimer(r));
  }
  async _stopAutoRefresh() {
    this._debug("#_stopAutoRefresh()");
    const e = this.autoRefreshTicker;
    ((this.autoRefreshTicker = null), e && clearInterval(e));
    const r = this.autoRefreshTickTimeout;
    ((this.autoRefreshTickTimeout = null), r && clearTimeout(r));
  }
  async startAutoRefresh() {
    (this._removeVisibilityChangedCallback(), await this._startAutoRefresh());
  }
  async stopAutoRefresh() {
    (this._removeVisibilityChangedCallback(), await this._stopAutoRefresh());
  }
  async _autoRefreshTokenTick() {
    this._debug("#_autoRefreshTokenTick()", "begin");
    try {
      await this._acquireLock(0, async () => {
        try {
          const e = Date.now();
          try {
            return await this._useSession(async (r) => {
              const {
                data: { session: s },
              } = r;
              if (!s || !s.refresh_token || !s.expires_at) {
                this._debug("#_autoRefreshTokenTick()", "no session");
                return;
              }
              const n = Math.floor((s.expires_at * 1e3 - e) / be);
              (this._debug(
                "#_autoRefreshTokenTick()",
                `access token expires in ${n} ticks, a tick lasts ${be}ms, refresh threshold is ${Tt} ticks`,
              ),
                n <= Tt && (await this._callRefreshToken(s.refresh_token)));
            });
          } catch (r) {
            console.error(
              "Auto refresh tick failed with error. This is likely a transient error.",
              r,
            );
          }
        } finally {
          this._debug("#_autoRefreshTokenTick()", "end");
        }
      });
    } catch (e) {
      if (e instanceof ns)
        this._debug("auto refresh token tick lock not available");
      else throw e;
    }
  }
  async _handleVisibilityChange() {
    if (
      (this._debug("#_handleVisibilityChange()"),
      !F() || !window?.addEventListener)
    )
      return (this.autoRefreshToken && this.startAutoRefresh(), !1);
    try {
      ((this.visibilityChangedCallback = async () => {
        try {
          await this._onVisibilityChanged(!1);
        } catch (e) {
          this._debug("#visibilityChangedCallback", "error", e);
        }
      }),
        window?.addEventListener(
          "visibilitychange",
          this.visibilityChangedCallback,
        ),
        await this._onVisibilityChanged(!0));
    } catch (e) {
      console.error("_handleVisibilityChange", e);
    }
  }
  async _onVisibilityChanged(e) {
    const r = `#_onVisibilityChanged(${e})`;
    (this._debug(r, "visibilityState", document.visibilityState),
      document.visibilityState === "visible"
        ? (this.autoRefreshToken && this._startAutoRefresh(),
          e ||
            (await this.initializePromise,
            await this._acquireLock(this.lockAcquireTimeout, async () => {
              if (document.visibilityState !== "visible") {
                this._debug(
                  r,
                  "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting",
                );
                return;
              }
              await this._recoverAndRefresh();
            })))
        : document.visibilityState === "hidden" &&
          this.autoRefreshToken &&
          this._stopAutoRefresh());
  }
  async _getUrlForProvider(e, r, s) {
    const n = [`provider=${encodeURIComponent(r)}`];
    if (
      (s?.redirectTo &&
        n.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`),
      s?.scopes && n.push(`scopes=${encodeURIComponent(s.scopes)}`),
      this.flowType === "pkce")
    ) {
      const [i, a] = await ge(this.storage, this.storageKey),
        o = new URLSearchParams({
          code_challenge: `${encodeURIComponent(i)}`,
          code_challenge_method: `${encodeURIComponent(a)}`,
        });
      n.push(o.toString());
    }
    if (s?.queryParams) {
      const i = new URLSearchParams(s.queryParams);
      n.push(i.toString());
    }
    return (
      s?.skipBrowserRedirect &&
        n.push(`skip_http_redirect=${s.skipBrowserRedirect}`),
      `${e}?${n.join("&")}`
    );
  }
  async _unenroll(e) {
    try {
      return await this._useSession(async (r) => {
        var s;
        const { data: n, error: i } = r;
        return i
          ? this._returnResult({ data: null, error: i })
          : await k(this.fetch, "DELETE", `${this.url}/factors/${e.factorId}`, {
              headers: this.headers,
              jwt:
                (s = n?.session) === null || s === void 0
                  ? void 0
                  : s.access_token,
            });
      });
    } catch (r) {
      if (x(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async _enroll(e) {
    try {
      return await this._useSession(async (r) => {
        var s, n;
        const { data: i, error: a } = r;
        if (a) return this._returnResult({ data: null, error: a });
        const o = Object.assign(
            { friendly_name: e.friendlyName, factor_type: e.factorType },
            e.factorType === "phone"
              ? { phone: e.phone }
              : e.factorType === "totp"
                ? { issuer: e.issuer }
                : {},
          ),
          { data: l, error: c } = await k(
            this.fetch,
            "POST",
            `${this.url}/factors`,
            {
              body: o,
              headers: this.headers,
              jwt:
                (s = i?.session) === null || s === void 0
                  ? void 0
                  : s.access_token,
            },
          );
        return c
          ? this._returnResult({ data: null, error: c })
          : (e.factorType === "totp" &&
              l.type === "totp" &&
              !((n = l?.totp) === null || n === void 0) &&
              n.qr_code &&
              (l.totp.qr_code = `data:image/svg+xml;utf-8,${l.totp.qr_code}`),
            this._returnResult({ data: l, error: null }));
      });
    } catch (r) {
      if (x(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async _verify(e) {
    return this._acquireLock(this.lockAcquireTimeout, async () => {
      try {
        return await this._useSession(async (r) => {
          var s;
          const { data: n, error: i } = r;
          if (i) return this._returnResult({ data: null, error: i });
          const a = Object.assign(
              { challenge_id: e.challengeId },
              "webauthn" in e
                ? {
                    webauthn: Object.assign(Object.assign({}, e.webauthn), {
                      credential_response:
                        e.webauthn.type === "create"
                          ? cr(e.webauthn.credential_response)
                          : hr(e.webauthn.credential_response),
                    }),
                  }
                : { code: e.code },
            ),
            { data: o, error: l } = await k(
              this.fetch,
              "POST",
              `${this.url}/factors/${e.factorId}/verify`,
              {
                body: a,
                headers: this.headers,
                jwt:
                  (s = n?.session) === null || s === void 0
                    ? void 0
                    : s.access_token,
              },
            );
          return l
            ? this._returnResult({ data: null, error: l })
            : (await this._saveSession(
                Object.assign(
                  { expires_at: Math.round(Date.now() / 1e3) + o.expires_in },
                  o,
                ),
              ),
              await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", o),
              this._returnResult({ data: o, error: l }));
        });
      } catch (r) {
        if (x(r)) return this._returnResult({ data: null, error: r });
        throw r;
      }
    });
  }
  async _challenge(e) {
    return this._acquireLock(this.lockAcquireTimeout, async () => {
      try {
        return await this._useSession(async (r) => {
          var s;
          const { data: n, error: i } = r;
          if (i) return this._returnResult({ data: null, error: i });
          const a = await k(
            this.fetch,
            "POST",
            `${this.url}/factors/${e.factorId}/challenge`,
            {
              body: e,
              headers: this.headers,
              jwt:
                (s = n?.session) === null || s === void 0
                  ? void 0
                  : s.access_token,
            },
          );
          if (a.error) return a;
          const { data: o } = a;
          if (o.type !== "webauthn") return { data: o, error: null };
          switch (o.webauthn.type) {
            case "create":
              return {
                data: Object.assign(Object.assign({}, o), {
                  webauthn: Object.assign(Object.assign({}, o.webauthn), {
                    credential_options: Object.assign(
                      Object.assign({}, o.webauthn.credential_options),
                      {
                        publicKey: or(o.webauthn.credential_options.publicKey),
                      },
                    ),
                  }),
                }),
                error: null,
              };
            case "request":
              return {
                data: Object.assign(Object.assign({}, o), {
                  webauthn: Object.assign(Object.assign({}, o.webauthn), {
                    credential_options: Object.assign(
                      Object.assign({}, o.webauthn.credential_options),
                      {
                        publicKey: lr(o.webauthn.credential_options.publicKey),
                      },
                    ),
                  }),
                }),
                error: null,
              };
          }
        });
      } catch (r) {
        if (x(r)) return this._returnResult({ data: null, error: r });
        throw r;
      }
    });
  }
  async _challengeAndVerify(e) {
    const { data: r, error: s } = await this._challenge({
      factorId: e.factorId,
    });
    return s
      ? this._returnResult({ data: null, error: s })
      : await this._verify({
          factorId: e.factorId,
          challengeId: r.id,
          code: e.code,
        });
  }
  async _listFactors() {
    var e;
    const {
      data: { user: r },
      error: s,
    } = await this.getUser();
    if (s) return { data: null, error: s };
    const n = { all: [], phone: [], totp: [], webauthn: [] };
    for (const i of (e = r?.factors) !== null && e !== void 0 ? e : [])
      (n.all.push(i), i.status === "verified" && n[i.factor_type].push(i));
    return { data: n, error: null };
  }
  async _getAuthenticatorAssuranceLevel(e) {
    var r, s, n, i;
    if (e)
      try {
        const { payload: p } = Ge(e);
        let g = null;
        p.aal && (g = p.aal);
        let m = g;
        const {
          data: { user: v },
          error: y,
        } = await this.getUser(e);
        if (y) return this._returnResult({ data: null, error: y });
        ((s =
          (r = v?.factors) === null || r === void 0
            ? void 0
            : r.filter((_) => _.status === "verified")) !== null && s !== void 0
          ? s
          : []
        ).length > 0 && (m = "aal2");
        const b = p.amr || [];
        return {
          data: {
            currentLevel: g,
            nextLevel: m,
            currentAuthenticationMethods: b,
          },
          error: null,
        };
      } catch (p) {
        if (x(p)) return this._returnResult({ data: null, error: p });
        throw p;
      }
    const {
      data: { session: a },
      error: o,
    } = await this.getSession();
    if (o) return this._returnResult({ data: null, error: o });
    if (!a)
      return {
        data: {
          currentLevel: null,
          nextLevel: null,
          currentAuthenticationMethods: [],
        },
        error: null,
      };
    const { payload: l } = Ge(a.access_token);
    let c = null;
    l.aal && (c = l.aal);
    let h = c;
    ((i =
      (n = a.user.factors) === null || n === void 0
        ? void 0
        : n.filter((p) => p.status === "verified")) !== null && i !== void 0
      ? i
      : []
    ).length > 0 && (h = "aal2");
    const f = l.amr || [];
    return {
      data: { currentLevel: c, nextLevel: h, currentAuthenticationMethods: f },
      error: null,
    };
  }
  async _getAuthorizationDetails(e) {
    try {
      return await this._useSession(async (r) => {
        const {
          data: { session: s },
          error: n,
        } = r;
        return n
          ? this._returnResult({ data: null, error: n })
          : s
            ? await k(
                this.fetch,
                "GET",
                `${this.url}/oauth/authorizations/${e}`,
                {
                  headers: this.headers,
                  jwt: s.access_token,
                  xform: (i) => ({ data: i, error: null }),
                },
              )
            : this._returnResult({ data: null, error: new D() });
      });
    } catch (r) {
      if (x(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async _approveAuthorization(e, r) {
    try {
      return await this._useSession(async (s) => {
        const {
          data: { session: n },
          error: i,
        } = s;
        if (i) return this._returnResult({ data: null, error: i });
        if (!n) return this._returnResult({ data: null, error: new D() });
        const a = await k(
          this.fetch,
          "POST",
          `${this.url}/oauth/authorizations/${e}/consent`,
          {
            headers: this.headers,
            jwt: n.access_token,
            body: { action: "approve" },
            xform: (o) => ({ data: o, error: null }),
          },
        );
        return (
          a.data &&
            a.data.redirect_url &&
            F() &&
            !r?.skipBrowserRedirect &&
            window.location.assign(a.data.redirect_url),
          a
        );
      });
    } catch (s) {
      if (x(s)) return this._returnResult({ data: null, error: s });
      throw s;
    }
  }
  async _denyAuthorization(e, r) {
    try {
      return await this._useSession(async (s) => {
        const {
          data: { session: n },
          error: i,
        } = s;
        if (i) return this._returnResult({ data: null, error: i });
        if (!n) return this._returnResult({ data: null, error: new D() });
        const a = await k(
          this.fetch,
          "POST",
          `${this.url}/oauth/authorizations/${e}/consent`,
          {
            headers: this.headers,
            jwt: n.access_token,
            body: { action: "deny" },
            xform: (o) => ({ data: o, error: null }),
          },
        );
        return (
          a.data &&
            a.data.redirect_url &&
            F() &&
            !r?.skipBrowserRedirect &&
            window.location.assign(a.data.redirect_url),
          a
        );
      });
    } catch (s) {
      if (x(s)) return this._returnResult({ data: null, error: s });
      throw s;
    }
  }
  async _listOAuthGrants() {
    try {
      return await this._useSession(async (e) => {
        const {
          data: { session: r },
          error: s,
        } = e;
        return s
          ? this._returnResult({ data: null, error: s })
          : r
            ? await k(this.fetch, "GET", `${this.url}/user/oauth/grants`, {
                headers: this.headers,
                jwt: r.access_token,
                xform: (n) => ({ data: n, error: null }),
              })
            : this._returnResult({ data: null, error: new D() });
      });
    } catch (e) {
      if (x(e)) return this._returnResult({ data: null, error: e });
      throw e;
    }
  }
  async _revokeOAuthGrant(e) {
    try {
      return await this._useSession(async (r) => {
        const {
          data: { session: s },
          error: n,
        } = r;
        return n
          ? this._returnResult({ data: null, error: n })
          : s
            ? (await k(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, {
                headers: this.headers,
                jwt: s.access_token,
                query: { client_id: e.clientId },
                noResolveJson: !0,
              }),
              { data: {}, error: null })
            : this._returnResult({ data: null, error: new D() });
      });
    } catch (r) {
      if (x(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async fetchJwk(e, r = { keys: [] }) {
    let s = r.keys.find((o) => o.kid === e);
    if (s) return s;
    const n = Date.now();
    if (
      ((s = this.jwks.keys.find((o) => o.kid === e)),
      s && this.jwks_cached_at + Qn > n)
    )
      return s;
    const { data: i, error: a } = await k(
      this.fetch,
      "GET",
      `${this.url}/.well-known/jwks.json`,
      { headers: this.headers },
    );
    if (a) throw a;
    return !i.keys ||
      i.keys.length === 0 ||
      ((this.jwks = i),
      (this.jwks_cached_at = n),
      (s = i.keys.find((o) => o.kid === e)),
      !s)
      ? null
      : s;
  }
  async getClaims(e, r = {}) {
    try {
      let s = e;
      if (!s) {
        const { data: p, error: g } = await this.getSession();
        if (g || !p.session)
          return this._returnResult({ data: null, error: g });
        s = p.session.access_token;
      }
      const {
        header: n,
        payload: i,
        signature: a,
        raw: { header: o, payload: l },
      } = Ge(s);
      r?.allowExpired || _i(i.exp);
      const c =
        !n.alg ||
        n.alg.startsWith("HS") ||
        !n.kid ||
        !("crypto" in globalThis && "subtle" in globalThis.crypto)
          ? null
          : await this.fetchJwk(n.kid, r?.keys ? { keys: r.keys } : r?.jwks);
      if (!c) {
        const { error: p } = await this.getUser(s);
        if (p) throw p;
        return { data: { claims: i, header: n, signature: a }, error: null };
      }
      const h = xi(n.alg),
        u = await crypto.subtle.importKey("jwk", c, h, !0, ["verify"]);
      if (!(await crypto.subtle.verify(h, u, a, li(`${o}.${l}`))))
        throw new jt("Invalid JWT signature");
      return { data: { claims: i, header: n, signature: a }, error: null };
    } catch (s) {
      if (x(s)) return this._returnResult({ data: null, error: s });
      throw s;
    }
  }
  async signInWithPasskey(e) {
    var r, s, n;
    V(this.experimental);
    try {
      if (!Qe())
        return this._returnResult({
          data: null,
          error: new K("Browser does not support WebAuthn", null),
        });
      const { data: i, error: a } = await this._startPasskeyAuthentication({
        options: {
          captchaToken:
            (r = e?.options) === null || r === void 0 ? void 0 : r.captchaToken,
        },
      });
      if (a || !i) return this._returnResult({ data: null, error: a });
      const o = lr(i.options),
        l =
          (n =
            (s = e?.options) === null || s === void 0 ? void 0 : s.signal) !==
            null && n !== void 0
            ? n
            : Ct.createNewAbortSignal(),
        { data: c, error: h } = await ls({ publicKey: o, signal: l });
      if (h || !c)
        return this._returnResult({
          data: null,
          error: h ?? new K("WebAuthn ceremony failed", null),
        });
      const u = hr(c);
      return this._verifyPasskeyAuthentication({
        challengeId: i.challenge_id,
        credential: u,
      });
    } catch (i) {
      if (x(i)) return this._returnResult({ data: null, error: i });
      throw i;
    }
  }
  async registerPasskey(e) {
    var r, s;
    V(this.experimental);
    try {
      if (!Qe())
        return this._returnResult({
          data: null,
          error: new K("Browser does not support WebAuthn", null),
        });
      const { data: n, error: i } = await this._startPasskeyRegistration();
      if (i || !n) return this._returnResult({ data: null, error: i });
      const a = or(n.options),
        o =
          (s =
            (r = e?.options) === null || r === void 0 ? void 0 : r.signal) !==
            null && s !== void 0
            ? s
            : Ct.createNewAbortSignal(),
        { data: l, error: c } = await os({ publicKey: a, signal: o });
      if (c || !l)
        return this._returnResult({
          data: null,
          error: c ?? new K("WebAuthn ceremony failed", null),
        });
      const h = cr(l);
      return this._verifyPasskeyRegistration({
        challengeId: n.challenge_id,
        credential: h,
      });
    } catch (n) {
      if (x(n)) return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async _startPasskeyRegistration() {
    V(this.experimental);
    try {
      return await this._useSession(async (e) => {
        const {
          data: { session: r },
          error: s,
        } = e;
        if (s) return this._returnResult({ data: null, error: s });
        if (!r) return this._returnResult({ data: null, error: new D() });
        const { data: n, error: i } = await k(
          this.fetch,
          "POST",
          `${this.url}/passkeys/registration/options`,
          { headers: this.headers, jwt: r.access_token, body: {} },
        );
        return i
          ? this._returnResult({ data: null, error: i })
          : this._returnResult({ data: n, error: null });
      });
    } catch (e) {
      if (x(e)) return this._returnResult({ data: null, error: e });
      throw e;
    }
  }
  async _verifyPasskeyRegistration(e) {
    V(this.experimental);
    try {
      return await this._useSession(async (r) => {
        const {
          data: { session: s },
          error: n,
        } = r;
        if (n) return this._returnResult({ data: null, error: n });
        if (!s) return this._returnResult({ data: null, error: new D() });
        const { data: i, error: a } = await k(
          this.fetch,
          "POST",
          `${this.url}/passkeys/registration/verify`,
          {
            headers: this.headers,
            jwt: s.access_token,
            body: { challenge_id: e.challengeId, credential: e.credential },
          },
        );
        return a
          ? this._returnResult({ data: null, error: a })
          : this._returnResult({ data: i, error: null });
      });
    } catch (r) {
      if (x(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async _startPasskeyAuthentication(e) {
    var r;
    V(this.experimental);
    try {
      const { data: s, error: n } = await k(
        this.fetch,
        "POST",
        `${this.url}/passkeys/authentication/options`,
        {
          headers: this.headers,
          body: {
            gotrue_meta_security: {
              captcha_token:
                (r = e?.options) === null || r === void 0
                  ? void 0
                  : r.captchaToken,
            },
          },
        },
      );
      return n
        ? this._returnResult({ data: null, error: n })
        : this._returnResult({ data: s, error: null });
    } catch (s) {
      if (x(s)) return this._returnResult({ data: null, error: s });
      throw s;
    }
  }
  async _verifyPasskeyAuthentication(e) {
    V(this.experimental);
    try {
      const { data: r, error: s } = await k(
        this.fetch,
        "POST",
        `${this.url}/passkeys/authentication/verify`,
        {
          headers: this.headers,
          body: { challenge_id: e.challengeId, credential: e.credential },
          xform: H,
        },
      );
      return s
        ? this._returnResult({ data: null, error: s })
        : (r.session &&
            (await this._saveSession(r.session),
            await this._notifyAllSubscribers("SIGNED_IN", r.session)),
          this._returnResult({ data: r, error: null }));
    } catch (r) {
      if (x(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async _listPasskeys() {
    V(this.experimental);
    try {
      return await this._useSession(async (e) => {
        const {
          data: { session: r },
          error: s,
        } = e;
        if (s) return this._returnResult({ data: null, error: s });
        if (!r) return this._returnResult({ data: null, error: new D() });
        const { data: n, error: i } = await k(
          this.fetch,
          "GET",
          `${this.url}/passkeys`,
          {
            headers: this.headers,
            jwt: r.access_token,
            xform: (a) => ({ data: a, error: null }),
          },
        );
        return i
          ? this._returnResult({ data: null, error: i })
          : this._returnResult({ data: n, error: null });
      });
    } catch (e) {
      if (x(e)) return this._returnResult({ data: null, error: e });
      throw e;
    }
  }
  async _updatePasskey(e) {
    V(this.experimental);
    try {
      return await this._useSession(async (r) => {
        const {
          data: { session: s },
          error: n,
        } = r;
        if (n) return this._returnResult({ data: null, error: n });
        if (!s) return this._returnResult({ data: null, error: new D() });
        const { data: i, error: a } = await k(
          this.fetch,
          "PATCH",
          `${this.url}/passkeys/${e.passkeyId}`,
          {
            headers: this.headers,
            jwt: s.access_token,
            body: { friendly_name: e.friendlyName },
          },
        );
        return a
          ? this._returnResult({ data: null, error: a })
          : this._returnResult({ data: i, error: null });
      });
    } catch (r) {
      if (x(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async _deletePasskey(e) {
    V(this.experimental);
    try {
      return await this._useSession(async (r) => {
        const {
          data: { session: s },
          error: n,
        } = r;
        if (n) return this._returnResult({ data: null, error: n });
        if (!s) return this._returnResult({ data: null, error: new D() });
        const { error: i } = await k(
          this.fetch,
          "DELETE",
          `${this.url}/passkeys/${e.passkeyId}`,
          { headers: this.headers, jwt: s.access_token, noResolveJson: !0 },
        );
        return i
          ? this._returnResult({ data: null, error: i })
          : this._returnResult({ data: null, error: null });
      });
    } catch (r) {
      if (x(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
}
Ue.nextInstanceID = {};
const Vi = Ue,
  Gi = "2.106.2";
let Re = "";
typeof Deno < "u"
  ? (Re = "deno")
  : typeof document < "u"
    ? (Re = "web")
    : typeof navigator < "u" && navigator.product === "ReactNative"
      ? (Re = "react-native")
      : (Re = "node");
const Ki = { "X-Client-Info": `supabase-js-${Re}/${Gi}` },
  Ji = { headers: Ki },
  Xi = { schema: "public" },
  Yi = {
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0,
    flowType: "implicit",
  },
  Zi = {},
  Qi = { enabled: !1, respectSamplingDecision: !0 };
function ea(t, e, r, s) {
  function n(i) {
    return i instanceof r
      ? i
      : new r(function (a) {
          a(i);
        });
  }
  return new (r || (r = Promise))(function (i, a) {
    function o(h) {
      try {
        c(s.next(h));
      } catch (u) {
        a(u);
      }
    }
    function l(h) {
      try {
        c(s.throw(h));
      } catch (u) {
        a(u);
      }
    }
    function c(h) {
      h.done ? i(h.value) : n(h.value).then(o, l);
    }
    c((s = s.apply(t, [])).next());
  });
}
let dt = null;
const ta = "@opentelemetry/api";
function ra() {
  return (dt === null && (dt = import(ta).catch(() => null)), dt);
}
function sa() {
  return ea(this, void 0, void 0, function* () {
    try {
      const t = yield ra();
      if (!t || !t.propagation || !t.context) return null;
      const e = {};
      t.propagation.inject(t.context.active(), e);
      const r = e.traceparent;
      return r
        ? { traceparent: r, tracestate: e.tracestate, baggage: e.baggage }
        : null;
    } catch {
      return null;
    }
  });
}
function na(t) {
  if (!t || typeof t != "string") return null;
  const e = t.split("-");
  if (e.length !== 4) return null;
  const [r, s, n, i] = e;
  if (r.length !== 2 || s.length !== 32 || n.length !== 16 || i.length !== 2)
    return null;
  const a = /^[0-9a-f]+$/i;
  return !a.test(r) ||
    !a.test(s) ||
    !a.test(n) ||
    !a.test(i) ||
    s === "00000000000000000000000000000000" ||
    n === "0000000000000000"
    ? null
    : {
        version: r,
        traceId: s,
        parentId: n,
        traceFlags: i,
        isSampled: (parseInt(i, 16) & 1) === 1,
      };
}
function ia(t, e) {
  if (!t || !e || e.length === 0) return !1;
  let r;
  if (t instanceof URL) r = t;
  else
    try {
      r = new URL(t);
    } catch {
      return !1;
    }
  for (const s of e)
    try {
      if (typeof s == "string") {
        if (aa(r.hostname, s)) return !0;
      } else if (s instanceof RegExp) {
        if (s.test(r.hostname)) return !0;
      } else if (typeof s == "function" && s(r)) return !0;
    } catch {
      continue;
    }
  return !1;
}
function aa(t, e) {
  if (e === t) return !0;
  if (e.startsWith("*.")) {
    const r = e.slice(2);
    if (t.endsWith(r) && (t === r || t.endsWith("." + r))) return !0;
  }
  return !1;
}
function oa(t) {
  const e = [];
  try {
    const r = new URL(t);
    e.push(r.hostname);
  } catch {}
  return (
    e.push("*.supabase.co", "*.supabase.in"),
    e.push("localhost", "127.0.0.1", "[::1]"),
    e
  );
}
function De(t) {
  "@babel/helpers - typeof";
  return (
    (De =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    De(t)
  );
}
function la(t, e) {
  if (De(t) != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var s = r.call(t, e);
    if (De(s) != "object") return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function ca(t) {
  var e = la(t, "string");
  return De(e) == "symbol" ? e : e + "";
}
function ha(t, e, r) {
  return (
    (e = ca(e)) in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = r),
    t
  );
}
function dr(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    (e &&
      (s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      })),
      r.push.apply(r, s));
  }
  return r;
}
function I(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? dr(Object(r), !0).forEach(function (s) {
          ha(t, s, r[s]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
        : dr(Object(r)).forEach(function (s) {
            Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(r, s));
          });
  }
  return t;
}
const ua = (t) => (t ? (...e) => t(...e) : (...e) => fetch(...e)),
  da = () => Headers,
  fa = (t, e, r, s, n) => {
    const i = ua(s),
      a = da(),
      o = n?.enabled === !0,
      l = n?.respectSamplingDecision !== !1,
      c = o ? oa(e) : null;
    return async (h, u) => {
      var f;
      const p = (f = await r()) !== null && f !== void 0 ? f : t;
      let g = new a(u?.headers);
      if (
        (g.has("apikey") || g.set("apikey", t),
        g.has("Authorization") || g.set("Authorization", `Bearer ${p}`),
        c)
      ) {
        const m = await pa(h, c, l);
        m &&
          (m.traceparent &&
            !g.has("traceparent") &&
            g.set("traceparent", m.traceparent),
          m.tracestate &&
            !g.has("tracestate") &&
            g.set("tracestate", m.tracestate),
          m.baggage && !g.has("baggage") && g.set("baggage", m.baggage));
      }
      return i(h, I(I({}, u), {}, { headers: g }));
    };
  };
async function pa(t, e, r) {
  if (!ia(typeof t == "string" || t instanceof URL ? t : t.url, e)) return null;
  const s = await sa();
  if (!s || !s.traceparent) return null;
  if (r) {
    const n = na(s.traceparent);
    if (n && !n.isSampled) return null;
  }
  return s;
}
function fr(t) {
  return typeof t == "boolean" ? { enabled: t } : t;
}
function ga(t) {
  return t.endsWith("/") ? t : t + "/";
}
function ma(t, e) {
  var r, s, n, i, a, o;
  const { db: l, auth: c, realtime: h, global: u } = t,
    { db: f, auth: p, realtime: g, global: m } = e,
    v = fr(t.tracePropagation),
    y = fr(e.tracePropagation),
    w = {
      db: I(I({}, f), l),
      auth: I(I({}, p), c),
      realtime: I(I({}, g), h),
      storage: {},
      global: I(
        I(I({}, m), u),
        {},
        {
          headers: I(
            I({}, (r = m?.headers) !== null && r !== void 0 ? r : {}),
            (s = u?.headers) !== null && s !== void 0 ? s : {},
          ),
        },
      ),
      tracePropagation: {
        enabled:
          (n = (i = v?.enabled) !== null && i !== void 0 ? i : y?.enabled) !==
            null && n !== void 0
            ? n
            : !1,
        respectSamplingDecision:
          (a =
            (o = v?.respectSamplingDecision) !== null && o !== void 0
              ? o
              : y?.respectSamplingDecision) !== null && a !== void 0
            ? a
            : !0,
      },
      accessToken: async () => "",
    };
  return (
    t.accessToken ? (w.accessToken = t.accessToken) : delete w.accessToken,
    w
  );
}
function ya(t) {
  const e = t?.trim();
  if (!e) throw new Error("supabaseUrl is required.");
  if (!e.match(/^https?:\/\//i))
    throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
  try {
    return new URL(ga(e));
  } catch {
    throw Error("Invalid supabaseUrl: Provided URL is malformed.");
  }
}
var va = class extends Vi {
    constructor(t) {
      super(t);
    }
  },
  ba = class {
    constructor(t, e, r) {
      var s, n;
      ((this.supabaseUrl = t), (this.supabaseKey = e));
      const i = ya(t);
      if (!e) throw new Error("supabaseKey is required.");
      ((this.realtimeUrl = new URL("realtime/v1", i)),
        (this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace(
          "http",
          "ws",
        )),
        (this.authUrl = new URL("auth/v1", i)),
        (this.storageUrl = new URL("storage/v1", i)),
        (this.functionsUrl = new URL("functions/v1", i)));
      const a = `sb-${i.hostname.split(".")[0]}-auth-token`,
        o = {
          db: Xi,
          realtime: Zi,
          auth: I(I({}, Yi), {}, { storageKey: a }),
          global: Ji,
          tracePropagation: Qi,
        },
        l = ma(r ?? {}, o);
      if (
        ((this.settings = l),
        (this.storageKey =
          (s = l.auth.storageKey) !== null && s !== void 0 ? s : ""),
        (this.headers =
          (n = l.global.headers) !== null && n !== void 0 ? n : {}),
        l.accessToken)
      )
        ((this.accessToken = l.accessToken),
          (this.auth = new Proxy(
            {},
            {
              get: (h, u) => {
                throw new Error(
                  `@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`,
                );
              },
            },
          )));
      else {
        var c;
        this.auth = this._initSupabaseAuthClient(
          (c = l.auth) !== null && c !== void 0 ? c : {},
          this.headers,
          l.global.fetch,
        );
      }
      ((this.fetch = fa(
        e,
        t,
        this._getAccessToken.bind(this),
        l.global.fetch,
        l.tracePropagation,
      )),
        (this.realtime = this._initRealtimeClient(
          I(
            {
              headers: this.headers,
              accessToken: this._getAccessToken.bind(this),
              fetch: this.fetch,
            },
            l.realtime,
          ),
        )),
        this.accessToken &&
          Promise.resolve(this.accessToken())
            .then((h) => this.realtime.setAuth(h))
            .catch((h) =>
              console.warn("Failed to set initial Realtime auth token:", h),
            ),
        (this.rest = new $s(new URL("rest/v1", i).href, {
          headers: this.headers,
          schema: l.db.schema,
          fetch: this.fetch,
          timeout: l.db.timeout,
          urlLengthLimit: l.db.urlLengthLimit,
        })),
        (this.storage = new Kn(
          this.storageUrl.href,
          this.headers,
          this.fetch,
          r?.storage,
        )),
        l.accessToken || this._listenForAuthEvents());
    }
    get functions() {
      return new ks(this.functionsUrl.href, {
        headers: this.headers,
        customFetch: this.fetch,
      });
    }
    from(t) {
      return this.rest.from(t);
    }
    schema(t) {
      return this.rest.schema(t);
    }
    rpc(t, e = {}, r = { head: !1, get: !1, count: void 0 }) {
      return this.rest.rpc(t, e, r);
    }
    channel(t, e = { config: {} }) {
      return this.realtime.channel(t, e);
    }
    getChannels() {
      return this.realtime.getChannels();
    }
    removeChannel(t) {
      return this.realtime.removeChannel(t);
    }
    removeAllChannels() {
      return this.realtime.removeAllChannels();
    }
    async _getAccessToken() {
      var t = this,
        e,
        r;
      if (t.accessToken) return await t.accessToken();
      const { data: s } = await t.auth.getSession();
      return (e =
        (r = s.session) === null || r === void 0 ? void 0 : r.access_token) !==
        null && e !== void 0
        ? e
        : t.supabaseKey;
    }
    _initSupabaseAuthClient(
      {
        autoRefreshToken: t,
        persistSession: e,
        detectSessionInUrl: r,
        storage: s,
        userStorage: n,
        storageKey: i,
        flowType: a,
        lock: o,
        debug: l,
        throwOnError: c,
        experimental: h,
        lockAcquireTimeout: u,
        skipAutoInitialize: f,
      },
      p,
      g,
    ) {
      const m = {
        Authorization: `Bearer ${this.supabaseKey}`,
        apikey: `${this.supabaseKey}`,
      };
      return new va({
        url: this.authUrl.href,
        headers: I(I({}, m), p),
        storageKey: i,
        autoRefreshToken: t,
        persistSession: e,
        detectSessionInUrl: r,
        storage: s,
        userStorage: n,
        flowType: a,
        lock: o,
        debug: l,
        throwOnError: c,
        experimental: h,
        fetch: g,
        lockAcquireTimeout: u,
        skipAutoInitialize: f,
        hasCustomAuthorizationHeader: Object.keys(this.headers).some(
          (v) => v.toLowerCase() === "authorization",
        ),
      });
    }
    _initRealtimeClient(t) {
      return new yn(
        this.realtimeUrl.href,
        I(
          I({}, t),
          {},
          { params: I(I({}, { apikey: this.supabaseKey }), t?.params) },
        ),
      );
    }
    _listenForAuthEvents() {
      return this.auth.onAuthStateChange((t, e) => {
        this._handleTokenChanged(t, "CLIENT", e?.access_token);
      });
    }
    _handleTokenChanged(t, e, r) {
      (t === "TOKEN_REFRESHED" || t === "SIGNED_IN") &&
      this.changedAccessToken !== r
        ? ((this.changedAccessToken = r), this.realtime.setAuth(r))
        : t === "SIGNED_OUT" &&
          (this.realtime.setAuth(),
          e == "STORAGE" && this.auth.signOut(),
          (this.changedAccessToken = void 0));
    }
  };
const wa = (t, e, r) => new ba(t, e, r);
function _a() {
  if (typeof window < "u") return !1;
  const t = globalThis.process;
  if (!t) return !1;
  const e = t.version;
  if (e == null) return !1;
  const r = e.match(/^v(\d+)\./);
  return r ? parseInt(r[1], 10) <= 18 : !1;
}
_a() &&
  console.warn(
    "⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217",
  );
const ft = "https://llkdpfnenxkdqzfphkmq.supabase.co",
  pr = "sb_publishable_KNson4gLIyzASrPNvBxmZw_JRpkBO8J",
  gr =
    typeof window < "u" && ft && pr && !ft.includes("dummy")
      ? wa(ft, pr)
      : null;
function Pe(t) {
  let e = t[0],
    r = t[1],
    s = t[2];
  return Math.sqrt(e * e + r * r + s * s);
}
function Ot(t, e) {
  return ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), t);
}
function xa(t, e, r, s) {
  return ((t[0] = e), (t[1] = r), (t[2] = s), t);
}
function mr(t, e, r) {
  return ((t[0] = e[0] + r[0]), (t[1] = e[1] + r[1]), (t[2] = e[2] + r[2]), t);
}
function yr(t, e, r) {
  return ((t[0] = e[0] - r[0]), (t[1] = e[1] - r[1]), (t[2] = e[2] - r[2]), t);
}
function Sa(t, e, r) {
  return ((t[0] = e[0] * r[0]), (t[1] = e[1] * r[1]), (t[2] = e[2] * r[2]), t);
}
function ka(t, e, r) {
  return ((t[0] = e[0] / r[0]), (t[1] = e[1] / r[1]), (t[2] = e[2] / r[2]), t);
}
function pt(t, e, r) {
  return ((t[0] = e[0] * r), (t[1] = e[1] * r), (t[2] = e[2] * r), t);
}
function Ea(t, e) {
  let r = e[0] - t[0],
    s = e[1] - t[1],
    n = e[2] - t[2];
  return Math.sqrt(r * r + s * s + n * n);
}
function Ta(t, e) {
  let r = e[0] - t[0],
    s = e[1] - t[1],
    n = e[2] - t[2];
  return r * r + s * s + n * n;
}
function vr(t) {
  let e = t[0],
    r = t[1],
    s = t[2];
  return e * e + r * r + s * s;
}
function Aa(t, e) {
  return ((t[0] = -e[0]), (t[1] = -e[1]), (t[2] = -e[2]), t);
}
function Ra(t, e) {
  return ((t[0] = 1 / e[0]), (t[1] = 1 / e[1]), (t[2] = 1 / e[2]), t);
}
function Pt(t, e) {
  let r = e[0],
    s = e[1],
    n = e[2],
    i = r * r + s * s + n * n;
  return (
    i > 0 && (i = 1 / Math.sqrt(i)),
    (t[0] = e[0] * i),
    (t[1] = e[1] * i),
    (t[2] = e[2] * i),
    t
  );
}
function cs(t, e) {
  return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
}
function br(t, e, r) {
  let s = e[0],
    n = e[1],
    i = e[2],
    a = r[0],
    o = r[1],
    l = r[2];
  return (
    (t[0] = n * l - i * o),
    (t[1] = i * a - s * l),
    (t[2] = s * o - n * a),
    t
  );
}
function ja(t, e, r, s) {
  let n = e[0],
    i = e[1],
    a = e[2];
  return (
    (t[0] = n + s * (r[0] - n)),
    (t[1] = i + s * (r[1] - i)),
    (t[2] = a + s * (r[2] - a)),
    t
  );
}
function Ca(t, e, r, s, n) {
  const i = Math.exp(-s * n);
  let a = e[0],
    o = e[1],
    l = e[2];
  return (
    (t[0] = r[0] + (a - r[0]) * i),
    (t[1] = r[1] + (o - r[1]) * i),
    (t[2] = r[2] + (l - r[2]) * i),
    t
  );
}
function Oa(t, e, r) {
  let s = e[0],
    n = e[1],
    i = e[2],
    a = r[3] * s + r[7] * n + r[11] * i + r[15];
  return (
    (a = a || 1),
    (t[0] = (r[0] * s + r[4] * n + r[8] * i + r[12]) / a),
    (t[1] = (r[1] * s + r[5] * n + r[9] * i + r[13]) / a),
    (t[2] = (r[2] * s + r[6] * n + r[10] * i + r[14]) / a),
    t
  );
}
function Pa(t, e, r) {
  let s = e[0],
    n = e[1],
    i = e[2],
    a = r[3] * s + r[7] * n + r[11] * i + r[15];
  return (
    (a = a || 1),
    (t[0] = (r[0] * s + r[4] * n + r[8] * i) / a),
    (t[1] = (r[1] * s + r[5] * n + r[9] * i) / a),
    (t[2] = (r[2] * s + r[6] * n + r[10] * i) / a),
    t
  );
}
function Ia(t, e, r) {
  let s = e[0],
    n = e[1],
    i = e[2];
  return (
    (t[0] = s * r[0] + n * r[3] + i * r[6]),
    (t[1] = s * r[1] + n * r[4] + i * r[7]),
    (t[2] = s * r[2] + n * r[5] + i * r[8]),
    t
  );
}
function $a(t, e, r) {
  let s = e[0],
    n = e[1],
    i = e[2],
    a = r[0],
    o = r[1],
    l = r[2],
    c = r[3],
    h = o * i - l * n,
    u = l * s - a * i,
    f = a * n - o * s,
    p = o * f - l * u,
    g = l * h - a * f,
    m = a * u - o * h,
    v = c * 2;
  return (
    (h *= v),
    (u *= v),
    (f *= v),
    (p *= 2),
    (g *= 2),
    (m *= 2),
    (t[0] = s + h + p),
    (t[1] = n + u + g),
    (t[2] = i + f + m),
    t
  );
}
const La = (function () {
  const t = [0, 0, 0],
    e = [0, 0, 0];
  return function (r, s) {
    (Ot(t, r), Ot(e, s), Pt(t, t), Pt(e, e));
    let n = cs(t, e);
    return n > 1 ? 0 : n < -1 ? Math.PI : Math.acos(n);
  };
})();
function Na(t, e) {
  return t[0] === e[0] && t[1] === e[1] && t[2] === e[2];
}
class J extends Array {
  constructor(e = 0, r = e, s = e) {
    return (super(e, r, s), this);
  }
  get x() {
    return this[0];
  }
  get y() {
    return this[1];
  }
  get z() {
    return this[2];
  }
  set x(e) {
    this[0] = e;
  }
  set y(e) {
    this[1] = e;
  }
  set z(e) {
    this[2] = e;
  }
  set(e, r = e, s = e) {
    return e.length ? this.copy(e) : (xa(this, e, r, s), this);
  }
  copy(e) {
    return (Ot(this, e), this);
  }
  add(e, r) {
    return (r ? mr(this, e, r) : mr(this, this, e), this);
  }
  sub(e, r) {
    return (r ? yr(this, e, r) : yr(this, this, e), this);
  }
  multiply(e) {
    return (e.length ? Sa(this, this, e) : pt(this, this, e), this);
  }
  divide(e) {
    return (e.length ? ka(this, this, e) : pt(this, this, 1 / e), this);
  }
  inverse(e = this) {
    return (Ra(this, e), this);
  }
  len() {
    return Pe(this);
  }
  distance(e) {
    return e ? Ea(this, e) : Pe(this);
  }
  squaredLen() {
    return vr(this);
  }
  squaredDistance(e) {
    return e ? Ta(this, e) : vr(this);
  }
  negate(e = this) {
    return (Aa(this, e), this);
  }
  cross(e, r) {
    return (r ? br(this, e, r) : br(this, this, e), this);
  }
  scale(e) {
    return (pt(this, this, e), this);
  }
  normalize() {
    return (Pt(this, this), this);
  }
  dot(e) {
    return cs(this, e);
  }
  equals(e) {
    return Na(this, e);
  }
  applyMatrix3(e) {
    return (Ia(this, this, e), this);
  }
  applyMatrix4(e) {
    return (Oa(this, this, e), this);
  }
  scaleRotateMatrix4(e) {
    return (Pa(this, this, e), this);
  }
  applyQuaternion(e) {
    return ($a(this, this, e), this);
  }
  angle(e) {
    return La(this, e);
  }
  lerp(e, r) {
    return (ja(this, this, e, r), this);
  }
  smoothLerp(e, r, s) {
    return (Ca(this, this, e, r, s), this);
  }
  clone() {
    return new J(this[0], this[1], this[2]);
  }
  fromArray(e, r = 0) {
    return ((this[0] = e[r]), (this[1] = e[r + 1]), (this[2] = e[r + 2]), this);
  }
  toArray(e = [], r = 0) {
    return ((e[r] = this[0]), (e[r + 1] = this[1]), (e[r + 2] = this[2]), e);
  }
  transformDirection(e) {
    const r = this[0],
      s = this[1],
      n = this[2];
    return (
      (this[0] = e[0] * r + e[4] * s + e[8] * n),
      (this[1] = e[1] * r + e[5] * s + e[9] * n),
      (this[2] = e[2] * r + e[6] * s + e[10] * n),
      this.normalize()
    );
  }
}
const wr = new J();
let Ua = 1,
  Da = 1,
  _r = !1;
class Ma {
  constructor(e, r = {}) {
    (e.canvas || console.error("gl not passed as first argument to Geometry"),
      (this.gl = e),
      (this.attributes = r),
      (this.id = Ua++),
      (this.VAOs = {}),
      (this.drawRange = { start: 0, count: 0 }),
      (this.instancedCount = 0),
      this.gl.renderer.bindVertexArray(null),
      (this.gl.renderer.currentGeometry = null),
      (this.glState = this.gl.renderer.state));
    for (let s in r) this.addAttribute(s, r[s]);
  }
  addAttribute(e, r) {
    if (
      ((this.attributes[e] = r),
      (r.id = Da++),
      (r.size = r.size || 1),
      (r.type =
        r.type ||
        (r.data.constructor === Float32Array
          ? this.gl.FLOAT
          : r.data.constructor === Uint16Array
            ? this.gl.UNSIGNED_SHORT
            : this.gl.UNSIGNED_INT)),
      (r.target =
        e === "index" ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER),
      (r.normalized = r.normalized || !1),
      (r.stride = r.stride || 0),
      (r.offset = r.offset || 0),
      (r.count =
        r.count ||
        (r.stride ? r.data.byteLength / r.stride : r.data.length / r.size)),
      (r.divisor = r.instanced || 0),
      (r.needsUpdate = !1),
      (r.usage = r.usage || this.gl.STATIC_DRAW),
      r.buffer || this.updateAttribute(r),
      r.divisor)
    ) {
      if (
        ((this.isInstanced = !0),
        this.instancedCount && this.instancedCount !== r.count * r.divisor)
      )
        return (
          console.warn(
            "geometry has multiple instanced buffers of different length",
          ),
          (this.instancedCount = Math.min(
            this.instancedCount,
            r.count * r.divisor,
          ))
        );
      this.instancedCount = r.count * r.divisor;
    } else
      e === "index"
        ? (this.drawRange.count = r.count)
        : this.attributes.index ||
          (this.drawRange.count = Math.max(this.drawRange.count, r.count));
  }
  updateAttribute(e) {
    const r = !e.buffer;
    (r && (e.buffer = this.gl.createBuffer()),
      this.glState.boundBuffer !== e.buffer &&
        (this.gl.bindBuffer(e.target, e.buffer),
        (this.glState.boundBuffer = e.buffer)),
      r
        ? this.gl.bufferData(e.target, e.data, e.usage)
        : this.gl.bufferSubData(e.target, 0, e.data),
      (e.needsUpdate = !1));
  }
  setIndex(e) {
    this.addAttribute("index", e);
  }
  setDrawRange(e, r) {
    ((this.drawRange.start = e), (this.drawRange.count = r));
  }
  setInstancedCount(e) {
    this.instancedCount = e;
  }
  createVAO(e) {
    ((this.VAOs[e.attributeOrder] = this.gl.renderer.createVertexArray()),
      this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]),
      this.bindAttributes(e));
  }
  bindAttributes(e) {
    (e.attributeLocations.forEach((r, { name: s, type: n }) => {
      if (!this.attributes[s]) {
        console.warn(`active attribute ${s} not being supplied`);
        return;
      }
      const i = this.attributes[s];
      (this.gl.bindBuffer(i.target, i.buffer),
        (this.glState.boundBuffer = i.buffer));
      let a = 1;
      (n === 35674 && (a = 2), n === 35675 && (a = 3), n === 35676 && (a = 4));
      const o = i.size / a,
        l = a === 1 ? 0 : a * a * 4,
        c = a === 1 ? 0 : a * 4;
      for (let h = 0; h < a; h++)
        (this.gl.vertexAttribPointer(
          r + h,
          o,
          i.type,
          i.normalized,
          i.stride + l,
          i.offset + h * c,
        ),
          this.gl.enableVertexAttribArray(r + h),
          this.gl.renderer.vertexAttribDivisor(r + h, i.divisor));
    }),
      this.attributes.index &&
        this.gl.bindBuffer(
          this.gl.ELEMENT_ARRAY_BUFFER,
          this.attributes.index.buffer,
        ));
  }
  draw({ program: e, mode: r = this.gl.TRIANGLES }) {
    (this.gl.renderer.currentGeometry !== `${this.id}_${e.attributeOrder}` &&
      (this.VAOs[e.attributeOrder] || this.createVAO(e),
      this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]),
      (this.gl.renderer.currentGeometry = `${this.id}_${e.attributeOrder}`)),
      e.attributeLocations.forEach((n, { name: i }) => {
        const a = this.attributes[i];
        a.needsUpdate && this.updateAttribute(a);
      }));
    let s = 2;
    (this.attributes.index?.type === this.gl.UNSIGNED_INT && (s = 4),
      this.isInstanced
        ? this.attributes.index
          ? this.gl.renderer.drawElementsInstanced(
              r,
              this.drawRange.count,
              this.attributes.index.type,
              this.attributes.index.offset + this.drawRange.start * s,
              this.instancedCount,
            )
          : this.gl.renderer.drawArraysInstanced(
              r,
              this.drawRange.start,
              this.drawRange.count,
              this.instancedCount,
            )
        : this.attributes.index
          ? this.gl.drawElements(
              r,
              this.drawRange.count,
              this.attributes.index.type,
              this.attributes.index.offset + this.drawRange.start * s,
            )
          : this.gl.drawArrays(r, this.drawRange.start, this.drawRange.count));
  }
  getPosition() {
    const e = this.attributes.position;
    if (e.data) return e;
    if (!_r)
      return (
        console.warn("No position buffer data found to compute bounds"),
        (_r = !0)
      );
  }
  computeBoundingBox(e) {
    e || (e = this.getPosition());
    const r = e.data,
      s = e.size;
    this.bounds ||
      (this.bounds = {
        min: new J(),
        max: new J(),
        center: new J(),
        scale: new J(),
        radius: 1 / 0,
      });
    const n = this.bounds.min,
      i = this.bounds.max,
      a = this.bounds.center,
      o = this.bounds.scale;
    (n.set(1 / 0), i.set(-1 / 0));
    for (let l = 0, c = r.length; l < c; l += s) {
      const h = r[l],
        u = r[l + 1],
        f = r[l + 2];
      ((n.x = Math.min(h, n.x)),
        (n.y = Math.min(u, n.y)),
        (n.z = Math.min(f, n.z)),
        (i.x = Math.max(h, i.x)),
        (i.y = Math.max(u, i.y)),
        (i.z = Math.max(f, i.z)));
    }
    (o.sub(i, n), a.add(n, i).divide(2));
  }
  computeBoundingSphere(e) {
    e || (e = this.getPosition());
    const r = e.data,
      s = e.size;
    this.bounds || this.computeBoundingBox(e);
    let n = 0;
    for (let i = 0, a = r.length; i < a; i += s)
      (wr.fromArray(r, i),
        (n = Math.max(n, this.bounds.center.squaredDistance(wr))));
    this.bounds.radius = Math.sqrt(n);
  }
  remove() {
    for (let e in this.VAOs)
      (this.gl.renderer.deleteVertexArray(this.VAOs[e]), delete this.VAOs[e]);
    for (let e in this.attributes)
      (this.gl.deleteBuffer(this.attributes[e].buffer),
        delete this.attributes[e]);
  }
}
let Ba = 1;
const xr = {};
class za {
  constructor(
    e,
    {
      vertex: r,
      fragment: s,
      uniforms: n = {},
      transparent: i = !1,
      cullFace: a = e.BACK,
      frontFace: o = e.CCW,
      depthTest: l = !0,
      depthWrite: c = !0,
      depthFunc: h = e.LEQUAL,
    } = {},
  ) {
    (e.canvas || console.error("gl not passed as first argument to Program"),
      (this.gl = e),
      (this.uniforms = n),
      (this.id = Ba++),
      r || console.warn("vertex shader not supplied"),
      s || console.warn("fragment shader not supplied"),
      (this.transparent = i),
      (this.cullFace = a),
      (this.frontFace = o),
      (this.depthTest = l),
      (this.depthWrite = c),
      (this.depthFunc = h),
      (this.blendFunc = {}),
      (this.blendEquation = {}),
      (this.stencilFunc = {}),
      (this.stencilOp = {}),
      this.transparent &&
        !this.blendFunc.src &&
        (this.gl.renderer.premultipliedAlpha
          ? this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA)
          : this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)),
      (this.vertexShader = e.createShader(e.VERTEX_SHADER)),
      (this.fragmentShader = e.createShader(e.FRAGMENT_SHADER)),
      (this.program = e.createProgram()),
      e.attachShader(this.program, this.vertexShader),
      e.attachShader(this.program, this.fragmentShader),
      this.setShaders({ vertex: r, fragment: s }));
  }
  setShaders({ vertex: e, fragment: r }) {
    if (
      (e &&
        (this.gl.shaderSource(this.vertexShader, e),
        this.gl.compileShader(this.vertexShader),
        this.gl.getShaderInfoLog(this.vertexShader) !== "" &&
          console.warn(`${this.gl.getShaderInfoLog(this.vertexShader)}
Vertex Shader
${Sr(e)}`)),
      r &&
        (this.gl.shaderSource(this.fragmentShader, r),
        this.gl.compileShader(this.fragmentShader),
        this.gl.getShaderInfoLog(this.fragmentShader) !== "" &&
          console.warn(`${this.gl.getShaderInfoLog(this.fragmentShader)}
Fragment Shader
${Sr(r)}`)),
      this.gl.linkProgram(this.program),
      !this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
    )
      return console.warn(this.gl.getProgramInfoLog(this.program));
    this.uniformLocations = new Map();
    let s = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS);
    for (let a = 0; a < s; a++) {
      let o = this.gl.getActiveUniform(this.program, a);
      this.uniformLocations.set(
        o,
        this.gl.getUniformLocation(this.program, o.name),
      );
      const l = o.name.match(/(\w+)/g);
      ((o.uniformName = l[0]), (o.nameComponents = l.slice(1)));
    }
    this.attributeLocations = new Map();
    const n = [],
      i = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES);
    for (let a = 0; a < i; a++) {
      const o = this.gl.getActiveAttrib(this.program, a),
        l = this.gl.getAttribLocation(this.program, o.name);
      l !== -1 && ((n[l] = o.name), this.attributeLocations.set(o, l));
    }
    this.attributeOrder = n.join("");
  }
  setBlendFunc(e, r, s, n) {
    ((this.blendFunc.src = e),
      (this.blendFunc.dst = r),
      (this.blendFunc.srcAlpha = s),
      (this.blendFunc.dstAlpha = n),
      e && (this.transparent = !0));
  }
  setBlendEquation(e, r) {
    ((this.blendEquation.modeRGB = e), (this.blendEquation.modeAlpha = r));
  }
  setStencilFunc(e, r, s) {
    ((this.stencilRef = r),
      (this.stencilFunc.func = e),
      (this.stencilFunc.ref = r),
      (this.stencilFunc.mask = s));
  }
  setStencilOp(e, r, s) {
    ((this.stencilOp.stencilFail = e),
      (this.stencilOp.depthFail = r),
      (this.stencilOp.depthPass = s));
  }
  applyState() {
    (this.depthTest
      ? this.gl.renderer.enable(this.gl.DEPTH_TEST)
      : this.gl.renderer.disable(this.gl.DEPTH_TEST),
      this.cullFace
        ? this.gl.renderer.enable(this.gl.CULL_FACE)
        : this.gl.renderer.disable(this.gl.CULL_FACE),
      this.blendFunc.src
        ? this.gl.renderer.enable(this.gl.BLEND)
        : this.gl.renderer.disable(this.gl.BLEND),
      this.cullFace && this.gl.renderer.setCullFace(this.cullFace),
      this.gl.renderer.setFrontFace(this.frontFace),
      this.gl.renderer.setDepthMask(this.depthWrite),
      this.gl.renderer.setDepthFunc(this.depthFunc),
      this.blendFunc.src &&
        this.gl.renderer.setBlendFunc(
          this.blendFunc.src,
          this.blendFunc.dst,
          this.blendFunc.srcAlpha,
          this.blendFunc.dstAlpha,
        ),
      this.gl.renderer.setBlendEquation(
        this.blendEquation.modeRGB,
        this.blendEquation.modeAlpha,
      ),
      this.stencilFunc.func || this.stencilOp.stencilFail
        ? this.gl.renderer.enable(this.gl.STENCIL_TEST)
        : this.gl.renderer.disable(this.gl.STENCIL_TEST),
      this.gl.renderer.setStencilFunc(
        this.stencilFunc.func,
        this.stencilFunc.ref,
        this.stencilFunc.mask,
      ),
      this.gl.renderer.setStencilOp(
        this.stencilOp.stencilFail,
        this.stencilOp.depthFail,
        this.stencilOp.depthPass,
      ));
  }
  use({ flipFaces: e = !1 } = {}) {
    let r = -1;
    (this.gl.renderer.state.currentProgram === this.id ||
      (this.gl.useProgram(this.program),
      (this.gl.renderer.state.currentProgram = this.id)),
      this.uniformLocations.forEach((n, i) => {
        let a = this.uniforms[i.uniformName];
        for (const o of i.nameComponents) {
          if (!a) break;
          if (o in a) a = a[o];
          else {
            if (Array.isArray(a.value)) break;
            a = void 0;
            break;
          }
        }
        if (!a) return kr(`Active uniform ${i.name} has not been supplied`);
        if (a && a.value === void 0)
          return kr(`${i.name} uniform is missing a value parameter`);
        if (a.value.texture)
          return ((r = r + 1), a.value.update(r), gt(this.gl, i.type, n, r));
        if (a.value.length && a.value[0].texture) {
          const o = [];
          return (
            a.value.forEach((l) => {
              ((r = r + 1), l.update(r), o.push(r));
            }),
            gt(this.gl, i.type, n, o)
          );
        }
        gt(this.gl, i.type, n, a.value);
      }),
      this.applyState(),
      e &&
        this.gl.renderer.setFrontFace(
          this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW,
        ));
  }
  remove() {
    this.gl.deleteProgram(this.program);
  }
}
function gt(t, e, r, s) {
  s = s.length ? Fa(s) : s;
  const n = t.renderer.state.uniformLocations.get(r);
  if (s.length)
    if (n === void 0 || n.length !== s.length)
      t.renderer.state.uniformLocations.set(r, s.slice(0));
    else {
      if (qa(n, s)) return;
      (n.set ? n.set(s) : Wa(n, s),
        t.renderer.state.uniformLocations.set(r, n));
    }
  else {
    if (n === s) return;
    t.renderer.state.uniformLocations.set(r, s);
  }
  switch (e) {
    case 5126:
      return s.length ? t.uniform1fv(r, s) : t.uniform1f(r, s);
    case 35664:
      return t.uniform2fv(r, s);
    case 35665:
      return t.uniform3fv(r, s);
    case 35666:
      return t.uniform4fv(r, s);
    case 35670:
    case 5124:
    case 35678:
    case 36306:
    case 35680:
    case 36289:
      return s.length ? t.uniform1iv(r, s) : t.uniform1i(r, s);
    case 35671:
    case 35667:
      return t.uniform2iv(r, s);
    case 35672:
    case 35668:
      return t.uniform3iv(r, s);
    case 35673:
    case 35669:
      return t.uniform4iv(r, s);
    case 35674:
      return t.uniformMatrix2fv(r, !1, s);
    case 35675:
      return t.uniformMatrix3fv(r, !1, s);
    case 35676:
      return t.uniformMatrix4fv(r, !1, s);
  }
}
function Sr(t) {
  let e = t.split(`
`);
  for (let r = 0; r < e.length; r++) e[r] = r + 1 + ": " + e[r];
  return e.join(`
`);
}
function Fa(t) {
  const e = t.length,
    r = t[0].length;
  if (r === void 0) return t;
  const s = e * r;
  let n = xr[s];
  n || (xr[s] = n = new Float32Array(s));
  for (let i = 0; i < e; i++) n.set(t[i], i * r);
  return n;
}
function qa(t, e) {
  if (t.length !== e.length) return !1;
  for (let r = 0, s = t.length; r < s; r++) if (t[r] !== e[r]) return !1;
  return !0;
}
function Wa(t, e) {
  for (let r = 0, s = t.length; r < s; r++) t[r] = e[r];
}
let mt = 0;
function kr(t) {
  mt > 100 ||
    (console.warn(t),
    mt++,
    mt > 100 &&
      console.warn("More than 100 program warnings - stopping logs."));
}
const yt = new J();
let Ha = 1;
class Va {
  constructor({
    canvas: e = document.createElement("canvas"),
    width: r = 300,
    height: s = 150,
    dpr: n = 1,
    alpha: i = !1,
    depth: a = !0,
    stencil: o = !1,
    antialias: l = !1,
    premultipliedAlpha: c = !1,
    preserveDrawingBuffer: h = !1,
    powerPreference: u = "default",
    autoClear: f = !0,
    webgl: p = 2,
  } = {}) {
    const g = {
      alpha: i,
      depth: a,
      stencil: o,
      antialias: l,
      premultipliedAlpha: c,
      preserveDrawingBuffer: h,
      powerPreference: u,
    };
    ((this.dpr = n),
      (this.alpha = i),
      (this.color = !0),
      (this.depth = a),
      (this.stencil = o),
      (this.premultipliedAlpha = c),
      (this.autoClear = f),
      (this.id = Ha++),
      p === 2 && (this.gl = e.getContext("webgl2", g)),
      (this.isWebgl2 = !!this.gl),
      this.gl || (this.gl = e.getContext("webgl", g)),
      this.gl || console.error("unable to create webgl context"),
      (this.gl.renderer = this),
      this.setSize(r, s),
      (this.state = {}),
      (this.state.blendFunc = { src: this.gl.ONE, dst: this.gl.ZERO }),
      (this.state.blendEquation = { modeRGB: this.gl.FUNC_ADD }),
      (this.state.cullFace = !1),
      (this.state.frontFace = this.gl.CCW),
      (this.state.depthMask = !0),
      (this.state.depthFunc = this.gl.LEQUAL),
      (this.state.premultiplyAlpha = !1),
      (this.state.flipY = !1),
      (this.state.unpackAlignment = 4),
      (this.state.framebuffer = null),
      (this.state.viewport = { x: 0, y: 0, width: null, height: null }),
      (this.state.textureUnits = []),
      (this.state.activeTextureUnit = 0),
      (this.state.boundBuffer = null),
      (this.state.uniformLocations = new Map()),
      (this.state.currentProgram = null),
      (this.extensions = {}),
      this.isWebgl2
        ? (this.getExtension("EXT_color_buffer_float"),
          this.getExtension("OES_texture_float_linear"))
        : (this.getExtension("OES_texture_float"),
          this.getExtension("OES_texture_float_linear"),
          this.getExtension("OES_texture_half_float"),
          this.getExtension("OES_texture_half_float_linear"),
          this.getExtension("OES_element_index_uint"),
          this.getExtension("OES_standard_derivatives"),
          this.getExtension("EXT_sRGB"),
          this.getExtension("WEBGL_depth_texture"),
          this.getExtension("WEBGL_draw_buffers")),
      this.getExtension("WEBGL_compressed_texture_astc"),
      this.getExtension("EXT_texture_compression_bptc"),
      this.getExtension("WEBGL_compressed_texture_s3tc"),
      this.getExtension("WEBGL_compressed_texture_etc1"),
      this.getExtension("WEBGL_compressed_texture_pvrtc"),
      this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
      (this.vertexAttribDivisor = this.getExtension(
        "ANGLE_instanced_arrays",
        "vertexAttribDivisor",
        "vertexAttribDivisorANGLE",
      )),
      (this.drawArraysInstanced = this.getExtension(
        "ANGLE_instanced_arrays",
        "drawArraysInstanced",
        "drawArraysInstancedANGLE",
      )),
      (this.drawElementsInstanced = this.getExtension(
        "ANGLE_instanced_arrays",
        "drawElementsInstanced",
        "drawElementsInstancedANGLE",
      )),
      (this.createVertexArray = this.getExtension(
        "OES_vertex_array_object",
        "createVertexArray",
        "createVertexArrayOES",
      )),
      (this.bindVertexArray = this.getExtension(
        "OES_vertex_array_object",
        "bindVertexArray",
        "bindVertexArrayOES",
      )),
      (this.deleteVertexArray = this.getExtension(
        "OES_vertex_array_object",
        "deleteVertexArray",
        "deleteVertexArrayOES",
      )),
      (this.drawBuffers = this.getExtension(
        "WEBGL_draw_buffers",
        "drawBuffers",
        "drawBuffersWEBGL",
      )),
      (this.parameters = {}),
      (this.parameters.maxTextureUnits = this.gl.getParameter(
        this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS,
      )),
      (this.parameters.maxAnisotropy = this.getExtension(
        "EXT_texture_filter_anisotropic",
      )
        ? this.gl.getParameter(
            this.getExtension("EXT_texture_filter_anisotropic")
              .MAX_TEXTURE_MAX_ANISOTROPY_EXT,
          )
        : 0));
  }
  setSize(e, r) {
    ((this.width = e),
      (this.height = r),
      (this.gl.canvas.width = e * this.dpr),
      (this.gl.canvas.height = r * this.dpr),
      this.gl.canvas.style &&
        Object.assign(this.gl.canvas.style, {
          width: e + "px",
          height: r + "px",
        }));
  }
  setViewport(e, r, s = 0, n = 0) {
    (this.state.viewport.width === e && this.state.viewport.height === r) ||
      ((this.state.viewport.width = e),
      (this.state.viewport.height = r),
      (this.state.viewport.x = s),
      (this.state.viewport.y = n),
      this.gl.viewport(s, n, e, r));
  }
  setScissor(e, r, s = 0, n = 0) {
    this.gl.scissor(s, n, e, r);
  }
  enable(e) {
    this.state[e] !== !0 && (this.gl.enable(e), (this.state[e] = !0));
  }
  disable(e) {
    this.state[e] !== !1 && (this.gl.disable(e), (this.state[e] = !1));
  }
  setBlendFunc(e, r, s, n) {
    (this.state.blendFunc.src === e &&
      this.state.blendFunc.dst === r &&
      this.state.blendFunc.srcAlpha === s &&
      this.state.blendFunc.dstAlpha === n) ||
      ((this.state.blendFunc.src = e),
      (this.state.blendFunc.dst = r),
      (this.state.blendFunc.srcAlpha = s),
      (this.state.blendFunc.dstAlpha = n),
      s !== void 0
        ? this.gl.blendFuncSeparate(e, r, s, n)
        : this.gl.blendFunc(e, r));
  }
  setBlendEquation(e, r) {
    ((e = e || this.gl.FUNC_ADD),
      !(
        this.state.blendEquation.modeRGB === e &&
        this.state.blendEquation.modeAlpha === r
      ) &&
        ((this.state.blendEquation.modeRGB = e),
        (this.state.blendEquation.modeAlpha = r),
        r !== void 0
          ? this.gl.blendEquationSeparate(e, r)
          : this.gl.blendEquation(e)));
  }
  setCullFace(e) {
    this.state.cullFace !== e &&
      ((this.state.cullFace = e), this.gl.cullFace(e));
  }
  setFrontFace(e) {
    this.state.frontFace !== e &&
      ((this.state.frontFace = e), this.gl.frontFace(e));
  }
  setDepthMask(e) {
    this.state.depthMask !== e &&
      ((this.state.depthMask = e), this.gl.depthMask(e));
  }
  setDepthFunc(e) {
    this.state.depthFunc !== e &&
      ((this.state.depthFunc = e), this.gl.depthFunc(e));
  }
  setStencilMask(e) {
    this.state.stencilMask !== e &&
      ((this.state.stencilMask = e), this.gl.stencilMask(e));
  }
  setStencilFunc(e, r, s) {
    (this.state.stencilFunc === e &&
      this.state.stencilRef === r &&
      this.state.stencilFuncMask === s) ||
      ((this.state.stencilFunc = e || this.gl.ALWAYS),
      (this.state.stencilRef = r || 0),
      (this.state.stencilFuncMask = s || 0),
      this.gl.stencilFunc(e || this.gl.ALWAYS, r || 0, s || 0));
  }
  setStencilOp(e, r, s) {
    (this.state.stencilFail === e &&
      this.state.stencilDepthFail === r &&
      this.state.stencilDepthPass === s) ||
      ((this.state.stencilFail = e),
      (this.state.stencilDepthFail = r),
      (this.state.stencilDepthPass = s),
      this.gl.stencilOp(e, r, s));
  }
  activeTexture(e) {
    this.state.activeTextureUnit !== e &&
      ((this.state.activeTextureUnit = e),
      this.gl.activeTexture(this.gl.TEXTURE0 + e));
  }
  bindFramebuffer({ target: e = this.gl.FRAMEBUFFER, buffer: r = null } = {}) {
    this.state.framebuffer !== r &&
      ((this.state.framebuffer = r), this.gl.bindFramebuffer(e, r));
  }
  getExtension(e, r, s) {
    return r && this.gl[r]
      ? this.gl[r].bind(this.gl)
      : (this.extensions[e] || (this.extensions[e] = this.gl.getExtension(e)),
        r
          ? this.extensions[e]
            ? this.extensions[e][s].bind(this.extensions[e])
            : null
          : this.extensions[e]);
  }
  sortOpaque(e, r) {
    return e.renderOrder !== r.renderOrder
      ? e.renderOrder - r.renderOrder
      : e.program.id !== r.program.id
        ? e.program.id - r.program.id
        : e.zDepth !== r.zDepth
          ? e.zDepth - r.zDepth
          : r.id - e.id;
  }
  sortTransparent(e, r) {
    return e.renderOrder !== r.renderOrder
      ? e.renderOrder - r.renderOrder
      : e.zDepth !== r.zDepth
        ? r.zDepth - e.zDepth
        : r.id - e.id;
  }
  sortUI(e, r) {
    return e.renderOrder !== r.renderOrder
      ? e.renderOrder - r.renderOrder
      : e.program.id !== r.program.id
        ? e.program.id - r.program.id
        : r.id - e.id;
  }
  getRenderList({ scene: e, camera: r, frustumCull: s, sort: n }) {
    let i = [];
    if (
      (r && s && r.updateFrustum(),
      e.traverse((a) => {
        if (!a.visible) return !0;
        a.draw &&
          ((s && a.frustumCulled && r && !r.frustumIntersectsMesh(a)) ||
            i.push(a));
      }),
      n)
    ) {
      const a = [],
        o = [],
        l = [];
      (i.forEach((c) => {
        (c.program.transparent
          ? c.program.depthTest
            ? o.push(c)
            : l.push(c)
          : a.push(c),
          (c.zDepth = 0),
          !(c.renderOrder !== 0 || !c.program.depthTest || !r) &&
            (c.worldMatrix.getTranslation(yt),
            yt.applyMatrix4(r.projectionViewMatrix),
            (c.zDepth = yt.z)));
      }),
        a.sort(this.sortOpaque),
        o.sort(this.sortTransparent),
        l.sort(this.sortUI),
        (i = a.concat(o, l)));
    }
    return i;
  }
  render({
    scene: e,
    camera: r,
    target: s = null,
    update: n = !0,
    sort: i = !0,
    frustumCull: a = !0,
    clear: o,
  }) {
    (s === null
      ? (this.bindFramebuffer(),
        this.setViewport(this.width * this.dpr, this.height * this.dpr))
      : (this.bindFramebuffer(s), this.setViewport(s.width, s.height)),
      (o || (this.autoClear && o !== !1)) &&
        (this.depth &&
          (!s || s.depth) &&
          (this.enable(this.gl.DEPTH_TEST), this.setDepthMask(!0)),
        (this.stencil || !s || s.stencil) &&
          (this.enable(this.gl.STENCIL_TEST), this.setStencilMask(255)),
        this.gl.clear(
          (this.color ? this.gl.COLOR_BUFFER_BIT : 0) |
            (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) |
            (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0),
        )),
      n && e.updateMatrixWorld(),
      r && r.updateMatrixWorld(),
      this.getRenderList({
        scene: e,
        camera: r,
        frustumCull: a,
        sort: i,
      }).forEach((c) => {
        c.draw({ camera: r });
      }));
  }
}
function Ga(t, e) {
  return ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t);
}
function Ka(t, e, r, s, n) {
  return ((t[0] = e), (t[1] = r), (t[2] = s), (t[3] = n), t);
}
function Ja(t, e) {
  let r = e[0],
    s = e[1],
    n = e[2],
    i = e[3],
    a = r * r + s * s + n * n + i * i;
  return (
    a > 0 && (a = 1 / Math.sqrt(a)),
    (t[0] = r * a),
    (t[1] = s * a),
    (t[2] = n * a),
    (t[3] = i * a),
    t
  );
}
function Xa(t, e) {
  return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3];
}
function Ya(t) {
  return ((t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 1), t);
}
function Za(t, e, r) {
  r = r * 0.5;
  let s = Math.sin(r);
  return (
    (t[0] = s * e[0]),
    (t[1] = s * e[1]),
    (t[2] = s * e[2]),
    (t[3] = Math.cos(r)),
    t
  );
}
function Er(t, e, r) {
  let s = e[0],
    n = e[1],
    i = e[2],
    a = e[3],
    o = r[0],
    l = r[1],
    c = r[2],
    h = r[3];
  return (
    (t[0] = s * h + a * o + n * c - i * l),
    (t[1] = n * h + a * l + i * o - s * c),
    (t[2] = i * h + a * c + s * l - n * o),
    (t[3] = a * h - s * o - n * l - i * c),
    t
  );
}
function Qa(t, e, r) {
  r *= 0.5;
  let s = e[0],
    n = e[1],
    i = e[2],
    a = e[3],
    o = Math.sin(r),
    l = Math.cos(r);
  return (
    (t[0] = s * l + a * o),
    (t[1] = n * l + i * o),
    (t[2] = i * l - n * o),
    (t[3] = a * l - s * o),
    t
  );
}
function eo(t, e, r) {
  r *= 0.5;
  let s = e[0],
    n = e[1],
    i = e[2],
    a = e[3],
    o = Math.sin(r),
    l = Math.cos(r);
  return (
    (t[0] = s * l - i * o),
    (t[1] = n * l + a * o),
    (t[2] = i * l + s * o),
    (t[3] = a * l - n * o),
    t
  );
}
function to(t, e, r) {
  r *= 0.5;
  let s = e[0],
    n = e[1],
    i = e[2],
    a = e[3],
    o = Math.sin(r),
    l = Math.cos(r);
  return (
    (t[0] = s * l + n * o),
    (t[1] = n * l - s * o),
    (t[2] = i * l + a * o),
    (t[3] = a * l - i * o),
    t
  );
}
function ro(t, e, r, s) {
  let n = e[0],
    i = e[1],
    a = e[2],
    o = e[3],
    l = r[0],
    c = r[1],
    h = r[2],
    u = r[3],
    f,
    p,
    g,
    m,
    v;
  return (
    (p = n * l + i * c + a * h + o * u),
    p < 0 && ((p = -p), (l = -l), (c = -c), (h = -h), (u = -u)),
    1 - p > 1e-6
      ? ((f = Math.acos(p)),
        (g = Math.sin(f)),
        (m = Math.sin((1 - s) * f) / g),
        (v = Math.sin(s * f) / g))
      : ((m = 1 - s), (v = s)),
    (t[0] = m * n + v * l),
    (t[1] = m * i + v * c),
    (t[2] = m * a + v * h),
    (t[3] = m * o + v * u),
    t
  );
}
function so(t, e) {
  let r = e[0],
    s = e[1],
    n = e[2],
    i = e[3],
    a = r * r + s * s + n * n + i * i,
    o = a ? 1 / a : 0;
  return ((t[0] = -r * o), (t[1] = -s * o), (t[2] = -n * o), (t[3] = i * o), t);
}
function no(t, e) {
  return ((t[0] = -e[0]), (t[1] = -e[1]), (t[2] = -e[2]), (t[3] = e[3]), t);
}
function io(t, e) {
  let r = e[0] + e[4] + e[8],
    s;
  if (r > 0)
    ((s = Math.sqrt(r + 1)),
      (t[3] = 0.5 * s),
      (s = 0.5 / s),
      (t[0] = (e[5] - e[7]) * s),
      (t[1] = (e[6] - e[2]) * s),
      (t[2] = (e[1] - e[3]) * s));
  else {
    let n = 0;
    (e[4] > e[0] && (n = 1), e[8] > e[n * 3 + n] && (n = 2));
    let i = (n + 1) % 3,
      a = (n + 2) % 3;
    ((s = Math.sqrt(e[n * 3 + n] - e[i * 3 + i] - e[a * 3 + a] + 1)),
      (t[n] = 0.5 * s),
      (s = 0.5 / s),
      (t[3] = (e[i * 3 + a] - e[a * 3 + i]) * s),
      (t[i] = (e[i * 3 + n] + e[n * 3 + i]) * s),
      (t[a] = (e[a * 3 + n] + e[n * 3 + a]) * s));
  }
  return t;
}
function ao(t, e, r = "YXZ") {
  let s = Math.sin(e[0] * 0.5),
    n = Math.cos(e[0] * 0.5),
    i = Math.sin(e[1] * 0.5),
    a = Math.cos(e[1] * 0.5),
    o = Math.sin(e[2] * 0.5),
    l = Math.cos(e[2] * 0.5);
  return (
    r === "XYZ"
      ? ((t[0] = s * a * l + n * i * o),
        (t[1] = n * i * l - s * a * o),
        (t[2] = n * a * o + s * i * l),
        (t[3] = n * a * l - s * i * o))
      : r === "YXZ"
        ? ((t[0] = s * a * l + n * i * o),
          (t[1] = n * i * l - s * a * o),
          (t[2] = n * a * o - s * i * l),
          (t[3] = n * a * l + s * i * o))
        : r === "ZXY"
          ? ((t[0] = s * a * l - n * i * o),
            (t[1] = n * i * l + s * a * o),
            (t[2] = n * a * o + s * i * l),
            (t[3] = n * a * l - s * i * o))
          : r === "ZYX"
            ? ((t[0] = s * a * l - n * i * o),
              (t[1] = n * i * l + s * a * o),
              (t[2] = n * a * o - s * i * l),
              (t[3] = n * a * l + s * i * o))
            : r === "YZX"
              ? ((t[0] = s * a * l + n * i * o),
                (t[1] = n * i * l + s * a * o),
                (t[2] = n * a * o - s * i * l),
                (t[3] = n * a * l - s * i * o))
              : r === "XZY" &&
                ((t[0] = s * a * l - n * i * o),
                (t[1] = n * i * l - s * a * o),
                (t[2] = n * a * o + s * i * l),
                (t[3] = n * a * l + s * i * o)),
    t
  );
}
const oo = Ga,
  lo = Ka,
  co = Xa,
  ho = Ja;
class uo extends Array {
  constructor(e = 0, r = 0, s = 0, n = 1) {
    (super(e, r, s, n), (this.onChange = () => {}), (this._target = this));
    const i = ["0", "1", "2", "3"];
    return new Proxy(this, {
      set(a, o) {
        const l = Reflect.set(...arguments);
        return (l && i.includes(o) && a.onChange(), l);
      },
    });
  }
  get x() {
    return this[0];
  }
  get y() {
    return this[1];
  }
  get z() {
    return this[2];
  }
  get w() {
    return this[3];
  }
  set x(e) {
    ((this._target[0] = e), this.onChange());
  }
  set y(e) {
    ((this._target[1] = e), this.onChange());
  }
  set z(e) {
    ((this._target[2] = e), this.onChange());
  }
  set w(e) {
    ((this._target[3] = e), this.onChange());
  }
  identity() {
    return (Ya(this._target), this.onChange(), this);
  }
  set(e, r, s, n) {
    return e.length
      ? this.copy(e)
      : (lo(this._target, e, r, s, n), this.onChange(), this);
  }
  rotateX(e) {
    return (Qa(this._target, this._target, e), this.onChange(), this);
  }
  rotateY(e) {
    return (eo(this._target, this._target, e), this.onChange(), this);
  }
  rotateZ(e) {
    return (to(this._target, this._target, e), this.onChange(), this);
  }
  inverse(e = this._target) {
    return (so(this._target, e), this.onChange(), this);
  }
  conjugate(e = this._target) {
    return (no(this._target, e), this.onChange(), this);
  }
  copy(e) {
    return (oo(this._target, e), this.onChange(), this);
  }
  normalize(e = this._target) {
    return (ho(this._target, e), this.onChange(), this);
  }
  multiply(e, r) {
    return (
      r ? Er(this._target, e, r) : Er(this._target, this._target, e),
      this.onChange(),
      this
    );
  }
  dot(e) {
    return co(this._target, e);
  }
  fromMatrix3(e) {
    return (io(this._target, e), this.onChange(), this);
  }
  fromEuler(e, r) {
    return (ao(this._target, e, e.order), r || this.onChange(), this);
  }
  fromAxisAngle(e, r) {
    return (Za(this._target, e, r), this.onChange(), this);
  }
  slerp(e, r) {
    return (ro(this._target, this._target, e, r), this.onChange(), this);
  }
  fromArray(e, r = 0) {
    return (
      (this._target[0] = e[r]),
      (this._target[1] = e[r + 1]),
      (this._target[2] = e[r + 2]),
      (this._target[3] = e[r + 3]),
      this.onChange(),
      this
    );
  }
  toArray(e = [], r = 0) {
    return (
      (e[r] = this[0]),
      (e[r + 1] = this[1]),
      (e[r + 2] = this[2]),
      (e[r + 3] = this[3]),
      e
    );
  }
}
const fo = 1e-6;
function po(t, e) {
  return (
    (t[0] = e[0]),
    (t[1] = e[1]),
    (t[2] = e[2]),
    (t[3] = e[3]),
    (t[4] = e[4]),
    (t[5] = e[5]),
    (t[6] = e[6]),
    (t[7] = e[7]),
    (t[8] = e[8]),
    (t[9] = e[9]),
    (t[10] = e[10]),
    (t[11] = e[11]),
    (t[12] = e[12]),
    (t[13] = e[13]),
    (t[14] = e[14]),
    (t[15] = e[15]),
    t
  );
}
function go(t, e, r, s, n, i, a, o, l, c, h, u, f, p, g, m, v) {
  return (
    (t[0] = e),
    (t[1] = r),
    (t[2] = s),
    (t[3] = n),
    (t[4] = i),
    (t[5] = a),
    (t[6] = o),
    (t[7] = l),
    (t[8] = c),
    (t[9] = h),
    (t[10] = u),
    (t[11] = f),
    (t[12] = p),
    (t[13] = g),
    (t[14] = m),
    (t[15] = v),
    t
  );
}
function mo(t) {
  return (
    (t[0] = 1),
    (t[1] = 0),
    (t[2] = 0),
    (t[3] = 0),
    (t[4] = 0),
    (t[5] = 1),
    (t[6] = 0),
    (t[7] = 0),
    (t[8] = 0),
    (t[9] = 0),
    (t[10] = 1),
    (t[11] = 0),
    (t[12] = 0),
    (t[13] = 0),
    (t[14] = 0),
    (t[15] = 1),
    t
  );
}
function yo(t, e) {
  let r = e[0],
    s = e[1],
    n = e[2],
    i = e[3],
    a = e[4],
    o = e[5],
    l = e[6],
    c = e[7],
    h = e[8],
    u = e[9],
    f = e[10],
    p = e[11],
    g = e[12],
    m = e[13],
    v = e[14],
    y = e[15],
    w = r * o - s * a,
    b = r * l - n * a,
    _ = r * c - i * a,
    E = s * l - n * o,
    S = s * c - i * o,
    A = n * c - i * l,
    L = h * m - u * g,
    C = h * v - f * g,
    N = h * y - p * g,
    M = u * v - f * m,
    U = u * y - p * m,
    B = f * y - p * v,
    R = w * B - b * U + _ * M + E * N - S * C + A * L;
  return R
    ? ((R = 1 / R),
      (t[0] = (o * B - l * U + c * M) * R),
      (t[1] = (n * U - s * B - i * M) * R),
      (t[2] = (m * A - v * S + y * E) * R),
      (t[3] = (f * S - u * A - p * E) * R),
      (t[4] = (l * N - a * B - c * C) * R),
      (t[5] = (r * B - n * N + i * C) * R),
      (t[6] = (v * _ - g * A - y * b) * R),
      (t[7] = (h * A - f * _ + p * b) * R),
      (t[8] = (a * U - o * N + c * L) * R),
      (t[9] = (s * N - r * U - i * L) * R),
      (t[10] = (g * S - m * _ + y * w) * R),
      (t[11] = (u * _ - h * S - p * w) * R),
      (t[12] = (o * C - a * M - l * L) * R),
      (t[13] = (r * M - s * C + n * L) * R),
      (t[14] = (m * b - g * E - v * w) * R),
      (t[15] = (h * E - u * b + f * w) * R),
      t)
    : null;
}
function hs(t) {
  let e = t[0],
    r = t[1],
    s = t[2],
    n = t[3],
    i = t[4],
    a = t[5],
    o = t[6],
    l = t[7],
    c = t[8],
    h = t[9],
    u = t[10],
    f = t[11],
    p = t[12],
    g = t[13],
    m = t[14],
    v = t[15],
    y = e * a - r * i,
    w = e * o - s * i,
    b = e * l - n * i,
    _ = r * o - s * a,
    E = r * l - n * a,
    S = s * l - n * o,
    A = c * g - h * p,
    L = c * m - u * p,
    C = c * v - f * p,
    N = h * m - u * g,
    M = h * v - f * g,
    U = u * v - f * m;
  return y * U - w * M + b * N + _ * C - E * L + S * A;
}
function Tr(t, e, r) {
  let s = e[0],
    n = e[1],
    i = e[2],
    a = e[3],
    o = e[4],
    l = e[5],
    c = e[6],
    h = e[7],
    u = e[8],
    f = e[9],
    p = e[10],
    g = e[11],
    m = e[12],
    v = e[13],
    y = e[14],
    w = e[15],
    b = r[0],
    _ = r[1],
    E = r[2],
    S = r[3];
  return (
    (t[0] = b * s + _ * o + E * u + S * m),
    (t[1] = b * n + _ * l + E * f + S * v),
    (t[2] = b * i + _ * c + E * p + S * y),
    (t[3] = b * a + _ * h + E * g + S * w),
    (b = r[4]),
    (_ = r[5]),
    (E = r[6]),
    (S = r[7]),
    (t[4] = b * s + _ * o + E * u + S * m),
    (t[5] = b * n + _ * l + E * f + S * v),
    (t[6] = b * i + _ * c + E * p + S * y),
    (t[7] = b * a + _ * h + E * g + S * w),
    (b = r[8]),
    (_ = r[9]),
    (E = r[10]),
    (S = r[11]),
    (t[8] = b * s + _ * o + E * u + S * m),
    (t[9] = b * n + _ * l + E * f + S * v),
    (t[10] = b * i + _ * c + E * p + S * y),
    (t[11] = b * a + _ * h + E * g + S * w),
    (b = r[12]),
    (_ = r[13]),
    (E = r[14]),
    (S = r[15]),
    (t[12] = b * s + _ * o + E * u + S * m),
    (t[13] = b * n + _ * l + E * f + S * v),
    (t[14] = b * i + _ * c + E * p + S * y),
    (t[15] = b * a + _ * h + E * g + S * w),
    t
  );
}
function vo(t, e, r) {
  let s = r[0],
    n = r[1],
    i = r[2],
    a,
    o,
    l,
    c,
    h,
    u,
    f,
    p,
    g,
    m,
    v,
    y;
  return (
    e === t
      ? ((t[12] = e[0] * s + e[4] * n + e[8] * i + e[12]),
        (t[13] = e[1] * s + e[5] * n + e[9] * i + e[13]),
        (t[14] = e[2] * s + e[6] * n + e[10] * i + e[14]),
        (t[15] = e[3] * s + e[7] * n + e[11] * i + e[15]))
      : ((a = e[0]),
        (o = e[1]),
        (l = e[2]),
        (c = e[3]),
        (h = e[4]),
        (u = e[5]),
        (f = e[6]),
        (p = e[7]),
        (g = e[8]),
        (m = e[9]),
        (v = e[10]),
        (y = e[11]),
        (t[0] = a),
        (t[1] = o),
        (t[2] = l),
        (t[3] = c),
        (t[4] = h),
        (t[5] = u),
        (t[6] = f),
        (t[7] = p),
        (t[8] = g),
        (t[9] = m),
        (t[10] = v),
        (t[11] = y),
        (t[12] = a * s + h * n + g * i + e[12]),
        (t[13] = o * s + u * n + m * i + e[13]),
        (t[14] = l * s + f * n + v * i + e[14]),
        (t[15] = c * s + p * n + y * i + e[15])),
    t
  );
}
function bo(t, e, r) {
  let s = r[0],
    n = r[1],
    i = r[2];
  return (
    (t[0] = e[0] * s),
    (t[1] = e[1] * s),
    (t[2] = e[2] * s),
    (t[3] = e[3] * s),
    (t[4] = e[4] * n),
    (t[5] = e[5] * n),
    (t[6] = e[6] * n),
    (t[7] = e[7] * n),
    (t[8] = e[8] * i),
    (t[9] = e[9] * i),
    (t[10] = e[10] * i),
    (t[11] = e[11] * i),
    (t[12] = e[12]),
    (t[13] = e[13]),
    (t[14] = e[14]),
    (t[15] = e[15]),
    t
  );
}
function wo(t, e, r, s) {
  let n = s[0],
    i = s[1],
    a = s[2],
    o = Math.hypot(n, i, a),
    l,
    c,
    h,
    u,
    f,
    p,
    g,
    m,
    v,
    y,
    w,
    b,
    _,
    E,
    S,
    A,
    L,
    C,
    N,
    M,
    U,
    B,
    R,
    Ee;
  return Math.abs(o) < fo
    ? null
    : ((o = 1 / o),
      (n *= o),
      (i *= o),
      (a *= o),
      (l = Math.sin(r)),
      (c = Math.cos(r)),
      (h = 1 - c),
      (u = e[0]),
      (f = e[1]),
      (p = e[2]),
      (g = e[3]),
      (m = e[4]),
      (v = e[5]),
      (y = e[6]),
      (w = e[7]),
      (b = e[8]),
      (_ = e[9]),
      (E = e[10]),
      (S = e[11]),
      (A = n * n * h + c),
      (L = i * n * h + a * l),
      (C = a * n * h - i * l),
      (N = n * i * h - a * l),
      (M = i * i * h + c),
      (U = a * i * h + n * l),
      (B = n * a * h + i * l),
      (R = i * a * h - n * l),
      (Ee = a * a * h + c),
      (t[0] = u * A + m * L + b * C),
      (t[1] = f * A + v * L + _ * C),
      (t[2] = p * A + y * L + E * C),
      (t[3] = g * A + w * L + S * C),
      (t[4] = u * N + m * M + b * U),
      (t[5] = f * N + v * M + _ * U),
      (t[6] = p * N + y * M + E * U),
      (t[7] = g * N + w * M + S * U),
      (t[8] = u * B + m * R + b * Ee),
      (t[9] = f * B + v * R + _ * Ee),
      (t[10] = p * B + y * R + E * Ee),
      (t[11] = g * B + w * R + S * Ee),
      e !== t &&
        ((t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), (t[15] = e[15])),
      t);
}
function _o(t, e) {
  return ((t[0] = e[12]), (t[1] = e[13]), (t[2] = e[14]), t);
}
function us(t, e) {
  let r = e[0],
    s = e[1],
    n = e[2],
    i = e[4],
    a = e[5],
    o = e[6],
    l = e[8],
    c = e[9],
    h = e[10];
  return (
    (t[0] = Math.hypot(r, s, n)),
    (t[1] = Math.hypot(i, a, o)),
    (t[2] = Math.hypot(l, c, h)),
    t
  );
}
function xo(t) {
  let e = t[0],
    r = t[1],
    s = t[2],
    n = t[4],
    i = t[5],
    a = t[6],
    o = t[8],
    l = t[9],
    c = t[10];
  const h = e * e + r * r + s * s,
    u = n * n + i * i + a * a,
    f = o * o + l * l + c * c;
  return Math.sqrt(Math.max(h, u, f));
}
const ds = (function () {
  const t = [1, 1, 1];
  return function (e, r) {
    let s = t;
    us(s, r);
    let n = 1 / s[0],
      i = 1 / s[1],
      a = 1 / s[2],
      o = r[0] * n,
      l = r[1] * i,
      c = r[2] * a,
      h = r[4] * n,
      u = r[5] * i,
      f = r[6] * a,
      p = r[8] * n,
      g = r[9] * i,
      m = r[10] * a,
      v = o + u + m,
      y = 0;
    return (
      v > 0
        ? ((y = Math.sqrt(v + 1) * 2),
          (e[3] = 0.25 * y),
          (e[0] = (f - g) / y),
          (e[1] = (p - c) / y),
          (e[2] = (l - h) / y))
        : o > u && o > m
          ? ((y = Math.sqrt(1 + o - u - m) * 2),
            (e[3] = (f - g) / y),
            (e[0] = 0.25 * y),
            (e[1] = (l + h) / y),
            (e[2] = (p + c) / y))
          : u > m
            ? ((y = Math.sqrt(1 + u - o - m) * 2),
              (e[3] = (p - c) / y),
              (e[0] = (l + h) / y),
              (e[1] = 0.25 * y),
              (e[2] = (f + g) / y))
            : ((y = Math.sqrt(1 + m - o - u) * 2),
              (e[3] = (l - h) / y),
              (e[0] = (p + c) / y),
              (e[1] = (f + g) / y),
              (e[2] = 0.25 * y)),
      e
    );
  };
})();
function So(t, e, r, s) {
  let n = Pe([t[0], t[1], t[2]]);
  const i = Pe([t[4], t[5], t[6]]),
    a = Pe([t[8], t[9], t[10]]);
  (hs(t) < 0 && (n = -n), (r[0] = t[12]), (r[1] = t[13]), (r[2] = t[14]));
  const l = t.slice(),
    c = 1 / n,
    h = 1 / i,
    u = 1 / a;
  ((l[0] *= c),
    (l[1] *= c),
    (l[2] *= c),
    (l[4] *= h),
    (l[5] *= h),
    (l[6] *= h),
    (l[8] *= u),
    (l[9] *= u),
    (l[10] *= u),
    ds(e, l),
    (s[0] = n),
    (s[1] = i),
    (s[2] = a));
}
function ko(t, e, r, s) {
  const n = t,
    i = e[0],
    a = e[1],
    o = e[2],
    l = e[3],
    c = i + i,
    h = a + a,
    u = o + o,
    f = i * c,
    p = i * h,
    g = i * u,
    m = a * h,
    v = a * u,
    y = o * u,
    w = l * c,
    b = l * h,
    _ = l * u,
    E = s[0],
    S = s[1],
    A = s[2];
  return (
    (n[0] = (1 - (m + y)) * E),
    (n[1] = (p + _) * E),
    (n[2] = (g - b) * E),
    (n[3] = 0),
    (n[4] = (p - _) * S),
    (n[5] = (1 - (f + y)) * S),
    (n[6] = (v + w) * S),
    (n[7] = 0),
    (n[8] = (g + b) * A),
    (n[9] = (v - w) * A),
    (n[10] = (1 - (f + m)) * A),
    (n[11] = 0),
    (n[12] = r[0]),
    (n[13] = r[1]),
    (n[14] = r[2]),
    (n[15] = 1),
    n
  );
}
function Eo(t, e) {
  let r = e[0],
    s = e[1],
    n = e[2],
    i = e[3],
    a = r + r,
    o = s + s,
    l = n + n,
    c = r * a,
    h = s * a,
    u = s * o,
    f = n * a,
    p = n * o,
    g = n * l,
    m = i * a,
    v = i * o,
    y = i * l;
  return (
    (t[0] = 1 - u - g),
    (t[1] = h + y),
    (t[2] = f - v),
    (t[3] = 0),
    (t[4] = h - y),
    (t[5] = 1 - c - g),
    (t[6] = p + m),
    (t[7] = 0),
    (t[8] = f + v),
    (t[9] = p - m),
    (t[10] = 1 - c - u),
    (t[11] = 0),
    (t[12] = 0),
    (t[13] = 0),
    (t[14] = 0),
    (t[15] = 1),
    t
  );
}
function To(t, e, r, s, n) {
  let i = 1 / Math.tan(e / 2),
    a = 1 / (s - n);
  return (
    (t[0] = i / r),
    (t[1] = 0),
    (t[2] = 0),
    (t[3] = 0),
    (t[4] = 0),
    (t[5] = i),
    (t[6] = 0),
    (t[7] = 0),
    (t[8] = 0),
    (t[9] = 0),
    (t[10] = (n + s) * a),
    (t[11] = -1),
    (t[12] = 0),
    (t[13] = 0),
    (t[14] = 2 * n * s * a),
    (t[15] = 0),
    t
  );
}
function Ao(t, e, r, s, n, i, a) {
  let o = 1 / (e - r),
    l = 1 / (s - n),
    c = 1 / (i - a);
  return (
    (t[0] = -2 * o),
    (t[1] = 0),
    (t[2] = 0),
    (t[3] = 0),
    (t[4] = 0),
    (t[5] = -2 * l),
    (t[6] = 0),
    (t[7] = 0),
    (t[8] = 0),
    (t[9] = 0),
    (t[10] = 2 * c),
    (t[11] = 0),
    (t[12] = (e + r) * o),
    (t[13] = (n + s) * l),
    (t[14] = (a + i) * c),
    (t[15] = 1),
    t
  );
}
function Ro(t, e, r, s) {
  let n = e[0],
    i = e[1],
    a = e[2],
    o = s[0],
    l = s[1],
    c = s[2],
    h = n - r[0],
    u = i - r[1],
    f = a - r[2],
    p = h * h + u * u + f * f;
  p === 0 ? (f = 1) : ((p = 1 / Math.sqrt(p)), (h *= p), (u *= p), (f *= p));
  let g = l * f - c * u,
    m = c * h - o * f,
    v = o * u - l * h;
  return (
    (p = g * g + m * m + v * v),
    p === 0 &&
      (c ? (o += 1e-6) : l ? (c += 1e-6) : (l += 1e-6),
      (g = l * f - c * u),
      (m = c * h - o * f),
      (v = o * u - l * h),
      (p = g * g + m * m + v * v)),
    (p = 1 / Math.sqrt(p)),
    (g *= p),
    (m *= p),
    (v *= p),
    (t[0] = g),
    (t[1] = m),
    (t[2] = v),
    (t[3] = 0),
    (t[4] = u * v - f * m),
    (t[5] = f * g - h * v),
    (t[6] = h * m - u * g),
    (t[7] = 0),
    (t[8] = h),
    (t[9] = u),
    (t[10] = f),
    (t[11] = 0),
    (t[12] = n),
    (t[13] = i),
    (t[14] = a),
    (t[15] = 1),
    t
  );
}
function Ar(t, e, r) {
  return (
    (t[0] = e[0] + r[0]),
    (t[1] = e[1] + r[1]),
    (t[2] = e[2] + r[2]),
    (t[3] = e[3] + r[3]),
    (t[4] = e[4] + r[4]),
    (t[5] = e[5] + r[5]),
    (t[6] = e[6] + r[6]),
    (t[7] = e[7] + r[7]),
    (t[8] = e[8] + r[8]),
    (t[9] = e[9] + r[9]),
    (t[10] = e[10] + r[10]),
    (t[11] = e[11] + r[11]),
    (t[12] = e[12] + r[12]),
    (t[13] = e[13] + r[13]),
    (t[14] = e[14] + r[14]),
    (t[15] = e[15] + r[15]),
    t
  );
}
function Rr(t, e, r) {
  return (
    (t[0] = e[0] - r[0]),
    (t[1] = e[1] - r[1]),
    (t[2] = e[2] - r[2]),
    (t[3] = e[3] - r[3]),
    (t[4] = e[4] - r[4]),
    (t[5] = e[5] - r[5]),
    (t[6] = e[6] - r[6]),
    (t[7] = e[7] - r[7]),
    (t[8] = e[8] - r[8]),
    (t[9] = e[9] - r[9]),
    (t[10] = e[10] - r[10]),
    (t[11] = e[11] - r[11]),
    (t[12] = e[12] - r[12]),
    (t[13] = e[13] - r[13]),
    (t[14] = e[14] - r[14]),
    (t[15] = e[15] - r[15]),
    t
  );
}
function jo(t, e, r) {
  return (
    (t[0] = e[0] * r),
    (t[1] = e[1] * r),
    (t[2] = e[2] * r),
    (t[3] = e[3] * r),
    (t[4] = e[4] * r),
    (t[5] = e[5] * r),
    (t[6] = e[6] * r),
    (t[7] = e[7] * r),
    (t[8] = e[8] * r),
    (t[9] = e[9] * r),
    (t[10] = e[10] * r),
    (t[11] = e[11] * r),
    (t[12] = e[12] * r),
    (t[13] = e[13] * r),
    (t[14] = e[14] * r),
    (t[15] = e[15] * r),
    t
  );
}
class tt extends Array {
  constructor(
    e = 1,
    r = 0,
    s = 0,
    n = 0,
    i = 0,
    a = 1,
    o = 0,
    l = 0,
    c = 0,
    h = 0,
    u = 1,
    f = 0,
    p = 0,
    g = 0,
    m = 0,
    v = 1,
  ) {
    return (super(e, r, s, n, i, a, o, l, c, h, u, f, p, g, m, v), this);
  }
  get x() {
    return this[12];
  }
  get y() {
    return this[13];
  }
  get z() {
    return this[14];
  }
  get w() {
    return this[15];
  }
  set x(e) {
    this[12] = e;
  }
  set y(e) {
    this[13] = e;
  }
  set z(e) {
    this[14] = e;
  }
  set w(e) {
    this[15] = e;
  }
  set(e, r, s, n, i, a, o, l, c, h, u, f, p, g, m, v) {
    return e.length
      ? this.copy(e)
      : (go(this, e, r, s, n, i, a, o, l, c, h, u, f, p, g, m, v), this);
  }
  translate(e, r = this) {
    return (vo(this, r, e), this);
  }
  rotate(e, r, s = this) {
    return (wo(this, s, e, r), this);
  }
  scale(e, r = this) {
    return (bo(this, r, typeof e == "number" ? [e, e, e] : e), this);
  }
  add(e, r) {
    return (r ? Ar(this, e, r) : Ar(this, this, e), this);
  }
  sub(e, r) {
    return (r ? Rr(this, e, r) : Rr(this, this, e), this);
  }
  multiply(e, r) {
    return (
      e.length ? (r ? Tr(this, e, r) : Tr(this, this, e)) : jo(this, this, e),
      this
    );
  }
  identity() {
    return (mo(this), this);
  }
  copy(e) {
    return (po(this, e), this);
  }
  fromPerspective({ fov: e, aspect: r, near: s, far: n } = {}) {
    return (To(this, e, r, s, n), this);
  }
  fromOrthogonal({ left: e, right: r, bottom: s, top: n, near: i, far: a }) {
    return (Ao(this, e, r, s, n, i, a), this);
  }
  fromQuaternion(e) {
    return (Eo(this, e), this);
  }
  setPosition(e) {
    return ((this.x = e[0]), (this.y = e[1]), (this.z = e[2]), this);
  }
  inverse(e = this) {
    return (yo(this, e), this);
  }
  compose(e, r, s) {
    return (ko(this, e, r, s), this);
  }
  decompose(e, r, s) {
    return (So(this, e, r, s), this);
  }
  getRotation(e) {
    return (ds(e, this), this);
  }
  getTranslation(e) {
    return (_o(e, this), this);
  }
  getScaling(e) {
    return (us(e, this), this);
  }
  getMaxScaleOnAxis() {
    return xo(this);
  }
  lookAt(e, r, s) {
    return (Ro(this, e, r, s), this);
  }
  determinant() {
    return hs(this);
  }
  fromArray(e, r = 0) {
    return (
      (this[0] = e[r]),
      (this[1] = e[r + 1]),
      (this[2] = e[r + 2]),
      (this[3] = e[r + 3]),
      (this[4] = e[r + 4]),
      (this[5] = e[r + 5]),
      (this[6] = e[r + 6]),
      (this[7] = e[r + 7]),
      (this[8] = e[r + 8]),
      (this[9] = e[r + 9]),
      (this[10] = e[r + 10]),
      (this[11] = e[r + 11]),
      (this[12] = e[r + 12]),
      (this[13] = e[r + 13]),
      (this[14] = e[r + 14]),
      (this[15] = e[r + 15]),
      this
    );
  }
  toArray(e = [], r = 0) {
    return (
      (e[r] = this[0]),
      (e[r + 1] = this[1]),
      (e[r + 2] = this[2]),
      (e[r + 3] = this[3]),
      (e[r + 4] = this[4]),
      (e[r + 5] = this[5]),
      (e[r + 6] = this[6]),
      (e[r + 7] = this[7]),
      (e[r + 8] = this[8]),
      (e[r + 9] = this[9]),
      (e[r + 10] = this[10]),
      (e[r + 11] = this[11]),
      (e[r + 12] = this[12]),
      (e[r + 13] = this[13]),
      (e[r + 14] = this[14]),
      (e[r + 15] = this[15]),
      e
    );
  }
}
function Co(t, e, r = "YXZ") {
  return (
    r === "XYZ"
      ? ((t[1] = Math.asin(Math.min(Math.max(e[8], -1), 1))),
        Math.abs(e[8]) < 0.99999
          ? ((t[0] = Math.atan2(-e[9], e[10])),
            (t[2] = Math.atan2(-e[4], e[0])))
          : ((t[0] = Math.atan2(e[6], e[5])), (t[2] = 0)))
      : r === "YXZ"
        ? ((t[0] = Math.asin(-Math.min(Math.max(e[9], -1), 1))),
          Math.abs(e[9]) < 0.99999
            ? ((t[1] = Math.atan2(e[8], e[10])),
              (t[2] = Math.atan2(e[1], e[5])))
            : ((t[1] = Math.atan2(-e[2], e[0])), (t[2] = 0)))
        : r === "ZXY"
          ? ((t[0] = Math.asin(Math.min(Math.max(e[6], -1), 1))),
            Math.abs(e[6]) < 0.99999
              ? ((t[1] = Math.atan2(-e[2], e[10])),
                (t[2] = Math.atan2(-e[4], e[5])))
              : ((t[1] = 0), (t[2] = Math.atan2(e[1], e[0]))))
          : r === "ZYX"
            ? ((t[1] = Math.asin(-Math.min(Math.max(e[2], -1), 1))),
              Math.abs(e[2]) < 0.99999
                ? ((t[0] = Math.atan2(e[6], e[10])),
                  (t[2] = Math.atan2(e[1], e[0])))
                : ((t[0] = 0), (t[2] = Math.atan2(-e[4], e[5]))))
            : r === "YZX"
              ? ((t[2] = Math.asin(Math.min(Math.max(e[1], -1), 1))),
                Math.abs(e[1]) < 0.99999
                  ? ((t[0] = Math.atan2(-e[9], e[5])),
                    (t[1] = Math.atan2(-e[2], e[0])))
                  : ((t[0] = 0), (t[1] = Math.atan2(e[8], e[10]))))
              : r === "XZY" &&
                ((t[2] = Math.asin(-Math.min(Math.max(e[4], -1), 1))),
                Math.abs(e[4]) < 0.99999
                  ? ((t[0] = Math.atan2(e[6], e[5])),
                    (t[1] = Math.atan2(e[8], e[0])))
                  : ((t[0] = Math.atan2(-e[9], e[10])), (t[1] = 0))),
    t
  );
}
const jr = new tt();
class Oo extends Array {
  constructor(e = 0, r = e, s = e, n = "YXZ") {
    (super(e, r, s),
      (this.order = n),
      (this.onChange = () => {}),
      (this._target = this));
    const i = ["0", "1", "2"];
    return new Proxy(this, {
      set(a, o) {
        const l = Reflect.set(...arguments);
        return (l && i.includes(o) && a.onChange(), l);
      },
    });
  }
  get x() {
    return this[0];
  }
  get y() {
    return this[1];
  }
  get z() {
    return this[2];
  }
  set x(e) {
    ((this._target[0] = e), this.onChange());
  }
  set y(e) {
    ((this._target[1] = e), this.onChange());
  }
  set z(e) {
    ((this._target[2] = e), this.onChange());
  }
  set(e, r = e, s = e) {
    return e.length
      ? this.copy(e)
      : ((this._target[0] = e),
        (this._target[1] = r),
        (this._target[2] = s),
        this.onChange(),
        this);
  }
  copy(e) {
    return (
      (this._target[0] = e[0]),
      (this._target[1] = e[1]),
      (this._target[2] = e[2]),
      this.onChange(),
      this
    );
  }
  reorder(e) {
    return ((this._target.order = e), this.onChange(), this);
  }
  fromRotationMatrix(e, r = this.order) {
    return (Co(this._target, e, r), this.onChange(), this);
  }
  fromQuaternion(e, r = this.order, s) {
    return (
      jr.fromQuaternion(e),
      this._target.fromRotationMatrix(jr, r),
      s || this.onChange(),
      this
    );
  }
  fromArray(e, r = 0) {
    return (
      (this._target[0] = e[r]),
      (this._target[1] = e[r + 1]),
      (this._target[2] = e[r + 2]),
      this
    );
  }
  toArray(e = [], r = 0) {
    return ((e[r] = this[0]), (e[r + 1] = this[1]), (e[r + 2] = this[2]), e);
  }
}
class Po {
  constructor() {
    ((this.parent = null),
      (this.children = []),
      (this.visible = !0),
      (this.matrix = new tt()),
      (this.worldMatrix = new tt()),
      (this.matrixAutoUpdate = !0),
      (this.worldMatrixNeedsUpdate = !1),
      (this.position = new J()),
      (this.quaternion = new uo()),
      (this.scale = new J(1)),
      (this.rotation = new Oo()),
      (this.up = new J(0, 1, 0)),
      (this.rotation._target.onChange = () =>
        this.quaternion.fromEuler(this.rotation, !0)),
      (this.quaternion._target.onChange = () =>
        this.rotation.fromQuaternion(this.quaternion, void 0, !0)));
  }
  setParent(e, r = !0) {
    (this.parent && e !== this.parent && this.parent.removeChild(this, !1),
      (this.parent = e),
      r && e && e.addChild(this, !1));
  }
  addChild(e, r = !0) {
    (~this.children.indexOf(e) || this.children.push(e),
      r && e.setParent(this, !1));
  }
  removeChild(e, r = !0) {
    (~this.children.indexOf(e) &&
      this.children.splice(this.children.indexOf(e), 1),
      r && e.setParent(null, !1));
  }
  updateMatrixWorld(e) {
    (this.matrixAutoUpdate && this.updateMatrix(),
      (this.worldMatrixNeedsUpdate || e) &&
        (this.parent === null
          ? this.worldMatrix.copy(this.matrix)
          : this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix),
        (this.worldMatrixNeedsUpdate = !1),
        (e = !0)));
    for (let r = 0, s = this.children.length; r < s; r++)
      this.children[r].updateMatrixWorld(e);
  }
  updateMatrix() {
    (this.matrix.compose(this.quaternion, this.position, this.scale),
      (this.worldMatrixNeedsUpdate = !0));
  }
  traverse(e) {
    if (!e(this))
      for (let r = 0, s = this.children.length; r < s; r++)
        this.children[r].traverse(e);
  }
  decompose() {
    (this.matrix.decompose(this.quaternion._target, this.position, this.scale),
      this.rotation.fromQuaternion(this.quaternion));
  }
  lookAt(e, r = !1) {
    (r
      ? this.matrix.lookAt(this.position, e, this.up)
      : this.matrix.lookAt(e, this.position, this.up),
      this.matrix.getRotation(this.quaternion._target),
      this.rotation.fromQuaternion(this.quaternion));
  }
}
function Io(t, e) {
  return (
    (t[0] = e[0]),
    (t[1] = e[1]),
    (t[2] = e[2]),
    (t[3] = e[4]),
    (t[4] = e[5]),
    (t[5] = e[6]),
    (t[6] = e[8]),
    (t[7] = e[9]),
    (t[8] = e[10]),
    t
  );
}
function $o(t, e) {
  let r = e[0],
    s = e[1],
    n = e[2],
    i = e[3],
    a = r + r,
    o = s + s,
    l = n + n,
    c = r * a,
    h = s * a,
    u = s * o,
    f = n * a,
    p = n * o,
    g = n * l,
    m = i * a,
    v = i * o,
    y = i * l;
  return (
    (t[0] = 1 - u - g),
    (t[3] = h - y),
    (t[6] = f + v),
    (t[1] = h + y),
    (t[4] = 1 - c - g),
    (t[7] = p - m),
    (t[2] = f - v),
    (t[5] = p + m),
    (t[8] = 1 - c - u),
    t
  );
}
function Lo(t, e) {
  return (
    (t[0] = e[0]),
    (t[1] = e[1]),
    (t[2] = e[2]),
    (t[3] = e[3]),
    (t[4] = e[4]),
    (t[5] = e[5]),
    (t[6] = e[6]),
    (t[7] = e[7]),
    (t[8] = e[8]),
    t
  );
}
function No(t, e, r, s, n, i, a, o, l, c) {
  return (
    (t[0] = e),
    (t[1] = r),
    (t[2] = s),
    (t[3] = n),
    (t[4] = i),
    (t[5] = a),
    (t[6] = o),
    (t[7] = l),
    (t[8] = c),
    t
  );
}
function Uo(t) {
  return (
    (t[0] = 1),
    (t[1] = 0),
    (t[2] = 0),
    (t[3] = 0),
    (t[4] = 1),
    (t[5] = 0),
    (t[6] = 0),
    (t[7] = 0),
    (t[8] = 1),
    t
  );
}
function Do(t, e) {
  let r = e[0],
    s = e[1],
    n = e[2],
    i = e[3],
    a = e[4],
    o = e[5],
    l = e[6],
    c = e[7],
    h = e[8],
    u = h * a - o * c,
    f = -h * i + o * l,
    p = c * i - a * l,
    g = r * u + s * f + n * p;
  return g
    ? ((g = 1 / g),
      (t[0] = u * g),
      (t[1] = (-h * s + n * c) * g),
      (t[2] = (o * s - n * a) * g),
      (t[3] = f * g),
      (t[4] = (h * r - n * l) * g),
      (t[5] = (-o * r + n * i) * g),
      (t[6] = p * g),
      (t[7] = (-c * r + s * l) * g),
      (t[8] = (a * r - s * i) * g),
      t)
    : null;
}
function Cr(t, e, r) {
  let s = e[0],
    n = e[1],
    i = e[2],
    a = e[3],
    o = e[4],
    l = e[5],
    c = e[6],
    h = e[7],
    u = e[8],
    f = r[0],
    p = r[1],
    g = r[2],
    m = r[3],
    v = r[4],
    y = r[5],
    w = r[6],
    b = r[7],
    _ = r[8];
  return (
    (t[0] = f * s + p * a + g * c),
    (t[1] = f * n + p * o + g * h),
    (t[2] = f * i + p * l + g * u),
    (t[3] = m * s + v * a + y * c),
    (t[4] = m * n + v * o + y * h),
    (t[5] = m * i + v * l + y * u),
    (t[6] = w * s + b * a + _ * c),
    (t[7] = w * n + b * o + _ * h),
    (t[8] = w * i + b * l + _ * u),
    t
  );
}
function Mo(t, e, r) {
  let s = e[0],
    n = e[1],
    i = e[2],
    a = e[3],
    o = e[4],
    l = e[5],
    c = e[6],
    h = e[7],
    u = e[8],
    f = r[0],
    p = r[1];
  return (
    (t[0] = s),
    (t[1] = n),
    (t[2] = i),
    (t[3] = a),
    (t[4] = o),
    (t[5] = l),
    (t[6] = f * s + p * a + c),
    (t[7] = f * n + p * o + h),
    (t[8] = f * i + p * l + u),
    t
  );
}
function Bo(t, e, r) {
  let s = e[0],
    n = e[1],
    i = e[2],
    a = e[3],
    o = e[4],
    l = e[5],
    c = e[6],
    h = e[7],
    u = e[8],
    f = Math.sin(r),
    p = Math.cos(r);
  return (
    (t[0] = p * s + f * a),
    (t[1] = p * n + f * o),
    (t[2] = p * i + f * l),
    (t[3] = p * a - f * s),
    (t[4] = p * o - f * n),
    (t[5] = p * l - f * i),
    (t[6] = c),
    (t[7] = h),
    (t[8] = u),
    t
  );
}
function zo(t, e, r) {
  let s = r[0],
    n = r[1];
  return (
    (t[0] = s * e[0]),
    (t[1] = s * e[1]),
    (t[2] = s * e[2]),
    (t[3] = n * e[3]),
    (t[4] = n * e[4]),
    (t[5] = n * e[5]),
    (t[6] = e[6]),
    (t[7] = e[7]),
    (t[8] = e[8]),
    t
  );
}
function Fo(t, e) {
  let r = e[0],
    s = e[1],
    n = e[2],
    i = e[3],
    a = e[4],
    o = e[5],
    l = e[6],
    c = e[7],
    h = e[8],
    u = e[9],
    f = e[10],
    p = e[11],
    g = e[12],
    m = e[13],
    v = e[14],
    y = e[15],
    w = r * o - s * a,
    b = r * l - n * a,
    _ = r * c - i * a,
    E = s * l - n * o,
    S = s * c - i * o,
    A = n * c - i * l,
    L = h * m - u * g,
    C = h * v - f * g,
    N = h * y - p * g,
    M = u * v - f * m,
    U = u * y - p * m,
    B = f * y - p * v,
    R = w * B - b * U + _ * M + E * N - S * C + A * L;
  return R
    ? ((R = 1 / R),
      (t[0] = (o * B - l * U + c * M) * R),
      (t[1] = (l * N - a * B - c * C) * R),
      (t[2] = (a * U - o * N + c * L) * R),
      (t[3] = (n * U - s * B - i * M) * R),
      (t[4] = (r * B - n * N + i * C) * R),
      (t[5] = (s * N - r * U - i * L) * R),
      (t[6] = (m * A - v * S + y * E) * R),
      (t[7] = (v * _ - g * A - y * b) * R),
      (t[8] = (g * S - m * _ + y * w) * R),
      t)
    : null;
}
class qo extends Array {
  constructor(e = 1, r = 0, s = 0, n = 0, i = 1, a = 0, o = 0, l = 0, c = 1) {
    return (super(e, r, s, n, i, a, o, l, c), this);
  }
  set(e, r, s, n, i, a, o, l, c) {
    return e.length
      ? this.copy(e)
      : (No(this, e, r, s, n, i, a, o, l, c), this);
  }
  translate(e, r = this) {
    return (Mo(this, r, e), this);
  }
  rotate(e, r = this) {
    return (Bo(this, r, e), this);
  }
  scale(e, r = this) {
    return (zo(this, r, e), this);
  }
  multiply(e, r) {
    return (r ? Cr(this, e, r) : Cr(this, this, e), this);
  }
  identity() {
    return (Uo(this), this);
  }
  copy(e) {
    return (Lo(this, e), this);
  }
  fromMatrix4(e) {
    return (Io(this, e), this);
  }
  fromQuaternion(e) {
    return ($o(this, e), this);
  }
  fromBasis(e, r, s) {
    return (
      this.set(e[0], e[1], e[2], r[0], r[1], r[2], s[0], s[1], s[2]),
      this
    );
  }
  inverse(e = this) {
    return (Do(this, e), this);
  }
  getNormalMatrix(e) {
    return (Fo(this, e), this);
  }
}
let Wo = 0;
class Ho extends Po {
  constructor(
    e,
    {
      geometry: r,
      program: s,
      mode: n = e.TRIANGLES,
      frustumCulled: i = !0,
      renderOrder: a = 0,
    } = {},
  ) {
    (super(),
      e.canvas || console.error("gl not passed as first argument to Mesh"),
      (this.gl = e),
      (this.id = Wo++),
      (this.geometry = r),
      (this.program = s),
      (this.mode = n),
      (this.frustumCulled = i),
      (this.renderOrder = a),
      (this.modelViewMatrix = new tt()),
      (this.normalMatrix = new qo()),
      (this.beforeRenderCallbacks = []),
      (this.afterRenderCallbacks = []));
  }
  onBeforeRender(e) {
    return (this.beforeRenderCallbacks.push(e), this);
  }
  onAfterRender(e) {
    return (this.afterRenderCallbacks.push(e), this);
  }
  draw({ camera: e } = {}) {
    (e &&
      (this.program.uniforms.modelMatrix ||
        Object.assign(this.program.uniforms, {
          modelMatrix: { value: null },
          viewMatrix: { value: null },
          modelViewMatrix: { value: null },
          normalMatrix: { value: null },
          projectionMatrix: { value: null },
          cameraPosition: { value: null },
        }),
      (this.program.uniforms.projectionMatrix.value = e.projectionMatrix),
      (this.program.uniforms.cameraPosition.value = e.worldPosition),
      (this.program.uniforms.viewMatrix.value = e.viewMatrix),
      this.modelViewMatrix.multiply(e.viewMatrix, this.worldMatrix),
      this.normalMatrix.getNormalMatrix(this.modelViewMatrix),
      (this.program.uniforms.modelMatrix.value = this.worldMatrix),
      (this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix),
      (this.program.uniforms.normalMatrix.value = this.normalMatrix)),
      this.beforeRenderCallbacks.forEach(
        (s) => s && s({ mesh: this, camera: e }),
      ));
    let r = this.program.cullFace && this.worldMatrix.determinant() < 0;
    (this.program.use({ flipFaces: r }),
      this.geometry.draw({ mode: this.mode, program: this.program }),
      this.afterRenderCallbacks.forEach(
        (s) => s && s({ mesh: this, camera: e }),
      ));
  }
}
const Or = {
  black: "#000000",
  white: "#ffffff",
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff",
  fuchsia: "#ff00ff",
  cyan: "#00ffff",
  yellow: "#ffff00",
  orange: "#ff8000",
};
function Pr(t) {
  t.length === 4 && (t = t[0] + t[1] + t[1] + t[2] + t[2] + t[3] + t[3]);
  const e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
  return (
    e || console.warn(`Unable to convert hex string ${t} to rgb values`),
    [
      parseInt(e[1], 16) / 255,
      parseInt(e[2], 16) / 255,
      parseInt(e[3], 16) / 255,
    ]
  );
}
function Vo(t) {
  return (
    (t = parseInt(t)),
    [((t >> 16) & 255) / 255, ((t >> 8) & 255) / 255, (t & 255) / 255]
  );
}
function Ir(t) {
  return t === void 0
    ? [0, 0, 0]
    : arguments.length === 3
      ? arguments
      : isNaN(t)
        ? t[0] === "#"
          ? Pr(t)
          : Or[t.toLowerCase()]
            ? Pr(Or[t.toLowerCase()])
            : (console.warn("Color format not recognised"), [0, 0, 0])
        : Vo(t);
}
class $r extends Array {
  constructor(e) {
    return Array.isArray(e) ? super(...e) : super(...Ir(...arguments));
  }
  get r() {
    return this[0];
  }
  get g() {
    return this[1];
  }
  get b() {
    return this[2];
  }
  set r(e) {
    this[0] = e;
  }
  set g(e) {
    this[1] = e;
  }
  set b(e) {
    this[2] = e;
  }
  set(e) {
    return Array.isArray(e) ? this.copy(e) : this.copy(Ir(...arguments));
  }
  copy(e) {
    return ((this[0] = e[0]), (this[1] = e[1]), (this[2] = e[2]), this);
  }
}
class Go extends Ma {
  constructor(e, { attributes: r = {} } = {}) {
    (Object.assign(r, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    }),
      super(e, r));
  }
}
const Ko = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`,
  Jo = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop { vec3 color; float position; };
#define COLOR_RAMP(colors, factor, finalColor) {                 int index = 0;                                                 for (int i = 0; i < 2; i++) {                                   ColorStop currentColor = colors[i];                            bool isInBetween = currentColor.position <= factor;            index = int(mix(float(index), float(i), float(isInBetween)));   }                                                              ColorStop currentColor = colors[index];                        ColorStop nextColor = colors[index + 1];                       float range = nextColor.position - currentColor.position;      float lerpFactor = (factor - currentColor.position) / range;   finalColor = mix(currentColor.color, nextColor.color, lerpFactor); }

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  vec3 auroraColor = intensity * rampColor;
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}`;
function Xo({
  colorStops: t = ["#c8ff00", "#00e5ff", "#ff3d8b"],
  amplitude: e = 1.2,
  blend: r = 0.6,
  speed: s = 1,
  style: n,
}) {
  const i = j.useRef({ colorStops: t, amplitude: e, blend: r, speed: s });
  i.current = { colorStops: t, amplitude: e, blend: r, speed: s };
  const a = j.useRef(null);
  return (
    j.useEffect(() => {
      const o = a.current;
      if (!o) return;
      const l = new Va({ alpha: !0, premultipliedAlpha: !0, antialias: !0 }),
        c = l.gl;
      (c.clearColor(0, 0, 0, 0),
        c.enable(c.BLEND),
        c.blendFunc(c.ONE, c.ONE_MINUS_SRC_ALPHA),
        (c.canvas.style.backgroundColor = "transparent"));
      let h;
      const u = () => {
        const v = o.offsetWidth,
          y = o.offsetHeight;
        (l.setSize(v, y), h && (h.uniforms.uResolution.value = [v, y]));
      };
      window.addEventListener("resize", u);
      const f = new Go(c);
      (f.attributes.uv && delete f.attributes.uv,
        (h = new za(c, {
          vertex: Ko,
          fragment: Jo,
          uniforms: {
            uTime: { value: 0 },
            uAmplitude: { value: e },
            uColorStops: {
              value: t.map((v) => {
                const y = new $r(v);
                return [y.r, y.g, y.b];
              }),
            },
            uResolution: { value: [o.offsetWidth, o.offsetHeight] },
            uBlend: { value: r },
          },
        })));
      const p = new Ho(c, { geometry: f, program: h });
      o.appendChild(c.canvas);
      let g = 0;
      const m = (v) => {
        g = requestAnimationFrame(m);
        const y = i.current;
        h &&
          ((h.uniforms.uTime.value = v * 0.001 * (y.speed ?? 1)),
          (h.uniforms.uAmplitude.value = y.amplitude ?? 1.2),
          (h.uniforms.uBlend.value = y.blend ?? 0.6),
          (h.uniforms.uColorStops.value = (y.colorStops ?? t).map((w) => {
            const b = new $r(w);
            return [b.r, b.g, b.b];
          })),
          l.render({ scene: p }));
      };
      return (
        (g = requestAnimationFrame(m)),
        u(),
        () => {
          (cancelAnimationFrame(g),
            window.removeEventListener("resize", u),
            o && c.canvas.parentNode === o && o.removeChild(c.canvas),
            c.getExtension("WEBGL_lose_context")?.loseContext());
        }
      );
    }, []),
    d.jsx("div", {
      ref: a,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...n,
      },
    })
  );
}
const Yo = ({
  children: t,
  className: e = "",
  spotlightColor: r = "rgba(255, 255, 255, 0.12)",
  onClick: s,
  style: n,
}) => {
  const i = j.useRef(null),
    a = (o) => {
      if (!i.current) return;
      const l = i.current.getBoundingClientRect(),
        c = o.clientX - l.left,
        h = o.clientY - l.top;
      (i.current.style.setProperty("--mouse-x", `${c}px`),
        i.current.style.setProperty("--mouse-y", `${h}px`),
        i.current.style.setProperty("--spotlight-color", r));
    };
  return d.jsx("div", {
    ref: i,
    onMouseMove: a,
    onClick: s,
    className: `card-spotlight ${e}`,
    style: n,
    children: t,
  });
};
function P({
  children: t,
  className: e = "",
  colors: r = ["#5227FF", "#FF9FFC", "#B497CF"],
  animationSpeed: s = 8,
  showBorder: n = !1,
  direction: i = "horizontal",
  pauseOnHover: a = !1,
  yoyo: o = !0,
}) {
  const [l, c] = j.useState(!1),
    h = Ur(0),
    u = j.useRef(0),
    f = j.useRef(null),
    p = s * 1e3;
  (ws((_) => {
    if (l) {
      f.current = null;
      return;
    }
    if (f.current === null) {
      f.current = _;
      return;
    }
    const E = _ - f.current;
    if (((f.current = _), (u.current += E), o)) {
      const S = p * 2,
        A = u.current % S;
      h.set(A < p ? (A / p) * 100 : 100 - ((A - p) / p) * 100);
    } else h.set((u.current / p) * 100);
  }),
    j.useEffect(() => {
      ((u.current = 0), h.set(0));
    }, [s, h, o]));
  const g = bs(h, (_) => (i === "vertical" ? `50% ${_}%` : `${_}% 50%`)),
    m = j.useCallback(() => {
      a && c(!0);
    }, [a]),
    v = j.useCallback(() => {
      a && c(!1);
    }, [a]),
    y =
      i === "vertical"
        ? "to bottom"
        : i === "diagonal"
          ? "to bottom right"
          : "to right",
    w = [...r, r[0]].join(", "),
    b = {
      backgroundImage: `linear-gradient(${y}, ${w})`,
      backgroundSize:
        i === "horizontal"
          ? "300% 100%"
          : i === "vertical"
            ? "100% 300%"
            : "300% 300%",
      backgroundRepeat: "repeat",
    };
  return d.jsxs(ot.div, {
    className: `animated-gradient-text ${n ? "with-border" : ""} ${e}`,
    onMouseEnter: m,
    onMouseLeave: v,
    children: [
      n &&
        d.jsx(ot.div, {
          className: "gradient-overlay",
          style: { ...b, backgroundPosition: g },
        }),
      d.jsx(ot.div, {
        className: "text-content",
        style: { ...b, backgroundPosition: g },
        children: t,
      }),
    ],
  });
}
const ue = 1e3,
  le = [
    {
      id: "hero",
      label: "01 / INTRO",
      accent: "#c8ff00",
      headline: ["ТВОЯ", "ПОСМІШКА.", "ТВОЇ ПРАВИЛА."],
      sub: "Без нотацій. Без осуду. Просто якісна допомога.",
    },
    {
      id: "services",
      label: "02 / ПОСЛУГИ",
      accent: "#00e5ff",
      headline: ["ВИПРАВ.", "ВИРІВНЯЙ.", "ЗАБЛИЩИ."],
      sub: "Все що потрібно твоїй посмішці — в одному місці.",
    },
    {
      id: "before-after",
      label: "03 / ДО / ПІСЛЯ",
      accent: "#ff3d8b",
      headline: ["ПЕРЕТЯГНИ.", "ПОБАЧ.", "ПОВІР."],
      sub: "Реальні до/після. Реальні пацієнти.",
    },
    {
      id: "team",
      label: "04 / КОМАНДА",
      accent: "#a855f7",
      headline: ["НЕ", "СТОМАТОЛОГ", "ТВОЇХ БАТЬКІВ."],
      sub: "14 років досвіду. Нуль засуджень. Смачна кава.",
    },
    {
      id: "reviews",
      label: "05 / ВІДГУКИ",
      accent: "#c8ff00",
      headline: ["ВОНИ", "СКАЗАЛИ.", "НЕ МИ."],
      sub: "Реальні слова. Без фільтрів.",
    },
    {
      id: "tiktok",
      label: "06 / ТІКТОК",
      accent: "#ff3d8b",
      headline: ["ДИВИСЬ.", "ЯК МИ", "ЖИВЕМО."],
      sub: "Реальне життя клініки — без постановок.",
    },
    {
      id: "location",
      label: "07 / АДРЕСА",
      accent: "#00e5ff",
      headline: ["ЗНАЙДИ.", "ПРИХОДЬ.", "ВІДЧУЙ."],
      sub: "Дніпро, просп. Яворницького 22.",
    },
    {
      id: "contact",
      label: "08 / КОНТАКТ",
      accent: "#c8ff00",
      headline: ["ДОСИТЬ", "ДУМАТИ.", "ПОЧИНАЙ."],
      sub: "Перша консультація — безкоштовно.",
    },
  ],
  Lr = [
    {
      num: "01",
      name: "Вініри",
      desc: "Кастомний фарфор. 2 тижні.",
      price: "від 8 000 грн",
      color: "#c8ff00",
    },
    {
      num: "02",
      name: "Імпланти",
      desc: "Титанові корені. Назавжди.",
      price: "від 18 000 грн",
      color: "#00e5ff",
    },
    {
      num: "03",
      name: "Елайнери",
      desc: "Ніхто не помітить. Ти — відчуєш.",
      price: "від 25 000 грн",
      color: "#ff3d8b",
    },
    {
      num: "04",
      name: "Відбілювання",
      desc: "1 сеанс. 8 тонів яскравіше.",
      price: "від 3 500 грн",
      color: "#a855f7",
    },
    {
      num: "05",
      name: "Огляд",
      desc: "30 хв. Повний скан. Кава включена.",
      price: "БЕЗКОШТОВНО",
      color: "#c8ff00",
    },
    {
      num: "06",
      name: "Терміново",
      desc: "Зламаний зуб? Того ж дня.",
      price: "Телефонуй",
      color: "#00e5ff",
    },
  ],
  Zo = [
    {
      cat: "КОСМЕТИКА",
      items: [
        { name: "Порцеляновий вінір (1)", price: "від 8 000 грн" },
        { name: "Нарощення (1)", price: "від 2 500 грн" },
        { name: "Zoom-відбілювання", price: "4 500 грн" },
      ],
    },
    {
      cat: "ІМПЛАНТИ",
      items: [
        { name: "Імплант (під ключ)", price: "від 25 000 грн" },
        { name: "Коронка (кераміка)", price: "від 5 500 грн" },
        { name: "Синус-ліфтинг", price: "від 12 000 грн" },
      ],
    },
    {
      cat: "ОРТОДОНТІЯ",
      items: [
        { name: "Елайнери (повний курс)", price: "від 45 000 грн" },
        { name: "Металева брекет-система", price: "від 18 000 грн" },
        { name: "Ретейнери", price: "від 2 400 грн" },
      ],
    },
    {
      cat: "ВІДБІЛЮВАННЯ",
      items: [
        { name: "Zoom-відбілювання", price: "4 500 грн" },
        { name: "Домашнє відбілювання (каппи)", price: "від 2 800 грн" },
        { name: "Air Flow (профілактика)", price: "1 500 грн" },
      ],
    },
    {
      cat: "КОНСУЛЬТАЦІЯ",
      items: [
        { name: "Первинна консультація", price: "Безкоштовно" },
        { name: "Повторна консультація", price: "200 грн" },
        { name: "Цифровий рентген (повний)", price: "800 грн" },
      ],
    },
    {
      cat: "НЕВІДКЛАДНА ДОПОМОГА",
      items: [
        { name: "Огляд + план лікування", price: "Безкоштовно" },
        { name: "Видалення зуба", price: "від 1 200 грн" },
        { name: "Тимчасова пломба", price: "від 600 грн" },
      ],
    },
  ],
  Qo = [
    {
      initials: "АК",
      name: "Аліна К.",
      age: 24,
      color: "#c8ff00",
      text: "Побилась з бомжами та вибив зуб падла безхатня, але Валерка завезла нового клика і все зробила за 2 години, тепер я не переймаюсь за посмішку і піду знову наебашу тому пуделю",
    },
    {
      initials: "МД",
      name: "Максим Д.",
      age: 27,
      color: "#00e5ff",
      text: "Впала з БДСМ хреста та зламала зуб. Валерка все зробила швидко, без болю і нотацій.",
    },
    {
      initials: "ОС",
      name: "Олена С.",
      age: 22,
      color: "#ff3d8b",
      text: "Наебнула щебня та замість гарного відпочинку в Карпатах отримала тріщину в зубі. Валерка окрім приниження мого колишнього ще й зробила все за 1 візит, тепер я можу їсти навіть горішки.",
    },
  ],
  Nr = [
    {
      treatment: "8 вінірів",
      duration: "2 тижні",
      before: "Криві, потемнілі зуби",
      after: "Порцелянові вініри — природна білість",
      accent: "#c8ff00",
    },
    {
      treatment: "Один імплант",
      duration: "3 місяці",
      before: "Відсутній передній зуб",
      after: "Імплант із керамічною коронкою",
      accent: "#00e5ff",
    },
    {
      treatment: "Zoom-відбіл",
      duration: "1 сеанс",
      before: "Жовте забарвлення",
      after: "Яскравий рівномірний відтінок",
      accent: "#ff3d8b",
    },
  ],
  el = [
    {
      name: "Д-р Чиркова",
      title: "Лікар-стоматолог · Косметична та реставраційна стоматологія",
      years: 14,
      yearsLabel: "РОКІВ ПРАКТИКИ",
      bio: "Я відкрила клініку з однією метою: щоб пацієнти почувались дійсно почутими — а не просто зубом у конвеєрі. Кожна усмішка — це унікальна історія.",
      accent: "#ff3d8b",
      ig: "https://www.instagram.com/mad__dentist/",
      tiktok: "https://www.tiktok.com/@mad__dentist",
    },
    {
      name: "Д-р Мельник",
      title: "Ортодонт · Елайнери та брекет-системи",
      years: 9,
      yearsLabel: "РОКІВ ПРАКТИКИ",
      bio: "Спеціалізується на ортодонтичному лікуванні з використанням сучасних елайнерів та цифрового планування. Понад 800 завершених ортодонтичних випадків.",
      accent: "#a855f7",
      ig: "https://www.instagram.com/mad__dentist/",
      tiktok: "https://www.tiktok.com/@mad__dentist",
    },
  ],
  tl = [
    { id: "7643038472294386965", caption: "Half Price у Дніпрі" },
    { id: "7584496719946173708", caption: "Пацієнт незадоволений 😳" },
  ],
  rl = "@mad__dentist",
  sl = "https://www.tiktok.com/@mad__dentist";
function nl(t, e) {
  const r = (e - t * ue) / ue;
  if (r < -0.35 || r >= 1)
    return { opacity: 0, pointerEvents: "none", transform: "translateY(0)" };
  let s = 1,
    n = 0;
  return (
    r < 0
      ? ((s = (r + 0.35) / 0.35), (n = 50 * (1 - s)))
      : r < 0.65
        ? ((s = 1), (n = -r * 24))
        : ((s = 1 - (r - 0.65) / 0.35), (n = -r * 24)),
    {
      opacity: Math.max(0, Math.min(1, s)),
      transform: `translateY(${n}px)`,
      pointerEvents: s > 0.1 ? "auto" : "none",
    }
  );
}
function Q(t, e, r, s, n, i, a) {
  const o = t - e * ue;
  return {
    position: "absolute",
    left: s,
    top: n,
    width: i,
    height: i,
    border: `1.5px solid ${a}`,
    borderRadius: "50%",
    opacity: 0.18,
    transform: `translateY(${o * r}px)`,
    pointerEvents: "none",
  };
}
function il() {
  const [t, e] = j.useState(typeof window < "u" ? window.innerWidth < 768 : !1);
  return (
    j.useEffect(() => {
      const r = () => e(window.innerWidth < 768);
      return (
        window.addEventListener("resize", r),
        () => window.removeEventListener("resize", r)
      );
    }, []),
    t
  );
}
function al({ scrollY: t, isMobile: e }) {
  const r = { fontFamily: "'Syne', sans-serif" },
    s = { fontFamily: "'Space Grotesk', sans-serif" };
  return d.jsxs("div", {
    style: {
      position: "relative",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: e ? 18 : 32,
    },
    children: [
      d.jsx("div", { style: Q(t, 0, -0.06, "8%", "15%", 180, "#c8ff00") }),
      d.jsx("div", { style: Q(t, 0, 0.08, "78%", "10%", 120, "#00e5ff") }),
      d.jsx("div", { style: Q(t, 0, -0.04, "85%", "65%", 260, "#ff3d8b") }),
      d.jsx("div", { style: Q(t, 0, 0.05, "2%", "70%", 90, "#a855f7") }),
      d.jsx("div", {
        children: d.jsxs("div", {
          style: {
            fontSize: "clamp(52px,8vw,96px)",
            fontWeight: 800,
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            ...r,
          },
          children: [
            d.jsx(P, {
              colors: ["#c8ff00", "#00e5ff", "#c8ff00"],
              animationSpeed: 4,
              className: "scene-hl",
              children: "ТВОЯ",
            }),
            d.jsx(P, {
              colors: ["#f0f0f0", "#c8ff00", "#f0f0f0"],
              animationSpeed: 7,
              className: "scene-hl",
              children: "ПОСМІШКА.",
            }),
            d.jsx(P, {
              colors: ["#f0f0f0", "#00e5ff", "#f0f0f0"],
              animationSpeed: 9,
              className: "scene-hl",
              children: "ТВОЇ ПРАВИЛА.",
            }),
          ],
        }),
      }),
      d.jsx("p", {
        style: {
          fontSize: 15,
          color: "rgba(240,240,240,0.55)",
          maxWidth: 380,
          lineHeight: 1.65,
          ...s,
        },
        children:
          "Без нотацій. Без осуду. Просто якісна допомога — і справді хороша кава.",
      }),
      d.jsx("a", {
        href: "#contact",
        style: {
          display: e ? "block" : "inline-block",
          background: "#c8ff00",
          color: "#0a0a0a",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          padding: "14px 36px",
          borderRadius: 2,
          textDecoration: "none",
          textAlign: "center",
          ...r,
        },
        children: "Записатись безкоштовно →",
      }),
      d.jsx("div", {
        style: {
          display: "flex",
          gap: e ? 24 : 48,
          marginTop: 8,
          flexWrap: "wrap",
          justifyContent: "center",
        },
        children: [
          ["2400+", "Щасливих посмішок"],
          ["98%", "Повертаються знову"],
          ["4.9", "Google рейтинг"],
        ].map(([n, i]) =>
          d.jsxs(
            "div",
            {
              style: { textAlign: "center" },
              children: [
                d.jsx("div", {
                  style: {
                    fontSize: "clamp(28px,4vw,42px)",
                    fontWeight: 700,
                    color: "#c8ff00",
                    letterSpacing: "-0.02em",
                    ...r,
                  },
                  children: n,
                }),
                d.jsx("div", {
                  style: {
                    fontSize: 9,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginTop: 4,
                    ...s,
                  },
                  children: i,
                }),
              ],
            },
            i,
          ),
        ),
      }),
    ],
  });
}
function ol({ scrollY: t, isMobile: e }) {
  const r = { fontFamily: "'Syne', sans-serif" },
    s = { fontFamily: "'Space Grotesk', sans-serif" },
    [n, i] = j.useState(null),
    a = n !== null ? Lr[n] : null,
    o = n !== null ? Zo[n] : null;
  return d.jsxs("div", {
    style: {
      width: "100%",
      maxWidth: 1e3,
      display: "grid",
      gridTemplateColumns: e ? "1fr" : "320px 1fr",
      gap: e ? 20 : 64,
      alignItems: "center",
      position: "relative",
    },
    children: [
      d.jsxs("div", {
        children: [
          d.jsx("div", {
            style: Q(t, 1, -0.05, "-10%", "20%", 160, "#00e5ff"),
          }),
          d.jsxs("div", {
            style: {
              fontSize: "clamp(42px,5.5vw,68px)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              ...r,
            },
            children: [
              d.jsx(P, {
                colors: ["#00e5ff", "#0066ff", "#00e5ff"],
                animationSpeed: 4,
                className: "scene-hl",
                children: "ВИПРАВ.",
              }),
              d.jsx(P, {
                colors: ["#f0f0f0", "#00e5ff", "#f0f0f0"],
                animationSpeed: 7,
                className: "scene-hl",
                children: "ВИРІВНЯЙ.",
              }),
              d.jsx(P, {
                colors: ["#f0f0f0", "#0066ff", "#f0f0f0"],
                animationSpeed: 9,
                className: "scene-hl",
                children: "ЗАБЛИЩИ.",
              }),
            ],
          }),
          d.jsx("p", {
            style: {
              marginTop: 20,
              fontSize: 14,
              color: "rgba(240,240,240,0.45)",
              lineHeight: 1.7,
              ...s,
            },
            children: "Все що потрібно твоїй посмішці — в одному місці.",
          }),
          d.jsx("p", {
            style: {
              marginTop: 10,
              fontSize: 9,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              ...s,
            },
            children: "Натисни на картку — дивись ціни",
          }),
        ],
      }),
      d.jsx("div", {
        style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
        children: Lr.map((l, c) =>
          d.jsxs(
            Yo,
            {
              spotlightColor: `${l.color}28`,
              onClick: () => i(n === c ? null : c),
              style: {
                padding: "18px 20px",
                cursor: "pointer",
                transition: "border-color 0.2s, box-shadow 0.2s",
                borderColor: n === c ? l.color : "rgba(255,255,255,0.07)",
                boxShadow: n === c ? `0 0 18px ${l.color}30` : "none",
              },
              children: [
                d.jsx("div", {
                  style: {
                    fontSize: 9,
                    color: l.color,
                    letterSpacing: "0.18em",
                    marginBottom: 8,
                    ...r,
                  },
                  children: l.num,
                }),
                d.jsx("div", {
                  style: {
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#f0f0f0",
                    marginBottom: 4,
                    ...r,
                  },
                  children: l.name,
                }),
                d.jsx("div", {
                  style: {
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: 8,
                    ...s,
                  },
                  children: l.desc,
                }),
                d.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                  children: [
                    d.jsx("div", {
                      style: {
                        fontSize: 10,
                        color: l.color,
                        letterSpacing: "0.06em",
                        ...s,
                      },
                      children: l.price,
                    }),
                    d.jsx("div", {
                      style: {
                        fontSize: 9,
                        color: n === c ? l.color : "rgba(255,255,255,0.2)",
                        transition: "color 0.2s",
                        ...s,
                      },
                      children: n === c ? "▲ згорнути" : "▼ ціни",
                    }),
                  ],
                }),
              ],
            },
            l.num,
          ),
        ),
      }),
      a &&
        o &&
        d.jsxs("div", {
          style: {
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          },
          children: [
            d.jsx("div", {
              onClick: () => i(null),
              style: {
                pointerEvents: "auto",
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
              },
            }),
            d.jsxs("div", {
              style: {
                pointerEvents: "auto",
                position: "relative",
                zIndex: 1,
                background: "#0e0e12",
                border: `1px solid ${a.color}40`,
                borderRadius: 8,
                padding: "28px 32px",
                minWidth: e ? "unset" : 340,
                width: e ? "calc(100% - 32px)" : void 0,
                boxShadow: `0 0 40px ${a.color}25`,
              },
              children: [
                d.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  },
                  children: [
                    d.jsxs("div", {
                      children: [
                        d.jsxs("div", {
                          style: {
                            fontSize: 9,
                            color: a.color,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            marginBottom: 4,
                            ...s,
                          },
                          children: [a.num, " / ", a.name],
                        }),
                        d.jsx("div", {
                          style: {
                            fontSize: 11,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.45)",
                            ...s,
                          },
                          children: o.cat,
                        }),
                      ],
                    }),
                    d.jsx("button", {
                      onClick: () => i(null),
                      style: {
                        background: "none",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.4)",
                        width: 28,
                        height: 28,
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 13,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      children: "×",
                    }),
                  ],
                }),
                d.jsx("div", {
                  style: {
                    borderTop: `1px solid ${a.color}25`,
                    paddingTop: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  },
                  children: o.items.map((l, c) =>
                    d.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          alignItems: "baseline",
                          gap: 8,
                          fontSize: 13,
                        },
                        children: [
                          d.jsx("span", {
                            style: { color: "rgba(255,255,255,0.75)", ...s },
                            children: l.name,
                          }),
                          d.jsx("span", {
                            style: {
                              flex: 1,
                              borderBottom: `1px dotted ${a.color}30`,
                              marginBottom: 3,
                            },
                          }),
                          d.jsx("span", {
                            style: {
                              color: a.color,
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                              ...s,
                            },
                            children: l.price,
                          }),
                        ],
                      },
                      c,
                    ),
                  ),
                }),
                d.jsx("div", {
                  style: {
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.1em",
                    textAlign: "center",
                    ...s,
                  },
                  children:
                    "Точну вартість уточнює лікар на консультації — вона безкоштовна",
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
function ll({ c: t }) {
  const [e, r] = j.useState(50),
    s = j.useRef(null),
    n = j.useRef(!1),
    i = j.useCallback((a) => {
      if (!s.current) return;
      const o = s.current.getBoundingClientRect();
      r(Math.max(0, Math.min(100, ((a - o.left) / o.width) * 100)));
    }, []);
  return (
    j.useEffect(() => {
      const a = (l) => {
          n.current && i("touches" in l ? l.touches[0].clientX : l.clientX);
        },
        o = () => {
          n.current = !1;
        };
      return (
        window.addEventListener("mousemove", a),
        window.addEventListener("mouseup", o),
        window.addEventListener("touchmove", a, { passive: !0 }),
        window.addEventListener("touchend", o),
        () => {
          (window.removeEventListener("mousemove", a),
            window.removeEventListener("mouseup", o),
            window.removeEventListener("touchmove", a),
            window.removeEventListener("touchend", o));
        }
      );
    }, [i]),
    d.jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        flex: "1 1 0",
      },
      children: [
        d.jsxs("div", {
          ref: s,
          onMouseDown: (a) => {
            ((n.current = !0), i(a.clientX));
          },
          onTouchStart: (a) => {
            ((n.current = !0), i(a.touches[0].clientX));
          },
          style: {
            position: "relative",
            width: "100%",
            aspectRatio: "3/4",
            overflow: "hidden",
            cursor: "ew-resize",
            userSelect: "none",
            borderRadius: 4,
            border: "1px solid rgba(255,255,255,0.08)",
            touchAction: "none",
          },
          children: [
            d.jsx("div", {
              style: {
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg,#1e141f,#0f0a14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              children: d.jsx("div", {
                style: {
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 36,
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.04)",
                  userSelect: "none",
                  letterSpacing: "-0.02em",
                },
                children: "Before",
              }),
            }),
            d.jsx("div", {
              style: {
                position: "absolute",
                inset: 0,
                clipPath: `inset(0 0 0 ${e}%)`,
              },
              children: d.jsx("div", {
                style: {
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(135deg,${t.accent}14,#1a0f20)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                children: d.jsx("div", {
                  style: {
                    fontFamily: "'Syne',sans-serif",
                    fontSize: 36,
                    fontWeight: 800,
                    color: `${t.accent}12`,
                    userSelect: "none",
                    letterSpacing: "-0.02em",
                  },
                  children: "After",
                }),
              }),
            }),
            d.jsx("div", {
              style: {
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${e}%`,
                transform: "translateX(-50%)",
                width: 1.5,
                background: t.accent,
                zIndex: 10,
                pointerEvents: "none",
              },
              children: d.jsx("div", {
                style: {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: t.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 20px ${t.accent}88`,
                },
                children: d.jsxs("svg", {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 20 20",
                  fill: "none",
                  children: [
                    d.jsx("path", {
                      d: "M7 4L3 10L7 16",
                      stroke: "#0a0a0a",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    }),
                    d.jsx("path", {
                      d: "M13 4L17 10L13 16",
                      stroke: "#0a0a0a",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    }),
                  ],
                }),
              }),
            }),
            d.jsx("div", {
              style: {
                position: "absolute",
                top: 8,
                left: 10,
                fontSize: 8,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                zIndex: 5,
                fontFamily: "'Space Grotesk',sans-serif",
              },
              children: "BEFORE",
            }),
            d.jsx("div", {
              style: {
                position: "absolute",
                top: 8,
                right: 10,
                fontSize: 8,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: t.accent,
                opacity: 0.8,
                zIndex: 5,
                fontFamily: "'Space Grotesk',sans-serif",
              },
              children: "AFTER",
            }),
          ],
        }),
        d.jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          },
          children: [
            d.jsx("span", {
              style: {
                fontSize: 10,
                color: "rgba(240,240,240,0.5)",
                fontFamily: "'Space Grotesk',sans-serif",
              },
              children: t.treatment,
            }),
            d.jsx("span", {
              style: {
                fontSize: 10,
                color: t.accent,
                letterSpacing: "0.06em",
                fontFamily: "'Space Grotesk',sans-serif",
              },
              children: t.duration,
            }),
          ],
        }),
        d.jsxs("div", {
          style: { display: "flex", justifyContent: "space-between", gap: 8 },
          children: [
            d.jsx("span", {
              style: {
                fontSize: 10,
                color: "rgba(255,255,255,0.22)",
                fontFamily: "'Space Grotesk',sans-serif",
              },
              children: t.before,
            }),
            d.jsx("span", {
              style: {
                fontSize: 10,
                color: "rgba(240,240,240,0.5)",
                textAlign: "right",
                fontFamily: "'Space Grotesk',sans-serif",
              },
              children: t.after,
            }),
          ],
        }),
      ],
    })
  );
}
function cl({ scrollY: t, isMobile: e }) {
  const r = { fontFamily: "'Syne', sans-serif" },
    s = { fontFamily: "'Space Grotesk', sans-serif" };
  return d.jsxs("div", {
    style: {
      width: "100%",
      maxWidth: 1020,
      display: "grid",
      gridTemplateColumns: e ? "1fr" : "230px 1fr",
      gap: e ? 16 : 56,
      alignItems: "center",
    },
    children: [
      d.jsxs("div", {
        children: [
          d.jsx("div", { style: Q(t, 2, 0.06, "-5%", "60%", 200, "#ff3d8b") }),
          d.jsxs("div", {
            style: {
              fontSize: "clamp(36px,5vw,56px)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              ...r,
            },
            children: [
              d.jsx(P, {
                colors: ["#ff3d8b", "#ff8c00", "#ff3d8b"],
                animationSpeed: 4,
                className: "scene-hl",
                children: "ПЕРЕТЯГНИ.",
              }),
              d.jsx(P, {
                colors: ["#f0f0f0", "#ff3d8b", "#f0f0f0"],
                animationSpeed: 7,
                className: "scene-hl",
                children: "ПОБАЧ.",
              }),
              d.jsx(P, {
                colors: ["#ff8c00", "#ff3d8b", "#ff8c00"],
                animationSpeed: 5,
                className: "scene-hl",
                children: "ПОВІР.",
              }),
            ],
          }),
          d.jsx("p", {
            style: {
              marginTop: 20,
              fontSize: 13,
              color: "rgba(240,240,240,0.4)",
              lineHeight: 1.7,
              ...s,
            },
            children:
              "Реальні до/після. Реальні пацієнти. Кожен випадок — правда.",
          }),
          d.jsxs("div", {
            style: {
              marginTop: 24,
              fontSize: 9,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              ...s,
            },
            children: [Nr.length, " кейси · перетягни повзунок"],
          }),
        ],
      }),
      d.jsx("div", {
        style: { display: "flex", gap: 14, alignItems: "stretch" },
        children: Nr.filter((n, i) => !e || i < 2).map((n, i) =>
          d.jsx(ll, { c: n }, i),
        ),
      }),
    ],
  });
}
function hl({ scrollY: t, isMobile: e }) {
  const r = { fontFamily: "'Syne', sans-serif" },
    s = { fontFamily: "'Space Grotesk', sans-serif" };
  return d.jsxs("div", {
    style: {
      width: "100%",
      maxWidth: 860,
      display: "flex",
      flexDirection: "column",
      gap: 28,
      alignItems: "center",
    },
    children: [
      d.jsxs("div", {
        style: { textAlign: "center", position: "relative" },
        children: [
          d.jsx("div", { style: Q(t, 3, -0.07, "70%", "5%", 300, "#a855f7") }),
          d.jsx("div", {
            style: {
              fontSize: 9,
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 10,
              ...s,
            },
            children: "НАША КОМАНДА",
          }),
          d.jsxs("div", {
            style: {
              fontSize: "clamp(30px,4vw,48px)",
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              ...r,
            },
            children: [
              d.jsx(P, {
                colors: ["#f0f0f0", "#a855f7", "#f0f0f0"],
                animationSpeed: 5,
                className: "scene-hl",
                children: "НЕ СТОМАТОЛОГ",
              }),
              d.jsx(P, {
                colors: ["#a855f7", "#ff3d8b", "#a855f7"],
                animationSpeed: 4,
                className: "scene-hl",
                children: "ТВОЇХ БАТЬКІВ.",
              }),
            ],
          }),
        ],
      }),
      d.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: e ? "1fr" : "1fr 1fr",
          gap: 18,
          width: "100%",
        },
        children: el
          .filter((n, i) => !e || i === 0)
          .map((n, i) =>
            d.jsxs(
              "div",
              {
                style: {
                  padding: e ? "16px 16px" : "24px 22px",
                  border: `1px solid ${n.accent}28`,
                  borderRadius: 4,
                  background: `${n.accent}08`,
                  display: "flex",
                  flexDirection: "column",
                  gap: e ? 10 : 14,
                },
                children: [
                  d.jsxs("div", {
                    style: {
                      position: "relative",
                      width: "100%",
                      aspectRatio: e ? "16/7" : "16/9",
                      background: `linear-gradient(135deg,${n.accent}18,#100c18)`,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    },
                    children: [
                      d.jsx("div", {
                        style: {
                          fontFamily: "'Syne',sans-serif",
                          fontSize: 22,
                          fontWeight: 800,
                          color: `${n.accent}20`,
                          textTransform: "uppercase",
                          letterSpacing: "-0.02em",
                          textAlign: "center",
                          userSelect: "none",
                        },
                        children: n.name,
                      }),
                      d.jsxs("div", {
                        style: {
                          position: "absolute",
                          bottom: 8,
                          right: 8,
                          background: n.accent,
                          color: "#0a0a0a",
                          padding: "7px 11px",
                          borderRadius: 2,
                          textAlign: "center",
                        },
                        children: [
                          d.jsx("div", {
                            style: {
                              fontFamily: "'Syne',sans-serif",
                              fontSize: 20,
                              fontWeight: 800,
                              lineHeight: 1,
                            },
                            children: n.years,
                          }),
                          d.jsx("div", {
                            style: {
                              fontSize: 7,
                              letterSpacing: "0.1em",
                              fontFamily: "'Space Grotesk',sans-serif",
                              marginTop: 2,
                            },
                            children: n.yearsLabel,
                          }),
                        ],
                      }),
                    ],
                  }),
                  d.jsxs("div", {
                    children: [
                      d.jsx("div", {
                        style: {
                          fontSize: 17,
                          fontWeight: 700,
                          color: "#f0f0f0",
                          marginBottom: 3,
                          ...r,
                        },
                        children: n.name,
                      }),
                      d.jsx("div", {
                        style: {
                          fontSize: 8,
                          color: n.accent,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          ...s,
                        },
                        children: n.title,
                      }),
                    ],
                  }),
                  d.jsx("p", {
                    style: {
                      fontSize: 12,
                      color: "rgba(240,240,240,0.45)",
                      lineHeight: 1.75,
                      margin: 0,
                      ...s,
                    },
                    children: n.bio,
                  }),
                  d.jsxs("div", {
                    style: { display: "flex", gap: 8, marginTop: "auto" },
                    children: [
                      d.jsxs("a", {
                        href: n.ig,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        style: {
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          padding: "9px",
                          background:
                            "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                          borderRadius: 2,
                          textDecoration: "none",
                          fontSize: 9,
                          color: "#fff",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          ...s,
                        },
                        children: [
                          d.jsx("svg", {
                            width: "11",
                            height: "11",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            children: d.jsx("path", {
                              d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                            }),
                          }),
                          "Instagram",
                        ],
                      }),
                      d.jsxs("a", {
                        href: n.tiktok,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        style: {
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          padding: "9px",
                          background: "rgba(255,255,255,0.04)",
                          border: `1px solid ${n.accent}44`,
                          borderRadius: 2,
                          textDecoration: "none",
                          fontSize: 9,
                          color: n.accent,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          ...s,
                        },
                        children: [
                          d.jsx("svg", {
                            width: "11",
                            height: "11",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            children: d.jsx("path", {
                              d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z",
                            }),
                          }),
                          "TikTok",
                        ],
                      }),
                    ],
                  }),
                ],
              },
              i,
            ),
          ),
      }),
    ],
  });
}
function ul({ scrollY: t, isMobile: e }) {
  const r = { fontFamily: "'Syne', sans-serif" },
    s = { fontFamily: "'Space Grotesk', sans-serif" };
  return d.jsxs("div", {
    style: { width: "100%", maxWidth: 1e3 },
    children: [
      d.jsx("div", { style: Q(t, 4, 0.05, "90%", "15%", 140, "#c8ff00") }),
      d.jsxs("div", {
        style: { marginBottom: 40, textAlign: "center" },
        children: [
          d.jsxs("div", {
            style: {
              fontSize: "clamp(38px,5vw,62px)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              ...r,
            },
            children: [
              d.jsx(P, {
                colors: ["#f0f0f0", "#c8ff00", "#f0f0f0"],
                animationSpeed: 6,
                className: "scene-hl",
                children: "ВОНИ СКАЗАЛИ.",
              }),
              d.jsx(P, {
                colors: ["#c8ff00", "#a855f7", "#c8ff00"],
                animationSpeed: 4,
                className: "scene-hl",
                children: "НЕ МИ.",
              }),
            ],
          }),
          d.jsx("p", {
            style: {
              marginTop: 12,
              fontSize: 13,
              color: "rgba(240,240,240,0.4)",
              ...s,
            },
            children: "Реальні слова. Без фільтрів.",
          }),
        ],
      }),
      d.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: e ? "1fr" : "repeat(3, 1fr)",
          gap: e ? 8 : 16,
        },
        children: Qo.filter((n, i) => !e || i < 2).map((n) =>
          d.jsxs(
            "div",
            {
              style: {
                padding: e ? "16px 16px" : "28px 24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                gap: e ? 12 : 20,
              },
              children: [
                d.jsxs("div", {
                  style: {
                    fontSize: 13,
                    color: "rgba(240,240,240,0.7)",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    ...s,
                  },
                  children: ['"', n.text, '"'],
                }),
                d.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginTop: "auto",
                  },
                  children: [
                    d.jsx("div", {
                      style: {
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: n.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#0a0a0a",
                        flexShrink: 0,
                        ...r,
                      },
                      children: n.initials,
                    }),
                    d.jsxs("div", {
                      children: [
                        d.jsx("div", {
                          style: {
                            fontSize: 12,
                            color: "#f0f0f0",
                            fontWeight: 500,
                            ...s,
                          },
                          children: n.name,
                        }),
                        d.jsxs("div", {
                          style: {
                            fontSize: 10,
                            color: "rgba(255,255,255,0.3)",
                            ...s,
                          },
                          children: [n.age, " років"],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            },
            n.initials,
          ),
        ),
      }),
    ],
  });
}
const dl = [
  { id: "DWeVhTFDYC3", caption: "Zoom відбілювання — 8 тонів за 1 сеанс ✨" },
  { id: "DYFoSO5tuGD", caption: "Вініри за 2 тижні — кастомний фарфор 🦷" },
];
function fl({ scrollY: t, isMobile: e }) {
  const [r, s] = j.useState(0),
    n = { fontFamily: "'Syne', sans-serif" },
    i = { fontFamily: "'Space Grotesk', sans-serif" },
    a = d.jsx("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      children: d.jsx("path", {
        d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z",
      }),
    }),
    o = d.jsx("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      children: d.jsx("path", {
        d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
      }),
    });
  return d.jsxs("div", {
    style: {
      width: "100%",
      maxWidth: 1e3,
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    children: [
      d.jsx("div", {
        style: { display: "flex", gap: 4, alignSelf: "flex-start" },
        children: [
          { label: "TikTok", icon: a, color: "#ff3d8b" },
          { label: "Instagram", icon: o, color: "#e1306c" },
        ].map((l, c) =>
          d.jsxs(
            "button",
            {
              onClick: () => s(c),
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 16px",
                borderRadius: 2,
                border: "none",
                cursor: "pointer",
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                background: r === c ? l.color : "rgba(255,255,255,0.06)",
                color: r === c ? "#0a0a0a" : "rgba(255,255,255,0.4)",
                transition: "all 0.2s",
              },
              children: [l.icon, l.label],
            },
            c,
          ),
        ),
      }),
      d.jsx("div", {
        style: { overflow: "hidden" },
        children: d.jsxs("div", {
          style: {
            display: "flex",
            transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
            transform: `translateX(${-r * 100}%)`,
          },
          children: [
            d.jsxs("div", {
              style: {
                minWidth: "100%",
                display: "grid",
                gridTemplateColumns: e ? "1fr" : "260px 1fr",
                gap: e ? 18 : 56,
                alignItems: "center",
              },
              children: [
                d.jsxs("div", {
                  children: [
                    d.jsx("div", {
                      style: Q(t, 5, -0.05, "-8%", "20%", 160, "#ff3d8b"),
                    }),
                    d.jsx("div", {
                      style: Q(t, 5, 0.07, "95%", "70%", 100, "#00e5ff"),
                    }),
                    d.jsxs("div", {
                      style: {
                        marginBottom: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      },
                      children: [
                        d.jsx("svg", {
                          width: "22",
                          height: "22",
                          viewBox: "0 0 24 24",
                          fill: "#ff3d8b",
                          children: d.jsx("path", {
                            d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z",
                          }),
                        }),
                        d.jsx("span", {
                          style: {
                            fontSize: 10,
                            color: "rgba(255,255,255,0.3)",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            ...i,
                          },
                          children: "TikTok",
                        }),
                      ],
                    }),
                    d.jsxs("div", {
                      style: {
                        fontSize: "clamp(40px,5.5vw,68px)",
                        fontWeight: 800,
                        lineHeight: 0.88,
                        letterSpacing: "-0.03em",
                        textTransform: "uppercase",
                        ...n,
                      },
                      children: [
                        d.jsx(P, {
                          colors: ["#ff3d8b", "#ff69b4", "#ff3d8b"],
                          animationSpeed: 3,
                          className: "scene-hl",
                          children: "ДИВИСЬ.",
                        }),
                        d.jsx(P, {
                          colors: ["#f0f0f0", "#ff3d8b", "#f0f0f0"],
                          animationSpeed: 6,
                          className: "scene-hl",
                          children: "ЯК МИ",
                        }),
                        d.jsx(P, {
                          colors: ["#f0f0f0", "#00e5ff", "#f0f0f0"],
                          animationSpeed: 8,
                          className: "scene-hl",
                          children: "ЖИВЕМО.",
                        }),
                      ],
                    }),
                    d.jsx("p", {
                      style: {
                        marginTop: 18,
                        fontSize: 13,
                        color: "rgba(240,240,240,0.45)",
                        lineHeight: 1.7,
                        ...i,
                      },
                      children:
                        "Реальне життя клініки без постановок і фільтрів — підписуйся.",
                    }),
                    d.jsx("div", {
                      style: {
                        marginTop: 20,
                        display: "flex",
                        gap: 24,
                        paddingTop: 16,
                        borderTop: "1px solid rgba(255,61,139,0.2)",
                      },
                      children: [
                        ["6 800+", "Підписників"],
                        ["249", "Відео"],
                      ].map(([l, c]) =>
                        d.jsxs(
                          "div",
                          {
                            children: [
                              d.jsx("div", {
                                style: {
                                  fontSize: 22,
                                  fontWeight: 800,
                                  color: "#ff3d8b",
                                  letterSpacing: "-0.02em",
                                  ...n,
                                },
                                children: l,
                              }),
                              d.jsx("div", {
                                style: {
                                  fontSize: 8,
                                  color: "rgba(255,255,255,0.28)",
                                  letterSpacing: "0.14em",
                                  textTransform: "uppercase",
                                  marginTop: 3,
                                  ...i,
                                },
                                children: c,
                              }),
                            ],
                          },
                          c,
                        ),
                      ),
                    }),
                    d.jsxs("a", {
                      href: sl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      style: {
                        marginTop: 20,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#ff3d8b",
                        color: "#0a0a0a",
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        padding: "12px 22px",
                        borderRadius: 2,
                        textDecoration: "none",
                        ...n,
                      },
                      children: [
                        d.jsx("svg", {
                          width: "11",
                          height: "11",
                          viewBox: "0 0 24 24",
                          fill: "currentColor",
                          children: d.jsx("path", {
                            d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z",
                          }),
                        }),
                        rl,
                        " →",
                      ],
                    }),
                  ],
                }),
                d.jsx("div", {
                  style: {
                    display: "flex",
                    gap: 14,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  },
                  children: tl
                    .filter((l, c) => !e || c === 0)
                    .map((l, c) =>
                      d.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            flex: "1 1 0",
                            maxWidth: e ? 240 : 210,
                            marginTop: !e && c === 1 ? 28 : 0,
                          },
                          children: [
                            d.jsx("div", {
                              style: {
                                position: "relative",
                                width: "100%",
                                aspectRatio: "9/16",
                                maxHeight: e ? 220 : "unset",
                                borderRadius: 8,
                                overflow: "hidden",
                                background: "#111",
                                border: `1px solid ${c === 0 ? "rgba(255,61,139,0.3)" : "rgba(0,229,255,0.2)"}`,
                                boxShadow:
                                  c === 0
                                    ? "0 8px 40px rgba(255,61,139,0.2)"
                                    : "0 8px 40px rgba(0,229,255,0.12)",
                              },
                              children: d.jsx("iframe", {
                                src: `https://www.tiktok.com/embed/v2/${l.id}`,
                                title: l.caption,
                                allow:
                                  "autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                allowFullScreen: !0,
                                style: {
                                  position: "absolute",
                                  inset: 0,
                                  width: "100%",
                                  height: "100%",
                                  border: "none",
                                },
                              }),
                            }),
                            d.jsx("div", {
                              style: {
                                fontSize: 10,
                                color: "rgba(240,240,240,0.4)",
                                textAlign: "center",
                                ...i,
                              },
                              children: l.caption,
                            }),
                          ],
                        },
                        l.id,
                      ),
                    ),
                }),
              ],
            }),
            d.jsxs("div", {
              style: {
                minWidth: "100%",
                display: "grid",
                gridTemplateColumns: e ? "1fr" : "260px 1fr",
                gap: e ? 18 : 56,
                alignItems: "center",
              },
              children: [
                d.jsxs("div", {
                  children: [
                    d.jsxs("div", {
                      style: {
                        marginBottom: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      },
                      children: [
                        d.jsx("div", {
                          style: {
                            width: 22,
                            height: 22,
                            borderRadius: 6,
                            background:
                              "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                          children: d.jsx("svg", {
                            width: "13",
                            height: "13",
                            viewBox: "0 0 24 24",
                            fill: "#fff",
                            children: d.jsx("path", {
                              d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                            }),
                          }),
                        }),
                        d.jsx("span", {
                          style: {
                            fontSize: 10,
                            color: "rgba(255,255,255,0.3)",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            ...i,
                          },
                          children: "Instagram",
                        }),
                      ],
                    }),
                    d.jsxs("div", {
                      style: {
                        fontSize: "clamp(38px,5vw,62px)",
                        fontWeight: 800,
                        lineHeight: 0.88,
                        letterSpacing: "-0.03em",
                        textTransform: "uppercase",
                        ...n,
                      },
                      children: [
                        d.jsx(P, {
                          colors: ["#f09433", "#dc2743", "#bc1888", "#f09433"],
                          animationSpeed: 3,
                          className: "scene-hl",
                          children: "ПІДПИШИСЬ.",
                        }),
                        d.jsx(P, {
                          colors: ["#f0f0f0", "#dc2743", "#f0f0f0"],
                          animationSpeed: 6,
                          className: "scene-hl",
                          children: "СЛІДКУЙ.",
                        }),
                        d.jsx(P, {
                          colors: ["#f0f0f0", "#bc1888", "#f0f0f0"],
                          animationSpeed: 8,
                          className: "scene-hl",
                          children: "ВІДЧУЙ.",
                        }),
                      ],
                    }),
                    d.jsx("p", {
                      style: {
                        marginTop: 18,
                        fontSize: 13,
                        color: "rgba(240,240,240,0.45)",
                        lineHeight: 1.7,
                        ...i,
                      },
                      children:
                        "Щоденне життя клініки, результати, команда — все тут.",
                    }),
                    d.jsx("div", {
                      style: {
                        marginTop: 20,
                        display: "flex",
                        gap: 24,
                        paddingTop: 16,
                        borderTop: "1px solid rgba(225,48,108,0.2)",
                      },
                      children: [
                        ["6 800+", "Підписників"],
                        ["249", "Публікацій"],
                      ].map(([l, c]) =>
                        d.jsxs(
                          "div",
                          {
                            children: [
                              d.jsx("div", {
                                style: {
                                  fontSize: 22,
                                  fontWeight: 800,
                                  background:
                                    "linear-gradient(135deg,#f09433,#e1306c)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  letterSpacing: "-0.02em",
                                  ...n,
                                },
                                children: l,
                              }),
                              d.jsx("div", {
                                style: {
                                  fontSize: 8,
                                  color: "rgba(255,255,255,0.28)",
                                  letterSpacing: "0.14em",
                                  textTransform: "uppercase",
                                  marginTop: 3,
                                  ...i,
                                },
                                children: c,
                              }),
                            ],
                          },
                          c,
                        ),
                      ),
                    }),
                    d.jsxs("a", {
                      href: "https://www.instagram.com/mad__dentist/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      style: {
                        marginTop: 20,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background:
                          "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        padding: "12px 22px",
                        borderRadius: 2,
                        textDecoration: "none",
                        ...n,
                      },
                      children: [
                        d.jsx("svg", {
                          width: "11",
                          height: "11",
                          viewBox: "0 0 24 24",
                          fill: "currentColor",
                          children: d.jsx("path", {
                            d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                          }),
                        }),
                        "@mad__dentist →",
                      ],
                    }),
                  ],
                }),
                d.jsx("div", {
                  style: {
                    display: "flex",
                    gap: 14,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  },
                  children: dl
                    .filter((l, c) => !e || c === 0)
                    .map((l, c) =>
                      d.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            flex: "1 1 0",
                            maxWidth: e ? 240 : 210,
                            marginTop: !e && c === 1 ? 28 : 0,
                          },
                          children: [
                            d.jsx("div", {
                              style: {
                                width: "100%",
                                aspectRatio: "9/16",
                                maxHeight: e ? 220 : "unset",
                                borderRadius: 8,
                                overflow: "hidden",
                                border: `1px solid rgba(225,48,108,${c === 0 ? "0.3" : "0.2"})`,
                                boxShadow:
                                  c === 0
                                    ? "0 8px 40px rgba(225,48,108,0.2)"
                                    : "0 8px 40px rgba(188,24,136,0.12)",
                              },
                              children: d.jsx("iframe", {
                                src: `https://www.instagram.com/reel/${l.id}/embed/`,
                                style: {
                                  width: "100%",
                                  height: "100%",
                                  border: "none",
                                  display: "block",
                                },
                                loading: "lazy",
                                title: l.caption,
                                allowFullScreen: !0,
                              }),
                            }),
                            d.jsx("div", {
                              style: {
                                fontSize: 10,
                                color: "rgba(240,240,240,0.4)",
                                textAlign: "center",
                                ...i,
                              },
                              children: l.caption,
                            }),
                          ],
                        },
                        c,
                      ),
                    ),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
const pl = [
  {
    name: "Марія В.",
    stars: 5,
    text: "Найкраща клініка у Дніпрі! Вініри зробили за 2 тижні — результат вище очікувань.",
    ago: "2 тижні тому",
  },
  {
    name: "Дмитро К.",
    stars: 5,
    text: "Лікар уважний і не поспішає. Вперше не боявся йти до стоматолога!",
    ago: "1 місяць тому",
  },
  {
    name: "Ірина С.",
    stars: 5,
    text: "Зробили імплант — навіть забула де він. Дякую всій команді за увагу та підтримку!",
    ago: "2 місяці тому",
  },
];
function gl({ scrollY: t, isMobile: e }) {
  const r = { fontFamily: "'Syne', sans-serif" },
    s = { fontFamily: "'Space Grotesk', sans-serif" };
  return d.jsxs("div", {
    style: {
      width: "100%",
      maxWidth: 1e3,
      display: "grid",
      gridTemplateColumns: e ? "1fr" : "280px 1fr",
      gap: e ? 18 : 52,
      alignItems: "start",
    },
    children: [
      d.jsxs("div", {
        children: [
          d.jsxs("div", {
            style: {
              fontSize: "clamp(40px,5vw,62px)",
              fontWeight: 800,
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              ...r,
            },
            children: [
              d.jsx(P, {
                colors: ["#00e5ff", "#00ff88", "#00e5ff"],
                animationSpeed: 4,
                className: "scene-hl",
                children: "ЗНАЙДИ.",
              }),
              d.jsx(P, {
                colors: ["#f0f0f0", "#00e5ff", "#f0f0f0"],
                animationSpeed: 6,
                className: "scene-hl",
                children: "ПРИХОДЬ.",
              }),
              d.jsx(P, {
                colors: ["#00ff88", "#c8ff00", "#00ff88"],
                animationSpeed: 5,
                className: "scene-hl",
                children: "ВІДЧУЙ.",
              }),
            ],
          }),
          d.jsx("p", {
            style: {
              marginTop: 18,
              fontSize: 13,
              color: "rgba(240,240,240,0.4)",
              lineHeight: 1.7,
              ...s,
            },
            children:
              "Ми в центрі Дніпра. Поруч — метро, паркінг, кава після прийому.",
          }),
          d.jsx("div", {
            style: {
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              gap: 9,
            },
            children: [
              {
                icon: "☏",
                label: "Телефон",
                val: "+38 (056) 123-45-67",
                color: "#00e5ff",
                href: "tel:+380561234567",
              },
              {
                icon: "⊙",
                label: "Адреса",
                val: "просп. Яворницького 22, Дніпро",
                color: "#c8ff00",
                href: null,
              },
              {
                icon: "⏱",
                label: "Графік",
                val: "Пн–Пт 9:00–20:00 · Сб 10:00–18:00",
                color: "#a855f7",
                href: null,
              },
            ].map((n) =>
              d.jsxs(
                "div",
                {
                  style: { display: "flex", alignItems: "flex-start", gap: 9 },
                  children: [
                    d.jsx("div", {
                      style: {
                        width: 26,
                        height: 26,
                        borderRadius: 2,
                        border: `1px solid ${n.color}33`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        color: n.color,
                        flexShrink: 0,
                        marginTop: 1,
                      },
                      children: n.icon,
                    }),
                    d.jsxs("div", {
                      children: [
                        d.jsx("div", {
                          style: {
                            fontSize: 7,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.22)",
                            marginBottom: 2,
                            ...s,
                          },
                          children: n.label,
                        }),
                        n.href
                          ? d.jsx("a", {
                              href: n.href,
                              style: {
                                fontSize: 12,
                                color: "rgba(240,240,240,0.7)",
                                textDecoration: "none",
                                ...s,
                              },
                              children: n.val,
                            })
                          : d.jsx("div", {
                              style: {
                                fontSize: 12,
                                color: "rgba(240,240,240,0.65)",
                                ...s,
                              },
                              children: n.val,
                            }),
                      ],
                    }),
                  ],
                },
                n.label,
              ),
            ),
          }),
        ],
      }),
      d.jsxs("div", {
        style: { display: "flex", flexDirection: "column", gap: 18 },
        children: [
          d.jsx("div", {
            style: {
              width: "100%",
              aspectRatio: e ? "16/9" : "16/7",
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid rgba(0,229,255,0.14)",
            },
            children: d.jsx("iframe", {
              src: "https://maps.google.com/maps?q=просп.+Яворницького+22,+Дніпро,+Україна&output=embed&hl=uk&z=15",
              style: {
                width: "100%",
                height: "100%",
                border: "none",
                filter: "invert(90%) hue-rotate(180deg) saturate(0.8)",
                display: "block",
              },
              loading: "lazy",
              title: "Chirkova Dentist on Google Maps",
            }),
          }),
          !e &&
            d.jsxs("div", {
              children: [
                d.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  },
                  children: [
                    d.jsx("div", {
                      style: {
                        fontSize: 8,
                        color: "rgba(255,255,255,0.28)",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        ...s,
                      },
                      children: "GOOGLE ВІДГУКИ",
                    }),
                    d.jsxs("div", {
                      style: { display: "flex", alignItems: "center", gap: 5 },
                      children: [
                        d.jsx("span", {
                          style: {
                            fontSize: 15,
                            fontWeight: 800,
                            color: "#c8ff00",
                            lineHeight: 1,
                            ...r,
                          },
                          children: "4.9",
                        }),
                        d.jsx("span", {
                          style: {
                            color: "#c8ff00",
                            fontSize: 10,
                            letterSpacing: 1,
                          },
                          children: "★★★★★",
                        }),
                      ],
                    }),
                  ],
                }),
                d.jsx("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: e ? "1fr" : "1fr 1fr 1fr",
                    gap: 8,
                  },
                  children: pl.map((n) =>
                    d.jsxs(
                      "div",
                      {
                        style: {
                          padding: "10px 12px",
                          background: "rgba(255,255,255,0.025)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: 4,
                        },
                        children: [
                          d.jsxs("div", {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              marginBottom: 5,
                            },
                            children: [
                              d.jsx("div", {
                                style: {
                                  width: 18,
                                  height: 18,
                                  borderRadius: "50%",
                                  background:
                                    "conic-gradient(#4285f4 0 90deg,#ea4335 90deg 180deg,#fbbc05 180deg 270deg,#34a853 270deg)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 8,
                                  fontWeight: 700,
                                  color: "#fff",
                                  flexShrink: 0,
                                },
                                children: "G",
                              }),
                              d.jsx("span", {
                                style: {
                                  fontSize: 10,
                                  color: "rgba(240,240,240,0.7)",
                                  fontWeight: 500,
                                  ...s,
                                },
                                children: n.name,
                              }),
                              d.jsx("span", {
                                style: {
                                  fontSize: 8,
                                  color: "rgba(255,255,255,0.2)",
                                  marginLeft: "auto",
                                  ...s,
                                },
                                children: n.ago,
                              }),
                            ],
                          }),
                          d.jsx("div", {
                            style: {
                              color: "#c8ff00",
                              fontSize: 9,
                              marginBottom: 4,
                              letterSpacing: 1,
                            },
                            children: "★".repeat(n.stars),
                          }),
                          d.jsx("div", {
                            style: {
                              fontSize: 10,
                              color: "rgba(240,240,240,0.4)",
                              lineHeight: 1.5,
                              ...s,
                            },
                            children: n.text,
                          }),
                        ],
                      },
                      n.name,
                    ),
                  ),
                }),
              ],
            }),
        ],
      }),
    ],
  });
}
function ml({ scrollY: t, isMobile: e }) {
  const r = { fontFamily: "'Syne', sans-serif" },
    s = { fontFamily: "'Space Grotesk', sans-serif" },
    [n, i] = j.useState({
      name: "",
      phone: "",
      service: "",
      contact_via: "",
      note: "",
    }),
    [a, o] = j.useState("idle"),
    l = (f) => (p) => i((g) => ({ ...g, [f]: p.target.value })),
    c = async (f) => {
      if ((f.preventDefault(), !(!n.name.trim() || !n.phone.trim()))) {
        o("loading");
        try {
          (gr
            ? await gr
                .from("contact_requests")
                .insert({
                  name: n.name.trim(),
                  phone: n.phone.trim(),
                  service: n.service || null,
                  contact_via: n.contact_via || null,
                  note: n.note.trim() || null,
                  source: "zoomer_form",
                })
            : await new Promise((p) => setTimeout(p, 600)),
            o("ok"));
        } catch {
          o("err");
        }
      }
    },
    h = {
      width: "100%",
      padding: "9px 11px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 2,
      fontSize: 12,
      color: "#f0f0f0",
      outline: "none",
      boxSizing: "border-box",
      fontFamily: "'Space Grotesk',sans-serif",
      transition: "border-color 0.2s",
    },
    u = {
      display: "block",
      fontSize: 8,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.28)",
      marginBottom: 4,
      ...s,
    };
  return d.jsxs("div", {
    style: {
      width: "100%",
      maxWidth: 1e3,
      display: "grid",
      gridTemplateColumns: e ? "1fr" : "300px 1fr",
      gap: e ? 16 : 52,
      alignItems: "start",
    },
    children: [
      d.jsxs("div", {
        children: [
          d.jsxs("div", {
            style: {
              fontSize: "clamp(38px,4.8vw,58px)",
              fontWeight: 800,
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              ...r,
            },
            children: [
              d.jsx(P, {
                colors: ["#c8ff00", "#00e5ff", "#c8ff00"],
                animationSpeed: 4,
                className: "scene-hl",
                children: "ДОСИТЬ",
              }),
              d.jsx(P, {
                colors: ["#f0f0f0", "#c8ff00", "#f0f0f0"],
                animationSpeed: 6,
                className: "scene-hl",
                children: "ДУМАТИ.",
              }),
              d.jsx(P, {
                colors: ["#00e5ff", "#c8ff00", "#00e5ff"],
                animationSpeed: 5,
                className: "scene-hl",
                children: "ПОЧИНАЙ.",
              }),
            ],
          }),
          d.jsx("p", {
            style: {
              marginTop: 18,
              fontSize: 13,
              color: "rgba(240,240,240,0.4)",
              lineHeight: 1.7,
              ...s,
            },
            children:
              "Перша консультація — безкоштовно. Відповідь за 2 години.",
          }),
        ],
      }),
      d.jsxs("div", {
        style: { display: "flex", flexDirection: "column", gap: 16 },
        children: [
          d.jsx("div", {
            style: {
              fontSize: 8,
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 2,
              ...s,
            },
            children: "ШВИДКИЙ ЗАПИТ",
          }),
          a === "ok"
            ? d.jsxs("div", {
                style: {
                  padding: "36px 20px",
                  textAlign: "center",
                  border: "1px solid rgba(0,229,255,0.25)",
                  borderRadius: 4,
                },
                children: [
                  d.jsx("div", {
                    style: { fontSize: 28, marginBottom: 10 },
                    children: "🦷",
                  }),
                  d.jsx("div", {
                    style: {
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#00e5ff",
                      ...r,
                    },
                    children: "Готово!",
                  }),
                  d.jsx("div", {
                    style: {
                      fontSize: 12,
                      color: "rgba(255,255,255,0.4)",
                      marginTop: 6,
                      ...s,
                    },
                    children: "Зателефонуємо протягом 2 годин.",
                  }),
                ],
              })
            : d.jsxs("form", {
                onSubmit: c,
                style: { display: "flex", flexDirection: "column", gap: 10 },
                children: [
                  d.jsxs("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                    },
                    children: [
                      d.jsxs("div", {
                        children: [
                          d.jsx("label", { style: u, children: "Ваше ім'я" }),
                          d.jsx("input", {
                            required: !0,
                            type: "text",
                            placeholder: "Катерина",
                            value: n.name,
                            onChange: l("name"),
                            style: h,
                            onFocus: (f) =>
                              (f.target.style.borderColor = "#00e5ff"),
                            onBlur: (f) =>
                              (f.target.style.borderColor =
                                "rgba(255,255,255,0.1)"),
                          }),
                        ],
                      }),
                      d.jsxs("div", {
                        children: [
                          d.jsx("label", { style: u, children: "Телефон *" }),
                          d.jsx("input", {
                            required: !0,
                            type: "tel",
                            placeholder: "+38 (0__) ___-__-__",
                            value: n.phone,
                            onChange: l("phone"),
                            style: h,
                            onFocus: (f) =>
                              (f.target.style.borderColor = "#00e5ff"),
                            onBlur: (f) =>
                              (f.target.style.borderColor =
                                "rgba(255,255,255,0.1)"),
                          }),
                        ],
                      }),
                    ],
                  }),
                  d.jsxs("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns: e ? "1fr" : "1fr 1fr",
                      gap: 10,
                    },
                    children: [
                      d.jsxs("div", {
                        children: [
                          d.jsx("label", { style: u, children: "Послуга" }),
                          d.jsxs("select", {
                            value: n.service,
                            onChange: l("service"),
                            style: {
                              ...h,
                              appearance: "none",
                              cursor: "pointer",
                              color: n.service
                                ? "#f0f0f0"
                                : "rgba(255,255,255,0.3)",
                            },
                            children: [
                              d.jsx("option", {
                                value: "",
                                children: "Оберіть...",
                              }),
                              [
                                "Безкоштовна консультація",
                                "Косметика / вініри",
                                "Імпланти",
                                "Відбілювання",
                                "Елайнери",
                                "Огляд",
                                "Невідкладна",
                              ].map((f) =>
                                d.jsx(
                                  "option",
                                  {
                                    value: f,
                                    style: {
                                      background: "#1a1a1a",
                                      color: "#f0f0f0",
                                    },
                                    children: f,
                                  },
                                  f,
                                ),
                              ),
                            ],
                          }),
                        ],
                      }),
                      d.jsxs("div", {
                        children: [
                          d.jsx("label", {
                            style: u,
                            children: "Зручний зв'язок",
                          }),
                          d.jsxs("select", {
                            value: n.contact_via,
                            onChange: l("contact_via"),
                            style: {
                              ...h,
                              appearance: "none",
                              cursor: "pointer",
                              color: n.contact_via
                                ? "#f0f0f0"
                                : "rgba(255,255,255,0.3)",
                            },
                            children: [
                              d.jsx("option", {
                                value: "",
                                children: "Оберіть...",
                              }),
                              ["Телефон", "Telegram", "Viber", "WhatsApp"].map(
                                (f) =>
                                  d.jsx(
                                    "option",
                                    {
                                      value: f,
                                      style: {
                                        background: "#1a1a1a",
                                        color: "#f0f0f0",
                                      },
                                      children: f,
                                    },
                                    f,
                                  ),
                              ),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  d.jsxs("div", {
                    children: [
                      d.jsx("label", {
                        style: u,
                        children: "Примітка (за бажанням)",
                      }),
                      d.jsx("textarea", {
                        placeholder:
                          "Напр. — зручніше вранці, трохи хвилююсь...",
                        rows: 3,
                        value: n.note,
                        onChange: l("note"),
                        style: { ...h, resize: "vertical", lineHeight: 1.6 },
                        onFocus: (f) =>
                          (f.target.style.borderColor = "#00e5ff"),
                        onBlur: (f) =>
                          (f.target.style.borderColor =
                            "rgba(255,255,255,0.1)"),
                      }),
                    ],
                  }),
                  d.jsx("button", {
                    type: "submit",
                    disabled: a === "loading",
                    style: {
                      width: "100%",
                      background: "#00e5ff",
                      color: "#0a0a0a",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "14px",
                      border: "none",
                      borderRadius: 2,
                      cursor: a === "loading" ? "wait" : "pointer",
                      opacity: a === "loading" ? 0.7 : 1,
                      transition: "opacity 0.2s",
                      fontFamily: "'Syne',sans-serif",
                    },
                    children:
                      a === "loading" ? "Надсилається..." : "Надіслати запит →",
                  }),
                  a === "err" &&
                    d.jsx("p", {
                      style: {
                        fontSize: 11,
                        color: "#ff3d8b",
                        textAlign: "center",
                        margin: 0,
                        ...s,
                      },
                      children: "Щось пішло не так. Зателефонуйте напряму.",
                    }),
                  d.jsx("div", {
                    style: {
                      display: "flex",
                      gap: 16,
                      paddingTop: 10,
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      flexWrap: "wrap",
                    },
                    children: [
                      "Відповідь за 2 години",
                      "Без спаму",
                      "Перший візит безкоштовно",
                    ].map((f) =>
                      d.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 10,
                            color: "rgba(255,255,255,0.25)",
                            ...s,
                          },
                          children: [
                            d.jsx("span", {
                              style: {
                                width: 4,
                                height: 4,
                                borderRadius: "50%",
                                background: "#00e5ff",
                                flexShrink: 0,
                              },
                            }),
                            f,
                          ],
                        },
                        f,
                      ),
                    ),
                  }),
                ],
              }),
        ],
      }),
    ],
  });
}
const yl = [
  "НЕВІДКЛАДНА ДОПОМОГА",
  "КОСМЕТИЧНА СТОМАТОЛОГІЯ",
  "ВІДБІЛЮВАННЯ",
  "ІМПЛАНТИ",
  "ЕЛАЙНЕРИ",
  "ВІНІРИ",
  "КОРЕНЕВІ КАНАЛИ",
  "ОРТОДОНТІЯ",
  "ІМПЛАНТАЦІЯ",
];
function vl() {
  const t = { fontFamily: "'Space Grotesk', sans-serif" },
    e = yl.map((r) => `${r} •`).join("  ");
  return d.jsx("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 20,
      background: "rgba(8,8,10,0.9)",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      height: 32,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
    },
    children: d.jsxs("div", {
      style: {
        display: "flex",
        whiteSpace: "nowrap",
        animation: "zm-marquee 32s linear infinite",
      },
      children: [
        d.jsx("span", {
          style: {
            fontSize: 8,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            paddingRight: 64,
            ...t,
          },
          children: e,
        }),
        d.jsx("span", {
          style: {
            fontSize: 8,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            paddingRight: 64,
            ...t,
          },
          children: e,
        }),
      ],
    }),
  });
}
function xl() {
  const [t] = j.useState(!0),
    [e, r] = j.useState(!1),
    [s, n] = j.useState(0),
    [i, a] = j.useState(0),
    o = j.useRef(null),
    l = il();
  (j.useEffect(() => {
    const y = "zoomer-fonts";
    if (document.getElementById(y)) return;
    const w = document.createElement("link");
    ((w.id = y),
      (w.rel = "stylesheet"),
      (w.href =
        "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@300;400;500&display=swap"),
      document.head.appendChild(w));
  }, []),
    j.useEffect(() => {
      requestAnimationFrame(() => r(!0));
    }, []),
    j.useEffect(
      () => (
        (document.body.style.overflow = "hidden"),
        () => {
          document.body.style.overflow = "";
        }
      ),
      [],
    ));
  const c = j.useCallback(() => {
    const y = o.current;
    if (!y) return;
    const w = y.scrollTop;
    (a(w), n(Math.min(Math.floor(w / ue), le.length - 1)));
  }, []);
  j.useEffect(() => {
    const y = o.current;
    if (y)
      return (
        y.addEventListener("scroll", c, { passive: !0 }),
        () => y.removeEventListener("scroll", c)
      );
  }, [c]);
  const h = (y) => {
      o.current?.scrollTo({ top: y * ue + 20, behavior: "smooth" });
    },
    u = { fontFamily: "'Syne', sans-serif" },
    f = { fontFamily: "'Space Grotesk', sans-serif" },
    p = Math.min(i / (ue * le.length), 1),
    g = [
      ["#c8ff00", "#00e5ff", "#0a1a0a"],
      ["#00e5ff", "#0066ff", "#001a1a"],
      ["#ff3d8b", "#ff8c00", "#1a000a"],
      ["#a855f7", "#ff3d8b", "#0d000d"],
      ["#c8ff00", "#a855f7", "#0a0a00"],
      ["#ff3d8b", "#00e5ff", "#1a0010"],
      ["#00e5ff", "#00ff88", "#000d0d"],
      ["#c8ff00", "#00e5ff", "#000d0d"],
    ],
    m = g[s] ?? g[0],
    v = [
      d.jsx(al, { scrollY: i, isMobile: l }),
      d.jsx(ol, { scrollY: i, isMobile: l }),
      d.jsx(cl, { scrollY: i, isMobile: l }),
      d.jsx(hl, { scrollY: i, isMobile: l }),
      d.jsx(ul, { scrollY: i, isMobile: l }),
      d.jsx(fl, { scrollY: i, isMobile: l }),
      d.jsx(gl, { scrollY: i, isMobile: l }),
      d.jsx(ml, { scrollY: i, isMobile: l }),
    ];
  return d.jsxs(d.Fragment, {
    children: [
      d.jsx("style", {
        children:
          "@keyframes zm-marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }",
      }),
      d.jsx("div", {
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 200,
          opacity: e ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: e ? "auto" : "none",
        },
        children: d.jsxs("div", {
          ref: o,
          style: {
            position: "absolute",
            inset: 0,
            overflowY: "auto",
            overflowX: "hidden",
          },
          children: [
            d.jsxs("div", {
              style: {
                position: "sticky",
                top: 0,
                height: "100vh",
                overflow: "hidden",
                background: "#0a0a0a",
              },
              children: [
                d.jsx(Xo, {
                  colorStops: m,
                  amplitude: 0.9,
                  blend: 0.5,
                  speed: 0.6,
                  style: { zIndex: 0 },
                }),
                d.jsx("div", {
                  style: {
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 1,
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    transform: `translateY(${i * 0.04}px)`,
                  },
                }),
                d.jsx("div", {
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 2,
                    background: "#c8ff00",
                    width: `${p * 100}%`,
                    zIndex: 20,
                    transition: "width 0.08s linear",
                  },
                }),
                d.jsxs("div", {
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: l ? "14px 16px" : "20px 32px",
                  },
                  children: [
                    d.jsxs("div", {
                      style: {
                        fontWeight: 800,
                        fontSize: l ? 13 : 15,
                        letterSpacing: "-0.02em",
                        color: "#f0f0f0",
                        ...u,
                      },
                      children: [
                        "CHIRKOVA",
                        d.jsx("span", {
                          style: { color: "#c8ff00" },
                          children: ".DENTIST",
                        }),
                      ],
                    }),
                    !l &&
                      d.jsx("div", {
                        style: {
                          fontSize: 9,
                          color: "rgba(255,255,255,0.35)",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          ...f,
                        },
                        children: le[s]?.label,
                      }),
                  ],
                }),
                d.jsx("div", {
                  style: {
                    position: "absolute",
                    right: 28,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 15,
                    display: l ? "none" : "flex",
                    flexDirection: "column",
                    gap: 12,
                    alignItems: "center",
                  },
                  children: le.map((y, w) =>
                    d.jsx(
                      "button",
                      {
                        onClick: () => h(w),
                        style: {
                          width: w === s ? 12 : 8,
                          height: w === s ? 12 : 8,
                          borderRadius: "50%",
                          background:
                            w === s ? y.accent : "rgba(255,255,255,0.18)",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          transition: "all 0.3s",
                          boxShadow:
                            w === s
                              ? `0 0 10px ${y.accent}, 0 0 20px ${y.accent}60`
                              : "none",
                        },
                        "aria-label": y.label,
                      },
                      y.id,
                    ),
                  ),
                }),
                le.map((y, w) =>
                  d.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: l ? "64px 16px 56px" : "80px 64px 60px",
                        ...nl(w, i),
                      },
                      children: v[w],
                    },
                    y.id,
                  ),
                ),
                l &&
                  d.jsx("div", {
                    style: {
                      position: "absolute",
                      bottom: 38,
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 15,
                      display: "flex",
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                    },
                    children: le.map((y, w) =>
                      d.jsx(
                        "button",
                        {
                          onClick: () => h(w),
                          style: {
                            width: w === s ? 18 : 6,
                            height: 6,
                            borderRadius: 3,
                            background:
                              w === s ? y.accent : "rgba(255,255,255,0.2)",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            transition: "all 0.3s",
                          },
                          "aria-label": y.label,
                        },
                        y.id,
                      ),
                    ),
                  }),
                d.jsx(vl, {}),
              ],
            }),
            d.jsx("div", { style: { height: ue * le.length } }),
          ],
        }),
      }),
    ],
  });
}
export { xl as default };
