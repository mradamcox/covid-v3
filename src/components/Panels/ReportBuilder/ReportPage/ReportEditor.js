import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Report from "../Report/Report";
import { MetaButton, StyledPagination } from "../Report/MetaButtons";
import Stack from "@mui/material/Stack";
import { AddItemsSpeeedDial } from "../InterfaceComponents/AddItemsSpeedDial";
import { ZoomInMap, ZoomOutMap, CropFree } from "@mui/icons-material";

export const ReportEditor = ({ reportName, activeStep }) => {
  const dispatch = useDispatch();

  const currPage = useSelector(({ report }) => report.pageIdx);
  const layouts = useSelector(
    ({ report }) => report.reports?.[reportName]?.layout
  );
  const pageLength = layouts?.length;
  const layout = layouts?.[currPage];

  const [zoomMultiplier, setZoomMultiplier] = useState(1);
  const handleZoom = (action) => {
    switch (action) {
      case "zoomIn":
        setZoomMultiplier((prev) => prev + 0.1);
        break;
      case "zoomOut":
        setZoomMultiplier((prev) => prev - 0.1);
        break;
      case "reset":
        setZoomMultiplier(1);
        break;
      default:
        break;
    }
  };
  const handleAddItem = (item) => {
    if (item.type === "page") {
      handleAddPage();
    } else {
      dispatch({
        type: "ADD_REPORT_ITEM",
        payload: {
          reportName,
          pageIdx: currPage,
          item,
        },
      });
    }
  };
  const handleAddPage = () =>
    dispatch({
      type: "ADD_REPORT_PAGE",
      payload: {
        reportName,
      },
    });

  const handleChangePage = (e, value) => {
    dispatch({
      type: "SET_PAGE_IDX",
      payload: value - 1,
    });
  };

  const canAddItem = !layout?.find(
    (item) => item.y + item.h >= 7 && item.x + item.w >= 4
  );

  return (
    <>
      <Stack>
        <Report
          reportName={reportName}
          activeStep={activeStep}
          zoomMultiplier={zoomMultiplier}
        />

        <div>
          <Stack
            spacing={2}
            width="100%"
            alignItems="flex-end"
            justifyContent="space-between"
            direction="row"
            sx={{
                mt: 2
            }}
          >
            <Stack spacing={2}>
              <p>Page Zoom</p>
              <Stack direction="row" spacing={2}>
                <MetaButton
                  variant="text"
                  aria-label="Zoom in report page"
                  onClick={() => handleZoom("zoomIn")}
                >
                  <ZoomInMap />
                </MetaButton>
                <MetaButton
                  variant="text"
                  aria-label="Zoom out report page"
                  onClick={() => handleZoom("zoomOut")}
                >
                  <ZoomOutMap />
                </MetaButton>
                <MetaButton
                  variant="text"
                  aria-label="Reset zoom"
                  onClick={() => handleZoom("reset")}
                >
                  <CropFree />
                </MetaButton>
              </Stack>
            </Stack>
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <StyledPagination
                variant="outlined"
                shape="rounded"
                count={pageLength}
                page={currPage + 1}
                onChange={handleChangePage}
              />
            </Stack>
            <Stack justifyContent="flex-end" sx={{maxHeight: 20}}>
              <AddItemsSpeeedDial
                canAddItem={canAddItem}
                handleAddItem={handleAddItem}
              />
            </Stack>
          </Stack>
        </div>
      </Stack>
    </>
  );
};
