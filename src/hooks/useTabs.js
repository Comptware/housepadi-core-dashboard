import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useTabs = ({ tabs }) => {
  const location = useLocation();
  const path = location.pathname;

  const activeTabIndex = tabs?.findIndex(({ link }) => link === path);

  const filterActiveTab = () =>
    useMemo(() => tabs?.find(({ link }) => link === path), [path]);
  const filterActiveContent = () =>
    useMemo(
      () =>
        tabs
          ?.filter(({ link }) => link === path)
          .map(({ content }, index) => (
            <div key={index} className="w-full h-full rounded-lg">
              {content}
            </div>
          )),
      [path]
    );

  return {
    filterActiveTab,
    filterActiveContent,
    activeTabIndex,
  };
};
