import asyncio
from asyncua import Client


async def main():

    url = "opc.tcp://192.168.5.99:4840"

    print("Connecting...")
    print(url)

    client = Client(url)

    try:
        await client.connect()

        print("================================")
        print("CONNECTED SUCCESSFULLY")
        print("================================")

        objects = client.nodes.objects

        children = await objects.get_children()

        print("Objects found:")

        for child in children:
            name = await child.read_browse_name()
            print(" -", name.Name)

    except Exception as e:
        print("CONNECTION FAILED")
        print(type(e).__name__)
        print(e)

    finally:
        try:
            await client.disconnect()
        except:
            pass


if __name__ == "__main__":
    asyncio.run(main())