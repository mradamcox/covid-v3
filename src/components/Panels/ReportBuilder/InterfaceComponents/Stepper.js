import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "styled-components";

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const StyledStepper = styled(Stepper)`
  span {
    color: lightgray;
  }
`;

export default function StepperComponent({
  steps = [],
  activeStep = 0,
  handleStep = () => {},
  canProgress = false,
}) {
  const handleNext = () => handleStep(activeStep + 1);
  const handleBack = () => handleStep(activeStep - 1);
  
  return (
    <Box sx={{ width: "100%", paddingRight: "2em" }}>
      <StyledStepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </StyledStepper>
      <ButtonContainer>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleNext} disabled={!canProgress}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </ButtonContainer>
    </Box>
  );
}
