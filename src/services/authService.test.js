import {
    login,
    register,
    logout,
    getCurrentUser,
    isAuthenticated,
    isAdmin,
    updateCurrentUser
} from './authService';

describe('AuthService', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    describe('login', () => {
        it('should login with valid credentials', () => {
            const result = login('admin@pasteleria.cl', 'admin123');
            expect(result.success).toBe(true);
            expect(result.user).toBeTruthy();
            expect(result.user.email).toBe('admin@pasteleria.cl');
        });

        it('should not login with invalid credentials', () => {
            const result = login('admin@pasteleria.cl', 'wrongpassword');
            expect(result.success).toBe(false);
            expect(result.message).toBeTruthy();
        });

        it('should store user in localStorage after successful login', () => {
            login('admin@pasteleria.cl', 'admin123');
            const storedUser = localStorage.getItem('pasteleria_user');
            expect(storedUser).toBeTruthy();
        });

        it('should set authentication flag in localStorage', () => {
            login('admin@pasteleria.cl', 'admin123');
            const authFlag = localStorage.getItem('pasteleria_auth');
            expect(authFlag).toBe('true');
        });
    });

    describe('register', () => {
        it('should register a new user', () => {
            const result = register({
                name: 'New User',
                email: 'newuser@test.com',
                password: 'password123'
            });
            expect(result.success).toBe(true);
            expect(result.user).toBeTruthy();
            expect(result.user.name).toBe('New User');
        });

        it('should not register user with existing email', () => {
            const result = register({
                name: 'Admin',
                email: 'admin@pasteleria.cl',
                password: 'test'
            });
            expect(result.success).toBe(false);
            expect(result.message).toBeTruthy();
        });

        it('should automatically login after successful registration', () => {
            register({
                name: 'Auto Login User',
                email: 'autologin@test.com',
                password: 'password123'
            });
            expect(isAuthenticated()).toBe(true);
        });
    });

    describe('logout', () => {
        it('should clear authentication data', () => {
            login('admin@pasteleria.cl', 'admin123');
            logout();
            expect(localStorage.getItem('pasteleria_auth')).toBeNull();
            expect(localStorage.getItem('pasteleria_user')).toBeNull();
        });

        it('should set isAuthenticated to false after logout', () => {
            login('admin@pasteleria.cl', 'admin123');
            logout();
            expect(isAuthenticated()).toBe(false);
        });
    });

    describe('getCurrentUser', () => {
        it('should return null when not logged in', () => {
            const user = getCurrentUser();
            expect(user).toBeNull();
        });

        it('should return user when logged in', () => {
            login('admin@pasteleria.cl', 'admin123');
            const user = getCurrentUser();
            expect(user).toBeTruthy();
            expect(user.email).toBe('admin@pasteleria.cl');
        });
    });

    describe('isAuthenticated', () => {
        it('should return false when not logged in', () => {
            expect(isAuthenticated()).toBe(false);
        });

        it('should return true when logged in', () => {
            login('admin@pasteleria.cl', 'admin123');
            expect(isAuthenticated()).toBe(true);
        });
    });

    describe('isAdmin', () => {
        it('should return false when not logged in', () => {
            expect(isAdmin()).toBe(false);
        });

        it('should return true for admin user', () => {
            login('admin@pasteleria.cl', 'admin123');
            expect(isAdmin()).toBe(true);
        });

        it('should return false for non-admin user', () => {
            login('juan@example.com', '123456');
            expect(isAdmin()).toBe(false);
        });
    });

    describe('updateCurrentUser', () => {
        it('should update user data in localStorage', () => {
            login('admin@pasteleria.cl', 'admin123');
            const updated = updateCurrentUser({ name: 'Updated Name' });
            expect(updated.name).toBe('Updated Name');
            const storedUser = getCurrentUser();
            expect(storedUser.name).toBe('Updated Name');
        });

        it('should return null when no user is logged in', () => {
            const result = updateCurrentUser({ name: 'Test' });
            expect(result).toBeNull();
        });
    });
});
