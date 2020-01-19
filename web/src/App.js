import React, {useEffect, useState} from 'react';
import './global.css';
import './App.css';
import './SideBar.css';
import './Main.css';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


//Tres conceitos principais:
//Componente : Bloco isolado de HTML + JS + CSS, o qual não interfere no restante da aplicação (Componete é uma função JavaScript que retorna um HTML)
//Estado : Informações mantidas pelo componente(Lembrar conceito de imutabilidade)
//Propriedade : Atributo para o componente() Informações que o componente PAI passa para o componente FILHO

function App() {

  const [devs,setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  },[]);

  async function handleAddDev(data) {
    const response = await api.post('/devs',data);
    //console.log(response.data);
    setDevs([...devs, response.data]);
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
