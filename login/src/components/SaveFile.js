import React, { useState } from "react";
import { update_user } from "../redux/actions/docDetailAction";
import { useDispatch, useSelector } from "react-redux";
const SaveFile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.userData.data);  
  const [imagePaths, setImgPaths] = useState([]);
  const [name,setName] = useState(user.name);

  const savefiles = async (e) => {
    e.preventDefault();
    const file = e.target.files;
    setImgPaths([...imagePaths, ...file]);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    console.log(value)
    setName(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in imagePaths) {
      formData.append("files", imagePaths[key]);
    }

    formData.append("name", name);
    alert (name)
    dispatch(update_user(formData));
  };

  return (
    <section className="container">
      <div className="row">

        <div className="card my-4 upload-card">
          <div className="card-body card-content">
            <div className="col-sm-6">
              <img className="user-image" src={user && user.image ? `http://localhost:5000/`+user.image :`../../man.png`}></img>
            </div>
            <div className="form-group col-sm-6 ">
              <input
                type="text"
                className="form-control"
                value={name}
                name="name"
                onChange={(e) => {
                  handleChange(e);
                }}
              ></input>
              <input
                type="file"
                className="form-control mt-3"
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
