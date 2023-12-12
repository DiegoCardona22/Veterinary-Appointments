// @interfaces
interface IErrorProps {
  message: string;
}

const Error = ({ message }: IErrorProps) => (
  <div className="bg-red-800 p-3 text-white uppercase font-bold mb-3 rounded-md text-center">
    {message}
  </div>
);

export default Error;
