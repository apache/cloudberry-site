import { useThemeConfig } from "@docusaurus/theme-common";
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import type { Props } from "@theme/Navbar/Layout";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import clsx from "clsx";
import { type ComponentProps } from "react";

import useIsBaseUrl from "@site/src/hooks/useIsBaseUrl";
import styles from "./styles.module.css";

function NavbarBackdrop(props: ComponentProps<"div">) {
  return (
    <div
      role="presentation"
      {...props}
      className={clsx("navbar-sidebar__backdrop", props.className)}
    />
  );
}

export default function NavbarLayout({ children }: Props): JSX.Element {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);
  const config = useThemeConfig();

  const logoObj = config.navbar.logo as typeof config.navbar.logo & {
    backSrc?: string;
  };

  if (logoObj.backSrc) {
    logoObj.src = logoObj.backSrc;
  }
  // Swap to the white logo only on the home page hero (and only when
  // the mobile sidebar is closed, since the sidebar shows a light
  // panel where the dark logo reads better).
  if (useIsBaseUrl() && !mobileSidebar.shown) {
    logoObj.backSrc = logoObj.src;
    logoObj.src = logoObj.srcDark;
  }

  return (
    <nav
      ref={navbarRef}
      aria-label={translate({
        id: "theme.NavBar.navAriaLabel",
        message: "Main",
        description: "The ARIA label for the main navigation",
      })}
      className={clsx(
        "navbar",
        "navbar--fixed-top",
        hideOnScroll && [
          styles.navbarHideable,
          !isNavbarVisible && styles.navbarHidden,
        ],
        {
          "navbar--dark": style === "dark",
          "navbar--primary": style === "primary",
          "navbar-sidebar--show": mobileSidebar.shown,
          // Apply home-page dark hero styling only on the home page AND
          // when the mobile sidebar is closed. When the sidebar is open,
          // it covers the navbar with a solid panel and we don't want
          // the white-on-white text/logo bleed.
          "navbar-home-lighting": useIsBaseUrl() && !mobileSidebar.shown,
        }
      )}
    >
      {children}
      <NavbarBackdrop onClick={mobileSidebar.toggle} />
      <NavbarMobileSidebar />
    </nav>
  );
}
