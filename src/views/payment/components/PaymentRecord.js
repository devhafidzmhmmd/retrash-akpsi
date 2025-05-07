import React, { useState, useEffect } from "react";
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
import BlankCard from "../../../components/shared/BlankCard";
import { getTransactionList } from "../../../api/transaction";

const PaymentRecord = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTransactionList();
            const enriched = data.map((item) => ({
                ...item,
                resident: item.resident || { name: "Tidak diketahui" },
            }));
            setTransaction(enriched);
        };
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        setPage(0);
    }, [searchTerm, selectedMonth, selectedYear]);

    const years = [
        ...new Set(
            transaction.map((item) => new Date(item.createdAt).getFullYear())
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

    const filteredData = transaction.filter((item) => {
        const itemDate = new Date(item.createdAt);
        const matchesSearch = item.resident?.name
            ?.toLowerCase()
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
                    <Typography variant="h5">Laporan Pembayaran</Typography>
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
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                    sx={{ whiteSpace: "nowrap", mt: 2 }}
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
                        {filteredData
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Typography
                                            fontSize="15px"
                                            fontWeight="500"
                                        >
                                            {item.resident?.name ||
                                                "Tidak diketahui"}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontSize="13px">
                                            Rp{" "}
                                            {isNaN(Number(item.paidAmount))
                                                ? "0"
                                                : Number(
                                                      item.paidAmount
                                                  ).toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor:
                                                    item.status === "COMPLETED"
                                                        ? "#00c292"
                                                        : "#fc4b6c",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label={
                                                item.status === "COMPLETED"
                                                    ? "Lunas"
                                                    : "Belum Lunas"
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontSize="13px">
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                    }}
                >
                    <TablePagination
                        component="div"
                        count={filteredData.length}
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
