export const GOOGLE_SHEETS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzz3WXD3m5YbIrHooZrx5hUvoPWWNxtpOkSJGeUgMvAzutwvmwckBi2Kt0mF6vZ37BT/exec';

export async function submitToGoogleSheets(data) {
  const response = await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return { success: true };
}