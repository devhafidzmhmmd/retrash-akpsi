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
// import transaction from "../../../dummy/transaction.json";
import BlankCard from "../../../components/shared/BlankCard";
import { IconEdit, IconSend } from "@tabler/icons-react";
import {
    getInvoiceList,
    updateInvoiceStatus,
    resendInvoice,
} from "../../../api/invoice";

const BillsRecord = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedMonth, setSelectedMonth] = React.useState("");
    const [selectedYear, setSelectedYear] = React.useState("");
    const [transaction, setTransaction] = React.useState([]);

    const fetchData = async () => {
        const data = await getInvoiceList();
        setTransaction(data);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const years = [
        ...new Set(
            transaction.map((item) => new Date(item.invoiceDate).getFullYear())
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

    const handleKirim = async (item) => {
        const result = await resendInvoice(item.id);
        if (result) {
            fetchData();
        }
    };

    const handeUbahStatus = async (item) => {
        const result = await updateInvoiceStatus(item.id, "PAID");
        if (result) {
            fetchData();
        }
    };

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
                    <Typography variant="h5">Info Tagihan</Typography>
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
                            {/* <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    STATUS
                                </Typography>
                            </TableCell> */}
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    WAKTU
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                    textAlign="center"
                                >
                                    ACTIONS
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transaction
                            .filter((item) => {
                                const itemDate = new Date(item.invoiceDate);
                                const matchesSearch = item.resident.name
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
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {item.resident.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            Rp {item.amount.toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    {/* <TableCell>
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
                                    </TableCell> */}
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {new Date(item.invoiceDate)
                                                .toLocaleDateString("id-ID", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })
                                                .toUpperCase()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ fontSize: "13px" }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 1,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Chip
                                                    sx={{
                                                        px: "4px",
                                                        backgroundColor:
                                                            "#00c292",
                                                        color: "#fff",
                                                        cursor: "pointer",
                                                    }}
                                                    size="small"
                                                    icon={
                                                        <IconEdit size={14} />
                                                    }
                                                    label="Ubah"
                                                    onClick={() =>
                                                        handeUbahStatus(item)
                                                    }
                                                    title="Edit data warga"
                                                />
                                                <Chip
                                                    sx={{
                                                        px: "4px",
                                                        backgroundColor:
                                                            "#0288D1",
                                                        color: "#fff",
                                                        cursor: "pointer",
                                                    }}
                                                    size="small"
                                                    icon={
                                                        <IconSend size={14} />
                                                    }
                                                    label="Kirim"
                                                    onClick={() =>
                                                        handleKirim(item)
                                                    }
                                                    title="Kirim tagihan"
                                                />
                                            </Box>
                                        </Box>
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
                                const matchesSearch = item.resident.name
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

export default BillsRecord;
