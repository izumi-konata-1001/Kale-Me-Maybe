const ContactUs = () => {
  return (
    <div className="text-center">
      <h1 className="title">Contact Us</h1>
      <div className="text-lg mt-4">
        <div className="p-5 m-5">
          <h2>Address:</h2>
          <p className="mb-5">
            123 Main Street, Cityville, State 12345, Country
          </p>
          <h2> Phone:</h2>
          <p className="mb-5">(555) 123-4567</p>
          <h2>Email:</h2>
          <p> contact@kalememaybe.org</p>
        </div>
        <div className="p-5 m-5">
          <p>
            For any inquiries, questions, or feedback, please don't hesitate to
            reach out to us using the contact information provided above. Our
            team is here to assist you and address any concerns you may have
            regarding pet adoption, volunteering opportunities, donations, or
            general inquiries. We value your support and look forward to hearing
            from you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
