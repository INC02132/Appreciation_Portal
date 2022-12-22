import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { baseUrl } from '../../Utils/serviceRequest';
import TableUtility from '../../Components/TableUtility/TableUtility'
import { Box, Button, Card, CardContent, FormControl, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { SearchOutlined } from '@mui/icons-material';
import FileDownloadIcon from "@mui/icons-material/FileDownload";



const AnalyticsPage = () => {

    const [cardsData, setCardsData] = useState([
        {
            key: "TotalValueCard",
            label: "Total",
            count: 0,
        },
        {
            key: "TotalValueCardApproved",
            label: "Approved",
            count: 0,
        },
        {
            key: "TotalValueCardPending",
            label: "Pending",
            count: 0,
        },
        {
            key: "TotalValueCardRejected",
            label: "Rejected",
            count: 0,
        },
    ]);
    const [isLoading, setIsloading] = useState(true);

    const fetchCardsData = async () => {
        try {
            let res = await axios.get(
                `${baseUrl}/appreciation/getCountOfValueCards`
            );
            if (res.status === 200) {
                let tempCardsData = [...cardsData];
                tempCardsData.forEach((cardData) => {
                    cardData.count = res.data?.[cardData.key] ?? 0;
                })
                setCardsData(tempCardsData);
                setIsloading(false);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchCardsData();
    }, [])

    return (
        <>
            <Grid
                container
                gap={3}
                sx={{ padding: "1em 1em 0 1em" }}
                justifyContent="space-between">

                {
                    cardsData.map((cardData) => {
                        return <Grid item>
                            <CustomCard cardData={cardData} />
                        </Grid>
                    })
                }
            </Grid>
            {!isLoading && <ReportsTable />}
        </>
    )

}

export default AnalyticsPage

const CustomCard = ({ cardData }) => {
    return (
        <Card sx={{
            borderRadius: "10px",
            width: "204px",
            height: "92px",
            boxShadow: " 0px 4px 8px rgba(187, 210, 227, 0.25)",
        }}>
            <CardContent>
                <Stack sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle1" color="#777">
                        {cardData?.count}
                    </Typography>
                    <Typography
                        color="#3026B9"
                        fontSize="14px"
                    >
                        {cardData?.label}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}

const ReportsTable = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [reportData, setReportData] = useState([]);
    const appReducer = useSelector(state => state.appReducer);


    let getNextBatchOfData = () => {
        fetchData();
    };

    const saveExcel = async () => {
        const workbook = new Excel.Workbook();
        try {
            const fileName = `REPORT`;
            // creating one worksheet in workbook
            const worksheet = workbook.addWorksheet(`REPORT-SHEET`);

            worksheet.columns = [
                { header: "Sender", key: "sender" },
                { header: "Receiver", key: "receiver" },
                { header: "Category", key: "category" },
            ];

            // updated the font for first row.
            worksheet.getRow(1).font = { bold: true };

            // loop through all of the columns and set the alignment with width.
            worksheet.columns.forEach((column) => {
                column.width = column.header.length + 5;
                column.alignment = { horizontal: "center" };
            });

            // loop through data and add each one to worksheet
            reportData?.forEach((singleData) => {
                worksheet.addRow(singleData);
            });

            // loop through all of the rows and set the outline style.
            worksheet.eachRow({ includeEmpty: false }, (row) => {
                // store each cell to currentCell
                const currentCell = row._cells;

                // loop through currentCell to apply border only for the non-empty cell of excel
                currentCell.forEach((singleCell) => {
                    // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
                    const cellAddress = singleCell._address;

                    // apply border
                    worksheet.getCell(cellAddress).border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                        right: { style: "thin" },
                    };
                });
            });

            // write the content using writeBuffer
            const buf = await workbook.xlsx.writeBuffer();

            // download the processed file
            saveAs(new Blob([buf]), `${fileName}.xlsx`);
        } catch (error) {
            console.error("<<<ERRROR>>>", error);
            console.error("Something Went Wrong", error.message);
        } finally {
            // removing worksheet's instance to create new one
            // workbook.removeWorksheet(workSheetName);
        }
    };

    const fetchData = async () => {
        try {
            let url = `${baseUrl}/appreciation/getAppreciationByStatus/20/${pageNumber}/approved`
            let res = await axios.get(url);
            if (res.data.result === "success") {
                let tempReportDataHolder = [];
                res.data?.data?.forEach((element, index) => {
                    let templateData = appReducer.templateData?.find(temp => temp.templateId === element.templateId);
                    let obj = { ...element, template: templateData };
                    tempReportDataHolder.push({
                        id: obj["valueCardId"],
                        sender: obj["sender"]["emailId"],
                        receiver: obj["receiver"]["emailId"],
                        category: obj["template"]["category"]
                    })
                })
                let data = [...reportData, ...tempReportDataHolder];
                setReportData(data);
                setPageNumber(prev => prev + 1)
            }
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    let options = {
        getNextBatchOfData,
        IdKey: "id",
        Data: reportData,
        headerkeys: [
            "",
            "Sender",
            "Receiver",
            "Category",
        ],
        bodykeys: [
            "",
            "sender",
            "receiver",
            "category"
        ],
        tableTitle: "Reports",
    };

    const inputSize = {
        style: {
            height: "5vh",
            maxHeight: "32px",
            width: "15em",
            padding: "2px 10px",
        },
    };

    return (
        <Box
            style={{ padding: "1em" }}
        >
            <Box
                sx={{ display: "flex", justifyContent: "flex-end" }}
                style={{
                    marginBottom: "0.5em",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        flexGrow: "1",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "2%",
                        alignItems: "center",
                    }}
                >
                    <FormControl sx={{ width: "20%", height: "5vh" }}>
                        <TextField
                            placeholder="Search..."
                            inputProps={inputSize}
                            InputProps={{
                                endAdornment: <SearchOutlined color="disabled" />,
                            }}
                            onChange={(e) => { }}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        endIcon={<FileDownloadIcon />}
                        sx={{
                            border: "1px solid #F1F5FE",
                            backgroundColor: "#F1F5FE",
                            color: "#0288d1",
                            fontSize: "12px",
                            textTransform: "capitalize",
                            height: "max-content",
                            "&:hover": {
                                backgroundColor: "#F1F5FE",
                                color: "#0288d1",
                                border: "1px solid #0288d1",
                                boxShadow: "1px #000000",
                            },
                        }}
                        onClick={() => {
                            saveExcel();
                        }}
                    >
                        Export
                    </Button>
                </Box>
            </Box>
            <Box style={{ alignItems: "center" }}>

                <TableUtility
                    {...options}
                    height={"60vh"}
                    enableDelete={false}
                    enableEdit={false}
                />
            </Box>
        </Box>
    )
}