import axios from 'axios';
import ApiConfig from '../../api.config'

class ApiService {

    request(uri, method = '', data = {}) {

        const url = this.buildUrl(uri);

        switch(method) {
            case 'post':
                return axios.post(url, data, { headers: this.getAuthHeader() });
            case 'delete':
                return axios.delete(url, { headers: this.getAuthHeader() });
            case 'put':
                return axios.put(url, data, { headers: this.getAuthHeader() });
            default:
                return axios.get(url, { headers: this.getAuthHeader() });
        }
    }

    getBaseUrl() {
        return ApiConfig.urls.BASE_URL;
    }

    buildUrl(uri) {
        return this.getBaseUrl() + uri;
    }

    getAccountData() {
        return this.request(ApiConfig.urls.ACCOUNT_DATA_URI);
    }

    getAccountForm() {
        return this.request(ApiConfig.urls.ACCOUNT_FORM_URI);
    }

    login(user) {
        let loginUrl = this.buildUrl(ApiConfig.urls.LOGIN_URI);

        return axios
            .post(loginUrl, {
                username: user.username,
                password: user.password
            });
    }

    isAuthenticated() {
        let user = this.getUser();
        return (user && user.api_key);
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getAuthHeader() {
        if (this.isAuthenticated()) {
            return { Authorization: 'Bearer ' + this.getUser().api_key };
        } else {
            return {};
        }
    }

    logout() {
        localStorage.removeItem('user');
    }
}

export default new ApiService();
