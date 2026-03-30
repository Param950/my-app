import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";
import BookDetails from "@/components/BookDetails";

export default function Work() {

  const router = useRouter();
  const { workId } = router.query;

  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <>
      <PageHeader text="Book Details" />
      <BookDetails book={data} workId={workId} />
    </>
  );

}