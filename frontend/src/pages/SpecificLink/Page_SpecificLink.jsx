import Container from "../../components/Container";
import Comp_Card from "./Comp_Card";
import { useContext } from "react";
import { UrlContext } from "../../contexts/UrlProvider";

const emptyResults = [];

export default function Page_SpecificLink() {
  const { results, displayName, description } = useContext(UrlContext);
  console.log(useContext(UrlContext))

  return (
    results && (
      <Container className="flex-col gap-5 items-center justify-center lg:px-[20%] px-5 pb-10">
        <h1 className="text-4xl font-semibold text-center text-gray-300">
          Connect with {displayName}
        </h1>
        <p className="text-2xl text-center text-gray-400">{description}</p>
        <div className="grid gap-4 w-full">
          {results
            ? results.map((collection) => (
                <Comp_Card key={collection.id} collections={collection} />
              ))
            : emptyResults.map((collection) => (
                <Comp_Card key={collection.id} collections={collection} />
              ))}
        </div>
      </Container>
    )
  );
}
