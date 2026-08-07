const API_URL = "http://127.0.0.1:8000";

export async function connectOPC() {
    const response = await fetch(`${API_URL}/opc/connect`);
    return await response.json();
}

export async function disconnectOPC() {
    const response = await fetch(`${API_URL}/opc/disconnect`);
    return await response.json();
}

export async function startMachine() {
    const response = await fetch(`${API_URL}/machine/start`, {
        method: "POST",
    });

    return await response.json();
}

export async function stopMachine() {
    const response = await fetch(`${API_URL}/machine/stop`, {
        method: "POST",
    });

    return await response.json();
}

export async function readTag(tagName: string) {
    const response = await fetch(
        `${API_URL}/opc/read?tag_name=${encodeURIComponent(tagName)}`
    );

    return await response.json();
}

export async function writeTag(tagName: string, value: number | boolean | string) {
    const response = await fetch(`${API_URL}/opc/write`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tag_name: tagName,
            value: value,
        }),
    });

    return await response.json();
}