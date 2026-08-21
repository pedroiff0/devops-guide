import { h } from "preact"

// Renders on any page whose frontmatter declares `jcDashboard: <grupo>`, where
// <grupo> is the tag that identifies the club (`engcomp`, `mwbr`). Everything
// shown is computed at build time from the article notes themselves — there is
// no spreadsheet, no external API and no client-side JS. Add a note, rebuild,
// the numbers move.

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

// `discutido` arrives as a Date when the YAML value is unquoted, as a string
// when it is quoted. Anything unparseable is dropped rather than guessed —
// a wrong date would silently distort every chart on the page.
function toDate(value) {
  if (!value) return null
  const d = value instanceof Date ? value : new Date(String(value))
  return Number.isNaN(d.getTime()) ? null : d
}

function monthKey(date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`
}

function monthLabel(key) {
  const [year, month] = key.split("-")
  return `${MESES[Number(month) - 1]}/${year.slice(2)}`
}

function entriesFor(allFiles, grupo) {
  return allFiles.filter((file) => {
    const fm = file?.frontmatter ?? {}
    const tags = Array.isArray(fm.tags) ? fm.tags : []
    // `arxiv` is what separates a real article note from the club's support
    // pages (index, topicos, dashboard), which carry the same tags.
    return tags.includes("journal-club") && tags.includes(grupo) && Boolean(fm.arxiv)
  })
}

function countBy(items, keyFn) {
  const counts = new Map()
  for (const item of items) {
    const key = keyFn(item)
    if (!key) continue
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return counts
}

function sortedByCount(counts) {
  return [...counts.entries()].sort(
    (a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])),
  )
}

function tile(valor, rotulo) {
  return h(
    "div",
    { class: "jc-tile" },
    h("span", { class: "jc-tile-value" }, valor),
    h("span", { class: "jc-tile-label" }, rotulo),
  )
}

// Single-series magnitude bars: one hue for every bar, because the bars carry
// no identity of their own — the row label does. Value is direct-labelled on
// each row, so the chart is readable without hovering and doubles as a table.
function barChart(titulo, pares) {
  if (pares.length === 0) return null
  const maior = Math.max(...pares.map(([, valor]) => valor))
  return h(
    "section",
    { class: "jc-chart" },
    h("h3", { class: "jc-chart-title" }, titulo),
    h(
      "div",
      { class: "jc-bars" },
      ...pares.map(([rotulo, valor]) =>
        h(
          "div",
          { class: "jc-bar-row", title: `${rotulo}: ${valor}` },
          h("span", { class: "jc-bar-label" }, rotulo),
          h(
            "div",
            { class: "jc-bar-track" },
            h("div", {
              class: "jc-bar-fill",
              style: `width: ${Math.max((valor / maior) * 100, 2)}%`,
            }),
          ),
          h("span", { class: "jc-bar-value" }, String(valor)),
        ),
      ),
    ),
  )
}

function JCDashboardConstructor() {
  const JCDashboard = (props) => {
    const fileData = props?.fileData ?? {}
    const frontmatter = fileData.frontmatter ?? {}
    const grupo = frontmatter.jcDashboard
    if (!grupo) return null

    const artigos = entriesFor(props?.allFiles ?? [], grupo)

    if (artigos.length === 0) {
      return h(
        "div",
        { class: "jc-dashboard" },
        h(
          "p",
          { class: "jc-dashboard-vazio" },
          "Ainda não há artigos discutidos registrados. As estatísticas aparecem sozinhas assim que a primeira nota de artigo for publicada.",
        ),
      )
    }

    const datas = artigos
      .map((a) => toDate(a.frontmatter?.discutido))
      .filter(Boolean)
      .sort((a, b) => a - b)
    const apresentadores = countBy(artigos, (a) => a.frontmatter?.apresentador)
    const topicos = countBy(artigos, (a) => a.frontmatter?.topico)
    const meses = countBy(
      artigos.filter((a) => toDate(a.frontmatter?.discutido)),
      (a) => monthKey(toDate(a.frontmatter.discutido)),
    )

    // Cadência: artigos por mês ao longo do intervalo coberto. Um único mês
    // (ou nenhuma data legível) vira divisor 1, senão o número explode.
    const mesesCobertos = meses.size || 1
    const cadencia = (artigos.length / mesesCobertos).toFixed(1).replace(".", ",")

    const periodo =
      datas.length > 0
        ? `${monthLabel(monthKey(datas[0]))} – ${monthLabel(monthKey(datas[datas.length - 1]))}`
        : "—"

    const mesesOrdenados = [...meses.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, valor]) => [monthLabel(key), valor])

    return h(
      "div",
      { class: "jc-dashboard" },
      h(
        "div",
        { class: "jc-tiles" },
        tile(
          String(artigos.length),
          artigos.length === 1 ? "artigo discutido" : "artigos discutidos",
        ),
        tile(
          String(apresentadores.size),
          apresentadores.size === 1 ? "apresentador" : "apresentadores",
        ),
        tile(cadencia, "artigos por mês"),
        tile(periodo, "período coberto"),
      ),
      barChart("Artigos por mês", mesesOrdenados),
      barChart("Artigos por tópico", sortedByCount(topicos)),
      barChart("Artigos por apresentador", sortedByCount(apresentadores)),
    )
  }

  JCDashboard.css = `
.jc-dashboard {
  margin: 1.5rem 0 2rem;
}

.jc-dashboard-vazio {
  padding: 1.1rem 1.2rem;
  border: 1px dashed var(--lightgray);
  border-radius: 10px;
  color: var(--gray);
  font-size: 0.95rem;
}

.jc-tiles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.jc-tile {
  flex: 1 1 130px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.9rem 1rem;
  border: 1px solid var(--lightgray);
  border-radius: 10px;
  background: var(--light);
}

.jc-tile-value {
  font-family: var(--titleFont);
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--dark);
}

.jc-tile-label {
  font-size: 0.8rem;
  line-height: 1.25;
  color: var(--gray);
}

.jc-chart {
  margin: 0 0 1.8rem;
}

.jc-chart-title {
  margin: 0 0 0.7rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--darkgray);
}

.jc-bars {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.jc-bar-row {
  display: grid;
  grid-template-columns: minmax(5rem, 11rem) 1fr 2.2rem;
  align-items: center;
  gap: 0.6rem;
}

.jc-bar-label {
  font-size: 0.85rem;
  color: var(--darkgray);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.jc-bar-track {
  background: var(--lightgray);
  border-radius: 4px;
  height: 14px;
}

.jc-bar-fill {
  height: 100%;
  background: var(--secondary);
  border-radius: 0 4px 4px 0;
}

.jc-bar-value {
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
  text-align: right;
  color: var(--dark);
}

@media (max-width: 600px) {
  .jc-bar-row {
    grid-template-columns: minmax(4rem, 7rem) 1fr 2rem;
  }
}
`

  return JCDashboard
}

export { JCDashboardConstructor as JCDashboard }
