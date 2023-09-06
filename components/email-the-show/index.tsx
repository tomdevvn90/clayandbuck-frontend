import { useCallback, useEffect, useState } from "react";
import { CNB_ETS_FORM_ID, WP_REST_API_URL } from "../../lib/constants";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faXmarkCircle, faFilePdf, faFileWord } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function EmailTheShow() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })),
      ]);
    }
    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
    },
    maxSize: 1024 * 1000,
    maxFiles: 3,
    onDrop,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    let formData = new FormData();

    const inputs = e.target.elements;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        formData.append(inputs[i].name, inputs[i].value);
      }
    }
    if (files?.length) {
      files.forEach((file) => formData.append("attachfile", file));
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${WP_REST_API_URL}contact-form-7/v1/contact-forms/${CNB_ETS_FORM_ID}/feedback`, {
        method: "POST",
        body: formData,
        redirect: "follow",
      });
      const submissionData = await response.json();
      console.log(submissionData);
      const invalidFields = submissionData.invalid_fields;

      setIsLoading(false);

      if (invalidFields.length > 0) {
        setErrorMsg(invalidFields[0].message);
        return false;
      }

      const errorCodeArr = ["validation_failed", "acceptance_missing", "spam", "mail_failed", "aborted"];
      if (errorCodeArr.includes(submissionData.status)) {
        setErrorMsg(submissionData.message);
        return false;
      }
    } catch (e) {
      console.error("Error while fetching PWS API:", e);
    }
    setIsLoading(false);
  };

  if (submitted) {
    return (
      <>
        <div className="text-2xl">Thank you!</div>
        <div className="text-md">We'll be in touch soon.</div>
      </>
    );
  }

  const btnClass = isLoading ? "btn-submit loading" : "btn-submit";
  return (
    <section className="form-ss">
      <h3>
        Thanks for dropping us a note! We love hearing from you. You can also call the show between 12pm and 3pm Eastern
        Time: 1-800-282-2882
      </h3>

      <hr></hr>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cnb-name">Name *</label>
          <input type="text" id="cnb-name" name="eib-name" placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="cnb-email">Email *</label>
          <input type="email" id="cnb-email" name="eib-email" placeholder="Enter your email address" required />
        </div>
        <div className="form-group">
          <label htmlFor="cnb-subject">Subject *</label>
          <input type="text" id="cnb-subject" name="eib-subject" placeholder="Enter subject" required />
        </div>
        <div className="form-group">
          <label htmlFor="cnb-message">Note to Clay and Buck</label>
          <textarea id="cnb-message" name="eib-message" rows={6} placeholder="Enter your message" />
        </div>

        <div className="form-group">
          <label>Attach a file</label>
          <div
            {...getRootProps({
              className: "cnb-file-upload",
            })}
          >
            <input {...getInputProps()} />
            <div className="drop-area">
              <FontAwesomeIcon icon={faUpload} />
              {isDragActive ? <p>Drop the files here ...</p> : <p>Drag & drop files here, or click to select files</p>}
              <em>(File allowed extensions are: .jpg, .png, .doc, .docx, .pdf and filesize maxsize 5mb)</em>
            </div>
          </div>

          {/* Preview */}
          <section className="">
            {/* <div>
              <h2>Preview</h2>
              <button type="button" onClick={removeAll}>
                Remove all files
              </button>
            </div> */}

            {/* <h3>Accepted Files</h3> */}
            <ul className="accepted-files">
              {files.map((file) => (
                <li key={file.name}>
                  <div>
                    {file.type == "application/pdf" && <FontAwesomeIcon className="pdf-file" icon={faFilePdf} />}

                    {(file.type == "application/msword" ||
                      file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") && (
                      <FontAwesomeIcon className="word-file" icon={faFileWord} />
                    )}

                    {(file.type == "image/jpeg" || file.type == "image/png") && (
                      <Image
                        className="image-file"
                        src={file.preview}
                        alt={file.name}
                        width={30}
                        height={30}
                        onLoad={() => {
                          URL.revokeObjectURL(file.preview);
                        }}
                      />
                    )}
                    <p>{file.name}</p>
                  </div>
                  <button type="button" className="btn-remove" onClick={() => removeFile(file.name)}>
                    <FontAwesomeIcon icon={faXmarkCircle} />
                  </button>
                </li>
              ))}
            </ul>

            {rejected.length > 0 && (
              <>
                <h3 className="error-files-head">Error Files</h3>
                <ul className="error-files">
                  {rejected.map(({ file, errors }) => (
                    <li key={file.name}>
                      <div>
                        <div className="top-row">
                          <p>{file.name}</p>
                          <button className="btn-remove" type="button" onClick={() => removeRejected(file.name)}>
                            REMOVE
                          </button>
                        </div>
                        <ul className="error-msg">
                          {errors.map((error) => (
                            <li key={error.code}>- {error.message}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <div className="form-group">
          <button type="submit" className={btnClass}>
            {isLoading ? <span className="cnb-spinner-loading"></span> : <span>Send a message</span>}
          </button>
        </div>
      </form>
    </section>
  );
}
