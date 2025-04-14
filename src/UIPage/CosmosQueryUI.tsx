import React, { useState } from "react";
import { Container, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setQuery,
  setKey,
  setDatabaseId,
  setContainerName,
  setSqlConnectionString,
  setSqlDatabaseName,
  setSqltableName,
} from "../State/Slices/ConnectionSlice";
import { RootState } from "../Store";

const ConnectionPage: React.FC = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    query,
    key,
    databaseId,
    sqlConnectionString,
    sqltableName,
    containername,
    sqldatabasename,
  } = useSelector((state: RootState) => state.connection);

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
          containername,
          sqlConnectionString,
          sqldatabasename,
          sqltableName,
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

  const isFormValid =
    key.trim() &&
    databaseId.trim() &&
    containername.trim() &&
    sqlConnectionString.trim() &&
    sqldatabasename.trim() &&
    sqltableName.trim() &&
    query.trim();

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card
        style={{ width: "100%", maxWidth: "800px" }}
        className="shadow-lg p-4"
      >
        <Card.Body>
          <Card.Title className="mb-4 text-center text-primary fw-bold fs-4">
            CosmosDB Data transfer Toolkit
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
                Cosmos Container Name
              </Form.Label>
              <Form.Control
                type="text"
                style={inputStyle}
                placeholder="Enter Cosmos DB Container Name"
                value={containername}
                onChange={(e) => dispatch(setContainerName(e.target.value))}
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
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Sql Database Name</Form.Label>
              <Form.Control
                type="text"
                style={inputStyle}
                placeholder="Enter Sql Database name"
                value={sqldatabasename}
                onChange={(e) => dispatch(setSqlDatabaseName(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">SQL table Name</Form.Label>
              <Form.Control
                type="text"
                style={inputStyle}
                placeholder="Enter destination Sql Table"
                value={sqltableName}
                onChange={(e) => dispatch(setSqltableName(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Cosmos Query</Form.Label>
              <Form.Control
                type="text"
                style={inputStyle}
                placeholder='Ex: SELECT * FROM c WHERE c.userId = "123"'
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
                disabled={loading || !isFormValid}
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
