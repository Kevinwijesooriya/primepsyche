import React from "react";
import { AuthBackground, AuthOverlay, AuthTitles, H1, H4 } from "../../styles";

function LoginBackground() {
  return (
    <>
      <AuthBackground>
        <AuthOverlay>
          <AuthTitles>
            <H1 variant="h1" textAlign="left">
              Creating Peace of Mind
            </H1>
            <H4 variant="h4">Online home to reach your prime psyche</H4>
          </AuthTitles>
        </AuthOverlay>
      </AuthBackground>
    </>
  );
}

export default LoginBackground;
