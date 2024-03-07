
async function RegistUser(email,U_permission,U_Type, U_EmployeeNumber, U_Name, U_Foto, U_DirectReports,U_StartingDate,U_Pais,U_Cidade,U_Role,U_Seniority,U_group) {
  try {
    const response = await fetch("http://localhost:3000/api/addNewUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        U_permission: U_permission,
        U_Type: U_Type,
        U_EmployeeNumber: U_EmployeeNumber,
        U_Name: U_Name,
        U_Foto: U_Foto,
        U_DirectReports: U_DirectReports,
        U_StartingDate: U_StartingDate,
        U_Pais: U_Pais,
        U_Cidade: U_Cidade,
        U_Role: U_Role,
        U_Seniority: U_Seniority,
        U_group: U_group,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro registar utilizador");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

export async function Regist(credentials) {
    const U_Type = credentials.get("userType");
    const U_permission = credentials.get("adminRights");
    const U_EmployeeNumber = credentials.get("employeeNumber");
    const U_Role = credentials.get("role");
    const U_Seniority = credentials.get("seniority");
    const U_Name = credentials.get("completeName");
    const U_Foto = credentials.get("photo");
    const email = credentials.get("email");
    const U_Team = credentials.get("team");
    const U_Leader = credentials.get("leader");
    const U_Department = credentials.get("department");
    const U_group = credentials.get("groups");
    const U_Pais = credentials.get("country");
    const U_Cidade = credentials.get("city");

  
  


  try {
    
    if (response.code == 200) {
      
  } catch (error) {}

 



  return res;
}
