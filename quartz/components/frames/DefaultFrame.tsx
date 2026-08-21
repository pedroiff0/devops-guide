import { PageFrame, PageFrameProps } from "./types"
import HeaderConstructor from "../Header"
import LanguageToggleConstructor from "../LanguageToggle"
import CustomFooterConstructor from "../CustomFooter"
import CreatedDateConstructor from "../CreatedDate"

const Header = HeaderConstructor()
const LanguageToggle = LanguageToggleConstructor()
const CustomFooter = CustomFooterConstructor()
const CreatedDate = CreatedDateConstructor()

/**
 * The default page frame — three-column layout with left sidebar, center
 * content (header + body + afterBody), and right sidebar, followed by a footer.
 *
 * This is the original Quartz layout, extracted from renderPage.tsx.
 */
export const DefaultFrame: PageFrame = {
  name: "default",
  render({
    componentData,
    header,
    beforeBody,
    pageBody: Content,
    afterBody,
    left,
    right,
  }: PageFrameProps) {
    return (
      <>
        <div class="left sidebar">
          <LanguageToggle {...componentData} />
          {left.map((BodyComponent) => (
            <BodyComponent {...componentData} />
          ))}
        </div>
        <div class="center">
          <div class="page-header">
            <Header {...componentData}>
              {header.map((HeaderComponent) => (
                <HeaderComponent {...componentData} />
              ))}
            </Header>
            <div class="popover-hint">
              {beforeBody.map((BodyComponent) => (
                <BodyComponent {...componentData} />
              ))}
            </div>
            <CreatedDate {...componentData} />
          </div>
          <Content {...componentData} />
          <hr />
          <div class="page-footer">
            {afterBody.map((BodyComponent) => (
              <BodyComponent {...componentData} />
            ))}
          </div>
          <CustomFooter {...componentData} />
        </div>
        <div class="right sidebar">
          {right.map((BodyComponent) => (
            <BodyComponent {...componentData} />
          ))}
        </div>
      </>
    )
  },
}
