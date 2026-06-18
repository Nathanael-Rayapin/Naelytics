export const errorMessages: Record<string, Record<string, string>> = {
    email: {
        required: 'L\'adresse email est obligatoire',
        invalidEmail: 'L\'adresse email est invalide',
    },
    password: {
        required: 'Le mot de passe est obligatoire',
    },
    confirmPassword: {
        required: 'La confirmation du mot de passe est obligatoire',
        mismatchPassword: 'Les mots de passe ne correspondent pas',
    },
};