import { h } from "preact";
import fs from "node:fs";
import path from "node:path";
import { slugifyFilePath, resolveRelative } from "@quartz-community/utils/path";

const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif)$/i;

function listPhotos(folder) {
  const dir = path.join(process.cwd(), "content", "assets", "photos", folder);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_RE.test(f))
      .sort();
  } catch {
    return [];
  }
}

// The Assets emitter slugifies every static file it copies (lowercase, etc.) —
// mirror that here so hrefs match what actually lands in `public/`.
function photoUrl(folder, file) {
  return "/" + slugifyFilePath(`assets/photos/${folder}/${file}`);
}

function slide(href, imgSrc, alt, caption) {
  return h(
    "a",
    { href, class: "carousel-slide" },
    imgSrc ? h("img", { src: imgSrc, alt, loading: "lazy" }) : null,
    caption ? h("div", { class: "slide-caption" }, caption) : null,
  );
}

// Hover-zoom "lightbox": waits for a sustained hover before promoting the
// image to a fixed, centered, enlarged preview over a blurred backdrop.
// Done in JS (not CSS transition-delay) because `position` is a discrete
// property — browsers apply it immediately regardless of transition-delay
// when mixed with continuously-animatable properties under `all`, which
// made the old CSS-only version briefly flash the image in the wrong
// spot before snapping to the delayed, correct one.
//
// Runs against every `.carousel-slide` on the page, not just ones this
// component renders — several pages (research/index.md, computacao/
// index.md, etc.) hand-write their own `<div class="media-carousel">`
// blocks directly in markdown, and they get the same lightbox + controls.
const CAROUSEL_ZOOM_SCRIPT = `
function quartzCarouselZoomSetup() {
  var OPEN_DELAY = 1000;
  // Grace period before an unzoom-on-leave actually closes the lightbox —
  // long enough to cross the gap between the slide's original spot and its
  // fixed-position enlarged image (or over to the prev/next button) without
  // pixel-perfect aim, short enough to still feel responsive.
  var CLOSE_GRACE = 500;

  document.querySelectorAll(".carousel-slide").forEach(function (slide) {
    if (slide.dataset.zoomBound === "true") return;
    slide.dataset.zoomBound = "true";

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "carousel-zoom-close";
    closeBtn.setAttribute("aria-label", "Fechar");
    closeBtn.textContent = "\\u2715";
    slide.appendChild(closeBtn);

    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "carousel-zoom-prev";
    prevBtn.setAttribute("aria-label", "Foto anterior");
    prevBtn.textContent = "\\u2039";
    slide.appendChild(prevBtn);

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "carousel-zoom-next";
    nextBtn.setAttribute("aria-label", "Pr\\u00f3xima foto");
    nextBtn.textContent = "\\u203a";
    slide.appendChild(nextBtn);

    var openTimer = null;
    var closeTimer = null;

    function open() {
      clearTimeout(closeTimer);
      slide.classList.add("zoomed");
    }
    function close() {
      slide.classList.remove("zoomed");
    }
    function siblingSlides() {
      var carousel = slide.closest(".media-carousel");
      var scope = carousel || document;
      return Array.prototype.slice.call(scope.querySelectorAll(".carousel-slide"));
    }
    function navigate(delta) {
      var slides = siblingSlides();
      var idx = slides.indexOf(slide);
      if (idx === -1) return;
      var target = slides[(idx + delta + slides.length) % slides.length];
      if (target && target !== slide) {
        close();
        target.classList.add("zoomed");
      }
    }

    // Exposed on the element so the single document-level keydown listener
    // below can drive whichever slide is currently zoomed, without needing
    // its own closure over every slide's open/close/navigate functions.
    slide.__carouselClose = close;
    slide.__carouselNavigate = navigate;

    slide.addEventListener("mouseenter", function () {
      clearTimeout(closeTimer);
      // Already open (e.g. the mouse briefly crossed a gap between this
      // slide's original spot and its fixed-position enlarged image) —
      // just cancel the pending close, don't restart the open delay.
      if (slide.classList.contains("zoomed")) return;
      clearTimeout(openTimer);
      openTimer = setTimeout(open, OPEN_DELAY);
    });
    slide.addEventListener("mouseleave", function () {
      clearTimeout(openTimer);
      closeTimer = setTimeout(close, CLOSE_GRACE);
    });

    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      clearTimeout(openTimer);
      close();
    });
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      navigate(-1);
    });
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      navigate(1);
    });
  });

  // Bound once globally (not per-slide, since this setup runs again on every
  // SPA navigation) — looks up whichever slide is currently zoomed, if any.
  if (!window.__quartzCarouselKeydownBound) {
    window.__quartzCarouselKeydownBound = true;
    document.addEventListener("keydown", function (e) {
      var zoomed = document.querySelector(".carousel-slide.zoomed");
      if (!zoomed) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (zoomed.__carouselNavigate) zoomed.__carouselNavigate(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (zoomed.__carouselNavigate) zoomed.__carouselNavigate(-1);
      } else if (e.key === "Escape") {
        e.preventDefault();
        if (zoomed.__carouselClose) zoomed.__carouselClose();
      }
    });
  }
}
document.addEventListener("nav", quartzCarouselZoomSetup);
document.addEventListener("render", quartzCarouselZoomSetup);
`;

function PhotoCarouselConstructor() {
  const PhotoCarousel = (props) => {
    const fileData = props?.fileData ?? {};
    const frontmatter = fileData.frontmatter ?? {};
    const folder = frontmatter.photoFolder;

    // Mode 1: this note itself declares a photoFolder — show every photo in it,
    // opening the full-size image directly (existing single-event behaviour).
    if (folder && typeof folder === "string") {
      const files = listPhotos(folder);
      if (files.length === 0) return null;
      const title = typeof frontmatter.title === "string" ? frontmatter.title : "";
      return h(
        "div",
        { class: "media-carousel" },
        files.map((f) => {
          const url = photoUrl(folder, f);
          return h(
            "a",
            { href: url, class: "carousel-slide", target: "_blank", rel: "noopener" },
            h("img", { src: url, alt: title, loading: "lazy" }),
          );
        }),
      );
    }

    // Mode 2: this is a folder-index note (e.g. media/index.md, media/2025/index.md).
    // Gather every descendant note that DOES declare a photoFolder and build one
    // slide per event, linking to the note and using its first photo as thumbnail.
    // New event notes need zero manual carousel edits — they just show up here
    // once published, and start showing a real photo the moment one is added.
    const slug = fileData.slug;
    if (!slug || slug === "index" || !slug.endsWith("/index")) return null;

    const prefix = slug.slice(0, -"/index".length);
    // Scope the gallery to the "media" section specifically (any language) —
    // otherwise a broad index page like the homepage would also match, since
    // it technically sits above every media note in the slug tree too.
    if (!prefix.split("/").includes("media")) return null;

    const allFiles = props?.allFiles ?? [];
    const children = allFiles.filter((f) => {
      const s = f.slug;
      if (!s || !s.startsWith(prefix + "/")) return false;
      const childFolder = f.frontmatter?.photoFolder;
      return typeof childFolder === "string" && childFolder.length > 0;
    });
    if (children.length === 0) return null;

    children.sort((a, b) => {
      const da = a.frontmatter?.created ? new Date(a.frontmatter.created).getTime() : 0;
      const db = b.frontmatter?.created ? new Date(b.frontmatter.created).getTime() : 0;
      return da - db;
    });

    return h(
      "div",
      { class: "media-carousel" },
      children.map((child) => {
        const childFolder = child.frontmatter.photoFolder;
        const title = typeof child.frontmatter?.title === "string" ? child.frontmatter.title : "";
        const files = listPhotos(childFolder);
        const imgSrc = files.length > 0 ? photoUrl(childFolder, files[0]) : null;
        const href = resolveRelative(slug, child.slug);
        return slide(href, imgSrc, title, title);
      }),
    );
  };
  PhotoCarousel.afterDOMLoaded = CAROUSEL_ZOOM_SCRIPT;
  return PhotoCarousel;
}

export { PhotoCarouselConstructor as PhotoCarousel };
