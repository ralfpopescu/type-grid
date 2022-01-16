import React from "react";
import { render } from "@testing-library/react";

import { createResponsiveGrid } from ".";

type GridAreas = "logo" | "photo" | "profile" | "sidebar" | "header" | "feed";

const { Layout, Area } = createResponsiveGrid<GridAreas>({
  grids: [
    {
      template: {
        rows: ["50px", "100px", "100px", "1fr"],
        columns: ["50px", "200px", "1fr"],
        areas: [
          ["header", "header", "header"],
          ["sidebar", "photo", "feed"],
          ["sidebar", "profile", "feed"],
        ],
      },
      gridStyle: { fontSize: "20px" },
    },
    {
      template: {
        rows: ["80px", "80px", "1fr", "1fr"],
        columns: ["1fr", "1fr"],
        areas: [
          ["header", "header"],
          ["sidebar", "sidebar"],
          ["photo", "profile"],
          ["feed", "feed"],
        ],
      },
      gridStyle: { fontSize: "16px" },
    },
    {
      template: {
        rows: ["80px", "80px", "1fr", "1fr"],
        columns: ["1fr", "1fr"],
        areas: [["header"], ["sidebar"], ["photo"], ["profile"], ["feed"]],
      },
      gridStyle: { fontSize: "12px" },
    },
  ],
  areaStyles: [
    {
      sidebar: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
    },
    {
      sidebar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      },
    },
    {
      sidebar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      },
    },
  ],
  cutoffs: [1224, 700],
});

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Layout />);
  });
});
