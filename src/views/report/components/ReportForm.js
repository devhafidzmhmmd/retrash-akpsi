import React from "react";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ReportForm = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        date: new Date().toISOString().split("T")[0],
        content: "",
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Nama
                </Typography>
                <TextField
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama"
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Tanggal
                </Typography>
                <TextField
                    fullWidth
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Konten Laporan
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Masukkan isi laporan"
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Foto
                </Typography>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ width: "100%" }}
                />
                {formData.image && (
                    <Box sx={{ mt: 2 }}>
                        <img
                            src={formData.image}
                            alt="Preview"
                            style={{ maxWidth: "200px", height: "auto" }}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ReportForm;
