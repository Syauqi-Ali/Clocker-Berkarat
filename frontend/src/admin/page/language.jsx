import React, { useState, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import Modal from 'react-bootstrap/Modal';
import API from '../../components/apiAxios';

DataTable.use(DT);

const Language = () => {
    const [languages, setLanguages] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);

    const columns = [
        { data: 'DT_RowIndex' },
        { data: 'name' },
        { data: 'locale' },
        { data: null },
    ];

    const options = {
        layout: {
            topStart: null
        }
    };

    useEffect(() => {
        fetchLanguage();
    }, []);

    const fetchLanguage = async () => {
        try {
            const response = await API.get('/admin/language');
            setLanguages(response.data.data);
        } catch (error) {
            console.error('Error fetching language', error);
        }
    };

    const handleAddLanguage = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            await API.post(`/admin/language`, formData);
            setShowAddModal(false);
            fetchLanguage();
        } catch (error) {
            console.error('Error adding data', error);
        }
    };

    return (
        <div className="page-content">
            <div className="page-heading">
                <h3>Language</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio.</p>
            </div>
            <section className="section">
                <div className="card">
                    <div className="card-header">
                        <button type="button" className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                            Add Data
                        </button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <DataTable data={languages} columns={columns} options={options} className='table text-nowrap' slots={{
                                3: (data, row) => (
                                    <>
                                        <button type="button" className="btn text-warning edit" onClick={() => { setCurrentRow(row); }}><i className="bi bi-pen-fill"></i></button>
                                        <button type="button" className="btn text-danger delete" onClick={() => { setCurrentRow(row); }}><i className="bi bi-trash3-fill"></i></button>
                                    </>
                                )
                            }}>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>NAME</th>
                                        <th>LOCALE</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </section>

            {/* Add Language Modal */}
            <Modal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Language</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleAddLanguage}>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor='name-create'>Name</label>
                            <input id="name-create" type="text" placeholder="Add Name" className="form-control"
                                name="name" />
                        </div>
                        <div className="form-group">
                            <label>Locale</label>
                            <input id="locale-create" type="text" placeholder="Add Locale" className="form-control"
                                name="locale" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                dialogClassName="modal-dialog-scrollable"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Data cannot be recovered if deleted</p>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary">
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Language;
