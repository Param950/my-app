import { Card } from "react-bootstrap";

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <h4>{text}</h4>

          {subtext && (
            <p className="text-muted mb-0">
              {subtext}
            </p>
          )}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}