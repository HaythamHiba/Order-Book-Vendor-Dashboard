import React from "react";
import { Edit, Trash } from "react-feather";
import confirmAlert from "extensions/confirm-alert";
import { useTranslatedLabels } from "extensions/confirm-alert/useTranslatedLabels";
import { toast } from "react-toastify";
import { useTranslation } from "utility/language";

const TableActions = ({ showDelete=true,showEdit=true, onDelete, onEdit, ...props }) => {
  const t = useTranslation();
  const options = useTranslatedLabels();

  return (
    <div className="data-list-action">
     {
    showEdit&&  <Edit onClick={onEdit} className="cursor-pointer mr-1" size={20} />
}
      {showDelete&& <Trash
        onClick={() =>
          confirmAlert({
            onConfirm: () => {
              toast.info(t("_loading.delete"));
              onDelete();
            },
            ...options,
          })
        }
        className="cursor-pointer"
        size={20}
      />
}
      {props.children}
    </div>
  );
};

export default TableActions;
