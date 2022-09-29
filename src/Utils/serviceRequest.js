import axios from "axios";

export const baseUrl = 'https://assetmgmtservice.practicei.xyz';



export const doAxiosCall = async ({
    method,
    url,
    payload,
    successFunc,
    errorFunc,
}) => {

    let finalUrl = baseUrl+url;

    switch (method.toLowerCase()) {
        case "get":
            await axios
                .get(finalUrl)
                .then((res) => res.data)
                .then((data) => {
                    successFunc(data);
                })
                .catch((err) => {
                    errorFunc(err);
                });
            break;
        case "post":
            await axios
                .post(finalUrl, payload)
                .then((res) => res.data)
                .then((data) => {
                    successFunc(data);
                })
                .catch((err) => {
                    errorFunc(err);
                });
            break;
        case "delete":
            await axios
                .delete(finalUrl, payload)
                .then((res) => res.data)
                .then((data) => {
                    successFunc(data);
                })
                .catch((err) => {
                    errorFunc(err);
                });
            break;
        case "put":
            await axios
                .put(finalUrl, payload)
                .then((res) => res.data)
                .then((data) => {
                    successFunc(data);
                })
                .catch((err) => {
                    errorFunc(err);
                });
            break;
        default:
            break;
    }
};