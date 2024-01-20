import { Button, TextInput, Metric, Text } from "@tremor/react";

import React, { useEffect, useState } from "react";
import { useToken } from "../Wrapper";

const DashboardHeader: React.FC = ({}) => {
  const [dashboard, setDashboard] = useState<any>();
  const { backend } = useToken();

  useEffect(() => {
    console.log("TOKEN: ", backend);
    if (backend) {
      backend.getDashboard().then((a) => {
        setDashboard(a);
      });
    }
  }, [backend]);

  return (
    <section className="onv-dashboard-header foreground-color sticky z-10 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 top-0">
      <main className="mx-auto max-w-screen-2xl px-6 pt-4 lg:px-8">
        <div className="mb-3 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="w-full">
            {dashboard ? (
              <>
                <Metric className="font-override">
                  {dashboard?.title || " "}
                </Metric>
                <Text className="font-override">
                  {dashboard?.description || " "}
                </Text>
              </>
            ) : (
              <div className="w-3/5 animate-pulse">
                <div className="mb-2 h-6 w-4/5 rounded-md bg-gray-100 dark:bg-gray-700" />
                <div className="h-4 w-2/5 rounded-md bg-gray-100 dark:bg-gray-700" />
              </div>
            )}
          </div>
        </div>
      </main>
    </section>
  );
};

export default DashboardHeader;
