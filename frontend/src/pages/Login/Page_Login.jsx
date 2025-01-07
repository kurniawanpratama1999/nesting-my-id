import React, { useEffect, useState } from "react";
import Box from "../../components/Box";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AskingUser from "./AskingUser";
import api_collection from "../../api/api_collection";
import { useRef } from "react";
import { useNavigate } from "react-router";
import hit_api from "../../utils/fetcher";
import AskingForgetPassword from "./AskingForgetPassword";
import LoadingMessage from "../../components/LoadingMessage";
import Container from "../../components/Container";

export default function Page_Login() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Searching Data");

  const [isCorrect, setIsCorrect] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [wrongPassword, setWrongPassword] = useState(0);

  const setTimeoutID = useRef(null);

  const fetcher = async () => {
    const net = api_collection.auth.login;
    const body = JSON.stringify({ username, password });

    const fetching = await fetch(net, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body,
    });

    return await fetching.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(setTimeoutID.current);
    setIsLoading(true);
    fetcher()
      .then((res) => {
        const { success, message } = res;
        setLoadingMessage(message);
        if (success) {
          setIsCorrect(true);
          setTimeout(() => {
            navigate("/collection", { replace: "true" });
          }, 1000);
        } else {
          if (message.toLowerCase() === "wrong password!") {
            setWrongPassword((prev) => prev + 1);
          }
          setIsCorrect(false);
        }
      })
      .catch((error) => {
        setIsCorrect(false);
        setLoadingMessage("Server Error!");
      })
      .finally(() => {
        setTimeoutID.current = setTimeout(() => {
          setIsLoading(false);
          setIsCorrect(null);
          setLoadingMessage("Searching Data");
        }, 4000);
      });
  };

  useEffect(() => {
    const net = api_collection.auth.logout;
    hit_api(net, "DELETE")
      .then(() => {
        setTimeout(() => navigate("/login"), 500);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="relative items-center justify-center">
      <LoadingMessage isLoading={isLoading} isCorrect={isCorrect}>
        {loadingMessage}
      </LoadingMessage>
      <Form onSubmit={handleSubmit} className="px-2 pt-2">
        <Input
          htmlFor="username"
          title="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <Input
          htmlFor="password"
          title="password"
          isPassword={true}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button
          onClick={handleSubmit}
          type="submit"
          label="LOGIN"
          className="text-sm"
          bgColor="emerald"
        />

        {wrongPassword >= 3 && <AskingForgetPassword />}

        <AskingUser />
      </Form>
    </Container>
  );
}
