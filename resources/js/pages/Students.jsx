import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton'

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import AuthUser from "../components/AuthUser";

const StudentSkeleton = () => (
    <tr>
        <td><Skeleton/></td>
        <td><Skeleton/></td>
        <td><Skeleton/></td>
        <td><Skeleton/></td>
        <td><Skeleton/></td>
    </tr>
);
function Students() {
    const { http } = AuthUser();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch students data when the component mounts
        const fetchData = async () => {
            try {
                const response = await http.get('/students');
                setStudents(response.data); // Assuming the response contains an array of students
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Send a DELETE request to the server to delete the student
                    await http.delete(`/students/delete/${id}`);

                    // Update the state to reflect the changes
                    setStudents((prevStudents) =>
                        prevStudents.filter((student) => student.id !== id)
                    );

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your data has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error('Error deleting student:', error);
                    Swal.fire({
                        title: "Error!",
                        text: "An error occurred while deleting the student.",
                        icon: "error"
                    });
                }
            }
        });
    };
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12" className="mt-5">
                        <Card className="card-plain table-plain-bg">
                            <Card.Header>
                                <Card.Title as="h6" className="card-category font-weight-bold text-primary">Students Details</Card.Title>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover">
                                    <thead>
                                        <tr>
                                            <th className="border-0">ID</th>
                                            <th className="border-0">First Name</th>
                                            <th className="border-0">Last Name</th>
                                            <th className="border-0">Phone</th>
                                            <th className="border-0">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <StudentSkeleton />
                                        ) : (
                                            // Show actual data once loading is complete
                                            students.map((student) => (
                                                <tr key={student.id}>
                                                    <td>{student.id}</td>
                                                    <td>{student.firstname}</td>
                                                    <td>{student.lastname}</td>
                                                    <td>{student.phone}</td>
                                                    <td>
                                                        <Link to={`/students/edit/${student.id}`} className="btn btn-primary btn-sm "   >Edit</Link>
                                                        <Button variant="danger" className="btn-sm" onClick={() => handleDelete(student.id)}>Delete</Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Students;