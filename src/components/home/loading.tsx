import Layout from "@/app/home/layout";

interface LoadingProps {
  message?: string;
}

const Loading = ({
  message = "Please wait while the page loads."
}: LoadingProps) => (
  <Layout>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Loading...</h1>
        <p className="mt-4 text-lg text-gray-600">{message}</p>
      </div>
    </div>
  </Layout>
);

export default Loading;
