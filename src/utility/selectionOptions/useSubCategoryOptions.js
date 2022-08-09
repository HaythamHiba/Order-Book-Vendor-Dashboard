import React from "react";
import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { useTranslation } from "utility/language";
import { getLanguageAttr } from "helpers/language";
import { useGetSubcategories } from "api/subcategories";

const useSubCategoryOptions = ({ withAllOption = false } = {},category_id) => {
  const languageCode = useBackendLanguageCode();
  const { data } = useGetSubcategories({parent_id:category_id});
  
  const t = useTranslation();

  return React.useMemo(() => {
    let options = [];
    if (data && data && Array.isArray(data)) {
      options = data.map((subCat) => ({
        value: subCat.id,
        label: getLanguageAttr(
          subCat.name,
          
          languageCode
        ),
      }));
    }

    if (withAllOption) {
      return [{ label: t("all"), value: null }, ...options];
    }
    return options;
  }, [data, languageCode, withAllOption, t]);
};

export default useSubCategoryOptions;
