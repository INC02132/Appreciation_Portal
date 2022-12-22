import React, { useState } from "react";
import {
  IconButton,
  Stack,
  Typography,
  Button,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  createTheme,
  ThemeProvider,
  Collapse,
  Grid,
} from "@mui/material";
import {
  Close,
  DeleteForever,
  Done,
  SimCardDownload,
  UploadFile,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./table.css";
import "./utilities.css";
import InfiniteScroll from "react-infinite-scroll-component";

let TableUtility = ({
  height = "100%",
  headerkeys,
  bodykeys,
  Data,
  tableTitle,
  ShowDeleteModalFunc,
  ShowEditModalFunc,
  ShowAddModal,
  enableEdit = true,
  enableDelete = true,
  getNextBatchOfData,
  pagination = true,
  addSelectedAsset,
  SelectAll,
  IdKey,
  setInventoryData,
  SelectedAssets = [],
  isCollapsable = false,
  CollapseTitle = "",
  CollapseHeaderFields = [],
  CollapseDataKeys = [],
  showUploadConsentButton = false,
  showModalFunc,
  setAssetAllocationId = "",
  showRevokeConsentButton = false,
  ShowRevokeDialog,
}) => {
  //filtering data

  // const [Data, setData] = useState([])

  //sorting
  const [SortTarget, setSortTarget] = useState("");
  const [Sorting, setSorting] = useState({
    Status: false,
    sortedData: [],
    Target: "",
    Method: "ASCENDING",
  });

  const SortFunction = (item, method) => {
    // setSorting(current => ({...current, Status: true})) //change
    method === "DESCENDING"
      ? setSorting({ ...Sorting, Method: "ASCENDING" })
      : setSorting({ ...Sorting, Method: "DESCENDING" });

    console.log(method);
    let data = [...Data];
    let AscendingFunction = () => {
      try {
        data.sort((A, B) => {
          A = typeof A[item] === "boolean" ? A[item] : A[item].toLowerCase();
          B = typeof B[item] === "boolean" ? B[item] : B[item].toLowerCase();
          if (A < B) {
            return 1;
          }
          if (A > B) {
            return -1;
          }
          return 0;
        });
      } catch (e) {
        console.log("error in asscendingFunction", e, data);
      }
      console.log(data);
      setSorting((current) => ({ ...current, Status: true, sortedData: data }));
    };
    let DescendingFunction = () => {
      try {
        data.sort((A, B) => {
          A = typeof A[item] === "boolean" ? A[item] : A[item].toLowerCase();
          B = typeof B[item] === "boolean" ? B[item] : B[item].toLowerCase();
          // if(typeof(A[item]) === String){
          console.log(A, B);

          if (A < B) {
            return -1;
          }
          if (A > B) {
            return 1;
          }
          return 0;
          // }
        });
      } catch (e) {
        console.log("error in descending ", e, data);
      }
      setSorting((current) => ({ ...current, Status: true, sortedData: data }));
    };
    Sorting.Method === "ASCENDING" && AscendingFunction();
    Sorting.Method === "DESCENDING" && DescendingFunction();
  };

  let tableRowTheme = createTheme({
    components: {
      MuiTableRow: {
        styleOverrides: {
          root: {
            Height: "100px",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: "blue",
            color: "red",
          },
        },
      },
    },
  });
  let TypographyStyle = {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    height: "100%",
  };
  let TableData = Sorting.Status === true ? Sorting.sortedData : Data;
  // const [AssetsSelectedToDelete, setAssetsSelectedToDelete] = useState([])
  const [SelectAllStatus, setSelectAllStatus] = useState(false);
  let SelectAllFunction = (e) => {
    let array = TableData.map((item) => item[IdKey]);
    e.target.checked === true
      ? addSelectedAsset(e, [...array])
      : addSelectedAsset(e, []);
    // addSelectedAsset( array = DATA, METHOD =  'SELECTALL')
  };
  let loading = (
    <h1 style={{ position: "absolute", top: "50%", right: "20%" }}>
      Loading...
    </h1>
  );
  return (
    <>
      {!Data && loading}
      {Data && (
        <Paper
          sx={{
            flexGrow: 1,
            // marginTop: "6vw",
            // marginLeft: "6vw",
            position: "relative",
            width: "100%", //comment this code to revert size of table(Naiyar)
            margin: 0,
            overflow: "hidden",
          }}
        >
          {/* *************************table*****************************  */}
          <ThemeProvider theme={tableRowTheme}>
            <InfiniteScroll
              className="wbScroll"
              dataLength={Data.length}
              next={getNextBatchOfData}
              hasMore={true}
              width="100%"
              height={height} /* height of table */
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>No More Records found</b>
                </p>
              }
            >
              <Table
                className="wbScroll"
                style={{
                  borderSpacing: "0px",
                  minHeight: "max-content",
                  margin: "0",
                  padding: "0px 10px",
                  position: "relative",
                }}
              >
                <TableHead
                  container
                  px={2}
                  sx={{ position: "sticky", top: "0", zIndex: "2" }}
                  className="table_header"
                >
                  <TableRow sx={{ maxHeight: "50px" }}>
                    {enableEdit && enableDelete && (
                      <TableCell>
                        <input
                          type="checkbox"
                          data-method="SELECTALL"
                          checked={
                            SelectedAssets.length === Data.length &&
                            Data.length !== 0
                              ? true
                              : false
                          }
                          onChange={SelectAllFunction}
                        ></input>
                      </TableCell>
                    )}
                    {/*  SelectedAssets is array of selected items and Data is master data for table */}
                    {headerkeys.map((item, index) => {
                      if (item === "") {
                        return (
                          <TableCell
                            className="table_card--items"
                            sx={{ width: "fit-content", padding: "10px" }}
                          >
                            <Typography
                              fontSize={15}
                              sx={{
                                TypographyStyle,
                                display: "inline-block",
                                margin: "0",
                                padding: "0",
                              }}
                            >
                              {" "}
                              {item}{" "}
                            </Typography>
                          </TableCell>
                        );
                      }

                      if (item === "" && tableTitle === "reports") {
                        return (
                          <TableCell
                            className="table_card--items"
                            sx={{ width: "fitcontent" }}
                          ></TableCell>
                        );
                      }
                      return (
                        <TableCell
                          sx={{ width: "fit-content", padding: "0" }}
                          className="table_card--items"
                          onClick={() => {
                            SortFunction(
                              bodykeys[index],
                              Sorting.Method === "ASCENDING"
                                ? "ASCENDING"
                                : "DESCENDING"
                            );
                            setSortTarget(item);
                          }}
                        >
                          <Typography
                            fontSize={15}
                            sx={{ TypographyStyle, display: "inline-block" }}
                          >
                            {" "}
                            {item}{" "}
                          </Typography>
                          {item !== "" && (
                            <IconButton
                              color="primary"
                              sx={{ padding: "none", width: "max-content" }}
                              aria-label="add to shopping cart"
                            >
                              {SortTarget === item &&
                              Sorting.Method === "ASCENDING" ? (
                                <ArrowDropUpIcon />
                              ) : (
                                <ArrowDropDownIcon />
                              )}
                            </IconButton>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                {/* *************************table body*****************************  */}
                <TableBody>
                  {pagination &&
                    TableData.map((item, index) => (
                      <TableRowComponent
                        enableEdit={enableEdit}
                        item={item}
                        IdKey={IdKey}
                        SelectedAssets={SelectedAssets}
                        addSelectedAsset={addSelectedAsset}
                        bodykeys={bodykeys}
                        TypographyStyle={TypographyStyle}
                        enableDelete={enableDelete}
                        ShowEditModalFunc={ShowEditModalFunc}
                        ShowDeleteModalFunc={ShowDeleteModalFunc}
                        isCollapsable={isCollapsable}
                        CollapseTitle={CollapseTitle}
                        CollapseHeaderFields={CollapseHeaderFields}
                        CollapseDataKeys={CollapseDataKeys}
                        showUploadConsentButton={showUploadConsentButton}
                        showModalFunc={showModalFunc}
                        setAssetAllocationId={setAssetAllocationId}
                        showRevokeConsentButton={showRevokeConsentButton}
                        ShowRevokeDialog={ShowRevokeDialog}
                      />
                    ))}
                </TableBody>
              </Table>
            </InfiniteScroll>
          </ThemeProvider>

          {/* ********************pagination component**********************  */}
        </Paper>
      )}
    </>
  );
};

export default TableUtility;

const TableRowComponent = ({
  enableEdit,
  item,
  IdKey,
  SelectedAssets,
  addSelectedAsset,
  bodykeys,
  TypographyStyle,
  enableDelete,
  ShowEditModalFunc,
  ShowDeleteModalFunc,
  isCollapsable,
  CollapseTitle,
  CollapseHeaderFields = [],
  CollapseDataKeys = [],
  showUploadConsentButton = false,
  showModalFunc,
  setAssetAllocationId,
  showRevokeConsentButton = false,
  ShowRevokeDialog,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        className="table_card"
        sx={{
          height: "50px !important",
          "& > *": { borderBottom: isCollapsable && "unset" },
        }}
      >
        {enableDelete && (
          <TableCell sx={{ width: "fit-content" }}>
            <input
              type="checkbox"
              data-id={item[IdKey]}
              checked={
                SelectedAssets.includes(item[IdKey]) === false ? false : true
              }
              data-method="SELECTMULTIPLE"
              onChange={addSelectedAsset}
            ></input>
          </TableCell>
        )}

        {bodykeys.map((bodyitem) => {
          if (typeof item[bodyitem] === "boolean") {
            //if item is bool return checkbox
            return typeof item[bodyitem] === "boolean" ? (
              <TableCell
                align="left"
                sx={{
                  Height: "auto !important",
                  width: "fit-content",
                  padding: "0 0 0 2%",
                }}
                className="table_card--items"
              >
                {item[bodyitem] === true ? (
                  <Done sx={{ color: "green" }} />
                ) : (
                  <Close sx={{ color: "red" }} />
                )}{" "}
                {/* <input
                  type="checkbox"
                  value={item[bodyitem]}
                  checked={item[bodyitem]}
                />{" "} */}
              </TableCell>
            ) : (
              <TableCell
                align="center"
                sx={{
                  Height: "auto !important",
                  width: "fit-content",
                }}
                className="table_card--items"
              >
                <Typography align="left" fontSize={15} sx={{ TypographyStyle }}>
                  {item[bodyitem] !== "" ? item[bodyitem] ?? "-" : "-"}
                </Typography>
              </TableCell>
            );
          } else if (
            bodyitem === "date" ||
            bodyitem === "assetEndDate" ||
            bodyitem === "licenseStDate" ||
            bodyitem === "licenseEndDate"
          ) {
            var timestamp = Number(item[bodyitem]);
            var date =
              timestamp === 0
                ? "-"
                : new Date(timestamp).toISOString().substring(0, 10) ?? "-";
            return (
              <TableCell
                align="center"
                sx={{
                  Height: "auto !important",
                  width: "fit-content",
                  padding: "0",
                }}
                className="table_card--items"
              >
                <Typography fontSize={15} align="left" sx={{ TypographyStyle }}>
                  {date}
                </Typography>
              </TableCell>
            );
          } else if (bodyitem === "") {
            return (
              <TableCell
                align="center"
                sx={{
                  Height: "auto !important",
                  width: "20px",
                  padding: "0",
                }}
                className="table_card--items"
              ></TableCell>
            );
          } else {
            return (
              <TableCell
                align="center"
                sx={{
                  Height: "auto !important",
                  width: "fit-content",
                  padding: "0",
                }}
                className="table_card--items"
                onClick={() => setOpen(!open)}
              >
                <Typography fontSize={15} align="left" sx={{ TypographyStyle }}>
                  {item[bodyitem] !== "" ? item[bodyitem] ?? null : "-"}
                </Typography>
              </TableCell>
            );
          }
        })}
        {(enableDelete || enableEdit) && (
            <TableCell
              sx={{ padding: "0", width: "40px" }}
              align="center"
              className="table_card--items"
            >
              <Stack direction="row" spacing="20px">
                {/* <Button sx={{ padding: '0' }} onClick={e => ShowEditModalFunc(item[IdKey], 'DELETEONE')}> */}
                {enableEdit && (
                  <EditIcon
                    onClick={(e) => ShowEditModalFunc(item[IdKey], "DELETEONE")}
                    fontSize="small"
                  />
                )}
                {/* </Button> */}
                {/* <Button onClick={e => ShowDeleteModalFunc(item[IdKey], 'DELETEONE')}> */}
                {enableDelete && (
                  <DeleteIcon
                    onClick={(e) =>
                      ShowDeleteModalFunc(item[IdKey], "DELETEONE")
                    }
                    style={{ color: "red" }}
                    fontSize="small"
                  />
                )}
                {/* </Button> */}
                <Typography>{"  "}</Typography>
              </Stack>
            </TableCell>
          )}
      </TableRow>
      {isCollapsable && (
        <TableRow>
          <TableCell
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              boxShadow:
                "0px 0px 8px rgba(255, 252, 252, 0.25), 0px 0px 4px rgba(249, 249, 249, 0.25), 0px 0px 2px #E0E0E0, inset 0px 0px 17px 2px rgba(207, 207, 207, 0.32)",
            }}
            colSpan={10}
          >
            <Collapse in={open && item.assetId} timeout="auto" unmountOnExit>
              <Box sx={{ padding: 1 }}>
                <Typography variant="h4" fontSize={18} mb={1}>
                  {CollapseTitle}
                </Typography>
                <Grid
                  container
                  alignItems="center"
                  rowSpacing={2}
                  columnSpacing={showUploadConsentButton ? 8 : 10}
                >
                  {CollapseHeaderFields.map((val, index) => {
                    return (
                      <Grid item>
                        <Box>
                          <Typography style={{ color: "grey" }}>
                            {val}:
                          </Typography>
                          <Typography fontWeight={"bold"}>
                            {item[CollapseDataKeys[index]] !== ""
                              ? item[CollapseDataKeys[index]]
                              : "-"}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                  {showUploadConsentButton && (
                    <Grid item>
                      {item?.consentForm === null ? (
                        <Button
                          download
                          onClick={() => {
                            setAssetAllocationId(item["assetAllocationId"]);
                            showModalFunc();
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <UploadFile />
                            <Typography fontSize={10}>
                              Upload Consent Form
                            </Typography>
                          </Box>
                        </Button>
                      ) : (
                        <Button
                          download={"consentform-signed.docx"}
                          href={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${item["consentForm"]}`}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <SimCardDownload />
                            <Typography fontSize={10}>Consent Form</Typography>
                          </Box>
                        </Button>
                      )}
                    </Grid>
                  )}
                  {showRevokeConsentButton &&
                    (item?.consentForm !== null ? (
                      <Grid item>
                        <Button
                          size="small"
                          sx={{ marginRight: "1em" }}
                          variant="outlined"
                          download={"consentform-signed.docx"}
                          href={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${item["consentForm"]}`}
                          startIcon={<SimCardDownload />}
                        >
                          Consent Form
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setAssetAllocationId(item["assetAllocationId"]);
                            ShowRevokeDialog();
                          }}
                          startIcon={<DeleteForever />}
                        >
                          Revoke Consent Form
                        </Button>
                      </Grid>
                    ) : (
                      <Grid item>
                        <Typography>Consent-from not uploaded</Typography>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
// { ****************************************ReadMe***************************************

// ADD THIS FUNCTIONS TO THE PARENT ELEMENT AND PASS THIS FUNCTIONS AS PROPS TO TABLEUTILITY COMPONENT
// PURPOSE: FOR DISPLAYING MODAL AND GRABBING ITEM ID THAT IS TO BE MODIFIED FROM TABLEUTILITY

//  let ShowDeleteModalFunc = (status, id) => {
//   let func = (e) => {
//     console.log(id,'sadasdasd')
//     setDeleteModalStatus(status)
//   }
//   func()
// }
// let ShowEditModalFunc = (status, id) => {
//   let func=() => {
//     console.log(id)
//     setEditModalStatus(status)
//   }
//   func()
// }

// }

// PROPS: DATA AS Data,
// ARRAY OF HEADER KEYS AS headerkeys (STRINGS YOU WANT TO DISPLAY AS TABLE HEADER)
// ARRAY OF DATA KEYS AS bodykeys
// TITLE OF TABLE AS tabletitle
// functions for displaying modal ShowEditModalFunc & ShowDeleteModalFunc

// example :  Data={RoleData} headerkeys={['Role Id', 'Role', 'Created on', 'Modified on', '']} bodykeys={['role_id', 'role', 'created_on', 'modified_on']} tableTitle={'Role'} ShowEditModalFunc={ShowEditModalFunc} ShowDeleteModalFunc={ShowDeleteModalFunc}
