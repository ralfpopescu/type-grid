import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { createResponsiveGrid } from ".";

type GridAreas = "logo" | "photo" | "profile" | "sidebar" | "header" | "feed";

const { Layout, Area } = createResponsiveGrid<GridAreas>({
  grids: [
    {
      template: {
        rows: ["50px", "200px", "200px", "1fr"],
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
        alignItems: "center",
      },
    },
    {
      sidebar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
    },
    {
      sidebar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
    },
  ],
  cutoffs: [1224, 700],
});

const { Layout: LayoutDev, Area: AreaDev } = createResponsiveGrid<GridAreas>({
  grids: [
    {
      template: {
        rows: ["50px", "200px", "200px", "1fr"],
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
  dev: true,
});

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "createResposiveGrid",
  component: Layout,
} as ComponentMeta<typeof Layout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Dev = () => (
  <LayoutDev style={{ width: "100%", height: "100%" }}>
    <AreaDev name="header">hi</AreaDev>
    <AreaDev name="photo" />
    <AreaDev name="profile" />
    <AreaDev name="sidebar" />
    <AreaDev name="feed" />
  </LayoutDev>
);

const iconStyle = (backgroundColor: string) => ({
  borderRadius: "50%",
  backgroundColor,
  width: "50px",
  height: "50px",
});

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Normal = () => (
  <Layout style={{ width: "100%", height: "100%" }}>
    <Area name="header" style={{ backgroundColor: "#adadad" }}>
      LOGO
    </Area>
    <Area name="photo">
      <img
        src="https://pbs.twimg.com/profile_images/1237550450/mstom.jpg"
        style={{ maxWidth: "100%", minWidth: "100%", maxHeight: "100%", minHeight: "100%" }}
      />
    </Area>
    <Area name="profile">
      <div>Name: Tom</div>
      <div>Founder: MySpace</div>
      <div>Birthday: Jan 1, 1970</div>
    </Area>
    <Area name="sidebar" style={{ backgroundColor: "##adadad" }}>
      <div style={iconStyle("red")} />
      <div style={iconStyle("blue")} />
      <div style={iconStyle("yellow")} />
      <div style={iconStyle("green")} />
    </Area>
    <Area name="feed" style={{ padding: "24px" }}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
      was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
      passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum.
    </Area>
  </Layout>
);
