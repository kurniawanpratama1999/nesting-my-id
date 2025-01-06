import Box from "../../components/Box";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Comp_Card from "./Comp_Card";

function Page_Home() {
  return (
    <Container
      display="grid"
      className="content-center justify-items-center gap-10"
    >
      
      <h1 className="text-4xl font-semibold font-mono">Nesting My ID</h1>
      <Box className="flex-wrap justify-center gap-10">
        <Comp_Card
          bgColor="emerald"
          title="Satu Link"
          description="Kumpulkan Url dalam 1 Link"
        />
        <Comp_Card
          bgColor="yellow"
          title="Gratis"
          description="Nikmati layanan secara gratis"
        />
        <Comp_Card
          bgColor="blue"
          title="Atur dan Bagikan"
          description="Buat, Edit, Hapus dan Bagikan link yang kamu miliki"
        />
      </Box>
      <p className="text-xl px-[20%] text-center text-gray-500">
        Mengelola tautan kini menjadi lebih mudah, kumpulkan semuanya kedalam
        satu link dan nikmati kemudahan dalam mengaturnya.
      </p>
      <Button
        width="fit"
        type="button"
        className="px-10"
        label="Regiter Now !"
        bgColor="amber"
      />
    </Container>
  );
}

export default Page_Home;
