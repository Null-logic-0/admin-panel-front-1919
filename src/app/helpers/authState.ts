import { atom } from 'recoil';

export interface Admin {
    id: string;
    name: string;
    email: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    Admin?: Admin | null;
    role?: string;
}

const initialAuthState: AuthState = {
    isAuthenticated: false,
    Admin: null,
    role: '',
};

const AUTH_STATE_KEY = 'authState';

export const authState = atom<AuthState>({
    key: AUTH_STATE_KEY,
    default: initialAuthState,
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
            if (typeof window !== 'undefined') {
                const savedAuth = localStorage.getItem('auth');
                if (savedAuth) {
                    try {
                        setSelf(JSON.parse(savedAuth));
                    } catch (error) {
                        console.error('Failed to parse auth state from localStorage:', error);
                    }
                }

                onSet((newAuthState, _, isLogout) => {
                    if (newAuthState.isAuthenticated) {
                        localStorage.setItem('auth', JSON.stringify(newAuthState));
                    } else {
                        localStorage.removeItem('auth');
                        localStorage.removeItem('accesstoken');
                        setSelf(initialAuthState);
                    }
                });
            }
        },
    ],
});
