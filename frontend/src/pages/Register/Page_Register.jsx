import React from "react";
import Form from "../../components/Form";
import Box from "../../components/Box";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AskingUser from "./AskingUser";
import LoadingMessage from "../../components/LoadingMessage";
import Container from "../../components/Container";

export default function Page_Register() {
  return (
    <Container
      display="flex"
      className="items-start sm:items-center sm:pt-0 justify-center relative"
    >
      <Form className="px-2 pt-2" title="User Registration">
        <LoadingMessage>{'Loading Message'}</LoadingMessage>
        <Box display="grid" className="sm:grid-cols-2 gap-x-6 gap-y-3">
          <Input
            htmlFor="username"
            title="username"
            outlineColor="blue"
            classNameLabel="order-1"
          />
          <Input
            htmlFor="display-name"
            title="display name"
            outlineColor="blue"
            classNameLabel="order-2"
          />
          <Input
            htmlFor="email"
            title="email"
            outlineColor="blue"
            classNameLabel="order-3 sm:col-span-2"
          />
          <Input
            htmlFor="password"
            title="password"
            isPassword={true}
            outlineColor="blue"
            classNameLabel="order-4"
          />
          <Input
            isPassword={true}
            htmlFor="confirm-password"
            title="confirm password"
            outlineColor="blue"
            classNameLabel="order-5"
          />
        </Box>
        <Button label="submit" bgColor="blue" className="uppercase text-sm" />
        <AskingUser />
      </Form>
    </Container>
  );
}
