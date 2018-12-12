import * as paths from "../../../../paths/config-paths";

const API = {
    async sendRequest(path: string) {
        return await fetch(`${paths.URL_SERVER}assets/i18n/${path}.json`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).then((response) => {
            if (response.status !== 200) {
                return Promise.reject();
            }
            return response.json();
        })
    }
};

export default API;