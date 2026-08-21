import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const CustomFooter: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  const year = new Date().getFullYear()
  const isEn = fileData.slug?.startsWith("en") ?? false

  const content = {
    title: isEn ? "DevOps Guide & Second Brain" : "DevOps Guide & Segundo Cérebro",
    maintainedBy: isEn ? "Curated & Built by" : "Idealizado & Mantido por",
    and: isEn ? "and" : "e",
    license: isEn ? "Free & Open Source under MIT License" : "Código Aberto Gratuito sob Licença MIT",
  }

  return (
    <footer
      class={classNames(displayClass, "custom-footer")}
      style={{
        marginTop: "3.5rem",
        padding: "2rem 0 3rem 0",
        borderTop: "1px solid var(--lightgray)",
        textAlign: "center",
        color: "var(--darkgray)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.25rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <a
          href="https://devops.phrandrade.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Digital Garden Live"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", color: "var(--secondary)", fontWeight: 600 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          devops.phrandrade.com
        </a>

        <span style={{ opacity: 0.4 }}>•</span>

        <a
          href="https://github.com/pedroiff0/devops-guide"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Repository"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", color: "var(--darkgray)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
          </svg>
          GitHub
        </a>

        <span style={{ opacity: 0.4 }}>•</span>

        <a
          href="https://github.com/pedroiff0/devops-guide/wiki"
          target="_blank"
          rel="noopener noreferrer"
          title="Wiki do Projeto"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", color: "var(--darkgray)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          Wiki
        </a>

        <span style={{ opacity: 0.4 }}>•</span>

        <a
          href="https://github.com/pedroiff0/devops-guide/discussions"
          target="_blank"
          rel="noopener noreferrer"
          title="Discussions"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", color: "var(--darkgray)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Discussions
        </a>
      </div>

      <div style={{ marginBottom: "0.6rem", fontSize: "0.9rem" }}>
        <span>{content.maintainedBy} </span>
        <a
          href="https://github.com/pedroiff0"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 700, color: "var(--secondary)", textDecoration: "none" }}
        >
          Pedro Andrade
        </a>{" "}
        {content.and}{" "}
        <a
          href="https://github.com/evertonpje"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 700, color: "var(--secondary)", textDecoration: "none" }}
        >
          Everton
        </a>
      </div>

      <div style={{ fontSize: "0.78rem", opacity: 0.75, display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <span>© {year} · {content.license}</span>
      </div>
    </footer>
  )
}

export default (() => CustomFooter) satisfies QuartzComponentConstructor
