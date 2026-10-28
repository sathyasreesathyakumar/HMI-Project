import asyncio
from asyncua import Server


async def main():
    # =========================================================
    # CREATE OPC UA SERVER
    # =========================================================

    server = Server()

    await server.init()

    server.set_endpoint(
        "opc.tcp://0.0.0.0:4840/freeopcua/server/"
    )

    # Register namespace
    uri = "http://sathya.opcua.server"
    idx = await server.register_namespace(uri)

    # =========================================================
    # CREATE MACHINE OBJECT
    # =========================================================

    objects = server.nodes.objects

    machine = await objects.add_object(
        idx,
        "Machine"
    )

    # =========================================================
    # MACHINE TAGS
    # =========================================================

    running = await machine.add_variable(
        idx,
        "xOval_Running",
        False
    )

    counter = await machine.add_variable(
        idx,
        "counter",
        0
    )

    batch_production = await machine.add_variable(
        idx,
        "batch production",
        0
    )

    total_production = await machine.add_variable(
        idx,
        "total production",
        0
    )

    production_hr = await machine.add_variable(
        idx,
        "production / hour",
        0
    )

        # =========================================================
    # 24 HEAD / STATION TAGS
    #
    # These mirror the important PLC GVLVisu signals.
    # =========================================================

    head_selection_tags = []
    head_level_tags = []
    head_enable_tags = []
    active_sequence_head_tags = []

    head_down_fault_tags = []
    head_up_fault_tags = []
    sqz_fault_tags = []

    stroke_count_tags = []

    for i in range(1, 25):

        # -----------------------------------------------------
        # Head selection
        # GVLVisu.xHead_Selection[i]
        # -----------------------------------------------------

        tag = await machine.add_variable(
            idx,
            f"xHead_Selection[{i}]",
            False
        )
        await tag.set_writable()
        head_selection_tags.append(tag)

        # -----------------------------------------------------
        # Head level ON
        # GVLVisu.xHead_Level_On[i]
        # -----------------------------------------------------

        tag = await machine.add_variable(
            idx,
            f"xHead_Level_On[{i}]",
            False
        )
        await tag.set_writable()
        head_level_tags.append(tag)

        # -----------------------------------------------------
        # Head enable
        # GVLVisu.xSqz_Head_Enable[i]
        # -----------------------------------------------------

        tag = await machine.add_variable(
            idx,
            f"xSqz_Head_Enable[{i}]",
            False
        )
        await tag.set_writable()
        head_enable_tags.append(tag)

        # -----------------------------------------------------
        # Active sequence head
        # GVLVisu.xActive_Sequence_Head[i]
        # -----------------------------------------------------

        tag = await machine.add_variable(
            idx,
            f"xActive_Sequence_Head[{i}]",
            False
        )
        await tag.set_writable()
        active_sequence_head_tags.append(tag)

        # -----------------------------------------------------
        # Head-down fault
        # GVLVisu.xHeadDown_Fault[i]
        # -----------------------------------------------------

        tag = await machine.add_variable(
            idx,
            f"xHeadDown_Fault[{i}]",
            False
        )
        await tag.set_writable()
        head_down_fault_tags.append(tag)

        # -----------------------------------------------------
        # Head-up fault
        # GVLVisu.xHeadup_Fault[i]
        # -----------------------------------------------------

        tag = await machine.add_variable(
            idx,
            f"xHeadup_Fault[{i}]",
            False
        )
        await tag.set_writable()
        head_up_fault_tags.append(tag)

        # -----------------------------------------------------
        # Actual squeeze fault
        # GVLVisu.xSqzFault_Act[i]
        # -----------------------------------------------------

        tag = await machine.add_variable(
            idx,
            f"xSqzFault_Act[{i}]",
            False
        )
        await tag.set_writable()
        sqz_fault_tags.append(tag)

        # -----------------------------------------------------
        # Stroke count
        # GVLVisu.wSqz_Stroke_Count[i]
        # -----------------------------------------------------

        tag = await machine.add_variable(
            idx,
            f"wSqz_Stroke_Count[{i}]",
            0
        )
        await tag.set_writable()
        stroke_count_tags.append(tag)

            # =========================================================
    # OVAL / CAROUSEL MACHINE SIGNALS
    # =========================================================

    oval_running = await machine.add_variable(
        idx,
        "xOval_Running",
        False
    )

    oval_fwd_direction = await machine.add_variable(
        idx,
        "xOval_Fwd_Direction",
        True
    )

    oval_rev_direction = await machine.add_variable(
        idx,
        "xOval_Rev_Direction",
        False
    )

    regular_start = await machine.add_variable(
            idx,
            "xRegular_Start",
            False
        )

    regular_stop = await machine.add_variable(
            idx,
            "xRegular_Stop",
            False
        )

    reset_command = await machine.add_variable(
            idx,
            "xReset_Pb",
            False
        )

    await oval_running.set_writable()
    await oval_fwd_direction.set_writable()
    await oval_rev_direction.set_writable()

    await regular_start.set_writable()
    await regular_stop.set_writable()
    await reset_command.set_writable()

    # =========================================================
    # PRINT
    # =========================================================

    xPrint = await machine.add_variable(
        idx,
        "xPrint",
        False
    )

    print_on_delay = await machine.add_variable(
        idx,
        "PrintOnDelay",
        0
    )

    # =========================================================
    # LEVEL
    # =========================================================

    level = await machine.add_variable(
        idx,
        "xLevel",
        False
    )

    level_sequence_delay = await machine.add_variable(
        idx,
        "LevelSequenceDelay",
        0
    )

    head_selection = await machine.add_variable(
        idx,
        "HeadSelection",
        0
    )

    # =========================================================
    # MODE
    # =========================================================

    auto_mode = await machine.add_variable(
        idx,
        "AutoMode",
        False
    )

    manual_mode = await machine.add_variable(
        idx,
        "ManualMode",
        False
    )

    # =========================================================
    # ALARM
    # =========================================================

    alarm_active = await machine.add_variable(
        idx,
        "AlarmActive",
        False
    )

    alarm_code = await machine.add_variable(
        idx,
        "AlarmCode",
        0
    )

    alarm_message = await machine.add_variable(
        idx,
        "AlarmMessage",
        ""
    )

    # =========================================================
    # HEATER MASTER MODE
    # =========================================================

    heater_mode = await machine.add_variable(
        idx,
        "xHeater_Mode_on",
        False
    )

    await heater_mode.set_writable()

    # =========================================================
    # HEATER TAGS
    #
    # xHEATER1_AM  -> xO_HEATER1_OP
    # xHEATER2_AM  -> xO_HEATER2_OP
    # ...
    # xHEATER26_AM -> xO_HEATER26_OP
    # =========================================================

    heater_am_tags = []
    heater_output_tags = []

    for i in range(1, 27):

        # -----------------------------------------------------
        # Heater selection / command
        # -----------------------------------------------------

        heater_am = await machine.add_variable(
            idx,
            f"xHEATER{i}_AM",
            False
        )

        await heater_am.set_writable()

        # -----------------------------------------------------
        # Heater actual output
        # -----------------------------------------------------

        heater_output = await machine.add_variable(
            idx,
            f"xO_HEATER{i}_OP",
            False
        )

        await heater_output.set_writable()

        # Store references for the PLC simulation logic
        heater_am_tags.append(heater_am)
        heater_output_tags.append(heater_output)

    # =========================================================
    # SETTINGS
    # =========================================================

    index_delay = await machine.add_variable(
        idx,
        "DintIndexDelay",
        0
    )

    level_delay = await machine.add_variable(
        idx,
        "DintLvl_sec_DTime",
        0
    )

    print_delay = await machine.add_variable(
        idx,
        "DintPrintOnDelay",
        0
    )

    wip_off_delay = await machine.add_variable(
        idx,
        "DintWip_off_Delay",
        0
    )

    # =========================================================
    # MAKE OTHER VARIABLES WRITABLE
    # =========================================================

    await running.set_writable()
    await counter.set_writable()
    await batch_production.set_writable()
    await total_production.set_writable()
    await production_hr.set_writable()

    await xPrint.set_writable()
    await print_on_delay.set_writable()

    await level.set_writable()
    await level_sequence_delay.set_writable()
    await head_selection.set_writable()

    await auto_mode.set_writable()
    await manual_mode.set_writable()

    await alarm_active.set_writable()
    await alarm_code.set_writable()
    await alarm_message.set_writable()

    await index_delay.set_writable()
    await level_delay.set_writable()
    await print_delay.set_writable()
    await wip_off_delay.set_writable()

    # =========================================================
    # PRINT CREATED TAGS
    # =========================================================

    print()
    print("==============================================")
    print("Namespace Index:", idx)
    print("==============================================")

    print("Variables Created:")
    print("----------------------------------------------")

    print("Running")
    print("counter")
    print("batch production")
    print("total production")
    print("production / hour")

    print("xPrint")
    print("PrintOnDelay")

    print("xLevel")
    print("LevelSequenceDelay")
    print("HeadSelection")

    print("AutoMode")
    print("ManualMode")

    print("AlarmActive")
    print("AlarmCode")
    print("AlarmMessage")

    print("xHeater_Mode_on")

    print("xHEATER1_AM to xHEATER26_AM")
    print("xO_HEATER1_OP to xO_HEATER26_OP")

    print("DintIndexDelay")
    print("DintLvl_sec_DTime")
    print("DintPrintOnDelay")
    print("DintWip_off_Delay")

    print()
    print("OPC UA Server started!")
    print(
        "Endpoint: opc.tcp://localhost:4840/freeopcua/server/"
    )
    print("==============================================")

    # =========================================================
    # START SERVER
    # =========================================================

    async with server:

        while True:
           
                    # =================================================
            # MACHINE START / STOP / RESET SIMULATION
            # =================================================

            start_pressed = await regular_start.read_value()
            stop_pressed = await regular_stop.read_value()
            reset_pressed = await reset_command.read_value()

            # START
            if start_pressed:
                await oval_running.write_value(True)
                await oval_fwd_direction.write_value(True)
                await oval_rev_direction.write_value(False)

                # Reset start pushbutton after processing
                await regular_start.write_value(False)


            # STOP
            if stop_pressed:
                await oval_running.write_value(False)

                # Reset stop pushbutton after processing
                await regular_stop.write_value(False)


            # RESET
            if reset_pressed:
                await oval_running.write_value(False)
                await oval_fwd_direction.write_value(False)
                await oval_rev_direction.write_value(False)

                # Reset command after processing
                await reset_command.write_value(False)

            # =================================================
            # HEATER PLC SIMULATION
            # =================================================

            # Read master heater mode
            master_mode = await heater_mode.read_value()

                # Process all 26 heaters
            for i in range(26):

                    # Read heater AM value
                    heater_selected = await heater_am_tags[i].read_value()

                    # -------------------------------------------------
                    # MASTER ON + HEATER SELECTED
                    #       -> OUTPUT ON
                    #
                    # Otherwise
                    #       -> OUTPUT OFF
                    # -------------------------------------------------

                    if master_mode and heater_selected:

                        await heater_output_tags[i].write_value(
                            True
                        )

                    else:

                        await heater_output_tags[i].write_value(
                            False
                        )

            # Run the PLC simulation every 500 ms
            await asyncio.sleep(0.5)


# =============================================================
# PROGRAM ENTRY POINT
# =============================================================

if __name__ == "__main__":
    asyncio.run(main())

