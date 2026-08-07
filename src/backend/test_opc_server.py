import asyncio
from asyncua import Server


async def main():
    # Create OPC UA Server
    server = Server()

    # Set endpoint
    await server.init()
    server.set_endpoint("opc.tcp://0.0.0.0:4840/freeopcua/server/")

    # Register namespace
    uri = "http://sathya.opcua.server"
    idx = await server.register_namespace(uri)

    # Create an object called "Machine"
    objects = server.nodes.objects
    machine = await objects.add_object(idx, "Machine")

    # Add variables (tags)
    running = await machine.add_variable(idx, "Running", False)
    counter = await machine.add_variable(idx, "counter", 0)
    batch_production = await machine.add_variable(idx, "batch production", 0)
    


    # Make variables writable
    await running.set_writable()
    await counter.set_writable()
    await batch_production.set_writable()
    print("Namespace Index:", idx)

    print("Variables Created:")
    print("Running")
    print("counter")
    print("batch production")
    

    print("OPC UA Server started!")
    print("Endpoint: opc.tcp://localhost:4840/freeopcua/server/")

    async with server:
        while True:
            await asyncio.sleep(1)


if __name__ == "__main__":
    asyncio.run(main())