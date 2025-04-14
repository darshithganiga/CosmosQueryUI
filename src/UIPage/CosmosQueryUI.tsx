import React, { useState } from "react";
import { Container, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setQuery,
  setKey,
  setDatabaseId,
  setSqlConnectionString,
} from "../State/Slices/ConnectionSlice";
import { RootState } from "../Store";

const ConnectionPage: React.FC = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { query, key, databaseId, sqlConnectionString } = useSelector(
    (state: RootState) => state.connection
  );

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/CosmosToSql/transfer`,
        {
          query,
          key,
          databaseId,
          sqlConnectionString,
        }
      );

      setSuccess("Data transfer successful!");
    } catch (err: any) {
      setError(`Error: ${err.response?.data || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    fontSize: "1rem",
    padding: "0.75rem",
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card
        style={{ width: "100%", maxWidth: "800px" }}
        className="shadow-lg p-4"
      >
        <Card.Body>
          <Card.Title className="mb-4 text-center text-primary fw-bold fs-4">
            Cosmos DB & SQL Connection
          </Card.Title>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Cosmos DB Key</Form.Label>
              <Form.Control
                type="text"
                style={inputStyle}
                placeholder="Enter Cosmos DB Read-Only Key"
                value={key}
                onChange={(e) => dispatch(setKey(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Database ID</Form.Label>
              <Form.Control
                type="text"
                style={inputStyle}
                placeholder="Enter Cosmos DB Database ID"
                value={databaseId}
                onChange={(e) => dispatch(setDatabaseId(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                MS SQL Connection String
              </Form.Label>
              <Form.Control
                type="text"
                style={inputStyle}
                placeholder="Enter SQL Server Connection String"
                value={sqlConnectionString}
                onChange={(e) =>
                  dispatch(setSqlConnectionString(e.target.value))
                }
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Cosmos Query</Form.Label>
              <Form.Control
                type="text"
                style={inputStyle}
                placeholder='Example: SELECT * FROM c WHERE c.userId = "123"'
                value={query}
                onChange={(e) => dispatch(setQuery(e.target.value))}
              />
            </Form.Group>

            {error && (
              <Alert variant="danger" className="text-center fw-semibold">
                {error}
              </Alert>
            )}

            {success && (
              <Alert variant="success" className="text-center fw-semibold">
                {success}
              </Alert>
            )}

            <div className="d-grid">
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
                size="lg"
                className="fw-semibold"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Transferring...
                  </>
                ) : (
                  "Transfer Data"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ConnectionPage;
