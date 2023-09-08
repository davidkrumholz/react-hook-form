import { useState } from "react";
import { useForm } from "react-hook-form";
import {Toast, ToastHeader, ToastBody} from "reactstrap";
import "./App.css";

function App() {
  const [productCreate, setProductCreate] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createProduct = async (dataProduct) => {
    const response = await fetch(
      "https://javascript27g-default-rtdb.firebaseio.com/products/.json",
      {
        method: "POST",
        body: JSON.stringify(dataProduct),
      }
    );
    const data = await response.json();
    console.log(data);
    setProductCreate(true);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form
              onSubmit={handleSubmit((data) => createProduct(data))}
              className="bg-dark text-white rounded p-3"
              noValidate
            >
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Nombre"
                  {...register("name", {
                    required: { value: true, message: "El campo es requerido" },
                    minLength: { value: 5, message: "Mínimo 5 caracteres" },
                  })}
                />
                {errors.name && (
                  <p className="font-weight-bold m-0">{errors.name.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Descripción"
                  {...register("description", {
                    required: { value: true, message: "El campo es requerido" },
                    maxLength: { value: 30, message: "Maximo 30 caracteres" },
                  })}
                />
                {errors.description && (
                  <p className="font-weight-bold m-0">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="price">Precio</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="Precio"
                  {...register("price", {
                    required: { value: true, message: "El campo es requerido" },
                    pattern: {
                      value: /^[0-9]/,
                      message: "Solo se aceptan numeros",
                    },
                  })}
                />
                {errors.price && (
                  <p className="font-weight-bold m-0">{errors.price.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="picture">Imagen</label>
                <input
                  type="text"
                  className="form-control"
                  id="picture"
                  placeholder="Imagen"
                  {...register("picture", {
                    required: { value: true, message: "El campo es requerido" },
                  })}
                />
                {errors.picture && (
                  <p className="font-weight-bold m-0">
                    {errors.picture.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="category">Categoría</label>
                <select
                  className="form-select"
                  {...register("category", {
                    required: { value: true, message: "El campo es requerido" },
                  })}
                >
                  <option defaultValue={""}>Selecciona una opción</option>
                  <option value="Computadoras">Computadoras</option>
                  <option value="Impresoras">Impresoras</option>
                  <option value="Barbies">Barbies</option>
                </select>
                {errors.category && (
                  <p className="font-weight-bold m-0">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn-light mt-3">
                Guardar producto
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
