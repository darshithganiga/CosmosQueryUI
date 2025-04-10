import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store";
import axios from "axios";

import {
  setContainer,
  setTable,
  setMessage,
  setLoading,
} from "../State/Slices/ContainerSlice";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
  Card,
} from "react-bootstrap";

const containerTableMap: Record<string, string[]> = {
  Exchange: ["File", "CompanySettings", "UserSettings"],
  Organizer: ["BatchInfo", "Client", "ProcessInfo", "UploadedDocument"],
  Sherlock: ["CompanySettings"],
  Suite: ["UserSettings", "Users"],
};

const CosmosQueryUI: React.FC = () => {
  const dispatch = useDispatch();
  const { container, table, message, loading } = useSelector(
    (state: RootState) => state.selector
  );

  const handleFetch = async () => {
    dispatch(setLoading(true));
    dispatch(setMessage(""));

    try {
      const response = await axios.post("/api/CosmosToSql/transfer", {
        containerName: container,
        tableName: table,
      });

      dispatch(setMessage("✅ Data transfer successful"));
    } catch (error: any) {
      dispatch(
        setMessage(
          `❌ Transfer failed: ${error.response?.data || error.message}`
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card style={{ width: "100%", maxWidth: "600px" }} className="shadow">
        <Card.Body>
          <Card.Title className="mb-4 text-center">
            <h4>Cosmos DB Data Transfer</h4>
          </Card.Title>

          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Container</Form.Label>
                  <Form.Select
                    value={container}
                    onChange={(e) => dispatch(setContainer(e.target.value))}
                  >
                    <option value="">Select Container</option>
                    {Object.keys(containerTableMap).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Table</Form.Label>
                  <Form.Select
                    value={table}
                    onChange={(e) => dispatch(setTable(e.target.value))}
                    disabled={!container}
                  >
                    <option value="">Select Table</option>
                    {container &&
                      containerTableMap[container].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid">
              <Button
                variant="primary"
                size="lg"
                onClick={handleFetch}
                disabled={!container || !table || loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Fetching...
                  </>
                ) : (
                  "Fetch Data"
                )}
              </Button>
            </div>

            {message && (
              <Alert variant="success" className="mt-4 text-center">
                {message}
              </Alert>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CosmosQueryUI;
