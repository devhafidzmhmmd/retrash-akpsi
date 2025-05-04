import React from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";

// components
import UserRecord from "./components/UserRecord";

const Users = () => {
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <UserRecord />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Users;
