import React from "react";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    TablePagination,
} from "@mui/material";
// import DashboardCard from "../../../components/shared/DashboardCard";
import transaction from "../../../dummy/transaction.json";
import BlankCard from "../../../components/shared/BlankCard";

const PaymentRecord = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedMonth, setSelectedMonth] = React.useState("");
    const [selectedYear, setSelectedYear] = React.useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const years = [
        ...new Set(
            transaction.map((item) => new Date(item.time).getFullYear())
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
                    <Typography variant="h5">Data Pembayaran</Typography>
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
                                    NAMA
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    TAGIHAN
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    STATUS
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    WAKTU
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transaction
                            .filter((item) => {
                                const itemDate = new Date(item.time);
                                const matchesSearch = item.name
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase());
                                const matchesYear =
                                    !selectedYear ||
                                    itemDate.getFullYear().toString() ===
                                        selectedYear;
                                const matchesMonth =
                                    !selectedMonth ||
                                    itemDate.getMonth().toString() ===
                                        selectedMonth;
                                return (
                                    matchesSearch && matchesYear && matchesMonth
                                );
                            })
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((item) => (
                                <TableRow key={item.name + item.time}>
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
                                            Rp {item.bill.toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: item.status
                                                    ? "#00c292"
                                                    : "#fc4b6c",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label={
                                                item.status
                                                    ? "Lunas"
                                                    : "Belum Lunas"
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {new Date(
                                                item.time
                                            ).toLocaleDateString()}
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
                        count={
                            transaction.filter((item) => {
                                const itemDate = new Date(item.time);
                                const matchesSearch = item.name
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase());
                                const matchesYear =
                                    !selectedYear ||
                                    itemDate.getFullYear().toString() ===
                                        selectedYear;
                                const matchesMonth =
                                    !selectedMonth ||
                                    itemDate.getMonth().toString() ===
                                        selectedMonth;
                                return (
                                    matchesSearch && matchesYear && matchesMonth
                                );
                            }).length
                        }
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[10]}
                    />
                </Box>
            </Box>
        </BlankCard>
    );
};

export default PaymentRecord;
