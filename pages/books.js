/*********************************************************************************
* WEB422 – Assignment 1
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Param A. Bhatt, Sahil H. Patel
* Student ID: 168362234
* Date: 7 February 2026
*
********************************************************************************/

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Table, Pagination } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Books() {

  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const router = useRouter();

  // Build query string from search parameters
  const queryString = new URLSearchParams(router.query).toString();

  // Fetch books using SWR
  const { data, error, isLoading } = useSWR(
    queryString
      ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`
      : null
  );

  useEffect(() => {
    if (data?.docs) {
      setPageData(data.docs);
    }
  }, [data]);

  // Pagination functions
  function previous() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function next() {
    if (data && data.docs && data.docs.length > 0) {
      setPage(page + 1);
    }
  }

  if (error) return <p>Error loading books</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <PageHeader
        text="Search Results"
        subtext={
          Object.keys(router.query)
            .map((key) => `${key}: ${router.query[key]}`)
            .join(", ")
        }
      />

      <Table striped hover className="table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>First Published</th>
          </tr>
        </thead>

        <tbody>
          {pageData.map((book) => {

            const workID = book.key.split('/').pop();

            return (
              <tr
                key={book.key}
                onClick={() => router.push(`/works/${workID}`)}
                style={{ cursor: 'pointer' }}
              >
                <td>{book.title}</td>
                <td>{book.first_publish_year ?? "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          onClick={previous}
          disabled={page === 1}
        />

        <Pagination.Item active>
          {page}
        </Pagination.Item>

        <Pagination.Next
          onClick={next}
          disabled={!data || !data.docs || data.docs.length === 0}
        />
      </Pagination>
    </>
  );
}