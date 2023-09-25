//import { cpf as cpfValidator } from "cpf-cnpj-validator";
import Sidebar from "../../componentes/Sidebar";

import { useState, useEffect } from "react";
import InputField from "../../componentes/Forms/InputField";
import TextField from "../../componentes/Forms/TextField";
import Button from "../../componentes/Button";
//import SelectField from "../../componentes/Forms/SelectField";

//import { roles } from "./roles";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  componenteCurricular: yup.string().required("O nome da disciplina é obrigatório"),
  codigo: yup.string().required("O código da disciplina é obrigatório"),
  departamento: yup.string().required("O departamento da disciplina é obrigatório"),
  ch: yup.number().integer("Insira um valor numérico").required("A carga horária da disciplina é obrigatória"),
  chTeorica: yup.number().integer("Insira um valor numérico").required("A carga horária teórica da disciplina é obrigatória"),
  chPratica: yup.number().integer("Insira um valor numérico").required("A carga horária prática da disciplina é obrigatória"),
  ementa: yup.string().required("A ementa da disciplina é obrigatória"),
  objetivos: yup.string().required("Os objetivos da disciplina são obrigatórios"),
  conteudo: yup.string().required("O conteúdo da disciplina é obrigatório"),
  bibliografia: yup.string().required("A bibliografia da disciplina é obrigatória"),
});

const initialValues = {
  codigo: "",
  componenteCurricular: "",
  ch: 0,
  chPratica: 0,
  chTeorica: 0,
  departamento: "",
  ementa: "",
  objetivos: "",
  conteudo: "",
  bibliografia: "",
};

function RegisterCourse() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const [success, setSuccess] = useState(false);

  const onSubmit = (data) => {
    setSuccess(true);
    console.log(data);
  };

  const [ch, setCh] = useState(0);
  const [chTeorica, setChTeorica] = useState(0);
  const [chPratica, setChPratica] = useState(0);

  // Atualiza o valor de ch sempre que chTeorica ou chPratica mudar
  useEffect(() => {
    const total = parseInt(chTeorica) + parseInt(chPratica);
    setCh(total);
    setValue('ch', total);  // Atualiza o valor do campo 'ch'
  }, [chTeorica, chPratica]);
  

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-primary-50 p-5 z-10 shadow-lg rounded-lg m-10 flex flex-col"
      >
        <h1 className="text-xl text-gray-700 font-bold mb-6">
          Cadastrar Disciplina
        </h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            {...register("componenteCurricular")}
            label={"Nome"}
            type={"text"}
            placeholder={"Nome da disciplina"}
            error={errors.componenteCurricular?.message}
          />
          <InputField
            {...register("codigo")}
            label={"Código da Disciplina"}
            type={"text"}
            placeholder={"Código da disciplina, ex: MAT123"}
            error={errors.codigo?.message}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            {...register("departamento")}
            label={"Departamento"}
            type={"text"}
            placeholder={"Departamento da disciplina"}
            error={errors.departamento?.message}
          />
          <div>
            <p className="block mb-2 text-sm font-medium text-gray-900 ml-2 text-left">
              Carga Horária: Teórica + Prática = Total
            </p>
            <div className="flex items-center">
              <div className="w-1/3">
                <InputField
                  {...register("chTeorica")}
                  value={chTeorica}
                  onChange={(e) => setChTeorica(e.target.value)}
                  type={"text"}
                  placeholder={"CH teórica"}
                  error={errors.chTeorica?.message}
                />
              </div>
              <div className="h-12 mx-2">+</div>
              <div className="w-1/3">
                <InputField
                  {...register("chPratica")}
                  value={chPratica}
                  onChange={(e) => setChPratica(e.target.value)}
                  type={"text"}
                  placeholder={"CH prática"}
                  error={errors.chPratica?.message}
                />
              </div>
              <div className="h-12 mx-2">=</div>
              <div className="w-1/3">
                <InputField
                  {...register("ch")}
                  value={ch}
                  type={"text"}
                  placeholder={"CH total"}
                  error={errors.ch?.message}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-1 md:gap-6">
          <TextField
            {...register("ementa")}
            label={"Ementa"}
            type={"text"}
            placeholder={"Ementa da disciplina..."}
            error={errors.ementa?.message}
          />
          <TextField
            {...register("objetivos")}
            label={"Objetivos"}
            type={"text"}
            placeholder={"Objetivos da disciplina..."}
            error={errors.objetivos?.message}
          />
          <TextField
            {...register("conteudo")}
            label={"Conteúdo"}
            type={"text"}
            placeholder={"Conteúdo da disciplina..."}
            error={errors.conteudo?.message}
          />
          <TextField
            {...register("bibliografia")}
            label={"Bibliografia"}
            type={"text"}
            placeholder={"Bibliografia da disciplina..."}
            error={errors.bibliografia?.message}
          />
        </div>
        <div>
          <Button type="submit">Cadastrar</Button>
          {success && (
            <p className="mt-5 text-sm text-center ml-1 text-green-500">
              <span className="font-medium">
                Disciplina cadastrado com sucesso!
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegisterCourse;
