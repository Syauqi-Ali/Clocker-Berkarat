import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AboutUs = () => {
    const [aboutData, setAboutData] = useState({
        image: '',
        title: '',
        description: '',
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        fetchAboutUs();
    }, []);

    const fetchAboutUs = async () => {
        try {
            const { data } = await axios.get('/api/admin/about');
            setAboutData({
                image: data.image || '',
                title: data.title || '',
                description: data.description || '',
            });

        } catch (error) {
            console.error('Error fetching about us data:', error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("_method", "PUT")

        try {
            await axios.post(`/api/admin/about`, formData);
        } catch (error) {
            console.error('Error editing about:', error);
        }
    };

    return (
        <div className="page-content">
            <section id="basic-vertical-layouts">
                <div className="row match-height">
                    <div className="col-md-12 col-12">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} className="form form-vertical" encType="multipart/form-data">
                                        <div className="form-body">
                                            <div className="row d-flex justify-content-center">

                                                <div className="img-upload-section">
                                                    <div className="logo-wrapper">
                                                        <div className="logo-upload mt-3 mb-3">
                                                            <div className="image-preview-container" id="avatar-preview-container">
                                                                <img
                                                                    src={previewImage || `/storage/${aboutData.image}`}
                                                                    alt="loading..."
                                                                    className="upload-img"
                                                                    width="500"
                                                                    id="upload-img"
                                                                />
                                                                <label htmlFor="input-file" className="pencil-icon">
                                                                    <i className="bi bi-pen-fill"></i>
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    name="image"
                                                                    accept="image/jpeg, image/jpg, image/png, image/webp"
                                                                    id="input-file"
                                                                    onChange={handleImageChange}
                                                                    style={{ display: 'none' }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-10">
                                                    <div className="form-group">
                                                        <label htmlFor="first-name-vertical">Title</label>
                                                        <input
                                                            type="text"
                                                            id="first-name-vertical"
                                                            className="form-control"
                                                            name="title"
                                                            defaultValue={aboutData.title}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-10">
                                                    <div className="form-group">
                                                        <label htmlFor="email-id-vertical">Description</label>
                                                        <textarea
                                                            name="description"
                                                            className="form-control"
                                                            aria-label="With textarea"
                                                            defaultValue={aboutData.description}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-10 d-flex justify-content-end">
                                                    <button type="submit" className="btn btn-primary me-1 mb-1">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
