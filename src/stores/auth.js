import { defineStore } from 'pinia';
import router from '../router';
import apiService from '../services/api-service';

export const useAuthStore = defineStore('auth', {
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {

        async login(user) {

            let self = this;
            
            const response = await apiService.login({
                username: user.username,
                password: user.password
            })

            if (response.data.api_key) {
                self.user = response.data;
                localStorage.setItem('user', JSON.stringify(response.data));
            } else {
                throw new Error('Login failed')
            }
        },

        logout() {
            this.user = null;
            this.isLoggedIn = false;
            localStorage.removeItem('user');
            router.push('/');
        },
    }
});
