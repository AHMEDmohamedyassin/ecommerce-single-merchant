import { Bounce, ToastContainer, Zoom, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const notify = (msg) => {
    toast.dismiss();
    toast.info(msg);
}


export const NotifyContainer = () => {
    const MainColor = "#e81c3f"
    return (
        <div className="w-full">
            <ToastContainer 
                closeOnClick
                rtl={true}
                autoClose={2000}
                draggable
                theme="light"
                icon={false}
                position={window.innerWidth < 1000 ? "bottom-center" : "top-right"}
                newestOnTop={window.innerWidth < 1000}
                transition= {window.innerWidth < 1000 ? Zoom : Bounce}
                closeButton = {false}
                progressStyle= {{ 
                    background: window.innerWidth < 1000 ? 'white' : MainColor
                }}
                toastStyle={{
                    background:window.innerWidth < 1000 ? MainColor : '' , 
                    color : window.innerWidth < 1000 ? 'white' : '',
                    width:window.innerWidth < 1000 ? "90%" : "100%" ,
                    marginLeft : "auto" ,
                    marginRight : "auto" ,
                    marginBottom : "20px" ,
                    borderRadius:"10px" , 
                    boxShadow: `10px 10px 15px #aaa`
                }}
            />
        </div>
    )
}