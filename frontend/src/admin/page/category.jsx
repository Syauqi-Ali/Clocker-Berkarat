import React, { useRef, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import API from '../../components/apiAxios';

DataTable.use(DT);

const apiPath = '/admin/category';
const Category = () => {
    const tableRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);

    const columns = [
        { data: 'DT_RowIndex' },
        { data: 'name' },
        { data: null },
    ];

    const options = {
        layout: {
            topStart: null
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await API.get(apiPath);
            setCategories(data.data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    }

    const handleAddData = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            await API.post(apiPath, formData);
            setShowAddModal(false);
            fetchData();
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    const handleEditData = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("_method", "PUT")

        try {
            await API.post(`${apiPath}/${currentRow.id}`, formData);
            setShowEditModal(false);
            fetchData();
        } catch (error) {
            console.error('Error editing data:', error);
        }
    };

    const handleDeleteData = async (event) => {
        event.preventDefault();
        try {
            await API.delete(`${apiPath}/${currentRow.id}`);
            setShowDeleteModal(false);
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const CategoryModal = ({ show, onHide, title, onSubmit, children }) => (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <form onSubmit={onSubmit}>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={onHide}>{title.includes('Delete') ? 'Cancel' : 'Close'}</button>
                    <button type="submit" className="btn btn-danger">{title.includes('Delete') ? 'Delete' : 'Save'}</button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    return (
        <div className="page-heading">
            <h3>Category</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="page-content">
                <section className="section">
                    <div className="card">
                        <div className="card-header">
                            <button type="button" className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                                Add Category
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <DataTable data={categories} columns={columns} options={options} className="table" slots={{
                                    2: (data, row) => (
                                        <div>
                                            <button className="bg-transparent border-none btn text-warning edit-btn" onClick={() => { setCurrentRow(row); setShowEditModal(true) }}>
                                                <i className="bi bi-pen-fill"></i>
                                            </button>
                                            <button className="btn text-danger delete-btn" onClick={() => { setCurrentRow(row); setShowDeleteModal(true) }}>
                                                <i className="bi bi-trash3-fill"></i>
                                            </button>
                                        </div>
                                    )
                                }}>
                                    <thead>
                                        <tr>
                                            <th width="15%">NO</th>
                                            <th>CATEGORY</th>
                                            <th width="25%">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <CategoryModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                title="Add Category"
                onSubmit={handleAddData}
            >
                <div className="form-group">
                    <label htmlFor="addName">Category Name</label>
                    <input type="text" className="form-control" id="addName" name="name" />
                </div>
            </CategoryModal>

            <CategoryModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                title="Edit Data"
                onSubmit={handleEditData}
            >
                <div className="form-group">
                    <label htmlFor="editName">Category Name</label>
                    <input type="text" className="form-control" id="editName" name="name" defaultValue={currentRow?.name} />
                </div>
            </CategoryModal>

            <CategoryModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                title="Delete Data"
                onSubmit={handleDeleteData}
            >
                Are you sure you want to delete this data?
            </CategoryModal>
        </div>
    );
};

export default Category;