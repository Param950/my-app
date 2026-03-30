/********************************************************************************
*  WEB422 – Assignment 02
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Param A. Bhatt / Sahil H. Patel
*  Student ID: 168362234
*  Date: 15/03/2025
*
*  Published URL: ___________________________
*
********************************************************************************/


import PageHeader from "@/components/PageHeader";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Home() {

  const { register, handleSubmit, formState:{errors} } = useForm();
  const router = useRouter();

  function submitForm(data){
    router.push({
      pathname: "/books",
      query: Object.fromEntries(
        Object.entries(data).filter(([key,value]) => value !== "")
      )
    });
  }

  return (
    <>
      <PageHeader
        text="Search Books"
        subtext="Find books using the OpenLibrary API"
      />

      <Form onSubmit={handleSubmit(submitForm)}>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            {...register("author", {required:true})}
            className={errors.author ? "is-invalid" : ""}
          />
          {errors.author && (
            <div className="text-danger">Author is required</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control {...register("title")} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Control {...register("subject")} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Language</Form.Label>
          <Form.Control {...register("language")} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First Publish Year</Form.Label>
          <Form.Control {...register("first_publish_year")} />
        </Form.Group>

        <Button type="submit">Search</Button>

      </Form>
    </>
  );
}