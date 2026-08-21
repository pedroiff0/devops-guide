import { StaticResources } from "../util/resources"
import { BuildCtx } from "../util/ctx"

export function getStaticResourcesFromPlugins(ctx: BuildCtx) {
  const staticResources: StaticResources = {
    css: [],
    js: [],
    additionalHead: [],
  }

  for (const transformer of [...ctx.cfg.plugins.transformers, ...ctx.cfg.plugins.emitters]) {
    const res = transformer.externalResources ? transformer.externalResources(ctx) : {}
    if (res?.js) {
      staticResources.js.push(...res.js)
    }
    if (res?.css) {
      staticResources.css.push(...res.css)
    }
    if (res?.additionalHead) {
      staticResources.additionalHead.push(...res.additionalHead)
    }
  }

  // if serving locally, listen for rebuilds and reload the page
  if (ctx.argv.serve) {
    staticResources.js.push({
      loadTime: "afterDOMReady",
      contentType: "inline",
      script: `
        try {
          const wsProto = location.protocol === 'https:' ? 'wss:' : 'ws:';
          const socket = new WebSocket(\`\${wsProto}//\${location.host}\`);
          socket.addEventListener('message', () => document.location.reload(true));
        } catch (e) {
          console.warn('[Quartz] Live reload WebSocket connection failed:', e);
        }
      `,
    })
  }

  return staticResources
}

export * from "./transformers"
export * from "./filters"
export * from "./emitters"
export * from "./types"
export * from "./config"
export * as PageTypes from "./pageTypes"
export * as PluginLoader from "./loader"
