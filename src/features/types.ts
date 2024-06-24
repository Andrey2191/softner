export interface AuthState {
    id: string | null;
    name: string | null;
    email: string | null;
    language: string | null;
    timeZone: string | null;
    loading: boolean;
    error: string | null;
}

export interface UserProfile {
    email: string;
    id: string;
    language: string;
    name: string;
    time_zone: string;
}

export interface User {
    id: number;
    email: string;
}

export interface LoginData {
    email: string;
    password: string;
    remember: boolean;
}

export interface RegistrationData {
    email: string;
    language: string;
    confirmPassword: string;
    Name: string;
    password: string;
    time_zone: string;
}

export interface AuthModalProps {
    onClose: () => void;
}

export interface RegisterFormProps {
    switchToLogin: () => void;
}

export interface BurgerMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
    handleAuthButtonClick: () => void;
}