import OnvoBase from "../base";
import { DashboardDatasource } from "../types";

export class OnvoDashboardDatasources extends OnvoBase {
  #dashboardId: string;

  constructor(
    dashboardId: string,
    apiKey: string,
    options?: { endpoint: string }
  ) {
    super(apiKey, options);
    this.#dashboardId = dashboardId;
  }

  // Dashboard Datasource endpoints
  /**
   * Lists all the datasources linked to a dashboard.
   *
   * @return {Promise<DashboardDatasource[]>} A promise that resolves to an array of dashboard datasources.
   */
  list(): Promise<DashboardDatasource[]> {
    return this.fetchBase(
      "/api/dashboards/" + this.#dashboardId + "/datasources"
    ) as Promise<DashboardDatasource[]>;
  }

  /**
   * Unlinks a datasource from a dashboard.
   *
   * @param {string} datasourceId - The ID of the datasource to unlink.
   * @return {Promise<{ success: boolean }>} A promise that resolves to an object indicating the success of the unlink operation.
   */
  unlink(datasourceId: string): Promise<{ success: boolean }> {
    return this.fetchBase(
      "/api/dashboards/" + this.#dashboardId + "/datasources/" + datasourceId,
      "DELETE"
    ) as Promise<{ success: boolean }>;
  }

  /**
   * Links a datasource to a dashboard.
   *
   * @param {string} datasourceId - The ID of the datasource to link.
   * @return {Promise<DashboardDatasource>} A promise that resolves to the linked dashboard datasource.
   */
  link(datasourceId: string): Promise<DashboardDatasource> {
    return this.fetchBase(
      "/api/dashboards/" + this.#dashboardId + "/datasources",
      "PUT",
      {
        datasourceId: datasourceId,
      }
    ) as Promise<DashboardDatasource>;
  }
}
