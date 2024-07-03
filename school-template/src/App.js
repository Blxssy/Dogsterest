import "./App.css";
import { Grid } from "./components/Grid/Grid";
import ButtonAppBar from "./components/AppBar/AppBar";
import MediaCard from "./components/Card/Card";
import {useEffect, useState} from "react";

const url = 'http://localhost:3001/dog'

function App() {
  const [dogs, setDogs] = useState([])

  const getDogs = async () => {
    try {
      const res = await fetch(url, {
        headers: {
          'Content-type': 'application/json'
        }
      });
      const result = await res.json();
      setDogs(result)
      // console.log(result, 'res');
    } catch (e) {
      console.log(e, 'error')
    }
  }

  // console.log(dogs)

  useEffect(() => {
    getDogs()
  }, []);

  return (
      <>
        <ButtonAppBar />
        <div className="App">
          <Grid>
            {dogs.map((dog) => {
              const imageUrl = `https://random.dog/${dog.filename}`;
              // console.log(imageUrl)
              // console.log(dog.id, 'id')
              // console.log(dog.filename, 'file')
              return (
                  <MediaCard key={dog.id} likes={dog.likes} img={imageUrl}/>
              );
            })}

          </Grid>
        </div>
      </>
  );
}
export default App;
