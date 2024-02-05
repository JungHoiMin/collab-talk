import imgLogo from '../../../images/logo.png'
import {Button, TextField} from "@mui/material";
import useInputState from "../../../hooks/InputState";
import {axiosInstance} from "../../../manager/AxiosInstance";
import {useNavigate} from "react-router-dom";
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

    axiosInstance.post('collaborator/login', {
      email, password
    })
      .then((res) => {
        console.log(res);
        const {token, email, nick_name} = res.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', email);

        if (nick_name === '')
          navigate('/home/init');
        else{
          sessionStorage('nick_name', nick_name);
          navigate('/home');
        }
      })
  }
  return (
    <>
      <div className="ctSignupMain">
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
