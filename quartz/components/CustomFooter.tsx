import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const CustomFooter: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  const year = new Date().getFullYear()
  const isEn = fileData.slug?.startsWith("en") ?? false

  const content = {
    title: isEn ? "DevOps Guide & Second Brain" : "DevOps Guide & Segundo Cérebro",
    maintainedBy: isEn ? "Curated by" : "Mantido por",
    and: isEn ? "and" : "e",
    builtWith: isEn ? "Powered by" : "Construído com",
    license: isEn ? "Open Source under MIT License" : "Código Aberto sob Licença MIT",
  }

  return (
    <footer
      class={classNames(displayClass, "custom-footer")}
      style={{
        marginTop: "3rem",
        padding: "1.5rem 0 2.5rem 0",
        borderTop: "1px solid var(--lightgray)",
        textAlign: "center",
        fontSize: "0.88rem",
        color: "var(--darkgray)",
      }}
    >
      <div style={{ marginBottom: "0.75rem", fontWeight: 500 }}>
        <strong>{content.title}</strong> ·{" "}
        <span>{content.maintainedBy} </span>
        <a
          href="https://github.com/pedroiff0"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 600, color: "var(--secondary)" }}
        >
          Pedro Andrade
        </a>{" "}
        {content.and}{" "}
        <a
          href="https://github.com/evertonpje"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 600, color: "var(--secondary)" }}
        >
          Everton
        </a>
      </div>

      <div style={{ fontSize: "0.8rem", opacity: 0.85, marginBottom: "0.5rem" }}>
        <span>{content.builtWith} </span>
        <a href="https://quartz.jzhao.xyz/" target="_blank" rel="noopener noreferrer">
          Quartz v4
        </a>
        {" & "}
        <a href="https://github.com/pedroiff0/devops-guide" target="_blank" rel="noopener noreferrer">
          GitHub Actions CI/CD
        </a>
        {" · "}
        <a href="https://devops.phrandrade.com" target="_blank" rel="noopener noreferrer">
          devops.phrandrade.com
        </a>
      </div>

      <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
        © {year} · {content.license}
      </div>
    </footer>
  )
}

export default (() => CustomFooter) satisfies QuartzComponentConstructor
