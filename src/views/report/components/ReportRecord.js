import React from "react";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    Card,
    CardMedia,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import BlankCard from "../../../components/shared/BlankCard";
import report from "../../../dummy/report.json";
import { IconPlus, IconUserPlus } from "@tabler/icons-react";
import ReportForm from "./ReportForm";

const ReportRecord = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedMonth, setSelectedMonth] = React.useState("");
    const [selectedYear, setSelectedYear] = React.useState("");
    const [openModal, setOpenModal] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const years = [
        ...new Set(report.map((item) => new Date(item.date).getFullYear())),
    ].sort((a, b) => b - a);

    const months = [
        { value: "0", label: "Januari" },
        { value: "1", label: "Februari" },
        { value: "2", label: "Maret" },
        { value: "3", label: "April" },
        { value: "4", label: "Mei" },
        { value: "5", label: "Juni" },
        { value: "6", label: "Juli" },
        { value: "7", label: "Agustus" },
        { value: "8", label: "September" },
        { value: "9", label: "Oktober" },
        { value: "10", label: "November" },
        { value: "11", label: "Desember" },
    ];

    const filteredReport = report.filter((item) => {
        const itemDate = new Date(item.date);
        const matchesSearch = item.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesYear =
            !selectedYear || itemDate.getFullYear().toString() === selectedYear;
        const matchesMonth =
            !selectedMonth || itemDate.getMonth().toString() === selectedMonth;
        return matchesSearch && matchesYear && matchesMonth;
    });

    return (
        <BlankCard>
            <Box
                sx={{
                    overflow: "auto",
                    width: { xs: "280px", sm: "auto" },
                    p: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 3,
                    }}
                >
                    <Typography variant="h5">Laporan Kebersihan</Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            style={{
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                            }}
                        >
                            <option value="">Semua Tahun</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            style={{
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                            }}
                        >
                            <option value="">Semua Bulan</option>
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Cari nama..."
                            onChange={(e) => {
                                setPage(0);
                                setSearchTerm(e.target.value);
                            }}
                            style={{
                                padding: "8px",
                                width: "300px",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                            }}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleOpenModal}
                            startIcon={<IconPlus size={18} />}
                            title="Tambah laporan baru"
                        >
                            tambah laporan
                        </Button>
                    </Box>
                </Box>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2,
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    FOTO
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    NAMA
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    TANGGAL
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    ISI LAPORAN
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredReport
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.image && (
                                            <Card sx={{ maxWidth: 200 }}>
                                                <CardMedia
                                                    component="img"
                                                    height="100"
                                                    image={item.image}
                                                    alt="Laporan foto"
                                                    sx={{ objectFit: "cover" }}
                                                />
                                            </Card>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {new Date(
                                                item.date
                                            ).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "13px",
                                                wordBreak: "break-word",
                                                whiteSpace: "normal",
                                                overflowWrap: "break-word",
                                            }}
                                        >
                                            {item.content}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                    <TablePagination
                        component="div"
                        count={filteredReport.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[10]}
                    />
                </Box>
            </Box>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Tambah Laporan Baru</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Silakan isi form berikut untuk menambahkan laporan baru
                    </DialogContentText>
                    <ReportForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Batal</Button>
                    <Button onClick={handleCloseModal} variant="contained">
                        Simpan
                    </Button>
                </DialogActions>
            </Dialog>
        </BlankCard>
    );
};

export default ReportRecord;
