import React, { useEffect } from "react";
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
import { IconPlus, IconUserPlus } from "@tabler/icons-react";
import ReportForm from "./ReportForm";
import { issueList } from "../../../api/issue";

const ReportRecord = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedMonth, setSelectedMonth] = React.useState("");
    const [selectedYear, setSelectedYear] = React.useState("");
    const [openModal, setOpenModal] = React.useState(false);
    const [issues, setIssues] = React.useState([]);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        const result = await issueList("", "");
        if (result) {
            setIssues(result);
        }
    };

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
        ...new Set(
            issues.map((item) => new Date(item.createdAt).getFullYear())
        ),
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

    const filteredReport = issues.filter((item) => {
        const itemDate = new Date(item.createdAt);
        const matchesSearch = item.officer.username
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
                                    NAMA PETUGAS
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
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {item.officer.username}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {new Date(item.createdAt)
                                                .toLocaleDateString("id-ID", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })
                                                .toUpperCase()}
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
                                            {item.description}
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
                    <ReportForm
                        onSuccess={() => {
                            handleCloseModal();
                            fetchIssues();
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Batal</Button>
                </DialogActions>
            </Dialog>
        </BlankCard>
    );
};

export default ReportRecord;
