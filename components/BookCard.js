import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function BookCard({ workId }) {

  const { data, error } = useSWR(
    `https://openlibrary.org/works/${workId}.json`
  );

  // error case
  if (error) {
    return <Error statusCode={404} />;
  }

  // loading state
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <Card>

      <Card.Img
        variant="top"
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        onError={(event) => {
          event.target.onerror = null;
          event.target.src =
            "https://placehold.co/400x600?text=Cover+Not+Available";
        }}
        className="img-fluid w-100"
        alt="Cover Image"
      />

      <Card.Body>

        <Card.Title>
          {data.title || ""}
        </Card.Title>

        <Card.Text>
          {data.first_publish_date || "N/A"}
        </Card.Text>

        <Link href={`/works/${workId}`} passHref legacyBehavior>
          <Button variant="primary">
            View Details
          </Button>
        </Link>

      </Card.Body>

    </Card>
  );
}