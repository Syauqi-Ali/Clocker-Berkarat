import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import API from '../../components/apiAxios';

DataTable.use(DT);

const User = () => {
    const tableRef = useRef(null);
    const [user, setUser] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);
    const [roleFilter, setRoleFilter] = useState('');

    const columns = [
        { data: 'id' },
        { data: 'first_name' },
        { data: 'email' },
        { data: 'role' },
        { data: 'status' },
        { data: 'status_acount_register' },
    ];

    const options = {
        layout: {
            topStart: null
        }
    };

    useEffect(() => {
        fetchUser();
    }, [roleFilter]);

    const fetchUser = async () => {
        try {
            const { data } = await API.get('/user', { params: { role: roleFilter } });
            setUser(data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await API.delete(`/user/${currentUser.id}`);
            setShowDeleteModal(false);
            fetchUser();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleShowDetail = async (userId) => {
        try {
            const { data } = await API.get(`/user/showDetail/${userId}`);
            setCurrentUser(data.data);
            setShowDetailModal(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const DetailModal = () => {
        const [activeTab, setActiveTab] = useState('about');

        const handleTabClick = (tab) => {
            setActiveTab(tab);
        };
        const skillsRenderer = {
            "ui/ux": {
                name: "UI/UX Design",
                class: "bg-light-primary text-primary"
            },
            "Web - Design": {
                name: "Web Design",
                class: "bg-light-danger text-danger"
            },
            "full stack": {
                name: "Full Stack Developer",
                class: "bg-light-success text-success"
            }
        };

        return (
            <>
                <div className="justify-content-between d-flex">
                    <img className="modal-title" src="/assets_landing/images/Asset 15.png" alt="" style={{ width: '120px' }} />
                    <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                </div>

                <div className="header">
                    <div className="logo">
                        {/* Kodecolor */}
                    </div>
                    <div className="search-bar">
                        {/* <input placeholder="Search" type="text"/> */}
                    </div>
                </div>

                <div className="container">
                    <div className="profile-sidebar">
                        <img alt="Profile" height="275" width="250" className="rounded-circle img-fluid" src="https://storage.googleapis.com/a1aa/image/R47AYiWekQ3rAKemSec2JXSoLDSpWeHCnnEEZWvf3dUrELe8E.jpg" />
                        <div className="work">
                            <h3>
                                <span>{`${currentRow.first_name} ${currentRow.last_name}`}</span>
                            </h3>
                            <div className="item">
                                <strong>Spotify New York</strong>
                                <span className="primary">Primary</span>
                                <span>Karangploso, Malang</span>
                            </div>
                        </div>
                        <div className="skills">
                            <h3 className="fw-semibold d-flex align-items-center">Skills</h3>
                            <div className="item">
                                {currentRow.skills == "ui/ux"}
                                <span className={`badge ${skillsRenderer[currentRow.skills].class}`}>{skillsRenderer[currentRow.skills].name}</span>
                            </div>
                            <h3 className="fw-semibold d-flex align-items-center">Role</h3>
                            <div className="item">
                                <span className="badge bg-light-primary text-primary">Freelancer</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-content">
                        <div className="header">
                            <h2>CLOCKER</h2>
                            <span className="bookmark"><i className="fa-solid fa-circle" style={{ color: "#28a745" }}></i> Online</span>
                        </div>
                        <div className="row">
                            <div className="actions">
                                <button className="btn btn-outline-admin">Send message</button>
                                <button className="btn btn-outline-admin">Contacts</button>
                                <button className="btn btn-outline-admin">Report user</button>
                            </div>
                        </div>
                        <div className="tabs-container">
                            <div className="tabs">
                                <div className={`tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => handleTabClick('about')}>About</div>
                                <div className={`tab ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => handleTabClick('timeline')}>Report</div>
                                <div className={`tab ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => handleTabClick('activity')}>Activity</div>
                                <div className={`tab ${activeTab === 'transaction-statistics' ? 'active' : ''}`} onClick={() => handleTabClick('transaction-statistics')}>Transaction Statistics</div>
                                <div className={`tab ${activeTab === 'engagement-statistics' ? 'active' : ''}`} onClick={() => handleTabClick('engagement-statistics')}>Engagement Statistics</div>
                                <div className={`tab ${activeTab === 'account-status' ? 'active' : ''}`} onClick={() => handleTabClick('account-status')}>Account Status</div>
                            </div>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'about' && (
                            <div className=" tab-content active" id="about">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="contact-info">
                                            <h3>Contact Information</h3>
                                            <div className="item">
                                                <i className="fa-solid fa-phone"></i>
                                                <strong>Phone:</strong>
                                                <span id="phone">+123456789</span>
                                            </div>
                                            <div className="item">
                                                <i className="fa-solid fa-location-dot"></i>
                                                <strong>Address:</strong>
                                                <span id="address">123 Main St, City</span>
                                            </div>
                                            <div className="item">
                                                <i className="fa-solid fa-envelope"></i>
                                                <strong>E-mail:</strong>
                                                <span>
                                                    <a href="mailto:example@example.com" id="email">example@example.com</a>
                                                </span>
                                            </div>
                                            <div className="item">
                                                <i className="fa-solid fa-link"></i>
                                                <strong>Site:</strong>
                                                <span>
                                                    <a href="http://www.jeremyrose.com">www.jeremyrose.com</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="basic-info">
                                            <h3>Basic Information</h3>
                                            <div className="item">
                                                <strong>Country:</strong>
                                                <span id="country">USA</span>
                                            </div>
                                            <div className="item">
                                                <strong>Birthday:</strong>
                                                <span id="birthday">January 1, 1990</span>
                                            </div>
                                            <div className="item">
                                                <strong>Gender:</strong>
                                                <span><i class="fas fa-mars"></i> Male</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'timeline' && (
                            <div className="tab-content" id="timeline" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                                {/* Timeline Items */}
                                <div className="timeline-item border-b border-gray-300 py-3 px-4">
                                    <div className="timeline-content ml-10 bg-white shadow-sm rounded-lg p-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <img alt="Profile" height="70" width="60" className="rounded-circle img-fluid" src="https://storage.googleapis.com/a1aa/image/R47AYiWekQ3rAKemSec2JXSoLDSpWeHCnnEEZWvf3dUrELe8E.jpg" />
                                                <h5 className="timeline-title font-semibold text-lg m-0">User  Name</h5>
                                            </div>
                                            <div>
                                                <p className="timeline-description text-gray-600">
                                                    Completed the project task "Design UI" on <strong className="font-medium text-black">November 25, 2024</strong>.
                                                </p>
                                            </div>
                                        </div>
                                        <span className="timeline-time text-sm text-gray-500 block mt-2">2 hours ago</span>
                                    </div>
                                </div>
                                {/* Additional timeline items can be added here */}
                            </div>
                        )}


                        <div className="justify-content-end d-flex">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="page-heading">
            <h3>User</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio.</p>
            <div className="page-content">
                <section className="section">
                    <div className="card">
                        <div className="card-header">
                            <select
                                id="roleFilter"
                                className="form-select"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                <option value="">All Roles</option>
                                <option value="client">Client</option>
                                <option value="freelancer">Freelancer</option>
                            </select>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <DataTable
                                    data={user}
                                    columns={columns}
                                    options={options}
                                    className="table"
                                    slots={{
                                        1: (data, row) => (
                                            <>{`${row.first_name} ${row.last_name}`}</>
                                        ),
                                        4: (data, row) => {
                                            const badgeClass = {
                                                active: "bg-light-success text-success",
                                                banned: "bg-light-danger text-danger",
                                                "--": "bg-light-secondary text-secondary"
                                            };

                                            return (<span className={`badge text-capitalize ${badgeClass[data]} p-2`}>{data == "--" ? "null" : data}</span>);
                                        },
                                        5: (data, row) => {
                                            if (data === "accepted") {
                                                return (
                                                    <>
                                                        <button class="btn text-danger toggle-status" title={`Banned ${row.first_name} ${row.last_name}`}>
                                                            <i class="bi bi-slash-circle-fill" style={{ fontSize: "20px" }}></i>
                                                        </button>
                                                        <button className="btn text-primary" title={`Detail ${row.first_name} ${row.last_name}`} onClick={() => { setCurrentRow(row); setShowDetailModal(true) }} >
                                                            <i className="bi bi-info-circle-fill" style={{ fontSize: "20px" }}></i>
                                                        </button>
                                                    </>
                                                )
                                            } else if (data === "pending") {
                                                return (
                                                    <>
                                                        <button class="btn text-danger reject-account" title={`Reject ${row.first_name} ${row.last_name}`}>
                                                            <i class="bi bi-x-circle-fill" style={{ fontSize: "20px" }}></i>
                                                        </button>
                                                        <button class="btn text-success accept-account" title={`Accept ${row.first_name} ${row.last_name}`}>
                                                            <i class="bi bi-check-circle-fill" style={{ fontSize: "20px" }}></i>
                                                        </button>
                                                    </>
                                                )
                                            } else if (data === "rejected") {
                                                return (
                                                    <span class="text-danger">Account Rejected</span>
                                                )
                                            }
                                        },
                                    }}>
                                    <thead>
                                        <tr>
                                            <th>NO</th>
                                            <th>NAME</th>
                                            <th>EMAIL</th>
                                            <th>ROLE</th>
                                            <th>STATUS</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Detail Modal */}
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} dialogClassName="custom-modal" size="xl" centered>
                {/* <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <DetailModal />
                </Modal.Body>
                {/* <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>Close</button>
                </Modal.Footer> */}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this user? This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>Delete</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default User;