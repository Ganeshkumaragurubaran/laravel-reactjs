import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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
    Col,
    Placeholder
} from "react-bootstrap";
import AuthUser from "../components/AuthUser";

function EditStudent() {
    const { http } = AuthUser();
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        user_image: null,
        phone: '',
        address: '',
        about: '',
    });

    const { id } = useParams(); // Access the `id` parameter from the URL
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await http.get(`/students/edit/${id}`);
                setStudent(response.data.student);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        fetchStudentDetails();
    }, [id]); // Re-run the effect when the `id` parameter changes

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            for (const key in student) {
                formData.append(key, student[key]);
            }
            console.log([...formData.entries()]);

            const response = await http.post(`/students/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data); // Handle the response from the server
            Swal.fire({
                title: "Good job!",
                text: "Student Updated Successfully!",
                icon: "success"
            });
            navigate('/students');
        } catch (error) {
            console.error('Error updating student details:', error);
        }
    };
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8" className="mx-auto mt-3">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Edit Student</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {loading ? (
                                    // Show Placeholder while data is still loading
                                    <Placeholder as="div" animation="glow">
                                        <Placeholder xs={12} />
                                    </Placeholder>
                                ) : (
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>First Name</label>
                                                    <Form.Control
                                                        name="firstname"
                                                        value={student.firstname}
                                                        onChange={handleInputChange}
                                                        placeholder="First Name"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <Form.Group>
                                                    <label>Last Name</label>
                                                    <Form.Control
                                                        name="lastname"
                                                        value={student.lastname}
                                                        onChange={handleInputChange}
                                                        placeholder="Last Name"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>Email</label>
                                                    <Form.Control
                                                        name="email"
                                                        value={student.email}
                                                        onChange={handleInputChange}
                                                        placeholder="email"
                                                        type="email"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <Form.Group>
                                                    <label>Address</label>
                                                    <Form.Control
                                                        name="address"
                                                        value={student.address}
                                                        onChange={handleInputChange}
                                                        placeholder="Home Address"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>Phone</label>
                                                    <Form.Control
                                                        name="phone"
                                                        value={student.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="Phone"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>Image</label>
                                                    <Form.Control
                                                        type="file"
                                                        name="user_image"
                                                        onChange={handleInputChange}

                                                    ></Form.Control>
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
                                                        value={student.about}
                                                        onChange={handleInputChange}
                                                        placeholder="Here can be your description"
                                                        rows="4"
                                                        as="textarea"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button
                                            className="btn-fill pull-right"
                                            type="submit"
                                            variant="info"
                                        >
                                            Update Profile
                                        </Button>
                                        <div className="clearfix"></div>
                                    </Form>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="card-user">
                            <div className="card-image">
                            </div>
                            <Card.Body>
                                {loading ? (
                                    // Show Placeholder while data is still loading
                                    <Placeholder as="div" animation="glow">
                                        <Placeholder xs={12} />
                                    </Placeholder>
                                ) : (
                                    <div>
                                        <div className="author">
                                            {student.user_image && (
                                                <img
                                                    src={`http://127.0.0.1:8000/uploads/students/${student.user_image}`}
                                                    alt="Student Avatar"
                                                    style={{ width: '200px', height: '200px', marginBottom: '10px' }}
                                                />
                                            )}
                                            <h5 className="title">{student.firstname} {student.lastname}</h5>

                                            <p className="description">{student.email}</p>
                                        </div>
                                        <p className="description text-center">
                                            {student.phone}
                                        </p>
                                    </div>
                                )}
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default EditStudent;