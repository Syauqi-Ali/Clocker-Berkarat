import React, { useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'datatables.net-bs5';

const Project = () => {
    const tableRef = useRef(null);

    useEffect(() => {
        if (tableRef.current) {
            const table = new DataTable(tableRef.current, {
                processing: true,
                serverSide: true,
                ajax: "/api/admin/project",
                columns: [
                    {
                        data: 'DT_RowIndex',
                        name: 'DT_RowIndex',
                        orderable: false,
                        searchable: false,
                    },
                    {
                        data: 'name',
                        name: 'name',
                    },
                    {
                        data: 'category_name',
                        name: 'category.name',
                    },
                    {
                        data: 'user_name',
                        name: 'user_name',
                        searchable: true,
                    },
                    {
                        data: 'description',
                        name: 'description',
                    },
                    {
                        data: 'budget',
                        name: 'budget',
                        render: function (data) {
                            return `<strong>Rp ${new Intl.NumberFormat('id-ID', {
                                minimumFractionDigits: 0,
                            }).format(data)}</strong>`;
                        },
                    },
                ],
            });

            return () => {
                table.destroy();
            };
        }
    }, []);
    return (
        <div className="page-heading">
            <h3>Project</h3>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <div className="page-content">
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table" ref={tableRef}>
                                    <thead>
                                        <tr>
                                            <th>NO</th>
                                            <th>PROJECT</th>
                                            <th>CATEGORY</th>
                                            <th>USER</th>
                                            <th>DESCRIPTION</th>
                                            <th>BUDGET</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Project;
