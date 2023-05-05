export default function SignUp() {
    return ( 
        <>
           <div className="form-container">
              <h1>Sign Up</h1>
              <div className="form">
                <input type="email" placeholder="Email" className="input"/>
                <input type="password" placeholder="Password" className="input"/>
                <input type="button" value="Save" className="btn" />
              </div>
           </div>
        </>
    )
}