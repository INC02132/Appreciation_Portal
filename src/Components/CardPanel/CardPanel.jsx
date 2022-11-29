import { Box, Grid, IconButton, TextField, Typography, IconButtton, Select, MenuItem } from '@mui/material';
import React, { useCallback, useState } from 'react'
import AppreciationCard from '../AppreciationCard/AppreciationCard';
import SearchIcon from "@mui/icons-material/Search";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Blocks } from 'react-loader-spinner';
import { ErrorOutline } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '../../Utils/serviceRequest';
import { useSelector } from 'react-redux';

const CardPanel = ({ isLoading, statusHandler, fetchData = null, panelTitle = "", cards, setSelectedCard, type = "" }) => {
    const [searchText, setSearchText] = useState("");

    const [statusType, setStatusType] = useState("all");

    const appReducer = useSelector(state => state.appReducer);

    const [adminSearchedCard, setAdminSearchedCard] = useState(null);

    const [isLoadingAdmin, setIsLoadingAdmin] = useState(false);

    const searchPaginatedData = async (value, status) => {
        setIsLoadingAdmin(true);
        if (value === "") {
            setAdminSearchedCard(null);
            return;
        }
        try {
            let res = await axios.get(`${baseUrl}/appreciation/getAppreciationByParam/${status}/${value}`)
            if (res.data.result === "success") {
                console.log(res.data);
                let data = [...res.data.data];
                data?.forEach((element, index) => {
                    let templateData = appReducer.templateData?.find(temp => temp.templateId === element.templateId);
                    let obj = { ...element, template: templateData };
                    data[index] = obj;
                })
                setAdminSearchedCard(data);
                setIsLoadingAdmin(false);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };

    const optimizedFn = useCallback(debounce(searchPaginatedData), []);



    return (
        <Grid container gap={1} sx={{ height: '100%', padding: "1em 1em" }}>
            {fetchData !== null ?
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            fontWeight: "500",
                            textAlign: "center",
                            marginTop: "1em",
                        }}
                    >
                        {panelTitle}
                    </Typography>
                    <Select sx={{ height: "30px" }} defaultValue={"all"} onChange={(e) => {
                        setSearchText("");
                        setAdminSearchedCard(null);
                        setStatusType(e.target.value);
                        statusHandler(e.target.value)
                    }}>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                </Box> :
                <Typography
                    sx={{
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        marginTop: "1em",
                    }}
                >
                    {panelTitle}
                </Typography>
            }
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    border: 1,
                    width: "300px",
                    borderColor: "#D9D9D9",
                    borderRadius: "7px",
                    padding: "0rem",
                }}
            >
                <TextField
                    sx={{ paddingLeft: "0.5rem" }}
                    id="input-with-sx"
                    variant="standard"
                    placeholder="Search"
                    fullWidth
                    focused={false}
                    value={searchText}
                    // onChange={(e) => setSearchText(e.target.value)}
                    onChange={(e) => {

                        if (fetchData === null) {

                            setSearchText(e.target.value)
                        } else {

                            setSearchText(e.target.value);
                            optimizedFn(e.target.value, statusType)
                        }
                    }}
                    InputProps={{ disableUnderline: true }}
                />
                <IconButton disableRipple>
                    <SearchIcon />
                </IconButton>
            </Box>

            {
                fetchData !== null &&
                <Box
                    className="wbScroll"
                    id="scrollableDiv"
                    sx={{
                        height: "70%",
                        width: "100%",
                        overflowY: "scroll",
                        padding: "1rem"
                    }}>
                    {
                        searchText === "" ? <InfiniteScroll
                            dataLength={cards?.length??0}
                            next={() => fetchData()}
                            hasMore={true}
                            width="100%"
                            scrollableTarget="scrollableDiv"
                        // height={"70vh"}
                        // loader={<div className="loader" key={0}>Loading ...</div>}
                        >

                            {cards?.map((item, index) => {
                                return (item?.template?.category?.toLowerCase().includes(searchText?.toLowerCase()) || (item?.status?.toLowerCase().includes(searchText?.toLowerCase())) ||
                                    `${item?.receiver?.firstName?.toLowerCase()} ${item?.receiver?.lastName?.toLowerCase()}`
                                        .includes(searchText?.toLocaleLowerCase())) && (
                                        <AppreciationCard
                                            key={index}
                                            type={type}
                                            cardData={item}
                                            setSelectedCard={setSelectedCard}
                                        />
                                    );
                            })}
                            {
                                (cards?.length === 0 || cards === null) && (
                                    isLoading ?
                                        <Box sx={{ width: "100%", height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                            <Blocks
                                                visible={true}
                                                height="60"
                                                width="60"
                                                ariaLabel="blocks-loading"
                                                wrapperStyle={{
                                                    color: "#002947"
                                                }}
                                                wrapperClass="blocks-wrapper"
                                            /><Typography>Loading Data</Typography></Box>
                                        :
                                        <Box sx={{ width: "100%", height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                            <ErrorOutline /><Typography>No Data</Typography> </Box>
                                )
                            }
                        </InfiniteScroll> : (
                            <>
                                {adminSearchedCard?.map((item, index) => {
                                    return (
                                        <AppreciationCard
                                            key={index}
                                            type={type}
                                            cardData={item}
                                            setSelectedCard={setSelectedCard}
                                        />
                                    );
                                })}
                                {
                                    (adminSearchedCard?.length === 0 || adminSearchedCard === null) && (
                                        adminSearchedCard === null ?
                                            <Box sx={{ width: "100%", height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                <Blocks
                                                    visible={true}
                                                    height="60"
                                                    width="60"
                                                    ariaLabel="blocks-loading"
                                                    wrapperStyle={{
                                                        color: "#002947"
                                                    }}
                                                    wrapperClass="blocks-wrapper"
                                                /><Typography>Loading Data</Typography></Box>
                                            :
                                            <Box sx={{ width: "100%", height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                <ErrorOutline /><Typography>No Data</Typography> </Box>
                                    )
                                }
                            </>
                        )
                    }
                </Box>

            }
            {
                fetchData === null &&
                <Box className="wbScroll" sx={{
                    height: "70%",
                    width: "100%",
                    overflowY: "scroll", padding: "1rem"
                }}>
                    {cards?.map((item, index) => {
                        return (item?.template?.category?.toLowerCase()
                            .includes(searchText?.toLowerCase()) ||
                            `${item?.receiver?.firstName?.toLowerCase()} ${item?.receiver?.lastName?.toLowerCase()}`
                                .includes(searchText?.toLocaleLowerCase())) && (
                                <AppreciationCard
                                    key={index}
                                    type={type}
                                    cardData={item}
                                    setSelectedCard={setSelectedCard}
                                />
                            );
                    })}
                    {
                        (cards?.length === 0 || cards === null) &&
                        (cards === null ?
                            <Box sx={{ width: "100%", height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Blocks
                                    visible={true}
                                    height="60"
                                    width="60"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="blocks-wrapper"
                                /><Typography>Loading Data...</Typography></Box>
                            :
                            <Box sx={{ width: "100%", height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <ErrorOutline /><Typography>No Data</Typography> </Box>)
                    }
                </Box>
            }

        </Grid>
    )
}

export default CardPanel