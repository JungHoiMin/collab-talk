import React, {KeyboardEvent, useCallback} from "react";
import "./Login.css"
import imgLogo from '@images/logo.png'
import {Button, TextField} from "@mui/material";
import useInputState from "@hooks/InputState";
import {setAuthorizationToken} from "@apis/AxiosInstance";
import {useNavigate} from "react-router-dom";
import {login} from "@apis/auth/AuthApi";
import {setEmail, setName, setNickName, setToken} from "@stores/UserInfoSlice";
import {useAppDispatch} from "@hooks/hooks";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, , onChangeEmail] = useInputState<string>('');
  const [password, , onChangePassword] = useInputState<string>('');

  const onClickLogin = useCallback(() => {
    if (email === '') {
      alert('이메일을 입력하세요.');
      return;
    }

    if (password === ''){
      alert('비밀번호를 입력하세요.');
      return;
    }

    login(email, password)
      .then((res) => {
        const {token, email, name, nick_name} = res;
        dispatch(setToken(token));
        dispatch(setEmail(email));
        dispatch(setName(name));
        setAuthorizationToken(token);

        if (nick_name === '')
          navigate('/init');
        else{
          dispatch(setNickName(nick_name));
          navigate('/home');
        }
      })
        .catch((err) => {
          console.log(err)
        })
  }, [email, password]);

  const onKeyDownSearchInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      onClickLogin()
  };

  return (
    <>
      <div className="ctLoginMain">
        <img className="ctLogo" src={imgLogo} alt="logo"/>
        <div>
          <TextField className="ctInput" variant="standard" label="이메일" type="email" onChange={onChangeEmail} onKeyDown={onKeyDownSearchInput}/>
        </div>
        <div>
          <TextField className="ctInput" variant="standard" label="비밀번호" type="password" onChange={onChangePassword} onKeyDown={onKeyDownSearchInput}/>
        </div>
        <div>
          <Button className="ctSubmitButton" variant="outlined" onClick={onClickLogin}>로그인</Button>
        </div>
      </div>
    </>
  )
}

export default Login;
