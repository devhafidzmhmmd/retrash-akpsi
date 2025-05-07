import React from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { useUser } from "src/context/AppUser";

const SidebarItems = () => {
    const { pathname } = useLocation();
    const pathDirect = pathname;
    const { user } = useUser();

    return (
        <Box sx={{ px: 3 }}>
            <List sx={{ pt: 0 }} className="sidebarNav">
                {Menuitems.map((item) => {
                    if (item.type && item.type.includes(user.type)) {
                        // {/********SubHeader**********/}
                        if (item.subheader) {
                            return (
                                <NavGroup item={item} key={item.subheader} />
                            );

                            // {/********If Sub Menu**********/}
                            /* eslint no-else-return: "off" */
                        } else {
                            return (
                                <NavItem
                                    item={item}
                                    key={item.id}
                                    pathDirect={pathDirect}
                                />
                            );
                        }
                    }
                })}
            </List>
        </Box>
    );
};
export default SidebarItems;
