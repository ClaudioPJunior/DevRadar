import React, {useState, useEffect} from 'react';

function DevForm({onSubmit}){
    
    const [latitude,setLatitude] = useState('');
    const [longitude,setLongitude] = useState('');
    const [github_username,setGitHubUserName] = useState('');
    const [skils,setSkils] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
    
            const {latitude, longitude} = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
    
            console.log(position);
          },
          (err) => {
            console.log(err);
          },
          {
            timeout : 30000,
          }
        )
      },[]);

    async function handleSubmit(e){
        e.preventDefault();
        
        await onSubmit({
            github_username,
            skils,
            latitude,
            longitude,
        });

        setGitHubUserName('');
        setSkils('');
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
              name="github_username" 
              id="github_username" 
              required
              value = {github_username}
              onChange={e => setGitHubUserName(e.target.value)}>
            </input>
          </div>
          <div className="input-block">
            <label htmlFor="skils">Tecnologias</label>
            <input 
              name="skils" 
              id="skils" 
              required
              value = {skils}
              onChange={e => setSkils(e.target.value)}>
            </input>
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)}>
              </input>
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)}>
              </input>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;