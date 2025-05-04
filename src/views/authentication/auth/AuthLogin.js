import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import { login as apiLogin } from "../../../api/auth";
import { setToken } from "../../../utils/auth";

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const login = await apiLogin(formData.username, formData.password);
        if (login) {
            setToken(login.token);
            navigate("/dashboard");
        } else {
            alert("Username atau password salah");
        }
    };

    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            )}

            {subtext}

            <form onSubmit={handleSubmit}>
                <Stack>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="username"
                            mb="5px"
                        >
                            Username
                        </Typography>
                        <CustomTextField
                            id="username"
                            name="username"
                            variant="outlined"
                            fullWidth
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box mt="25px">
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="password"
                            mb="5px"
                        >
                            Password
                        </Typography>
                        <CustomTextField
                            id="password"
                            name="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Box>
                    <Stack
                        justifyContent="flex-end"
                        direction="row"
                        alignItems="center"
                        my={2}
                    >
                        <Typography
                            component={Link}
                            to="/"
                            fontWeight="500"
                            sx={{
                                textDecoration: "none",
                                color: "primary.main",
                            }}
                        >
                            Forgot Password?
                        </Typography>
                    </Stack>
                </Stack>
                <Box>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                    >
                        Sign In
                    </Button>
                </Box>
            </form>
            {subtitle}
        </>
    );
};

export default AuthLogin;
