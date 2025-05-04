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
// import DashboardCard from "../../../components/shared/DashboardCard";
import resident from "../../../dummy/users.json";
import BlankCard from "../../../components/shared/BlankCard";
import { IconEdit, IconTrash, IconUserPlus } from "@tabler/icons-react";

const UserRecord = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [selectedResident, setSelectedResident] = React.useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleEditClick = (resident) => {
        setSelectedResident(resident);
        setOpenEditModal(true);
    };

    const handleDeleteClick = (resident) => {
        setSelectedResident(resident);
        setOpenDeleteModal(true);
    };

    const handleCloseModals = () => {
        setOpenEditModal(false);
        setOpenDeleteModal(false);
        setSelectedResident(null);
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
                                    NAME
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                >
                                    ROLE
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
                        {resident
                            .filter((product) =>
                                product.name
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
                                <TableRow key={product.name}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {product.name}
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
                                                {product.role}
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
                            resident.filter((product) =>
                                product.name
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
                    <DialogTitle>Edit Data petugas</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nama"
                            fullWidth
                            variant="outlined"
                            defaultValue={selectedResident?.name}
                        />
                        <TextField
                            margin="dense"
                            label="Alamat"
                            fullWidth
                            variant="outlined"
                            defaultValue={selectedResident?.address}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModals}>Batal</Button>
                        <Button onClick={handleCloseModals} variant="contained">
                            Simpan
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Confirmation Modal */}
                <Dialog open={openDeleteModal} onClose={handleCloseModals}>
                    <DialogTitle>Konfirmasi Hapus</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Apakah Anda yakin ingin menghapus data petugas{" "}
                            {selectedResident?.name}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModals}>Batal</Button>
                        <Button
                            onClick={handleCloseModals}
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

export default UserRecord;
