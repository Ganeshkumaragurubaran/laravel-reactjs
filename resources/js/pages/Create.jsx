import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col
} from "react-bootstrap";
import AuthUser from "../components/AuthUser";

function CreateStudent() {
    const { http } = AuthUser();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        user_image: null,
        phone: "",
        address: "",
        about: "",
    };
    const [values, setValues] = useState(initialValues);
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setValues({
            ...values,
            [name]: name === 'user_image' ? files[0] : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);


        try {
            if (form.checkValidity()) {
                const formData = new FormData();
                for (const key in values) {
                    formData.append(key, values[key]);
                }
                const response = await http.post('/students/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data); // Handle the response from the server
                Swal.fire({
                    title: "Good job!",
                    text: "Student Created Successfully!",
                    icon: "success"
                });
                setValues(initialValues);
                setValidated(false);
                navigate('/students');

            }
        }
        catch (error) {
            console.error('Error submitting data:', error);
        }

        console.log("Form submitted with values:", values);

    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8" className="mx-auto mt-3">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Create Student</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>First Name</label>
                                                <Form.Control
                                                    name="firstname"
                                                    value={values.firstname}
                                                    onChange={handleInputChange}
                                                    placeholder="First Name"
                                                    type="text"
                                                    required
                                                    isInvalid={validated && !values.firstname}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid first name.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Last Name</label>
                                                <Form.Control
                                                    name="lastname"
                                                    value={values.lastname}
                                                    onChange={handleInputChange}
                                                    placeholder="Last Name"
                                                    type="text"
                                                    required
                                                    isInvalid={validated && !values.lastname}

                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid last name.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Email</label>
                                                <Form.Control
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleInputChange}
                                                    placeholder="email"
                                                    type="email"
                                                    required
                                                    isInvalid={validated && !values.email}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid email address.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Address</label>
                                                <Form.Control
                                                    name="address"
                                                    value={values.address}
                                                    onChange={handleInputChange}
                                                    placeholder="Home Address"
                                                    type="text"
                                                    required
                                                    isInvalid={validated && !values.address}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid address.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Phone</label>
                                                <Form.Control
                                                    name="phone"
                                                    value={values.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="Phone"
                                                    type="text"
                                                    required
                                                    pattern="[0-9]{10}" 
                                                    isInvalid={validated && !values.phone}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid phone number.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Image</label>
                                                <Form.Control
                                                    type="file"
                                                    name="user_image"
                                                    onChange={handleInputChange}
                                                    required
                                                    isInvalid={validated && !values.user_image}
                                                ></Form.Control>
                                                            <Form.Control.Feedback type="invalid">
                                                    Please select a valid image.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>About Me</label>
                                                <Form.Control
                                                    name="about"
                                                    cols="80"
                                                    value={values.about}
                                                    onChange={handleInputChange}
                                                    placeholder="Here can be your about"
                                                    rows="4"
                                                    as="textarea"
                                                    required
                                                    isInvalid={validated && !values.about}
                                                ></Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid about message.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="info"
                                    >
                                        Create
                                    </Button>
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
}

export default CreateStudent;