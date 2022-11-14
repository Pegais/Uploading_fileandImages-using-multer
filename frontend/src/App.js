
import {useState} from "react"
import './App.css';
import axios  from "axios"

function App() {
  const [file, setfile] = useState(null)
  const [image,setImage] =useState('')
  // console.log(file);
  function submit (e){
    //using formdata to upload the file to server
    const formData = new FormData();
    formData.append("file", file);
  
    axios
      .post("http://localhost:5000/", formData)
      .then((res) => {
        alert("File Upload success");
        console.log(res.data.filename);
        // here we are taking file which we are uploading to server and viewing it on client

        setImage('http://localhost:5000/public/'+res.data.filename)
        // very important to get the filename along with image full url.
      })
      .catch((err) => alert("File Upload Error"));
  }
  return (
    <div className="App">
  
      <input type="file" onChange={(e)=>setfile(e.target.files[0])}/>
      <input type="submit" onClick={submit}/>
      <img src={image} alt="img"></img>
   
    </div>
  );
}

export default App;
