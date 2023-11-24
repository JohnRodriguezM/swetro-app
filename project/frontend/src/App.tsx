import React, { useState, useEffect } from 'react';
import { api } from './../config/axios';
type DataType = {
  Id: number;
  Sospechosa: boolean;
  Suma_Desviaciones: number;
};
const App = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [image, setImage] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    setIsLoading(true);
    api.get("suspicious_activities", { params: { page, limit } })
      .then((res) => {
        console.log(res.data)
        setImage(res.data.image);
        setData(res.data.data);
        setIsLoading(false);
      });
  }, [page]);

  return (
    <div className="container mx-auto px-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
              {data?.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-500' : ''}>
                  <td className="border px-4 py-2">{item.Id}</td>
                  <td className="border px-4 py-2">{item.Sospechosa ? 'Yes' : 'No'}</td>
                  <td className="border px-4 py-2">{item.Suma_Desviaciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <button onClick={() => setPage((prevPage) => prevPage - 1)} disabled={page === 1}>Previous page</button>
            <button onClick={() => setPage((prevPage) => prevPage + 1)}>Next page</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default App;