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

export async function resetMachine() {
    const response = await fetch(`${API_URL}/machine/reset`, {
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

export async function readStationSelections() {
    const results = await Promise.all(
        Array.from({ length: 24 }, (_, index) =>
            readTag(`Machine.xHead_Selection[${index + 1}]`)
        )
    );

    return results.map((result) => {
        if (result.status === "success") {
            return Boolean(result.value);
        }

        console.error("Station selection read failed:", result.message);
        return false;
    });
}

export async function readStationFaults() {
  const results = await Promise.all(
    Array.from({ length: 24 }, (_, index) =>
      Promise.all([
        readTag(`Machine.xSqzFault_Act[${index + 1}]`),
        readTag(`Machine.xHeadDown_Fault[${index + 1}]`),
        readTag(`Machine.xHeadup_Fault[${index + 1}]`),
      ])
    )
  );

  return results.map(([sqz, down, up]) => ({
    squeezeFault:
      sqz.status === "success" && Boolean(sqz.value),

    headDownFault:
      down.status === "success" && Boolean(down.value),

    headUpFault:
      up.status === "success" && Boolean(up.value),
  }));
}

export async function readHeadLevels() {
  const results = await Promise.all(
    Array.from({ length: 24 }, (_, index) =>
      readTag(`Machine.xHead_Level_On[${index + 1}]`)
    )
  );

  return results.map((result) =>
    result.status === "success"
      ? Boolean(result.value)
      : false
  );
}

export async function readOvalState() {
    const [running, forward, reverse] =
        await Promise.all([
            readTag("Machine.xOval_Running"),
            readTag("Machine.xOval_Fwd_Direction"),
            readTag("Machine.xOval_Rev_Direction"),
        ]);

    return {
        running:
            running.status === "success"
                ? Boolean(running.value)
                : false,

        forward:
            forward.status === "success"
                ? Boolean(forward.value)
                : false,

        reverse:
            reverse.status === "success"
                ? Boolean(reverse.value)
                : false,
    };
}