import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot, joinSegments } from "../util/path"

const NextPrev: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const currentSlug = fileData.slug
  if (!currentSlug || currentSlug === "index" || currentSlug === "404") {
    return null
  }

  const isEn = currentSlug.startsWith("en")
  const langPrefix = isEn ? "en" : "pt-br"
  const baseDir = pathToRoot(currentSlug)

  // Normalize current slug (strip trailing /index if present for comparison)
  const normalizedCurrent = currentSlug.replace(/\/index$/, "")

  // Collect and sort all valid markdown pages in the current language
  const langPages = allFiles
    .filter((f) => {
      if (!f.slug || f.slug === "404" || f.slug === "index") return false
      return f.slug.startsWith(langPrefix)
    })
    .map((f) => {
      const slug = f.slug!
      const normalizedSlug = slug.replace(/\/index$/, "")
      const isIndex = slug === langPrefix || slug.endsWith("/index") || slug === normalizedSlug && allFiles.some(other => other.slug === `${slug}/index` || other.slug?.startsWith(`${slug}/`))
      const order = f.frontmatter?.order ?? 100
      const title = f.frontmatter?.title ?? slug
      return {
        file: f,
        slug,
        normalizedSlug,
        isIndex,
        order,
        title,
      }
    })

  // Group pages by pillar directory
  // Hierarchy: [Pillar 1 Index, Topic 1.1, Topic 1.2, ..., Pillar 2 Index, Topic 2.1, ...]
  const sortedLinearFlow = langPages.sort((a, b) => {
    const aParts = a.normalizedSlug.split("/")
    const bParts = b.normalizedSlug.split("/")
    
    // Compare root pillar first
    const aPillar = aParts[1] ?? ""
    const bPillar = bParts[1] ?? ""
    
    if (aPillar !== bPillar) {
      // Find order of pillar index files
      const aPillarIndex = langPages.find(p => p.normalizedSlug === `${langPrefix}/${aPillar}`)
      const bPillarIndex = langPages.find(p => p.normalizedSlug === `${langPrefix}/${bPillar}`)
      const aPillarOrder = aPillarIndex?.order ?? 100
      const bPillarOrder = bPillarIndex?.order ?? 100
      if (aPillarOrder !== bPillarOrder) return aPillarOrder - bPillarOrder
      return aPillar.localeCompare(bPillar)
    }

    // Inside same pillar: index goes first
    const aIsPillarRoot = a.normalizedSlug === `${langPrefix}/${aPillar}`
    const bIsPillarRoot = b.normalizedSlug === `${langPrefix}/${bPillar}`
    if (aIsPillarRoot) return -1
    if (bIsPillarRoot) return 1

    // Then sort by order, then by title
    if (a.order !== b.order) return a.order - b.order
    return a.title.localeCompare(b.title)
  })

  // Find index in linear flow
  const currentIndex = sortedLinearFlow.findIndex(
    (p) => p.slug === currentSlug || p.normalizedSlug === normalizedCurrent
  )

  if (currentIndex === -1) {
    return null
  }

  const prev = currentIndex > 0 ? sortedLinearFlow[currentIndex - 1] : null
  const next = currentIndex < sortedLinearFlow.length - 1 ? sortedLinearFlow[currentIndex + 1] : null

  if (!prev && !next) {
    return null
  }

  return (
    <nav class="next-prev-nav" aria-label={isEn ? "Topic Navigation" : "Navegação entre Tópicos"}>
      {prev ? (
        <a class="nav-card prev-card" href={joinSegments(baseDir, prev.slug)}>
          <span class="nav-dir">
            <span class="arrow">←</span> {isEn ? "Previous Topic" : "Tópico Anterior"}
          </span>
          <span class="nav-title">{prev.title}</span>
        </a>
      ) : (
        <div class="nav-card-placeholder" />
      )}

      {next ? (
        <a class="nav-card next-card" href={joinSegments(baseDir, next.slug)}>
          <span class="nav-dir">
            {isEn ? "Next Topic" : "Próximo Tópico"} <span class="arrow">→</span>
          </span>
          <span class="nav-title">{next.title}</span>
        </a>
      ) : (
        <div class="nav-card-placeholder" />
      )}
    </nav>
  )
}

export default (() => NextPrev) satisfies QuartzComponentConstructor
