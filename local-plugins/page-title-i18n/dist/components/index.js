import { h } from "preact";

const DEFAULT_TITLE = "Guia GitHub & Docs";

function pathToRoot(slug) {
  const rootPath = slug
    .split("/")
    .filter((x) => x !== "")
    .slice(0, -1)
    .map(() => "..")
    .join("/");
  return rootPath.length === 0 ? "." : rootPath;
}

function PageTitleConstructor() {
  const PageTitle = (props) => {
    const cfg = props?.cfg ?? {};
    const fileData = props?.fileData ?? {};
    const displayClass = props?.displayClass ?? "";
    const title = cfg.pageTitle ?? DEFAULT_TITLE;
    const baseDir = pathToRoot(fileData.slug ?? "");
    const classes = ["page-title", displayClass].filter(Boolean).join(" ");

    return h(
      "div",
      { class: "site-header-block" },
      h("h2", { class: classes }, h("a", { href: baseDir }, title)),
      h("div", { class: "utc3-live-clock", id: "utc3-live-clock" },
        h("span", { class: "clock-icon" }, "\u{1F551} "),
        h("span", { id: "utc3-time" }, "--:--:--"),
        h("span", { class: "clock-tz" }, " (UTC\u22123)")
      )
    );
  };

  PageTitle.css = `
.site-header-block {
  display: flex;
  flex-direction: column;
}
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
.utc3-live-clock {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--darkgray);
  margin-top: 0.15rem;
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  opacity: 0.85;
  font-family: var(--codeFont, monospace);
  letter-spacing: 0.03em;
}
.utc3-live-clock .clock-tz {
  color: var(--secondary);
  font-weight: 700;
}
`;

  PageTitle.afterDOMLoaded = `
(function() {
  function tick() {
    var el = document.getElementById("utc3-time");
    if (!el) return;
    var now = new Date();
    try {
      el.textContent = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false
      }).format(now);
    } catch(e) {
      var utc = now.getTime() + now.getTimezoneOffset() * 60000;
      var br = new Date(utc - 3 * 3600000);
      el.textContent = ("0"+br.getHours()).slice(-2)+":"+("0"+br.getMinutes()).slice(-2)+":"+("0"+br.getSeconds()).slice(-2);
    }
  }
  tick();
  setInterval(tick, 1000);
  document.addEventListener("nav", function() { tick(); });
})();
`;

  return PageTitle;
}

export { PageTitleConstructor as PageTitle };
