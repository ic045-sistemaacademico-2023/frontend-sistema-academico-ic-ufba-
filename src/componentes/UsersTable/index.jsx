import { toast } from "react-toastify";
import Button from "../../componentes/Button";
import api from "../../utils/api";

import { roles, status } from "./data";

function UserTable({ users, isManager = false, fetchUsers }) {
  async function deleteUser(id) {
    try {
      const response = await api.delete(`/user/${id}`);
      if (response.status === 204) {
        toast.success("Usuário deletado com sucesso!");
        fetchUsers();
      } else {
        toast.error("Erro ao deletar usuário");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar usuário");
    }
  }
  return (
    <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-900 uppercase bg-gray-5">
          <tr>
            <th scope="col" className="px-6 py-3">
              CPF
            </th>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Cargo
            </th>
            {!isManager && (
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            )}
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className={`${
                index % 2 == 0 ? "bg-white" : "bg-primary-50"
              } border border-gray-100 hover:bg-primary-100`}
            >
              <td className="px-6 py-4">{user.cpf}</td>
              <td className="px-6 py-4">{user.nome}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{roles[user.role]}</td>
              {!isManager && (
                <td className="px-6 py-4">{status[user.status]}</td>
              )}
              {isManager ? (
                <td className="px-6 py-4">
                  <Button>Aprovar</Button>
                  <Button secondary color="">
                    Recusar
                  </Button>
                </td>
              ) : (
                <td className="px-6 py-4 min-w-[64px]">
                  <Button secondary href={`/usuario/${user.id}`}>
                    Editar
                  </Button>
                  <Button onClick={() => deleteUser(user.id)}>Deletar</Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
