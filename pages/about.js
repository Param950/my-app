import PageHeader from "@/components/PageHeader";
import BookDetails from "@/components/BookDetails";

export async function getStaticProps() {

  const response = await fetch(
    "https://openlibrary.org/works/OL453657W.json"
  );

  const data = await response.json();

  return {
    props: {
      book: data,
    },
  };

}

export default function About(props) {

  return (
    <>
      <PageHeader text="About the Developer – Param A. Bhatt and Sahil H. Patel" />

      <p>
        I am a Computer Programming and Analysis student at Seneca College.
        This application demonstrates using Next.js and React Bootstrap
        with a public Books API.
      </p>

      <p>
        The book shown below is one of my favorites from the Discworld
        series.
      </p>

      <BookDetails
        book={props.book}
        workId="OL453657W"
        showFavouriteBtn={false}
      />
    </>
  );

}