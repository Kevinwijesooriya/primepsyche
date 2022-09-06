import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination(props) {
  const { count } = props;
  return (
    <Stack spacing={2}>
      <Pagination count={count} />
      {/* <Pagination count={10} disabled /> */}
    </Stack>
  );
}
