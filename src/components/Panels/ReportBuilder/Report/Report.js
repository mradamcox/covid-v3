import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportPage from "../ReportPage/ReportPage";
import {
  LayoutContainer,
  PrintContainer,
  PrintButton,
} from "./LayoutContainer";
import { MetaButtonsContainer, MetaButton } from "./MetaButtons";

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from "@mui/material";

export default function Report({ reportName = "", activeStep, zoomMultiplier = 1 }) {
  const dispatch = useDispatch();
  const currPage = useSelector(({ report }) => report.pageIdx);
  const gridContext = useRef({});
  const pagesRef = useRef({});
  const containerRef = useRef(null)
  const pageWidth = containerRef?.current?.clientWidth;

  const handleGridContext = (grid, pageIdx) => {
    gridContext.current = {
      ...gridContext.current,
      [pageIdx]: grid,
    };
  };

  const handleGridUpdate = (pageIdx) => {
    const currItems = gridContext?.current[pageIdx]?._items;
    const currItemsOrder = currItems.map((item) => item._id);
    const itemsMin = Math.min(...currItemsOrder);
    dispatch({
      type: "REORDER_REPORT_ITEMS",
      payload: {
        reportName,
        pageIdx,
        itemsMin,
        currItemsOrder,
      },
    });
  };

  const handleRef = (ref, idx) => {
    pagesRef.current = {
      ...pagesRef.current,
      [idx]: ref,
    };
  };

  const handlePrint = (fileType) => {
    import("react-component-export-image").then(
      ({ exportComponentAsJPEG, exportComponentAsPDF }) => {
        Object.values(pagesRef.current).forEach((pageRef, idx) => {
          try {
            if (fileType === "JPG") {
              exportComponentAsJPEG(pageRef, {
                fileName: `${reportName}-page-${idx + 1}.jpg`,
              });
            } else if (fileType === "PDF") {
              exportComponentAsPDF(pageRef, {
                fileName: `${reportName}-page-${idx + 1}.pdf`,
              });
            }
          } catch {
            console.log("error");
          }
        });
      }
    );
  };
  return (
    <LayoutContainer ref={containerRef}>
      {activeStep === 3 && (
        <PrintContainer>
          <h2>Nice work!</h2>
          <h4>
            Your report has been saved. On your current device, come back to
            this page any time and select your report name from the 'Previous
            Reports' drop down to see up-to-date data.
          </h4>
          <p>
            Currently, you may export your report pages as JPGs.
            We plan to add an export feature as a single PDF. To leave the
            report builder, click 'finish' below.
          </p>
          <p>
            This new feature is an experimental feature, and we'd love to hear
            your feedback. Send us a message on our{" "}
            <a
              href={`${process.env.PUBLIC_URL}/contact`}
              target="_blank"
              rel="noreferrer"
            >
              contact page.
            </a>
          </p>
          <PrintButton onClick={() => handlePrint("JPG")}>
            Export JPGs
          </PrintButton>
          {/* <PrintButton onClick={() => handlePrint("PDF")}>
            Export PDF
          </PrintButton> */}
        </PrintContainer>
      )}
      <ReportPage
        onMount={handleRef}
        key={`report-page-${reportName}-${currPage}`}
        pageIdx={currPage}
        {...{ handleGridContext, handleGridUpdate, reportName, pageWidth, zoomMultiplier }}
      />
      <ErrorToast />
    </LayoutContainer>
  );
}

function ErrorToast() {
  const dispatch = useDispatch();
  const error = useSelector(({ report }) => report.error);
  const {
    type,
    reportName,
    pageIdx
  } = error || {};

  const handleClose = () => {
    dispatch({
      type: "CLEAR_ERROR"
    })
  }

  const handleAddPage = () =>
    dispatch({
      type: "ADD_REPORT_PAGE",
      payload: {
        reportName
      },
    });

  if (!error) return null;
  const messages = {
    "Invalid layout": `Page ${pageIdx + 1} is full! Resize, remove items, or add a new page.`
  }
  const text = messages[type]

  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}
        action={
          <Button color="inherit" size="small" onClick={handleAddPage}>
            Add Page
          </Button>}>
        {text}
      </Alert>
    </Snackbar>
  )
}