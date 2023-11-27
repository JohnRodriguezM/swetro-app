import { DataType } from "../../types/app.types";

export const Data = (props: {
  image: string;
  data: DataType[];
  page: number;
  setState: React.Dispatch<
    React.SetStateAction<{
      pageRequest: number;
    }>
  >;
}): JSX.Element => {
  const { image, data, page, setState } = props;

  return (
    <div className="container mx-auto px-4">
      <section
        className="flex flex-col items-center justify-center"
        style={{ height: "100vh" }}
      >
        <img src={image} alt="image" />
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Sospechosa</th>
              <th className="px-4 py-2">Suma_Desviaciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: DataType, index: number) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-500" : ""}>
                <td className="border px-4 py-2">{item.Id}</td>
                <td className="border px-4 py-2">
                  {item.Sospechosa ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2">{item.Suma_Desviaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                pageRequest: page - 1,
              }))
            }
            disabled={page === 1}
          >
            Previous page
          </button>
          <button
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                pageRequest: page + 1,
              }))
            }
          >
            Next page
          </button>
        </div>
      </section>
    </div>
  );
};
