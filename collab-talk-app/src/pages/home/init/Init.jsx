import {Step, Stepper} from "@mui/material";
import {useState} from "react";

const steps = ['닉네임 만들기', '성별 선택하기', '프로필 사진 업로드 하기'];

const Init = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => prev +1);
  }

  const handleBack = () => {
    setActiveStep((current) => (current - 1))
  }

  return (
    <>
      <div>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}
            )
          })}
        </Stepper>
      </div>
    </>
  )
}

export default Init;
