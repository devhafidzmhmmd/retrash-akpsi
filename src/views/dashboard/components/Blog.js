import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab, Box } from '@mui/material';
import img1 from 'src/assets/images/products/image_1.png';
import img2 from 'src/assets/images/products/image_2.png';
import img3 from 'src/assets/images/products/image_3.png';
import img4 from 'src/assets/images/products/image_4.png';
import { Stack } from '@mui/system';
import { IconBasket } from '@tabler/icons-react';
import BlankCard from '../../../components/shared/BlankCard';

const ecoCard = [
    {
        title: 'Buang Sampah Sembarangan',
        subheader: 'September 14, 2023',
        photo: img1,
    },
    {
        title: 'Melebihi Kapasitas',
        subheader: 'September 14, 2023',
        photo: img2,
    },
    {
        title: 'Pohon Ambruk',
        subheader: 'September 14, 2023',
        photo: img3,
    },
    {
        title: 'Parkir Sembarangan',
        subheader: 'September 14, 2023',
        photo: img4,
    },
];

const Blog = () => {
    return (
        <Box>
            <Typography textAlign="center" my={3} variant="h3">
                Laporan Kebersihan
            </Typography>
            <Grid container spacing={3}>
                {ecoCard.map((product, index) => (
                    <Grid item sm={12} md={4} lg={3} key={index}>
                        <BlankCard>
                            <Typography component={Link} to="/">
                                <img
                                    src={product.photo}
                                    alt="img"
                                    width="100%"
                                />
                            </Typography>
                            {/* <Tooltip title="Add To Cart">
                            <Fab
                                size="small"
                                color="primary"
                                sx={{ bottom: '75px', right: '15px', position: 'absolute' }}
                            >
                                <IconBasket size="16" />
                            </Fab>
                        </Tooltip> */}
                            <CardContent sx={{ p: 3, pt: 2 }}>
                                <Typography variant="h6">
                                    {product.title}
                                </Typography>
                                {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h6">${product.price}</Typography>
                                    <Typography color="textSecondary" ml={1} sx={{ textDecoration: 'line-through' }}>
                                        ${product.salesPrice}
                                    </Typography>
                                </Stack>
                                <Rating name="read-only" size="small" value={product.rating} readOnly />
                            </Stack> */}
                            </CardContent>
                        </BlankCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Blog;
