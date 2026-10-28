import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readTag, writeTag } from "../../services/opcService";
import "./HMISettings.css";

type Setting = {
  label: string;
  tag: string;
};

const SETTINGS: Setting[] = [
  {
    label: "INDEX DELAY",
    tag: "DintIndexDelay",
  },
  {
    label: "LEVEL SEQUENCE DELAY",
    tag: "DintLvl_sec_DTime",
  },
  {
    label: "PRINT ON DELAY",
    tag: "DintPrintOnDelay",
  },
  {
    label: "WIP OFF DELAY",
    tag: "DintWip_off_Delay",
  },
];

function HMISettings() {
  const navigate = useNavigate();

  const [values, setValues] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  async function loadSettings() {
    try {
      const results = await Promise.all(
        SETTINGS.map((setting) =>
          readTag(setting.tag)
        )
      );

      const newValues: Record<string, number> = {};

      results.forEach((result, index) => {
        const tag = SETTINGS[index].tag;

        if (typeof result?.value === "number") {
          newValues[tag] = result.value;
        }
      });

      console.log("Settings:", newValues);

      setValues(newValues);
    } catch (error) {
      console.error(
        "Failed to read settings:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  function handleChange(
    tag: string,
    value: string
  ) {
    const numericValue = Number(value);

    setValues((previous) => ({
      ...previous,
      [tag]: numericValue,
    }));
  }

  async function handleSave(tag: string) {
    const value = values[tag];

    try {
      const result = await writeTag(
        tag,
        value
      );

      console.log(`${tag} write:`, result);

      if (result?.status !== "success") {
        console.error(
          `Failed to write ${tag}:`,
          result
        );
      }
    } catch (error) {
      console.error(
        `Failed to write ${tag}:`,
        error
      );
    }
  }

  return (
    <div className="hmi-settings">

      <div className="hmi-settings-header">
        SETTINGS
      </div>

      <div className="hmi-settings-panel">

        {SETTINGS.map((setting) => (
          <div
            className="hmi-settings-row"
            key={setting.tag}
          >

            <span>
              {setting.label}
            </span>

            <div className="hmi-settings-control">

              <input
                type="number"
                value={values[setting.tag] ?? ""}
                disabled={loading}
                onChange={(event) =>
                  handleChange(
                    setting.tag,
                    event.target.value
                  )
                }
              />

              <button
                type="button"
                onClick={() =>
                  handleSave(setting.tag)
                }
                disabled={
                  loading ||
                  values[setting.tag] === undefined
                }
              >
                SAVE
              </button>

            </div>

          </div>
        ))}

      </div>

      <button
        type="button"
        className="hmi-settings-back"
        onClick={() => navigate("/hmi")}
      >
        ← BACK
      </button>

    </div>
  );
}

export default HMISettings;