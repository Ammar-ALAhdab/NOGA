import { useMemo } from "react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { arSD } from "@mui/x-data-grid/locales";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { LicenseInfo } from "@mui/x-license";

LicenseInfo.setLicenseKey(
  "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
);

const cacheRtl = createCache({
  key: "data-grid-rtl-demo",
  stylisPlugins: [prefixer, rtlPlugin],
});

function DataTable({ columns, rows}) {
  const existingTheme = useTheme();
  const theme = useMemo(
    () =>
      createTheme({}, arSD, existingTheme, {
        direction: "rtl",
        components: {
          MuiDataGrid: {
            styleOverrides: {
              columnHeader: {
                backgroundColor: "#3457D5",
                color: "white",
              },
              columnHeaderWrapper: {
                backgroundColor: "#3457D5",
              },
              // Row (both even and odd) styles
              row: {
                color: "black",
                "&:nth-of-type(odd)": {
                  backgroundColor: "#ddd",
                },
                "&:nth-of-type(even)": {
                  backgroundColor: "white",
                },
              },
            },
          },
        },
      }),
    [existingTheme]
  );
  columns.forEach((element) => {
    element.headerAlign = "center";
    element.align = "center";
  });
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div
          className="md:w-[570px] lg:w-[650px]  xlg:w-[770px] 2xl:w-[900px] flex items-center justify-center min-h-[200px]"
          dir="rtl"
        >
          <DataGridPro
            rows={rows}
            columns={columns}
            sx={{
              width: "100%",
              minHeight: "200px",
              border: "none",
              "& .MuiDataGrid-filler": {
                display: "none",
              },
              "& .MuiDataGrid-footerContainer": {
                border: "1px solid #3457D5",
              },
              "& .MuiDataGrid-main": {
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                borderBottom: "5px solid #3457D5",
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            slotProps={{
              columnsManagement: {
                disableShowHideToggle: true,
                disableResetButton: true,
              },
            }}
            hideFooter={true}
            filterMode="server"
          />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

DataTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
};

export default DataTable;

// THE OLD

// import * as React from "react";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarDensitySelector,
//   GridToolbarQuickFilter,
//   GridToolbarColumnsButton,
// } from "@mui/x-data-grid";
// import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
// import { arSD } from "@mui/x-data-grid/locales";
// import { prefixer } from "stylis";
// import rtlPlugin from "stylis-plugin-rtl";
// import createCache from "@emotion/cache";
// import { CacheProvider } from "@emotion/react";
// import PropTypes from "prop-types";

// const cacheRtl = createCache({
//   key: "data-grid-rtl-demo",
//   stylisPlugins: [prefixer, rtlPlugin],
// });

// const quickFilterStyle = {
//   outline: "none",
//   border: "2px solid #3457D5",
//   width: "200px",
//   height: "40px",
//   paddingTop: "0.25rem",
//   paddingBottom: "0.25rem",
//   paddingLeft: "1rem",
//   paddingRight: "1rem",
//   borderRadius: "20px",
//   direction: "rtl",
//   fontFamily: "sans-serif",
//   fontSize: "1rem",
// };

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer sx={{ padding: "8px", border: "none" }}>
//       <GridToolbarColumnsButton />
//       <GridToolbarDensitySelector />
//       <GridToolbarQuickFilter
//         style={quickFilterStyle}
//         sx={{
//           "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
//             borderBottom: "none",
//           },
//           "& .MuiInput-underline:after": {
//             borderBottom: "none",
//           },
//         }}
//       />
//     </GridToolbarContainer>
//   );
// }

// function DataTable({ columns, rows, toolbarShow = true }) {
//   const existingTheme = useTheme();
//   const theme = React.useMemo(
//     () =>
//       createTheme({}, arSD, existingTheme, {
//         direction: "rtl",
//         components: {
//           MuiDataGrid: {
//             styleOverrides: {
//               columnHeader: {
//                 backgroundColor: "#3457D5",
//                 color: "white",
//               },
//               columnHeaderWrapper: {
//                 backgroundColor: "#3457D5",
//               },
//               // Row (both even and odd) styles
//               row: {
//                 color: "black",
//                 "&:nth-of-type(odd)": {
//                   backgroundColor: "#ddd",
//                 },
//                 "&:nth-of-type(even)": {
//                   backgroundColor: "white",
//                 },
//               },
//             },
//           },
//         },
//       }),
//     [existingTheme]
//   );
//   columns.forEach((element) => {
//     element.headerAlign = "center";
//     element.align = "center";
//   });
//   return (
//     <CacheProvider value={cacheRtl}>
//       <ThemeProvider theme={theme}>
//         <div
//           className="w-[95%] flex items-center justify-center"
//           dir="rtl"
//         >
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             sx={{
//               width: "100%",
//               border: "none",
//               "& .MuiDataGrid-filler": {
//                 display: "none",
//               },
//               "& .MuiDataGrid-footerContainer": {
//                 border: "1px solid #3457D5",
//               },
//               "& .MuiDataGrid-main": {
//                 borderTopLeftRadius: "20px",
//                 borderTopRightRadius: "20px",
//                 borderBottom: "5px solid #3457D5",
//               },
//             }}
//             initialState={{
//               pagination: {
//                 paginationModel: { page: 0, pageSize: 10 },
//               },
//               columns: {
//                 columnVisibilityModel: {
//                   id: false,
//                 },
//               },
//             }}
//             pageSizeOptions={[5, 10]}
//             slots={{
//               toolbar: toolbarShow ? CustomToolbar : null,
//             }}
//             slotProps={{
//               columnsManagement: {
//                 disableShowHideToggle: true,
//                 disableResetButton: true,
//               },
//             }}
//           />
//         </div>
//       </ThemeProvider>
//     </CacheProvider>
//   );
// }

// DataTable.propTypes = {
//   columns: PropTypes.array,
//   rows: PropTypes.array,
//   toolbarShow: PropTypes.bool,
// };

// export default DataTable;
