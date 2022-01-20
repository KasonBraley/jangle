import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

function SigninButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      id="profileBtn"
      variant="contained"
      color="primary"
      onClick={loginWithRedirect}
    >
      Sign In
    </Button>
  );
}
export default SigninButton;
