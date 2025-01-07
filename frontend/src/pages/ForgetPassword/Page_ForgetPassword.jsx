import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Wrapper from "../../components/Wrapper";
import { fetcher } from "../../utils/fetcher";
import api_collection from "../../api/api_collection";
import cNames from "../../utils/cNames";
import LoadingMessage from "../../components/LoadingMessage";

const cssLoadingMessage = cNames(
  {
    base: "top-16 border-b border-black pb-2 text-lg italic font-semibold",
  },
  {
    isLoading: {
      true: "fixed",
      false: "hidden",
    },

    isCorrect: {
      true: "text-green-700",
      false: "text-red-700",
      null: "text-black",
    },
  }
);

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

  // IS LOADING
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Searcing Data");
  const [isCorrect, setIsCorrect] = useState(null);
  const timeOutID = useRef(null);

  const handleBack = (e) => {
    e.preventDefault();
    setStepCounter((prev) => 0);
    setStep(steps[0]);
  };
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    clearTimeout(timeOutID.current);
    setIsLoading(true);
    fetcher("PUT", null, { email }, api_collection.user.checkEmail)
      .then((res) => {
        setLoadingMessage(res.message);
        setIsCorrect(res.success);
        if (res.success) {
          setStepCounter((prev) => (prev >= 2 ? 2 : prev + 1));
          setStep(steps[stepCounter + 1]);

          if (!lastClick || isEnableOtp) {
            setLastclick(new Date());
            setIsEnableOtp(false);
          }
        }
      })
      .catch((err) => {
        setIsCorrect(false);
        setLoadingMessage("Server Error");
      })
      .finally(() => {
        timeOutID.current = setTimeout(() => {
          setLoadingMessage("Search Data");
          setIsLoading(false);
          setIsCorrect(null);
        }, 4000);
      });
  };
  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    clearTimeout(timeOutID.current);
    setIsLoading(true);
    fetcher("POST", null, { email, otp }, api_collection.user.checkOtp)
      .then((res) => {
        setLoadingMessage(res.message);
        setIsCorrect(res.success);
        if (res.success) {
          setStepCounter((prev) => (prev >= 2 ? 2 : prev + 1));
          setStep(steps[stepCounter + 1]);
        }
      })
      .catch((err) => {
        setIsCorrect(false);
        setLoadingMessage("Server Error");
      })
      .finally(() => {
        timeOutID.current = setTimeout(() => {
          setLoadingMessage("Search Data");
          setIsLoading(false);
          setIsCorrect(null);
        }, 4000);
      });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    clearTimeout(timeOutID.current);
    setIsLoading(true);
    fetcher("PUT", null, { email }, api_collection.user.checkEmail)
      .then((res) => {
        setLoadingMessage(res.message);
        setIsCorrect(res.success);
        if (res.success) {
          setIsEnableOtp(false);
          setLastclick(new Date());
        }
      })
      .catch((err) => {
        setIsCorrect(false);
        setLoadingMessage("Server Error");
      })
      .finally(() => {
        timeOutID.current = setTimeout(() => {
          setLoadingMessage("Search Data");
          setIsLoading(false);
          setIsCorrect(null);
        }, 4000);
      });
  };
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    clearTimeout(timeOutID.current);
    setIsLoading(true);
    fetcher(
      "PUT",
      null,
      { email, password: new_password, confirm_password },
      api_collection.user.checkPassword
    )
      .then((res) => {
        setLoadingMessage(res.message);
        setIsCorrect(res.success);
        if (res.success) {
          fetcher("DELETE", null, { email }, api_collection.user.removeOtp)
            .then((resOfDeleteOtp) => {
              if (resOfDeleteOtp.success) {
                navigate("/login", { replace: true });
              } else {
                setLoadingMessage(resOfDeleteOtp.message);
                setIsCorrect(resOfDeleteOtp.success);
              }
            })
            .catch((err) => {
              setIsCorrect(false);
              setLoadingMessage("Server Error");
            });
        }
      })
      .catch((err) => {
        setIsCorrect(false);
        setLoadingMessage("Server Error");
      })
      .finally(() => {
        timeOutID.current = setTimeout(() => {
          setLoadingMessage("Search Data");
          setIsLoading(false);
          setIsCorrect(null);
        }, 4000);
      });
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
          fetcher("DELETE", null, { email }, api_collection.user.removeOtp)
            .then((res) => {
              if (!res.success) {
                setLoadingMessage(res.message);
                setIsCorrect(res.success);
              }
            })
            .catch((err) => {
              setIsCorrect(false);
              setLoadingMessage("Server Error");
            })
            .finally(() => {
              timeOutID.current = setTimeout(() => {
                setLoadingMessage("Search Data");
                setIsLoading(false);
                setIsCorrect(null);
              }, 4000);
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
      <LoadingMessage isCorrect={isCorrect} isLoading={isLoading}>
        {loadingMessage}
      </LoadingMessage>
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
              <div className="col-span-2 text-sm flex flex-col items-center justify-center gap-2 text-gray-300">
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
