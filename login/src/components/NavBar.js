import React from 'react';

const NavBar = () => {
    const logout = ()=>{
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light py-0 bg-themed shadow px-4">
            <a className="navbar-brand" href="#">
            <img src="../logo.png" width="50" height="50" alt="Logo" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{justifyContent:'end'}}>
                
                <button className='btn btn-success' onClick={()=>{logout()}}>LogOut</button>
            </div>
        </nav>
    )
}

export default NavBar;