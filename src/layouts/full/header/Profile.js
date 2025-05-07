import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Box,
    Menu,
    Button,
    IconButton,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";

import ProfileImg from "src/assets/images/profile/user-1.jpg";
import { useNavigate } from "react-router-dom";
import { removeToken } from "src/utils/auth";
import { useUser } from "src/context/AppUser";

const Profile = () => {
    const { user } = useUser();
    const [anchorEl2, setAnchorEl2] = useState(null);
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/auth/login");
    };

    return (
        <Box>
            <Box
                display="flex"
                alignItems="center"
                size="large"
                aria-label="show 11 new notifications"
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
                sx={{
                    cursor: "pointer", // Added to change mouse pointer on hover
                    ...(typeof anchorEl2 === "object" && {
                        color: "primary.main",
                    }),
                }}
                onClick={handleClick2}
            >
                <Box textAlign={"right"}>
                    <Typography variant="body1" fontWeight={500} mr={2}>
                        {user?.username ? user.username.toUpperCase() : "USER"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mr={2}>
                        {user?.type ? user.type : "Unknown Role"}
                    </Typography>
                </Box>
                <Avatar
                    src={ProfileImg}
                    alt={ProfileImg}
                    sx={{
                        width: 35,
                        height: 35,
                    }}
                />
            </Box>
            {/* ------------------------------------------- */}
            {/* Message Dropdown */}
            {/* ------------------------------------------- */}
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                sx={{
                    "& .MuiMenu-paper": {
                        width: "200px",
                    },
                }}
            >
                {/* <MenuItem>
                    <ListItemIcon>
                        <IconUser width={20} />
                    </ListItemIcon>
                    <ListItemText>My Profile</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <IconMail width={20} />
                    </ListItemIcon>
                    <ListItemText>My Account</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <IconListCheck width={20} />
                    </ListItemIcon>
                    <ListItemText>My Tasks</ListItemText>
                </MenuItem> */}
                <Box mt={1} py={1} px={2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleLogout}
                        fullWidth
                    >
                        Logout
                    </Button>
                </Box>
            </Menu>
        </Box>
    );
};

export default Profile;
