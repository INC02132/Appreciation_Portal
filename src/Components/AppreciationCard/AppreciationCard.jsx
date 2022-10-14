import { Card } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import { TimeStampToDateString } from "../../Utils/TimeStampToString";


const AppreciationCard = ({ cardData, setSelectedCard, type = "" }) => {
    const handleClick = () => {
        setSelectedCard(cardData);
    };


    return (
        <Card
            onClick={() => handleClick()}
            elevation={8}
            sx={{
                width: "16rem",
                height: type !== "" ? "107px" : "120px",
                borderRadius: "10px",
                marginTop: "10px",
                color: "#002947",
                backgroundColor: "#EAF2F9",
                "& :hover": {
                    backgroundColor: "#002947",
                    color: "white",
                },
                "& :active": {
                    backgroundColor: "#002947",
                    color: "white",
                },
                cursor: "pointer",
            }}
        >
            <div
                style={{
                    height: "100%",
                    padding: "1rem",
                }}
            >
                {
                    type !== "" ? <p
                        style={{
                            textAlign: "right",
                            fontSize: "0.8rem",
                        }}
                    >
                        {TimeStampToDateString(cardData?.date)}
                    </p> : <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                        <p>Status: <span style={{ color: cardData?.status === "pending" ? "orange" : cardData?.status === "approved" ? "green" : "red" }}>{cardData?.status?.toUpperCase()}</span></p>
                        <p
                            style={{
                                textAlign: "right",
                                fontSize: "0.8rem",
                            }}
                        >
                            {TimeStampToDateString(cardData?.date)}
                        </p>
                    </Box>
                }

                <div style={{ marginTop: "1.1rem" }}>
                    <p
                        style={{
                            fontWeight: "500",
                            fontSize: "1rem",
                        }}
                    >
                        {cardData?.template?.category}
                    </p>

                    <p
                        style={{
                            fontSize: "0.9rem",
                            fontWeight: "400",
                            marginTop: "0.1rem",
                        }}
                    >
                        {
                            type === "From" &&
                            (`${type}: ${cardData?.sender?.firstName} ${cardData?.sender?.lastName}`)
                        }
                        {
                            type === "To" &&
                            (`${type}: ${cardData?.receiver?.firstName} ${cardData?.receiver?.lastName}`)
                        }
                    </p>
                    {
                        type === "" &&
                        <p
                            style={{
                                fontSize: "0.9rem",
                                fontWeight: "400",
                                marginTop: "0.1rem",
                            }}
                        >
                            {`From: ${cardData?.sender?.firstName} ${cardData?.sender?.lastName}`}<br />{`To: ${cardData?.receiver?.firstName} ${cardData?.receiver?.lastName}`}
                        </p>
                    }
                </div>
            </div>
        </Card>
    );
}

export default AppreciationCard