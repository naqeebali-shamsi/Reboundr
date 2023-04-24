import * as React from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Login, PersonAdd, Logout } from '@mui/icons-material';
import { ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import config from '../config';

const pages = [{ text: 'Mock Interview', route: 'interview' }, { text: 'Posts', route: 'posts' }, { text: 'Jobs', route: 'jobs' }, { text: 'Networking', route: 'networking' }];

function PrimaryAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [displayedSettings, setDisplayedSettings] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { user, setUser, userData, setUserData, setUserType, token, setToken } = React.useContext(AuthContext);
  let id = '';

  React.useEffect(() => {
    if (token) {
      setDisplayedSettings([{ text: 'Profile', icon: AccountCircleIcon, route: 'profilepage' }, { text: 'Logout', icon: Logout, route: '' }]);
    }
    else {
      setDisplayedSettings([{ text: 'Login', icon: Login, route: 'Login' }, { text: 'Register', icon: PersonAdd, route: 'Register' }]);
    }
  }, [token]);
  

  const logout = async () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setUserData(null);
    setUserType(null);
    setIsLoggedIn(false);
    try {
      await axios.get(`${config.baseUrl}/logout`)
      console.log('Logout successful.');
    } catch (error) {
      console.error(error);
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const navigator = (page) => {
    if (page === '') {
      logout();
    }
    navigate("/" + page);
    handleCloseUserMenu();
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar() {
    let name = userData && userData.firstName ? userData.firstName + ' ' + userData.lastName : ' ';
    if (name === ' ') {
      return
    }
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const postpage = () => {
    navigate("/posts");
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WhatshotRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={postpage}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            REBOUNDR
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            |
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
            {token && (<Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={() => navigator(page.route)}>
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>)}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {token && pages.map((page) => (
              <Button
                key={page.text}
                onClick={() => navigator(page.route)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}  >
                <Avatar {...stringAvatar()} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {displayedSettings.map((setting) => (
                <MenuItem key={setting.text} onClick={() => navigator(setting.route, { state: { _id: id } })}>
                  <ListItemIcon><setting.icon fontSize="small" /></ListItemIcon>
                  <ListItemText>{setting.text}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <ToastContainer />
    </AppBar>
  );
}

export default PrimaryAppBar;
