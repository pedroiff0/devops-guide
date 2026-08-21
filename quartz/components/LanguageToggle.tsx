import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const LanguageToggle: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  const basePath = cfg.baseUrl
    ? new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "")
    : ""

  return (
    <div class={classNames(displayClass, "nav-lang")}>
      <a
        href={`${basePath}/pt-br/`}
        title="Português (Brasil)"
        data-lang="pt-br"
        data-router-ignore
        onclick="event.preventDefault(); window.location.href = window.translatePath(window.location.pathname, 'pt-br')"
      >
        🇧🇷 PT-BR
      </a>
      <a
        href={`${basePath}/en/`}
        title="English (US)"
        data-lang="en"
        data-router-ignore
        onclick="event.preventDefault(); window.location.href = window.translatePath(window.location.pathname, 'en')"
      >
        🇺🇸 EN-US
      </a>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          if (!window.translatePath) {
            window.translatePath = function(path, targetLang) {
              const parts = path.split('/').filter(p => p);
              const langIdx = parts.findIndex(p => p === 'en' || p === 'pt-br');

              const prefix = langIdx === -1 ? parts : parts.slice(0, langIdx);
              const rest = langIdx === -1 ? [] : parts.slice(langIdx + 1);

              const trailingSlash = path.endsWith('/') ? '/' : '';
              return '/' + [...prefix, targetLang, ...rest].join('/') + trailingSlash;
            };
          }
        `,
        }}
      />
    </div>
  )
}

export default (() => LanguageToggle) satisfies QuartzComponentConstructor
