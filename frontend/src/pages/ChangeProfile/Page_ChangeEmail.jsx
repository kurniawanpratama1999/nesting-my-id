import api_collection from "../../api/api_collection";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Form from "../../components/Form";
import Input from "../../components/Input";
import { useState } from "react";
import { useNavigate } from "react-router";
import hit_api from "../../utils/fetcher";
import LoadingMessage from "../../components/LoadingMessage";

export default function Page_ChangeEmail() {
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Searching Data");
  const [isCorrect, setIsCorrect] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const net = api_collection.user.changeEmail;
    const body = {
      oldEmail,
      newEmail,
    };

    setIsLoading(true);

    hit_api(net, "PUT", body)
      .then((res) => {
        setLoadingMessage(res.message);
        setIsCorrect(res.success);
        if (res.success) {
          setTimeout(() => navigate("/profile"), 2000);
        }
      })
      .catch((err) => setLoadingMessage(err))
      .finally(() => setTimeout(() => setIsLoading(false), 2000));
  };
  return (
    <Container className="items-center justify-center">
      <LoadingMessage isCorrect={isCorrect} isLoading={isLoading}>{loadingMessage}</LoadingMessage>
      <Form onSubmit={handleSubmit} title="Change Name">
        <Input
          title="Old Email"
          htmlFor="old-email"
          value={oldEmail}
          onChange={({ target }) => setOldEmail(target.value)}
        />
        <Input
          title="New Email"
          htmlFor="New-email"
          value={newEmail}
          onChange={({ target }) => setNewEmail(target.value)}
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
