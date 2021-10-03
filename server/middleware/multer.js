import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import path from "path";


// const storage = multerS3({
//   s3: s3,
//   bucket: process.env.BUCKET,
//   acl: "public-read",
//   key: (req, file, cb) => {
//     cb(
//       null,
//       path.basename(file.originalname, path.extname(file.originalname)) +
//         "-" +
//         Date.now() +
//         path.extname(file.originalname)
//     );
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    // Uploads is the Upload_folder_name
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    cb(null, path.basename(file.originalname, path.extname(file.originalname)) +
      "-" +
      Date.now() +
      path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  let types = ["image/png", "image/jpg", "image/jpeg"];
  let err = "Invalid file type, only png, jpg or jpeg is allowed!";

  if (file.fieldname === "docs") {
    types = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
    ];
    err = "Invalid file type, only png, jpg, jpeg, msword or pdf is allowed!";
  }
  if (file.fieldname === "TRF") {
    types = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];
    err = "Invalid file type, only png, jpg, jpeg or pdf is allowed!";
  }

  if (file.fieldname === "reportSheet") {
    types = [
      "application/excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    err = "Invalid file type, only xl and xlsx are allowed!";
  }

  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    //Reject
    cb(new Error(err));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1000 * 1000,
  },
  fileFilter: fileFilter,
});

export default upload;
