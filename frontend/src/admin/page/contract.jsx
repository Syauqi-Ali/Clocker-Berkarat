import React, { useEffect, useState, useRef } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import Modal from 'react-bootstrap/Modal';
import API from '../../components/apiAxios';
import './contract.css';

DataTable.use(DT);

const Contract = () => {
    const [contracts, setContracts] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');

    const columns = [
        { data: 'DT_RowIndex' },
        { data: 'user' },
        { data: 'project.name' },
        { data: null },
        { data: 'status' },
        { data: null },
    ];

    const options = {
        layout: {
            topStart: null
        }
    };

    useEffect(() => {
        fetchData();
    }, [statusFilter]);

    const fetchData = async () => {
        try {
            const { data } = await API.get('/admin/contract', { params: { status: statusFilter } });
            setContracts(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className="page-heading">
                <h3>Contract</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio.</p>
            </div>
            <div className="page-content">
                <section className="section">
                    <div className="card">
                        <div className="card-header" style={{ paddingBottom: "unset" }}>
                            <select className="form-select" style={{ width: "130px" }} value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="" disabled selected>Status</option>
                                <option value="">All</option>
                                <option value="progress">Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <DataTable data={contracts} columns={columns} options={options} className='table text-nowrap' slots={{
                                    1: (data) => `${data.first_name} ${data.last_name}`,
                                    3: (data, row) => {
                                        const formatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });
                                        const [start_date, end_date] = [formatter.format(new Date(row.start_date)), formatter.format(new Date(row.end_date))];
                                        return `${start_date} - ${end_date}`;
                                    },
                                    4: (data, row) => <span className={`badge bg-light-${data == 'completed' ? 'success' : 'warning'} text-${data == 'completed' ? 'success' : 'warning'} p-2 text-capitalize`}>{data}</span>,
                                    5: (data, row) => (
                                        <button className="btn text-primary" title="detail contract" onClick={() => { setCurrentRow(row); setShowDetailModal(true) }}>
                                            <i className="bi bi-info-circle-fill"></i>
                                        </button>
                                    )
                                }}>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Project</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
                <Modal.Header closeButton>
                    <img className="modal-title" src="/assets_landing/images/Asset 15.png" alt=""
                        style={{ width: "120px" }} />
                </Modal.Header>
                <Modal.Body>
                    <div className="section">
                        <div className="section-header">Landlord Information</div>
                        <div className="section-content">
                            <div><span>Name:</span> <span className='value'>{currentRow?.user.first_name} {currentRow?.user.last_name}</span></div>
                            <div><span>Project:</span> <span className='value'>{currentRow?.project_name}</span></div>
                            <div><span>
                                Date:</span> <span className='value text-nowrap'>{currentRow && (() => {
                                    const formatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });
                                    const [start_date, end_date] = [
                                        formatter.format(new Date(currentRow?.start_date || "")),
                                        formatter.format(new Date(currentRow?.end_date || "")),
                                    ];
                                    return `${start_date} - ${end_date}`;
                                })()}
                                </span></div>
                            <div><span>Status:</span> <span className={`value text-capitalize text-${currentRow?.status == "progress" ? "warning" : ""}`}>{currentRow?.status}</span></div>
                            <div><span>Amount:</span> <span className={`value text-${currentRow?.status == "progress" ? "danger" : ""}`}>{new Intl.NumberFormat()
                                .format(currentRow?.project.budget)}</span></div>
                            <div><span>Payment Status:</span> <span className={`value text-${currentRow?.payment_status == "pending" ? "warning" : ""}`}>{currentRow?.payment_status}</span></div>
                            <div><span>Approval Status:</span> <span className={"value text-capitalize " + {
                                "pending": "status-pending text-warning",
                                "approved": "status-approved text-success",
                                "rejected": "status-rejected text-danger",
                            }[currentRow?.approval_status]}>{currentRow?.approval_status}</span></div>

                        </div>
                    </div>
                    <div className="section">
                        <div className="section-header">Tenant Information</div>
                        <div className="section-content">
                            <div><span>Name:</span> <span className="defaultValue"></span></div>
                            <div><span>Email:</span> <span className="defaultValue"></span></div>
                            <div><span>Date:</span> <span className="defaultValue"></span></div>
                            <div><span>Number of Occupants:</span> <span className="defaultValue">6</span></div>
                        </div>
                    </div>
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold mb-4">Contract File</h3>
                        <a href="" id="contractFile" className="bg-blue-500 text-white p-2 rounded">Download
                            Contract</a>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Contract;
