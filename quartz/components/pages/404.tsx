import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg, ctx }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = ctx.argv.serve ? "/" : url.pathname

  return (
    <article class="notfound">
      <img
        class="notfound-gif"
        src="https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif"
        alt="404"
        onError={(e) => {
          e.currentTarget.style.display = "none"
          const em = document.getElementById("nf-emoji")
          if (em) em.style.display = "block"
        }}
      />
      <div id="nf-emoji" class="notfound-emoji" style="display:none">👻</div>
      <h1 id="nf-title">404</h1>
      <p id="nf-msg" />
      <a id="nf-home" class="notfound-btn" href={baseDir} />
      <a id="nf-issue" class="notfound-btn notfound-btn-secondary" href="#" target="_blank" rel="noopener" />
    </article>
  )
}

// O Quartz injeta afterDOMLoaded como um <script> real (executa no cliente).
// Strings de UI por idioma, detectadas da URL.
NotFound.afterDOMLoaded = `
function fill404() {
  var root = document.querySelector(".notfound");
  if (!root) return;

  var I18N = {
    pt: {
      title: "Página não encontrada",
      msg: "Ops! Não encontramos esta página. Ela pode ser privada ou ainda não foi traduzida para este idioma. Você pode solicitar a tradução abaixo.",
      home: "Voltar à página inicial",
      request: "Solicitar esta tradução",
      redirect: "Redirecionando para a versão em português…",
      issueTitle: "Tradução em falta: {{slug}}",
      issueBody: "A página \`{{slug}}\` foi acessada mas ainda não tem tradução para \`{{lang}}\`.\\nPor favor, adicione a tradução desta página."
    },
    en: {
      title: "Page not found",
      msg: "Oops! We couldn't find this page. It may be private or not translated into this language yet. You can request the translation below.",
      home: "Back to home page",
      request: "Request this translation",
      redirect: "Redirecting to the Portuguese version…",
      issueTitle: "Missing translation: {{slug}}",
      issueBody: "The page \`{{slug}}\` was accessed but has no translation into \`{{lang}}\` yet.\\nPlease add the translation for this page."
    },
    es: {
      title: "Página no encontrada",
      msg: "¡Ups! No encontramos esta página. Puede ser privada o no estar traducida a este idioma todavía. Puedes solicitar la traducción abajo.",
      home: "Volver a la página de inicio",
      request: "Solicitar esta traducción",
      redirect: "Redirigiendo a la versión en portugués…",
      issueTitle: "Traducción en falta: {{slug}}",
      issueBody: "La página \`{{slug}}\` fue accedida pero aún no tiene traducción a \`{{lang}}\`.\\nPor favor, añade la traducción de esta página."
    },
    fr: {
      title: "Page introuvable",
      msg: "Oups ! Nous n'avons pas trouvé cette page. Elle peut être privée ou pas encore traduite dans cette langue. Vous pouvez demander la traduction ci-dessous.",
      home: "Retour à l'accueil",
      request: "Demander cette traduction",
      redirect: "Redirection vers la version portugaise…",
      issueTitle: "Traduction manquante : {{slug}}",
      issueBody: "La page \`{{slug}}\` a été consultée mais n'a pas encore de traduction en \`{{lang}}\`.\\nMerci d'ajouter la traduction de cette page."
    }
  };

  function detectLang() {
    var segs = window.location.pathname.split("/").filter(Boolean);
    var first = segs[0] || "";
    if (["pt-br", "en", "es", "fr"].indexOf(first) !== -1) {
      return first === "pt-br" ? "pt" : first;
    }
    return "pt";
  }

  var lang = detectLang();
  var T = I18N[lang] || I18N.pt;

  var titleEl = document.getElementById("nf-title");
  var msgEl = document.getElementById("nf-msg");
  var homeEl = document.getElementById("nf-home");
  var issueEl = document.getElementById("nf-issue");
  if (titleEl) titleEl.textContent = T.title;
  if (msgEl) msgEl.textContent = T.msg;
  if (homeEl) homeEl.textContent = T.home;
  if (issueEl) issueEl.textContent = T.request;

  var basePath = document.body.dataset.basepath || "";
  if (basePath.length > 1 && basePath.endsWith("/")) basePath = basePath.slice(0, -1);
  var rawPath = window.location.pathname;
  if (basePath.length > 1 && rawPath.indexOf(basePath) === 0) rawPath = rawPath.slice(basePath.length);
  var pathname = decodeURIComponent(rawPath);
  var slug = pathname;
  if (slug.startsWith("/")) slug = slug.slice(1);
  if (slug.endsWith("/index")) slug = slug.slice(0, -6);
  if (slug.endsWith(".html")) slug = slug.slice(0, -5);
  var repo = "pedroiff0/page";
  var issueTitle = encodeURIComponent(T.issueTitle.replace("{{slug}}", slug).replace("{{lang}}", lang));
  var issueBody = encodeURIComponent(T.issueBody.replace("{{slug}}", slug).replace("{{lang}}", lang));
  if (issueEl) issueEl.href = "https://github.com/" + repo + "/issues/new?title=" + issueTitle + "&body=" + issueBody + "&labels=translation";

  var w = window;
  if (typeof w.fetchData !== "undefined") {
    w.fetchData.then(function(index){
      var rest = slug;
      if (rest.startsWith("pt-br/")) rest = rest.slice(6);
      else if (rest.startsWith("en/")) rest = rest.slice(3);
      else if (rest.startsWith("es/")) rest = rest.slice(3);
      else if (rest.startsWith("fr/")) rest = rest.slice(3);
      var ptTarget = (basePath.length > 1 ? basePath : "") + "/pt-br/" + rest;
      var exists = index[ptTarget.toLowerCase()] != null || index[("pt-br/" + rest).toLowerCase()] != null;
      if (exists) {
        setTimeout(function(){
          if (msgEl) msgEl.textContent = T.redirect;
          window.location.replace(ptTarget);
        }, 5000);
      }
    });
  }
}

// roda no carregamento da pagina E em navegacao SPA (evento 'nav' do Quartz)
fill404();
document.addEventListener("nav", fill404);
`

export default (() => NotFound) satisfies QuartzComponentConstructor
