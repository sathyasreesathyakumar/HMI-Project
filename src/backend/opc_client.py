from opcua import Client
from opcua import ua
from dotenv import load_dotenv
import os


client = None
tag_cache = {}

# Load .env
load_dotenv()

# OPC Server URL
OPC_SERVER_URL = os.getenv("OPC_SERVER_URL")

# Global Client
client = None


# -----------------------------
# Connect
# -----------------------------
def connect():
    global client

    try:
        client = Client(OPC_SERVER_URL)
        client.connect()

        tag_cache.clear()

        objects = client.get_objects_node()

        print("Objects Node:", objects)
        children = objects.get_children()

        print("\nImmediate children of Objects:\n")

        for child in children:
            print(child, child.get_browse_name())

        browse_tags(objects)

        print(f"{len(tag_cache)} tags loaded.\n")

        print("Machine tags found:\n")

        for tag in tag_cache.keys():
            if "Machine" in tag:
                print(tag)

        print("\nConnected to OPC Server\n")

        return {
            "status": "success",
            "message": "Connected to OPC Server"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
# browse tags
def browse_tags(node, path=""):
    global tag_cache

    try:
        children = node.get_children()

        for child in children:

            browse_name = child.get_browse_name()

            current_path = (
                browse_name.Name
                if path == ""
                else f"{path}.{browse_name.Name}"
            )

            tag_cache[current_path] = child

            browse_tags(child, current_path)

    except Exception:
        return
# search tags
def find_tag(tag_name):
    # Exact path match
    if tag_name in tag_cache:
        return tag_cache[tag_name]

    # Search by ending name
    matches = [
        node
        for path, node in tag_cache.items()
        if path.endswith(f".{tag_name}") or path == tag_name
    ]

    if len(matches) == 1:
        return matches[0]

    if len(matches) > 1:
        raise Exception(f"Multiple tags found with name '{tag_name}'")

    raise Exception(f"Tag '{tag_name}' not found")
# -----------------------------
# Disconnect
# -----------------------------
def disconnect():
    global client

    try:
        if client:
            client.disconnect()
            client = None

        return {
            "status": "success",
            "message": "Disconnected Successfully"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


# -----------------------------
# Read Tag
# -----------------------------
def read_tag(tag_name):

    if client is None:
        return {
            "status": "error",
            "message": "Not connected to OPC Server"
        }

    try:

        node = find_tag(tag_name)

        value = node.get_value()

        return {
            "status": "success",
            "node": tag_name,
            "value": value
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


# -----------------------------
# Write Tag
# -----------------------------
def write_tag(tag_name, value):

    if client is None:
        return {
            "status": "error",
            "message": "Not connected to OPC Server"
        }

    try:
        node = find_tag(tag_name)

        print("Writing to:", tag_name)
        print("Value:", value)

        variant_type = node.get_data_type_as_variant_type()
        print("Variant Type:", variant_type)

        node.set_value(
            ua.DataValue(
                ua.Variant(value, variant_type)
            )
        )

        return {
            "status": "success",
            "node": tag_name,
            "value": value,
            "message": "Value Written Successfully"
        }

    except Exception as e:
        print(e)

        return {
            "status": "error",
            "message": str(e)
        }