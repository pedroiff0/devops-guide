import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const CustomFooter: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  const year = new Date().getFullYear()
  const isEn = fileData.slug?.startsWith("en") ?? false

  const content = {
    title: isEn ? "DevOps Guide & Docs Hub" : "Guia DevOps & Docs Hub",
    builtWith: isEn ? "Built with" : "Construído com",
    and: isEn ? "and" : "e",
    maintainedBy: isEn ? "Maintained by" : "Mantido por",
  }

  return (
    <footer
      class={classNames(displayClass, "custom-footer")}
      style={{ marginTop: "2rem", textAlign: "center" }}
    >
      <hr />
      <p style={{ margin: "0.8rem 0" }}>
        © {year}{" "}
        <a href="https://devops.phrandrade.com" target="_blank">
          <strong>{content.title}</strong>
        </a>{" "}
        · {content.maintainedBy}{" "}
        <a href="https://github.com/pedroiff0" target="_blank">
          Pedro Andrade
        </a>{" "}
        {content.and}{" "}
        <a href="https://github.com/evertonpje" target="_blank">
          Everton
        </a>
      </p>
      <p style={{ margin: "0.4rem 0", fontSize: "0.85rem", opacity: 0.8 }}>
        {content.builtWith}{" "}
        <a href="https://quartz.jzhao.xyz/" target="_blank">
          Quartz
        </a>{" "}
        {content.and}{" "}
        <a href="https://github.com/pedroiff0/devops-guide" target="_blank">
          GitHub Actions
        </a>
        .
      </p>
    </footer>
  )
}

export default (() => CustomFooter) satisfies QuartzComponentConstructor
