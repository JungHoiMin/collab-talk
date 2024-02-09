import {AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import logo from "@images/logo.png";
import default_profile from "@images/default-profile.png";
import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@hooks/hooks";
import {clearUserInfo} from "@stores/UserInfoSlice";
import {useNavigate} from "react-router-dom";
import {loadProfileMainImageSource} from "@apis/home/HomeApi";

const settings = [
  { label: 'profile', value: '프로필' },
  { label: 'account', value: '계정' },
  { label: 'logout', value: '로그아웃' },
]

export const CTTitleBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [imageSource, setImageSource] = useState<ArrayBuffer | null | string>(null);
  const token = useAppSelector((state) => state.userInfo.token)
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
        navigate('/auth/login')
        break;
    }
  }, []);

  useEffect(() => {
    console.log(token)
    loadProfileMainImageSource()
      .then((res) => {
        console.log(res)
        setImageSource(res)
      }).catch((err) => {
        console.log(err)
    })
  }, [])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img width="200px" src={logo} alt="logo"/>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
            <button onClick={() => {console.log(token)}} > 토큰확인 </button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="더보기...">
              <IconButton onClick={onClickOpenUserMenu} sx={{ p: 0}} >
                <img width="40px" src={imageSource || default_profile} alt="img"></img>
                {/*<Avatar alt="Profile-Image" src={imageSource || default_profile} />*/}
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