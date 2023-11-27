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
