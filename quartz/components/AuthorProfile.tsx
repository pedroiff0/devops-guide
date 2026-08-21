import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { pathToRoot } from "../util/path"

const AuthorProfile: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  // Translate based on path
  const isEn = fileData.slug?.startsWith("en") ?? false
  const baseDir = pathToRoot(fileData.slug!)
  
  const content = {
    location: isEn ? "📍 Bom Jesus do Itabapoana, RJ - Brazil" : "📍 Bom Jesus do Itabapoana, RJ - Brasil",
    institution: "🏫 Instituto Federal Fluminense",
    bio: isEn ? "I am an undergraduate student in Computer Engineering at the Fluminense Federal Institute, in Rio de Janeiro, Brazil. I have been working with astronomy since 2022." : "Sou estudante de Engenharia de Computação no Instituto Federal Fluminense, no Rio de Janeiro, Brasil. Trabalho com astronomia desde 2022.",
    email: "✉️ pedroiff0@gmail.com",
    cv: isEn ? "📄 View CV" : "📄 Ver CV",
    cvLink: "/cv.pdf",
    timezone: isEn ? "🕒 Time: " : "🕒 Hora: "
  }

  return (
    <div class={classNames(displayClass, "author-profile")}>
      <details class="author-details">
        <summary class="author-summary">
          <img src={baseDir + "assets/profilepic.jpeg"} alt="Pedro H. R. de Andrade" class="author-avatar-small" />
          <span>Pedro H. R. de Andrade</span>
        </summary>
        <div class="author-info">
          <img src={baseDir + "assets/profilepic.jpeg"} alt="Pedro H. R. de Andrade" class="author-avatar" />
          <p class="author-bio">{content.bio}</p>
          <p class="author-detail">{content.institution}</p>
          <p class="author-detail">{content.location}</p>
          <p class="author-detail"><a href={"mailto:" + content.email.replace("✉️ ", "")}>{content.email}</a></p>
          <p class="author-detail"><a href={baseDir + content.cvLink.replace(/^\//, '')} target="_blank">{content.cv}</a></p>
          <p class="author-detail" id="author-time">{content.timezone} <span></span></p>
        </div>
      </details>
      <script dangerouslySetInnerHTML={{
        __html: `
          function updateTime() {
            const timeSpan = document.querySelector('#author-time span');
            if (!timeSpan) return;
            const now = new Date();
            timeSpan.textContent = now.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
          }
          updateTime();
          setInterval(updateTime, 10000);
        `
      }} />
    </div>
  )
}



export default (() => AuthorProfile) satisfies QuartzComponentConstructor
