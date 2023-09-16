// import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  // let error = useRouteError();
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-2">
      <div className="flex flex-col text-start">
        <h3 className="text-2xl font-bold">Something went wrong.</h3>
        <p className="text-sm text-neutral-400">Please try again later.</p>
        <div className="mt-3 border border-red-900/30 bg-red-900/50 p-3 text-sm text-red-300">
          asdas
        </div>
      </div>
    </div>
  );
};

export default ErrorElement;
