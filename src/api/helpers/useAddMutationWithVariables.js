import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "utility/language";
import { addPathVariablesToUrl } from "./addPathVariablesToUrl";
import { useAxios } from "./useAxios";
import { validateSession } from "./validateSession";

export const useAddMutationWithVariables = (key, url) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const t = useTranslation();

  return useMutation(
    async ({dataToSend,varsObj}) => {
      const { data } = await axios.post(addPathVariablesToUrl(varsObj,url), dataToSend);
      return data;
    },
    {
      onSuccess: ({ message }) => {
        toast.success(message || t("added_successfully"));
        queryClient.invalidateQueries([key]);
      },
      onError: (err) => {
        const message = err?.response?.data?.message || t("failed_to_add_data");
        toast.error(message);
        validateSession(err.response);
      },
    }
  );
};
