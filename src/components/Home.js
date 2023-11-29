import  {useState} from 'react'

function Home() {
    const [Title, setTitle] = useState("")
    const [Desc, setDesc] = useState("")

    const handelDesc=(e)=>{
        setDesc(e.target.value)
    }
    const handelTitle=(e)=>{
        setTitle(e.target.value)
    }
    const handelSubmit=_=>{
      // api stuf 
    }
  return (
    <div className="container  p-5">
      <h2 className='text-center'>Add Notes</h2>
      <div className="mb-3 ">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          value={Title}
          onChange={handelTitle}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
        Description
        </label>
        <input
          type="text"
          className="form-control"
          value={Desc}
          onChange={handelDesc}
        />
      </div>
      <div className="text-center">
      <button type="submit" className="btn btn-primary btn-lg" style={{ "fontSize":"1.2rem"}} onClick={handelSubmit}>
        Submit
      </button>
      </div>
    </div>
  );
}

export default Home;
