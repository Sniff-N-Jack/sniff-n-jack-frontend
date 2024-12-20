'use client'
import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:2210/instructors/all';
const username = 'admin@test.com';
const password = 'admin123';

const fetchAllUsers = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};


const InstructorList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchAllUsers();
                setUsers(data);
            } catch (err) {
                setError(err);
            }
        };

        loadUsers();
    }, []);

    if (error) {
        return <div>Errors: {error.message}</div>;
    }

    if (users.length === 0) {
        return <div>No instructors found</div>;
    }

    return (
        <div className='instructor-list'>
            <h2>Instructor List</h2>
            <table className="instructor-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Specializations</th>
                        <th>Availabilities</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.specializations.map(element => {
                                return element.name;
                            }).join(', ')}</td>
                            <td>{user.phone}</td>
                            <td>{user.availabilities.map(element => {
                                return element.name;
                            }).join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx>{`
                .instructor-list {
                    margin: 20px;
                }
                .instructor-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }
                .instructor-table th, .instructor-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                .instructor-table th {
                    background-color: #f2f2f2;
                }
                .instructor, .error {
                    color: red;
                    font-weight: bold;
                }
                tr:hover {
                    background-color: #f1f1f1;
                }
            `}</style>
        </div>
    );
};

export default InstructorList;
