from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import opc_client

app = FastAPI(
    title="HMI Backend",
    version="1.0.0"
)

# -----------------------------
# Enable CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Request Model
# -----------------------------
class TagData(BaseModel):
    tag_name: str
    value: bool | int | float | str


# -----------------------------
# Home
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "HMI Backend is Running"
    }


# -----------------------------
# OPC Connection
# -----------------------------
@app.get("/opc/connect")
def connect():
    return opc_client.connect()


@app.get("/opc/disconnect")
def disconnect():
    return opc_client.disconnect()


# -----------------------------
# Read Tag
# -----------------------------
@app.get("/opc/read")
def read(tag_name: str):
    return opc_client.read_tag(tag_name)


# -----------------------------
# Write Tag
# -----------------------------
@app.post("/opc/write")
def write(tag: TagData):
    return opc_client.write_tag(
        tag.tag_name,
        tag.value
    )


# -----------------------------
# Machine Controls
# -----------------------------
@app.post("/machine/start")
def start():
    return opc_client.write_tag("Running", True)


@app.post("/machine/stop")
def stop():
    return opc_client.write_tag("Running", False)