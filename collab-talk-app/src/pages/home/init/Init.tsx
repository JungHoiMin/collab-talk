import React from "react";
import './Init.css'
import {
  Box,
  Button,
  FormControlLabel, Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from "@mui/material";
import default_profile from "@images/default-profile.png"
import {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import useInputState from "@hooks/InputState";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {initProfile, initProfileImage} from "@apis/home/init/InitApi";

const steps = ['닉네임 만들기', '성별 선택하기', '프로필 사진 업로드 하기'];

const Init = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [nickname,, onChangeNickname] = useInputState<string>('');
  const [gender, , onChangeGender] = useInputState<string>('M');
  const [imageSource, setImageSource] = useState<File>();
  const [previewImageSource, setPreviewImageSource] = useState<ArrayBuffer>()

  const onClickImageUpload = useCallback((e: any) => {
    const selectedFile = e.target.files[0];
    setImageSource(selectedFile);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setPreviewImageSource(reader.result as ArrayBuffer);
        resolve();
      }
    })
  }, []);

  const onClickNext = useCallback(() => {
    setActiveStep((prev) => prev +1);
    if (activeStep >= steps.length - 1){
      if (imageSource !== null){
        initProfileImage(imageSource as File)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err)
            })
        initProfile(nickname, gender)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            })
      }

      navigate('/home');
    }

  }, [activeStep, imageSource]);

  const onClickBack = useCallback(() => {
    setActiveStep((current) => (current - 1))
  }, []);


  const getStepContent = () => {
    if (activeStep === 0) {
      return (
          <React.Fragment>
            <div className="ctDescription">
              <Typography>당신이 메신저에서 사용할 닉네임을 만들어보세요.</Typography>
              <Typography>닉네임을 입력하지 않으면 당신의 이름으로 대체합니다.</Typography>
            </div>
            <div className="ctContentBody">
              <TextField
                  className="ctInput"
                  variant="standard"
                  label="닉네임"
                  type="text"
                  onChange={onChangeNickname}
              />
            </div>
          </React.Fragment>
      )
    } else if(activeStep === 1) {
      return (
          <>
            <div className="ctDescription">
              <Typography>당신의 성별을 골라주세요.</Typography>
            </div>
            <div className="ctContentBody">
              <RadioGroup
                value={gender}
                onChange={onChangeGender}
              >
                <FormControlLabel value="M" control={<Radio/>} label="남자"/>
                <FormControlLabel value="F" control={<Radio/>} label="여자"/>
                <FormControlLabel value="U" control={<Radio/>} label="비밀"/>
              </RadioGroup>
            </div>
          </>
      )
    } else if (activeStep === 2) {
      return (
          <>
            <div className="ctDescription">
              <Typography>이제 마지막입니다.</Typography>
              <Typography>당신의 프로필 사진을 업로드 해주세요.</Typography>
              <Typography>업로드 하지 않으면 기본 이미지로 대체됩니다.</Typography>
            </div>
            <div className="ctContentBody">
              <div>
                <img
                    className="ctImage"
                    src={previewImageSource !== null ? previewImageSource : default_profile}
                    alt="preview"/>
                </div>
              <div>
                <Button variant="contained" startIcon={<CloudUploadIcon />}>
                    이미지 변경하기
                    <input
                        className='ctVisuallyHidden'
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={onClickImageUpload}/>
                </Button>
              </div>
            </div>
          </>
      )
    }

  }
  return (
    <>
      <div className="ctInitMain">
        <Stepper activeStep={activeStep} className="ctStepper">
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className="ctContent">
          {getStepContent()}
        </div>
        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={onClickBack}
            sx={{ mr:1 }}
          >Back</Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={onClickNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </div>
    </>
  )
}

export default Init;
