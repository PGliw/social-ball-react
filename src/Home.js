import React from "react";
import NavDrawer from "./NavDrawer";
import {TeamBuilder} from "./forms/new_match/teambuilder/TeamBuilder";

export const Home = () => (
  <NavDrawer>
      <TeamBuilder/>
  </NavDrawer>
);
