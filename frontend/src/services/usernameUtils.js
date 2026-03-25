// Kontrollerar att username är giltigt
// Regler:
// - 3 till 20 tecken
// - endast bokstäver och siffror
export const isValidUsername = (username) => {
    const regex = /^[a-zA-Z0-9]{3,20}$/; // regex som matchar tillåtna usernames
    return regex.test(username); // true om giltigt, annars false
}
// Firebase Auth kräver email.
// Tar username och gör om till en "fake email".
export const usernameToEmail = (username) => {
    return `${username}@todo.app`;
}