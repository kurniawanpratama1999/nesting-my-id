import { useEffect, useState } from "react";
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

  const handleBack = () => {
    setStepCounter((prev) => (prev <= 0 ? 0 : prev - 1));
    setStep(steps[stepCounter]);
  };
  const handleSubmitEmail = () => {
    setStepCounter((prev) => (prev >= 2 ? 2 : prev + 1));
    setStep(steps[stepCounter]);
  };
  const handleSubmitOtp = () => {
    setStepCounter((prev) => (prev >= 2 ? 2 : prev + 1));
    setStep(steps[stepCounter]);
  };
  const handleSubmitPassword = () => {
    setStepCounter((prev) => (prev >= 2 ? 2 : prev + 1));
    setStep(steps[stepCounter]);
  };

  useEffect(() => {
    console.log(step)
  }, [step]);

  useEffect(() => {
    console.log(stepCounter)
  }, [stepCounter]);

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
          <Input
            htmlFor="otp"
            title="otp"
            value={otp}
            onChange={({ target }) => setOtp(target.value)}
          />
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

        <Wrapper className="gap-4" border="none">
          <Button
            onClick={handleBack}
            type="button"
            label="Back"
            className="text-sm"
            bgColor="red"
          />
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
