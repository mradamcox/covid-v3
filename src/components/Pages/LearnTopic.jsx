import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
// import { NavLink } from 'react-router-dom';

// import Grid from '@mui/material/Grid';
// import MuiAccordion from '@mui/material/Accordion';
// import MuiAccordionSummary from '@mui/material/AccordionSummary';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';

import { NavBar, Footer, ContentContainer } from "../../components";
import MdxPages from "../Learn/MdxPages";
import {MdxStylesWrapper} from "../Learn/MdxStylesWrapper";

const LearnPage = styled.div`
  background: white;
`;

export default function Learn({ history, location, match }) {
  const {
    params: { topic },
  } = match;

  const Content = MdxPages[topic]?.default;
  const config = MdxPages[topic]?.config;

  const { description, title, slug } = config || {};

  return (
    <LearnPage>
      <Helmet>
        <title>{title || "US Covid Atlas :: Learn"}</title>
        <meta
          name="description"
          content={description || "Learn about the US Covid Atlas"}
        />
        <link
          rel="canonincal"
          href={`https://uscovidatlas.com/learn/${slug}`}
        />
      </Helmet>
      <NavBar light />
      <ContentContainer>
        <MdxStylesWrapper>
          {Content ? <Content /> : "No content found. Sorry!"}
        </MdxStylesWrapper>
      </ContentContainer>
      <Footer />
    </LearnPage>
  );
}
