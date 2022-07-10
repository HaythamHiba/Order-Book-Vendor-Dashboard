import React from "react";
import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { mapTranslatedProperties } from "helpers/language";
import { useGetSubCategories } from "api/subcategories";
import { useTranslation } from "utility/language";

const useSubCategoryOptions = ({ withAllOption = false } = {}) => {
  const languageCode = useBackendLanguageCode();
  const { data: subcategories_data } = useGetSubCategories();
  const subcategories = subcategories_data?.subcategories || [];
  const t = useTranslation();

  return React.useMemo(() => {
    const options = subcategories.map((subcategory) => ({
      value: subcategory.id,
      label: mapTranslatedProperties(
        subcategory.subcategory_details,
        "subcategory_name",
        languageCode
      ),
      category_id: subcategory.category_id,
    }));
    if (withAllOption) {
      return [{ label: t("all"), value: null }, ...options];
    }
    return options;
  }, [subcategories, languageCode, withAllOption, t]);
};

export default useSubCategoryOptions;
