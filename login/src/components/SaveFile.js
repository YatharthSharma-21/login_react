import React, { useState } from "react";
// import { uploadFiles } from "../redux/actions/docDetailAction";
import { useDispatch } from "react-redux";
const SaveFile = () => {
  const dispatch = useDispatch();
  const [imagePaths, setImgPaths] = useState([]);

  const savefiles = async (e) => {
    e.preventDefault();
    const file = e.target.files;
    setImgPaths([...imagePaths, ...file]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in imagePaths) {
      formData.append("files", imagePaths[key]);
    }

    formData.append("length", imagePaths.length);
    // dispatch(uploadFiles(formData));
  };

  return (
    <section className="container">
      <div className="row">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div style={{width:'100%',height:'8vh',border:'1px solid black'}}></div>
            </div>
            <div className="carousel-item">
              <div style={{width:'100%',height:'8vh',border:'1px solid red'}}></div>
            </div>
            <div className="carousel-item">
              <div style={{width:'100%',height:'8vh',border:'1px solid blue'}}></div>
            </div>
          </div>
          <a
            className="carousel-control-prev bg-warning"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            {/* <span className="sr-only">Previous</span> */}
          </a>
          <a
            className="carousel-control-next bg-warning"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            {/* <span className="sr-only">Next</span> */}
          </a>
        </div>
        {/* <div className="card my-4 upload-card">
          <div className="card-body card-content">
            <div className="form-group col-sm-6 ">
              <input
                type="file"
                className="form-control"
                multiple
                onChange={(e) => {
                  savefiles(e);
                }}
              ></input>
              <button
                type="button"
                className="btn btn-success save-btn"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default SaveFile;
