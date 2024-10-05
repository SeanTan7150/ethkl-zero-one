import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Step,
  Stepper,
  StepLabel,
  Select,
  MenuItem,
  Button,
  Grid2,
} from "@mui/material";
import PropTypes from "prop-types";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  StoreArtistCard,
  StoreCreditCard,
  StoreTimeCard,
} from "../../components";
import { ModalContext } from "../../context/useModalContext";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      },
    },
  ],
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <MonetizationOnOutlinedIcon />,
    2: <AccessTimeIcon />,
    3: <ShoppingCartOutlinedIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ["Credit Amount", "Time to Reach", "Order Summary"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const creditInfo = [
  {
    label: "1 Credit",
    description: "0.001 ETH (~$2.32)",
    eth: 0.001,
    price: 2.32,
    image: "/store/one-credit.png",
  },
  {
    label: "3 Credits",
    description: "0.0025 ETH (~$5.90)",
    eth: 0.0025,
    price: 5.9,
    image: "/store/five-credit-two.png",
  },
  {
    label: "5 Credits",
    description: "0.004 ETH (~$9.44)",
    eth: 0.004,
    price: 9.44,
    image: "/store/five-credit.png",
  },
];

const timeToReachInfo = [
  {
    label: "Slow (~ 3 Days)",
    description: "Free",
    eth: 0,
    price: 0,
    image: "/store/bicycle-meme-2.png",
  },
  {
    label: "Average (~ 2 Days)",
    description: "0.00005 ETH (~$0.16)",
    eth: 0.00005,
    price: 0.16,
    image: "/store/flying-myvi.png",
  },
  {
    label: "Fast (~ Within 1 Day)",
    description: "0.0001 ETH (~$0.23)",
    eth: 0.0001,
    price: 0.23,
    image: "/store/fast-meme.png",
  },
];

function TimeToReachComponent({ activeTime, setActiveTime, onSelectTime }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",

          my: 5,
          maxWidth: "90%",
          mx: "auto",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {timeToReachInfo.map((obj, index) => (
          <StoreTimeCard
            image={obj.image}
            key={index}
            isActive={activeTime === index ? true : false}
            label={obj.label}
            description={obj.description}
            onPressCard={() => {
              setActiveTime(index);
              onSelectTime(obj);
              console.log(activeTime);
            }}
          />
        ))}
      </Box>
    </>
  );
}

function CreditAmountComponent({ activeCard, setActiveCard, onSelectCredit }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",

          my: 5,
          maxWidth: "90%",
          mx: "auto",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {creditInfo.map((obj, index) => (
          <StoreCreditCard
            image={obj.image}
            key={index}
            isActive={activeCard === index ? true : false}
            label={obj.label}
            description={obj.description}
            onPressCard={() => {
              setActiveCard(index);
              onSelectCredit(obj);
              console.log(activeCard);
            }}
          />
        ))}
      </Box>
    </>
  );
}

function SummaryTableComponent({ selectedCredit, selectedTime }) {
  console.log(selectedCredit);
  return (
    <>
      <TableContainer
        component={Box}
        sx={{
          mb: 5,
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                }}
              >
                Item
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Eth
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {selectedCredit.label}
              </TableCell>
              <TableCell align="right">{selectedCredit.eth}</TableCell>

              <TableCell align="right">{selectedCredit.price}</TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {selectedTime.label}
              </TableCell>
              <TableCell align="right">{selectedTime.eth}</TableCell>

              <TableCell align="right">{selectedTime.price}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: "bold",
        }}
      >
        Total Eth: {selectedCredit.eth + selectedTime.eth}
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
        }}
      >
        Total Amount: $ {(selectedTime.price + selectedCredit.price).toFixed(2)}
      </Typography>
    </>
  );
}

export default function PurchaseModal({
  modalOpen,
  setModalOpen,
  activeCard,
  setActiveCard,
  selectedCredit,
  setSelectedCredit,
  activeTime,
  setActiveTime,
  selectedTime,
  setSelectedTime,
  onPurchase,
}) {
  //   const [activeCard, setActiveCard] = useState(0);
  //   // Selected Credit Object
  //   const [selectedCredit, setSelectedCredit] = useState(creditInfo[0]);
  //   // Selected Time Index
  //   const [activeTime, setActiveTime] = useState(0);
  //   // Selected Time Object
  //   const [selectedTime, setSelectedTime] = useState(timeToReachInfo[0]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={setModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: "bold",
              }}
            >
              Pay-To-Reach service
            </Typography>
            <Typography>Purchase credit for John Doe</Typography>
          </Box>

          <Stepper
            activeStep={activeStep}
            connector={<ColorlibConnector />}
            alternativeLabel
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    {...labelProps}
                    StepIconComponent={ColorlibStepIcon}
                  >
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <CreditAmountComponent
                  activeCard={activeCard}
                  //   setActiveCard={(index) => {
                  //     setActiveCard(index);
                  //   }}
                  //   onSelectCredit={(newCredit) => {
                  //     setSelectedCredit(newCredit);
                  //   }}
                  setActiveCard={setActiveCard}
                  onSelectCredit={setSelectedCredit}
                />
              )}
              {activeStep === 1 && (
                <TimeToReachComponent
                  activeTime={activeTime}
                  //   setActiveTime={(index) => {
                  //     setActiveTime(index);
                  //   }}
                  setActiveTime={setActiveTime}
                  //   onSelectTime={(newTime) => {
                  //     setSelectedTime(newTime);
                  //     console.log(newTime);
                  //   }}
                  onSelectTime={setSelectedTime}
                />
              )}
              {activeStep === 2 && (
                <Box
                  sx={{
                    width: "90%",
                    mx: "auto",
                    my: 4,
                  }}
                >
                  <SummaryTableComponent
                    selectedCredit={selectedCredit}
                    selectedTime={selectedTime}
                  />
                </Box>
              )}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                {activeStep === steps.length - 1 ? (
                  <Button onClick={handleNext}>Purchase</Button>
                ) : (
                  <Button onClick={handleNext}>Next</Button>
                )}
              </Box>
            </React.Fragment>
          )}
          {/* Header */}

          {/* Information
           */}
        </Box>
      </Modal>
    </>
  );
}
