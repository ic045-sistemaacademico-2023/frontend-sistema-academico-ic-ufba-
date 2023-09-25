function UserTable({ users }) {
    return (
        <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-900 uppercase bg-gray-5">
                    <tr>
                        <th scope="col" className="px-6 py-3">CPF</th>
                        <th scope="col" className="px-6 py-3">Nome</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Cargo</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={index}
                            className={`${index % 2 == 0 ? "bg-white" : "bg-primary-50"
                                } border border-gray-100 hover:bg-primary-100`}
                        >
                            <td className="px-6 py-4">{user.cpf}</td>
                            <td className="px-6 py-4">{user.nome}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.cargo}</td>
                            <td className="px-6 py-4">{user.status}</td>
                            <td className="px-6 py-4">
                                <button className="bg-primary-700 text-white px-4 mr-2 py-2 rounded hover:bg-primary-800">Editar</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;