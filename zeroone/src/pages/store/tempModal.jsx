<Modal
  open={modalOpen}
  onClose={() => {
    setModalOpen(false);
  }}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    {/* Header */}

    {/* Information
     */}
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box
        style={{
          flex: 2,
        }}
      >
        <Box
          sx={{
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 1,
            }}
          >
            Pay-To-Reach service
          </Typography>
          <Typography>Purchase credit for John Doe</Typography>
        </Box>

        {/* Purchase Credit */}
        <Box>
          {/* Credit Amount */}
          <Box>
            <Typography
              sx={{
                mb: 2,
                fontWeight: "bold",
              }}
            >
              Credit Amount
            </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                sx={{
                  mb: 1,
                }}
                value="one-credit"
                control={<Radio />}
                label={
                  <>
                    <Typography>1 Credit</Typography>
                    <Typography
                      sx={{
                        color: "#757575",
                        fontSize: "14px",
                      }}
                    >
                      0.001ETH (~ $2.32)
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                sx={{
                  mb: 1,
                }}
                value="three-credit"
                control={<Radio />}
                label={
                  <>
                    <Typography>3 Credits</Typography>
                    <Typography
                      sx={{
                        color: "#757575",
                        fontSize: "14px",
                      }}
                    >
                      0.0025 ETH (~ $5.9)
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                sx={{
                  mb: 1,
                }}
                value="5-credit"
                control={<Radio />}
                label={
                  <>
                    <Typography>5 Credits</Typography>
                    <Typography
                      sx={{
                        color: "#757575",
                        fontSize: "14px",
                      }}
                    >
                      0.004 ETH (~ $9.44)
                    </Typography>
                  </>
                }
              />
            </RadioGroup>
          </Box>
          <Divider
            style={{
              color: "#000",
              backgroundColor: "#000",
              marginTop: "0.8rem",
              marginBottom: "0.8rem",
            }}
          />
          {/* Time to Reach */}
          <Box>
            <Typography
              sx={{
                mb: 2,
                fontWeight: "bold",
              }}
            >
              Time to Reach
            </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="slow"
                control={<Radio />}
                sx={{
                  mb: 1,
                }}
                // label="Slow (~ 3 days)"
                label={
                  <>
                    <Typography>Average (~ 2 days)</Typography>
                    <Typography
                      sx={{
                        color: "#757575",
                        fontSize: "14px",
                      }}
                    >
                      Free
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                sx={{
                  mb: 1,
                }}
                value="average"
                control={<Radio />}
                // label="Average (~ 2 days)"
                label={
                  <>
                    <Typography>Average (~ 2 days)</Typography>
                    <Typography
                      sx={{
                        color: "#757575",
                        fontSize: "14px",
                      }}
                    >
                      0.00005 ETH per credit (~ $0.16)
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                sx={{
                  mb: 1,
                }}
                value="fast"
                control={<Radio />}
                // label="Fast (within 1 day)"
                label={
                  <>
                    <Typography>Fast (within 1 day)</Typography>
                    <Typography
                      sx={{
                        color: "#757575",
                        fontSize: "14px",
                      }}
                    >
                      0.0001 ETH per credit (~ $0.23)
                    </Typography>
                  </>
                }
              />
            </RadioGroup>
          </Box>
        </Box>
      </Box>

      {/* Cart Summary */}
      <Box
        sx={{
          backgroundColor: "#d3d3d3",
          height: "100%",
          width: "100%",
          flex: 2,
        }}
      >
        <Typography>Order Summary</Typography>
      </Box>
    </Box>
  </Box>
</Modal>;
