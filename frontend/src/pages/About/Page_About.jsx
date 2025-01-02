import React from "react";
import Container from "../../components/Container";
import Wrapper from "../../components/Wrapper";

const Page_About = () => {
  return (
    <Container className="flex-col gap-10">
      <p>
        Website ini dibuat oleh Kurniawan Pratama dengan tujuan sebagai langkah
        awal dalam memasuki dunia Software Enginner. Saat ini website masih
        tersedia secara gratis dan ada kemungkinan website ini akan dibuat
        secara berbayar di waktu yang akan datang.
      </p>
      <Wrapper
        position="flex"
        border="none"
        className="flex-col gap-3 text-center"
      >
        <p>Lihat sosial media Author</p>
        <a href="https://instagram.com/its.about.tofu">Instagram</a>
        <a href="https://github.com/kurniawanpratama1999">Github</a>
      </Wrapper>
    </Container>
  );
};

export default Page_About;
