import { useState } from "react";

export default function EmailTheShow() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    const inputs = e.target.elements;
    const data = {};
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        formData.append(inputs[i].name, inputs[i].value);
      }
    }

    setIsLoading(true);

    fetch("https://cnb-react.dev1.bwmmedia.com//wp-json/contact-form-7/v1/contact-forms/481/feedback", {
      method: "POST",
      body: formData,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

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
          <textarea id="cnb-message" placeholder="Enter your message" name="eib-message" rows={6} />
        </div>
        <div className="form-group">
          <button type="submit" className={btnClass}>
            {isLoading ? <span className="cnb-spinner-loading"></span> : <span>Send a message</span>}
          </button>
        </div>
      </form>
    </section>
  );
}
