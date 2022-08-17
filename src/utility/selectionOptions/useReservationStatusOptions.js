import { useTranslation } from "utility/language"

export const useReservationStatusOptions = () => {
    const t = useTranslation();
    let options = [{
        value: "",
        label: t("all")
    },
    {
        value: "pending",
        label: t("pending")
    },
    {
        value: "accepted",
        label: t("accepted")
    },
    {
        value: "rejected",
        label: t("rejected")
    },
    {
        value: "finished",
        label: t("finished")
    },
    {
        value: "cancelled",
        label: t("canceled")
    },
    ];
    return options;
}