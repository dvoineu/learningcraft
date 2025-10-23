# Auth Module

Authentication module providing user management functionality.

## Features

- Email/password authentication
- Google OAuth integration
- Password reset functionality
- User session management
- Protected route components

## Components

- `AuthGuard` - Protects routes requiring authentication
- `GoogleSignInButton` - Google OAuth sign-in button
- `SignInForm` - Email/password sign-in form
- `SignUpForm` - User registration form
- `UserMenu` - User dropdown menu

## Hooks

- `useAuth()` - Main authentication hook with user state and methods
- `useIsAuthenticated()` - Simple authentication status check

## Services

- `authService` - Core authentication operations

## Usage

```tsx
import { useAuth, AuthGuard } from '@/modules/auth';

function MyComponent() {
  const { user, signIn, signOut, isAuthenticated } = useAuth();
  
  return (
    <AuthGuard>
      <div>Welcome, {user?.name}!</div>
    </AuthGuard>
  );
}
```

## Types

- `User` - User profile interface
- `AuthState` - Authentication state
- `SignInCredentials` - Sign-in form data
- `SignUpCredentials` - Registration form data
