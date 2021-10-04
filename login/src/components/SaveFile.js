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
        
        <div className="card my-4 upload-card">
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
        </div>
      </div>
    </section>
  );
};

export default SaveFile;
