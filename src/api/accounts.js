import {

  useUpdateMutation,

} from "./helpers";

const API = {

  UPDATE_MY_ACCOUNT:`/api/vendor/account/update_my_account`
};

const MY_ACCOUNT="MY_ACCOUNT";

export const useUpdateMyAccount=()=>useUpdateMutation(MY_ACCOUNT,API.UPDATE_MY_ACCOUNT)