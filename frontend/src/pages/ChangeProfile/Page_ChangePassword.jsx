import api_collection from "../../api/api_collection";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Form from "../../components/Form";
import Input from "../../components/Input";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import hit_api from "../../utils/fetcher";
import LoadingMessage from "../../components/LoadingMessage";

export default function Page_ChangePassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Searching Data");
  const [isCorrect, setIsCorrect] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const net = api_collection.user.changePassword;
    const body = {
      email,
      newPassword,
    };

    setIsLoading(true);

    hit_api(net, "PUT", body)
      .then((res) => {
        setLoadingMessage(res.message);
        setIsCorrect(res.success);
        if (res.success) {
          setTimeout(() => {
            hit_api(api_collection.auth.logout, "DELETE").then((logout) => {
              setLoadingMessage(logout.message);
              setIsCorrect(logout.success);
              if (logout.success) {
                navigate("/login", { replace: true });
              }
            });
          }, 2000);
        }
      })
      .catch((err) => setLoadingMessage(err))
      .finally(() => setTimeout(() => setIsLoading(false), 2000));
  };
  return (
    <Container className="items-center justify-center">
      <LoadingMessage isCorrect={isCorrect} isLoading={isLoading}>
        {loadingMessage}
      </LoadingMessage>
      <Form onSubmit={handleSubmit} title="Change Password">
        <Input
          title="Email"
          htmlFor="email"
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <Input
          title="New Password"
          isPassword={true}
          htmlFor="New-password"
          value={newPassword}
          onChange={({ target }) => setNewPassword(target.value)}
        />
        <Button
          type="submit"
          label="Save Change"
          bgColor={isLoading ? "gray" : "emerald"}
          onClick={handleSubmit}
          disabled={isLoading}
        />
      </Form>
    </Container>
  );
}
