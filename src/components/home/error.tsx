import Layout from "@/app/home/layout";
import { Button } from "../ui/button";

interface ErrorProps {
  message: string;
  title?: string;
}

const Error = ({ message, title = "Error" }: ErrorProps) => (
  <Layout>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">{title}</h1>
        <p className="mt-4 text-lg text-gray-600">{message}</p>
        <Button
          variant="link"
          className="text-md mt-2"
          onClick={() => window.location.reload()}
        >
          Click here to reload
        </Button>
      </div>
    </div>
  </Layout>
);

export default Error;
