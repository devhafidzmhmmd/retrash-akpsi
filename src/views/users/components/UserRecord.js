import React, { useEffect, useState } from "react";
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
    Select,
    MenuItem,
} from "@mui/material";
// import DashboardCard from "../../../components/shared/DashboardCard";
import BlankCard from "../../../components/shared/BlankCard";
import { IconEdit, IconTrash, IconUserPlus } from "@tabler/icons-react";
import {
    getOfficerList,
    createOfficer,
    updateOfficer,
} from "../../../api/officer";
import { useAlert } from "../../../components/shared/messenger";

const UserRecord = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [selectedResident, setSelectedResident] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        type: "",
        password: "",
    });
    const { showAlert } = useAlert();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOfficerList();
            setUsers(data);
        };
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleEditClick = (user) => {
        setSelectedResident(user);
        setFormData({
            username: user.username || "",
            type: user.type || "",
        });
        setOpenEditModal(true);
    };

    const handleDeleteClick = (user) => {
        setSelectedResident(user);
        setOpenDeleteModal(true);
    };

    const handleCloseModals = () => {
        setOpenEditModal(false);
        setOpenDeleteModal(false);
        setOpenAddModal(false);
        setSelectedResident(null);
        setFormData({ username: "", type: "", password: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreatePetugas = async () => {
        console.log("Creating:", formData);
        if (!formData.username || !formData.password || !formData.type) {
            showAlert("warning", "Silahkan isi semua field");
            return;
        }
        const created = await createOfficer(
            formData.username,
            formData.password,
            formData.type
        );
        if (created) {
            showAlert("success", "Data berhasil ditambahkan");
            setUsers((prev) => [...prev, created]);
        } else {
            showAlert("error", "Data gagal ditambahkan");
        }
        handleCloseModals();
    };

    const handleUpdatePetugas = async () => {
        console.log(formData);
        const updated = await updateOfficer(
            selectedResident.id,
            formData.username,
            formData.type
        );
        if (updated) {
            alert("Data berhasil diupdate");
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === selectedResident.id ? updated : user
                )
            );
        } else {
            alert("Data gagal diupdate");
        }
        handleCloseModals();
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
                    <Typography variant="h5">Data petugas</Typography>
                    <Box>
                        <input
                            type="text"
                            placeholder="Cari nama petugas..."
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
                            onClick={() => {
                                setPage(0);
                                setSearchTerm("");
                                setOpenAddModal(true);
                            }}
                            startIcon={<IconUserPlus size={18} />}
                            title="Tambah data petugas baru"
                        >
                            Tambah Petugas
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
                                    NAMA
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    PERAN
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                    textAlign="center"
                                >
                                    AKSI
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .filter((product) =>
                                product.username
                                    .toLowerCase()
                                    .includes(
                                        searchTerm
                                            ? searchTerm.toLowerCase()
                                            : ""
                                    )
                            )
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((product) => (
                                <TableRow key={product.username}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {product.username}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.type}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
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
                                                    backgroundColor: "#00c292",
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                }}
                                                size="small"
                                                icon={<IconEdit size={14} />}
                                                label="Edit"
                                                onClick={() =>
                                                    handleEditClick(product)
                                                }
                                                title="Edit data petugas"
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
                                                    handleDeleteClick(product)
                                                }
                                                title="Hapus data petugas"
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
                        count={
                            users.filter((product) =>
                                product.username
                                    .toLowerCase()
                                    .includes(
                                        searchTerm
                                            ? searchTerm.toLowerCase()
                                            : ""
                                    )
                            ).length
                        }
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[10]}
                    />
                </Box>

                {/* Edit Modal */}
                <Dialog open={openEditModal} onClose={handleCloseModals}>
                    <DialogTitle>Ubah Data petugas</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nama"
                            fullWidth
                            variant="outlined"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <Select
                            margin="dense"
                            fullWidth
                            variant="outlined"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <MenuItem value="ADMINISTRATOR">
                                ADMINISTRATOR
                            </MenuItem>
                            <MenuItem value="FIELD_OFFICER">
                                FIELD_OFFICER
                            </MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModals}>Batal</Button>
                        <Button
                            onClick={handleUpdatePetugas}
                            variant="contained"
                        >
                            Simpan
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Add Modal */}
                <Dialog open={openAddModal} onClose={handleCloseModals}>
                    <DialogTitle>Tambah Data petugas</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nama"
                            fullWidth
                            variant="outlined"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Select
                            margin="dense"
                            label="Type"
                            fullWidth
                            variant="outlined"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <MenuItem value="ADMINISTRATOR">
                                ADMINISTRATOR
                            </MenuItem>
                            <MenuItem value="FIELD_OFFICER">
                                FIELD_OFFICER
                            </MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModals}>Batal</Button>
                        <Button
                            onClick={handleCreatePetugas}
                            variant="contained"
                        >
                            Simpan
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Modal */}
                <Dialog open={openDeleteModal} onClose={handleCloseModals}>
                    <DialogTitle>Konfirmasi Hapus</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Apakah Anda yakin ingin menghapus data petugas{" "}
                            <strong>{selectedResident?.username}</strong>?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModals}>Batal</Button>
                        <Button
                            color="error"
                            variant="contained"
                            onClick={handleCloseModals}
                        >
                            Hapus
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </BlankCard>
    );
};

export default UserRecord;
