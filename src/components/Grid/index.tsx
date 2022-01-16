import React from "react";
import styled from "styled-components";

type GridAreaProps<T> = {
  children?: React.ReactNode;
  areaName: T;
  style?: React.CSSProperties;
};

export const GridArea = <T extends string>({ children, areaName, style }: GridAreaProps<T>) => (
  <div
    style={{
      gridArea: areaName,
      ...style,
    }}
  >
    {children ? <>{children}</> : null}
  </div>
);

type GridLayoutProps<T> = {
  children?: React.ReactNode;
  columns: string[];
  rows: string[];
  areas: T[][];
  style?: React.CSSProperties;
};

const gridAreaInputToGridTemplateAreas = (array: string[][], numberOfRows: number) =>
  // [[a, b],[c, d]] => `'a b' 'c d'`
  array.map((rowOfAreas) => `'${rowOfAreas.join(" ")}'`).join(" ");

export const GridLayout = <T extends string>({
  children,
  columns,
  rows,
  areas,
  style,
}: GridLayoutProps<T>) => {
  const numberOfRows = rows.length;
  const gridTemplateAreas = gridAreaInputToGridTemplateAreas(areas, numberOfRows);
  const gridTemplateRows = rows.join(" ");
  const gridTemplateColumns = columns.join(" ");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns,
        gridTemplateRows,
        gridTemplateAreas,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

type CreateGridArgs<T> = {
  rows: Array<string>;
  columns: Array<string>;
  areas: T[][];
};

type AreaProps<T> = {
  name: T;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};
type LayoutProps = {
  style?: React.CSSProperties;
  className?: string;
};

export type CreateGridInput<T extends string> = {
  template: CreateGridArgs<T>;
  areaStyles?: Partial<Record<T, React.CSSProperties>>;
  gridStyle?: React.CSSProperties;
};

export const createGrid = <T extends string>({
  template: { rows, columns, areas },
  areaStyles = {},
  gridStyle = {},
}: CreateGridInput<T>) => {
  const Layout: React.FC<LayoutProps> = ({ children, style }) => (
    <GridLayout rows={rows} columns={columns} areas={areas} style={{ ...gridStyle, ...style }}>
      {children}
    </GridLayout>
  );

  const Area = ({ name, children, style }: AreaProps<T>) => {
    return (
      <GridArea areaName={name} style={{ ...areaStyles[name], ...style }}>
        {children}
      </GridArea>
    );
  };
  return { Layout, Area };
};

type CreateResponsiveGridInput<T extends string> = {
  grids: CreateGridInput<T>[];
  cutoffs: number[];
  gridStyles?: React.CSSProperties[];
  areaStyles?: Partial<Record<T, React.CSSProperties>>[];
  dev?: boolean;
};

const getGridCss = ({
  rows,
  columns,
  areas,
}: {
  rows: string[];
  columns: string[];
  areas: string[][];
}) => `
grid-template-columns: ${columns.join(" ")};
grid-template-rows: ${rows.join(" ")};
grid-template-areas: ${areas.map((a) => `"${a.join(" ")}"`).join(" ")};
`;

const wrapInMediaQuery = (str: string, screenWidth: number) => `
@media screen and (max-width: ${screenWidth}px) {
    ${str}
}
`;

const styleToString = (style: { [key: string]: any }) => {
  return Object.keys(style).reduce(
    (acc: string, key: string) =>
      acc +
      key
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase() +
      ":" +
      style[key] +
      ";",
    ""
  );
};

const getReponsiveGrids = ({
  grids,
  cutoffs,
}: {
  grids: CreateGridInput<string>[];
  cutoffs: number[];
  gridStyles?: React.CSSProperties[];
}) => {
  const css: string[] = [];

  grids.forEach((grid, i) => {
    const gridStyle = grid.gridStyle || {};
    if (i === 0) {
      const cssString = `
        ${getGridCss(grid.template)}
        ${styleToString(gridStyle)}
      `;
      css.push(cssString);
    } else {
      const cutoff = cutoffs[i - 1];
      const cssString = `
        ${getGridCss(grid.template)}
        ${styleToString(gridStyle)}
      `;
      css.push(wrapInMediaQuery(cssString, cutoff));
    }
  });

  return css.join("\n");
};

const ResponsiveGrid = styled.div<{
  grids: CreateGridInput<string>[];
  cutoffs: number[];
}>`
  display: grid;
  ${({ grids, cutoffs }) => getReponsiveGrids({ grids, cutoffs })}
`;

const getResponsiveArea = ({
  areaName,
  cutoffs,
  areaStyles,
}: {
  areaName: string;
  cutoffs: number[];
  areaStyles?: Partial<Record<string, React.CSSProperties>>[];
}) => {
  const css: string[] = [];
  areaStyles?.forEach((areaStyle, i) => {
    if (i === 0) {
      css.push(styleToString(areaStyle[areaName] || {}));
    } else {
      const cutoff = cutoffs[i - 1];
      const cssString = styleToString(areaStyle[areaName] || {});
      console.log({ areaName, i, cssString, cutoff });

      css.push(wrapInMediaQuery(cssString, cutoff));
    }
  });
  return css.join("\n");
};

const ResponsiveArea = styled.div<{
  areaName: string;
  cutoffs: number[];
  areaStyles?: Partial<Record<string, React.CSSProperties>>[];
}>`
  grid-area: ${(props) => props.areaName};
  ${({ areaName, cutoffs, areaStyles }) => getResponsiveArea({ areaName, cutoffs, areaStyles })}
`;

const DevArea = ({ name }: { name: string }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
      border: "4px dotted red",
      backgroundColor: "rgba(255, 0, 0, .1)",
      width: "100%",
      height: "100%",
    }}
  >
    {name}
  </div>
);

export const createResponsiveGrid = <T extends string>({
  grids,
  cutoffs,
  areaStyles,
  dev,
}: CreateResponsiveGridInput<T>) => {
  const Layout: React.FC<LayoutProps> = ({ children, style }) => (
    <ResponsiveGrid grids={grids} cutoffs={cutoffs} style={style}>
      {children}
    </ResponsiveGrid>
  );

  const Area = ({ name, children, style }: AreaProps<T>) => {
    return (
      <ResponsiveArea areaName={name} areaStyles={areaStyles} cutoffs={cutoffs} style={style}>
        {!dev ? children : <DevArea name={name} />}
      </ResponsiveArea>
    );
  };
  return { Layout, Area };
};
