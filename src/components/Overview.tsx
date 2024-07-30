import { useEffect, useState } from "react";
import { config } from "../config";
import { Sidebar } from "./Sidebar";
import { Protect } from "./Protect";
import usePasswordStore from "../stores/passwordStore";

const Overview = () => {
  const [eventData, setEventData] = useState<any>([]);
  const { password, setPassword } = usePasswordStore();

  useEffect(() => {
    fetch(`${config.shop.apiURL}/get-events`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: config.token.m2m,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const filtered = data?.filter((d: any) => d.category !== "jbsn");
        setEventData(filtered);
      });
  }, []);

  return (
    <div>
      <div className="min-h-screen min-w-screen h-full dark:bg-gray-800">
        <Sidebar />
        {password === "DBendangAdminDashboard" ? (
          <section className="container py-10 px-4 mx-auto">
            <h1 className="text-slate-200 text-4xl font-semibold my-4">
              Peserta
            </h1>
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Acara
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Jumlah Peserta
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Had Peserta
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Download
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {eventData?.map((event: any) => {
                          return (
                            <tr
                              key={event}
                              className={
                                event.players === event.playerLimit
                                  ? "bg-emerald-900"
                                  : ""
                              }
                            >
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                  <div>
                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                      {event.name}
                                    </h2>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <span>{event.players}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                    {event.playerLimit
                                      ? event.playerLimit
                                      : "Tiada"}
                                  </h2>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap flex gap-2">
                                <button
                                  className={`px-3 py-1 ${
                                    event.players === event.playerLimit
                                      ? "bg-emerald-600"
                                      : "bg-slate-700"
                                  } rounded-lg text-slate-300`}
                                >
                                  PDF
                                </button>
                                <button
                                  className={`px-3 py-1 ${
                                    event.players === event.playerLimit
                                      ? "bg-emerald-600"
                                      : "bg-slate-700"
                                  } rounded-lg text-slate-300`}
                                >
                                  Excel
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <Protect />
        )}
      </div>
    </div>
  );
};

export default Overview;
