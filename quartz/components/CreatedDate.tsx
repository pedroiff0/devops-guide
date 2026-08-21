import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { Date as DateComponent } from "./Date"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

const CreatedDate: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const created = fileData.dates?.created
  const modified = fileData.dates?.modified
  if (!created && !modified) return null
  const locale = cfg.locale ?? "en-US"
  const labels = i18n(locale).components.contentMeta

  return (
    <p class={classNames(displayClass, "created-date")}>
      {created && (
        <span>
          {labels.created}: <DateComponent date={created} locale={locale} />
        </span>
      )}
      {created && modified && <span class="date-separator"> · </span>}
      {modified && (
        <span>
          {labels.modified}: <DateComponent date={modified} locale={locale} />
        </span>
      )}
    </p>
  )
}

export default (() => CreatedDate) satisfies QuartzComponentConstructor
