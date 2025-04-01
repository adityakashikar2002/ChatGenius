// import React from 'react';

// function Popup({ message, onClose }) {
//     return (
//         <div className="popup-overlay">
//             <div className="popup">
//                 <p>{message}</p>
//                 <button onClick={onClose}>Close</button>
//             </div>
//         </div>
//     );
// }

// export default Popup;

// import React from 'react';

// function Popup({ message, onClose }) {
//     return (
//         <div className="popup-overlay">
//             <div className="popup">
//                 <p>{message}</p>
//                 <button onClick={onClose}>Close</button>
//             </div>
//         </div>
//     );
// }

// export default Popup;

// import React from 'react';

// function Popup({ message, onClose }) {
//     return (
//         <div className="popup-overlay" onClick={onClose}>
//             <div className="popup" onClick={(e) => e.stopPropagation()}>
//                 <p>{message}</p>
//                 <button onClick={onClose}>Close</button>
//             </div>
//         </div>
//     );
// }

// export default Popup;
import React from 'react';

function Popup({ message, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <button onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
