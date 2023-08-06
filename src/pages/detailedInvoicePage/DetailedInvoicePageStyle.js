export const topPart = {
    display: "flex",
    flexDirection: "row",
    marginLeft: "70px",
    marginTop: "2%",
}

export const goBackStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

export const goBackLinkStyle = {
  textDecoration: "none",
  marginLeft: "-5%",
  marginRight: "2%",
}

export const goBackButtonStyle = {
  background: "transparent",
  width: "125px",
  height: "43px",
  transform: "rotate(90deg)",
  marginTop: "40px",

  color: "#3A3A3A",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "normal",

  border: "none",
}
  
export const invoiceTitle = {
  color: "#3A3A3A",
  fontSize: "36px",
  fontWeight: "700",
  marginBottom: "0",
};
  
export const supplierName = {
  marginTop: "5px",
  marginBottom: "0",
  color: "var(--color-grey)",
  fontWeight: "600",
};

export const issuedDate = {
  margin: "0",
  color: "var(--color-grey)",
  fontWeight: "600",
};

export const dueDate = {
  margin: "0",
  color: "var(--color-grey)",
  fontWeight: "600",
};

export const tableContainer = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "100%",
  marginTop: "1.5%",
};

export const scrollable = {
  width: "80%",
  height: "250px",
  display: "flex",
  justifyContent: "center",
  overflow: "scroll",
  overflowX: "auto",
};

export const customTable = {
  maxWidth: "100%",
  backgroundColor: "transparent",
  textAlign: "center",
  borderCollapse: "collapse",
};

// <td style={td}>
export const td = {
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "1px solid #000000",
  height: "50px",
  lineHeight: "50px",
  fontSize: "15px",
};
  
// <th style={th}>
export const th = {
  backgroundColor: "rgba(255, 232, 232, 0.8)",
  /* borderRadius: "12px", */
  color: "#3A3A3A",
  border: "none",
  fontSize: "15px",
  fontWeight: "600",
};

export const bottomPart = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "fixed",
    bottom: "5px",
    width: "100%",
    padding: "10px 38px",
  };

export const rightBottom = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  position: "absolute",
  right: "38px",
  bottom: "5px",
  padding: "5px 0",
};

export const totalAmount = {
  marginRight: "100px",
  fontSize: "15px",
  marginBottom: "0",
};

export const editInput = {
  fontSize: "15px",
  padding: "1px",
  borderRadius: "4px",
  border: "1px solid #ccc",
}

// .transparent-table thead th:first-child {
//   border-top-left-radius: 12px;
//   border-bottom-left-radius: 12px;
// }

// .transparent-table thead th:last-child {
//   border-top-right-radius: 12px;
//   border-bottom-right-radius: 12px;
// }
