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
    Button,
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogContentText,
} from "@mui/material";
import BlankCard from "../../../components/shared/BlankCard";
import { IconEdit, IconTrash, IconUserPlus } from "@tabler/icons-react";
import { createResident, getResidentList, updateResident } from "../../../api/resident";
import { useAlert } from "../../../components/shared/messenger";

const ResidentRecord = () => {
    const [residents, setResidents] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const [selectedResident, setSelectedResident] = React.useState(null);
    const [newResident, setNewResident] = React.useState({
        name: "",
        phoneNumber: "+62",
    });
    const { showAlert } = useAlert();

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getResidentList();
            setResidents(data);
        };
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleEditClick = (resident) => {
        // Ensure phone number starts with +62
        const phoneNumber = resident.phoneNumber.startsWith("+62")
            ? resident.phoneNumber
            : `+62${resident.phoneNumber.replace(/^0/, "")}`;

        setSelectedResident({
            ...resident,
            phoneNumber,
        });
        setOpenEditModal(true);
    };

    const handleDeleteClick = (resident) => {
        setSelectedResident(resident);
        setOpenDeleteModal(true);
    };

    const handleCloseModals = () => {
        setOpenEditModal(false);
        setOpenDeleteModal(false);
        setOpenAddModal(false);
        setSelectedResident(null);
    };

    const handleAddClick = () => {
        setNewResident({ name: "", phoneNumber: "+62" });
        setOpenAddModal(true);
    };

    const validatePhoneNumber = (phoneNumber) => {
        return (
            phoneNumber.startsWith("+62") &&
            phoneNumber.length >= 4 &&
            /^\+62\d+$/.test(phoneNumber)
        ); // Only allow digits after +62
    };

    const handleAddResident = async () => {
        if (
            !newResident.name ||
            !validatePhoneNumber(newResident.phoneNumber)
        ) {
            showAlert?.(
                "warning",
                "Nama wajib diisi dan nomor telepon harus diawali dengan +62 dan hanya berisi angka"
            );
            return;
        }

        const created = await createResident(
            newResident.name,
            newResident.phoneNumber
        );
        if (created) {
            const updated = [...residents, newResident];
            setResidents(updated);
            showAlert?.("success", "Data warga berhasil ditambahkan.");
            setOpenAddModal(false);
        }
    };

    const handleUpdateResident = async () => {
        if (!validatePhoneNumber(selectedResident.phoneNumber)) {
            showAlert?.(
                "warning",
                "Nomor telepon harus diawali dengan +62 dan hanya berisi angka"
            );
            return;
        }

        await updateResident({
            id: selectedResident.id,
            name: selectedResident.name,
            phoneNumber: selectedResident.phoneNumber,
        });
        const updated = residents.map((res) =>
            res === selectedResident.original ? selectedResident : res
        );
        setResidents(updated);
        showAlert?.("success", "Data warga berhasil diubah.");
        handleCloseModals();
    };

    const handleDeleteResident = async () => {
        await updateResident({
            id: selectedResident.id,
            isDelete: true,
        });
        const updated = residents.filter((res) => res !== selectedResident);
        setResidents(updated);
        showAlert?.("success", "Data warga berhasil dihapus.");
        handleCloseModals();
    };

    const filteredResidents = residents.filter((res) =>
        res.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePhoneNumberChange = (value, setter) => {
        // Only allow + at the start and digits after that
        const newValue = value.replace(/[^\+\d]/g, "");
        if (!newValue.startsWith("+62")) {
            setter("+62");
        } else {
            setter(newValue);
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
                    <Typography variant="h5">Data Warga</Typography>
                    <Box>
                        <input
                            type="text"
                            placeholder="Cari nama warga..."
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
                            sx={{ ml: 2 }}
                            onClick={handleAddClick}
                            startIcon={<IconUserPlus size={18} />}
                            title="Tambah data warga baru"
                        >
                            Tambah Warga
                        </Button>
                    </Box>
                </Box>

                <Table sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography fontWeight={600}>NAMA</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontWeight={600}>
                                    NOMOR TELEPON
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontWeight={600} textAlign="center">
                                    AKSI
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredResidents
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((resident, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {resident.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            color="textSecondary"
                                            sx={{ fontSize: "13px" }}
                                        >
                                            {resident.phoneNumber}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: 1,
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Chip
                                                sx={{
                                                    px: "4px",
                                                    backgroundColor: "#00c292",
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                }}
                                                size="small"
                                                icon={<IconEdit size={14} />}
                                                label="Ubah"
                                                onClick={() =>
                                                    handleEditClick({
                                                        ...resident,
                                                        original: resident,
                                                    })
                                                }
                                            />
                                            <Chip
                                                sx={{
                                                    px: "4px",
                                                    backgroundColor: "#fc4b6c",
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                }}
                                                size="small"
                                                icon={<IconTrash size={14} />}
                                                label="Hapus"
                                                onClick={() =>
                                                    handleDeleteClick(resident)
                                                }
                                            />
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
                        count={filteredResidents.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[10]}
                    />
                </Box>

                {/* Edit Modal */}
                <Dialog open={openEditModal} onClose={handleCloseModals}>
                    <DialogTitle>Ubah Data Warga</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nama"
                            fullWidth
                            variant="outlined"
                            value={selectedResident?.name || ""}
                            onChange={(e) =>
                                setSelectedResident((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Nomor Telepon"
                            fullWidth
                            variant="outlined"
                            value={selectedResident?.phoneNumber || ""}
                            onChange={(e) => {
                                handlePhoneNumberChange(
                                    e.target.value,
                                    (value) =>
                                        setSelectedResident((prev) => ({
                                            ...prev,
                                            phoneNumber: value,
                                        }))
                                );
                            }}
                            helperText="Nomor telepon harus diawali dengan +62 dan hanya berisi angka"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModals}>Batal</Button>
                        <Button
                            onClick={handleUpdateResident}
                            variant="contained"
                        >
                            Simpan
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Add Modal */}
                <Dialog open={openAddModal} onClose={handleCloseModals}>
                    <DialogTitle>Tambah Warga Baru</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nama"
                            fullWidth
                            variant="outlined"
                            value={newResident.name}
                            onChange={(e) =>
                                setNewResident({
                                    ...newResident,
                                    name: e.target.value,
                                })
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Nomor Telepon"
                            fullWidth
                            variant="outlined"
                            value={newResident.phoneNumber}
                            onChange={(e) => {
                                handlePhoneNumberChange(
                                    e.target.value,
                                    (value) =>
                                        setNewResident({
                                            ...newResident,
                                            phoneNumber: value,
                                        })
                                );
                            }}
                            helperText="Nomor telepon harus diawali dengan +62 dan hanya berisi angka"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModals}>Batal</Button>
                        <Button onClick={handleAddResident} variant="contained">
                            Simpan
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Modal */}
                <Dialog open={openDeleteModal} onClose={handleCloseModals}>
                    <DialogTitle>Konfirmasi Hapus</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Apakah Anda yakin ingin menghapus data warga{" "}
                            <strong>{selectedResident?.name}</strong>?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModals}>Batal</Button>
                        <Button
                            onClick={handleDeleteResident}
                            color="error"
                            variant="contained"
                        >
                            Hapus
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </BlankCard>
    );
};

export default ResidentRecord;
