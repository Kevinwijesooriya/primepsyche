import React from "react";
import { AuthBackgroundRegister, AuthOverlayRegister } from "../../styles";

function RegisterBackground() {
  return (
    <>
      <AuthBackgroundRegister>
        <AuthOverlayRegister />
      </AuthBackgroundRegister>
    </>
  );
}

export default RegisterBackground;
