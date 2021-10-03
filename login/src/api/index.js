import axios from 'axios';

const saveDocDetails = (formData) => axios.post("/api/uploadFile/", formData);

export {saveDocDetails};