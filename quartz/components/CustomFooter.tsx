import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const CustomFooter: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  const year = new Date().getFullYear()
  const isEn = fileData.slug?.startsWith("en") ?? false

  const content = {
    title: isEn ? "DevOps Guide & Docs Hub" : "Guia DevOps & Docs Hub",
    author: "Pedro H. R. de Andrade",
    builtWith: isEn ? "Built with" : "Construído com",
    and: isEn ? "and" : "e",
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
        ·{" "}
        <a href="https://github.com/pedroiff0/devops-guide" target="_blank">
          {content.author}
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
