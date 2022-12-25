import React from "react";

const MyDocument = ({ referencia }) => {
  return (
    <div ref={referencia}>
      Prueba de componente de PDF
      <img
        src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        alt=".."
      />
    </div>
  );
};

export default MyDocument;
