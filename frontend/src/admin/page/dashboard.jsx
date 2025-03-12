import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import NumberIncrease from '../../components/numberIncrease';
import API from '../../components/apiAxios';

const Dashboard = () => {
    const [totalUser, setTotalUser] = useState(0);
    const [totalCompany, setTotalCompany] = useState(0);
    const [totalProject, setTotalProject] = useState(0);
    const [totalContract, setTotalContract] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [totalUserResponse, totalProjectResponse, totalContractResponse] = await Promise.all([
                API.get("/admin/total/user"),
                API.get("/admin/total/project"),
                API.get("/admin/total/contract"),
            ]);

            setTotalUser(totalUserResponse.data);
            setTotalProject(totalProjectResponse.data);
            setTotalContract(totalContractResponse.data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    }

    const [chartOptions] = useState({
        annotations: {
            position: 'back',
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            opacity: 1,
        },
        colors: ['#435ebe'],
        chart: {
            type: 'bar',
            toolbar: { show: false },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
    });

    const [chartSeries] = useState([
        {
            name: 'sales',
            data: [9, 20, 30, 20, 10, 20, 30, 20, 10, 20, 30, 20],
        },
    ]);

    const CardTotal = ({ title, total, icon }) => (
        <div className="col-9 col-lg-3 col-md-9">
            <div className="card">
                <div className="card-body px-4 py-4-5">
                    <div className="row">
                        <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                            <div className={`stats-icon ${icon.color} mb-2`}>
                                <i className={icon.class}></i>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                            <h6 className="text-muted font-semibold">{title}</h6>
                            <h6 className="font-extrabold mb-0"><NumberIncrease target={total} /></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="page-heading">
            <h3>Dashboard</h3>
            <div className="page-content">
                <section className="row">
                    <div className="col-12 col-lg-12">
                        <div className="row">
                            {/* Card Users */}
                            <CardTotal title="Users" total={totalUser} icon={{ color: "green", class: "iconly-boldUser" }} />

                            {/* Card Company */}
                            <CardTotal title="Company" total={totalCompany} icon={{ color: "blue", class: "iconly-boldProfile" }} />

                            {/* Card Project */}
                            <CardTotal title="Project" total={totalProject} icon={{ color: "purple", class: "iconly-boldFolder" }} />

                            {/* Card Contract */}
                            <CardTotal title="Contract" total={totalContract} icon={{ color: "red", class: "iconly-boldDocument" }} />
                        </div>

                        {/* Profile Visit Chart */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Profile Visit</h4>
                                    </div>
                                    <div className="card-body">
                                        <Chart options={chartOptions} series={chartSeries} type="bar" height={300} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
