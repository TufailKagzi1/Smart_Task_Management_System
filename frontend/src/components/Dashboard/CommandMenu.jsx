import "react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";
import { useEffect, useState } from "react";
import ApiService from "../../Services/ApiService";

const CommandMenu = ({ open, setOpen }) => {

  const [page, setPage] = useState("root");
  const [search, setSearch] = useState("");


  const filteredItems = filterItems(
    [
      {
        heading: "Home",
        id: "home",
        items: [
          {
            id: "home",
            children: "Home",
            icon: "HomeIcon",
            href: "/",
          },
          {
            id: "settings",
            children: "Settings",
            icon: "CogIcon",
            href: "/user",
          },
          {
            id: "projects",
            children: "Projects",
            icon: "RectangleStackIcon",
            href:'mytask'
          },
        ],
      },
      {
        heading: "Other",
        id: "advanced",
        items: [
          {
            id: "developer-settings",
            children: "Developer settings",
            icon: "CodeBracketIcon",
            href: "#",
          },
          {
            id: "privacy-policy",
            children: "Privacy policy",
            icon: "LifebuoyIcon",
            href: "#",
          },
          {
            id: "log-out",
            children: "Log out",
            icon: "ArrowRightOnRectangleIcon",
            onClick: () => {
              let log = confirm("Are you sure you want to logout?");
              if (log) {
                ApiService.logout();
                navigate('/login');
              }
            },
          },
        ],
      },
    ],
    search
  );



  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>

      <CommandPalette.Page id="projects">
        {/* Projects page */}
      </CommandPalette.Page>
    </CommandPalette>
  );
};

export default CommandMenu;
