const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const callAPI = async (url: string, body: any) => {
    const response = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
}