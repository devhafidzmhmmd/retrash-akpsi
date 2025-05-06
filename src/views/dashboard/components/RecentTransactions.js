import React from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import {
    Timeline,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    timelineOppositeContentClasses,
} from "@mui/lab";
import { Typography } from "@mui/material";

const RecentTransactions = () => {
    const transactions = [
        {
            time: "09:30 am",
            color: "primary",
            content: "Pembayaran diterima dari Andi Saputra sebesar Rp15.000",
        },
        {
            time: "10:00 am",
            color: "secondary",
            content: "Pembayaran diterima dari Rina Marlina sebesar Rp15.000",
        },
        {
            time: "12:00 am",
            color: "success",
            content: "Pembayaran diterima dari Budi Hartono sebesar Rp15.000",
        },
        {
            time: "09:30 am",
            color: "warning",
            content: "Pembayaran diterima dari Siti Aminah sebesar Rp15.000",
        },
        {
            time: "09:30 am",
            color: "error",
            content: "Pembayaran diterima dari Dedi Kurniawan sebesar Rp15.000",
        },
    ];

    return (
        <DashboardCard title="Riwayat Transaksi">
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                <Timeline
                    className="theme-timeline"
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    sx={{
                        p: 0,
                        mb: "-40px",
                        "& .MuiTimelineConnector-root": {
                            width: "1px",
                            backgroundColor: "#efefef",
                        },
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.5,
                            paddingLeft: 0,
                        },
                    }}
                >
                    {transactions.map((transaction, index) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent>
                                {transaction.time}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot
                                    color={transaction.color}
                                    variant="outlined"
                                />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>{transaction.content}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </div>
        </DashboardCard>
    );
};

export default RecentTransactions;
