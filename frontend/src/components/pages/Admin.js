import React, { Fragment, useState } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import AdminProduct from "../adminProduct/AdminProduct";

const Admin = ({ isAuthenticated, isAdmin, isLoading }) => {
  const [id, setId] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStates = (creating, updating) => {
    setIsCreating(creating);
    setIsUpdating(updating);
  };

  const defaultTag = () => (
    <Fragment>
      <button onClick={() => updateStates(true, false)}>
        Criar novo produto
      </button>
      <div className="admin__update">
        <button onClick={() => updateStates(false, true)}>
          Alterar produto
        </button>
        <input
          type="number"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          min="1"
        />
      </div>
    </Fragment>
  );

  if (isLoading) {
    return <div>Estamos validando suas credenciais</div>;
  }

  if (!isAuthenticated || isAdmin == "no") {
    return <Redirect to="/" />;
  }
  return (
    <div className="admin">
      <h1> Olá administrador</h1>
      {!isCreating && !isUpdating && defaultTag()}
      {isCreating && !isUpdating && (
        <AdminProduct updateStates={updateStates} />
      )}
      {!isCreating && isUpdating && (
        <AdminProduct updateStates={updateStates} id={id} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  isAdmin: state.user.isAdmin,
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps, {})(Admin);
