import { Divider } from "../../tremor/Divider";
import { Text, Title } from "../../tremor/Text";
import { Card } from "../../tremor/Card";
import React, { useEffect, useState } from "react";
import { useBackend } from "../Wrapper";

import {
  ClockIcon,
  LinkIcon,
  PencilIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const DashboardCard: React.FC<{
  dashboard: any;
  onClick?: (dashboard: any) => void;
  variant?: "list" | "grid";
}> = ({ dashboard, onClick, variant = "grid" }) => {
  return (
    <Card
      onClick={() => onClick && onClick(dashboard)}
      className={
        "onvo-dashboard-card gap-4 flex " +
        (variant === "grid" ? "flex-col" : "flex-row items-center")
      }
    >
      <div
        className={
          "relative rounded-lg border border-gray-200 bg-gray-50 object-contain object-top transition-all group-hover:shadow-lg dark:border-gray-700 dark:bg-gray-950 " +
          (variant === "grid" ? "h-56  w-full" : "h-32 w-72")
        }
      >
        <img
          src={dashboard.thumbnail || ""}
          alt={dashboard.title}
          className="rounded-lg bg-gray-50 h-full w-full object-cover object-top dark:bg-gray-950 hover:object-bottom transition-all"
        />
      </div>

      <div className="flex flex-grow flex-row items-center gap-2">
        <div className="flex-grow">
          <Title className="onvo-dashboard-card-title">{dashboard.title}</Title>
          <Text className="onvo-dashboard-card-description">
            {dashboard.description}
          </Text>
        </div>
      </div>

      <Divider
        className={
          "my-0 " + (variant === "list" ? "h-full w-[1px]" : "w-full h-[1px]")
        }
      />

      <div className="grid grid-cols-2">
        <div className="w-36 flex-shrink-0 flex flex-col gap-1">
          <Text className="onvo-dashboard-card-details-text  flex flex-row items-center gap-2">
            <TableCellsIcon height={16} width={16} />{" "}
            {dashboard.widgets?.length} widgets
          </Text>
          <Text className="onvo-dashboard-card-details-text flex flex-row items-center gap-2">
            <LinkIcon height={16} width={16} /> {dashboard.datasources.length}{" "}
            datasources
          </Text>
        </div>
        <div className="w-48 flex-shrink-0 flex flex-col gap-1">
          <Text className="onvo-dashboard-card-details-text flex flex-row items-center gap-2">
            <ClockIcon height={16} width={16} />
            Created {dayjs(dashboard.created_at).fromNow()}
          </Text>
          <Text className="onvo-dashboard-card-details-text flex flex-row items-center gap-2">
            <PencilIcon height={16} width={16} />
            Updated {dayjs(dashboard.last_updated_at).fromNow()}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export const DashboardList: React.FC<{
  columns?: number;
  onClickItem?: (dashboard: any) => void;
  variant?: "list" | "grid";
}> = ({ columns = 3, onClickItem, variant = "grid" }) => {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const backend = useBackend();

  useEffect(() => {
    if (backend) {
      backend.dashboards
        .list()
        .then((a) => {
          // @ts-ignore
          setDashboards(a);
        })
        .catch((e) => console.log("UNABLE TO FETCH LIST: ", e));
    }
  }, [backend]);

  let cols =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    }[columns] || "grid-cols-2";

  return (
    <div className={"onvo-dashboard-list w-full grid gap-4 " + cols}>
      {dashboards.map((a) => (
        <DashboardCard
          key={a.id}
          dashboard={a}
          onClick={onClickItem}
          variant={variant}
        />
      ))}
    </div>
  );
};
