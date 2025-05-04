import React from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";

// components
import ResidentRecord from "./components/ResidentRecord";

const Resident = () => {
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <ResidentRecord />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Resident;
