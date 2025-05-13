import React from "react";
import { TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { createIssue } from "../../../api/issue";

const ReportForm = ({ onSuccess }) => {
    const [description, setDescription] = React.useState("");

    const handleSubmit = async () => {
        const result = await createIssue(description);
        if (result) {
            setDescription("");
            if (onSuccess) onSuccess();
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Isi Laporan
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Masukkan isi laporan"
                />
            </Box>

            <Box>
                <Button variant="contained" onClick={handleSubmit}>
                    Simpan
                </Button>
            </Box>
        </Box>
    );
};

export default ReportForm;
