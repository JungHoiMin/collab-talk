import "@pages/home/Home.css"
import {AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import logo from "@images/logo.png";
import default_profile from "@images/default-profile.png";
import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch} from "@hooks/hooks";
import {clearUserInfo} from "@stores/UserInfoSlice";
import {Link, useNavigate} from "react-router-dom";
import {loadProfileMainImageSource} from "@apis/home/HomeApi";
import {setAuthorizationToken} from "@apis/AxiosInstance";

const settings = [
  { label: 'profile', value: '프로필' },
  { label: 'account', value: '계정' },
  { label: 'logout', value: '로그아웃' },
]

export const CTTitleBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const onClickOpenUserMenu = useCallback((e: any) => {
    setAnchorElUser(e.currentTarget);
  }, [])

  const onCloseUserMemu = useCallback((e: any, label: string) => {
    setAnchorElUser(null);
    switch (label) {
      case 'profile':
        break;
      case 'account':
        break;
      case 'logout':
        dispatch(clearUserInfo());
        sessionStorage.clear();
        setAuthorizationToken('');
        navigate('/auth/login')
        break;
    }
  }, []);

  useEffect(() => {
    loadProfileMainImageSource()
      .then((res) => {
        setImageUrl(res)
      }).catch((err) => {
        console.log(err)
    })
  }, [])

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${70}px)` },
        ml: { sm: `${70}px` },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/home" >
            <img className="ctTitleLogo" src={logo} alt="logo" />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="더보기...">
              <IconButton onClick={onClickOpenUserMenu} sx={{ p: 0 }} >
                <Avatar alt="Profile-Image" src={imageUrl || default_profile} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt:'45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={onCloseUserMemu}
            >
              {settings.map(({label, value}) => (
                <MenuItem key={label} onClick={(e) => {onCloseUserMemu(e, label)}}>
                  <Typography textAlign="center">{value}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}