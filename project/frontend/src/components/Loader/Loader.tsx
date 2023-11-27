import { ThreeDots } from "react-loader-spinner";

export const Loader: React.FC = (): JSX.Element => {
  return (
    <section
      className="flex flex-col items-center justify-center"
      style={{ height: "100vh" }}
    >
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
      <p>
        <b>Loading...</b>
      </p>
    </section>
  );
};
