import { useMemo } from "react";
import { useUpdateProductStatus } from "api/products";

import useCommonTableColumns from "../common/useTableColumns";

const useTableColumns = () => {
  const toggleMutation = useUpdateProductStatus();

  const additionalColumns = useMemo(
    () => [
    
    ],
    []
  );

  return useCommonTableColumns({ toggleMutation, additionalColumns });
};

export default useTableColumns;
