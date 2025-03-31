import type { Content } from "@theme/BlogPostPage";
import clsx from "clsx";
import { ChangeEvent, useState } from "react";

import { useHistory, useLocation } from "@docusaurus/router";
import SearchIcon from "@site/static/img/blog/search.svg";
import { debounce } from "lodash-es";
import styles from "./styles.module.scss";
export default function BlogSidebarDesktop(props: {
  items: { content: Content }[];
}): JSX.Element {
  const location = useLocation();
  const searchTag = new URLSearchParams(location.search).get("tag");
  const searchKey = new URLSearchParams(location.search).get("key");
  const tags = (props.items || [])
    .map((item) => {
      return item.content.metadata.tags.map((tag) => {
        return tag.label;
      });
    })
    .flat(1);

  // Deduplication
  const deTags = tags.filter((item, index) => {
    return tags.indexOf(item) === index;
  });

  deTags.unshift("All");

  const [tag, setTag] = useState(searchTag || deTags[0]);
  const history = useHistory();
  const handleClick = (item) => {
    setTag(item);
    // sets query
    history.push({ search: `?tag=${item}` });
  };

  const handleInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (!v) {
      history.push({ search: `?tag=${tag}` });
      return;
    }

    history.push({ search: `?tag=${tag}&key=${v}` });
  }, 1000);
  const handleSearch = () => {
    if (!searchKey) {
      history.push({ search: `?tag=${tag}` });
      return;
    }
    history.push({ search: `?tag=${tag}&key=${searchKey}` });
  };

  return (
    <aside className={styles.aside}>
      <nav className={clsx(styles.sidebar, "thin-scrollbar")}>
        {/* <div className={clsx(styles.sidebarItemTitle)}>Blog categories</div> */}
        <ul className={clsx(styles.sidebarItemList, "clean-list")}>
          {deTags.map((item) => (
            <li
              key={item}
              className={clsx(styles.sidebarItem, {
                [styles.active]: tag === item,
              })}
              onClick={() => handleClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.rightSearch}>
        <input
          placeholder="Search"
          type="text"
          onChange={handleInputChange}
          onBlur={handleSearch}
        />
        <SearchIcon
          stroke="var(--title-text-color)"
          className={styles.searchIcon}
        />
      </div>
    </aside>
  );
}
