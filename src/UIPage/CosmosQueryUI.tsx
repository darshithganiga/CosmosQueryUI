import React, { useEffect, useState } from "react";
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
  setCompanyId,
  setUserId,
  setRecordPrimaryKey,
  setOperation,
} from "../State/Slices/Filterslice";

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

  // Selector state from ContainerSlice
  const { container, table, message, loading } = useSelector(
    (state: RootState) => state.selector
  );

  // Filter state from Filterslice
  const { companyId, userId, recordPrimaryKey, operation } = useSelector(
    (state: RootState) => state.filter
  );

  const [hasFetched, setHasFetched] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "danger">(
    "success"
  );

  const handleFetch = async () => {
    dispatch(setLoading(true));
    dispatch(setMessage(""));

    try {
      const response = await axios.post("/api/CosmosToSql/transfer", {
        containerName: container,
        tableName: table,
        companyId,
        userId,
        recordPrimaryKey,
        operation,
      });

      dispatch(setMessage(" Data transfer successful"));
      setMessageType("success");
      setHasFetched(true);
    } catch (error: any) {
      dispatch(
        setMessage(` Transfer failed: ${error.response?.data || error.message}`)
      );
      setMessageType("danger");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    setHasFetched(false);
  }, [container, table]);

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card
        style={{ width: "100%", maxWidth: "700px" }}
        className="shadow-lg p-4"
      >
        <Card.Body>
          <Card.Title className="mb-4 text-center">
            <h3 className="fw-bold text-primary">Cosmos DB Data Transfer</h3>
          </Card.Title>

          <Form>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Select Container
                  </Form.Label>
                  <Form.Select
                    value={container}
                    onChange={(e) => dispatch(setContainer(e.target.value))}
                    className="shadow-sm"
                  >
                    <option value="">-- Choose Container --</option>
                    {Object.keys(containerTableMap).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Select Table</Form.Label>
                  <Form.Select
                    value={table}
                    onChange={(e) => dispatch(setTable(e.target.value))}
                    disabled={!container}
                    className="shadow-sm"
                  >
                    <option value="">-- Choose Table --</option>
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

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Company ID</Form.Label>
              <Form.Control
                type="text"
                value={companyId}
                onChange={(e) => dispatch(setCompanyId(e.target.value))}
                placeholder="Enter Company ID"
                className="shadow-sm"
                disabled={!table}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">User ID</Form.Label>
              <Form.Control
                type="text"
                value={userId}
                onChange={(e) => dispatch(setUserId(e.target.value))}
                placeholder="Enter User ID"
                className="shadow-sm"
                disabled={!table}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Record Primary Key
              </Form.Label>
              <Form.Control
                type="text"
                value={recordPrimaryKey}
                onChange={(e) => dispatch(setRecordPrimaryKey(e.target.value))}
                placeholder="Enter Record Primary Key"
                className="shadow-sm"
                disabled={!table}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Operation</Form.Label>
              <Form.Control
                type="text"
                value={operation}
                onChange={(e) => dispatch(setOperation(e.target.value))}
                placeholder="Enter Operation Type"
                className="shadow-sm"
                disabled={!table}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleFetch}
                disabled={!container || !table || loading || hasFetched}
                className="fw-semibold"
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
              <Alert
                variant={messageType}
                className="mt-4 text-center fw-semibold"
              >
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
