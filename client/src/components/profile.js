import React from "react";
import AuthService from "../services/auth.service";
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
const formatToday = hoy.toLocaleDateString();

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
    <header className="jumbotron">
    {currentUser ? (
        <div>
        <h1> Bienvenido,
          <strong> {currentUser.user}</strong> 
        </h1>
      <h3>
      <strong>Hoy es {formatToday}</strong>
      </h3>
      </div>
     ) : (
     <div>
     <h1>Bienvenido,
            <strong> Invitado</strong> 
          </h1>
     
        <h3>
        <strong>Hoy es "tienes que estar logueado para ver este contenido"</strong>
        </h3>
        </div>
      )}

     
      </header>
      </div>
    
    
      );
};

export default Profile;