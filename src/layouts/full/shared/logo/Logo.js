import { Link } from "react-router-dom";
// import { ReactComponent as LogoDark1 } from "src/assets/images/logos/dark1-logo.svg";
import logologin from "src/assets/images/logos/logo_horizon.png";
import { styled } from "@mui/material";
import { Box } from '@mui/material';
import PropTypes from "prop-types";

const LogoLogin = ({ img }) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={2}
            py={3}
        >
            <img src={img} alt="LogoLogin" style={{ width: 150 }} />
        </Box>
    );
};

LogoLogin.propTypes = {
    img: PropTypes.string.isRequired,
};

const LinkStyled = styled(Link)(() => ({
    height: "70px",
    width: "180px",
    overflow: "hidden",
    display: "block",
}));

const Logo = () => {
    return (
        <LinkStyled
            to="/"
            height={70}
            style={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <LogoLogin img={logologin} />
        </LinkStyled>
    );
};

export default Logo;
