import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import './transaction.css';

const Transactions = () => {
    const [statusFilter, setStatusFilter] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handlePrint = () => {
        const modalElement = document.getElementsByClassName('modal')[0];
        modalElement.id = "modalTransactions";

        if (modalElement) {
            window.print();
        } else {
            console.error("Modal content not found for printing");
        }
    };

    return (
        <>
            <div className="page-heading">
                <h3>Transaction</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
            <div className="page-content">
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-md-3">
                                    <select
                                        id="roleFilter"
                                        className="form-select"
                                        style={{ width: "130px" }}
                                        value={statusFilter}
                                        onChange={handleStatusChange}
                                    >
                                        <option value="" disabled>
                                            Status
                                        </option>
                                        <option value="pending">Pending</option>
                                        <option value="processed">Processed</option>
                                        <option value="complete">Complete</option>
                                        <option value="failed">Failed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table" id="table1">
                                    <thead>
                                        <tr>
                                            <th>NO</th>
                                            <th>PROJECT</th>
                                            <th>INFLUENCER</th>
                                            <th>COMPANY</th>
                                            <th>AMOUNT</th>
                                            <th>DATE</th>
                                            <th>STATUS</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-bold-500">1</td>
                                            <td className="text-bold-500">e-commerce</td>
                                            <td className="text-bold-500">user</td>
                                            <td className="text-bold-500">company</td>
                                            <td className="text-bold-500" style={{ color: "red" }}>
                                                Rp1.000.000
                                            </td>
                                            <td className="text-bold-500">7 November 2024</td>
                                            <td className="text-bold-500">
                                                <span className="text-danger badge bg-light-danger">
                                                    Failed
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn text-primary"
                                                    title="detail transaction"
                                                    onClick={handleShowModal}
                                                >
                                                    <i className="bi bi-info-circle-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Modal Detail */}
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                scrollable={true}
                size="lg"
                aria-labelledby="modal-title"
            >
                <Modal.Header
                    closeButton
                    style={{
                        background: "linear-gradient(90deg, #21BEE8, #00AAFF)",
                        color: "#ffffff",
                    }}
                >
                    <Modal.Title id="modal-title">Detail Transactions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        className="transaction-logo"
                        src="/assets_landing/images/Asset 15.png"
                        alt="Logo"
                    />
                    <div className="mb-4">
                        <h5 className="text-primary border-bottom pb-2 mb-3">
                            Transaction Information
                        </h5>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <strong>Transaction ID:</strong>
                                <p className="text-muted">1234567890</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <strong>Project:</strong>
                                <p className="text-muted">E-commerce Campaign</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <strong>Influencer:</strong>
                                <p className="text-muted">John Doe</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <strong>Company:</strong>
                                <p className="text-muted">Acme Inc.</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <strong>Date:</strong>
                                <p className="text-muted">7 November 2024</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <strong>Amount:</strong>
                                <p className="text-body fw-bold">Rp1.000.000</p>
                            </div>
                            <div className="col-md-12 mb-2">
                                <strong>Status:</strong>
                                <span className="text-danger badge bg-light-danger">Failed</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h5 className="text-primary border-bottom pb-2 mb-3 payment-information-header">Payment Information</h5>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <strong>Payment Method:</strong>
                                <p className="text-muted">Credit Card</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <strong>Card Number:</strong>
                                <p className="text-muted">**** **** **** 1234</p>
                            </div>
                            <div className="col-md-12 mb-2">
                                <strong>Payment Gateway:</strong>
                                <p className="text-muted">Midtrans</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h5 className="text-primary border-bottom pb-2 mb-3 project-information-header">Project Information</h5>
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <strong>Description:</strong>
                                <p className="text-muted">This is an e-commerce marketing campaign focusing on increasing sales
                                    and brand awareness using influencer marketing.</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <strong>Duration:</strong>
                                <p className="text-muted">1st Nov 2024 - 15th Nov 2024</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <strong>Target Audience:</strong>
                                <p className="text-muted">Age 18-25, Southeast Asia</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h5 className="text-primary border-bottom pb-2 mb-3">Influencer Information</h5>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <strong>Name:</strong>
                                <p className="text-muted">John Doe</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <strong>Followers:</strong>
                                <p className="text-muted">150,000</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <strong>Engagement Rate:</strong>
                                <p className="text-muted">7.8%</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <strong>Social Media Platform:</strong>
                                <p className="text-muted">Instagram</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h5 className="text-primary border-bottom pb-2 mb-3">Additional Notes</h5>
                        <p className="text-muted">Note any additional information about the transaction or specific comments
                            from the influencer or the company involved.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <button type="button" className="btn btn-primary ms-1" id="printButton" onClick={handlePrint}>
                        Print
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Transactions;
