import React from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";

// components
import PaymentRecord from "./components/PaymentRecord";

const Payment = () => {
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <PaymentRecord />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Payment;
