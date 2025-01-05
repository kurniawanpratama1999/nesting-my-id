import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Wrapper from "../../components/Wrapper";

const Page_ForgetPassword = () => {
  // Setting Step
  const steps = ["email", "otp", "password"];
  const [stepCounter, setStepCounter] = useState(0);
  const [step, setStep] = useState(steps[stepCounter]);

  // Input and Set Values
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  // OTP Setting
  const [enableTimeOtp, setEnableTimeOtp] = useState(120);
  const [minute, setMinutes] = useState(Math.floor(enableTimeOtp / 60));
  const [seconds, setSeconds] = useState(enableTimeOtp % 60);
  const [isEnableOtp, setIsEnableOtp] = useState(false);
  const [lastClick, setLastclick] = useState(null);
  const timeIntervalID = useRef(null);

  const handleBack = () => {
    setStepCounter((prev) => 0);
    setStep(steps[stepCounter]);
  };
  const handleSubmitEmail = () => {
    setStepCounter((prev) => (prev >= 2 ? 2 : prev + 1));
    setStep(steps[stepCounter + 1]);
    setLastclick(Date);
  };
  const handleSubmitOtp = () => {
    setStepCounter((prev) => (prev >= 2 ? 2 : prev + 1));
    setStep(steps[stepCounter + 1]);
  };
  const handleSubmitPassword = () => {
    setStepCounter((prev) => (prev >= 2 ? 2 : prev + 1));
    setStep(steps[stepCounter]);
  };

  useEffect(() => {
    setIsEnableOtp(false);
    clearInterval(timeIntervalID.current);

    if (step === "otp" && lastClick) {
      timeIntervalID.current = setInterval(() => {
        if (enableTimeOtp < 0) {
          clearInterval(timeIntervalID.current);
          setIsEnableOtp(true);
          return setEnableTimeOtp(0);
        }
        console.log(enableTimeOtp)
        setMinutes(Math.floor(enableTimeOtp / 60));
        setSeconds(Math.floor(enableTimeOtp % 60));
        return setEnableTimeOtp(enableTimeOtp - 1);
      }, 100);
    }

    return () => {
      clearInterval(timeIntervalID.current);
    };
  }, [lastClick, enableTimeOtp]);

  return (
    <Container className="relative justify-center items-center">
      <Form
        onSubmit={handleSubmitPassword}
        className="px-2 pt-2"
        title="Forgot Password"
      >
        <Input
          htmlFor="email"
          title="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />

        {step == "otp" && (
          <>
            <Input
              htmlFor="otp"
              title="otp"
              value={otp}
              onChange={({ target }) => setOtp(target.value)}
            />
          </>
        )}

        {step == "password" && (
          <>
            <Input
              htmlFor="new-password"
              title="new password"
              isPassword={true}
              value={new_password}
              onChange={({ target }) => setNewPassword(target.value)}
            />
            <Input
              htmlFor="confirm-password"
              title="confirm password"
              isPassword={true}
              value={confirm_password}
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
          </>
        )}

        <Wrapper display="grid" className="grid-cols-2 gap-4" border="none">
          {step === "email" || (
            <>
              <div className="col-span-2 text-sm flex flex-col items-center justify-center gap-2">
                <p>Kirim ulang kode otp</p>
                <p>{`${minute}:${seconds}`}</p>
                {isEnableOtp && (
                  <Button
                    width="fit"
                    className="px-5"
                    bgColor="gray"
                    label="Send Otp"
                  />
                )}
              </div>
              <Button
                onClick={handleBack}
                type="button"
                label={step === "otp" ? "Change Email" : "Ulangi"}
                className="text-sm"
                bgColor="red"
              />
            </>
          )}

          {step == "email" && (
            <Button
              onClick={handleSubmitEmail}
              type="button"
              label="Check Email"
              className="text-sm"
              bgColor="emerald"
            />
          )}
          {step == "otp" && (
            <Button
              onClick={handleSubmitOtp}
              type="button"
              label="Check otp"
              className="text-sm"
              bgColor="emerald"
            />
          )}
          {step == "password" && (
            <Button
              onClick={handleSubmitPassword}
              type="button"
              label="Submit"
              className="text-sm"
              bgColor="emerald"
            />
          )}
        </Wrapper>
      </Form>
    </Container>
  );
};

export default Page_ForgetPassword;
