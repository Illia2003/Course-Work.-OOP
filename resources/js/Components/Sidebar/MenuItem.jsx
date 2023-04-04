import { Box, Button, Link, ListItem, Typography } from "@mui/material";

export default function MenuItem ({title, icon, href, isActive}) {
    return (
        <ListItem sx={{padding: "0"}} className="sidebar__menu-item">
            <Link href={href} className="sidebar__menu-link">
                <Button className={isActive ? 'sidebar__menu-button--active sidebar__menu-button' : 'sidebar__menu-button'}>
                    <Box component="div" className="sidebar__menu-icon">
                        {icon}  
                    </Box>
                    <Typography variant='button' className="sidebar__menu-text">
                        {title}
                    </Typography>  
                </Button>
            </Link>
        </ListItem>
    );
}