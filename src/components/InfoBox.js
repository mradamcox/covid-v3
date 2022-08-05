// This component has the wiki/manual/info

// Library import
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// MUI import
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// Config/component import
import colors from "../config/colors";
import { StyledDropDown } from "../components/Interface/StyledDropDown";
import pages from './/Learn/MdxPages';
import { MdxStylesWrapper } from "./Learn/MdxStylesWrapper";
import { Button } from "@mui/material";
//// Component Styling
// Main container for component
const InfoContainer = styled.div`
  background: ${colors.gray};
  color: ${colors.white};
  padding: 0;
  border-radius: 4px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: ${(props) => (props.active ? "flex" : "none")};
  flex-direction: row;
  padding-top:3em;
  max-height:100%;
  svg {
    width: 25px;
    height: 25px;
    padding: 0;
    fill: ${colors.white};
    display: inline;
    transition: 250ms all;
    cursor: pointer;
  }
  a {
    color: ${colors.yellow};
    text-decoration: none;
  }
  @media (max-width: 1024px) {
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);
    overflow: hidden;
  }
  hr {
    margin: 1em 0 2em 0;
  }
`;

// Left hand side list of available pages
// On mobile, this is replaced by a select drop down
const Drawer = styled.div`
  width:12em;
  padding:0 .5em;
  flex: 0 0 auto;
`;

// Buttons on left-hand side drawer
const DrawerButton = styled(Button)`
  text-transform:capitalize;
  line-height: 1;
  display: block;
  text-align: left;
  background: none;
  color: ${(props) => (props.active ? colors.lightblue : colors.white)};
  border: none;
  outline: none;
  line-height: 2;
  transition: 250ms;
  padding:0;
  font-family: "Lato", sans-serif;
  opacity: ${(props) => (props.active ? 1 : 0.6)};
  &:hover {
    opacity: 1;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

const BodyContainerOuter = styled.div`
`

// Container for main content
const BodyContainer = styled.div`
  height:100%;
  max-height:100%;
  box-sizing: border-box;
  overflow-y: auto;
  padding:1em 1em 1em 2em;
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #2b2b2b;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: url("${process.env.PUBLIC_URL}/icons/grip.png"), #999;
    background-position: center center;
    background-repeat: no-repeat, no-repeat;
    background-size: 50%, 100%;
    transition: 125ms all;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: url("${process.env.PUBLIC_URL}/icons/grip.png"), #f9f9f9;
    background-position: center center;
    background-repeat: no-repeat, no-repeat;
    background-size: 50%, 100%;
  }
  img {
    padding: 1em;
  }
`;

// Yellow highlighted button to show interface element when going through tutorial
const TutorialButton = styled.button`
  background: none;
  outline: none;
  box-sizing: border-box;
  border: 1px solid white;
  cursor: pointer;
  text-align: left;
  padding: 5px;
  width: calc(50% - 10px);
  margin: 5px;
  display: inline-block;
  color: ${colors.white};
  font-family: "Lato", sans-serif;
  padding: 10px;
  transition: 250ms all;
  &:hover {
    background: ${colors.yellow};
    color: ${colors.gray};
  }
  h3,
  p {
    padding: 0;
    margin: 0;
  }
`;

// Mobile only: drop down to select article instead of list of pages
const PagesDropDown = styled(StyledDropDown)`
  position: absolute;
  top: 0;
  visibility: hidden;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 1024px) {
    visibility: visible;
  }
`;
// End styles

// Tutorials
const tutorialInfo = [
  {
    title: "Choropleth Maps",
    subtitle:
      "Explore counts and percentages of cases, deaths, hosipital beds, and testing data.",
    link: "choropleth-tutorial",
  },
  {
    title: "Hotspots",
    subtitle: "Find groups of counties and states affected by the virus.",
    link: "hotspot-tutorial",
  },
  {
    title: "Emerging Trends",
    subtitle: "Locate areas that will soon be significantly affected by COVID.",
    link: "emerging-tutorial",
  },
  {
    title: "Change Over Time",
    subtitle: "See the history of the virus by county and state.",
    link: "change-tutorial",
  },
];

// Infobox component
const InfoBox = () => {
  const panelOpen = useSelector(({ ui }) => ui.panelState.tutorial);
  const [currentArticle, setCurrentArticle] = useState('release-notes');
  const Content = pages[currentArticle]?.default;
  return (
    <InfoContainer active={panelOpen}>
      <Drawer>
        <DrawerButton onClick={() => setCurrentArticle("release-notes")}>Release Notes</DrawerButton>
        <DrawerButton onClick={() => setCurrentArticle("bug-report")}>Bug Report</DrawerButton>
        <hr/>
        <p>Tutorials</p>
        {Object.keys(pages).filter(f => ['release-notes', 'stylesheet', 'bug-report'].includes(f) === false).map((slug, i) => (
          <DrawerButton onClick={() => setCurrentArticle(slug)}>{slug.replace(/-/g, ' ')}</DrawerButton>
        ))}
      </Drawer>
      <BodyContainerOuter>
        <BodyContainer>
          <MdxStylesWrapper>
            {!!Content && <Content />}
          </MdxStylesWrapper>
        </BodyContainer>
      </BodyContainerOuter>
    </InfoContainer>
  );
};

export default InfoBox;
