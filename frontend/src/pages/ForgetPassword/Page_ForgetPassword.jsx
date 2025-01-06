import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Wrapper from "../../components/Wrapper";
import hit_api, { fetcher } from "../../utils/fetcher";
import api_collection from "../../api/api_collection";

const Page_ForgetPassword = () => {
  const navigate = useNavigate();

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

  const handleBack = (e) => {
    e.preventDefault();
    setStepCounter((prev) => 0);
    setStep(steps[0]);
  };
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    fetcher("PUT", null, { email }, api_collection.user.checkEmail)
      .then((res) => {
        console.log(res.message);
        if (res.success) {
          setStepCounter((prev) => (prev >= 2 ? 2 : prev + 1));
          setStep(steps[stepCounter + 1]);

          if (!lastClick || isEnableOtp) {
            setLastclick(new Date());
            setIsEnableOtp(false);
          }
        }
      })
      .catch((err) => console.log(err));
  };
  const handleSubmitOtp = async (e) => {
    e.preventDefault();

    fetcher("POST", null, { email, otp }, api_collection.user.checkOtp)
      .then((res) => {
        console.log(res.message);
        if (res.success) {
          setStepCounter((prev) => (prev >= 2 ? 2 : prev + 1));
          setStep(steps[stepCounter + 1]);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleSendOtp = async (e) => {
    e.preventDefault();
    fetcher("PUT", null, { email }, api_collection.user.checkEmail)
      .then((res) => {
        console.log(res.message);
        if (res.success) {
          setIsEnableOtp(false);
          setLastclick(new Date());
        }
      })
      .catch((err) => console.log(err));
  };
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    fetcher(
      "PUT",
      null,
      { email, password: new_password, confirm_password },
      api_collection.user.checkPassword
    )
      .then((res) => {
        console.log(res.message);
        if (res.success) {
          fetcher(
            "DELETE",
            null,
            { email },
            api_collection.user.removeOtp
          ).then((res) => {
            console.log(res.message);
            if (res.success) {
              navigate("/login", { replace: true });
            }
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let spendTime = 120;
    setIsEnableOtp(false);
    clearInterval(timeIntervalID.current);

    if (step === "otp" && lastClick && !isEnableOtp) {
      timeIntervalID.current = setInterval(() => {
        spendTime -= 1;
        setMinutes(Math.floor(spendTime / 60));
        setSeconds(Math.floor(spendTime % 60));

        if (spendTime <= 0) {
          clearInterval(timeIntervalID.current);
          setIsEnableOtp(true);
          timeIntervalID.current == null;
          fetcher(
            "DELETE",
            null,
            { email },
            api_collection.user.removeOtp
          ).then((res) => {
            console.log(res.message);
          });
          return 0;
        }
      }, 1000);
    }

    return () => {
      clearInterval(timeIntervalID.current);
    };
  }, [lastClick]);

  useEffect(() => {}, [isEnableOtp, step]);

  return (
    <Container className="relative justify-center items-center">
      <Form
        className="px-2 pt-2"
        title="Forgot Password"
        onSubmit={
          step == "email"
            ? handleSubmitEmail
            : step === "otp"
            ? handleSubmitOtp
            : handleSubmitPassword
        }
      >
        <Input
          htmlFor="email"
          title="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          readOnly={step !== "email" ? 1 : 0}
          classNameInput={
            ["otp", "password"].includes(step) ? "text-gray-500" : "text-black"
          }
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
                {step === "otp" && !isEnableOtp ? (
                  <>
                    <p>Kirim ulang kode otp</p>
                    <p>{`${minute.toString().padStart(2, 0)}:${seconds
                      .toString()
                      .padStart(2, 0)}`}</p>
                  </>
                ) : (
                  false
                )}

                {step == "otp" && isEnableOtp ? (
                  <Button
                    width="fit"
                    className="px-5"
                    bgColor="gray"
                    label="Send Otp"
                    onClick={handleSendOtp}
                  />
                ) : (
                  false
                )}
              </div>
              <Button
                onClick={handleBack}
                type="button"
                label={step === "otp" ? "Change Email" : "Ulangi"}
                className="text-sm"
                bgColor={step !== "otp" ? "red" : "blue"}
              />
            </>
          )}

          {step == "email" && (
            <Button
              onClick={handleSubmitEmail}
              label="Check Email"
              className="text-sm col-span-2"
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
