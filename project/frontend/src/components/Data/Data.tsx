import { DataType } from "../../types/app.types";

/**
 * Renders a component that displays data in a table format.
 * @param props - The props for the Data component.
 * @param props.image - The image source for the component.
 * @param props.data - An array of data to be displayed in the table.
 * @param props.page - The current page number.
 * @param props.setState - A function to update the state of the component.
 * @returns The JSX element representing the Data component.
 */
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
  /**
   * Props for the Data component.
   */
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
