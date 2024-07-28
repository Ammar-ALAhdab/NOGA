import * as React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { arSD } from "@mui/x-data-grid/locales";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import { LicenseInfo } from "@mui/x-license";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

LicenseInfo.setLicenseKey(
  "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
);

const detailColumns = [
  { field: "productName", headerName: "اسم المنتج", flex: 1 },
  {
    field: "type",
    headerName: "النوع",
    align: "center",
    flex: 1,
  },
  { field: "barcode", headerName: "الباركود", flex: 1 },
  {
    field: "wantedQuantity",
    headerName: "الكمية المطلوبة",
    flex: 1,
  },
  {
    field: "sentQuantity",
    headerName: "الكمية المرسلة",
    flex: 1,
  },
];

detailColumns.forEach((element) => {
  element.headerAlign = "center";
  element.align = "center";
});

function DetailPanelContent({ row }) {
  const existingTheme = useTheme();
  const theme = React.useMemo(
    () =>
      createTheme({}, arSD, existingTheme, {
        direction: "rtl",
        components: {
          MuiDataGrid: {
            styleOverrides: {
              columnHeader: {
                backgroundColor: "#7049A3",
                color: "white",
              },
              columnHeaderWrapper: {
                backgroundColor: "#7049A3",
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
  return (
    <ThemeProvider theme={theme}>
      <Stack
        sx={{ py: 2, height: "100%", boxSizing: "border-box" }}
        direction="column"
      >
        <Paper sx={{ flex: 1, mx: "auto", width: "900px" }}>
          <Stack direction="column" spacing={1} sx={{ height: 1 }}>
            <Typography variant="h6">{`الطلب: ${row.id}#`}</Typography>
            <DataGridPro
              density="compact"
              columns={detailColumns}
              rows={row.productsOrder}
              sx={{
                border: "none",
                "& .MuiDataGrid-footerContainer": {
                  border: "1px solid #7049A3",
                },
                "& .MuiDataGrid-main": {
                  borderTopLeftRadius: "1px",
                  borderTopRightRadius: "1px",
                  borderBottom: "5px solid #7049A3",
                },
              }}
              hideFooter
            />
          </Stack>
        </Paper>
      </Stack>
    </ThemeProvider>
  );
}

const cacheRtl = createCache({
  key: "data-grid-rtl-demo",
  stylisPlugins: [prefixer, rtlPlugin],
});

function DataTableAccordion({ columns, rows }) {
  const existingTheme = useTheme();
  const theme = React.useMemo(
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

  const getDetailPanelContent = React.useCallback(
    ({ row }) => <DetailPanelContent row={row} />,
    []
  );

  const getDetailPanelHeight = React.useCallback(() => "auto", []);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div
          className="w-[900px] flex items-center justify-center min-h-[200px]"
          dir="rtl"
        >
          <DataGridPro
            rows={rows}
            columns={columns}
            getDetailPanelHeight={getDetailPanelHeight}
            getDetailPanelContent={getDetailPanelContent}
            slots={{
              detailPanelExpandIcon: () => (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size="sm"
                  className="cursor-pointer"
                />
              ),
              detailPanelCollapseIcon: () => (
                <FontAwesomeIcon
                  icon={faChevronUp}
                  size="sm"
                  className="cursor-pointer"
                />
              ),
            }}
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
          />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

DetailPanelContent.propTypes = {
  row: PropTypes.object,
};

DataTableAccordion.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
};

export default DataTableAccordion;
