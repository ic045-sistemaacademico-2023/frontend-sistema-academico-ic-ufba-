import Sidebar from "../../componentes/Sidebar";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../componentes/Button";
import InputField from "../../componentes/Forms/InputField";
import SelectField from "../../componentes/Forms/SelectField";
import { turnos } from "./data";
import api from "../../utils/api";

import { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  coordenador: yup.number().required("O coordenador do curso é obrigatório"),
  turno: yup.string().required("O turno é obrigatório"),
  semestre: yup.string().required("O semestre é obrigatório"),
});

const initialValues = {
  nome: "",
  turno: "",
  semestre: "",
};

function RegisterCourse() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const [coordenadores, setCoordenadores] = useState([]);

  useEffect(() => {
    const fetchCoordenador = async () => {
      try {
        const response = await api.get(`/coordenador/all`);

        if (response.status == 200) {
          const coordenadores = response.data.map((coordenador) => {
            return {
              id: coordenador.id,
              value: parseInt(coordenador.id),
              name: coordenador.nome,
            };
          });
          setCoordenadores(coordenadores);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error ao carregar dados dos coordenadores");
      }
    };
    fetchCoordenador();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await api.post("/curso/", data);
      if (response.status === 201) {
        toast.success("Turma cadastrado com sucesso!");
      } else {
        toast.error("Erro ao cadastrar turma");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar curso!");
    }
  };

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-primary-100 p-5 z-10 shadow-lg rounded-lg m-10 flex flex-col"
      >
        <h1 className="text-xl text-gray-700 font-bold mb-6">
          Cadastrar Curso
        </h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            {...register("nome")}
            label={"Nome"}
            type={"text"}
            placeholder={"Nome do Curso"}
            error={errors.nome?.message}
          />
          <InputField
            {...register("semestre")}
            label={"Semestre"}
            placeholder={"Semestre"}
            error={errors.semestre?.message}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <SelectField
            {...register("coordenador")}
            label={"Coordenador do Curso"}
            options={coordenadores}
            placeholder={"Selecione o coordenador do curso"}
            error={errors.coordenador?.message}
          />
          <SelectField
            {...register("turno")}
            label={"Turno"}
            options={turnos}
            placeholder={"Selecione o turno"}
            error={errors.turno?.message}
          />
        </div>
        <div>
          <Button type="submit">Cadastrar</Button>
          <ToastContainer position="bottom-right" />
        </div>
      </form>
    </div>
  );
}

export default RegisterCourse;
