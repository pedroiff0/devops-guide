import { i18n } from "../i18n"
import { FullSlug, getFileExtension, joinSegments, pathToRoot } from "../util/path"
import { CSSResourceToStyleElement, JSResourceToScriptElement } from "../util/resources"
import { googleFontHref, googleFontSubsetHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { unescapeHTML } from "../util/escape"
import { CustomOgImagesEmitterName } from "../../.quartz/plugins"
export default (() => {
  const Head: QuartzComponent = ({
    cfg,
    fileData,
    externalResources,
    ctx,
  }: QuartzComponentProps) => {
    const titleSuffix = cfg.pageTitleSuffix ?? ""
    const title =
      (fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title) + titleSuffix
    const description =
      fileData.frontmatter?.socialDescription ??
      fileData.frontmatter?.description ??
      unescapeHTML(fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description)

    const { css, js, additionalHead } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)
    const iconPath = joinSegments(baseDir, "static/icon.png")

    // Url of current page
    const socialUrl =
      fileData.slug === "404" ? url.toString() : joinSegments(url.toString(), fileData.slug!)

    const usesCustomOgImage = ctx.cfg.plugins.emitters.some(
      (e) => e.name === CustomOgImagesEmitterName,
    )
    const ogImageDefaultPath = `https://${cfg.baseUrl}/static/og-image.png`

    const coreStylesheet = css[0]?.content
    const coreScript = js.find(
      (r) => r.loadTime === "beforeDOMReady" && r.contentType === "external",
    )

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        {coreStylesheet && <link rel="preload" href={coreStylesheet} as="style" />}
        {coreScript && coreScript.contentType === "external" && (
          <link rel="preload" href={coreScript.src} as="script" />
        )}
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
            {cfg.theme.typography.title && (
              <link rel="stylesheet" href={googleFontSubsetHref(cfg.theme, cfg.pageTitle)} />
            )}
          </>
        )}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="og:site_name" content={cfg.pageTitle}></meta>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image:alt" content={description} />

        {!usesCustomOgImage && (
          <>
            <meta property="og:image" content={ogImageDefaultPath} />
            <meta property="og:image:url" content={ogImageDefaultPath} />
            <meta name="twitter:image" content={ogImageDefaultPath} />
            <meta
              property="og:image:type"
              content={`image/${getFileExtension(ogImageDefaultPath) ?? "png"}`}
            />
          </>
        )}

        {cfg.baseUrl && (
          <>
            <meta property="twitter:domain" content={cfg.baseUrl}></meta>
            <meta property="og:url" content={socialUrl}></meta>
            <meta property="twitter:url" content={socialUrl}></meta>
          </>
        )}

        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />

        {css.map((resource) => CSSResourceToStyleElement(resource, true))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
        {additionalHead.map((resource) => {
          if (typeof resource === "function") {
            return resource(fileData)
          } else {
            return resource
          }
        })}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            function initBackground() {
              if (document.getElementById("cosmic-bg")) return;
              
              const container = document.createElement("div");
              container.id = "cosmic-bg";
              container.style.position = "fixed";
              container.style.top = "0";
              container.style.left = "0";
              container.style.width = "100vw";
              container.style.height = "100vh";
              container.style.zIndex = "-1";
              container.style.pointerEvents = "none";
              container.style.overflow = "hidden";
              
              const canvas = document.createElement("canvas");
              canvas.id = "cosmic-canvas";
              canvas.style.position = "absolute";
              canvas.style.top = "0";
              canvas.style.left = "0";
              canvas.style.width = "100%";
              canvas.style.height = "100%";
              
              container.appendChild(canvas);
              document.body.insertBefore(container, document.body.firstChild);
              
              const ctx = canvas.getContext("2d");
              let width = canvas.width = window.innerWidth;
              let height = canvas.height = window.innerHeight;
              
              window.addEventListener("resize", () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
              });
              
              let mouse = { x: -1000, y: -1000, active: false, px: -1000, py: -1000 };
              window.addEventListener("mousemove", (e) => {
                mouse.px = mouse.x;
                mouse.py = mouse.y;
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                mouse.active = true;
              });
              window.addEventListener("mouseleave", () => {
                mouse.active = false;
              });
              
              function isDarkTheme() {
                return document.documentElement.getAttribute("saved-theme") === "dark" || 
                       document.documentElement.dataset.theme === "dark" ||
                       document.documentElement.getAttribute("data-theme") === "dark";
              }
              
              class Star {
                constructor() {
                  this.reset();
                }
                reset() {
                  this.r = Math.random() * Math.max(width, height) * 0.8;
                  this.angle = Math.random() * Math.PI * 2;
                  this.size = Math.random() * 1.2 + 0.4;
                  this.speed = (Math.random() * 0.00015 + 0.00005) * (Math.random() > 0.5 ? 1 : -1);
                  this.opacity = Math.random() * 0.35 + 0.05;
                  this.ox = 0;
                  this.oy = 0;
                }
                update() {
                  this.angle += this.speed;
                  const baseX = width / 2 + Math.cos(this.angle) * this.r;
                  const baseY = height / 2 + Math.sin(this.angle) * this.r;
                  
                  if (mouse.active) {
                    const dx = baseX + this.ox - mouse.x;
                    const dy = baseY + this.oy - mouse.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    const limit = 100;
                    if (dist < limit) {
                      const force = (limit - dist) / limit;
                      const angle = Math.atan2(dy, dx);
                      this.ox += Math.cos(angle) * force * 3;
                      this.oy += Math.sin(angle) * force * 3;
                    }
                  }
                  
                  this.ox *= 0.95;
                  this.oy *= 0.95;
                  this.x = baseX + this.ox;
                  this.y = baseY + this.oy;
                }
                draw(dark) {
                  ctx.fillStyle = dark ? "rgba(255, 255, 255, " + this.opacity + ")" : "rgba(71, 85, 105, " + (this.opacity * 0.5) + ")";
                  ctx.beginPath();
                  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                  ctx.fill();
                }
              }
              
              class Galaxy {
                constructor(cx, cy, rMax, arms, speed) {
                  this.cx = cx;
                  this.cy = cy;
                  this.rMax = rMax;
                  this.arms = arms;
                  this.speed = speed;
                  this.angleOffset = 0;
                  this.particles = [];
                  
                  const numParticles = 60;
                  for (let i = 0; i < numParticles; i++) {
                    const r = Math.pow(Math.random(), 1.4) * rMax;
                    const arm = Math.floor(Math.random() * arms);
                    const armAngle = (arm / arms) * Math.PI * 2;
                    const spiralAngle = r * 0.04;
                    const angle = armAngle + spiralAngle + (Math.random() * 0.3 - 0.15);
                    
                    this.particles.push({
                      r: r,
                      angle: angle,
                      size: Math.random() * 1.2 + 0.3,
                      colorType: Math.random() > 0.45 ? 'core' : 'arm',
                      ox: 0,
                      oy: 0
                    });
                  }
                }
                update() {
                  this.angleOffset += this.speed;
                  if (this.cxRel) this.cx = width * this.cxRel;
                  if (this.cyRel) this.cy = height * this.cyRel;
                  
                  this.particles.forEach(p => {
                    const currAngle = p.angle + this.angleOffset;
                    const baseX = this.cx + Math.cos(currAngle) * p.r;
                    const baseY = this.cy + Math.sin(currAngle) * p.r;
                    
                    if (mouse.active) {
                      const dx = baseX + p.ox - mouse.x;
                      const dy = baseY + p.oy - mouse.y;
                      const dist = Math.sqrt(dx*dx + dy*dy);
                      const limit = 80;
                      if (dist < limit) {
                        const force = (limit - dist) / limit;
                        const angle = Math.atan2(dy, dx);
                        p.ox += Math.cos(angle) * force * 2;
                        p.oy += Math.sin(angle) * force * 2;
                      }
                    }
                    
                    p.ox *= 0.95;
                    p.oy *= 0.95;
                    p.x = baseX + p.ox;
                    p.y = baseY + p.oy;
                  });
                }
                draw(dark) {
                  this.particles.forEach(p => {
                    let alpha = (1 - (p.r / this.rMax)) * 0.3 + 0.05;
                    if (!dark) alpha *= 0.45;
                    
                    if (p.colorType === 'core') {
                      ctx.fillStyle = dark ? "rgba(234, 179, 8, " + (alpha * 1.4) + ")" : "rgba(15, 118, 110, " + (alpha * 1.1) + ")";
                    } else {
                      ctx.fillStyle = dark ? "rgba(74, 111, 165, " + alpha + ")" : "rgba(59, 130, 246, " + (alpha * 0.8) + ")";
                    }
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                  });
                }
              }
              
              class Dust {
                constructor(x, y) {
                  this.x = x;
                  this.y = y;
                  this.vx = (Math.random() - 0.5) * 1.2;
                  this.vy = (Math.random() - 0.5) * 1.2;
                  this.size = Math.random() * 1.5 + 0.8;
                  this.life = 1.0;
                  this.decay = Math.random() * 0.02 + 0.015;
                  this.color = Math.random() > 0.5 ? 'gold' : 'blue';
                }
                update() {
                  this.x += this.vx;
                  this.y += this.vy;
                  this.life -= this.decay;
                }
                draw(dark) {
                  if (this.life <= 0) return;
                  const alpha = dark ? this.life * 0.4 : this.life * 0.2;
                  if (this.color === 'gold') {
                    ctx.fillStyle = dark ? "rgba(234, 179, 8, " + alpha + ")" : "rgba(15, 118, 110, " + alpha + ")";
                  } else {
                    ctx.fillStyle = dark ? "rgba(59, 130, 246, " + alpha + ")" : "rgba(74, 111, 165, " + alpha + ")";
                  }
                  ctx.beginPath();
                  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                  ctx.fill();
                }
              }
              
              const stars = [];
              for (let i = 0; i < 75; i++) {
                stars.push(new Star());
              }
              
              const galaxies = [
                new Galaxy(width * 0.18, height * 0.22, 85, 2, 0.0012),
                new Galaxy(width * 0.82, height * 0.68, 110, 3, -0.0008),
                new Galaxy(width * 0.5, height * 0.48, 65, 2, 0.0016)
              ];
              galaxies[0].cxRel = 0.18; galaxies[0].cyRel = 0.22;
              galaxies[1].cxRel = 0.82; galaxies[1].cyRel = 0.68;
              galaxies[2].cxRel = 0.5; galaxies[2].cyRel = 0.48;
              
              const dusts = [];
              
              function animate() {
                if (!document.getElementById("cosmic-canvas")) return;
                ctx.clearRect(0, 0, width, height);
                const dark = isDarkTheme();
                
                stars.forEach(s => {
                  s.update();
                  s.draw(dark);
                });
                
                galaxies.forEach(g => {
                  g.update();
                  g.draw(dark);
                });
                
                if (mouse.active && (Math.abs(mouse.x - mouse.px) > 1 || Math.abs(mouse.y - mouse.py) > 1)) {
                  if (Math.random() < 0.35) {
                    dusts.push(new Dust(mouse.x, mouse.y));
                  }
                }
                
                for (let i = dusts.length - 1; i >= 0; i--) {
                  const d = dusts[i];
                  d.update();
                  if (d.life <= 0) {
                    dusts.splice(i, 1);
                  } else {
                    d.draw(dark);
                  }
                }
                
                requestAnimationFrame(animate);
              }
              
              animate();
            }
            
            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", initBackground);
            } else {
              initBackground();
            }
            document.addEventListener("nav", initBackground);
          })();
        ` }} />
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
