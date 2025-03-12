import React, { useState, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await axios.get('/api/admin/banner');
            setBanners(response.data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    const handleAddBanner = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            await axios.post('/api/admin/banner', formData);
            setShowAddModal(false);
            fetchBanners();
        } catch (error) {
            console.error('Error adding banner:', error);
        }
    };

    const handleEditBanner = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("_method", "PUT")

        try {
            await axios.post(`/api/admin/banner/${currentBanner.id}`, formData);
            setShowEditModal(false);
            fetchBanners();
        } catch (error) {
            console.error('Error editing banner:', error);
        }
    };

    const handleDeleteBanner = async () => {
        try {
            await axios.delete(`/api/admin/banner/${currentBanner.id}`);
            setShowDeleteModal(false);
            fetchBanners();
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    const filteredBanners = banners.filter(banner =>
        banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            name: 'NO',
            selector: (_, index) => index + 1,
            sortable: false,
            width: '10%',
        },
        {
            name: 'IMAGE',
            cell: row => <img src={`/storage/${row.picture}`} alt={row.title} className="rounded-3" height="96px" />,
            sortable: false,
            width: '20%',
        },
        {
            name: 'TITLE',
            selector: row => row.title,
            sortable: true,
            width: '24%',
        },
        {
            name: 'SUBTITLE',
            selector: row => row.subtitle,
            sortable: true,
            width: '23%',
        },
        {
            name: 'ACTION',
            cell: row => (
                <div>
                    <button
                        type="button"
                        className="btn text-warning"
                        onClick={() => { setCurrentBanner(row); setShowEditModal(true); }}
                    >
                        <i className="bi bi-pen-fill"></i>
                    </button>
                    <button
                        type="button"
                        className="btn text-danger"
                        onClick={() => { setCurrentBanner(row); setShowDeleteModal(true); }}
                    >
                        <i className="bi bi-trash3-fill"></i>
                    </button>
                </div>
            ),
            sortable: false,
        },
    ];

    createTheme('custom-dark', {
        text: {
            primary: '#c2c2d9',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(0,0,0,.12)',
        },
        background: {
            default: 'transparent',
        },
    });

    const paginationComponentOptions = {
        noRowsPerPage: true,
        selectAllRowsItem: false,
    };

    return (
        <div className="page-content">
            <div className="page-heading">
                <h3>Banner</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => setShowAddModal(true)} className="mb-3">Add Data</Button>
                    <DataTable
                        columns={columns}
                        data={filteredBanners}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                    />
                </div>
            </div>

            {/* Add Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Banner</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleAddBanner}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="picture" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" placeholder="Add Title" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Subtitle</Form.Label>
                            <Form.Control type="text" name="subtitle" placeholder="Add Subtitle" required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Banner</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditBanner}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="picture" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Add Title"
                                defaultValue={currentBanner?.title}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Subtitle</Form.Label>
                            <Form.Control
                                type="text"
                                name="subtitle"
                                placeholder="Add Subtitle"
                                defaultValue={currentBanner?.subtitle}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Data cannot be recovered if deleted. Are you sure?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteBanner}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Banner;
