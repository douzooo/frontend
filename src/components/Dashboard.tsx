import { useAuth } from "../utils/AuthProvider";
import "./Dashboard.css";


const Dashboard = () => {


    const { user, token } = useAuth();

    return (

        <div className="wrapper">

            <div className="sidebar">
                <div className="elpmisInfo">
                    <span className="elpmis">Elpmis</span>
                    <p>Version 1.0.0</p>
                </div>

                <div className="categories">
                    <button className="category">
                        Dashboard
                    </button>
                    <button className="category">
                        Videos
                    </button>
                    <button className="category">
                        Equipment
                    </button>
                    <button className="category">
                        Texte
                    </button>
                </div>
            </div>
            <div className="content">
                <h1>Dashboard</h1>
            </div>
        </div>
    );
}

export default Dashboard;