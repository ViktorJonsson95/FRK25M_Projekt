// Kontrollerar att username är giltigt
// Regler:
// - 3 till 20 tecken
// - endast bokstäver och siffror
export function isValidUsername(username) {
    const regex = /^[a-zA-Z0-9]{3,20}$/;
    return regex.test(username);
}
// Firebase Auth kräver email.
// Tar username och gör om till en "fake email".
export function usernameToEmail(username) {
    return `${username}@todo.app`;
}