import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot, joinSegments } from "../util/path"

const NextPrev: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const currentSlug = fileData.slug
  if (!currentSlug || currentSlug === "index" || currentSlug === "404") {
    return null
  }

  const isEn = currentSlug.startsWith("en")
  const segments = currentSlug.split("/")
  
  // Need at least lang/module/page
  if (segments.length < 3) {
    return null
  }

  const currentFolder = segments.slice(0, -1).join("/")
  const baseDir = pathToRoot(currentSlug)

  // Find all sibling notes in the same pillar folder
  const siblings = allFiles
    .filter((f) => {
      if (!f.slug || f.slug.endsWith("/index") || f.slug === currentFolder) return false
      const fFolder = f.slug.split("/").slice(0, -1).join("/")
      return fFolder === currentFolder
    })
    .sort((a, b) => {
      const orderA = a.frontmatter?.order ?? 100
      const orderB = b.frontmatter?.order ?? 100
      if (orderA !== orderB) return orderA - orderB
      return (a.frontmatter?.title ?? a.slug!).localeCompare(b.frontmatter?.title ?? b.slug!)
    })

  const currentIndex = siblings.findIndex((f) => f.slug === currentSlug)
  if (currentIndex === -1) {
    return null
  }

  const prev = currentIndex > 0 ? siblings[currentIndex - 1] : null
  const next = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null

  if (!prev && !next) {
    return null
  }

  return (
    <nav class="next-prev-nav" aria-label={isEn ? "Page navigation" : "Navegação da página"}>
      {prev ? (
        <a class="nav-card prev-card" href={joinSegments(baseDir, prev.slug!)}>
          <span class="nav-dir">← {isEn ? "Previous Topic" : "Tópico Anterior"}</span>
          <span class="nav-title">{prev.frontmatter?.title ?? prev.slug}</span>
        </a>
      ) : (
        <div class="nav-card-placeholder" />
      )}

      {next ? (
        <a class="nav-card next-card" href={joinSegments(baseDir, next.slug!)}>
          <span class="nav-dir">{isEn ? "Next Topic" : "Próximo Tópico"} →</span>
          <span class="nav-title">{next.frontmatter?.title ?? next.slug}</span>
        </a>
      ) : (
        <div class="nav-card-placeholder" />
      )}
    </nav>
  )
}

NextPrev.css = `
.next-prev-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin: 2.5rem 0 1.5rem 0;
  padding-top: 1.5rem;
  border-top: 1px solid var(--lightgray);
}

@media (max-width: 600px) {
  .next-prev-nav {
    grid-template-columns: 1fr;
  }
}

.next-prev-nav .nav-card {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  background-color: var(--light);
  border: 1px solid var(--lightgray);
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.next-prev-nav .nav-card:hover {
  border-color: var(--secondary);
  background-color: var(--lightgray);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.next-prev-nav .next-card {
  text-align: right;
  margin-left: auto;
  width: 100%;
}

.next-prev-nav .nav-dir {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray);
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.next-prev-nav .nav-title {
  font-size: 1rem;
  color: var(--dark);
  font-weight: 600;
  line-height: 1.3;
}
`

export default (() => NextPrev) satisfies QuartzComponentConstructor
