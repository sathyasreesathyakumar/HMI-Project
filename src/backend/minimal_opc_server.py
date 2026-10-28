import asyncio
from asyncua import Server


async def main():

    server = Server()

    await server.init()

    server.set_endpoint(
        "opc.tcp://192.168.5.99:4840"
    )

    uri = "http://sathya.test.opcua"
    idx = await server.register_namespace(uri)

    objects = server.nodes.objects

    machine = await objects.add_object(
        idx,
        "Machine"
    )

    test_tag = await machine.add_variable(
        idx,
        "TestTag",
        False
    )

    await test_tag.set_writable()

    print("====================================")
    print("MINIMAL OPC UA SERVER")
    print("Endpoint:")
    print("opc.tcp://192.168.5.99:4840")
    print("====================================")

    async with server:

        while True:
            await asyncio.sleep(1)


if __name__ == "__main__":
    asyncio.run(main())