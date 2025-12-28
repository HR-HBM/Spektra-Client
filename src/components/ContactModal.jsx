// import ContactForm from "./ContactForm";

// function ContactModal({ isOpen, onClose }) {
//   if (!isOpen) return null;

//   return (

// //     <div className="modal-dialog modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
// //   <div className="modal-dialog">
// //     <div className="modal-content">
// //       <div className="modal-header">
// //         <img src="./images/logo1.png" className="img-fluid contact-modal-logo" style={{height: 50}} alt="logo" />
// //         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
// //       </div>
// //       <div className="modal-body">
// //         <ContactForm />
// //       </div>

// <ContactForm isInModal={true} />


//       <div className="modal-footer">
//         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         <button type="button" className="btn btn-primary">Save changes</button>
//       </div>
// //     </div>
// //   </div>
// // </div>
//     // <div className="modal-overlay">
//     //   <div className="modal-content">
//     //     <button className="btn btn-primary" onClick={onClose}>×</button>
//     //     <ContactForm />
//     //   </div>
//     // </div>
//   );
// }

// export default ContactModal;


import ContactForm from "./ContactForm";

function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return <ContactForm isInModal={true} />;
}

export default ContactModal;