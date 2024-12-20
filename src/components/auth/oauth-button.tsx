import { handleAuth } from "@/lib/firebase";
import { Button } from "../ui/button";
import { capitalize } from "@/lib/utils";

type OAuthProvider = "google" | "github";

interface OAuthButtonProps {
  type: OAuthProvider;
  onClick?: () => void;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({ type, onClick }) => {
  const handleClick = onClick || (() => handleAuth(type));
  const label = `Login with ${capitalize(type)}`;

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="w-full flex justify-center"
    >
      {label}
    </Button>
  );
};

export default OAuthButton;
