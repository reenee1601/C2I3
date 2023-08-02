export const layout = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "418px",
}

export const tables = {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    justifyContent: "flex-start"
}

// later override the scrollable height
// overrides table header etc to be smaller

export const listOfInvoices = {
    marginLeft: "95px",
    marginBottom: "-2%",
    fontSize: "24px",
    fontWeight: "600",
    color: "var(--color-blue)"
}

export const missingInvoices = {
    marginTop: "3.5%",
    marginBottom: "-2%",
    marginLeft: "95px",
    fontSize: "24px",
    fontWeight: "600",
    color: "var(--color-blue)"
}

export const soaDisplay = {
    maxHeight: "400px",
    width: "600px",
    borderRadius: "12px",
    backgroundColor: "var(--color-white2)",
    justifyContent: "center"
}

export const tableContainer = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginTop: "3%",
};

export const scrollable = {
    width: "75%",
    height: "145px",
    display: "flex",
    justifyContent: "center",
    overflow: "scroll",
    overflowX: "auto"
};

export const customTable = {
    width: "100%",
    backgroundColor: "transparent",
    textAlign: "center",
    borderCollapse: "collapse",
};

export const td = {
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid #000000",
    height: "35px",
    lineHeight: "35px",
    fontSize: "14px",
};

export const th = {
    backgroundColor: "rgba(65, 142, 255, 1)",
    color: "var(--color-white2)",
    border: "none",
    fontSize: "15px",
    fontWeight: "600",
    height: "30px",
};

export const button = {
    width: "330px",
    height: "45px",
    flexShrink: "0",

    borderRadius: "15px",
    border: 'none',
    background: "var(--color-blue)",
    boxShadow: "-2px 4px 30px 0px rgba(0, 0, 0, 0.25)",

    color: "white",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
}

export const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0",
}