import "./Login.css"
import imgLogo from '../../../images/logo.png'
import {Button, TextField} from "@mui/material";
import useInputState from "../../../hooks/InputState";
import {axiosInstance, setAuthorizationToken} from "../../../apis/AxiosInstance";
import {useNavigate} from "react-router-dom";
import {login} from "../../../apis/auth/AuthApi";
const Login = () => {
  const navigate = useNavigate();
  const [email, , onChangeEmail] = useInputState('');
  const [password, , onChangePassword] = useInputState('');

  const onClickLogin = () => {
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
        sessionStorage.clear();
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('name', name);
        setAuthorizationToken(token);

        if (nick_name === '')
          navigate('/home/init');
        else{
          sessionStorage('nick_name', nick_name);
          navigate('/home');
        }
      })
        .catch((err) => {
          console.log(err)
        })
  }
  return (
    <>
      <div className="ctLoginMain">
        <img className="ctLogo" src={imgLogo} alt="logo"/>
        <div>
          <TextField className="ctInput" variant="standard" label="이메일" type="email" onChange={onChangeEmail}/>
        </div>
        <div>
          <TextField className="ctInput" variant="standard" label="비밀번호" type="password" onChange={onChangePassword}/>
        </div>
        <div>
          <Button className="ctSubmitButton" variant="outlined" onClick={onClickLogin}>로그인</Button>
        </div>
      </div>
    </>
  )
}

export default Login;
