import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useBackend } from "../Wrapper";
import { Dashboard as DashboardType, Widget } from "@onvo-ai/js";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { defaults } from "chart.js";

type DashboardContext = {
  id: string | undefined;
  dashboard?: DashboardType;
  widgets: Widget[];
  refreshDashboard: () => void;
  refreshWidgets: () => void;
  theme: "light" | "dark";
  adminMode?: boolean;
  selectedWidget: Widget | undefined;
  setSelectedWidget: (widget: Widget | undefined) => void;
};

const Context = createContext<DashboardContext>({
  id: undefined,
  dashboard: undefined,
  widgets: [],
  refreshDashboard: () => {},
  refreshWidgets: () => {},
  theme: "light",
  adminMode: false,
  selectedWidget: undefined,
  setSelectedWidget: () => {},
});

const r = document.querySelector(":root") as any;
r.style.setProperty(
  "--font-override",
  "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
);
defaults.font.family =
  "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

export const Dashboard: React.FC<{
  id: string;
  adminMode?: boolean;
  children: any;
}> = ({ id, children, adminMode }) => {
  const [dashboard, setDashboard] = useState<DashboardType>();
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [editable, setEditable] = useState(false);
  const backend = useBackend();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const prefersColorScheme = usePrefersColorScheme();
  const [selectedWidget, setSelectedWidget] = useState<Widget>();
  const initialized = useRef(false);

  const refreshDashboard = () => {
    if (!backend) return;
    backend.dashboards.get(id).then(setDashboard);
  };

  const refreshWidgets = () => {
    if (!backend) return;
    backend.widgets.list({ dashboard: id }).then(setWidgets);
  };

  useEffect(() => {
    if (
      !initialized.current &&
      dashboard &&
      new Date(dashboard.last_updated_at).getTime() + 60000 <
        new Date().getTime()
    ) {
      initialized.current = true;
      backend
        ?.dashboard(dashboard.id)
        .updateWidgetCache()
        .then((data) => {
          refreshWidgets();
          refreshDashboard();
        });
    }
  }, [dashboard]);

  useEffect(() => {
    if (id && backend) {
      refreshDashboard();
      refreshWidgets();
    }
  }, [id, backend]);

  useEffect(() => {
    if (dashboard) {
      if (dashboard.settings?.theme === "dark") {
        setTheme("dark");
      } else if (dashboard.settings?.theme === "light") {
        setTheme("light");
      } else {
        setTheme(prefersColorScheme === "dark" ? "dark" : "light");
      }
    }
  }, [dashboard, prefersColorScheme]);

  useEffect(() => {
    const r = document.querySelector(":root") as any;

    r.style.setProperty(
      "--font-override",
      "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    );
    defaults.font.family =
      "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    if (r && dashboard && dashboard.settings) {
      const settings = dashboard.settings;
      r.style.setProperty(
        "--background-color",
        theme === "dark" ? settings.dark_background : settings.light_background
      );
      r.style.setProperty(
        "--foreground-color",
        theme === "dark" ? settings.dark_foreground : settings.light_foreground
      );

      if (dashboard.settings.font !== "inter") {
        r.style.setProperty("--font-override", settings.font);
        defaults.font.family = settings.font;
      }
    }

    return () => {
      r.style.setProperty("--background-color", "");
      r.style.setProperty("--foreground-color", "");
      r.style.setProperty("--font-override", "");

      defaults.font.family =
        "'Inter','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    };
  }, [dashboard, theme]);

  return (
    <Context.Provider
      value={{
        id,
        dashboard,
        widgets,
        refreshDashboard,
        refreshWidgets,
        theme,
        selectedWidget,
        setSelectedWidget,
        adminMode,
      }}
    >
      <div className={`onvo-dashboard-context flex h-screen flex-col ${theme}`}>
        {children}
      </div>
    </Context.Provider>
  );
};
export const useDashboard = () => useContext(Context);
