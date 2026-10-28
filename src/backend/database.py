import pyodbc


SERVER = r"DESKTOP-VKRMBR2\SQLEXPRESS"
DATABASE = "HMIDB"

CONNECTION_STRING = (
    "DRIVER={ODBC Driver 18 for SQL Server};"
    f"SERVER={SERVER};"
    f"DATABASE={DATABASE};"
    "Trusted_Connection=yes;"
    "TrustServerCertificate=yes;"
)


def get_connection():
    return pyodbc.connect(CONNECTION_STRING)


def test_connection():
    try:
        connection = get_connection()
        connection.close()

        print("SQL Server connected successfully!")

        return {
            "status": "success",
            "message": "SQL Server connected successfully"
        }

    except Exception as e:
        print("SQL Server connection failed:", e)

        return {
            "status": "error",
            "message": str(e)
        }
def save_tag_value(tag_name, value):
    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            UPDATE MachineTags
            SET CurrentValue = ?, LastUpdated = GETDATE()
            WHERE TagName = ?
            """,
            str(value),
            tag_name
        )

        connection.commit()

        cursor.close()
        connection.close()

        return {
            "status": "success",
            "message": f"{tag_name} saved successfully"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }