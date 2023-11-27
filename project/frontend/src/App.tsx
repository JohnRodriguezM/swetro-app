import { useState } from "react";
import { Loader } from "./components/Loader/Loader";
import useFetch from "./hook/useFetch";
import { DataType } from "./types/app.types";
import { Data } from "./components/Data/Data";

const App: React.FC = (): JSX.Element => {
  const [state, setState] = useState({
    pageRequest: 1 as number,
  });

  const { pageRequest: page } = state;

  const limit = 10;

  /**
   * Fetches suspicious activities data.
   *
   * @param {number} page - The page number.
   * @param {number} limit - The maximum number of items per page.
   * @returns {object} - The fetched data and loading status.
   */
  const { data, isLoading } = useFetch("suspicious_activities", {
    page: page,
    limit,
  });

  if (isLoading) return <Loader />;

  if (
    data?.data?.length === 0 ||
    data?.image === "" ||
    state.pageRequest === 0
  ) {
    return (
      <section
        className="flex flex-col items-center justify-center"
        style={{ height: "100vh" }}
      >
        <h2>No hay datos</h2>
        <button
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              pageRequest: 1,
            }));
          }}
        >
          Restart counter
        </button>
      </section>
    );
  }

  return (
    <Data
      image={data?.image as string}
      data={data?.data as DataType[]}
      page={page}
      setState={setState}
    />
  );
};

export default App;
